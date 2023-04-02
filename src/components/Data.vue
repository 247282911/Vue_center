<template>
    <div class="father">
        <h1>Automatic generation of abnormal data</h1>
        <el-button type="info" @click="create_data_ajax" class="buttonc">Generate a broken wire data(ajax)</el-button>

        <el-button type="info" @click="clean" class="btn2 buttonc">Clear data</el-button>
        <el-button type="info" @click="execel" class="buttonc">Export this csv file</el-button>
        <div class="down">
            <h3>Start position of broken wire:<span class="a">{{ start_c }}s</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Amplitude:<span class="a">{{ amplitude_c }}</span> </h3>

        </div>

        <!-- 放置图表 -->
        <div ref="chartColumn" style="height: 500px"></div>

        <h1>Abnormal data generation</h1>

        <div class="down">
            <span class="dd">Number of input data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="mdata" class="buttonc">Export data</el-button>
        </div>

        <h1>Normal data generation</h1>

        <div class="down">
            <span class="dd">Number of input data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num2" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="nomdata" class="buttonc">Export data</el-button>
        </div>

        <h1>Normal data +Abnormal data</h1>

        <div class="down">
            <span class="dd">Abnormal data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num3" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <span class="dd">Normal data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num4" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="twoc_data" class="buttonc">Export data</el-button>
        </div>

        <h1>Normal data +Abnormal data(Classification data)</h1>

        <div class="down">
            <span class="dd">Abnormal data(3 characteristics are random):</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num3_c" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <span class="dd">Normal data(3 characteristics are random):</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num4_c" :min="1" :max="30000" label="描述文字"></el-input-number>
            &nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="class_data" class="buttonc">Export data</el-button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            num: 1,
            num2: 1,
            num3: 1,
            num4: 1,

            num3_c: 1,
            num4_c: 1,
            // 接受后台传过来的幅值
            amplitude_c: 0,
            // 后缀为d的是批量生成用的
            start_c: 0,
            start_d: 0,
            // 下面是图表相关数据
            data_b: [],
            data_d: [],
            // 这里这两个数组先留空，在钩子函数中会给他赋值的
            dateList: [],
            // 后缀为m的是批量生成用的
            dateList_m: [],
            valueList: [],
            valueList_m: [],
            // 后面nom是生成正常数据用的
            dateList_nom: [],
            dateList_two: [],
            valueList_m_two: [],
            valueList_nom_two: [],
            valueList_nom: [],
            // 批量输出的json
            jsonData_m: [],
            // 下面这是正常数据的
            jsonData_nom: [],
            // 下面是正常+异常数据的
            jsonData_two: [],
            chartColumn: null,
            option: {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],
                    axisLabel: {
                        fontSize: 25,   ///x
                        color: 'black'
                    },
                    name: 'time/s',
                    nameTextStyle: {
                        fontSize: 25
                    },
                    interval: 0.1,
                    min: 0,
                    max: 200,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 25, ///y
                        color: 'black'
                    },
                    name: 'wavelength difference/nm',
                    nameTextStyle: {
                        fontSize: 19
                    },
                },
                series: [
                    {
                        data: [],
                        type: 'line',
                        symbol: 'triangle',
                        symbolSize: 10,
                        lineStyle: {
                            color: 'red',
                            width: 2,

                        },
                        itemStyle: {
                            color: 'blue'
                        },

                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
            },

            fileName: '',
        }


    },

    methods: {


        // axios发送ajax请求，请求一个异常数据,返回的东西我们只需要data就可以了，解构赋值给res
        async create_data_ajax() {
            // 生成一个随机数来决定调用的是哪一个特征曲线的变形
            let rad = Math.floor(Math.random() * 3)//生成0 或 1 或 2
            const { data: res } = await this.$axios.get('/data/test' + rad);


            this.data_b = res.bb;
            this.start_c = res.start;
            this.amplitude_c = res.amplitude;
            // 首先把x和y的数据用map函数拆成两部分
            this.dateList = this.data_b.map(function (item) {
                return item[0];
            });

            this.valueList = this.data_b.map(function (item) {
                return item[1];
            });

            // 然后分别复制到option中的对应位置
            this.option.xAxis.data = this.dateList;
            this.option.series[0].data = this.valueList;

            //  最后调用初始化initChart方法
            this.initChart();

        },


        clean() {
            this.data_b = [];
            echarts.dispose(this.$refs.chartColumn)
        },
        // 初始化图表
        initChart() {
            this.chartColumn = echarts.init(this.$refs.chartColumn)
            this.chartColumn.setOption(this.option)
        },


        // 导出数据表csv的函数
        execel() {

            //要导出的json数据
            const jsonData = []
            // 给this.valueList拼接上断丝开始的位置,也就是this.start_c
            this.valueList.push(this.start_c)
            jsonData[0] = this.valueList

            //列标题，逗号隔开，每一个逗号就是隔开一个单元格
            // let str = `标题1,标题2,标题3\n`;
            let str = ``;
            // 准备循环拼接模板字符串
            for (let p = 0; p <= 201; p++) {
                // 如果循环到201次，直接拼接‘开始位置\n’,前面200次循环添加秒数加一个逗号，一直到2.0,
                if (p == 201) {
                    str = str + `断丝开始位置/s\n`
                } else {
                    str = str + `${p / 100}秒,`
                }
            }

            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < jsonData.length; i++) {
                for (let item in jsonData[i]) {
                    str += `${jsonData[i][item] + '\t'},`;
                }
                str += '\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = "本次异常数据.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        },


        // 批量导出异常数据主函数 
        mdata() {
            for (let i = 0; i < this.num; i++) {
                // this.create_data()
                // 使用随机数来决定
                let rad = Math.floor(Math.random() * 3)//生成0或者1或者2
                if (rad == 0) {
                    setTimeout(this.create_data0(), 1000)
                } else if (rad == 1) {
                    setTimeout(this.create_data1(), 1000)
                } else {
                    setTimeout(this.create_data2(), 1000)
                }

                this.jsonData_m[i] = this.valueList_m
            }

            //  列标题
            let str = ``;
            // 准备循环拼接模板字符串
            for (let p = 0; p <= 201; p++) {
                // 如果循环到201次，直接拼接‘开始位置\n’,前面200次循环添加秒数加一个逗号，一直到2.0,
                if (p == 201) {
                    str = str + `断丝开始位置/s\n`
                } else {
                    str = str + `${p / 100}秒,`
                }
            }

            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < this.jsonData_m.length; i++) {
                for (let item in this.jsonData_m[i]) {
                    str += `${this.jsonData_m[i][item] + '\t'},`;
                }
                str += '\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = "异常数据" + this.num + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },


        // 批量导出正常数据主函数
        nomdata() {

            for (let i = 0; i < this.num2; i++) {
                // this.create_data()
                setTimeout(this.create_nomdata(), 1000)
                this.jsonData_nom[i] = this.valueList_nom
            }

            //  列标题
            let str = ``;
            // 准备循环拼接模板字符串
            for (let p = 0; p <= 201; p++) {
                // 如果循环到201次，直接拼接‘开始位置\n’,前面200次循环添加秒数加一个逗号，一直到2.0,
                if (p == 201) {
                    str = str + `断丝开始位置/s\n`
                } else {
                    str = str + `${p / 100}秒,`
                }
            }

            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < this.jsonData_nom.length; i++) {
                for (let item in this.jsonData_nom[i]) {
                    str += `${this.jsonData_nom[i][item] + '\t'},`;
                }
                str += '\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = "正常数据" + this.num2 + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },


        // 批量导出异常+正常数据的主函数
        twoc_data() {

            // 调用生成异常数据的函数
            for (let i = 0; i < this.num3; i++) {
                // this.create_data()   Math.floor(Math.random() * 3)
                let rad = Math.floor(Math.random() * 3)//生成0或者1或者2
                if (rad == 0) {
                    setTimeout(this.create_data0(), 1000)
                } else if (rad == 1) {
                    setTimeout(this.create_data1(), 1000)
                } else {
                    setTimeout(this.create_data2(), 1000)
                }



                this.jsonData_two[i] = this.valueList_m_two
            }
            //  调用生成正常数据的函数
            for (let i = this.num3; i < this.num3 + this.num4; i++) {
                // this.create_data()
                setTimeout(this.create_nomdata(), 1000)
                this.jsonData_two[i] = this.valueList_nom_two
            }
            //  列标题
            let str = ``;
            // 准备循环拼接模板字符串
            for (let p = 0; p <= 201; p++) {
                // 如果循环到201次，直接拼接‘开始位置\n’,前面200次循环添加秒数加一个逗号，一直到2.0,
                if (p == 201) {
                    str = str + `断丝开始位置/s\n`
                } else {
                    str = str + `${p / 100}秒,`
                }
            }

            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < this.jsonData_two.length; i++) {
                for (let item in this.jsonData_two[i]) {
                    str += `${this.jsonData_two[i][item] + '\t'},`;
                }
                str += '\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = "异常数据" + this.num3 + "正常数据" + this.num4 + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        // 批量导出分类数据的主函数
        class_data() {
            // 调用生成异常数据的函数
            for (let i = 0; i < this.num3_c; i++) {
                // this.create_data()   Math.floor(Math.random() * 3)
                let rad = Math.floor(Math.random() * 3)//生成0或者1或者2
                if (rad == 0) {
                    setTimeout(this.create_data0_c(), 1000)
                } else if (rad == 1) {
                    setTimeout(this.create_data1_c(), 1000)
                } else {
                    setTimeout(this.create_data2_c(), 1000)
                }



                this.jsonData_two[i] = this.valueList_m_two
            }
            //  调用生成正常数据的函数
            for (let i = this.num3_c; i < this.num3_c + this.num4_c; i++) {
                // this.create_data()
                setTimeout(this.create_nomdata_c(), 1000)
                this.jsonData_two[i] = this.valueList_nom_two
            }
            //  列标题
            let str = ``;
            // 准备循环拼接模板字符串
            for (let p = 0; p <= 201; p++) {
                // 如果循环到201次，直接拼接‘开始位置\n’,前面200次循环添加秒数加一个逗号，一直到2.0,
                if (p == 201) {
                    str = str + `断丝开始位置/s\n`
                } else {
                    str = str + `${p / 100}秒,`
                }
            }

            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < this.jsonData_two.length; i++) {
                for (let item in this.jsonData_two[i]) {
                    str += `${this.jsonData_two[i][item] + '\t'},`;
                }
                str += '\n';
            }
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = "异常数据" + this.num3_c + "正常数据" + this.num4_c + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },





        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data0() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.026
            let min = 0.021
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.75 + Math.random() * 0.5;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0247, 0.0335, 0.0461, 0.0398, 0.0501, 0.0406, 0.0303, 0.0311, 0.0358, 0.0422, 0.0445, 0.0398, 0.0422, 0.0366, 0.0390, 0.0382, 0.0366, 0.0374, 0.0406, 0.0390, 0.0406, 0.0374, 0.0374];
            // 乘以幅值(使用map方法)
            let cca = cc.map(x => x * amplitude)
            // 对需要减小的数据点单独处理
            for (let p = 0; p <= 23; p++) {
                if (p == 3 || p == 6 || p == 7) {
                    cca[p] = cc[p] / amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面23个y值(这个22是因为cc数组的长度是23)
                    for (let j = start, g = 0; j <= start + 22; j++, g++) {
                        if (j >= 200) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+22之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 22) {
                    for (let z = start + 22; z <= 200; z++) {
                        bb[z] = (0.036 + Math.random() * 0.005) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上start位置, two是生成异常+正常数据用的
            this.valueList_m.push(start)
            // this.valueList_m_two.push(start)
        },

        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data1() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.062
            let min = 0.058
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.95 + Math.random() * 0.3;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0576, 0.0703, 0.1012, 0.0774, 0.0489, 0.0695, 0.0798, 0.0584, 0.0592, 0.0774, 0.0727, 0.056, 0.0663, 0.0774, 0.0616, 0.0576, 0.0711, 0.0711, 0.0616, 0.0632, 0.0719, 0.0679, 0.0632, 0.0663, 0.0655, 0.0647, 0.0679, 0.0671, 0.0663, 0.0663, 0.0655];
            // 乘以幅值(使用map方法)
            let cca = cc.map(x => x * amplitude)
            // 对需要减小的数据点单独处理
            for (let p = 0; p <= 23; p++) {
                if (p == 4 || p == 7) {
                    cca[p] = cc[p] / amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面31个y值(这个30是因为cc数组的长度是31)
                    for (let j = start, g = 0; j <= start + 30; j++, g++) {
                        if (j >= 201) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+30之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 30) {
                    for (let z = start + 30; z <= 200; z++) {
                        bb[z] = (0.063 + Math.random() * 0.008) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上start位置, two是生成异常+正常数据用的
            this.valueList_m.push(start)
            // this.valueList_m_two.push(start)
        },

        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data2() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.035
            let min = 0.032
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.95 + Math.random() * 0.3;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0362, 0.0354, 0.0346, 0.0354, 0.0362, 0.0362, 0.0378, 0.0362, 0.037, 0.0378, 0.0378, 0.0385, 0.0393, 0.0378, 0.0385, 0.0393, 0.0393, 0.0401, 0.0409, 0.0409, 0.0543, 0.0488, 0.0519, 0.0535, 0.0504, 0.0527, 0.0543, 0.0512, 0.0567, 0.0496, 0.0559, 0.0551, 0.0512, 0.0583, 0.0535, 0.0551, 0.0598, 0.0535];

            // 这个比较特殊，前20个不需要乘以幅度
            let cca = []
            for (let i = 0; i <= 200; i++) {
                if (i <= 19) {
                    cca[i] = cc[i]
                } else {
                    cca[i] = cc[i] * amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面38个y值(这个37是因为cc数组的长度是38)
                    for (let j = start, g = 0; j <= start + 37; j++, g++) {
                        if (j >= 201) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+37之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 37) {
                    for (let z = start + 37; z <= 200; z++) {
                        bb[z] = (0.051 + Math.random() * 0.007) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上start位置, two是生成异常+正常数据用的
            this.valueList_m.push(start)
            // this.valueList_m_two.push(start)
        },

        // 创建正常数据的函数
        create_nomdata() {
            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max
            let min
            // 按随机数来选择
            let rad = Math.floor(Math.random() * 3)//生成0或者1或者2
            if (rad == 0) {
                max = 0.026
                min = 0.021
            } else if (rad == 1) {
                max = 0.062
                min = 0.058
            } else {

                max = 0.035
                min = 0.032

            }

            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，

            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 吧y单独取出来
            this.valueList_nom = bb
            this.valueList_nom_two = bb
            let start = -1;
            // 吧y拼接上start位置(这里因为是正常数据，所以是-1)
            // this.valueList_nom_two.push(start)
            this.valueList_nom.push(start)
        },






        // 下面是分类模式！！






        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data0_c() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.026
            let min = 0.021
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.75 + Math.random() * 0.5;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0247, 0.0335, 0.0461, 0.0398, 0.0501, 0.0406, 0.0303, 0.0311, 0.0358, 0.0422, 0.0445, 0.0398, 0.0422, 0.0366, 0.0390, 0.0382, 0.0366, 0.0374, 0.0406, 0.0390, 0.0406, 0.0374, 0.0374];
            // 乘以幅值(使用map方法)
            let cca = cc.map(x => x * amplitude)
            // 对需要减小的数据点单独处理
            for (let p = 0; p <= 23; p++) {
                if (p == 3 || p == 6 || p == 7) {
                    cca[p] = cc[p] / amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面23个y值(这个22是因为cc数组的长度是23)
                    for (let j = start, g = 0; j <= start + 22; j++, g++) {
                        if (j >= 200) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+22之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 22) {
                    for (let z = start + 22; z <= 200; z++) {
                        bb[z] = (0.036 + Math.random() * 0.005) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上分类0
            this.valueList_m.push(0)
            // this.valueList_m_two.push(start)
        },

        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data1_c() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.062
            let min = 0.058
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.95 + Math.random() * 0.3;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0576, 0.0703, 0.1012, 0.0774, 0.0489, 0.0695, 0.0798, 0.0584, 0.0592, 0.0774, 0.0727, 0.056, 0.0663, 0.0774, 0.0616, 0.0576, 0.0711, 0.0711, 0.0616, 0.0632, 0.0719, 0.0679, 0.0632, 0.0663, 0.0655, 0.0647, 0.0679, 0.0671, 0.0663, 0.0663, 0.0655];
            // 乘以幅值(使用map方法)
            let cca = cc.map(x => x * amplitude)
            // 对需要减小的数据点单独处理
            for (let p = 0; p <= 23; p++) {
                if (p == 4 || p == 7) {
                    cca[p] = cc[p] / amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面31个y值(这个30是因为cc数组的长度是31)
                    for (let j = start, g = 0; j <= start + 30; j++, g++) {
                        if (j >= 201) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+30之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 30) {
                    for (let z = start + 30; z <= 200; z++) {
                        bb[z] = (0.063 + Math.random() * 0.008) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上分类1
            this.valueList_m.push(1)
            // this.valueList_m_two.push(start)
        },

        // 创建异常数据的函数，注意，批量时才用这个，只生成y 单独生成则是发送ajax请求完成的，xy都生成
        create_data2_c() {

            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max = 0.035
            let min = 0.032
            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，下面开始定义异常部分

            // 定义随机异常开始的位置,即异常的插入位置
            let start = Math.floor(Math.random() * 200);
            // 定义震动幅度
            let amplitude = 0.95 + Math.random() * 0.3;
            // 保留三位小数
            amplitude = amplitude.toFixed(4)


            // 定义要插入的异常数据集 
            let cc = [0.0362, 0.0354, 0.0346, 0.0354, 0.0362, 0.0362, 0.0378, 0.0362, 0.037, 0.0378, 0.0378, 0.0385, 0.0393, 0.0378, 0.0385, 0.0393, 0.0393, 0.0401, 0.0409, 0.0409, 0.0543, 0.0488, 0.0519, 0.0535, 0.0504, 0.0527, 0.0543, 0.0512, 0.0567, 0.0496, 0.0559, 0.0551, 0.0512, 0.0583, 0.0535, 0.0551, 0.0598, 0.0535];

            // 这个比较特殊，前20个不需要乘以幅度
            let cca = []
            for (let i = 0; i <= 200; i++) {
                if (i <= 19) {
                    cca[i] = cc[i]
                } else {
                    cca[i] = cc[i] * amplitude
                }
            }
            // 至此，一段异常数据集生成完毕


            // 遍历正常数据找到插入位置
            for (let i = 0; i <= 200; i++) {
                if (i == start) {
                    // 找到插入位置之后，开始使用cc数组替换bb数组中的后面38个y值(这个37是因为cc数组的长度是38)
                    for (let j = start, g = 0; j <= start + 37; j++, g++) {
                        if (j >= 201) {
                            break
                        } else {
                            bb[j] = cca[g]
                        }

                    }
                }
            }


            // 改变断丝之后正常数据的浮动区间
            for (let i = 0; i <= 200; i++) {
                // 给start+37之后的那些数，改变区间，注意这里也要乘以幅值
                if (i == start + 37) {
                    for (let z = start + 37; z <= 200; z++) {
                        bb[z] = (0.051 + Math.random() * 0.007) * amplitude//变为0.036-0.041之间取随机数,乘以震幅
                    }
                }
            }


            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;

            // 吧y单独取出来
            this.valueList_m = bb
            this.valueList_m_two = bb
            // 吧y拼接上 分类2
            this.valueList_m.push(2)
            // this.valueList_m_two.push(start)
        },

        // 创建正常数据的函数
        create_nomdata_c() {
            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值

            // 按随机数来选择
            let max
            let min
            // 按随机数来选择
            let rad = Math.floor(Math.random() * 3)//生成0或者1或者2
            if (rad == 0) {
                max = 0.026
                min = 0.021
            } else if (rad == 1) {
                max = 0.062
                min = 0.058
            } else {

                max = 0.035
                min = 0.032

            }

            let bb = [];
            for (let i = 0; i <= 200; i++) {
                bb[i] = min + Math.random() * (max - min)
            }
            // 至此，一段正常的曲线生成完毕，

            // 最后让bb数组的值取4位小数
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i].toFixed(4)
            }
            // 吧y单独取出来
            this.valueList_nom = bb
            this.valueList_nom_two = bb
            let start = -1;
            // 吧y拼接上分类
            // this.valueList_nom_two.push(start)
            this.valueList_nom.push(rad)
        },









    },



}





</script>


<style lang="less" scoped>
.a {
    color: rgb(0, 16, 190);
}

h1 {
    text-align: center;
    font-style: oblique;
}

.father {
    position: relative;
}

.btn2 {
    // position: absolute;
    float: right;
}

.dd {
    color: rgb(0, 48, 48);
    font-size: 20px;
    font-weight: 800;
}

.buttonc {
    background-color: black;
}

.down {
    text-align: center;
}
</style>
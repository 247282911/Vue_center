<template>
    <div>
        <h1>AI intelligent detection</h1>



        <div class="center">


            <!-- 这是上传特征一json文件的div -->
            <div>
                <span class="font_xuanze">Select feature 1 model json file:</span>&nbsp;
                <el-input type='text' id='text-field1' class="input_el" size="mini" /> &nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-json').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-json" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field1').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>
            <div class="mid"></div>
            <!--这是上传特征一bin文件的div -->
            <div>
                <span class="font_xuanze">Select feature 1 model bin file:</span>&nbsp;
                <el-input type='text' id='text-field2' class="input_el" size="mini" />&nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-weights').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-weights" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field2').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>



            <hr>



            <!-- 这是上传特征二json文件的div -->
            <div>
                <span class="font_xuanze">Select feature 2 model json file:</span>&nbsp;
                <el-input type='text' id='text-field3' class="input_el" size="mini" /> &nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-json1').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-json1" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field3').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>
            <div class="mid"></div>
            <!--这是上传特征二bin文件的div -->
            <div>
                <span class="font_xuanze">Select feature 2 model bin file:</span>&nbsp;
                <el-input type='text' id='text-field4' class="input_el" size="mini" />&nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-weights1').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-weights1" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field4').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>



            <hr>



            <!-- 这是上传特征三json文件的div -->
            <div>
                <span class="font_xuanze">Select feature 3 model json file:</span>&nbsp;
                <el-input type='text' id='text-field5' class="input_el" size="mini" /> &nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-json2').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-json2" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field5').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>
            <div class="mid"></div>
            <!--这是上传特征三bin文件的div -->
            <div>
                <span class="font_xuanze">Select feature 3 model bin file:</span>&nbsp;
                <el-input type='text' id='text-field6' class="input_el" size="mini" />&nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-weights2').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-weights2" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field6').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>



            <hr>



            <!-- 这是上传分类json文件的div -->
            <div>
                <span class="font_xuanze">Select the classification model json file:</span>&nbsp;
                <el-input type='text' id='text-field7' class="input_el" size="mini" /> &nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-json3').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-json3" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field7').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>
            <div class="mid"></div>
            <!--这是上传分类bin文件的div -->
            <div>
                <span class="font_xuanze">Select the classification model bin file:</span>&nbsp;
                <el-input type='text' id='text-field8' class="input_el" size="mini" />&nbsp;
                <span class="input-group-btn">
                    <el-button type='info' class='buttonc' size="small"
                        onclick="document.getElementById('upload-weights3').click()">Select the file
                    </el-button>
                </span>

                <input type="file" id="upload-weights3" class="ip file2 " style="display: none"
                    onchange="document.getElementById('text-field8').value=this.value.substring(this.value.lastIndexOf('\\')+1)" />

            </div>


        </div>


        <div class="mid"></div>


        <div class="center">
            <el-button type="info" @click="init_model" class="buttonc">Load neural network model</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="clean_model" class="buttonc">Clear neural network model</el-button>
        </div>


        <h2 class="success">{{ text }}</h2>
        <el-divider><i class="el-icon-s-platform"></i>&nbsp;&nbsp;The following part is the test part (single
            data)</el-divider>
        <div class="center">

            <el-button type="info" class="buttonc" @click="initChart">Generate data</el-button>

            <el-button type="info" class="buttonc" @click="initChart_real">Get a real data</el-button>

            <el-button type="info" @click="cnn_use" class="buttonc">Test model(Use this
                data)</el-button>
            <el-button type="info" class="buttonc" @click="clean_data">Clear data</el-button>
        </div>

        <div class="mid"></div>

        <div class="center">
            <span class="shiji_yuce">Actual start position:<span class="ac_start">{{ start_a }}s</span> </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="shiji_yuce">Judge feature type:<span class="pre_start">{{ predict2 }}</span> </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="shiji_yuce">Prediction of broken wire position:<span class="pre_start">{{ predict3 }}s</span>
            </span>
        </div>

        <!-- 放置图表 -->
        <div ref="chartColumn" style="height: 500px"></div>

        <!-- 分割线 -->
        <el-divider><i class="el-icon-film"></i>&nbsp;&nbsp;The following part is the test part (batch
            data)</el-divider>

        <!-- 批量数据检查模块 -->
        <div class="center">

            <h1>Please enter the number of test data</h1>

            <span class="dd">Abnormal data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num1" :min="0" :max="30000" label="描述文字"></el-input-number>

            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

            <span class="dd">Normal data:</span>
            &nbsp;&nbsp;&nbsp;
            <el-input-number size="small" v-model="num2" :min="0" :max="30000" label="描述文字"></el-input-number>

            <div class="mid"></div>

            <el-button type="info" class="buttonc" @click="test_all">Start test</el-button>
            <el-button type="info" class="buttonc" @click="test_clean">Reset test</el-button>
            <div class="mid"></div>

            <h3>Among the generated data, there are<span class="ac_start">{{ num1 }}</span>abnormal data.The CNN model has
                detected<span class="pre_start">{{ found_num
                }}</span>abnormal data,and<span class="pre_start">{{ precent_all }}%</span>of them are
                picked up</h3>
            <div class="mid_small"></div>
            <h3>The average error from the exact broken wire position point is<span class="pre_start">{{ average_d
            }}s</span></h3>


        </div>



    </div>
</template>



<script>
// 注意，使用tensorflow之前需要在vue ui内安装tensorflow.js依赖包 : @tensorflow/tfjs
import * as tf from '@tensorflow/tfjs';


export default {

    data() {
        return {
            model: null,
            // 特征二
            model1: null,
            // 特征三
            model2: null,
            //分类
            model3: null,
            // 接收生成的一段异常数据
            valueList_m: [],
            // 接收生成的一段异常数据
            valueList_nom: [],
            // 异常数据的start位置
            start: 0,
            // 正常数据的start位置
            start_nom: -1,
            // 神经网络预测值
            predict: 0,
            // 接收上传的两个文件
            uploadJSONInput: null,
            uploadWeightsInput: null,
            // 特征二
            uploadJSONInput1: null,
            uploadWeightsInput1: null,
            // 特征3
            uploadJSONInput2: null,
            uploadWeightsInput2: null,
            //分类
            uploadJSONInput3: null,
            uploadWeightsInput3: null,
            // 上传成功的提示语句
            text: '',
            chartColumn: null,
            // 初始化图表的时候从后台接收的data和start和幅值
            data_a: [],
            start_a: 0,
            amplitude_a: null,
            // 表格的数据
            dateList: [],
            valueList: [],
            // 数据是否准备ok的1和0
            data_ok: 0,
            // 归一化之后的数据(单个测试)
            valueList_0_1: [],
            // 处理之后的预测值(单个测试)
            predict2: null,
            predict3: null,
            // 在批量测试模块记录异常数据和正常数据的条数
            num1: 0,
            num2: 0,
            // 存放数据的大数组，每一个元素都是一个异常或正常数据
            valueList_all: [],
            // 存放start位置的大数组
            start_all: [],
            // 存放预测数据的大数组
            predict_all: null,
            predict_all2: null,
            predict_all_final: [],
            // 发现异常的数量(性能测试)
            found_num: 0,
            // 存储模型的误差值
            D_value: [],
            // 定义平均误差值
            average_d: 0,
            precent_all: null,

            option: {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [],   //横坐标
                    axisLabel: {
                        fontSize: 18,
                        color: 'black'
                    },
                    name: 'time/s',
                    nameTextStyle: {
                        fontSize: 25
                    },
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 18,
                        color: 'black'
                    },
                    name: 'wavelength difference/nm',
                    nameTextStyle: {
                        fontSize: 19
                    },
                },
                series: [
                    {
                        data: [],     //纵坐标
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
                        markPoint: {
                            data: [
                                {
                                    name: '11',
                                    yAxis: null,
                                    xAxis: null,
                                    value: 'Start position',

                                    itemStyle: {
                                        color: 'aqua'
                                    },
                                    symbol: 'pin',
                                    symbolSize: [70, 70],

                                },
                                {
                                    name: '12',
                                    yAxis: null,
                                    xAxis: null,
                                    value: 'Forcast position',

                                    itemStyle: {
                                        color: 'blue'
                                    },
                                    symbol: 'pin',
                                    symbolSize: [70, 70],

                                }
                            ]
                        },
                    },

                ],

                tooltip: {
                    trigger: 'axis'
                },
            },
        }
    },
    methods: {


        async init_model() {

            // 特征一
            this.uploadJSONInput = document.getElementById('upload-json');
            this.uploadWeightsInput = document.getElementById('upload-weights');
            this.model = await tf.loadLayersModel(tf.io.browserFiles(
                [this.uploadJSONInput.files[0], this.uploadWeightsInput.files[0]]));
            // 特征二
            this.uploadJSONInput1 = document.getElementById('upload-json1');
            this.uploadWeightsInput1 = document.getElementById('upload-weights1');
            this.model1 = await tf.loadLayersModel(tf.io.browserFiles(
                [this.uploadJSONInput1.files[0], this.uploadWeightsInput1.files[0]]));
            // 特征三
            this.uploadJSONInput2 = document.getElementById('upload-json2');
            this.uploadWeightsInput2 = document.getElementById('upload-weights2');
            this.model2 = await tf.loadLayersModel(tf.io.browserFiles(
                [this.uploadJSONInput2.files[0], this.uploadWeightsInput2.files[0]]));
            // 分类
            this.uploadJSONInput3 = document.getElementById('upload-json3');
            this.uploadWeightsInput3 = document.getElementById('upload-weights3');
            this.model3 = await tf.loadLayersModel(tf.io.browserFiles(
                [this.uploadJSONInput3.files[0], this.uploadWeightsInput3.files[0]]));


            this.text = 'Loading succeeded...Now you can test the model'

        },

        clean_model() {
            this.uploadJSONInput.value = null;
            this.uploadWeightsInput.value = null;
            this.model = null;
            this.uploadJSONInput1.value = null;
            this.uploadWeightsInput1.value = null;
            this.model1 = null;
            this.uploadJSONInput2.value = null;
            this.uploadWeightsInput2.value = null;
            this.model2 = null;
            this.uploadJSONInput3.value = null;
            this.uploadWeightsInput3.value = null;
            this.model3 = null;
            document.getElementById('text-field1').value = null;
            document.getElementById('text-field2').value = null;
            document.getElementById('text-field3').value = null;
            document.getElementById('text-field4').value = null;
            document.getElementById('text-field5').value = null;
            document.getElementById('text-field6').value = null;
            document.getElementById('text-field7').value = null;
            document.getElementById('text-field8').value = null;
            this.text = '';
        },

        cnn_use() {

            if (this.text != '' && this.data_ok == 1) {

                // 吧y归一化到0和1之间
                for (let i = 0; i <= 200; i++) {
                    this.valueList_0_1[i] = this.valueList[i] / 0.1265
                }

                // 创建一个数组，把这个数组的第一个元素设置为数组，即返回的这201个数据的数组
                const arr1 = []
                arr1[0] = this.valueList_0_1
                // 转换为张量
                const t = tf.tensor(arr1)
                //修整维度
                const t1 = t.reshape([1, 201, 1])
                // 预测方法预测
                this.predict = this.model3.predict(t1)
                // 从张量内取出最大值的数据,极为分类模型的输出
                this.predict2 = this.predict.argMax(1).dataSync(0)
                //   转换为number类型
                this.predict2 = Number(this.predict2)

                // 分类判断完成，现在根据分类调用对应模型判断断丝位置
                if (this.predict2 == 0) {
                    this.predict3 = this.model.predict(t1)
                    this.predict3 = this.predict3.dataSync(0)
                    this.predict3 = Number(this.predict3).toFixed(4)
                } else if (this.predict2 == 1) {
                    this.predict3 = this.model1.predict(t1)
                    this.predict3 = this.predict3.dataSync(0)
                    this.predict3 = Number(this.predict3).toFixed(4)
                } else {
                    this.predict3 = this.model2.predict(t1)
                    this.predict3 = this.predict3.dataSync(0)
                    this.predict3 = Number(this.predict3).toFixed(4)
                }


                // 下面准备把真实断丝位置和预测位置的点添加到图表中

                // 实际的开始值赋给对应位置
                this.option.series[0].markPoint.data[0].xAxis = this.start_a * 100
                // 找出实际开始值对应的y,并赋给对应位置
                this.option.series[0].markPoint.data[0].yAxis = this.valueList[this.start_a * 100]



                // 预测的位置
                this.option.series[0].markPoint.data[1].xAxis = this.predict3 * 100
                // 遍历数组找出实际开始值对应的y,并赋给对应位置
                this.option.series[0].markPoint.data[1].yAxis = this.valueList[Number(this.predict3).toFixed(2) * 100]



                // 初始化图表
                this.chartColumn = echarts.init(this.$refs.chartColumn)
                this.chartColumn.setOption(this.option)

            } else {
                this.$alert('You did not load the model or generate data', 'Alert:', {
                    confirmButtonText: 'OK',
                });
            }

        },

        // 初始化图表
        async initChart() {
            // axios发送ajax请求，请求一个异常数据,返回的东西我们只需要data就可以了，解构赋值给res

            // 生成一个随机数来决定调用的是哪一个特征曲线的变形
            let rad = Math.floor(Math.random() * 3)  //生成0 或 1 或 2
            const { data: res } = await this.$axios.get('/data/test' + rad);
            this.data_a = res.bb;
            this.start_a = res.start;
            this.amplitude_a = res.amplitude;
            // 首先把x和y的数据用map函数拆成两部分
            this.dateList = this.data_a.map(function (item) {
                return item[0];
            });

            this.valueList = this.data_a.map(function (item) {
                return item[1];
            });

            // 然后分别复制到option中的对应位置
            this.option.xAxis.data = this.dateList;
            this.option.series[0].data = this.valueList;

            // 清理掉之前的标记点
            this.option.series[0].markPoint.data[0].xAxis = null
            this.option.series[0].markPoint.data[0].yAxis = null
            this.option.series[0].markPoint.data[1].xAxis = null
            this.option.series[0].markPoint.data[1].yAxis = null

            // 初始化图表
            this.chartColumn = echarts.init(this.$refs.chartColumn)
            this.chartColumn.setOption(this.option)

            // 更新数据状态
            this.data_ok = 1;
        },

        // 获取一条真实数据
        async initChart_real() {


            // axios发送ajax请求，请求一个异常数据,返回的东西我们只需要data就可以了，解构赋值给res


            const { data: res } = await this.$axios.get('/data/test_real');
            this.data_a = res.bb;
            this.start_a = res.start;
            this.amplitude_a = res.amplitude;
            // 首先把x和y的数据用map函数拆成两部分
            this.dateList = this.data_a.map(function (item) {
                return item[0];
            });

            this.valueList = this.data_a.map(function (item) {
                return item[1];
            });

            // 然后分别复制到option中的对应位置
            this.option.xAxis.data = this.dateList;
            this.option.series[0].data = this.valueList;

            // 清理掉之前的标记点
            this.option.series[0].markPoint.data[0].xAxis = null
            this.option.series[0].markPoint.data[0].yAxis = null
            this.option.series[0].markPoint.data[1].xAxis = null
            this.option.series[0].markPoint.data[1].yAxis = null

            // 初始化图表
            this.chartColumn = echarts.init(this.$refs.chartColumn)
            this.chartColumn.setOption(this.option)

            // 更新数据状态
            this.data_ok = 1;


        },



        clean_data() {
            this.data_a = [];
            this.start_a = null;
            this.amplitude_a = null;
            echarts.dispose(this.$refs.chartColumn)
        },





        // 生成一段异常数据
        create_data() {
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


            // 最后让bb数组的值取4位小数,然后除以0.0626归一化到0和1之间
            for (let i = 0; i <= 200; i++) {
                bb[i] = bb[i] / 0.1265
                // bb[i] = bb[i].toFixed(4)

            }
            // 开始位置缩小100倍变为秒
            start = start / 100;
            this.start = start;

            // 吧y单独取出来
            this.valueList_m = bb



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
                bb[i] = bb[i] / 0.1265
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;
            this.start = start
            // 吧y单独取出来
            this.valueList_m = bb

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
                bb[i] = bb[i] / 0.1265
            }
            // 开始位置缩小100倍变为秒
            start = start / 100;
            this.start = start
            // 吧y单独取出来
            this.valueList_m = bb

        },








        // 生成一段正常数据
        create_data_nom() {
            // 下面生成一段正常的波形
            // 确定正常波动范围的最大值和最小值
            let max
            let min
            // 按随机数来选择
            let rad = Math.floor(Math.random() * 3)//生成0或者1或者2 !!!!!!!!!!!!!!!!!!!!!!!!!!!
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

            // 最后让bb数组的值取4位小数,然后除以0.0626归一化到0和1之间
            for (let i = 0; i <= 200; i++) {

                bb[i] = bb[i] / 0.1265
                // bb[i] = bb[i].toFixed(4)
            }
            // 吧y单独取出来
            this.valueList_nom = bb
        },


        // 批量数据测试神经网络
        test_all() {
            if (this.text != '' && this.data_ok == 1) {
                // 循环，将指定次数的异常数据和start位置 插入到大数组中
                for (let i = 0; i < this.num1; i++) {

                    // 随机数决定是哪种特征
                    let rad = Math.floor(Math.random() * 3)//生成0或者1或者2!!!!!!!!!!!!!!!!!!!!

                    if (rad == 0) {
                        setTimeout(this.create_data(), 1000)
                    } else if (rad == 1) {
                        setTimeout(this.create_data1(), 1000)
                    } else {
                        setTimeout(this.create_data2(), 1000)
                    }


                    this.valueList_all[i] = this.valueList_m
                    this.start_all[i] = this.start
                }
                for (let i2 = this.num1; i2 < this.num2 + this.num1; i2++) {
                    setTimeout(this.create_data_nom(), 1000)
                    this.valueList_all[i2] = this.valueList_nom
                    this.start_all[i2] = -1
                }
                // 这时，大数组创建完毕,数据数组valueList_all内已经完成归一化
                // 前num1个数据为异常，num1到num1+num2的数据为正常

                // 大数组转换为张量
                const t = tf.tensor(this.valueList_all)
                //修整维度
                const t1 = t.reshape([this.num1 + this.num2, 201, 1])

                // 这时，我们需要先调用分类模型，判断其分类，并将分类存储在一个数组中

                this.precent_all_c = this.model3.predict(t1)
                this.precent_all_c = this.precent_all_c.argMax(1).dataSync()

                // 这里建立数组，把分类全部变为1  为了批量测试                             ！！！！
                // for (let i1 = 0; i1 < this.num1 + this.num2; i1++) {               //!!!!
                //     this.precent_all_c[i1] = 2                              //!!!!!!!!!!!!!!!!!!
                // }



                // 循环判断，使用对应的模型计算，并将计算结果存入结果大数组
                for (let u1 = 0; u1 < this.num1 + this.num2; u1++) {
                    if (Number(this.precent_all_c[u1]) == 0) {
                        //   如果分类判断为0类，那么调用model
                        // 把这一项数据从大数组中取出,并转换为张量
                        const t = tf.tensor(this.valueList_all[u1])
                        // 修正维度 
                        const t1 = t.reshape([1, 201, 1])
                        // 调用模型计算
                        const pre = this.model.predict(t1)
                        // 结果转换为数字型
                        const pre1 = Number(pre.dataSync(0)).toFixed(4)
                        // 结果存入结果大数组
                        this.predict_all_final[u1] = pre1

                    } else if (Number(this.precent_all_c[u1]) == 1) {
                        //   如果分类判断为1类，那么调用model1
                        // 把这一项数据从大数组中取出,并转换为张量
                        const t = tf.tensor(this.valueList_all[u1])
                        // 修正维度 
                        const t1 = t.reshape([1, 201, 1])
                        // 调用模型计算
                        const pre = this.model1.predict(t1)
                        // 结果转换为数字型
                        const pre1 = Number(pre.dataSync(0)).toFixed(4)
                        // 结果存入结果大数组
                        this.predict_all_final[u1] = pre1
                    } else {
                        //   如果分类判断为2类，那么调用model2
                        // 把这一项数据从大数组中取出,并转换为张量
                        const t = tf.tensor(this.valueList_all[u1])
                        // 修正维度 
                        const t1 = t.reshape([1, 201, 1])
                        // 调用模型计算
                        const pre = this.model2.predict(t1)
                        // 结果转换为数字型
                        const pre1 = Number(pre.dataSync(0)).toFixed(4)
                        // 结果存入结果大数组
                        this.predict_all_final[u1] = pre1
                    }
                }

                // 到此为止，预测数据已经全部放进predict_all_final数组中，准确数据已经全部放到start_all数组中，可以进行性能测试


                // 首先，准备统计检测出的异常数量

                for (let i4 = 0; i4 < this.num1; i4++) {
                    if (this.predict_all_final[i4] >= 0) {
                        this.found_num++
                    }
                }

                // 准备计算判断位置的平均误差
                // 这个要首先确定神经网络返回值大于0，即判断出了异常位置
                // 所以我们需要加判断

                for (let i5 = 0; i5 < this.num1; i5++) {
                    if (this.predict_all_final[i5] >= 0) {
                        this.D_value[i5] = Math.abs(this.predict_all_final[i5] - this.start_all[i5])
                    } else {
                        this.D_value[i5] = 0
                    }
                }

                // 这时候所有的差值已经存储在D_value数组内,准备计算平均值

                let total = 0//定义总值
                for (let i6 = 0; i6 < this.num1; i6++) {
                    total = total + this.D_value[i6]
                }
                this.average_d = total / this.num1

                // 保留四位小数


                this.average_d = this.average_d.toFixed(4)

                this.precent_all = ((this.found_num / this.num1) * 100).toFixed(4)

            } else {
                this.$alert('You did not load the model or generate data', 'Alert:', {
                    confirmButtonText: 'OK',
                });
            }

        },

        // 重置测试
        test_clean() {
            this.num1 = 0;
            this.num2 = 0;
            this.valueList_all = []
            // 存放start位置的大数组
            this.start_all = []
            // 存放预测数据的大数组
            this.predict_all = null
            this.predict_all2 = null
            this.predict_all_final = []
            // 发现异常的数量(性能测试)
            this.found_num = 0
            // 存储模型的误差值
            this.D_value = []
            // 平均误差值
            this.average_d = 0
        }

    }






}
</script>


<style lang="less" scoped>
.file2 {
    opacity: 0;
    width: 0px;
    // filter: alpha(opacity:0);
    opacity: 0;
}

h1 {
    text-align: center;
    font-style: oblique;
    font-size: 20px;
}

.buttonc {
    background-color: black;
}

.mid {
    height: 20px;
}

.input_el {
    width: 150px;
}

.center {
    text-align: center;
}

.font_xuanze {
    font-size: 15px;
    font-weight: 800;
}

.success {
    text-align: center;
    color: rgb(129, 0, 171);
    font-size: 15px;
    font-style: oblique;
}

.shiji_yuce {
    font-size: 20px;
    font-weight: 500;
}

.ac_start {
    color: rgb(0, 68, 195);
}

.pre_start {
    color: rgb(255, 61, 61);
}

.mid_small {
    height: -5px;
}
</style>




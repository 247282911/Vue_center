<template>
  <div>
    <h3>Welcome. This is ##### Bridge - China</h3>
    <div class="bridge">

      <!-- 桥图片 -->
      <img class="bridge_image" src="../assets/主页桥.png" alt="">
      <!-- 闪烁标点 -->

      <div class="point point4" style="top: 230px; left: 300px; "></div>
      <div class="point" style="top:230px;left:467px"></div>
      <div class="point point4" style="top: 230px; left: 630px; "></div>
      <div class="point point4" style="top: 230px; left: 670px; "></div>
      <div class="point point4" style="top: 230px; left: 831px; "></div>
      <div class="point point4" style="top: 230px; left: 992px; "></div>
    </div>
  </div>
</template>
               
<script>
export default {
  methods: {
    // async send() {
    //   // axios发送ajax请求，返回的东西里面我们只需要data就可以了，给他解构赋值给res
    //   const { data: res } = await this.$axios.get("/my/test");
    //   this.data_a = res;
    // },
  },
};
</script>


<style lang="less" scoped>
.bridge {
  width: 100%;
  height: 100%;
  position: relative;

  // background-color: rgb(206, 221, 241);
  // border: 3px solid white;
}

.bridge_image {
  width: 1250px;
  height: 360px;
  position: absolute;
}

h3 {
  text-align: center;
  font-style: oblique;
}

.light1 {
  position: absolute;
  top: 100px;
  left: 500px;
}


// 下面是坐标点闪烁效果代码
.point,
.point::before,
.point::after {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  content: "";
}

.point::before {
  animation: scale 2s infinite;
}

.point::after {
  animation: scale2 2s infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }

  100% {
    transform: scale(6);
    opacity: 0;
  }
}

@keyframes scale2 {
  0% {
    transform: scale(1);
    opacity: 0.9;
  }

  100% {
    transform: scale(12);
    opacity: 0;
  }
}

.point,
.point::before,
.point::after {
  /* 设置颜色 */
  background-color: rgba(241, 34, 30, 0.9);
}

.point2,
.point2::before,
.point2::after {
  /* 设置颜色 */
  background-color: rgba(0, 221, 254, 0.9);
}

.point3,
.point3::before,
.point3::after {
  /* 设置颜色 */
  background-color: rgba(1, 88, 255, 0.9);
}

.point4,
.point4::before,
.point4::after {
  /* 设置颜色 */
  // background-color: rgba(135, 229, 8, 0.9);
  background-color: rgb(22, 208, 8);
}

// 闪烁效果代码结束
</style>
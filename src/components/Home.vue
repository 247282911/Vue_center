<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-left-div">
        <img class="cpu-img" src="../assets/header的芯片.png" alt="" />
        <span class="datacenter">Deep learning of broken wire</span>
      </div>

      <div>
        <span class="welcome">Welcome:&nbsp;<span class="username">{{ now_username }}</span></span>
        <el-button type="info" @click="logout" class="exit-button">Logout</el-button>
      </div>
    </el-header>

    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏        宽度根据是否折叠菜单栏而定-->
      <el-aside :width="isCollapse ? '64px' : '200px'" id="top">
        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单   开启路由模式，index为对应路由地址   关闭折叠展开动画  是否展开/折叠  只允许一个菜单打开    -->
        <el-menu router :collapse-transition='false' :collapse='isCollapse' unique-opened background-color="#545c64"
          text-color="#fff" active-text-color="#ffd04b" id="el-menu">



          <el-menu-item index="/welcome">
            <i class="el-icon-document" id="icon"></i>
            <span slot="title">Homepage</span>
          </el-menu-item>

          <el-menu-item index="/data">
            <i class="el-icon-setting" id="icon"></i>
            <span slot="title">Data module</span>
          </el-menu-item>
          <!-- 
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location" id="icon"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">
                      <i class="el-icon-document" id="icon"></i>
                      <span>选项一</span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                      <i class="el-icon-document" id="icon"></i>
                      <span>选项二</span>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                      <i class="el-icon-document" id="icon"></i>
                      <span>选项三</span>
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu> -->
          <el-menu-item index="/cnn">
            <i class="el-icon-s-grid" id="icon"></i>
            <span slot="title">CNN module</span>
          </el-menu-item>


        </el-menu>

      </el-aside>

      <!-- 右侧内容 -->

      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear();
      //定向到login组件
      this.$router.push("/login");
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  data() {
    return {
      // 读取本地存储中的用户名
      now_username: window.sessionStorage.getItem("username"),
      // 是否折叠
      isCollapse: false,
    };
  },
};
</script>


<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #0e0b16;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cpu-img {
  width: 60px;
  height: 60px;
}

.el-aside {
  background-color: #4a5064;
}

.el-main {
  // background-color: #e7dfdd;
  // background-color: #a9a9a9;
  background-color: rgb(187, 214, 217) //rgb(160, 210, 218) // rgb(154, 159, 167);
}

.datacenter {
  color: #e7dfdd;
  font-size: 20px;
  margin-left: 15px;
  letter-spacing: 1px;
}

.header-left-div {
  display: flex;
  align-items: center;
}

.welcome {
  color: #e7dfdd;
  margin-right: 20px;
  letter-spacing: 1px;
}

.username {
  color: #efaafd;
}

// 让左侧菜单字体图标距离文字有距离
#icon {
  margin-right: 10px;
}

// 解决左侧菜单栏对不齐的情况
#el-menu {
  border-right: none;
}

.toggle-button {
  background-color: rgb(58, 58, 58);
  color: #e7dfdd;
  font-size: 10px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
</style>
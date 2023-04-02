<template>
  <div class="login_container">
    <!-- 放一个登录框的盒子 -->
    <div class="login_box">
      <!-- 再放一个头像的盒子 -->
      <div class="avatar_box">
        <img src="../assets/黑豆.jpg" alt="" />
      </div>
      <!-- 登录表单区域盒子 ,使用element ui,ref获取表单实例对象到this便于下面methods调用,:model绑定数据,:rule绑定验证规则-->
      <el-form ref="loginFormRef" class="login_form" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <!-- 指定prop 对应下面的验证规则 -->
        <el-form-item prop="username">
          <!-- 这边使用了小图标库iconfont，在appjs引入了 (注意prefix-icon仍是elementui的代码)-->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 这是表单的验证规则对象,注意，这里的验证规则也是作为下面的validate提交验证时的验证规则
      loginFormRules: {
        // 验证用户名,分别是 规则，提示消息，触发验证条件
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" },
        ],
        // 验证密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      // 上面用ref将表单实例对象添加到this,这个重置方法是elemrnt ui内的
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 调用验证函数，对提交数据进行登陆前的预验证,如果通过，这个valid就是true
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        // axios发送ajax请求，返回的东西里面我们只需要data就可以了，给他解构赋值给res
        const { data: res } = await this.$axios.post(
          "/api/login",
          this.$qs.stringify(this.loginForm) //这里发送的对象要用qs处理一下
        );

        console.log(res);

        if (res.status == 0) {
          this.$message.success("登陆成功");
          // 吧token拿过来,存到用户端
          window.sessionStorage.setItem("token", res.token);
          // 吧username拿过来，用于主页的用户名显示
          window.sessionStorage.setItem("username", res.username);
          // 然后前端路由跳转到/home主页
          this.$router.push("/home");
        } else {
          // alert("登陆失败");
          this.$message.error("登陆失败");
        }
      });
    },
  },
};
</script>





<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 5px #152433;
  .avatar_box {
    height: 150px;
    width: 150px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 10px 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      //下面这个给图片加背景需要时透明底的png格式图片
      background-color: #eee;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
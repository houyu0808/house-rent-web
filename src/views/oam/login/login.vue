<template>
    <div class="contain">
        <div class="tips">
            <div class="font-s28">易租网 安心租</div>
            <div class="font-s66 font-bold">开始寻找属于你的避风港</div>
        </div>
        <div class="login-box">
            <div class="login-opt">
                <img src="../../../static/icon/name_logo.png" alt="">
                <div class="login-area">
                    <div class="login-title">账号:</div>
                    <el-input class="login-input" v-model="loginInfo.account" placeholder="请输入账号"/>
                </div>
                <div class="login-area">
                    <div class="login-title">密码:</div>
                    <el-input class="login-input" type="password" v-model="loginInfo.password"
                              placeholder="请输入密码"/>
                </div>
                <el-button class="login-btn" type="primary" @click="submitLogin" :loading="showLogin">登录</el-button>
            </div>
            <div class="back-home" @click="backHome">[返回首页]</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {managerLogin} from '../../../http/http'
import {ref, reactive} from "vue";
import {ElMessage} from 'element-plus'
import {useRouter} from "vue-router";

let router = useRouter();

let loginInfo: object = reactive({
    account: "",
    password: ""
})

let showLogin = ref(false)
const submitLogin = () => {
    showLogin.value = true
    managerLogin(loginInfo).then(res => {
        showLogin.value = false
        console.log(res)
        localStorage.setItem('userInfo', JSON.stringify(res.result))
        router.push('/oam')
        ElMessage.success(res.message)
    }).catch(err => {
        showLogin.value = false
        ElMessage.error(err.message)
    })
}

const backHome = () => {
    router.push({path: '/'})
}

</script>

<style scoped lang="scss">
.contain {
    width: 100%;
    height: 100vh;
    background: url("../../../static/background/admin_bkg.jpg") no-repeat;
    background-size: cover;
}

.login-box {
    position: absolute;
    padding: 20px;
    box-sizing: border-box;
    background: white;
    right: 0;
    width: 400px;
    height: 100vh;

}

.login-opt {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 425px;
    margin-top: 50%;
    //margin: ;
}

.tips {
    position: absolute;
    top: 100px;
    left: 100px;
    color: white;
}

.login-area {
    width: 300px;
    margin-top: 20px;

    .login-title {
        font-size: 18px;
        margin: 30px 0 10px;
    }

    .login-input {
        border: none;
        box-shadow: none;
        margin-top: 10px;
    }
}

.login-btn {
    width: 300px;
    height: 46px;
    font-size: 18px;
    letter-spacing: 10px;
    margin-top: 40px;
}

:deep(.el-input__wrapper) {
    box-shadow: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
}

.font-s28 {
    font-size: 28px;
}

.font-s66 {
    font-size: 66px;
}
.back-home{
    color: #3072f6;
    cursor: pointer;
    margin-top: 100px;
    width: 100%;
    text-align: center;
}
</style>
<template>
    <div class="header-box">
        <div class="header-content">
            <img src="../../../static/icon/name_logo.png" alt="logo" class="logo">
        </div>
    </div>
    <div class="main-content">
        <div class="login-box" v-if="active === 1">
            <div class="font-s22">账号登陆</div>
            <div>
                <el-input
                    v-model="login.account"
                    class="w-50 m-2 mt-20 login-input"
                    size="large"
                    placeholder="请输入您的账户名"
                >
                    <template #prefix>
                        <img src="../../../static/icon/account.png" class="login-icon" alt="icon">
                    </template>
                </el-input>
                <el-input
                    v-model="login.password"
                    class="w-50 m-2 mt-20 login-input"
                    size="large"
                    placeholder="请输入您的密码"
                    type="password"
                >
                    <template #prefix>
                        <img src="../../../static/icon/passwrod.png" class="login-icon" alt="icon">
                    </template>
                </el-input>
                <el-button type="primary" class="login-btn" @click="accountLogin">立即登录</el-button>
                <div class="font-s14 mt-20 wd-100">没有账号？<span class="rgs-tips" @click="active = 2">立即注册</span></div>
            </div>
        </div>
        <div class="login-box" v-if="active === 2">
            <div class="font-s22">账号注册</div>
            <div>
                <el-input
                    v-model="register.account"
                    class="w-50 m-2 mt-20 login-input"
                    size="large"
                    placeholder="请输入您的账户名"
                >
                    <template #prefix>
                        <img src="../../../static/icon/account.png" class="login-icon" alt="icon">
                    </template>
                </el-input>
                <el-input
                    v-model="register.password"
                    class="w-50 m-2 mt-20 login-input"
                    size="large"
                    placeholder="请输入您的密码"
                    type="password"
                >
                    <template #prefix>
                        <img src="../../../static/icon/passwrod.png" class="login-icon" alt="icon">
                    </template>
                </el-input>
                <el-input
                    v-model="surePassword"
                    class="w-50 m-2 mt-20 login-input"
                    size="large"
                    placeholder="请再次输入您的密码"
                    type="password"
                >
                    <template #prefix>
                        <img src="../../../static/icon/passwrod.png" class="login-icon" alt="icon">
                    </template>
                </el-input>
                <div class="error-tips" v-if="!samePwd">两次输入密码不一致</div>
                <el-button type="primary" class="login-btn" @click="accountRegister">立即注册</el-button>
                <div class="font-s14 mt-20 wd-100">已有账号?<span class="rgs-tips" @click="active = 1">立即登陆</span></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {userLogin, userRegister} from "../../../http/http";
import {ElMessage} from "element-plus";

const router = useRouter()

let login = ref({
    account: '',
    password: ''
})

let register = ref({
    account: '',
    password: ''
})
let surePassword = ref("")
//用户登录
const accountLogin = () => {
    userLogin(login.value).then(res => {
        localStorage.setItem('userInfo',JSON.stringify(res.result))
        ElMessage.success(res.message)
        router.push({path:'/'})
    }).catch(err => {
        ElMessage.error(err.message);
    })
}
let active = ref(1)
//用户注册
let samePwd = computed(() => {
    return register.value.password === surePassword.value
})
const accountRegister = () => {
    if(samePwd && register.value.password !== '' && register.value.account !== ''){
        userRegister(register.value).then(res => {
            ElMessage.success('注册成功，立刻去登陆吧')
            active.value = 1
        }).catch(err => {
            ElMessage.error(err.message)
        })
    }
}
</script>

<style lang="scss" scoped>
.header-box{
    width: 100%;
    height: 70px;
    border-bottom: 2px solid #3072f6;
    .header-content{
        width: 1170px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
    }
    .logo{
        height: 50px;
    }
}
.main-content{
    width: 100%;
    height: 706px;
    background: url("../../../static/background/bg.jpg") center center no-repeat;
    background-color: #fbfbfb;
    position: relative;
}
.login-box{
    width: 450px;
    background-color: white;
    padding: 25px 45px;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 4px;
    box-shadow: 0px 0px 8px #a7a7a7;
}
.login-icon{
    width: 18px;
    height: 18px;
}
.login-input{
    border: none !important;
}
:deep(.el-input__wrapper){
    border: none !important;
    outline: none;
    box-shadow: none;
    background-color: #F8F9FB;
    height: 50px;
}
.login-btn{
    width: 100%;
    height: 50px;
    border-radius: 0;
    margin-top: 20px;
}
.rgs-tips{
    text-decoration: underline;
    color: #3072f6;
    cursor: pointer;
}
.wd-100{
    width: 100%;
    text-align: center;
}
.error-tips{
    color: red;
    font-size: 12px;
    margin-top: 4px;
}
</style>
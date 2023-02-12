<template>
    <div class="header-content">
        <div class="header-box">
            <div class="flex align-center">
                <img class="logo-icon" src="../../../static/icon/name_logo.png" alt="logo">
                <div class="welcome-tips">
                    <div class="font-s26 font-bold">加入我们，成为房东</div>
                    <div class="font-c99 mt-10">数万线下门店 · 快速全城推广 · 专业经纪人服务</div>
                </div>
            </div>
        </div>
    </div>
    <div class="main-content">
        <el-form :model="user" label-width="120px" label-position="left">
            <el-form-item label="用户昵称">
                <el-input v-model="user.nickName" placeholder="请输入您的昵称" />
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadFile"
                    :data="{fileName:'image'}"
                    :show-file-list="false"
                    :limit="1"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="user.avatar" :src="user.avatar" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="user.gender" class="m-2" placeholder="请选择您的性别" size="large">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="user.phoneNumber" placeholder="请输入您的联系方式" />
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="user.email" placeholder="请输入您的邮箱地址" />
            </el-form-item>
        </el-form>
        <div class="submit-btn">
            <el-button type="primary" size="large" @click="submitApply">保存信息</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {uploadFile, updateUserInfo, getUserInfoById} from "../../../http/http";
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage, UploadProps} from "element-plus";
import {User} from "../../../common/interface";



const userInfo:User = JSON.parse(localStorage.getItem("userInfo")|| "{}")

let user = ref<User>({
    avatar: "",
    email: "",
    gender: 0,
    id: 0,
    nickName: "",
    phoneNumber: "",
    role: 0,
    userId: "",
    username: ""
})
const options = ref([
    {
        label: '男',
        value: 0
    },
    {
        label: '女',
        value: 1
    }
])
const getUserInfo = () => {
    getUserInfoById({userId: userInfo.userId}).then(res => {
        user.value = res.result
    })
}
getUserInfo()

//图片上传成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    user.value.avatar = response.result
}

//图片上传时判断图片是否符合相应条件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    if (rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png'&& rawFile.type !== 'image/jpeg') {
        ElMessage.error('上传格式必须为PNG或者JPG!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('图片尺寸不能大于5MB!')
        return false
    }
    return true
}

const submitApply = () => {
    updateUserInfo(user.value).then(res => {
        localStorage.setItem('userInfo',JSON.stringify(user.value))
        ElMessage.success('保存成功')
    }).catch(err => {
        ElMessage.error(err.message)
    })
}
</script>

<style scoped lang="scss">
.header-content{
    height: 240px;
    box-sizing: border-box;
    padding: 90px 0 20px;
    background: #eaeaea;
    .header-box{
        width: 1170px;
        margin: 0 auto;
        .logo-icon {
            height: 70px;
        }
        .welcome-tips{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 200px;
        }
    }
}
.main-content {
    width: 600px;
    margin: 30px auto;
}
:deep(.el-form-item){
    border-bottom: 1px solid #d7d7d7 !important;
    padding-bottom: 20px !important;
}
:deep(.el-form-item__label){
    font-weight: bold;
    color: #333;
}

:deep(.el-input__wrapper){
    border: none !important;
    outline: none;
    box-shadow: none;
    background: none;
}
.grey-bg{
    background: #dedede !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}
.avatar{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #8e8e8e;
}
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
    border: 1px #999 dashed;
    border-radius: 8px;
}
.submit-btn{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
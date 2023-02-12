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
        <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="真实姓名">
                <el-input v-model="form.realName" placeholder="请输入您的真实姓名" />
            </el-form-item>
            <el-form-item label="所在地区" class="">
                <div class="flex">
                    <el-input class="grey-bg" v-model="form.province" placeholder="请输入您所在的省" />
                    <div class="mr-10">省</div>
                    <el-input class="grey-bg" v-model="form.city" placeholder="请输入您所在的市" />
                    <div class="mr-10">市</div>
                    <el-input class="grey-bg" v-model="form.district" placeholder="请输入您所在的区" />
                    <div class="mr-10">区</div>
                </div>
            </el-form-item>
            <el-form-item label="经营体系">
                <el-select v-model="form.isComp" class="m-2" placeholder="请问您市个体户还是企业" size="large">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="企业经营执照">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadFile"
                    :data="{fileName:'image'}"
                    :show-file-list="false"
                    :limit="1"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="form.compImgUrl" :src="form.compImgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="userData.phoneNumber" placeholder="请输入您的联系方式" />
            </el-form-item>
            <el-form-item label="电子邮箱">
                <el-input v-model="userData.email" placeholder="请输入您的邮箱地址" />
            </el-form-item>
        </el-form>
        <div class="submit-btn">
            <el-button type="primary" size="large" @click="submitApply">提交申请</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {uploadFile,applyToRenter,updateUserInfo} from "../../../http/http";
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage, UploadProps} from "element-plus";
import {User} from "../../../common/interface";

let form = ref({
    userId: '',
    realName: '',
    province: '',
    city: '',
    district: '',
    isComp: '',
    compImgUrl: ''
})

let userData = ref({
    userId: '',
    phoneNumber: '',
    email: ''
})

const userInfo:User = JSON.parse(localStorage.getItem("userInfo")|| "{}")
const options = ref([
    {
        label: '个体户',
        value: 0
    },
    {
        label: '企业',
        value: 1
    }
])

//图片上传成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    form.value.compImgUrl = response.result
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
    if(userInfo.userId){
        form.value.userId = userInfo.userId
        userData.value.userId = userInfo.userId
        applyToRenter(form.value).then(res => {
            updateUserInfo(userData.value).then(r => {
                ElMessage.success('提交成功！')
            })
        })

    }else{
        ElMessage.error('请先登录，再进行申请')
    }
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
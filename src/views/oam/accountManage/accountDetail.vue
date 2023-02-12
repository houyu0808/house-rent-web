<template>
  <div class="container main-box pt-10">
    <el-form
        :model="userDetail"
        label-width="140px"
        class="form-data mt-10"
        label-position="left"
        label-suffix=":"
        :size="'default'"
        status-icon
        :disabled="showEdit"
    >
      <el-form-item label="头像">
        <el-upload
            v-if="!showEdit"
            class="avatar-uploader"
            :action="uploadFile"
            :data="{fileName:'image'}"
            :show-file-list="false"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="userDetail.avatar" :src="userDetail.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <img v-else :src="userDetail.avatar" class="avatar" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userDetail.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userDetail.nickName" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="userDetail.phoneNumber" type="number" placeholder="请输入手机号称" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userDetail.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userDetail.gender" class="m-2" placeholder="请选择您的性别">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="submit-box flex-center mt-10">
      <el-button type="primary" size="large" @click="submit" v-if="!showEdit">保存信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoById,uploadFile,updateUserInfo} from "../../../http/http";
import {RouteLocationNormalized, useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {User} from '../../../common/interface'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

const route:RouteLocationNormalized = useRoute()
const router = useRouter();

let showEdit = ref<boolean>(true)

//判断是来编辑还是查看
if(route.query.type === 'edit'){
  showEdit.value = false
}
let userDetail = ref<User>({
  avatar: "", email: "", gender: 0, id: 0, nickName: "", phoneNumber: "", role: 0, userId: "", username: ""
})
//根据userId查询用户详细信息
const getUserDetail = () => {
  getUserInfoById({userId:route.query.userId}).then(res => {
    userDetail.value = res.result
  })
}
getUserDetail()

//图片上传成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  userDetail.value.avatar = response.result
}

//图片上传时判断图片是否符合相应条件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    ElMessage.error('上传格式必须为PNG或者JPG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片尺寸不能大于4MB!')
    return false
  }
  return true
}

const options = ref<object[]>([
  {
    label: '男',
    value: 0
  },
  {
    label: '女',
    value: 1
  }
])

const submit = () => {
  updateUserInfo(userDetail.value).then(res => {
    ElMessage.success(res.message)
    setTimeout(() => {
      router.back()
    },500)
  })
}

</script>

<style scoped lang="scss">
.container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 100px;
}
.form-data{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  >div{
    flex:0 0 48%;

    align-items: center;
  }
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
.submit-box{
  width: 100%;
}
</style>
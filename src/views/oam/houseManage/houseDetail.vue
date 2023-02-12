<template>
  <div class="container main-box pt-10">
    <el-form
        label-width="140px"
        class="form-data mt-10"
        label-position="left"
        label-suffix=":"
        :size="'default'"
        status-icon
        :disabled="type === 'view'"
    >
      <el-form-item label="头像">
<!--        <el-upload-->
<!--            v-if="type !== 'view'"-->
<!--            class="avatar-uploader"-->
<!--            :action="uploadFile"-->
<!--            :data="{fileName:'image'}"-->
<!--            :show-file-list="false"-->
<!--            :limit="1"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :before-upload="beforeAvatarUpload"-->
<!--        >-->
<!--          <img v-if="user.avatar" :src="user.avatar" class="avatar" />-->
<!--          <el-icon class="avatar-uploader-icon"><Plus /></el-icon>-->
<!--        </el-upload>-->
        <img :src="user.avatar" class="avatar" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="user.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="user.phoneNumber" :disabled="true" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" :disabled="true" />
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
            v-if="type !== 'view'"
            class="avatar-uploader"
            :action="uploadFile"
            :data="{fileName:'image'}"
            :show-file-list="false"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="house.coverUrl" :src="house.coverUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <img v-else :src="house.coverUrl" class="avatar" />
      </el-form-item>
      <el-form-item label="名称(标题)">
        <el-input v-model="house.name" placeholder="请输入房源名称/标题" />
      </el-form-item>
      <el-form-item label="房屋地址">
        <el-input v-model="house.address" placeholder="请选择房屋地址"/>
      </el-form-item>
      <el-form-item label="小区名称">
        <el-input v-model="house.communityName"  placeholder="请输入小区名称" />
      </el-form-item>
      <el-form-item label="房屋类型">
        <el-select v-model="house.type" class="m-2" placeholder="请选择房屋类型">
          <el-option
              v-for="item in houseType"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="面积(平方米)">
        <el-input v-model="house.area" />
      </el-form-item>
      <el-form-item label="楼层">
        <el-input v-model="house.floor" />
      </el-form-item>
      <el-form-item label="房屋朝向">
        <el-select v-model="house.towards" class="m-2" placeholder="请选择房屋朝向">
          <el-option
              v-for="item in towards"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电梯">
        <el-select v-model="house.elevator" class="m-2" placeholder="是否有电梯">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="押金/月">
        <el-input v-model="house.rentFee" />
      </el-form-item>
      <el-form-item label="支付月份">
        <el-input v-model="house.feeMonths" />
      </el-form-item>
      <el-form-item label="押金月份">
        <el-input v-model="house.cashMonths" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" :autosize="true" v-model="house.introduce" />
      </el-form-item>
    </el-form>
    <div class="mt-10 house-img font-s13">
      <div>房屋图片:</div>
      <div class="house-img-box">
        <el-upload
            v-if="type !== 'view'"
            v-model:file-list="fileList"
            :action="uploadFile"
            :data="{fileName:'image'}"
            :auto-upload="false"
            list-type="picture-card"
            :on-change="onFileUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <img v-else v-for="(item,index) in houseImg" :key="item.id" :src="item.imgUrl" class="house-image" />
      </div>
      <el-dialog v-model="dialogVisible" width="30%">
        <img :src="dialogImageUrl" alt="预览房源图片" class="preview-house" />
      </el-dialog>
    </div>
    <div class="submit-box flex-center mt-10">
      <el-button type="primary" size="large" @click="submit" v-if="type !== 'view'">保存信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {houseDetail,uploadFile,houseUpdate,uploadFiles,insertHouseImage,deleteHouseImage} from "../../../http/http";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {User,House,HouseImg} from '../../../common/interface'
import { Plus } from '@element-plus/icons-vue';
import {ElMessage} from "element-plus";
import type { UploadProps, UploadUserFile } from 'element-plus'
import {store} from "../../../store";

const route = useRoute()

const id= route.query.id
const type = route.query.type

const options = ref<object[]>([
  {
    label: '有',
    value: 0
  },
  {
    label: '无',
    value: 1
  }
])
const houseType = ref<string[]>(['洋房','公寓','别墅','单间'])
const towards = ref<string[]>(['东','南','西','北'])

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

let house = ref<House>({
  hall: "",
  room: "",
  toilet: "",
  address: "",
  area: "",
  bedroomDevice: "",
  cashMonths: "",
  city: "",
  communalDevice: "",
  communityName: "",
  coverUrl: "",
  district: "",
  elevator: "",
  feeMonths: "",
  floor: "",
  id: "",
  introduce: "",
  latitude: "",
  longitude: "",
  name: "",
  province: "",
  rentFee: "",
  status: "",
  towards: "",
  type: "",
  userId: "",
  clickTimes: ""
})

let houseImg = ref<HouseImg[]>([])
let fileList = ref<UploadUserFile[]>([])
//获取房源详情
const getHouse = ():void => {
  houseDetail({id}).then(res => {
    user.value = res.result.userVO
    house.value = res.result.houseVO
    houseImg.value = res.result.houseImgVOList
    fileList.value = houseImg.value.map( (obj:HouseImg) => {
      return {
        id: obj.id,
        name: obj.id.toString(),
        url: obj.imgUrl
      }
    })
  })
}
getHouse()

//图片上传成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  house.value.coverUrl = response.result
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
let deleteList:any[] = []
//文件删除事件
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  if(file.id){
    deleteList.push(file.id)
    console.log(deleteList)
  }else{
    let index = uploadImage.indexOf(file)
    uploadImage.splice(index,1)
    console.log(uploadImage)
  }
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//文件预览事件
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

let uploadImage:any[]= []
let uploadImageList:object[]= []
//文件上传处理事件
const onFileUpload:UploadProps['onChange'] = (file) => {
  uploadImage.push(file)
  console.log(uploadImage)
}
//点击提交按钮
const submit = () => {
  let count = 0
  if(uploadImage.length > 0){
    uploadImage.forEach(item => {
      const formData = new FormData()
      formData.append('fileName','image')
      formData.append('file',item.raw)
      uploadFiles(formData).then(res => {
        uploadImageList.push({
          imgUrl: res.result,
          houseId:id
        })
        count++;
        if(count === uploadImage.length ){
          insertHouseImage(uploadImageList).then(res => {
            uploadImage = []
            uploadImageList = []
            if(deleteList.length !== 0){
              deleteHouseImage(deleteList).then(res => {
                deleteList = []
                updateHouseInfo()
              })
            }else{
              updateHouseInfo()
            }
          })
        }
      })
    })
  }else{
    if(deleteList.length !== 0){
      deleteHouseImage(deleteList).then(res => {
        deleteList = []
        updateHouseInfo()
      })
    }else{
      updateHouseInfo()
    }
  }

}

const updateHouseInfo = () => {
  houseUpdate(house.value).then(res => {
    ElMessage.success(res.result)
    getHouse()
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
.house-img{
  justify-content: flex-end;
  align-items: flex-start;
  flex: 0 0 auto;
  color: rgb(96 98 102);
  line-height: 32px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.house-img-box{
  display: flex;
  flex-wrap: wrap;
  .house-image{
    width: 260px;
    height: 260px;
    margin-right: 10px;
  }
}
.el-icon.house-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 260px;
  height: 260px;
  text-align: center;
  border: 1px #999 dashed;
  border-radius: 8px;
}
.preview-house{
  width: 100%;
}
.submit-box{
  width: 100%;
}
</style>
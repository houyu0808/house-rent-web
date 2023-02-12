<template>
  <div class="container main-box pt-10">
    <el-form
        label-width="140px"
        class="form-data mt-10"
        label-position="left"
        label-suffix=":"
        :model="house"
        :rules="rules"
        :size="'default'"
        status-icon
    >
      <el-form-item label="封面" prop="coverUrl">
        <el-upload
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
      </el-form-item>
      <el-form-item label="名称(标题)" prop="name">
        <el-input v-model="house.name" placeholder="请输入房源名称/标题" />
      </el-form-item>
      <el-form-item label="房屋地址" prop="address">
        <div class="flex" style="width: 100%">
          <el-input v-model="house.address" placeholder="请选择房屋地址" :disabled="true" />
          <el-button class="ml-10" @click="toPosition"><img src="../../../static/icon/position.png" alt="定位" ></el-button>
        </div>
      </el-form-item>
      <el-form-item label="小区名称" prop="communityName">
        <el-input v-model="house.communityName"  placeholder="请输入小区名称" />
      </el-form-item>
      <el-form-item label="房屋类型" prop="type">
        <el-select v-model="house.type" class="m-2" placeholder="请选择房屋类型">
          <el-option
              v-for="item in houseType"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="面积(平方米)" prop="area">
        <el-input v-model="house.area" placeholder="请输入房屋面积"/>
      </el-form-item>
      <el-form-item label="房屋布局" >
        <div class="flex">
          <el-input v-model="house.room"></el-input>
          <div class="ml-8 mr-8">室</div>
          <el-input v-model="house.hall"></el-input>
          <div class="ml-8 mr-8">厅</div>
          <el-input v-model="house.toilet"></el-input>
          <div class="ml-8 mr-8">卫</div>
        </div>
      </el-form-item>
      <el-form-item label="楼层" prop="floor">
        <el-input v-model="house.floor" placeholder="请输入房屋楼层"/>
      </el-form-item>
      <el-form-item label="房屋朝向" prop="towards">
        <el-select v-model="house.towards" class="m-2" placeholder="请选择房屋朝向">
          <el-option
              v-for="item in towards"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电梯" prop="elevator">
        <el-select v-model="house.elevator" class="m-2" placeholder="是否有电梯">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="租金/月" prop="rentFee">
        <el-input v-model="house.rentFee" placeholder="请输入每月租金"/>
      </el-form-item>
      <el-form-item label="支付月份" prop="feeMonths">
        <el-input v-model="house.feeMonths" placeholder="亲输入每次需要支付的租金月份"/>
      </el-form-item>
      <el-form-item label="押金月份" prop="cashMonths">
        <el-input v-model="house.cashMonths" placeholder="请输入需要支付的押金月份"/>
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <el-input type="textarea" :autosize="true" v-model="house.introduce" placeholder="请介绍一下该房屋" />
      </el-form-item>
    </el-form>
    <div class="mt-10 house-img font-s13">
      <div>房屋图片:</div>
      <div class="house-img-box">
        <el-upload
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
      </div>
      <el-dialog v-model="dialogVisible" width="30%">
        <img :src="dialogImageUrl" alt="预览房源图片" class="preview-house" />
      </el-dialog>
    </div>
    <div class="submit-box flex-center mt-10">
      <el-button type="primary" size="large" @click="submit">提交审核</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {deleteHouseImage, houseInsert, insertHouseImage, uploadFile, uploadFiles,} from "../../../http/http";
import {useRoute,useRouter} from "vue-router";
import {computed, reactive, ref} from "vue";
import {House, HouseImg, User} from '../../../common/interface'
import { Plus } from '@element-plus/icons-vue';
import {ElMessage} from "element-plus";
import type { UploadProps, UploadUserFile,FormInstance, FormRules } from 'element-plus'
import {store} from "../../../store";

const router = useRouter()

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

const rules = reactive<FormRules>({
  coverUrl: [
    {required: true, message: '请上传封面图片', trigger: 'change',},
  ],
  name: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
})

const userInfo:User = JSON.parse(localStorage.getItem("userInfo") || "{}")

let houseImg = ref<HouseImg[]>([])
let fileList = ref<UploadUserFile[]>([])

//图片上传成功之后的回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  house.value.coverUrl = response.result
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
//文件删除事件
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    let index = uploadImage.indexOf(file)
    uploadImage.splice(index,1)
    console.log(uploadImage)
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//文件预览事件
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

let uploadImage:any[]= []
let houseImgVOList:any = []
//文件上传处理事件
const onFileUpload:UploadProps['onChange'] = (file) => {
  uploadImage.push(file)
  console.log(uploadImage)
}

house.value = store.getters.getHouse
console.log(house.value)

//点击提交按钮
const submit = () => {
  let count:number = 0
  if(uploadImage.length < 1){
    ElMessage.error('请上传至少一张房屋图片')
    return
  }
  uploadImage.forEach(item => {
    house.value.userId = userInfo.userId
    const formData = new FormData()
    formData.append('fileName','image')
    formData.append('file',item.raw)
    uploadFiles(formData).then(res => {
      houseImgVOList.push({
        imgUrl: res.result
      })
      count++;
      if(count === uploadImage.length ){
        houseInsert({houseVO:house.value,houseImgVOList:houseImgVOList}).then(res => {
          if(res.code === 200){
            ElMessage.success(res.result)
            store.commit('setHouse',{
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
            router.back()
          }else{
            ElMessage.error(res.result)
          }
        })
      }
    })
  })

}

//获取定位
const toPosition = () => {
  console.log(house.value)
  store.commit('setHouse',house.value)
  console.log(store.getters.getHouse)
  router.push({path:'/oam/map'})
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
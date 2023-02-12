<template>
  <div class="container">
    <div class="search-box flex main-box">
      <div class="search-input flex">
        <el-input
            v-model="searchContent"
            class="w-50 m-2"
            size="large"
            placeholder="请输入需要搜索的房屋名称(标题)"
        />
        <el-button type="primary" class="ml-10" size="large" :icon="Search" @click="getApplyList">搜索</el-button>
        <el-button type="danger" class="ml-10" size="large" :icon="Delete" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" class="ml-10" size="large" :icon="Plus" @click="houseInsert">添加房源</el-button>
      </div>
    </div>
    <div class="mt-10 table-box main-box">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" empty-text="暂无数据" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="名称(标题)" width="200" />
        <el-table-column prop="coverUrl" label="封面" width="180">
          <template #default="scope">
            <img :src="scope.row.coverUrl" v-if="scope.row.coverUrl" alt="营业执照" class="comp-img">
          </template>
        </el-table-column>
        <el-table-column prop="province" label="省" width="140" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="district" label="区" />
        <el-table-column prop="communityName" label="小区名称" />
        <el-table-column prop="area" label="面积" />
        <el-table-column prop="towards" label="朝向" />
        <el-table-column prop="floor" label="楼层" />
        <el-table-column prop="elevator" label="电梯">
          <template #default="scope">
            <div>{{ scope.row.elevator === 0 ? '无' : '有'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="审核状态">
          <template #default="scope">
            <div :class="statusClass(scope.row)">{{getStatus(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="操作" fixed="right" width="260">
          <template #default="scope">
            <el-button size="small" @click="viewDetail(scope.row,'view')">查看</el-button>
            <el-button size="small" type="success" v-if="scope.row.status === 0 && userInfo.role === 1" @click="approvalApply(scope.row,1)">同意</el-button>
            <el-button size="small" type="danger" v-if="scope.row.status === 0 && userInfo.role === 1" @click="approvalApply(scope.row,2)">拒绝</el-button>
            <el-button size="small" type="success" @click="viewDetail(scope.row,'edit')" v-if="userInfo.role === 1">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box mt-10">
        <el-pagination background layout="prev, pager, next" :total="page.totalElements" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { Search,Delete,Plus } from '@element-plus/icons-vue';
import {houseDelete, approvalHouse, houseSelect} from '../../../http/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import {House, User} from '../../../common/interface'
import {useRouter} from "vue-router";

const router = useRouter()

interface pageAble {
  totalElements: number
}

let searchContent = ref('')
let tableData = ref<House[]>([])
let loading = ref<boolean>(true)

let pageInfo = reactive({
  pageNumber: 1,
  size: 10,
  sort: 'id,desc'
})
const userInfo:User = JSON.parse(localStorage.getItem("userInfo") || "{}")
let page = reactive<pageAble>({
  totalElements: 0
})
//获取用户列表
const getApplyList = () => {
  houseSelect({name:searchContent.value,userId:(userInfo.role === 1 ? '' : userInfo.userId),...pageInfo}).then(res => {
    tableData.value = res.result.content
    page.totalElements = res.result.totalElements
    loading.value = false
  })
}
getApplyList()
//根据数据库定义用户角色
const getStatus = (row:House) => {
  switch (row.status){
    case 0:
      return '审核中';
    case 1:
      return '已通过';
    case 2:
      return '已拒绝'
  }
}
//给不同状态设置不同class类
const statusClass = (row:House) => {
  switch (row.status){
    case 0:
      return 'primary';
    case 1:
      return 'success';
    case 2:
      return 'reject'
  }
}

let selectList:number[] = []

//勾选事件
const handleSelectionChange = (e:House[]) => {
  selectList = []
  e.forEach(item => {
    selectList.push(Number(item.id))
  })
  console.log(selectList)
}
//删除
const deleteItem = (row:House) => {
  ElMessageBox.confirm('确定删除该用户？','警告',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    houseDelete([Number(row.id)]).then(res => {
      ElMessage.success(res.message)
      getApplyList()
    })
  })
}
//批量删除
const batchDelete = () => {
  ElMessageBox.confirm('确定批量删除用户？','警告',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    houseDelete(selectList).then(res => {
      ElMessage.success(res.message)
      getApplyList()
    })
  })
}

//审批房源
const approvalApply = (row:House,status:number) =>{
  approvalHouse({id:row.id,status:status}).then(res => {
    ElMessage.success(res.result)
    getApplyList()
  })
}

const houseInsert  = () => {
  router.push('/oam/house-insert')
}
//去详情页
const viewDetail = (row:House,type:string) => {
  router.push({path:'/oam/house-detail',query:{id:row.id,type:type}})
}
</script>

<style scoped lang="scss">
.search-box{
  height: 40px;
  padding: 10px;
  .search-input{
    width: 720px;
  }
}
.table-box{
  padding: 10px;
}
.page-box{
  display: flex;
  justify-content: center;
}
.prop-text{
  width: 100px;
}
.input-tips{
  color: red;
  font-size: 12px;
  margin-top: 8px;
  margin-left: 82px;
}
.avatar-img{
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.comp-img{
  width: 120px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
}
.review-image{
  width: 100%;
  object-fit: cover;
}
</style>
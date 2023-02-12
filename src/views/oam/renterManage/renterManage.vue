<template>
  <div class="container">
    <div class="search-box flex main-box">
      <div class="search-input flex">
        <el-input
            v-model="searchContent"
            class="w-50 m-2"
            size="large"
            placeholder="请输入需要搜索的姓名"
        />
        <el-button type="primary" class="ml-10" size="large" :icon="Search" @click="getApplyList">搜索</el-button>
        <el-button type="danger" class="ml-10" size="large" :icon="Delete" @click="batchDelete">批量删除</el-button>
      </div>
    </div>
    <div class="mt-10 table-box main-box">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" empty-text="暂无数据" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="realName" label="真实姓名" width="180" />
        <el-table-column prop="province" label="省" width="180" />
        <el-table-column prop="city" label="市" />
        <el-table-column prop="district" label="区" />
        <el-table-column prop="isComp" label="经营户">
          <template #default="scope">
            <div>{{ scope.row.isComp === 0 ? '个体' : '企业'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isComp" label="经营执照">
          <template #default="scope">
            <img :src="scope.row.compImgUrl" alt="营业执照" class="comp-img" @click="reviewCompImg(scope.row)">
            <div v-if="scope.row.isComp === 1">无需执照</div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="审核状态">
          <template #default="scope">
            <div :class="statusClass(scope.row)">{{getStatus(scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button size="small" type="success" v-if="scope.row.status === 0" @click="approvalApply(scope.row,1)">同意</el-button>
            <el-button size="small" type="danger" v-if="scope.row.status === 0" @click="approvalApply(scope.row,2)">拒绝</el-button>
            <el-button size="small" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box mt-10">
        <el-pagination background layout="prev, pager, next" :total="page.totalElements" />
      </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="营业执照预览"
        width="30%"
    >
      <img :src="reviewImg" class="review-image">
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { Search,Delete } from '@element-plus/icons-vue';
import {deleteApply, queryApplyList,approvalApplyRenter} from '../../../http/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import {RenterApply} from '../../../common/interface'

interface pageAble {
  totalElements: number
}

let searchContent = ref('')
let tableData = ref<RenterApply[]>([])
let loading = ref<boolean>(true)

let pageInfo = reactive({
  pageNumber: 1,
  size: 10
})

let page = reactive<pageAble>({
  totalElements: 0
})
//获取用户列表
const getApplyList = () => {
  queryApplyList({realName:searchContent.value,...pageInfo}).then(res => {
    tableData.value = res.result.content
    page.totalElements = res.result.totalElements
    loading.value = false
  })
}
getApplyList()
//根据数据库定义用户角色
const getStatus = (row:RenterApply) => {
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
const statusClass = (row:RenterApply) => {
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
const handleSelectionChange = (e:RenterApply[]) => {
  selectList = []
  e.forEach(item => {
    selectList.push(item.id)
  })
  console.log(selectList)
}
//删除
const deleteItem = (row:RenterApply) => {
  ElMessageBox.confirm('确定删除该用户？','警告',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteApply([row.id]).then(res => {
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
    deleteApply(selectList).then(res => {
      ElMessage.success(res.message)
      getApplyList()
    })
  })
}

let dialogVisible = ref<boolean>(false)
let reviewImg = ref<string>('')
const reviewCompImg = (row:RenterApply) => {
  dialogVisible.value = true
  reviewImg.value = row.compImgUrl
}

const approvalApply = (row:RenterApply,status:number) =>{
  approvalApplyRenter({id:row.id,status:status}).then(res => {
    ElMessage.success(res.result)
    getApplyList()
  })
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
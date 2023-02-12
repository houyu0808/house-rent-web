<template>
  <div class="container">
    <div class="search-box flex main-box">
      <div class="search-input flex">
        <el-input
          v-model="searchContent"
          class="w-50 m-2"
          size="large"
          placeholder="请输入需要搜索的用户名"
        />
        <el-button type="primary" class="ml-10" size="large" :icon="Search" @click="getAccountList">搜索</el-button>
        <el-button type="danger" class="ml-10" size="large" :icon="Delete" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" class="ml-10" size="large" :icon="Plus" @click="dialogVisible = true">创建账户</el-button>
      </div>
    </div>
    <div class="mt-10 table-box main-box">
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" empty-text="暂无数据" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="avatar" label="头像" width="180">
          <template #default="scope">
            <img v-if="scope.row.avatar" :src="scope.row.avatar" alt="头像" class="avatar-img"/>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="phoneNumber" label="电话号码" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            <div>{{ scope.row.gender === 0 ? '男' : '女'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template #default="scope">
              <div>{{getRole(scope.$index, scope.row)}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button size="small" @click="viewDetail(scope.row)">查看</el-button>
            <el-button size="small" type="success" @click="toEditPage(scope.row)">编辑</el-button>
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
        title="添加账户"
        width="30%"
        :before-close="handleClose"
    >
      <div>
        <div class="flex align-center mb-10">
          <div class="prop-text">账号:</div>
          <el-input placeholder="请输入账号(该账号用于登录)" v-model="account"></el-input>
        </div>
        <div class="flex align-center mb-10">
          <div class="prop-text">密码:</div>
          <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
        </div>
        <div class="flex align-center">
          <div class="prop-text">确认密码:</div>
          <el-input placeholder="请再次输入密码" type="password" v-model="surePassword"></el-input>
        </div>
        <div class="input-tips" v-if="showError">两次输入的密码不一致</div>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitInsert">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, computed} from "vue";
import { Search,Delete,Plus } from '@element-plus/icons-vue';
import {getUserInfo,deleteUserById,userRegister} from '../../../http/http'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from "vue-router";
import {User} from '../../../common/interface'

interface pageAble {
  totalElements: number
}

const route = useRouter();

let searchContent = ref('')
let tableData = ref<User[]>([])
let loading = ref<boolean>(true)

let pageInfo = reactive({
  pageNumber: 1,
  size: 10
})

let page = reactive<pageAble>({
  totalElements: 0
})
//获取用户列表
const getAccountList = () => {
  getUserInfo({username:searchContent.value,...pageInfo}).then(res => {
    tableData.value = res.result.content
    page.totalElements = res.result.totalElements
    loading.value = false
  })
}
getAccountList()
//根据数据库定义用户角色
const getRole = (index:number,row:User) => {
  switch (row.role){
    case 1:
      return '管理员';
    case 2:
      return '用户';
    case 3:
      return '房东'
  }
}
//去查看详情页面
const viewDetail = (row:User) => {
  route.push({
    path: '/oam/account-detail',
    query: {type: 'view',userId: row.userId}
  })
}

let selectList:string[] = []

//勾选事件
const handleSelectionChange = (e:User[]) => {
  selectList = []
  e.forEach(item => {
    selectList.push(item.userId)
  })
  console.log(selectList)
}
//删除
const deleteItem = (row:User) => {
  ElMessageBox.confirm('确定删除该用户？','警告',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteUserById([row.userId]).then(res => {
      ElMessage.success(res.message)
      getAccountList()
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
    deleteUserById(selectList).then(res => {
      ElMessage.success(res.message)
      getAccountList()
    })
  })
}

let dialogVisible = ref<boolean>(false)
let account = ref<string>('')
let password = ref<string>('')
let surePassword = ref<string>('')
let showError = ref<boolean>(false)
//计算两次输入密码是否一致
showError = computed<boolean>(() => {
  return password.value !== surePassword.value
})

//对话框关闭事件
const handleClose = () => {
  dialogVisible.value = false
  account.value = ''
  password.value = ''
  surePassword.value = ''
}

//添加账户
const submitInsert = () => {
  if(!showError){
    ElMessage.error('两次输入密码不一致，请重新输入')
  }else{
    userRegister({account:account.value,password:password.value}).then(res => {
      ElMessage.success(res.result)
      getAccountList()
      handleClose()
    })
  }

}

//去编辑页
const toEditPage = (row:User) => {
  route.push({
    path: '/oam/account-detail',
    query: {type: 'edit',userId: row.userId}
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
</style>
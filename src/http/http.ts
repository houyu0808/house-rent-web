import axios from "../service";
import {BASE_URL} from "../common/config";
import {House} from "../common/interface";

//文件上传
export const uploadFile = BASE_URL + '/fileUpload/uploadFile'
//文件删除
export const deleteFile = (params:object) => {
    return axios.post('/fileUpload/deleteFile',{},params)
}
//文件上传
export const uploadFiles = (data:FormData) => {
    return axios.post('/fileUpload/uploadFile',data)
}
//用户登录
export const userLogin = (data:object) => {
    return axios.post('/user/userLogin',data)
}
//管理员登录
export const managerLogin = (data:object) => {
    return axios.post('/user/managerLogin',data)
}
//获取用户信息
export const getUserInfo = (params:object) => {
    return axios.get('/user/getUserInfoByName',params)
}
//删除用户
export const deleteUserById = (data:string[]) => {
    return axios.post('/user/deleteUserById',data)
}
//用户注册
export const userRegister = (data:object) =>{
    return axios.post('/user/registerUser',data)
}
//获取用户详细信息
export const getUserInfoById = (params:object) => {
    return axios.get('/user/getUserInfoById',params)
}
//编辑用户信息
export const updateUserInfo = (data:object) => {
    return axios.post('/user/updateUserInfo',data)
}
//获取申请列表
export const queryApplyList = (params:object) => {
    return axios.get('/renterApply/queryApplyList',params)
}
//批量删除申请
export const deleteApply = (data:number[]) => {
    return axios.post('/renterApply/deleteApply',data)
}
//房东申请审批
export const approvalApplyRenter = (params:object) => {
    return axios.post('/renterApply/approvalApplyRenter',{},params)
}
//查询房源列表
export const houseSelect = (params:object) => {
    return axios.get('/houseRent/houseSelect',params)
}
//批量删除房源
export const houseDelete = (data:number[]) =>{
    return axios.post('/houseRent/houseDelete',data)
}
//审批房源
export const approvalHouse = (params:object) =>{
    return axios.post('/houseRent/approvalHouse',{},params)
}
//查询房源详情
export const houseDetail = (params:object) => {
    return axios.get('/houseRent/houseDetail',params)
}
//添加房源图片
export const insertHouseImage = (data:object[]) => {
    return axios.post('/houseRent/insertHouseImage',data)
}
//删除房源图片
export const deleteHouseImage = (data:number[]) =>{
    return axios.post('/houseRent/deleteHouseImage',data)
}
//更新房源信息
export const houseUpdate = (data:object) =>{
    return axios.post('/houseRent/houseUpdate',data)
}
//发布房源信息
export const houseInsert = (data:object) => {
    return axios.post('/houseRent/houseInsert',data)
}
//查询房东详情
export const renterApplyDetail = (params:object) => {
    return axios.get('/renterApply/queryApplyDetail',params)
}
//查询房东列表
export const getRenterList = (params:object) => {
    return axios.get('/user/getRenterList',params)
}
//申请成为房东
export const applyToRenter = (data:object) => {
    return axios.post('/renterApply/applayToRenter',data)
}
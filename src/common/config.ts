var URL
//配置开发模式和生产模式下不同的后端地址
if(process.env.NODE_ENV === 'development'){
    URL = "http://127.0.0.1:8099/hsrt-ll-api"
}else{
    URL = "http://127.0.0.1:8099/hsrt-ll-api"
}
export const BASE_URL:string = URL
export interface User {
    id: number
    username: string
    userId: string
    role: number
    gender: number
    avatar: string
    email: string
    nickName: string
    phoneNumber: string
}

export interface RenterApply {
    id: number
    userId:string
    realName: string
    province: string
    city:string
    district:string
    isComp:number
    compImgUrl:string
    status: number
}

export interface House{
    id: number | string
    userId:string
    name:string
    coverUrl:string
    address: string
    province:string
    city:string
    district:string
    communityName:string
    longitude: number | string
    latitude: number | string
    area: number | string
    towards:string
    floor: number | string
    elevator: number | string
    type:string
    bedroomDevice:string
    communalDevice:string
    rentFee: number | string
    cashMonths: number | string
    feeMonths: number | string
    introduce:string
    status: number | string
    room: number | string
    hall: number | string
    toilet: number | string
    clickTimes: number | string
}

export interface HouseImg {
    id:number
    imgUrl:string
    houseId: number
}

export interface HouseDetail{
    houseImgVOList:HouseImg[]
    houseVO: House
    UserVO: User
}
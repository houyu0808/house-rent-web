export const webMenu:object[] = [
    {
        name: '首页',
        path: '/home-page'
    },{
        name: '租房',
        path: '/rent-house'
    },{
        name: '成为房东',
        path: '/renter-apply'
    }
]

export const adminMenu:object[] = [
    {
        id: '1',
        title: '用户管理',
        path: 'userManage',
        children: [
            {
                id: '1-1',
                title: '账号管理',
                path: '/oam/account-manage'
            },
            {
                id: '1-2',
                title: '房东申请',
                path: '/oam/renter-manage'
            }
        ]
    },
    {
        id: '2',
        title: '房源管理',
        path: 'houseManage',
        children: [
            {
                id: '2-1',
                title: '房源审批',
                path: '/oam/house-manage'
            }
        ]
    }
]


export const renterMenu:object[] = [
    {
        id: '1',
        title: '房源管理',
        path: 'houseManage',
        children: [
            {
                id: '1-1',
                title: '房源审批',
                path: '/oam/house-manage'
            }
        ]
    }
]
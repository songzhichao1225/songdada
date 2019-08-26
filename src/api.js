import axios from 'axios';



export function _login(data){    //登录
    return axios.post('/api/getVenueLogin',data)
}
export function _register(data){   //注册
    return axios.post('/api/venueregister',data)
}
export function VenueChangePassword(data,headers){   //重置密码
    return axios.post('/api/VenueChangePassword',data,{headers: {'token': headers}})
}


export function getPromoteName(data){   //输入推广专员id号显示其姓名
    return axios.post('/api/getPromoteName',data)
}

export function _code(data){    //获取验证码
    return axios.post('/api/toSendCode',data)
}


export function getProvince(data){    //获取省份
    return axios.post('/api/getProvince',data)
}

export function getCrty(data){    //获取市
    return axios.post('/api/getCrty',data)
}
export function getArea(data){    //获取区县
    return axios.post('/api/getArea',data)
}


export function PerfectingVenueInformation(data,headers){    //完善场馆信息
    return axios.post('/api/PerfectingVenueInformation',data,headers)
}


export function VenueQualifications(data){    //完善资质信息
    return axios.post('/api/VenueQualifications',data)
}

export function getIsStatus(data,headers){    //场馆端~获取场馆、资质信息的审核状态
    return axios.post('/api/getIsStatus',data, {headers: {'token': headers}})
}

export function getVenueIndex(data,headers){    //获取首页数据
    return axios.post('/api/getVenueIndex',data, {headers: {'token': headers}})
}

export function gerVenueName(data,headers){    //获取该场馆名称、消息数量、场地履约率
    return axios.post('/api/gerVenueName',data, {headers: {'token': headers}})
}


export function getReservationActivitieslist(data,headers){    //预约活动列表
    return axios.post('/api/getReservationActivitieslist',data, {headers: {'token': headers}})
}

export function getVenueFieldList(data,headers){    //场地设置列表
    return axios.post('/api/getVenueFieldList',data, {headers: {'token': headers}})
}

export function addVenueField(data,headers){    //添加场地设置
    return axios.post('/api/addVenueField',data, {headers: {'token': headers}})
}

export function getFirstField(data,headers){    //查看某一条场地设置信息置
    return axios.post('/api/getFirstField',data, {headers: {'token': headers}})
}

export function getVenueSport(data,headers){    //查看当前场馆的运动项目
    return axios.post('/api/getVenueSport',data, {headers: {'token': headers}})
}

export function addVenueDiscount(data,headers){    //新增优惠活动
    return axios.post('/api/addVenueDiscount',data, {headers: {'token': headers}})
}
export function getVenueDiscountList(data,headers){    //优惠活动列表
    return axios.post('/api/getVenueDiscountList',data, {headers: {'token': headers}})
}

export function DelVenueDiscount(data,headers){    //删除优惠活动
    return axios.post('/api/DelVenueDiscount',data, {headers: {'token': headers}})
}

export function getFirstDiscount(data,headers){    //查看某一条优惠活动信息
    return axios.post('/api/getFirstDiscount',data, {headers: {'token': headers}})
}


export function getVenueInformation(data,headers){    //获取场馆基本信息
    return axios.post('/api/getVenueInformation',data, {headers: {'token': headers}})
}

export function VenueBindingPhone(data,headers){    //更换绑定手机号
    return axios.post('/api/VenueBindingPhone',data, {headers: {'token': headers}})
}

export function getVenueMoneyList(data,headers){    //我的钱包列表页
    return axios.post('/api/getVenueMoneyList',data, {headers: {'token': headers}})
}

export function getVenueWithdrawalList(data,headers){    //提现记录列表
    return axios.post('/api/getVenueWithdrawalList',data, {headers: {'token': headers}})
}














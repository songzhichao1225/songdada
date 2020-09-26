import axios from 'axios';

//本地全部隐去
// axios.defaults.baseURL = 'https://appstg.tiaozhanmeiyitian.com/';//测试
// axios.defaults.baseURL = 'https://app.tiaozhanmeiyitian.com/';//正式

export let imgUrlTwo='https://app.tiaozhanmeiyitian.com/'  //正式图片路径
// export let imgUrlTwo='https://appstg.tiaozhanmeiyitian.com/'  //测试图片路径

export let wsFn = new WebSocket("wss://www.cg.zhaoduishou.com/socket");//正式socket
// export let wsFn = new WebSocket("wss://cgstg.zhaoduishou.com/socket");//测试socket

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
    return axios.post('/api/toVenueSendCode',data)
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
    return axios.post('/api/PerfectingVenueInformation',data,{headers: {'token': headers}})
}


export function VenueQualifications(data,headers){    //完善资质信息
    return axios.post('/api/VenueQualifications',data,{headers: {'token': headers}})
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
export function VenueSendMessage(data,headers){    //预约活动列表发送消息
    return axios.post('/api/VenueSendMessage',data, {headers: {'token': headers}})
}

export function getVenueReservation(data,headers){    //场地预约情况
    return axios.post('/api/getVenueReservations',data, {headers: {'token': headers}})
}

export function getSiteSettingList(data,headers){    //场地设置列表
    return axios.post('/api/getSiteSettingList',data, {headers: {'token': headers}})
}

export function getVenueFieldList(data,headers){    //场地设置列表22222222222
    return axios.post('/api/getVenueFieldList',data, {headers: {'token': headers}})
}
export function addVenueField(data,headers){    //添加场地设置
    return axios.post('/api/addVenueField',data, {headers: {'token': headers}})
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

export function getVenueIsClose(data,headers){    //查询场馆是否关闭预约
    return axios.post('/api/getVenueIsClose',data, {headers: {'token': headers}})
}

export function VenueIsClose(data,headers){    //关闭预约
    return axios.post('/api/VenueIsClose',data, {headers: {'token': headers}})
}

export function VenueTemporarilyClosed(data,headers){    //临时关闭预约
    return axios.post('/api/VenueTemporarilyClosed',data, {headers: {'token': headers}})
}


export function getVenueMoneyList(data,headers){    //我的钱包列表页
    return axios.post('/api/getVenueMoneyList',data, {headers: {'token': headers}})
}

export function getVenueMoney(data,headers){    //我的钱包余额
    return axios.post('/api/getVenueMoney',data, {headers: {'token': headers}})
}

export function getVenueWithdrawalList(data,headers){    //提现记录列表
    return axios.post('/api/getVenueWithdrawalList',data, {headers: {'token': headers}})
}
  
export function getCommentList(data,headers){    //用户对该场馆的评价列
    return axios.post('/api/getCommentList',data, {headers: {'token': headers}})
}
export function getOverallScore(data,headers){    //场馆端整体评分
    return axios.post('/api/getOverallScore',data, {headers: {'token': headers}})
}
export function VenueCommentReply(data,headers){    //场馆端回复用户评论
    return axios.post('/api/VenueCommentReply',data, {headers: {'token': headers}})
}

export function getVenueWithdrawalOneList(data,headers){    //提现申请中的接口（钱包、银行卡）
    return axios.post('/api/getVenueWithdrawalOneList',data, {headers: {'token': headers}})
}
export function VenueWithdrawal(data,headers){    //申请提现
    return axios.post('/api/VenueWithdrawal',data, {headers: {'token': headers}})
}

export function getVenueWalletDetailsList(data,headers){    //手机端钱包明细列表 
    return axios.post('/api/getVenueWalletDetailsList',data, {headers: {'token': headers}})
}


export function VenueForgetPass(data){    //忘记密码
    return axios.post('/api/VenueForgetPass',data)
}

export function VenueSelectSiteName(data,headers){    //一个法人多个场馆情况将查询出来的场馆显示让用户自己选修改哪个场馆的 
    return axios.post('/api/VenueSelectSiteName',data, {headers: {'token': headers}})
}

export function VenueInformationSave(data,headers){    //修改场馆基本信息
    return axios.post('/api/VenueInformationSave',data, {headers: {'token': headers}})
}

export function getVenueNewsList(data,headers){    //消息中心列表
    return axios.post('/api/getVenueNewsList',data, {headers: {'token': headers}})
}

export function getVenueNewsReceivedList(data,headers){    //我发布的消息
    return axios.post('/api/getVenueNewsReceivedList',data, {headers: {'token': headers}})
}
export function delVenueNews(data,headers){    //删除某条消息
    return axios.post('/api/delVenueNews',data, {headers: {'token': headers}})
}
export function VenueNewsSendMessage(data,headers){    //消息中心给平台发送消息
    return axios.post('/api/VenueNewsSendMessage',data, {headers: {'token': headers}})
}



export function getVenueNewsFirst(data,headers){    //查看消息中心的某一条消息
    return axios.post('/api/getVenueNewsFirst',data, {headers: {'token': headers}})
}



export function getVenueIssecondaudit(data,headers){    // 获取该场馆二级审核状态
    return axios.post('/api/getVenueIssecondaudit',data, {headers: {'token': headers}})
}


export function getVenueQualificationInformation(data,headers){    // 获取场馆资质信息
    return axios.post('/api/getVenueQualificationInformation',data, {headers: {'token': headers}})
}

export function getVenueOpenBank(data,headers){    // 获取银行的类型
    return axios.post('/api/getVenueOpenBank',data, {headers: {'token': headers}})
}

export function getVenueOpenBankProvince(data,headers){    // 获取省
    return axios.post('/api/getVenueOpenBankProvince',data, {headers: {'token': headers}})
}

export function getVenueOpenBankCity(data,headers){    // 获取市
    return axios.post('/api/getVenueOpenBankCity',data, {headers: {'token': headers}})
}


export function getVenueOpenBankList(data,headers){    // 获取银行的开户行
    return axios.post('/api/getVenueOpenBankList',data, {headers: {'token': headers}})
}


export function VenueQualificationInformationSave(data,headers){    // 修改场馆端资质信息
    return axios.post('/api/VenueQualificationInformationSave',data, {headers: {'token': headers}})
}


export function VenueClickCancelPlace(data,headers){    // 场馆端关闭开启某个时间段的场地
    return axios.post('/api/VenueClickCancelPlace',data, {headers: {'token': headers}})
}


export function VenueTemporarilyClosedList(data,headers){    // 临时关闭预约列表
    return axios.post('/api/VenueTemporarilyClosedList',data, {headers: {'token': headers}})
}


export function VenueTemporarilyClosedDel(data,headers){    // 删除某一条关闭的预约 
    return axios.post('/api/VenueTemporarilyClosedDel',data, {headers: {'token': headers}})
}


export function VenueTemporarilyClosedSave(data,headers){    // 编辑临时关闭预约 
    return axios.post('/api/VenueTemporarilyClosedSave',data, {headers: {'token': headers}})
}

export function getIsUserName(data,headers){    // 判断用户名是否已存在
    return axios.post('/api/getIsUserName',data, {headers: {'token': headers}})
}

export function getSetUpFieldSportId(data,headers){    // 场馆端添加优惠活动时查询已经设置了场地设置的运动项目id 
    return axios.post('/api/getSetUpFieldSportId',data, {headers: {'token': headers}})
}

export function VenueNewsHistoricalRecord(data,headers){    // 场馆针对某个活动给用户发送消息后的记录
    return axios.post('/api/VenueNewsHistoricalRecord',data, {headers: {'token': headers}})
}

export function getVenueHelpCenter(data,headers){    // 场馆帮助中心
    return axios.post('/api/getVenueHelpCenter',data, {headers: {'token': headers}})
}



export function VenueRemarksLabel(data,headers){    // 场馆端取消场地后的线下备注标签内容
    return axios.post('/api/VenueRemarksLabel',data, {headers: {'token': headers}})
}




export function getAppVenueReservation(data){    //用户app端进行选择活动时间
    return axios.post('/api/getAppVenueReservation',data)
}



export function checkChooseTimes(data,headers){    // 检测发布者发布活动时间 
    return axios.post('/api/checkChooseTimes',data, {headers: {'token': headers}})
}

export function getVenueSpecialList(data,headers){    // 特殊场地号列表
    return axios.post('/api/getVenueSpecialList',data, {headers: {'token': headers}})
}

export function getVenueSpecialDel(data,headers){    // 删除某一个特殊场地号
    return axios.post('/api/getVenueSpecialDel',data, {headers: {'token': headers}})
}

export function getVenueSpecialSave(data,headers){    // 特殊场地号添加修改 
    return axios.post('/api/getVenueSpecialSave',data, {headers: {'token': headers}})
}


export function VenueNewsOneKeyRead(data,headers){    // 消息中心一键已读功能 
    return axios.post('/api/VenueNewsOneKeyRead',data, {headers: {'token': headers}})
}

export function getVenueSporttypelist(data,headers){    // ~场馆端（台球，足球，高尔夫）下的二级分类列表
    return axios.post('/api/getVenueSporttypelist',data, {headers: {'token': headers}})
}

export function VenueNumberSporttypeSave(data,headers){    // 场馆端修改台球，足球，高尔夫下的分类
    return axios.post('/api/VenueNumberSporttypeSave',data, {headers: {'token': headers}})
}


export function getVenueSportList(data){    // 获取所有的运动项目
    return axios.post('/api/getVenueSportList',data, {headers: {}})
}


export function getVenueSportidTitle(data,headers){    // 场地细分~查询场馆中某一运动项目下的标签
    return axios.post('/api/getVenueSportidTitle',data, {headers: {'token': headers}})
}

export function getVenueTitleSave(data,headers){    // 场地细分~添加修改标签
    return axios.post('/api/getVenueTitleSave',data, {headers: {'token': headers}})
}

export function getVenueNumberTitleSave(data,headers){    // 场地细分~场地细分的添加修改
    return axios.post('/api/getVenueNumberTitleSave',data, {headers: {'token': headers}})
}

export function getVenueNumberTitleList(data,headers){    // 场地细分~场地细分~场地细分列表
    return axios.post('/api/getVenueNumberTitleList',data, {headers: {'token': headers}})
}


export function getVenueNumberTitleFirst(data,headers){    // 场地细分~获取某一个场地细分
    return axios.post('/api/getVenueNumberTitleFirst',data, {headers: {'token': headers}})
}

export function getSiteSelectedVenueid(data,headers){    // 场地细分~获取场馆中某一个运动项目已经选择了的场地编号
    return axios.post('/api/getSiteSelectedVenueid',data, {headers: {'token': headers}})
}

export function DelVenueNumberTitle(data,headers){    // 场地细分~删除某一个场地细分
    return axios.post('/api/DelVenueNumberTitle',data, {headers: {'token': headers}})
}

export function getSiteSelectedTitle(data,headers){    // 场地细分~查询场馆中某一运动项目下的场地细分
    return axios.post('/api/getSiteSelectedTitle',data, {headers: {'token': headers}})
}

export function AddSiteSetting(data,headers){    // 添加与修改场地设置
    return axios.post('/api/AddSiteSetting',data,{headers: {'token': headers}})
}

export function getSiteSettingFirst(data,headers){    // 查询某一条场地设置
    return axios.post('/api/getSiteSettingFirst',data,{headers: {'token': headers}})
}

export function DelSiteSetting(data,headers){    // 删除场地设置
    return axios.post('/api/DelSiteSetting',data,{headers: {'token': headers}})
}

export function SiteSettingDiscountSave(data,headers){    //编辑优惠活动
    return axios.post('/api/SiteSettingDiscountSave',data,{headers: {'token': headers}})
}

export function getAppVenueReservations(data,headers){    //App选择场地
    return axios.post('/api/getAppVenueReservations',data,{headers: {'token': headers}})
}

export function DelSiteSettingDiscount(data,headers){    //删除优惠活动设置
    return axios.post('/api/DelSiteSettingDiscount',data,{headers: {'token': headers}})
}

export function DelVenueTitle(data,headers){    //场地细分~删除某一个标签
    return axios.post('/api/DelVenueTitle',data,{headers: {'token': headers}})
}

export function getSetPriceVenueSport(data,headers){    //获取某一个场馆已经设置了价格设置的运动项目（用户临时关闭预约列表）
    return axios.post('/api/getSetPriceVenueSport',data,{headers: {'token': headers}})
}

export function getAPPVenueSelectSite(data,headers){    //选择场地时判断时间是否重叠、场馆是否关闭预约
    return axios.post('/api/getAPPVenueSelectSite',data,{headers: {'token': headers}})
}

export function getIsClosedPublic(data,headers){    //查询临时关闭预约时所选择的时间段中是否有活动
    return axios.post('/api/getIsClosedPublic',data,{headers: {'token': headers}})
}

export function VenueFeedback(data,headers){    //意见反馈 
    return axios.post('/api/VenueFeedback',data,{headers: {'token': headers}})
}


export function getIsSignOut(data,headers){    //查询该token是否可用
    return axios.post('/api/getIsSignOut',data,{headers: {'token': headers}})
}

export function TemporaryVenueInformation(data,headers){    //临时添加场馆基本信息（保存按钮）
    return axios.post('/api/TemporaryVenueInformation',data,{headers: {'token': headers}})
}

export function TemporaryQualificationInformation(data,headers){    //临时添加资质信息（保存按钮）
    return axios.post('/api/TemporaryQualificationInformation',data,{headers: {'token': headers}})
}

export function getVenueQualifiedCompany(data,headers){    //填写资质信息时，查询公司名称是否存在 
    return axios.post('/api/getVenueQualifiedCompany',data,{headers: {'token': headers}})
}

export function getVenueQualified(data,headers){    //填写资质信息时，查询公司名称是否存在 
    return axios.post('/api/getVenueQualified',data,{headers: {'token': headers}})
}

export function getVenueComplainList(data,headers){    //在活动列表，查看某一个活动的投诉结论
    return axios.post('/api/getVenueComplainList',data,{headers: {'token': headers}})
}

export function VenueReceivingBankInformation(data,headers){    //修改场馆银行收款信息 
    return axios.post('/api/VenueReceivingBankInformation',data,{headers: {'token': headers}})
}

export function getReceivingBankQualifications(data,headers){    //是否具备提现资格（判断当前场馆的银行收款信息是否填写完整并且通过审核）
    return axios.post('/api/getReceivingBankQualifications',data,{headers: {'token': headers}})
}

export function getSiteSettingHistoryList(data,headers){    //获取历史设置记录列表 
    return axios.post('/api/getSiteSettingHistoryList',data,{headers: {'token': headers}})
}

export function UploadVenueImgs(data){    //上传场馆端的图片
    return axios.post('/api/UploadVenueImgs?type=Venue',data,{headers:{'Content-Type':'multipart/form-data'}})
}

export function UploadVenueImgsLisen(data){    //上传营业执照
    return axios.post('/api/UploadVenueImgs?type=Venuelisence',data,{headers:{'Content-Type':'multipart/form-data'}})
}

export function UploadVenueImgsLisenTwo(data){    //上传身份证
    return axios.post('/api/UploadVenueImgs?type=VenueIdCardImgs',data,{headers:{'Content-Type':'multipart/form-data'}})
}


export function VenueVerifyThatAllAreFilledIn(data,headers){    //验证基本信息是否填写完整  
    return axios.post('/api/VenueVerifyThatAllAreFilledIn',data,{headers: {'token': headers}})
}

export function getMembershipRechargeDetails(data,headers){    //场馆端~会员卡弹窗中，获取正在对该场馆发起的会员卡充值详情
    return axios.post('/api/getMembershipRechargeDetails',data,{headers: {'token': headers}})
}

export function MembershipRechargeAgreeToRefuse(data,headers){    //场馆端~会员卡弹窗中，场馆端进行会员卡充值的确认与拒绝
    return axios.post('/api/MembershipRechargeAgreeToRefuse',data,{headers: {'token': headers}})
}

export function getMembershipCollectionDetails(data,headers){    //场馆端~获取正在对该场馆的汇款凭证信息,待确认收款 
    return axios.post('/api/getMembershipCollectionDetails',data,{headers: {'token': headers}})
}

export function getCompleteMembershipRechargeDetails(data,headers){    //场馆端~获取该场馆会员卡的完整详情
    return axios.post('/api/getCompleteMembershipRechargeDetails',data,{headers: {'token': headers}})
}

export function MembershipCollectionAgreeToRefuse(data,headers){    //场馆端~财务汇款后，待场馆端进行收款的确认（点击确认按钮）
    return axios.post('/api/MembershipCollectionAgreeToRefuse',data,{headers: {'token': headers}})
}

export function getVenueMembershipCardConsumptionList(data,headers){    //场馆端~会员卡的收入与支出列表
    return axios.post('/api/getVenueMembershipCardConsumptionList',data,{headers: {'token': headers}})
}

export function VenueQualifications_another(data,headers){    //场馆端2020-09-21添加场馆资质信息 
    return axios.post('/api/VenueQualifications_another',data,{headers: {'token': headers}})
}

export function VenueQualificationInformationSave_another(data,headers){    //场馆端2020-09-21修改场馆资质信息
    return axios.post('/api/VenueQualificationInformationSave_another',data,{headers: {'token': headers}})
}

export function TemporaryQualificationInformation_another(data,headers){    //场馆端2020-09-21临时添加资质信息（保存按钮）
    return axios.post('/api/TemporaryQualificationInformation_another',data,{headers: {'token': headers}})
}


  































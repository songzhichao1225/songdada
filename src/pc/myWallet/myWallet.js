import React from 'react';
import './myWallet.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList, getVenueWithdrawalList, imgUrlTwo, getVenueWithdrawalOneList, VenueWithdrawal, getReceivingBankQualifications, gerVenueName, getVenueMembershipCardConsumptionList, MembershipCollectionAgreeToRefuse, getCompleteMembershipRechargeDetails, getMembershipCollectionDetails, MembershipRechargeAgreeToRefuse, getMembershipRechargeDetails, getVenueOpenBank, getVenueOpenBankProvince, getVenueOpenBankList, getVenueOpenBankCity, VenueReceivingBankInformation } from '../../api';
import { DatePicker, Row, Col, Pagination, message, Input, Modal, Radio, Upload, Select, Popconfirm, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能使用JPG/PNG格式！');
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error('图片不能超过5MB!');
  }
  return isJpgOrPng && isLt2M;
}






class myWallet extends React.Component {

  state = {
    flag: 1,//是否点击了提现记录
    moneyList: [],//钱包列表
    recordList: [],//提现记录
    loading: true,
    hidden: '',
    hiddenTwo: '',
    walletList: [],
    moneyYuan: '',
    allNow: '',
    sumMoney: '0',
    DiscountMoney: '0',
    whereMoney: '0',
    start: '',
    end: '',
    dateString: [],
    other: 0,
    page: 1,
    recordListOther: '',
    pageOne: 1,
    kod: 0,
    maxmoney: '0.00',
    koL: true,
    visible: false,
    imageUrlTwo: '',//身份证正面照
    imageUrlThree: '',//身份证反面照
    numRadio: 1,//账号类型
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    corporateCardId: '',
    imgFile: '',
    imgFileTwo: '',
    corporateId: '',
    imgHood: '',
    corporateOpen: '',
    flagHead: 0,
    vipVisible: false,
    vipList: [],
    vipNot: '',
    vipListTwo: [],
    imgMasking: '',
    masking: false,
    chargeDetails: [],
    chargeDetailsNum: '',
    index: 1,
    sumptionList: [],
    startSump: '',
    endSump: '',
    koTwo: 0,
    sumptionListNum: 0,
    numRadioTwo: 0,//结算账号
    inCorName: '',
    inChargeNa: '',//负责人姓名,
    pageTwo: 1,
    Bankphone:'',
  }

  dateChange = (data, dateString) => {
    this.setState({ dateString: dateString, start: dateString[0], end: dateString[1], kod: 1 })
  }
  search = () => {
    this.setState({ kod: 0, page: 1 })
    this.getVenueMoneyList({ start: this.state.dateString[0], end: this.state.dateString[1], page: 1 })
  }

  searchTwo = () => {
    this.setState({ kodTwo: 0 })
    this.getVenueMembershipCardConsumptionList({ page: 1, type: this.state.index, startdate: this.state.startSump, enddate: this.state.endSump })
  }

  dateChangeTwo = (data, dateString) => {
    this.setState({ startSump: dateString[0], endSump: dateString[1], koTwo: 1 })
  }

  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, sessionStorage.getItem('venue_token'))

    if (res.data.code !== 2000) {
      this.setState({ loading: false, hidden: false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ moneyList: res.data.data.data, sumMoney: res.data.data.sumMoney, DiscountMoney: res.data.data.DiscountMoney, whereMoney: res.data.data.whereMoney, other: parseInt(res.data.data.count), loading: false, hidden: true })
    }
  }

  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.data.length < 1) {
      this.setState({ hiddenTwo: false })
    } else {
      let opank = res.data.data
      for (let i in opank) {
        opank[i].OpeningBank = opank[i].OpeningBank.slice(0, opank[i].OpeningBank.indexOf('公司') + 2)
      }
      this.setState({ recordList: res.data.data, recordListOther: res.data.other.maxcount, maxmoney: res.data.other.maxmoney, hiddenTwo: true })
    }
  }

  async getMembershipRechargeDetails(data) {
    const res = await getMembershipRechargeDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipList: res.data.data })
    }
  }


  async getMembershipCollectionDetails(data) {
    const res = await getMembershipCollectionDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipListTwo: res.data.data })
    }
  }

  async getCompleteMembershipRechargeDetails(data) {
    const res = await getCompleteMembershipRechargeDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ chargeDetails: res.data.data, chargeDetailsNum: res.data.other })
    } else {
      this.setState({ chargeDetailsNum: res.data.other })
    }
  }

  async getVenueMembershipCardConsumptionList(data) {
    const res = await getVenueMembershipCardConsumptionList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      this.setState({ sumptionList: res.data.data, sumptionListNum: res.data.other.maxcount })

    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    }
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ gerVenueNameName: res.data.data.name, gerVenueNameRate: res.data.data.rate, ishaverecharge: res.data.data.ishaverecharge })
      sessionStorage.setItem('mess', res.data.data.mess)
      sessionStorage.setItem('siteuid', res.data.data.siteuid)
      sessionStorage.setItem('ishaverecharge', res.data.data.ishaverecharge)
      if (res.data.data.ishaverecharge === 1) {
        this.setState({ vipVisible: true })
        this.getMembershipRechargeDetails()
      } else if (res.data.data.ishaverecharge === 2) {
        this.setState({ vipVisibleTwo: true })
        this.getMembershipCollectionDetails()
      }else if (res.data.data.ishaverecharge === 3) {
        this.getReceivingBankQualificationsThree()
      }
    }
  }


  async getReceivingBankQualificationsThree(data) {
    const res = await getReceivingBankQualifications(data, sessionStorage.getItem('venue_token'))
      if(res.data.code===4004){
       message.warning(res.data.msg)
      }else if(res.data.code===4002){
        message.warning(res.data.msg)
        this.setState({ visible: true })
       }else if(res.data.code===4003){
        this.setState({ visible: true })
        message.warning(res.data.msg)
       }else if(res.data.code!==2000&&res.data.code!==4001&&res.data.code!==4002&&res.data.code!==4003&&res.data.code!==4004){
        message.warning(res.data.msg)
      }
  }




  componentDidMount() {
    setInterval(() => {
      if (sessionStorage.getItem('wallet') === 'false') {
        this.setState({ flag: 1 })
        sessionStorage.setItem('wallet', true)
      }
    }, 50)

    
    this.gerVenueName()
    this.getCompleteMembershipRechargeDetails()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()
    if (sessionStorage.getItem('incomtime') !== 'null' && sessionStorage.getItem('incomtime') !== null) {
      if (sessionStorage.getItem('incomtime') === '1') {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ startSump: start, endSump: end, start: start, end: end, dateString: [start, end], koL: false })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
        this.getVenueMembershipCardConsumptionList({ page: 1, type: this.state.index, startdate: start, enddate: end })
      } else if (sessionStorage.getItem('incomtime') === '2') {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ startSump: start, endSump: end, start: start, end: end, dateString: [start, end], koL: false })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
        this.getVenueMembershipCardConsumptionList({ page: 1, type: this.state.index, startdate: start, enddate: end })
      }
    } else if (sessionStorage.getItem('incomtime') === 'null') {
      let start = moment().startOf('day').subtract(6, 'days')._d.toLocaleDateString().replace(/\//g, "-")
      let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
      this.setState({ startSump: start, endSump: end, start: start, end: end, dateString: [start, end], koL: true })
      this.getVenueMoneyList({ start: start, end: end, page: 1 })
      this.getVenueMembershipCardConsumptionList({ page: 1, type: this.state.index, startdate: start, enddate: end })
    }
  }
  record = () => {
    this.setState({ flag: 2, pageOne: 1 })
    this.getVenueWithdrawalList({ page: 1 })
  }
  returnN = () => {
    this.setState({ flag: 1 })
  }
  withdrawal = () => {

    this.getReceivingBankQualifications()

  }

  moneyFen = (page, pageSize) => {
    this.setState({ page: page })
    this.getVenueMoneyList({ start: this.state.start, end: this.state.end, page: page })
  }



  async getVenueWithdrawalOneList(data) {
    const res = await getVenueWithdrawalOneList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ walletList: res.data.data })
    }
  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ flag: 1 })
      message.success('提现申请成功')
      this.getVenueMoneyList({ start: this.state.dateString[0], end: this.state.dateString[1], page: this.state.page })
    } else {
      message.error(res.data.msg)
    }
  }
  all = () => {
    this.setState({ moneyYuan: this.state.walletList.money })
  }
  allNow = e => {
    this.setState({ moneyYuan: e.target.value })
  }

  async getReceivingBankQualifications(data) {
    const res = await getReceivingBankQualifications(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ flag: 3 })
      this.getVenueWithdrawalOneList()
    } else if (res.data.code === 4004) {
      message.error(res.data.msg)
    } else {
      this.setState({ visible: true })
    }
  }

  comfir = () => {
    this.VenueWithdrawal({ money: this.state.moneyYuan })
  }

  handleCancelTwo = () => {
    this.setState({ visible: false })
  }
  recordListOther = (page, pageSize) => {
    this.setState({ pageOne: page })
    this.getVenueWithdrawalList({ page: page })
  }


  handleChangeTwo = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (this.state.imgFileTwo !== '') {
        this.setState({ imageUrlTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlThree: '', imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL, imgFileTwo: '' })
      } else {
        this.setState({ imageUrlTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL })
      }
    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    }
  };

  handleChangeThree = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (this.state.imageUrlThree !== '') {
        this.setState({ imageUrlThree: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlTwo: '', imgHood: info.file.response.data.baseURL, imgFileTwo: info.file.response.data.filesURL, imgFile: '' })
      } else {
        this.setState({ imageUrlThree: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFileTwo: info.file.response.data.filesURL })
      }

    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    }
  }
  numRadio = e => {
    this.setState({ numRadio: e.target.value })
  }

  numRadioTwo = e => {
    this.setState({ numRadioTwo: e.target.value, numRadio: e.target.value })
  }
  inCorName = e => {
    this.setState({ inCorName: e.target.value })
  }
  inChargeNa = e => {
    this.setState({ inChargeNa: e.target.value })
  }

  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ type: res.data.data, flagOne: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let name = res.data.data
      let arrName = []
      for (let i in name) {
        let obj = {}
        obj.name = name[i].sub_branch_name
        obj.nameT = name[i].sub_branch_name.slice(name[i].sub_branch_name.indexOf('公司') + 2, name[i].sub_branch_name.length)
        arrName.push(obj)
      }
      this.setState({ backList: arrName, flagThree: false })
    }
  }

  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
    }
  }

  corporateCardId = e => {
    this.setState({ corporateCardId: e.target.value })
  }
  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }

  typeChange = e => {
    this.setState({ bank_id: e, province_id: '', city_id: '', corporateOpen: '', backList: [] })
  }
  provinceChange = e => {
    this.setState({ province_id: e, city_id: '', corporateOpen: '', backList: [] })
    this.getVenueOpenBankCity({ province_id: e })
  }
  cityChange = e => {
    this.setState({ city_id: e, corporateOpen: '', backList: [] })
  }

  handleSearch = e => {
    if (this.state.city_id === '') {
      message.error('请选择所在市')
    } else {
      this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
    }
  }


  async VenueReceivingBankInformation(data) {
    const res = await VenueReceivingBankInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('提交成功')
      this.setState({ visible: false })
    } else {
      message.error(res.data.msg)
    }
  }

  Bankphone=e=>{
    this.setState({Bankphone:e.target.value})
  }


  ziSubmitTwo = () => {
    let { numRadio, numRadioTwo, inCorName,Bankphone, inChargeNa, imgHood, imgFile, corporateId, imgFileTwo, corporateCardId, corporateOpen, bank_id, province_id, city_id } = this.state
    let data = {
      Bankcard: numRadio === 0 ? '' : corporateId,
      legalBaseURL: numRadioTwo === 1 ? imgHood : numRadio === 1 ? imgHood : '',
      legalFilesURL: numRadioTwo === 1 ? imgFile + '|' + imgFileTwo : numRadio === 1 ? imgFile + '|' + imgFileTwo : '',
      Bankname: numRadio === 0 ? '' : inChargeNa,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      Banktype: bank_id,
      ProvinceBank: province_id,
      CityBank: city_id,
      account: numRadioTwo,
      Bankphone:Bankphone,
      Bankcorporate: numRadio === 0 ? inCorName : '',
    }

    if (numRadio && imgFile === undefined) {
      message.error('图片违规请重新上传')
    } else if (numRadio && imgFileTwo === undefined) {
      message.error('图片违规请重新上传')
    }else if(data.Bankphone===''){
       message.warning('请输入联系号码')
    } else {
      this.VenueReceivingBankInformation(data)
    }
  }
  corporateId = e => {
    this.setState({ corporateId: e.target.value })
  }
  flagHead = () => {
    this.setState({ flagHead: 0 })
  }
  flagHeadTwo = () => {
    this.setState({ flagHead: 1 })
  }

  handleCancelOne = () => {
    this.setState({ vipVisible: false })
  }
  handleCancelThree = () => {
    this.setState({ vipVisibleTwo: false })
  }

  vipNot = e => {
    this.setState({ vipNot: e.target.value })
  }

  async MembershipRechargeAgreeToRefuse(data) {
    const res = await MembershipRechargeAgreeToRefuse(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.gerVenueName()
      this.setState({ vipVisible: false })
    } else {
      message.error(res.data.msg)
    }
  }


  bukeyi = e => {
    this.MembershipRechargeAgreeToRefuse({ shipuuid: e.currentTarget.dataset.id, status: 2, remarks: this.state.vipNot })
  }



  async getReceivingBankQualificationsTwo(data) {
    const res = await getReceivingBankQualifications(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.MembershipRechargeAgreeToRefuse({ shipuuid: this.state.shipuuid, status: 1, remarks: '' })
      this.gerVenueName()
    } else if (res.data.code === 4004) {
      message.error(res.data.msg)
    } else {
      this.MembershipRechargeAgreeToRefuse({ shipuuid: this.state.shipuuid, status: 1, remarks: '' })
      this.setState({ visible: true })
    }
  }

  tongyi = e => {
    this.setState({ shipuuid: e.currentTarget.dataset.id })
    this.getReceivingBankQualificationsTwo()
  }

  maskingF = () => {
    this.setState({ masking: false })
  }
  
  imgMasking = e => {
    this.setState({ imgMasking: e.currentTarget.dataset.url, masking: true })
  }

  async MembershipCollectionAgreeToRefuse(data) {
    const res = await MembershipCollectionAgreeToRefuse(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getCompleteMembershipRechargeDetails()
      this.gerVenueName()
      this.setState({ vipVisibleTwo: false })
      message.success(res.data.msg)
    } else {
      message.error(res.data.msg)
    }
  }



  queren = e => {
    this.MembershipCollectionAgreeToRefuse({ shipuuid: e.currentTarget.dataset.id })
  }

  Income = () => {
    this.setState({ index: 2, sumptionList: [] })
    this.getVenueMembershipCardConsumptionList({ page: 1, type: 2, startdate: this.state.startSump, enddate: this.state.endSump })
  }
  Outlay = () => {
    this.setState({ index: 1, sumptionList: [] })
    this.getVenueMembershipCardConsumptionList({ page: 1, type: 1, startdate: this.state.startSump, enddate: this.state.endSump })
  }

  sumptionListNumPage = (page, pageSize) => {
    this.setState({ pageTwo: page })
    this.getVenueMembershipCardConsumptionList({ page: page, type: this.state.index, startdate: this.state.startSump, enddate: this.state.endSump })
  }

  render() {
    const uploadButtonTwo = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const uploadButtonThree = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const { imageUrlTwo, imageUrlThree } = this.state;
    return (
      <div style={{ height: '98%' }} className="lpkji">
        <div className="myWalletheaderTop"><div onClick={this.flagHead} style={this.state.flagHead === 0 ? { background: '#F5A623', color: '#fff' } : {}}>会员卡扣费</div><div onClick={this.flagHeadTwo} style={this.state.flagHead === 1 ? { background: '#F5A623', color: '#fff' } : {}}>钱包到账</div></div>
        <div className="xiange"></div>

        <div style={this.state.flagHead === 1 ? { height: '90%' } : { display: 'none' }}>

          <div className={this.state.flag === 1 ? 'myWallet' : 'myWalletNone'}>
            <div className="header">
              <span className="select"></span>
              <RangePicker
                placeholder={[this.state.start, this.state.end]}
                style={{ marginTop: '8px', float: 'left', marginLeft: '27px' }}
                locale={locale}
                allowClear={false}
                onChange={this.dateChange}
              />
              <span className="query" style={this.state.kod === 1 ? { display: 'block' } : { display: 'none' }} onClick={this.search}>查询</span>
              <div className="rightMoney">
                <span className="sum">钱包余额(元): ￥{this.state.sumMoney}</span>
                <span className="withdrawal" onClick={this.withdrawal}>申请提现</span>
                <span className="withdrawal" onClick={this.record}>提现记录</span>
              </div>
            </div>
            <div className="xiange"></div>
            <div className={this.state.moneyList.length !== 0 ? 'listMoney' : 'hidden'} >
              <Row>
                <Col className="oneText" xs={{ span: 4 }}>到账时间</Col>
                <Col xs={{ span: 16 }}>明细</Col>
                <Col xs={{ span: 4, }}>金额(元)</Col>
              </Row>
              <div style={{ position: 'relative' }}>
                {
                  this.state.moneyList.map((item, i) => (
                    <Row key={i} >
                      <Col className="oneText" xs={{ span: 4 }}>{item.time}</Col>
                      <Col xs={{ span: 16 }}>{item.public}</Col>
                      <Col xs={{ span: 4 }}>￥{item.money}</Col>
                    </Row>
                  ))
                }
                <div className="moneyFoucs">查询期间收入(元)：￥{this.state.whereMoney}</div>
              </div>
              <Pagination current={this.state.page} className={this.state.moneyList.length === 0 ? 'myWalletNone' : 'fenye'} hideOnSinglePage={true} showSizeChanger={false} onChange={this.moneyFen} total={this.state.other} />
            </div>
            <div style={this.state.moneyList.length !== 0 ? { display: 'none' } : { width: '100%' }}><img style={{ width: 84, height: 84, display: 'block', margin: '84px auto 0' }} src={require('../../assets/xifen (7).png')} alt="icon" /><span style={{ display: 'block', textAlign: 'center' }}>您没有收入记录!</span></div>

          </div>
          <div className={this.state.flag === 2 ? 'record myWallet' : 'myWalletNone'}>
            <div className="header">
              <span className="previousStep" onClick={this.returnN}>钱包到账 ></span><span style={{ color: '#F5A623' }}>提现记录</span>
              <div style={{ float: 'right', fontSize: '16px', marginRight: '130px', lineHeight: '46px' }}>总计:￥{this.state.maxmoney}</div>
            </div>
            <div className="xiange"></div>
            <div className={this.state.hiddenTwo === true ? '' : 'hidden'} >
              <Row>
                <Col className="oneText" xs={{ span: 5 }}>申请时间</Col>
                <Col xs={{ span: 7, offset: 0 }}>账户名称</Col>
                <Col xs={{ span: 4, offset: 0 }}>处理时间</Col>
                <Col xs={{ span: 4, offset: 0 }}>金额</Col>
                <Col xs={{ span: 4, offset: 0 }}>提现进度</Col>
              </Row>
              {
                this.state.recordList.map((item, i) => (
                  <Row key={i} >
                    <Col className="oneText" xs={{ span: 5 }}>{item.SubmitDate}</Col>
                    <Col xs={{ span: 7, offset: 0 }}>{item.OpeningBank}|{'*' + item.BankCard.slice(-4)}|{item.BankName !== null ? '*' + item.BankName.slice(-1) : ''}</Col>
                    <Col xs={{ span: 4, offset: 0 }}>{item.FinishedDate === null ? '---' : item.FinishedDate}</Col>
                    <Col xs={{ span: 4, offset: 0 }}>￥{item.RequestMoney}</Col>
                    <Col xs={{ span: 4, offset: 0 }}>{item.status === 1 ? '待处理' : '' || item.status === 2 ? '已处理' : '' || item.status === 3 ? '未通过' : ''}</Col>
                  </Row>
                ))
              }
            </div>
            <Pagination className={this.state.hiddenTwo === true ? 'fenye' : 'hidden'} current={this.state.pageOne} showSizeChanger={false} hideOnSinglePage={true} onChange={this.recordListOther} total={this.state.recordListOther === '' ? 0 : this.state.recordListOther} />
            <div style={this.state.hiddenTwo === true ? { display: 'none' } : { width: '100%' }}><img style={{ width: 84, height: 84, display: 'block', margin: '84px auto 0' }} src={require('../../assets/xifen (8).png')} alt="icon" /><span style={{ display: 'block', textAlign: 'center' }}>您还没有提现记录!</span></div>
          </div>
          <div className={this.state.flag === 3 ? 'withdrawal myWallet' : 'myWalletNone'}>

            <div className="header">
              <span className="previousStep" onClick={this.returnN}>钱包到账> </span><span>提现</span>
            </div>
            <div className="xiange"></div>
            <div className="balance">
              <span>钱包余额</span> <span>{this.state.walletList.money}元</span><span></span>
            </div>

            <div className="home">
              <div><span style={{ marginLeft: -2 }}></span>银行账户:<span className="textNext">{this.state.walletList.Settlement === 0 ? '公司账户' : '个人账户'}</span></div>
              <div><span style={{ marginLeft: -30 }}>提现银行卡号:</span><span className="textNext">{this.state.walletList.Bankaccount}</span></div>
              <div><span style={{ marginLeft: -42 }}>提现银行卡支行:</span><span className="textNext">{this.state.walletList.OpeningBank}</span></div>

              <div className="listSon">
                <span>提现金额:</span>
                <Input className="input" onChange={this.allNow} value={this.state.moneyYuan} />&nbsp;&nbsp;&nbsp;元
                <span className="all" onClick={this.all}>全部提现</span>
              </div>

              <div className="listSon">
                <span>实际金额:</span>
                <span className="textNext">{(this.state.moneyYuan - (this.state.moneyYuan * 0.08).toFixed(2)).toFixed(2)}</span><span style={{ paddingLeft: '30px' }}>扣除8%平台服务费</span>
              </div>
              <div className="listSon">
                <span>到账时间:</span>
                <span className="textNext">预计 2-3 个工作日到账</span>
              </div>
              <div className="comfir" onClick={this.comfir}>确定</div>
            </div>
          </div>
        </div>
        <div className="vipContent" style={this.state.flagHead === 0 ? {} : { display: 'none' }}>
          <div className="content">
            <div>
              <div className="backVip">
                <span className="h1">会员卡信息</span>
                <span className="h2">北京甲乙电子商务有限公司(找对手平台)</span>
                <span className="h2" style={this.state.chargeDetails.cardnumber === '' || this.state.chargeDetails.length === 0 ? { display: 'none' } : {}}>卡号：{this.state.chargeDetails.cardnumber}</span>
                <span className="h1" style={{ textAlign: 'right', paddingRight: '6px' }}>当前余额：¥{this.state.chargeDetailsNum}</span>
              </div>
              <div className="backVipTwo" style={this.state.chargeDetails.cardJustURL === '' || this.state.chargeDetails.length === 0 ? { display: 'none' } : {}}>
                <img src={imgUrlTwo + this.state.chargeDetails.cardJustURL} alt="img" />
              </div>
              <div className="backVipTwo" style={this.state.chargeDetails.cardBackURL === '' || this.state.chargeDetails.length === 0 ? { display: 'none' } : {}}>
                <img src={imgUrlTwo + this.state.chargeDetails.cardBackURL} alt="img" />
              </div>
            </div>
            <div className="textContent">
              <div className="head">
                <span className="title">会员卡明细</span>
                <span className="rightText" style={this.state.index === 2 ? { color: '#F5A623' } : {}} onClick={this.Income}>收入</span>
                <span className="rightText" style={this.state.index === 1 ? { color: '#F5A623' } : {}} onClick={this.Outlay}>支出</span>
                <span className="query" style={this.state.koTwo === 1 ? { display: 'block' } : { display: 'none' }} onClick={this.searchTwo}>查询</span>
                <RangePicker
                  placeholder={[this.state.startSump, this.state.endSump]}
                  style={{ float: 'right', }}
                  locale={locale}
                  allowClear={false}
                  onChange={this.dateChangeTwo}
                />
              </div>

              <div>
                <Row style={{ borderTop: '1px solid #e1e0e1' }}>
                  <Col xs={{ span: 6 }} style={{ textAlign: 'left' }}>时间</Col>
                  <Col xs={{ span: 6, offset: 0 }}>明细</Col>
                  <Col xs={{ span: 6, offset: 0 }}>类型</Col>
                  <Col xs={{ span: 6, offset: 0 }}>金额</Col>
                </Row>
                {
                  this.state.sumptionList.map((item, i) => (
                    <Row key={i} style={{ height: '35px', lineHeight: '35px', borderTop: '1px solid #e1e0e1' }} >
                      <Col className="oneText" xs={{ span: 6 }} style={{ textAlign: 'left', height: '35px', lineHeight: '35px' }}>{item.date}</Col>
                      <Col xs={{ span: 6, offset: 0 }} style={{ height: '35px', lineHeight: '35px' }}>{this.state.index === 1 ? 'ID：' + item.orderid : '充值' + item.PlanRecharge + ',赠送' + item.givemoney}</Col>
                      <Col xs={{ span: 6, offset: 0 }} style={{ height: '35px', lineHeight: '35px' }}>{this.state.index === 1 ? '支出' : '收入'}</Col>
                      <Col xs={{ span: 6, offset: 0 }} style={{ height: '35px', lineHeight: '35px' }}>￥{this.state.index === 1 ? item.money : Number(item.PlanRecharge) + Number(item.givemoney) + '.00'}</Col>
                    </Row>
                  ))
                }
                <div style={this.state.sumptionList.length === 0 ? { textAlign: 'center', padding: '20px 0', borderTop: '1px solid #e1e0e1' } : { display: 'none' }}>暂无{this.state.index === 1 ? '支出' : '收入'}明细</div>
                <Pagination className={this.state.sumptionList.length !== 0 ? 'fenye' : 'hidden'} current={this.state.pageTwo} showSizeChanger={false} hideOnSinglePage={true} onChange={this.sumptionListNumPage} total={this.state.sumptionListNum === '' ? 0 : this.state.sumptionListNum} />
              </div>
            </div>
          </div>

        </div>

        <Modal
          title="会员卡充值确认"
          visible={this.state.vipVisible}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancelOne}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
        >
          <p><span className="vipLeft">持卡人</span>北京甲乙电子商务有限公司(找对手平台)</p>
          <p><span className="vipLeft">会员卡余额</span>￥{this.state.vipList.balance}</p>
          <p><span className="vipLeft">计划充值金额</span>￥{this.state.vipList.PlanRecharge}</p>
          <p><span className="vipLeft">需赠送金额</span>￥{this.state.vipList.givemoney}</p>
          <TextArea rows={4} maxLength={100} onChange={this.vipNot} placeholder="拒绝时请填写拒绝原因" style={{ background: '#F3F3F3' }} />
          <div className="vipFooter"><span onClick={this.bukeyi} data-id={this.state.vipList.uuid}>拒绝</span><span onClick={this.tongyi} data-id={this.state.vipList.uuid}>同意</span></div>
        </Modal>


        <Modal
          title="汇款凭证信息"
          visible={this.state.vipVisibleTwo}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancelThree}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
        >
          <p><span className="vipLeft">持卡人</span>北京甲乙电子商务有限公司(找对手平台)</p>
          <p><span className="vipLeft">充值金额</span>￥{this.state.vipListTwo.PlanRecharge}</p>
          <p><span className="vipLeft">需赠送金额</span>￥{this.state.vipListTwo.givemoney}</p>
          <p><span className="vipLeft" style={{ color: '#F5A623', cursor: 'pointer' }} data-url={this.state.vipListTwo.RemittanceURL} onClick={this.imgMasking}>查看凭证</span></p>
          <p className="vipFooter"><span data-id={this.state.vipListTwo.uuid} onClick={this.queren}>确认</span></p>
        </Modal>

        <Modal
          title="添加场馆收款信息"
          visible={this.state.visible}
          className="mode"
          width={600}
          onCancel={this.handleCancelTwo}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
        >
          <div className="listing">
            <span>结算账号:</span>
            <Radio.Group className="accountNum" onChange={this.numRadioTwo} value={this.state.numRadioTwo}>
              <Radio value={0}>场馆归属人账号</Radio>
              <Radio value={1}>场馆负责人账号</Radio>
            </Radio.Group>
          </div>

          <div className="listing" style={this.state.numRadioTwo === 1 ? { display: 'none' } : {}}>
            <span>归属人性质:</span>
            <Radio.Group className="accountNum" onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司</Radio>
              <Radio value={1}>个人</Radio>
            </Radio.Group>
          </div>

          <div className="listing" style={this.state.numRadio === 1 ? { display: 'none' } : {}}>
            <span>公司名称:</span>
            <Input className="listingInput" value={this.state.inCorName} maxLength={18} placeholder="请输入公司名称" onChange={this.inCorName} />
          </div>


          <div className="listing" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span>负责人姓名:</span>
            <Input className="listingInput" value={this.state.inChargeNa} maxLength={18} placeholder="请输入姓名" onChange={this.inChargeNa} />
          </div>

          <div className="listing" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span>负责人身份证号:</span>
            <Input className="listingInput" value={this.state.corporateId} maxLength={18} placeholder="请输入身份证号" onChange={this.corporateId} />
          </div>
          <div className="listing" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span>身份证照:</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg"
              showUploadList={false}
              action={imgUrlTwo + "api/UploadVenueImgs?type=VenueIdCardImgs"}
              beforeUpload={beforeUpload}
              onChange={this.handleChangeTwo}
              accept=".jpg, .jpeg, .png"
            >
              {imageUrlTwo ? <img src={imgUrlTwo + imageUrlTwo} alt="avatar" style={{ width: '128px', height: '70px' }} /> : uploadButtonTwo}
            </Upload>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg ko"
              showUploadList={false}
              action={imgUrlTwo + "api/UploadVenueImgs?type=VenueIdCardImgs"}
              beforeUpload={beforeUpload}
              onChange={this.handleChangeThree}
              accept=".jpg, .jpeg, .png"
            >
              {imageUrlThree ? <img src={imgUrlTwo + imageUrlThree} alt="avatar" style={{ width: '128px', height: '70px' }} /> : uploadButtonThree}
            </Upload>
          </div>
          <div className="listing">
            <span>银行卡号:</span>
            <Input className="listingInput" placeholder="请输入银行卡号" value={this.state.corporateCardId} onChange={this.corporateCardId} />
          </div>

          <div className="listing">
            <span>联系号码:</span>
            <Input className="listingInput" placeholder="请输入通知汇款成功手机号" value={this.state.Bankphone} onChange={this.Bankphone} />
          </div>

          <div className="listing">
            <span>开户所在地</span>
            <Select placeholder="银行类型" style={{ width: 120, height: '35px', marginLeft: '18px' }} value={this.state.bank_id === '' ? null : Number(this.state.bank_id)} loading={this.state.flagOne} onChange={this.typeChange}>
              {
                this.state.type.map((item, i) => (
                  <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在省" style={{ width: 120, height: '35px', marginLeft: '18px' }} value={this.state.province_id === '' ? null : Number(this.state.province_id)} loading={this.state.flagTwo} onChange={this.provinceChange}>
              {
                this.state.backProvince.map((item, i) => (
                  <Option key={i} value={item.province_id}>{item.province}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在市" style={{ width: 120, height: '35px', marginLeft: '18px' }} value={this.state.city_id === '' ? null : Number(this.state.city_id)} loading={this.state.flagThree} onChange={this.cityChange}>
              {
                this.state.backCity.map((item, i) => (
                  <Option key={i} value={item.city_id}>{item.city}</Option>
                ))
              }
            </Select>
          </div>



          <div className="listing">
            <span>开户行:</span>
            <Select
              showSearch
              style={{ width: 395, height: '36px', marginLeft: '18px', float: 'left' }}
              onSearch={this.handleSearch}
              onChange={this.corporateOpen}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              value={this.state.corporateOpen === '' ? null : this.state.corporateOpen}
              placeholder="请输入支行关键字"
            >
              {
                this.state.backList.map((item, i) => (
                  <Option key={i} value={item.name} alt={item.name}>
                    <span>{item.nameT}</span>
                  </Option>
                ))
              }
            </Select>
          </div>

          <Popconfirm
            title="您确定信息无误?"
            onConfirm={this.ziSubmitTwo}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
            <Button className="submit">提交</Button>
          </Popconfirm>
        </Modal>

        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>
      </div>
    )
  }
}

export default myWallet;
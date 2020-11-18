import React from 'react';
import './myWalletPh.css';

import { Modal, Toast, Picker, List, Button, ImagePicker } from 'antd-mobile';
import { Input, Select, Radio, } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';
import { LeftOutlined } from '@ant-design/icons';
import lrz from 'lrz';
import { getVenueMoney, getReceivingBankQualifications, getVenueOpenBank, getVenueOpenBankProvince, UploadVenueImgsLisenTwo, getMembershipCollectionDetails, MembershipCollectionAgreeToRefuse, getCompleteMembershipRechargeDetails, MembershipRechargeAgreeToRefuse, getMembershipRechargeDetails, gerVenueName, getVenueOpenBankCity, getVenueOpenBankList, VenueReceivingBankInformation } from '../../api';
const { Option } = Select
const alert = Modal.alert;
const { TextArea } = Input;

class myWalletPh extends React.Component {

  state = {
    money: 0.00,
    visible: false,
    imgFile: '',
    imgFileTwo: '',
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    numRadio: 1,
    numRadioFive:0,
    corporateCardId: '',
    corporateOpen: '',
    legalBaseURL: '',
    corporateId: '',
    files: [],
    filesSon: '',//身份证正面
    filesTwo: [],
    filesSonTwo: '',//身份证反面
    flag: 1,
    vipList: [],
    vipVisible: false,
    vipNot: '',
    shipuuid: '',
    chargeDetails: [],
    chargeDetailsNum: '',
    vipVisibleTwo: false,
    vipListTwo: [],
    imgMasking: '',
    masking: false,
    inChargeNa:'',
  };


  maskingF = () => {
    this.setState({ masking: false, vipVisibleTwo: true, })
  }
  imgMasking = e => {
    this.setState({ imgMasking: e.currentTarget.dataset.url, masking: true, vipVisibleTwo: false })
  }

  async getVenueMoney(data) {
    const res = await getVenueMoney(data, localStorage.getItem('venue_token'))
    this.setState({ money: res.data.data.money })

  }

  async getMembershipCollectionDetails(data) {
    const res = await getMembershipCollectionDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipListTwo: res.data.data })
    }
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))

    localStorage.setItem('name', res.data.data.name)
    localStorage.setItem('avatar', "https://app.tiaozhanmeiyitian.com/" + res.data.data.siteimg)
    localStorage.setItem('lyv', res.data.data.rate)
    localStorage.setItem('siteUid', res.data.data.siteuid)
    if (res.data.data.ishaverecharge === 1) {
      this.setState({ vipVisible: true })
      this.getMembershipRechargeDetails()
    } else if (res.data.data.ishaverecharge === 2) {
      this.setState({ vipVisibleTwo: true })
      this.getMembershipCollectionDetails()
    }

  }

  componentDidMount() {
    this.getVenueMoney()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()
    this.gerVenueName()
    this.getCompleteMembershipRechargeDetails()
    this.setState({
      flag: Number(sessionStorage.getItem('flaghood'))
    })

  }

  async getReceivingBankQualifications(data) {
    const res = await getReceivingBankQualifications(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4004) {
      Toast.fail(res.data.msg, 1);
    } else if (res.data.code !== 2000 && res.data.code !== 4004) {
      this.setState({ visible: true })
    } else if (res.data.code === 2000) {
      this.props.history.push({ pathname: '/homePh/withdrawalPh', query: { money: this.state.money } })
    }
  }

  withdrawalPh = () => {
    this.getReceivingBankQualifications()

  }

  walletDetailsPh = () => {
    this.props.history.push('/homePh/monthlyIncomePh')
  }

  recordPh = () => {
    this.props.history.push('/homePh/recordPh')
  }
  reture = () => {
    this.props.history.goBack()
  }
  onClose = () => {
    this.setState({ visible: false })
  }

  async UploadVenueImgsLisenTwo(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ legalBaseURL: res.data.data.baseURL, filesSon: res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ files: [], loading: true })
    } else {
      this.setState({ files: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }

  }




  handleChangeTwo = (files, type, index) => {
    this.setState({ files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSon: '', filesTwo: [], filesSonTwo: '' })
    }
  }

  async UploadVenueImgsLisenTwoT(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ legalBaseURL: res.data.data.baseURL, filesSonTwo: res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesTwo: [], loading: true })
    } else {
      this.setState({ filesTwo: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }

  }


  handleChangeThree = (files, type, index) => {
    this.setState({ filesTwo: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwoT(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSonTwo: '', files: [], filesSon: '' })
    }
  }



  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].bank_name
        k.value = res.data.data[i].bank_id
        arrType.push(k)
      }

      this.setState({ type: arrType })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].province
        k.value = res.data.data[i].province_id
        arrType.push(k)
      }
      this.setState({ backProvince: arrType })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].city
        k.value = res.data.data[i].city_id
        arrType.push(k)
      }
      this.setState({ backCity: arrType })
    }
  }


  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let name = res.data.data
      let arrName = []
      for (let i in name) {
        let obj = {}
        obj.name = name[i].sub_branch_name
        obj.nameT = name[i].sub_branch_name.slice(name[i].sub_branch_name.indexOf('公司') + 2, name[i].sub_branch_name.length)
        arrName.push(obj)
      }
      this.setState({ backList: arrName })
    }
  }
  numRadio = e => {
    this.setState({ numRadio: e.target.value, corporateCardId: '', })
    if (e.target.value === 1) {
      this.setState({ CorporateName: '', bank_id: '', province_id: '', city_id: '' })
    }
  }
  numRadioFive=e=>{
    this.setState({ numRadioFive: e.target.value,numRadio:e.target.value })
  }
  corporateCardId = e => {
    this.setState({ corporateCardId: e.target.value })
  }
  CorporateName = e => {
    this.setState({ CorporateName: e.target.value })
  }
  typeChange = e => {
    this.setState({ bank_id: e, backList: [] })
  }
  cityChange = e => {
    this.setState({ city_id: e, backList: [], corporateOpen: '' })
  }
  provinceChange = e => {
    this.setState({ province_id: e, corporateOpen: '', backList: [] })
    this.getVenueOpenBankCity({ province_id: e })
  }


  handleSearch = e => {

    this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })

  }
  modLine = e => {
    if (this.state.bank_id === '') {
      Toast.fail('请选择银行类型', 1.5)
    } else if (this.state.province_id === '') {
      Toast.fail('请选择银行所在省', 1.5)
    } else if (this.state.city_id === '') {
      Toast.fail('请选择银行所在市', 1.5)
    } else {
      this.setState({ corporateOpen: '' })
    }
  }

  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }


  async VenueReceivingBankInformation(data) {
    const res = await VenueReceivingBankInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.setState({ visible: false })
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }
  corporateId = e => {
    this.setState({ corporateId: e.target.value })
  }

  inChargeNa = e => {
    this.setState({ inChargeNa: e.target.value })
  }

  inCorName= e => {
    this.setState({ inCorName: e.target.value })
  }


  ziSubmitTwo = () => {
    let { numRadio, numRadioFive,inCorName,inChargeNa,legalBaseURL,corporateId,filesSon, filesSonTwo, corporateCardId, corporateOpen, bank_id, province_id, city_id } = this.state
    let data = {
      Bankcard: numRadio === 0 ? '' : corporateId,
      legalBaseURL: numRadioFive === 1 ? legalBaseURL : numRadio === 1 ? legalBaseURL : '',
      legalFilesURL: numRadioFive === 1 ? filesSon + '|' + filesSonTwo : numRadio === 1 ? filesSon + '|' + filesSonTwo : '',
      Bankname:numRadio === 0?'':inChargeNa,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      Banktype: typeof(bank_id)==='object'?bank_id.join():bank_id,
      ProvinceBank:typeof(province_id)==='object'?province_id.join():province_id,
      CityBank: typeof(city_id)==='object'?city_id.join():city_id,
      account: numRadioFive,
      Bankcorporate:numRadio===0?inCorName:'',
    }
    this.VenueReceivingBankInformation(data)

  }
  oneLeft = () => {
    sessionStorage.setItem('flaghood', 1)
    this.setState({ flag: 1 })
  }
  TwoRight = () => {
    sessionStorage.setItem('flaghood', 2)
    this.setState({ flag: 2 })
  }


  async getCompleteMembershipRechargeDetails(data) {
    const res = await getCompleteMembershipRechargeDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ chargeDetails: res.data.data, chargeDetailsNum: res.data.other })
    } else {
      this.setState({ chargeDetailsNum: res.data.other })
    }
  }

  async getMembershipRechargeDetails(data) {
    const res = await getMembershipRechargeDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipList: res.data.data })
    }
  }

  onCloseTwo = () => {
    this.setState({ vipVisible: false })
  }
  onCloseThree = () => {
    this.setState({ vipVisibleTwo: false })
  }

  vipNot = e => {
    this.setState({ vipNot: e.target.value })
  }

  async MembershipRechargeAgreeToRefuse(data) {
    const res = await MembershipRechargeAgreeToRefuse(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1)
      this.gerVenueName()
      this.setState({ vipVisible: false })
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  bukeyi = e => {
    this.MembershipRechargeAgreeToRefuse({ shipuuid: e.currentTarget.dataset.id, status: 2, remarks: this.state.vipNot })
  }

  async getReceivingBankQualificationsTwo(data) {
    const res = await getReceivingBankQualifications(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.MembershipRechargeAgreeToRefuse({ shipuuid: this.state.shipuuid, status: 1, remarks: '' })
      this.gerVenueName()
    } else if (res.data.code === 4004) {
      Toast.fail(res.data.msg, 1)
    } else {
      this.setState({ visible: true })
    }
  }


  tongyi = e => {
    this.setState({ shipuuid: e.currentTarget.dataset.id })
    this.getReceivingBankQualificationsTwo()
  }

  async MembershipCollectionAgreeToRefuse(data) {
    const res = await MembershipCollectionAgreeToRefuse(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getCompleteMembershipRechargeDetails()
      this.gerVenueName()
      this.setState({ vipVisibleTwo: false })
      Toast.success(res.data.msg, 1)

    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  Membership = () => {

    if (this.state.chargeDetails.cardBackURL === '' || this.state.chargeDetails.length === 0) {
      Toast.fail('暂无会员卡照片', 1)
    } else {
      this.props.history.push('/Membership')
    }
  }

  MembershipList = () => {
    this.props.history.push('/MembershipList')
  }


  render() {
    const { files, filesTwo } = this.state

    return (
      <div className="myWalletPh">
        <div className="headerTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '38px' }} /><span onClick={this.oneLeft} style={this.state.flag === 1 ? { borderBottom: '1px solid #fff' } : {}}>会员卡扣费</span><span onClick={this.TwoRight} style={this.state.flag === 2 ? { borderBottom: '1px solid #fff' } : {}}>钱包到账</span></div>

        <div className="moneyBao" style={this.state.flag === 2 ? {} : { display: 'none' }}>
          <div className="headBanner">
            <div className="content">
              <span>钱包余额(元)</span>
              <span>{this.state.money}</span>
            </div>
          </div>
          <ul className="mineList">
            <li onClick={this.walletDetailsPh}>
              <svg width="1rem" height="1rem" viewBox="0 0 16 16" style={{ float: 'left', marginTop: '17px' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>icon/合作场馆/我的/设置</title>
                <desc>Created with Sketch.</desc>
                <g id="合作场馆" stroke="none" fill="none">
                  <g id="63-|-我的我的钱包" transform="translate(-12.000000, -258.000000)" fill="#F5A623">
                    <g id="编组-3" transform="translate(12.000000, 240.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/我的钱包" transform="translate(0.000000, 2.000000)">
                            <path d="M14.2185129,3.80910228 L2.48821448,3.80910228 C2.48821448,3.80910228 1.60050529,3.62920013 1.60050529,3.09252572 L14.3984813,1.83523201 L14.3984813,0.762893884 C14.3984813,0.762893884 14.2407562,-0.219493165 12.8010092,0.0453066366 L1.42154797,2.01715554 C1.42154797,2.01715554 -1.10933485e-12,2.19705769 -1.10933485e-12,3.99001512 L-1.10933485e-12,14.2080533 C-1.10933485e-12,15.1985258 0.795702883,16 1.77845155,16 L14.2225571,16 C15.2042947,16 16,15.1985258 16,14.2080533 L16,5.60104903 C16.001124,4.61525348 15.2046592,3.81411133 14.2185129,3.80910228 L14.2185129,3.80910228 Z M13.1548796,11.1608342 C12.4653378,11.1608342 11.9112778,10.5978819 11.9112778,9.90556183 C11.9112778,9.21324174 12.4663489,8.6492788 13.1548796,8.6492788 C13.8423992,8.6492788 14.3984813,9.21223105 14.3984813,9.90556183 C14.3984813,10.5988926 13.8413881,11.1608342 13.1548796,11.1608342 L13.1548796,11.1608342 Z" id="icon_合作场馆_我的_我的钱包"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>

              <span>钱包明细</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
            <li onClick={this.withdrawalPh}>
              <svg width="1rem" height="1rem" viewBox="0 0 16 16" style={{ float: 'left', marginTop: '17px' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>icon/合作场馆/我的钱包/申请提现</title>
                <desc>Created with Sketch.</desc>
                <g id="icon/合作场馆/我的钱包/申请提现" stroke="none" fill="none" >
                  <path d="M14.9901429,2.44675488 C14.9852574,1.70368013 14.3814894,1.10389781 13.6383986,1.10389781 L1.35183408,1.10389781 C0.609035716,1.10389781 0.00577927976,1.70396682 0.00186723937,2.44675488 L0.00186723937,3.94602681 L14.9901429,3.94602681 L14.9901429,2.44675488 Z M12.0111509,6.43533367 C13.1079961,6.4343875 14.1674008,6.8341927 14.9901429,7.55956543 L14.9901429,5.36175898 L0.00186723937,5.36175898 L0.00186723937,11.0104681 C0.00772155342,11.7520106 0.610268712,12.3501943 1.35183408,12.3506591 L7.71862962,12.3506591 C7.26923107,10.9754948 7.5060878,9.46825638 8.35561312,8.29721299 C9.20513843,7.1261696 10.5644181,6.43318517 12.0111509,6.43355623 L12.0111509,6.43533367 Z M15.6824564,9.42587903 C15.479597,8.95699985 15.1887786,8.5313311 14.8257296,8.17189403 C14.4601455,7.81101748 14.0303256,7.52165762 13.5584138,7.3187221 C13.0732837,7.10954581 12.5501125,7.00303553 12.0218156,7.00589239 C11.4870769,7.00174695 10.957261,7.10825476 10.4656655,7.3187221 C9.51527041,7.72610581 8.75510065,8.47928696 8.33895672,9.42587903 C8.12696733,9.90617593 8.01913843,10.4259355 8.02257213,10.9509239 C8.01832897,11.4811535 8.12614424,12.0062987 8.33895672,12.4919657 C8.54392955,12.9620822 8.83614247,13.389093 9.20012713,13.7503943 C9.9502918,14.492701 10.9656146,14.905036 12.0209268,14.8959553 C12.5484159,14.8996578 13.0711682,14.7962563 13.557525,14.5920128 C14.0301322,14.3955381 14.4604243,14.1097831 14.8248408,13.7503943 C15.1874657,13.3889019 15.4781857,12.9618692 15.6815677,12.4919657 C15.8953109,12.006595 16.0031677,11.4812479 15.9979523,10.9509239 C16.0026662,10.4258091 15.8947819,9.9057826 15.6815677,9.42587903 L15.6824564,9.42587903 Z M14.2542821,12.8030179 C14.0132043,12.1445085 13.3869407,11.7063014 12.68569,11.7054478 L12.68569,13.3806864 C12.6862384,13.5651095 12.566022,13.7281623 12.3896828,13.7821687 C12.2133437,13.8361751 12.0224356,13.7684088 11.9196127,13.6153087 L9.57427858,11.2717521 C9.48262824,11.1963225 9.42722533,11.085595 9.42180476,10.96702 C9.41638419,10.848445 9.46145348,10.7331245 9.54583951,10.6496475 L11.9844893,8.21099775 C12.0610899,8.14153622 12.1610353,8.10346177 12.2644363,8.10433601 C12.495413,8.1048401 12.682535,8.29196204 12.6830238,8.52293874 L12.6830238,9.79025454 C13.3970414,9.78873558 14.0523893,10.185266 14.3823572,10.8184679 C14.7123251,11.4516698 14.6619048,12.2159832 14.251616,12.8003518 L14.2542821,12.8030179 Z" id="icon_合作场馆_我的钱包_申请提现" fill="#D85D27"></path>
                </g>
              </svg>
              <span>申请提现</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
            <li onClick={this.recordPh}>
              <svg width="1rem" height="1rem" viewBox="0 0 16 16" style={{ float: 'left', marginTop: '17px' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>icon/合作场馆/我的/设置</title>
                <desc>Created with Sketch.</desc>
                <g id="合作场馆" stroke="none" fill="none" >
                  <g id="63-|-我的我的钱包" transform="translate(-12.000000, -364.000000)" fill="#6FB2FF">
                    <g id="编组-3" transform="translate(12.000000, 346.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的钱包/提现记录" transform="translate(0.000000, 2.000000)">
                            <path d="M9.7877095,3.60173883 C9.68938548,3.60173883 9.59329609,3.5034148 9.59329609,3.40509078 L9.59329609,0.149224859 L13.0815643,3.60173883 L9.7877095,3.60173883 Z M9.7877095,9.39168295 C8.9094972,10.1514595 8.36424581,11.2441969 8.36424581,12.4710126 C8.36424581,13.4073254 8.67486034,14.265426 9.20223464,14.9469902 L0.837988828,14.9469902 C0.370949719,14.9469902 -8.56203997e-13,14.5782751 -8.56203997e-13,14.1291131 L-8.56203997e-13,0.949224859 C-8.56203997e-13,0.500062844 0.370949719,0.131347766 0.837988828,0.131347766 L8.75530727,0.131347766 L8.75530727,3.40509078 C8.75530727,3.97045391 9.22234637,4.41961592 9.7877095,4.41961592 L13.101676,4.41961592 L13.101676,8.39726955 C12.9273743,8.37939245 12.7307262,8.35928072 12.5363128,8.35928072 C11.7765363,8.35928073 11.0547486,8.57380588 10.4312849,8.92464386 C10.3932961,8.73023044 10.2368715,8.57380586 10.0223464,8.57380586 L3.33407822,8.57380586 C3.11955308,8.57380586 2.92513969,8.74810753 2.92513967,8.98274441 C2.92513966,9.21738128 3.11955306,9.39168295 3.35418994,9.39168295 L9.7877095,9.39168295 Z M3.35418994,6.11570531 C3.11955306,6.11570531 2.92513966,6.29224163 2.94525139,6.52464386 C2.94525139,6.75704609 3.11955306,6.93358241 3.35418994,6.93358241 L10.0424581,6.93358241 C10.2569832,6.93358241 10.4513966,6.75928073 10.4513966,6.52464386 C10.4513966,6.29224163 10.277095,6.11570531 10.0424581,6.11570531 L3.35418994,6.11570531 Z M12.5363128,9.0788338 C14.4469274,9.0788338 15.9865922,10.6207332 15.9865922,12.4911243 C15.9865922,14.3615154 14.4469274,15.8833031 12.5363128,15.8631913 C10.6256983,15.8631913 9.08603352,14.3436383 9.08603352,12.4710126 C9.08603352,10.6006215 10.6256983,9.0788338 12.5363128,9.0788338 Z M13.8011173,12.788331 L12.7932961,12.788331 L12.7932961,12.1805098 L13.8301676,12.1805098 C13.9821229,12.1805098 14.0826816,12.0799511 14.0826816,11.9279958 C14.0826816,11.7760405 13.9821229,11.6754818 13.8301676,11.6754818 L13.0703911,11.6754818 L13.9061452,10.8397277 C14.0067039,10.7369344 14.0067039,10.584979 13.9061452,10.4844204 C13.803352,10.3838617 13.6513966,10.3838617 13.550838,10.4844204 L12.5385475,11.4967109 L11.526257,10.4844204 C11.4234637,10.3838617 11.2715084,10.3838617 11.1709497,10.4844204 C11.0703911,10.5872137 11.0703911,10.739169 11.1709497,10.8397277 L12.0067039,11.6754818 L11.2469274,11.6754818 C11.0949721,11.6754818 10.9944134,11.7760405 10.9944134,11.9279958 C10.9944134,12.0799511 11.0949721,12.1805098 11.2469274,12.1805098 L12.2837989,12.1805098 L12.2837989,12.788331 L11.2715084,12.788331 C11.1195531,12.788331 11.0189944,12.8888897 11.0189944,13.040845 C11.0189944,13.1928003 11.1195531,13.2933589 11.2715084,13.2933589 L12.2837989,13.2933589 L12.2837989,14.2810684 C12.2837989,14.4330238 12.3843575,14.5335824 12.5363128,14.5335824 C12.6882682,14.5335824 12.7888268,14.4330238 12.7888268,14.2810684 L12.7888268,13.2933589 L13.8011173,13.2933589 C13.9530726,13.2933589 14.0536313,13.1928003 14.0536313,13.040845 C14.0536313,12.8888897 13.9530726,12.788331 13.8011173,12.788331 Z" id="icon_合作场馆_我的钱包_提现记录"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span>提现记录</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          </ul>

        </div>

        <div style={this.state.flag === 1 ? {} : { display: 'none' }}>
          <div className="oneVip">
            <span style={{ fontSize: '14px' }}>会员卡信息</span>
            <span style={{ paddingTop: '1.5rem' }}>北京甲乙电子商务有限公司(找对手平台)</span>
            <span style={this.state.chargeDetails.cardnumber === '' || this.state.chargeDetails.length === 0 ? { display: 'none' } : { paddingTop: '1.5rem' }}>卡号：{this.state.chargeDetails.cardnumber}</span>
            <span style={{ textAlign: 'right', fontSize: '14px', paddingTop: '1.5rem', paddingRight: '1rem' }}>当前余额：¥{this.state.chargeDetailsNum}</span>
          </div>
          <div className="ulList">
            <div onClick={this.Membership}><img src={require('../../assets/photoOne.png')} alt="icon" />&nbsp;&nbsp;&nbsp;会员卡照片<img src={require('../../assets/right.png')} alt="icon" /></div>
            <div onClick={this.MembershipList}><img src={require('../../assets/mingxi.png')} alt="icon" />&nbsp;&nbsp;&nbsp;会员卡明细 <img src={require('../../assets/right.png')} alt="icon" /></div>
          </div>



        </div>


        <Modal
          visible={this.state.vipVisible}
          transparent
          maskClosable={true}
          onClose={this.onCloseTwo}
          title="会员充值卡确认"

        >
          <p><span className="vipLeftTwo">持卡人</span><span className="vipRightTwo">北京甲乙电子商务有限公司(找对手平台)</span></p>
          <p><span className="vipLeftTwo">会员卡余额</span>￥{this.state.vipList.balance}</p>
          <p><span className="vipLeftTwo">计划充值金额</span>￥{this.state.vipList.PlanRecharge}</p>
          <p><span className="vipLeftTwo">需赠送金额</span>￥{this.state.vipList.givemoney}</p>
          <TextArea rows={4} maxLength={100} onChange={this.vipNot} placeholder="拒绝时请填写拒绝原因" style={{ background: '#F3F3F3' }} />
          <div className="vipFooterTwo"><span onClick={this.bukeyi} data-id={this.state.vipList.uuid}>拒绝</span><span onClick={this.tongyi} data-id={this.state.vipList.uuid}>同意</span></div>
        </Modal>


        <Modal
          visible={this.state.vipVisibleTwo}
          transparent
          maskClosable={true}
          onClose={this.onCloseThree}
          title="汇款凭证信息"
          footer={[{ text: '确认', onPress: () => { this.MembershipCollectionAgreeToRefuse({ shipuuid: this.state.vipListTwo.uuid }) } }]}
        >
          <p><span className="vipLeft">持卡人</span><span style={{ width: '7rem', display: 'block', float: 'left' }}>北京甲乙电子商务有限公司(找对手平台)</span></p>
          <p><span className="vipLeft">充值金额</span>￥{this.state.vipListTwo.PlanRecharge}</p>
          <p><span className="vipLeft">需赠送金额</span>￥{this.state.vipListTwo.givemoney}</p>
          <p><span className="vipLeft" style={{ color: '#F5A623', cursor: 'pointer' }} data-url={this.state.vipListTwo.RemittanceURL} onClick={this.imgMasking}>查看凭证</span></p>
        </Modal>









        <Modal
          visible={this.state.visible}
          transparent
          onClose={this.onClose}
          title="添加场馆收款信息"
          closable={true}
          className="kood"
        >
          <div className="koh">

            <div className="listSon">
            <span style={{ float: 'left',width:'25%' }}>结算账号:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '0%',width:'75%' }} onChange={this.numRadioFive} value={this.state.numRadioFive}>
              <Radio value={0}>场馆归属人</Radio>
              <Radio value={1}>场馆负责人</Radio>
            </Radio.Group>
          </div>


          <div className="listSon" style={this.state.numRadioFive===1?{display:'none'}:{}}>
            <span style={{ float: 'left',width:'25%' }}>归属人性质:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '7%' }} onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司</Radio>
              <Radio value={1}>个人</Radio>
            </Radio.Group>
          </div>

          
          <div className="listSon" style={this.state.numRadio === 1 ? { display: 'none' } : {}}>
              <span style={{ float: 'left' }}>公司名称</span>
              <Input className="right"  style={{ width: '70%', paddingLeft: '0.5rem' }} value={this.state.inCorName} maxLength={18} placeholder="请输入公司名称"  onChange={this.inCorName} />
            </div>


            <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
              <span style={{ float: 'left' }}>负责人姓名</span>
              <Input className="right"  style={{ width: '70%', paddingLeft: '0.5rem' }} value={this.state.inChargeNa} maxLength={18} placeholder="请输入姓名"  onChange={this.inChargeNa} />
            </div>

            <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
              <span style={{ float: 'left' }}>负责人身份证号</span>
              <Input className="right" style={{ width: '70%', paddingLeft: '0.5rem' }} placeholder="请输入负责人身份证号" maxLength={18} value={this.state.corporateId} onChange={this.corporateId} />
            </div>

            <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : { paddingTop: '15px' }}>
              <span style={{ float: 'left' }}>身份证</span>
              <ImagePicker
                files={files}
                style={{ float: 'left', width: '30%' }}
                onChange={this.handleChangeTwo}
                selectable={files.length < 1}
                length={1}
                onImageClick={this.previewing}
                multiple={false}
              />

              <ImagePicker
                files={filesTwo}
                style={{ float: 'right', width: '30%' }}
                onChange={this.handleChangeThree}
                selectable={filesTwo.length < 1}
                length={1}
                onImageClick={this.previewing}
                multiple={false}
              />
            </div>

           

            <div className="listSon">
              <span style={{ paddingLeft: '5px' }}>银行账号</span>
              <Input className="right" value={this.state.corporateCardId} placeholder="请输入银行账号" onChange={this.corporateCardId} />
            </div>


            <div className="listSon">
              <Picker data={this.state.type} cols={1} onChange={this.typeChange} disabled={this.state.flagDis} value={[Number(this.state.bank_id)]} className="forss">
                <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>银行类型</List.Item>
              </Picker>
            </div>

            <div className="listSon" style={{ marginTop: '0.2rem' }}>
              <Picker data={this.state.backProvince} cols={1} onChange={this.provinceChange} disabled={this.state.flagDis} value={[Number(this.state.province_id)]} className="forss">
                <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在省</List.Item>
              </Picker>
            </div>

            <div className="listSon" style={{ marginTop: '0.2rem' }}>
              <Picker data={this.state.backCity} cols={1} onChange={this.cityChange} disabled={this.state.flagDis} value={[Number(this.state.city_id)]} className="forss">
                <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在市</List.Item>
              </Picker>
            </div>


            <div className="listSon">
              <span style={{ float: 'left', paddingLeft: '5px' }}>开户行</span>
              <Select
                showSearch
                className="right"
                style={{ height: '32px', lineHeight: '32px', width: '70%', float: 'right', textAlign: 'left' }}
                onSearch={this.handleSearch}
                onChange={this.corporateOpen}
                defaultActiveFirstOption={false}
                onFocus={this.modLine}
                showArrow={false}
                notFoundContent={null}
                placeholder="请输入银行关键字"
                value={this.state.corporateOpen === '' ? null : this.state.corporateOpen}
              >
                {
                  this.state.backList.map((item, i) => (
                    <Option key={i} value={item.name} alt={item.name}>

                      <span style={{ fontSize: '12px' }}>{item.nameT}</span>
                    </Option>
                  ))
                }
              </Select>
            </div>
            <Button className="submit" onClick={() =>
              alert('提示', '您确定信息无误?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () =>
                    this.ziSubmitTwo()
                }
              ])
            }>提交</Button>

          </div>
        </Modal>

        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>

      </div>





    )
  }
}

export default myWalletPh;
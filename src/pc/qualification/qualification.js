import React from 'react';
import './qualification.css';
import 'antd/dist/antd.css';
import { ImagePicker } from 'antd-mobile';
import { getIsStatus, VenueQualifications_another, getVenueOpenBank, getVenueOpenBankProvince, _code, imgUrlTwo, VenueVerifyThatAllAreFilledIn, UploadVenueImgsLisen, getVenueQualified, UploadVenueImgsLisenTwo, getVenueOpenBankCity, getVenueQualifiedCompany, TemporaryQualificationInformation_another, getVenueOpenBankList, getVenueQualificationInformation, VenueQualificationInformationSave_another } from '../../api';
import { Input, Radio, Button, message, Select, Modal } from 'antd';
import lrz from 'lrz';
const { Option } = Select;
const { Search } = Input



message.config({
  top: 300
})



class qualification extends React.Component {

  state = {
    faName: '',//法人姓名
    faIdcard: '',//身份证号
    faPhone: '',//法人手机号
    cardId: '',//银行卡号
    Bankphone: '',
    bankcorporate: '',//收款公司名称
    inChargeNa: '',//收款人姓名
    Radiovalue: 0,//选择个人 还是公司,
    RadiovalueTwo: 0,//结算账号
    openingLine: '',//开户行
    siteUUID: '',//场馆Id
    imageRes: '',//营业执照路径
    legalBaseURL: '',//公共路径
    imageReST: '',//反面
    flag: true,
    flagTwo: true,
    flagThree: true,
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    CorporateName: '',
    textT: '获取验证码',
    codeNum: '',
    flagDis: false,
    issite: 0,
    isqult: 0,
    visibleTwo: false,
    src: '',
    filesThree: [],
    filesThreeSon: '',
    filesSix: [],
    filesSixSon: '',
    filesFour: [],
    filesFourSon: '',
    filesFive: [],
    filesFiveSon: '',
    imgMasking: '',
    masking: false,
    value: 0,
    BelongingOne: [],
    BelongingOneSon: '',
    BelongingTwo: [],
    BelongingTwoSon: '',
    BelongingThree: [],
    BelongingThreeSon: '',
    BelongingFour: [],
    BelongingFourSon: '',
    valueTwo: 1,
    valueThree: 1,
    BelongingFive: [],
    BelongingFiveSon: '',
    BelongingSix: [],
    BelongingSixSon: '',
    legalhourBaseURL: '',
    ascrBaceUrl: '',
    yinhangSelect: 0,
    hand: 1,
    kolod: '',
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.data.islegal === 0 || res.data.data.islegal === 1) {
      this.props.history.push('/')
    }
    this.setState({ siteUUID: res.data.data.siteUid, issite: res.data.data.issite, isqult: res.data.data.isqult })
  }





  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ type: res.data.data, flag: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
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
        obj.id=i
        arrName.push(obj)
      }

      this.setState({ backList: arrName, yinhangSelect: 1 })
    }
  }

  backListJoinInput = e => {
    this.setState({ backListJoinInput: e.target.value })
  }
  backListJoin=()=>{
    if(this.state.backListJoinInput===''){
        message.warning('请填写内容')
    }else if(this.state.backList.length!==0){
      for(let i in this.state.backList){
        if(this.state.backList[i].name===this.state.backListJoinInput){
          message.warning('请勿重复添加')
        }else{
          let arr=this.state.backList
          let lok= {}
          lok.name=this.state.backListJoinInput
          lok.nameT=this.state.backListJoinInput
          lok.id=1000
          arr.push(lok)
          this.setState({backList:arr})
        }
      }
    }else{
      let arr=this.state.backList
      let lok= {}
      lok.name=this.state.backListJoinInput
      lok.nameT=this.state.backListJoinInput
      lok.id=1000
      arr.push(lok)
      this.setState({backList:arr})
    }
   
  }

  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      sessionStorage.clear()
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      sessionStorage.removeItem('qualifData')
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      if (res.data.data.OpeningBank !== '') {
        this.setState({ kolod: 0 })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, handleCardId: res.data.data.Bankcard, inChargeNa: res.data.data.Bankname, bankcorporate: res.data.data.Bankcorporate, faPhone: res.data.data.legalphone,
        Radiovalue: res.data.data.Settlement, RadiovalueTwo: res.data.data.account, Bankphone: res.data.data.Bankphone, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        BelongingFourSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
        BelongingFour: res.data.data.empowerURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.empowerURL }],
        BelongingOneSon: res.data.data.promiseURL === '' ? '' : res.data.data.promiseURL,
        BelongingOne: res.data.data.promiseURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.promiseURL }],
        ascrBaceUrl: res.data.data.ascriphourBaseURL,
        BelongingTwo: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[0] }],
        BelongingTwoSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[0],
        BelongingThree: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[1] }],
        BelongingThreeSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[1],
        legalhourBaseURL: res.data.data.legalhourBaseURL,
        BelongingFive: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[0] }],
        BelongingFiveSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[0],
        BelongingSix: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[1] }],
        BelongingSixSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[1],
        value: res.data.data.ascription,
        valueTwo: res.data.data.personIncharge,
        valueThree: res.data.data.verification,
        flagDis: false
      })


      if (sessionStorage.getItem('qualifData') === null) {
        if (res.data.data.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
        }
        let data = {
          siteUUID: res.data.data.siteUid,
          lisenceURL: res.data.data.lisenceURL,
          legalBaseURL: res.data.data.legalBaseURL,
          legalFilesURL: res.data.data.legalFilesURL,
          legalname: res.data.data.legalname,
          legalcard: res.data.data.legalcard,
          Bankcard: res.data.data.Bankcard,
          legalphone: res.data.data.legalphone,
          Settlement: res.data.data.Settlement,
          Bankaccount: res.data.data.Bankaccount,
          OpeningBank: res.data.data.OpeningBank,
          CorporateName: res.data.data.CorporateName,
          Banktype: res.data.data.Banktype,
          ProvinceBank: res.data.data.ProvinceBank,
          CityBank: res.data.data.CityBank,
          empowerURL: res.data.data.empowerURL,
          promiseURL: res.data.data.promiseURL,
          ascriphourBaseURL: res.data.data.ascriphourBaseURL,
          ascriphourFilesURL: res.data.data.ascriphourFilesURL,
          legalhourBaseURL: res.data.data.legalhourBaseURL,
          legalhourFilesURL: res.data.data.legalhourFilesURL,
          ascription: res.data.data.ascription,
          personIncharge: res.data.data.personIncharge,
          verification: res.data.data.verification,
          account: res.data.data.account,
          Bankname: res.data.data.Bankname,
          Bankcorporate: res.data.data.Bankcorporate,
          Bankphone: res.data.data.Bankphone
        }
        sessionStorage.setItem('qualifData', JSON.stringify(data))
        let lpk = JSON.parse(sessionStorage.getItem('qualifData'))
        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard, handleCardId: lpk.Bankcard, inChargeNa: lpk.Bankname, bankcorporate: lpk.Bankcorporate, faPhone: lpk.legalphone,
          Radiovalue: lpk.Settlement, RadiovalueTwo: lpk.account, Bankphone: lpk.Bankphone, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: imgUrlTwo + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          BelongingFourSon: lpk.empowerURL === '' ? '' : lpk.empowerURL,
          BelongingFour: lpk.empowerURL === '' ? [] : [{ url: imgUrlTwo + lpk.empowerURL }],
          ascrBaceUrl: lpk.ascriphourBaseURL,
          BelongingOneSon: lpk.promiseURL === '' ? '' : lpk.promiseURL,
          BelongingOne: lpk.promiseURL === '' ? [] : [{ url: imgUrlTwo + lpk.promiseURL }],
          BelongingTwo: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[0] }],
          BelongingTwoSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[0],
          BelongingThree: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[1] }],
          BelongingThreeSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[1],
          legalhourBaseURL: lpk.legalhourBaseURL,
          BelongingFive: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[0] }],
          BelongingFiveSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[0],
          BelongingSix: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[1] }],
          BelongingSixSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[1],
          value: lpk.ascription,
          valueTwo: lpk.personIncharge,
          valueThree: lpk.verification,
          flagDis: false
        })
      } else {
        let lpk = JSON.parse(sessionStorage.getItem('qualifData'))
        if (lpk.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: lpk.ProvinceBank })
        }
        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard, handleCardId: lpk.Bankcard, inChargeNa: lpk.Bankname, bankcorporate: lpk.Bankcorporate, faPhone: lpk.legalphone,
          Radiovalue: lpk.Settlement, RadiovalueTwo: lpk.account, Bankphone: lpk.Bankphone, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: imgUrlTwo + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          BelongingFourSon: lpk.empowerURL === '' ? '' : lpk.empowerURL,
          BelongingFour: lpk.empowerURL === '' ? [] : [{ url: imgUrlTwo + lpk.empowerURL }],
          ascrBaceUrl: lpk.ascriphourBaseURL,
          BelongingOneSon: lpk.promiseURL === '' ? '' : lpk.promiseURL,
          BelongingOne: lpk.promiseURL === '' ? [] : [{ url: imgUrlTwo + lpk.promiseURL }],
          BelongingTwo: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[0] }],
          BelongingTwoSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[0],
          BelongingThree: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[1] }],
          BelongingThreeSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[1],
          legalhourBaseURL: lpk.legalhourBaseURL,
          BelongingFive: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[0] }],
          BelongingFiveSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[0],
          BelongingSix: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[1] }],
          BelongingSixSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[1],
          value: lpk.ascription,
          valueTwo: lpk.personIncharge,
          valueThree: lpk.verification,
          flagDis: false
        })
      }

    }
  }



  componentDidMount() {
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()
    this.getIsStatus()
    this.getVenueQualificationInformation()

  }

  provinceChange = e => {

    this.setState({ province_id: e.toString(), backList: [] })
    if (e !== this.state.province_id) {
      this.setState({ city_id: '', openingLine: '' })
    }
    this.getVenueOpenBankCity({ province_id: e })

  }

  typeChange = e => {
    this.setState({ bank_id: e.toString(), backList: [] })
    this.getVenueOpenBankProvince()
    if (e !== this.state.bank_id) {
      this.setState({ openingLine: '' })
    }
  }

  cityChange = e => {
    this.setState({ city_id: e.toString(), backList: [] })
  }

  handleSearch = e => {
    if (e !== '') {
      this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
    }
  }



  selectChecked = e => {
    if (e.currentTarget.dataset.id === '1000') {
      this.setState({ openingLine: e.currentTarget.dataset.name, yinhangSelect: 0, hand: 1, kolod: e.currentTarget.dataset.id })
    } else {
      this.setState({ openingLine: e.currentTarget.dataset.name, yinhangSelect: 0, hand: 0, kolod: e.currentTarget.dataset.id })
    }
  }


  handleName = e => {
    this.setState({ faName: e.target.value })
  }
  handleCardId = e => {
    this.setState({ handleCardId: e.target.value })
  }

  inChargeNa = e => {
    this.setState({ inChargeNa: e.target.value })
  }
  bankcorporate = e => {
    this.setState({ bankcorporate: e.target.value })
  }

  handlePhone = e => {
    this.setState({ faPhone: e.target.value })
  }
  Bankphone = e => {
    this.setState({ Bankphone: e.target.value })
  }
  handleBankNum = e => {
    this.setState({ cardId: e.target.value })
    if (e.target.value === '') {
      this.setState({ bank_id: '', province_id: '', city_id: '', openingLine: '', backProvince: [], backCity: [] })
    }
  }

  openingLine = e => {
    this.setState({ openingLine: e.target.value,yinhangSelect:0 })
  }

  CorporateName = e => {
    if (this.state.flagDis === true && e.target.value === '') {
      sessionStorage.removeItem('qualifData')
      this.getVenueQualificationInformation()
    }
    this.setState({ CorporateName: e.target.value })

  }


  async UploadVenueImgsLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ filesThreeSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ filesThree: [], loading: true })
    } else {
      this.setState({ filesThree: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  handleChangeOne = (files, type, index) => {
    this.setState({ filesThree: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesThreeSon: '' })
    }
  }

  async UploadVenueImgsLisenSix(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ filesSixSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ filesSix: [], loading: true })
    } else {
      this.setState({ filesSix: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }


  handleChangeSix = (files, type, index) => {
    this.setState({ filesSix: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenSix(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSixSon: '' })
    }
  }


  async UploadVenueImgsLisenTwo(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ filesFourSon: res.data.data.filesURL, legalBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ filesFour: [], loading: true })
    } else {
      this.setState({ filesFour: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  handleChangeTwo = (files, type, index) => {
    this.setState({ filesFour: files })
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
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFourSon: '', filesFiveSon: '', filesFive: [] })
    }
  }


  async UploadVenueImgsLisenTwoT(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ filesFiveSon: res.data.data.filesURL, legalBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ filesFive: [], loading: true })
    } else {
      this.setState({ filesFive: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }



  handleChangeThree = (files, type, index) => {
    this.setState({ filesFive: files })
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
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFiveSon: '', filesFourSon: '', filesFour: [] })
    }
  }





  onChangeRadio = e => {
    this.setState({
      Radiovalue: e.target.value,
      bank_id: '', province_id: '', city_id: '', openingLine: '', cardId: ''
    })
  }

  onChangeRadioTwo = e => {
    this.setState({
      RadiovalueTwo: e.target.value,
      Radiovalue: 1,
      bank_id: '', province_id: '', city_id: '', openingLine: '', cardId: ''
    })
  }


  async VenueQualifications_another(data) {
    const res = await VenueQualifications_another(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      sessionStorage.clear()
    } else {
      this.props.history.push('/statusAudits')
    }
  }




  async VenueQualificationInformationSave_another(data) {
    const res = await VenueQualificationInformationSave_another(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      sessionStorage.clear()
    } else {
      this.props.history.push('/statusAudits')
    }
  }


  async VenueVerifyThatAllAreFilledIn(data) {
    const res = await VenueVerifyThatAllAreFilledIn(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let { kolod,siteUUID, filesThreeSon, legalBaseURL, value, valueTwo, valueThree, CorporateName, filesFourSon, Radiovalue, RadiovalueTwo, BelongingOneSon, BelongingFourSon, BelongingFiveSon, BelongingSixSon, legalhourBaseURL, filesFiveSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, cardId, Bankphone, openingLine, handleCardId, inChargeNa, bankcorporate } = this.state
      if (this.state.isqult === 0) {
        let data = {
          siteUUID: siteUUID,
          ascription: value,
          CorporateName: value === 1 ? '' : CorporateName,
          lisenceURL: value === 1 ? '' : filesThreeSon,
          promiseURL: value === 1 ? BelongingOneSon : '',
          ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
          ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
          personIncharge: valueTwo,
          empowerURL: valueTwo === 1 || valueTwo === 2 ? '' : BelongingFourSon,
          verification: valueThree,
          legalname: faName,
          legalphone: faPhone,
          legalcard: valueThree === 2 ? faIdcard : '',
          Bankcorporate: RadiovalueTwo === 0 && Radiovalue === 0 ? bankcorporate : '',
          Bankname: RadiovalueTwo === 1 ? inChargeNa : Radiovalue === 1 ? inChargeNa : '',
          Bankcard: RadiovalueTwo === 1 ? handleCardId : Radiovalue === 1 ? handleCardId : '',
          legalhourBaseURL: valueThree === 3 ? legalhourBaseURL : '',
          legalhourFilesURL: valueThree === 3 ? BelongingFiveSon + '|' + BelongingSixSon : '',
          Settlement: Radiovalue,
          account: RadiovalueTwo,
          legalBaseURL: RadiovalueTwo === 0 && Radiovalue === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
          legalFilesURL: RadiovalueTwo === 0 && Radiovalue === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
          Bankaccount: cardId,
          Bankphone: Bankphone,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
        }

        if (this.state.loading === false || this.state.loadingTwo === false || this.state.loadingThree === false || this.state.loadingSix === false) {
          message.warning('图片上传中...');
        }  else {
          this.VenueQualifications_another(data)
        }
      } else {
        let data = {
          ascription: value,
          CorporateName: value === 1 ? '' : CorporateName,
          lisenceURL: value === 1 ? '' : filesThreeSon,
          promiseURL: value === 1 ? BelongingOneSon : '',
          ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
          ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
          personIncharge: valueTwo,
          empowerURL: valueTwo === 1 || valueTwo === 2 ? '' : BelongingFourSon,
          verification: valueThree,
          legalname: faName,
          legalphone: faPhone,
          legalcard: valueThree === 2 ? faIdcard : '',
          Bankcorporate: RadiovalueTwo === 0 && Radiovalue === 0 ? bankcorporate : '',
          Bankname: RadiovalueTwo === 1 ? inChargeNa : Radiovalue === 1 ? inChargeNa : '',
          Bankcard: RadiovalueTwo === 1 ? handleCardId : Radiovalue === 1 ? handleCardId : '',
          legalhourBaseURL: valueThree === 3 ? legalhourBaseURL : '',
          legalhourFilesURL: valueThree === 3 ? BelongingFiveSon + '|' + BelongingSixSon : '',
          Settlement: Radiovalue,
          account: RadiovalueTwo,
          legalBaseURL: RadiovalueTwo === 0 && Radiovalue === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
          legalFilesURL: RadiovalueTwo === 0 && Radiovalue === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
          Bankaccount: cardId,
          Bankphone: Bankphone,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id : city_id,
          type: 1
        }

        if (this.state.loading === false || this.state.loadingTwo === false || this.state.loadingThree === false || this.state.loadingSix === false) {
          message.warning('图片上传中...')
        } else if (Bankphone === '') {
          message.warning('请填写短信通知手机号')
        }else if(kolod===''){
          message.warning('请选择搜索出来的支行名称')
        } else {
          this.VenueQualificationInformationSave_another(data)

        }

      }
    } else {
      message.warning('请完善基本信息');
      this.props.history.push('/perfect')
    }
  }



  submit = () => {
    this.VenueVerifyThatAllAreFilledIn()
  }
  stepBack = () => {
    let { siteUUID, filesThreeSon, legalBaseURL, value, valueTwo, valueThree, CorporateName, filesFourSon, Radiovalue, RadiovalueTwo, BelongingOneSon, BelongingFourSon, BelongingFiveSon, BelongingSixSon, legalhourBaseURL, filesFiveSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, cardId, Bankphone, openingLine, handleCardId, inChargeNa, bankcorporate } = this.state
    let data = {
      siteUUID: siteUUID,
      ascription: value,
      CorporateName: value === 1 ? '' : CorporateName,
      lisenceURL: value === 1 ? '' : filesThreeSon,
      promiseURL: value === 1 ? BelongingOneSon : '',
      ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
      ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
      personIncharge: valueTwo,
      empowerURL: valueTwo === 1 || valueTwo === 2 ? '' : BelongingFourSon,
      verification: valueThree,
      legalname: faName,
      legalphone: faPhone,
      legalcard: valueThree === 2 ? faIdcard : '',
      Bankcorporate: RadiovalueTwo === 0 && Radiovalue === 0 ? bankcorporate : '',
      Bankname: RadiovalueTwo === 1 ? inChargeNa : Radiovalue === 1 ? inChargeNa : '',
      Bankcard: RadiovalueTwo === 1 ? handleCardId : Radiovalue === 1 ? handleCardId : '',
      legalhourBaseURL: valueThree === 3 ? legalhourBaseURL : '',
      legalhourFilesURL: valueThree === 3 ? BelongingFiveSon + '|' + BelongingSixSon : '',
      Settlement: Radiovalue,
      account: RadiovalueTwo,
      legalBaseURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
      legalFilesURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
      Bankaccount: cardId,
      Bankphone: Bankphone,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
      flagDis: this.state.flagDis
    }
    sessionStorage.setItem('qualifData', JSON.stringify(data))
    this.props.history.push('/perfect')
  }


  async TemporaryQualificationInformation_another(data) {
    const res = await TemporaryQualificationInformation_another(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      let { siteUUID, filesThreeSon, legalBaseURL, value, valueTwo, valueThree, CorporateName, filesFourSon, Radiovalue, RadiovalueTwo, BelongingOneSon, BelongingFourSon, BelongingFiveSon, BelongingSixSon, legalhourBaseURL, filesFiveSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, cardId, Bankphone, openingLine, handleCardId, inChargeNa, bankcorporate } = this.state
      let data = {
        siteUUID: siteUUID,
        ascription: value,
        CorporateName: value === 1 ? '' : CorporateName,
        lisenceURL: value === 1 ? '' : filesThreeSon,
        promiseURL: value === 1 ? BelongingOneSon : '',
        ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
        ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
        personIncharge: valueTwo,
        empowerURL: valueTwo === 1 || valueTwo === 2 ? '' : BelongingFourSon,
        verification: valueThree,
        legalname: faName,
        legalphone: faPhone,
        legalcard: valueThree === 2 ? faIdcard : '',
        Bankcorporate: RadiovalueTwo === 0 && Radiovalue === 0 ? bankcorporate : '',
        Bankname: RadiovalueTwo === 1 ? inChargeNa : Radiovalue === 1 ? inChargeNa : '',
        Bankcard: RadiovalueTwo === 1 ? handleCardId : Radiovalue === 1 ? handleCardId : '',
        legalhourBaseURL: valueThree === 3 && legalhourBaseURL !== '' ? legalhourBaseURL : '',
        legalhourFilesURL: valueThree === 3 && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
        Settlement: Radiovalue,
        account: RadiovalueTwo,
        legalBaseURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
        legalFilesURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
        Bankaccount: cardId,
        Bankphone: Bankphone,
        OpeningBank: openingLine,
        Banktype: typeof (bank_id) !== 'string' ? bank_id : bank_id,
        ProvinceBank: typeof (province_id) !== 'string' ? province_id : province_id,
        CityBank: typeof (city_id) !== 'string' ? city_id : city_id,
        flagDis: this.state.flagDis
      }
      sessionStorage.setItem('qualifData', JSON.stringify(data))
      this.getVenueQualificationInformation()
    }
  }
  save = () => {
    let { siteUUID, filesThreeSon, legalBaseURL, value, valueTwo, valueThree, CorporateName, filesFourSon, Radiovalue, RadiovalueTwo, BelongingOneSon, BelongingFourSon, BelongingFiveSon, BelongingSixSon, legalhourBaseURL, filesFiveSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, cardId, Bankphone, openingLine, handleCardId, inChargeNa, bankcorporate } = this.state
    let data = {
      siteUUID: siteUUID,
      ascription: value,
      CorporateName: value === 1 ? '' : CorporateName,
      lisenceURL: value === 1 ? '' : filesThreeSon,
      promiseURL: value === 1 ? BelongingOneSon : '',
      ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
      ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
      personIncharge: valueTwo,
      empowerURL: valueTwo === 1 || valueTwo === 2 ? '' : BelongingFourSon,
      verification: valueThree,
      legalname: faName,
      legalphone: faPhone,
      legalcard: valueThree === 2 ? faIdcard : '',
      Bankcorporate: RadiovalueTwo === 0 && Radiovalue === 0 ? bankcorporate : '',
      Bankname: RadiovalueTwo === 1 ? inChargeNa : Radiovalue === 1 ? inChargeNa : '',
      Bankcard: RadiovalueTwo === 1 ? handleCardId : Radiovalue === 1 ? handleCardId : '',
      legalhourBaseURL: valueThree === 3 ? legalhourBaseURL : '',
      legalhourFilesURL: valueThree === 3 ? BelongingFiveSon + '|' + BelongingSixSon : '',
      Settlement: Radiovalue,
      account: RadiovalueTwo,
      legalBaseURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
      legalFilesURL: Radiovalue === 0 && RadiovalueTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
      Bankaccount: cardId,
      Bankphone: Bankphone,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id : city_id,
    }

    if (this.state.loading === false || this.state.loadingTwo === false || this.state.loadingThree === false || this.state.loadingSix === false) {
      message.warning('图片上传中...');
    } else {
      this.TemporaryQualificationInformation_another(data)
    }

  }




  async getVenueQualifiedCompany(data) {
    const res = await getVenueQualifiedCompany(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visible: true, legePhone: res.data.data.phone })
    } else {
      message.warning(res.data.msg)
    }
  }

  search = () => {
    this.getVenueQualifiedCompany({ CorporateName: this.state.CorporateName })
  }


  async nacode(data) {
    const res = await _code(data)
    if (res.data.code === 4007) {
      this.setState({ visiblePhone: true, textTwo: res.data.msg })
    } else if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
    } else {
      message.error(res.data.msg)
    }
  }

  code = () => {
    this.nacode({ mobile: this.state.legePhone, type: 'venuequalifiedcompany', uuid: '' })
  }
  codeNum = (e) => {
    this.setState({ codeNum: e.target.value })
  }

  async getVenueQualified(data) {
    const res = await getVenueQualified(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, handleCardId: res.data.data.Bankcard, inChargeNa: res.data.data.Bankname, bankcorporate: res.data.data.Bankcorporate, faPhone: res.data.data.legalphone,
        Radiovalue: res.data.data.Settlement, RadiovalueTwo: res.data.data.account, Bankphone: res.data.data.Bankphone, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        BelongingFourSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
        BelongingFour: res.data.data.empowerURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.empowerURL }],
        ascrBaceUrl: res.data.data.ascriphourBaseURL,
        BelongingOneSon: res.data.data.promiseURL === '' ? '' : res.data.data.promiseURL,
        BelongingOne: res.data.data.promiseURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.promiseURL }],
        BelongingTwo: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[0] }],
        BelongingTwoSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[0],
        BelongingThree: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[1] }],
        BelongingThreeSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[1],
        legalhourBaseURL: res.data.data.legalhourBaseURL,
        BelongingFive: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[0] }],
        BelongingFiveSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[0],
        BelongingSix: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[1] }],
        BelongingSixSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[1],
        value: res.data.data.ascription,
        valueTwo: res.data.data.personIncharge,
        valueThree: res.data.data.verification,
        flagDis: false, visible: false
      })
    }
  }

  get = () => {
    this.getVenueQualified({ CorporateName: this.state.CorporateName, code: this.state.codeNum, phone: this.state.legePhone })
  }
  handleCancel = () => {
    this.setState({ visible: false, visibleTwo: false })
  }

  srcScale = e => {
    this.setState({ visibleTwo: true, src: e.target.src })
  }

  previewing = (files, index) => {
    if (this.state.loading === false) {
      message.warning('图片上传中...', 1)
    } else {
      this.setState({ imgMasking: index[files].url, masking: true })
    }
  }
  maskingF = () => {
    this.setState({ masking: false })
  }

  nameRadio = e => {
    if (e.target.value === 0) {
      this.setState({ valueTwo: 1 })
    } else {
      this.setState({ valueTwo: 2 })
    }
    this.setState({ value: e.target.value, RadiovalueTwo: e.target.value, Radiovalue: e.target.value })
  }

  async BelongingOneLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingOneSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingOne: [], loading: true })
    } else {
      this.setState({ BelongingOne: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingOne = (files, type, index) => {
    this.setState({ BelongingOne: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingOneLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingOneSon: '' })
    }
  }

  async BelongingFourLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFourSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingFour: [], loading: true })
    } else {
      this.setState({ BelongingFour: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingFour = (files, type, index) => {
    this.setState({ BelongingFour: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingFourLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFourSon: '' })
    }
  }

  nameRadioTwo = e => {
    this.setState({ valueTwo: e.target.value })
  }
  nameRadioThree = e => {
    this.setState({ valueThree: e.target.value })
  }
  facard = e => {
    this.setState({ faIdcard: e.target.value })
  }

  async BelongingFiveLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFiveSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingFive: [], loading: true })
    } else {
      this.setState({ BelongingFive: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingFive = (files, type, index) => {
    this.setState({ BelongingFive: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingFiveLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFiveSon: '', BelongingSix: [], BelongingSixSon: '', legalhourBaseURL: '' })
    }
  }

  async BelongingSixLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingSixSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingSix: [], loading: true })
    } else {
      this.setState({ BelongingSix: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingSix = (files, type, index) => {
    this.setState({ BelongingSix: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingSixLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingSixSon: '', BelongingFive: [], BelongingFiveSon: '', legalhourBaseURL: '' })
    }
  }

  async BelongingTwoLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingTwoSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingTwo: [], loading: true })
    } else {
      this.setState({ BelongingTwo: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingTwo = (files, type, index) => {
    this.setState({ BelongingTwo: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingTwoLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingTwoSon: '', BelongingThree: [], BelongingThreeSon: '', ascrBaceUrl: '' })
    }
  }


  async BelongingThreeLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingThreeSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ BelongingThree: [], loading: true })
    } else {
      this.setState({ BelongingThree: [], loading: true })
      message.warning(res.data.msg, 2)
    }
  }

  BelongingThree = (files, type, index) => {
    this.setState({ BelongingThree: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingThreeLisen(formdata1)
          })
      } else {
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingThreeSon: '', BelongingTwo: [], BelongingTwoSon: '', ascrBaceUrl: '' })
    }
  }




  render() {
    const { filesThree, BelongingFour, filesFour, filesFive, BelongingOne, BelongingTwo, BelongingThree, BelongingFive, BelongingSix } = this.state;
    return (
      <div className="qualification">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginLeft: 45, marginTop: 13.5 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>

        </div>
        <div className="content">
          <div className="nav">
            <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
            <div><span>2.完善资质信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
            <div><span>3.等待审核</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
            <div><span>4.审核结果</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
          </div>
          <div className="contentSon">
            <span className="titile">场馆归属证明</span>
            <div className="name">
              <Radio.Group onChange={this.nameRadio} style={{ marginLeft: '55px' }} value={this.state.value}>
                <Radio value={0}>公司</Radio>
                <Radio value={1}>个人</Radio>
              </Radio.Group>
            </div>


            <div style={this.state.value === 0 ? {} : { display: 'none' }}>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">公司名称</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput" value={this.state.CorporateName} onChange={this.CorporateName} placeholder="请输入公司名称" />
                <span className="sreach" onClick={this.search}>查询</span><span>(若该公司资质已在平台录入)</span>
              </div>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">营业执照</span><span className="symbol">*</span>
                </div>
                <ImagePicker
                  files={filesThree}
                  style={{ float: 'left', width: '15%' }}
                  onChange={this.handleChangeOne}
                  onImageClick={this.previewing}
                  selectable={filesThree.length < 1}
                  length={1}
                  multiple={false}
                  disableDelete={this.state.flagDis}
                />
              </div>
            </div>
            <div style={this.state.value === 1 ? {} : { display: 'none' }}>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">承诺书照</span><span className="symbol">*</span>
                </div>
                <ImagePicker
                  files={BelongingOne}
                  style={{ float: 'left', width: '15%', }}
                  onChange={this.BelongingOne}
                  onImageClick={this.previewing}
                  selectable={BelongingOne.length < 1}
                  length={1}
                  multiple={false}
                  disableDelete={this.state.flagDis}
                />
              </div>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">手持身份证照</span><span className="symbol">*</span>
                </div>
                <ImagePicker
                  files={BelongingTwo}
                  style={{ float: 'left', width: '15%' }}
                  onChange={this.BelongingTwo}
                  onImageClick={this.previewing}
                  selectable={BelongingTwo.length < 1}
                  length={1}
                  multiple={false}
                  disableDelete={this.state.flagDis}
                />
                <ImagePicker
                  files={BelongingThree}
                  style={{ float: 'left', width: '15%' }}
                  onChange={this.BelongingThree}
                  onImageClick={this.previewing}
                  selectable={BelongingThree.length < 1}
                  length={1}
                  multiple={false}
                  disableDelete={this.state.flagDis}
                />
              </div>
            </div>

            <span className="titile">场馆负责人</span>
            <Radio.Group onChange={this.nameRadioTwo} style={{ marginLeft: '55px', marginTop: '20px' }} value={this.state.valueTwo}>
              <Radio style={this.state.value === 0 ? {} : { display: 'none' }} value={1}>法人</Radio>
              <Radio style={this.state.value === 1 ? {} : { display: 'none' }} value={2}>承诺人本人</Radio>
              <Radio value={3}>代理人</Radio>
            </Radio.Group>



            <div className="name" style={this.state.valueTwo !== 1 && this.state.valueTwo !== 2 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">授权书照</span><span className="symbol">*</span>
              </div>
              <ImagePicker
                files={BelongingFour}
                style={{ float: 'left', width: '15%' }}
                onChange={this.BelongingFour}
                onImageClick={this.previewing}
                selectable={BelongingFour.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>


            <span className="titile">负责人验证方式</span>
            <div className="name">
              <Radio.Group onChange={this.nameRadioThree} style={{ marginLeft: '55px' }} value={this.state.valueThree}>
                <Radio value={1}>姓名、手机号</Radio>
                <Radio value={2}>姓名、手机号、身份证号</Radio>
                <Radio value={3}>姓名、手机号、手持身份证照</Radio>
              </Radio.Group>
            </div>

            <div className="name">
              <div className="nameSonTle">
                <span className="boTitle">姓名</span><span className="symbol">*</span>
              </div>
              <Input className="nameINput" disabled={this.state.flagDis} onChange={this.handleName} value={this.state.faName} placeholder="请输入负责人姓名" />
            </div>


            <div className="name">
              <div className="nameSonTle">
                <span className="boTitle">手机号</span><span className="symbol">*</span>
              </div>
              <Input className="nameINput phone" maxLength={11} disabled={this.state.flagDis} value={this.state.faPhone} onChange={this.handlePhone} style={{ fontSize: '14px' }} placeholder="请输入11位手机号" />
            </div>

            <div className="name" style={this.state.valueThree === 2 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">身份证号</span><span className="symbol">*</span>
              </div>
              <Input className="nameINput phone" disabled={this.state.flagDis} value={this.state.faIdcard} onChange={this.facard} style={{ fontSize: '14px' }} placeholder="请输入身份证号" />
            </div>

            <div className="name" style={this.state.valueThree === 3 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">手持身份证照</span><span className="symbol">*</span>
              </div>
              <ImagePicker
                files={BelongingFive}
                style={{ float: 'left', width: '15%' }}
                onChange={this.BelongingFive}
                onImageClick={this.previewing}
                selectable={BelongingFive.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={BelongingSix}
                style={{ float: 'left', width: '15%' }}
                onChange={this.BelongingSix}
                onImageClick={this.previewing}
                selectable={BelongingSix.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>

            <div className="titile" style={{ marginTop: '38px', marginLeft: '-10px', textAlign: 'left', width: '450px' }}>场馆收款银行信息<span style={{ color: '#9B9B9B', fontWeight: '400' }}>(也可在提现前填写)</span></div>
            <div className="name">
              <div className="nameSonTle">
                <span className="boTitle">结算账号</span>
              </div>
              <Radio.Group onChange={this.onChangeRadioTwo} disabled={this.state.flagDis} value={this.state.RadiovalueTwo}>
                <Radio style={this.state.value === 1 ? { display: 'none' } : {}} value={0}>场馆归属人账号</Radio>
                <Radio value={1}>场馆负责人账号</Radio>
              </Radio.Group>
            </div>

            <div className="name" style={this.state.RadiovalueTwo === 1 ? { display: 'none' } : {}}>
              <div className="nameSonTle">
                <span className="boTitle">归属人性质</span>
              </div>
              <Radio.Group onChange={this.onChangeRadio} disabled={this.state.flagDis} value={this.state.Radiovalue}>
                <Radio value={0}>公司</Radio>
                <Radio value={1}>个人</Radio>
              </Radio.Group>
            </div>

            <div className="name" style={this.state.Radiovalue === 0 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">公司名称</span>
              </div>
              <Input className="nameINput cardId" style={{ width: '445px' }} disabled={this.state.flagDis} value={this.state.bankcorporate} onChange={this.bankcorporate} placeholder="请输入公司名称" />
            </div>

            <div className="name" style={this.state.Radiovalue === 1 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">负责人姓名</span>
              </div>
              <Input className="nameINput cardId" style={{ width: '445px' }} disabled={this.state.flagDis} value={this.state.inChargeNa} onChange={this.inChargeNa} placeholder="请输入负责人姓名" />
            </div>

            <div className="name" style={this.state.Radiovalue === 1 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">负责人身份证号</span>
              </div>
              <Input className="nameINput cardId" style={{ width: '445px' }} disabled={this.state.flagDis} value={this.state.handleCardId} onChange={this.handleCardId} placeholder="请输入负责人身份证号" />
            </div>

            <div className="name" style={this.state.Radiovalue === 1 ? {} : { display: 'none' }}>
              <div className="nameSonTle">
                <span className="boTitle">负责人身份证照</span>
              </div>
              <ImagePicker
                files={filesFour}
                style={{ float: 'left', width: '15%' }}
                onChange={this.handleChangeTwo}
                onImageClick={this.previewing}
                selectable={filesFour.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={filesFive}
                style={{ float: 'left', width: '15%' }}
                onChange={this.handleChangeThree}
                onImageClick={this.previewing}
                selectable={filesFive.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>
            <div className="name" style={{float:'left',marginBottom:'20px'}}>
              <div className="nameSonTle">
                <span className="boTitle">银行账号</span>
              </div>
              <Input className="nameINput" style={{ width: '445px' }} disabled={this.state.flagDis} onChange={this.handleBankNum} value={this.state.cardId} placeholder="请输入银行卡号" />
            </div>

            <div className="name">
              <div className="nameSonTle">
                <span className="boTitle">短信通知</span>
              </div>
              <Input className="nameINput" style={{ width: '445px' }} disabled={this.state.flagDis} maxLength={11} onChange={this.Bankphone} value={this.state.Bankphone} placeholder="请输入通知汇款成功手机号" />
            </div>


            <div className="name">
              <div className="nameSonTle">
                <span className="boTitle">开户行及所在地</span>
              </div>
              <Select placeholder="银行类型" disabled={this.state.flagDis} style={{ width: 130, height: '35px', lineHeight: '35px' }} value={this.state.bank_id === '' ? null : Number(this.state.bank_id)} loading={this.state.flag} onChange={this.typeChange}>
                {
                  this.state.type.map((item, i) => (
                    <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                  ))
                }
              </Select>
              <Select placeholder="所在省" disabled={this.state.flagDis} style={{ width: 130, height: '35px', marginLeft: '27px' }} loading={this.state.flagTwo} value={this.state.province_id === '' ? null : Number(this.state.province_id)} onChange={this.provinceChange}>
                {
                  this.state.backProvince.map((item, i) => (
                    <Option key={i} value={item.province_id}>{item.province}</Option>
                  ))
                }
              </Select>
              <Select placeholder="所在市" disabled={this.state.flagDis} style={{ width: 130, height: '35px', marginLeft: '27px' }} value={this.state.city_id === '' ? null : Number(this.state.city_id)} loading={this.state.flagThree} onChange={this.cityChange}>
                {
                  this.state.backCity.map((item, i) => (
                    <Option key={i} value={item.city_id}>{item.city}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="name" style={{ position: 'relative' }}>
              <div className="nameSonTle">
                <span className="boTitle">支行名称</span>
              </div>

              <Search placeholder="请输入支行名称" value={this.state.openingLine === '' ? null : this.state.openingLine} onChange={this.openingLine} onSearch={this.handleSearch} style={{ width: 445 }} />
              <div className="yinhangSelect" style={this.state.yinhangSelect === 0 ? { display: 'none' } : { display: 'block' }}>
            
              <div style={{height:'110px',overflowY:'auto'}}>
                <div style={this.state.backList.length===0?{textAlign:'center',marginBottom:'30px'}:{display:'none'}}>未找到该支行名称</div>
                {
                  this.state.backList.map((item, i) => (
                    <div key={i}  onClick={this.selectChecked} data-name={item.name} data-id={item.id}>{item.nameT}</div>
                  ))
                }
                </div>
                <div style={this.state.backList.length<10?{}:{display:'none'}}>
                  <Input placeholder="手动添加支行" style={{width:'60%',height:'35px'}} onChange={this.backListJoinInput}/>
                  <span className="pJoin" onClick={this.backListJoin}>+添加</span><span></span>
                </div>

              </div>



            </div>




            <div className="prompt">请注意<span>*</span>为必填项</div>
            <Button className="next" onClick={this.stepBack}>上一步</Button><Button className="next" style={this.state.flagDis === true ? { display: 'none' } : { marginLeft: 20 }} onClick={this.save}>保存</Button><Button className="next" style={{ marginLeft: 20 }} onClick={this.submit}>提交</Button>
          </div>
        </div>
        <Modal
          title="获取该公司详细资质信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancel}
        >
          <div><span style={{ float: 'left', lineHeight: '42px', width: '100px' }}>负责人手机号</span><Input value={this.state.legePhone} disabled={true} style={{ width: '270px', float: 'left', marginLeft: '20px' }} /></div>
          <div style={{ float: 'left', marginTop: "10px" }}>
            <span style={{ float: 'left', lineHeight: '42px', width: '100px' }} >验证码</span>
            <Input style={{ width: '190px', float: 'left', marginLeft: '20px' }} onChange={this.codeNum} />
            <span style={{ width: '80px', height: '47px', color: '#fff', background: '#F5A623', textAlign: 'center', lineHeight: '47px', float: 'left', cursor: 'pointer' }} onClick={this.code}>{this.state.textT}</span>
          </div>
          <div style={{ width: '80px', height: '30px', color: '#fff', background: '#F5A623', cursor: 'pointer', clear: 'both', textAlign: 'center', lineHeight: '30px', marginLeft: '120px', marginTop: '120px' }} onClick={this.get}>获取</div>
        </Modal>



        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>



      </div>
    )
  }
}

export default qualification;
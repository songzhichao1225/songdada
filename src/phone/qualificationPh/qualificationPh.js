import React from 'react';
import './qualificationPh.css';

import { Toast, Picker, List, NavBar, Popover, Modal, ImagePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Radio, Select } from 'antd';
import lrz from 'lrz';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { getIsStatus, getVenueOpenBankList, getVenueOpenBank, getVenueOpenBankProvince,VenueVerifyThatAllAreFilledIn, getVenueOpenBankCity, getIsSignOut, UploadVenueImgsLisenTwo, _code, UploadVenueImgsLisen, getVenueQualified, TemporaryQualificationInformation, VenueQualifications, getVenueQualificationInformation, VenueQualificationInformationSave, getVenueQualifiedCompany } from '../../api';
const alert = Modal.alert;
const prompt = Modal.prompt;
const { Option } = Select;
const Item = Popover.Item;






class qualificationPh extends React.Component {

  state = {
    place: '请上传手持身份证正反面照片',
    imageResOne: '',//营业执照
    imageReT: '',//身份证正面
    imageReST: '',//反面
    value: 0,
    siteUUID: '',//场馆Id
    imageUrl: '',
    imageUrlBaseT: '',//公共路径
    faName: '',//法人姓名
    faIdcard: '',//法人身份证号
    faPhone: '',//法人手机号
    cardId: '',//银行账号
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    openingLine: '',
    kaiText: '请选择银行所在地',
    flagDis: false,
    visibleTwo: false,
    src: '',
    filesThree: [],//营业执照
    filesThreeSon: '',
    filesFour: [],//身份证照
    filesFourSon: '',
    filesFive: [],
    filesFiveSon: '',
    filesSix: [],
    filesSixSon: '',//授权照
    imgMasking:'',
    masking:false
  };


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

      this.setState({ type: arrType, flag: false })
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
      this.setState({ backProvince: arrType, flagTwo: false })
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
      this.setState({ backCity: arrType, flagThree: false })
    }
  }



  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        value: res.data.data.Settlement, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        filesSix: res.data.data.empowerURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.empowerURL }],
        filesSixSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
      })

      if (localStorage.getItem('qualifData') === null) {

        if (res.data.data.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
        }
        let data = {
          siteUUID: res.data.data.siteUid,
          lisenceURL: res.data.data.lisenceURL,
          legalname: res.data.data.legalname,
          legalcard: res.data.data.legalcard,
          legalphone: res.data.data.legalphone,
          legalBaseURL: res.data.data.legalBaseURL,
          legalFilesURL: res.data.data.legalFilesURL,
          Settlement: res.data.data.Settlement,
          Bankaccount: res.data.data.Bankaccount,
          OpeningBank: res.data.data.OpeningBank,
          CorporateName: res.data.data.CorporateName,
          Banktype: res.data.data.Banktype,
          ProvinceBank: res.data.data.ProvinceBank,
          CityBank: res.data.data.CityBank,
          empowerURL: res.data.data.empowerURL
        }
        localStorage.setItem('qualifData', JSON.stringify(data))
        let lpk = JSON.parse(localStorage.getItem('qualifData'))
        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard, faPhone: lpk.legalphone,
          value: lpk.Settlement, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          filesSix: lpk.empowerURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.empowerURL }],
          filesSixSon: lpk.empowerURL === '' ? '' : lpk.empowerURL,
          flagDis: false
        })
      } else {
        let lpk = JSON.parse(localStorage.getItem('qualifData'))
        if (lpk.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: lpk.ProvinceBank })
        }
        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard, faPhone: lpk.legalphone,
          value: lpk.Settlement, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          filesSix: lpk.empowerURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + lpk.empowerURL }],
          filesSixSon: lpk.empowerURL === '' ? '' :lpk.empowerURL,
          flagDis: false
        })
      }
    }

  }


  async getIsSignOut(data) {
    const res = await getIsSignOut(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      localStorage.clear()
      Toast.fail('您的账号已在别处登录', 2)
    }
  }




  componentDidMount() {
    this.getIsStatus()
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()
    this.getVenueQualificationInformation()

    var timer = setInterval(() => {
      if (this.props.history.location.pathname.split('/')[1] !== 'qualificationPh') {
        clearInterval(timer)
      } else {
        this.getIsSignOut()
      }

    }, 3000);

  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: true });
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageUrl: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageUrl: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }



  radioChange = e => {
    this.setState({ value: e.target.value, cardId: '', bank_id: '', province_id: '', city_id: '', openingLine: '' })


  }
  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      localStorage.setItem('isqult', undefined)
      localStorage.setItem('issite', undefined)
      localStorage.setItem('islegal', undefined)
      Toast.fail('登录超时请重新登录!', 1);
    }
    this.setState({ siteUUID: res.data.data.siteUid })
  }
  faName = e => {
    this.setState({ faName: e.target.value })
  }
  faIdcard = e => {
    this.setState({ faIdcard: e.target.value })
  }
  faPhone = e => {
    this.setState({ faPhone: e.target.value })
  }
  cardId = e => {
    this.setState({ cardId: e.target.value })
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let name=res.data.data
      let arrName=[]
      for(let i in name){
        let obj={}
        obj.name=name[i].sub_branch_name
        obj.nameT=name[i].sub_branch_name.slice(name[i].sub_branch_name.indexOf('公司')+2,name[i].sub_branch_name.length)
        arrName.push(obj)
      }
      this.setState({ backList: arrName, flagThree: false })
    }
  }

  provinceChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ province_id: e, city_id: '', openingLine: '', backCity: [] })
      this.getVenueOpenBankCity({ province_id: e })
    } else {
      Toast.fail('请选择银行类型', 1);
      this.getVenueOpenBankCity({ province_id: e })
    }
  }

  typeChange = e => {
    if (this.state.city_id !== '') {
      this.setState({ bank_id: e, openingLine: '', backList: [] })
    } else {
      this.setState({ bank_id: e })
    }
  }

  cityChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ city_id: e, openingLine: '', kaiText: '请输入银行关键字', backList: [] })
    } else {
      this.setState({ city_id: e, kaiText: '请输入银行关键字' })
    }

  }
  handleSearch = e => {
    if (e !== '') {
      this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
    }
  }
  openingLine = e => {
    this.setState({ openingLine: e })
  }

  async VenueQualifications(data) {
    const res = await VenueQualifications(data,localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success('提交成功', 1);
    } else {
      Toast.fail(res.data.msg, 1);

    }
  }



  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success('提交成功', 1);
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }


  async VenueVerifyThatAllAreFilledIn(data) {
    const res = await VenueVerifyThatAllAreFilledIn(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000){
      let { siteUUID, filesThreeSon, legalBaseURL, CorporateName,filesSixSon, filesFourSon, filesFiveSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, value, cardId, openingLine } = this.state

      if (sessionStorage.getItem('notType') === '1') {
        let data = {
          lisenceURL: filesThreeSon,
          empowerURL:filesSixSon,
          legalname: faName,
          legalcard: value === 0 ? '' : faIdcard,
          legalphone: faPhone,
          legalBaseURL: value === 0 ? '' :filesFourSon===''?'':legalBaseURL,
          legalFilesURL: value === 0 ? '' :filesFourSon===''?'':filesFourSon + '|' + filesFiveSon,
          CorporateName: CorporateName,
          Settlement: value,
          Bankaccount: cardId,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
          type: 1
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中...', 1);
        } else {
          this.VenueQualificationInformationSave(data)
        }
      } else {
        let data = {
          siteUUID: siteUUID,
          lisenceURL: filesThreeSon,
          empowerURL:filesSixSon,
          legalname: faName,
          legalcard: value === 0 ? '' : faIdcard,
          legalphone: faPhone,
          legalBaseURL: value === 0 ? '' :filesFourSon===''?'':legalBaseURL,
          legalFilesURL: value === 0 ? '' :filesFourSon===''?'':filesFourSon + '|' + filesFiveSon,
          CorporateName: CorporateName,
          Settlement: value,
          Bankaccount: cardId,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中...', 1);
        } else {
          this.VenueQualifications(data)
        }
      }
    }else{
      Toast.fail('请完善基本信息', 1);
      this.props.history.push('/stadiumInformationPh')
    }
  }

  


  submit = () => {
    this.VenueVerifyThatAllAreFilledIn()
    
  }


  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack();
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1');
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  reture = () => {

    let { siteUUID, filesThreeSon, legalBaseURL, CorporateName, filesFourSon,filesSixSon, filesFiveSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, value, cardId, openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      lisenceURL: filesThreeSon,
      empowerURL:filesSixSon,
      legalname: faName,
      legalcard: faIdcard,
      legalphone: faPhone,
      legalBaseURL: value === 0 ? '' :filesFourSon===''?'':legalBaseURL,
      legalFilesURL: value === 0 ? '' :filesFourSon===''?'':filesFourSon + '|' + filesFiveSon,
      CorporateName: CorporateName,
      Settlement: value,
      Bankaccount: cardId,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
      flagDis: this.state.flagDis
    }

    localStorage.setItem('qualifData', JSON.stringify(data))
    this.props.history.push('/stadiumInformationPh')
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone') 
    } else {
      this.close()
    }
  }
  
  CorporateName = (e) => {
    if (this.state.flagDis === true && e.target.value === '') {
      localStorage.removeItem('qualifData')
      this.getVenueQualificationInformation()
    }
    if (e.target.value.indexOf(' ') !== -1) {
      this.setState({ CorporateName: e.target.value.slice(0, e.target.value.length - 1) })
    }else{
      this.setState({ CorporateName: e.target.value })
    }
  }



  async _code(data) {
    const res = await _code(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.lp()
    } else {
      Toast.fail(res.data.msg, 1);
      this.lp()
    }
  }
  async getVenueQualified(data) {
    const res = await getVenueQualified(data, localStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      Toast.success('获取成功', 1);
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        value: res.data.data.Settlement, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        filesSix: res.data.data.empowerURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.empowerURL }],
        filesSixSon: res.data.data.empowerURL === '' ? '' :res.data.data.empowerURL,
        flagDis: false
      })
    }
  }
  lok = (code) => {
    this.getVenueQualified({ CorporateName: this.state.CorporateName, code: code, phone: this.state.legePhone })
  }


  lp = () => {
    prompt('请输入验证码', '用户获取公司详细资质信息', [
      { text: '取消' },
      { text: '确定', onPress: code => this.lok(code) },
    ])
  }

  async getVenueQualifiedCompany(data) {
    const res = await getVenueQualifiedCompany(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      alert('是否获取该公司详细资质信息', '请注意查收' + res.data.data.phone + '的验证码', [
        { text: '否' },
        {
          text: '是', onPress: () => this._code({ mobile: res.data.data.phone, type: 'venuequalifiedcompany' })
        },
      ])

      this.setState({ legePhone: res.data.data.phone })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  search = () => {
    this.getVenueQualifiedCompany({ CorporateName: this.state.CorporateName })
  }




  async TemporaryQualificationInformation(data) {
    const res = await TemporaryQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let { siteUUID, filesThreeSon, legalBaseURL, CorporateName,filesSixSon, filesFourSon, filesFiveSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, value, cardId, openingLine } = this.state
      let data = {
        siteUUID: siteUUID,
        lisenceURL: filesThreeSon,
        empowerURL:filesSixSon,
        legalname: faName,
        legalcard: faIdcard,
        legalphone: faPhone,
        legalBaseURL: value === 0 ? '' :filesFourSon===''?'':legalBaseURL,
        legalFilesURL: value === 0 ? '' :filesFourSon===''?'':filesFourSon + '|' + filesFiveSon,
        CorporateName: CorporateName,
        Settlement: value,
        Bankaccount: cardId,
        OpeningBank: openingLine,
        Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
        ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
        CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
        flagDis: this.state.flagDis
      }

      localStorage.setItem('qualifData', JSON.stringify(data))
      this.getVenueQualificationInformation()
      Toast.success(res.data.msg, 1);
    }
  }
  save = () => {
    let { siteUUID, filesThreeSon, legalBaseURL, CorporateName,filesSixSon, filesFourSon, filesFiveSon, faIdcard, faName, bank_id, province_id, city_id, faPhone, value, cardId, openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      lisenceURL: filesThreeSon,
      empowerURL:filesSixSon,
      legalname: faName,
      legalcard: value === 0 ? '' : faIdcard,
      legalphone: faPhone,
      legalBaseURL: value === 0 ? '' :filesFourSon===''?'':legalBaseURL,
        legalFilesURL: value === 0 ? '' :filesFourSon===''?'':filesFourSon + '|' + filesFiveSon,
      CorporateName: CorporateName,
      Settlement: value,
      Bankaccount: cardId,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
    }

    if (this.state.loading === false) {
      Toast.loading('图片上传中...', 1);
    } else {
      this.TemporaryQualificationInformation(data)
    }


  }

  imgScale = (e) => {
    this.setState({ visibleTwo: true, src: e.target.src })
  }
  onClose = () => {
    this.setState({ visibleTwo: false })
  }
  modLine = () => {
    if (this.state.bank_id === '') {
      Toast.fail('请选择银行类型', 1);
    } else if (this.state.province_id === '') {
      Toast.fail('请选择银行所在省', 1);
    } else if (this.state.city_id === '') {
      Toast.fail('请选择银行所在市', 1);
    }
  }




  async UploadVenueImgsLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ filesThreeSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesThree: [], loading: true })
    } else {
      this.setState({ filesThree: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeOne = (files, type, index) => {
    this.setState({ filesThree: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
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
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesSix: [], loading: true })
    } else {
      this.setState({ filesSix: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeSix = (files, type, index) => {
    this.setState({ filesSix: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenSix(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
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
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesFour: [], loading: true })
    } else {
      this.setState({ filesFour: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeTwo = (files, type, index) => {
    this.setState({ filesFour: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
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
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesFive: [], loading: true })
    } else {
      this.setState({ filesFive: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }


  handleChangeThree = (files, type, index) => {
    this.setState({ filesFive: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwoT(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFiveSon: '', filesFourSon: '', filesFour: [] })
    }
  }

  previewing = (files, index) => {
    if(this.state.loading===false){
      Toast.loading('图片上传中', 1)
    }else{
      this.setState({imgMasking:index[files].url,masking:true})
    }
  }
  maskingF=()=>{
    this.setState({masking:false})
  }


  render() {

    const { filesThree, filesFour, filesFive, filesSix } = this.state;
    return (
      <div className="qualificationPh">
        <NavBar
          mode="dark"
          icon={<LeftOutlined onClick={this.reture} />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}

          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <EllipsisOutlined />
            </div>
          </Popover>}
        ><span style={{ fontSize: '1rem' }}>完善资质信息</span></NavBar>
        <div className="boss">

          <div className="input">
            <span>公司名称</span>
            <span className="lkpoji" style={{ float: 'right', color: '#fff' }} onClick={this.search}>查询</span>
            <Input className="select" onChange={this.CorporateName} style={{ width: '55%', float: 'right' }} value={this.state.CorporateName} placeholder="请输入公司名称" />

          </div>
          <div className="input" style={{ padding: '0.4rem 0' }}>
            <span style={{ lineHeight: '2rem', paddingRight: '0.5rem' }}>营业执照</span>
            <ImagePicker
              files={filesThree}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeOne}
              onImageClick={this.previewing}
              selectable={filesThree.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />
          </div>
          <div className="input" style={filesSix.length===0&&this.state.flagDis===true?{display:'none'}:{ padding: '0.4rem 0' }}>
            <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem' }}>授权书照<br/>(选填)</span>
            <ImagePicker
              files={filesSix}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeSix}
              onImageClick={this.previewing}
              selectable={filesSix.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />
          </div>


          <div className="input">
            <span>法人姓名</span>
            <Input className="select" disabled={this.state.flagDis} onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
          </div>


          <div className="input">
            <span>法人手机号</span>
            <Input className="select" disabled={this.state.flagDis} maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', padding: '2rem 0 0.5rem' }}>场馆收款银行信息<span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#9B9B9B' }}>(也可在提现前填写)</span></div>
          <div className="input" style={{ borderTop: '0.06rem solid #f3f3f3' }}>
            <span style={{ lineHeight: '6rem' }}>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChange} disabled={this.state.flagDis} value={this.state.value}>
              <Radio value={0}>公司账户</Radio><span style={{ fontSize: '12px' }}>(法人不是股东或有多个股东时只能选择公司银行账户结算)</span><br />
              <Radio value={1}>法人账户</Radio>
            </Radio.Group>
          </div>

          <div className="input" style={this.state.value === 0 ? { display: 'none' } : {}}>
            <span>法人身份证号</span>
            <Input className="select" style={{ width: '60%', float: 'left', marginLeft: '2.5%' }} disabled={this.state.flagDis} onChange={this.faIdcard} value={this.state.faIdcard} maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input" style={this.state.value === 0 ? { display: 'none' } : {}}  >
            <span style={{ lineHeight: '2rem' }}>法人身份证<br />(正面照)</span>
            <ImagePicker
              files={filesFour}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeTwo}
              onImageClick={this.previewing}
              selectable={filesFour.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />

          </div>

          <div className="input" style={this.state.value === 0 ? { display: 'none' } : {}}  >
            <span style={{ lineHeight: '2rem' }}>法人身份证<br />(反面照)</span>
            <ImagePicker
              files={filesFive}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeThree}
              onImageClick={this.previewing}
              selectable={filesFive.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />

          </div>


          <div className="input">
            <span>银行卡号</span>
            <Input className="select" maxLength={21} style={{ paddingLeft: '4.5%' }} disabled={this.state.flagDis} onChange={this.cardId} value={this.state.cardId} placeholder="请输入银行卡号" />
          </div>

          <div className="input">
            <Picker data={this.state.type} cols={1} onChange={this.typeChange} disabled={this.state.flagDis} value={[Number(this.state.bank_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>银行类型</List.Item>
            </Picker>
          </div>

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backProvince} cols={1} onChange={this.provinceChange} indicatorStyle={{ color: '#c0c0c0' }} disabled={this.state.flagDis} value={[Number(this.state.province_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在省</List.Item>
            </Picker>

          </div>

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backCity} cols={1} onChange={this.cityChange} disabled={this.state.flagDis} value={[Number(this.state.city_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在市</List.Item>
            </Picker>
          </div>




          <div className="input">
            <span>开户行</span>
            <Select
              showSearch
              style={{ width: '68%', height: '2.9rem', float: 'right', background: '#fff', fontSize: '0.75rem' }}
              onSearch={this.handleSearch}
              onChange={this.openingLine}
              onFocus={this.modLine}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              placeholder='请选择开户行'
              disabled={this.state.flagDis}
              value={this.state.openingLine === '' ? null : this.state.openingLine}
            >
              {
                this.state.backList.map((item, i) => (
                  <Option key={i} value={item.name} alt={item.name}>
                    <span style={{ fontSize: '0.75rem' }}>{item.nameT}</span>
                  </Option>
                ))
              }
            </Select>
          </div>


        


          <div className="footerBtn">
            <div style={this.state.flagDis === true ? { width: '49.5%' } : {}} onClick={this.reture}>上一步</div>
            <div style={this.state.flagDis === true ? { display: 'none' } : {}} onClick={this.save}>保存</div>
            <div style={this.state.flagDis === true ? { width: '49.5%' } : {}} onClick={this.submit}>提交</div>
          </div>



          <Modal
            visible={this.state.visibleTwo}
            transparent
            maskClosable={true}
            onClose={this.onClose}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}

          >
            <img style={{ width: '100%' }} src={this.state.src} alt="img" />
          </Modal>
        </div>


        <div className={this.state.masking===true?'masking':'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img"/>
        </div>

      </div>
    );
  }
}

export default qualificationPh;
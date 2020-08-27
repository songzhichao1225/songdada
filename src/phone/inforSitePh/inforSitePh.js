

import React from 'react';
import './inforSitePh.css';
import { Toast, Modal, TextareaItem, Picker, List, ImagePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Checkbox, Button, Radio, Select, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import lrz from 'lrz';
import { getVenueInformation, getVenueQualificationInformation, VenueInformationSave, UploadVenueImgs, VenueQualificationInformationSave, UploadVenueImgsLisenTwo, UploadVenueImgsLisen, getVenueIssecondaudit, getVenueOpenBank, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity, VenueReceivingBankInformation } from '../../api';
const { Option } = Select
const alert = Modal.alert;


function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class inforSitePh extends React.Component {

  state = {
    flag: 1,
    issecondaudit: 1,

    //场馆信息 参数
    listSon: [],
    imageUrl: '',
    cgName: '',
    address: '',
    linkMan: '',
    telephone: '',
    fileList: [],
    facilities: [],
    sport: [],
    siteInfo: '',
    comment: '',
    //资质信息 参数
    imageUrlTwo: '',
    imageUrlThree: '',
    corporateName: '',
    corporateId: '',
    corporatePhone: '',
    numRadio: 1,
    corporateCardId: '',
    flagOne: true,
    flagTwo: true,
    flagThree: true,
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    corporateOpen: '',
    zuo: 0,
    imgHoodTwo: '',
    imgHood: '',
    spin: true,
    onChangeCheckTwo: [],
    CorporateName: '',
    other: false,
    loading: true,
    files: [],
    filesSon: '',//门脸照
    filesTwo: [],
    filesTwoSon: '',//场地照
    num: 0,//计数
    filesThree: [],//营业执照
    filesThreeSon: '',
    filesFour: [],//身份证照
    filesFourSon: '',
    filesFive: [],
    filesFiveSon: '',
    empowerURL: '',
    empowerURLBos: [],
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    let arrImg = []
    if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length).split('|')
      for (let i in imgS) {
        arrImg.push({ url: imgS[i] })
      }

      if (this.props.history.location.query !== undefined) {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), files: [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.firstURL }], filesSon: res.data.data.firstURL,
          province: this.props.history.location.query.province, city: this.props.history.location.query.city, area: this.props.history.location.query.district,
          cgName: res.data.data.name, address: this.props.history.location.query.adddress, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          filesTwo: arrImg, filesTwoSon: res.data.data.filesURL, comment: res.data.data.siteInfo, lat: this.props.history.location.query.lat, lng: this.props.history.location.query.lng, position: this.props.history.location.query.title, spin: false
        })
      } else {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), files: [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.firstURL }], filesSon: res.data.data.firstURL,
          province: res.data.data.province, city: res.data.data.city, area: res.data.data.area,
          cgName: res.data.data.name, address: res.data.data.address, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          filesTwo: arrImg, filesTwoSon: res.data.data.filesURL, comment: res.data.data.siteInfo, lat: res.data.data.lat, lng: res.data.data.lng, position: res.data.data.position, spin: false
        })
      }

    } else {
      Toast.fail(res.data.msg, 1);

    }
  }


  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data, localStorage.getItem('venue_token'))
    this.setState({ issecondaudit: parseInt(res.data.data.issecondaudit), isbankcard: parseInt(res.data.data.isbankcard) })
  }


  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let corporate = res.data.data
      let cardImg = corporate.legalFilesURL.replace('|', ',').split(',')
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        legalBaseURL: corporate.legalBaseURL,
        filesFourSon: corporate.legalBaseURL === '' ? '' : corporate.legalFilesURL.split('|')[0],
        filesFiveSon: corporate.legalBaseURL === '' ? '' : corporate.legalFilesURL.split('|')[1],
        filesFour: corporate.legalBaseURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.legalBaseURL + corporate.legalFilesURL.split('|')[0] }],
        filesFive: corporate.legalBaseURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.legalBaseURL + corporate.legalFilesURL.split('|')[1] }],
        filesThreeSon: corporate.lisenceURL,
        filesThree: [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.lisenceURL }],
        baseImg: corporate.legalBaseURL,
        imgFile: corporate.legalBaseURL === '' ? '' : cardImg[0], imgFileTwo: corporate.legalBaseURL === '' ? '' : cardImg[1],
        corporateName: corporate.legalname, corporateId: corporate.legalcard, corporatePhone: corporate.legalphone,
        numRadio: corporate.Settlement, corporateCardId: corporate.Bankaccount, CorporateName: corporate.CorporateName, corporateOpen: corporate.OpeningBank,
        bank_id: corporate.Banktype, city_id: corporate.CityBank, province_id: corporate.ProvinceBank,
        empowerURLBos: corporate.empowerURL===''?[]:[{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.empowerURL }],
        empowerURL: corporate.empowerURL
      })
    }
  }


  componentDidMount() {
    this.getVenueInformation()
    this.getVenueQualificationInformation()
    this.getVenueIssecondaudit()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()


  }
  left = () => {
    this.setState({ flag: 1 })
  }
  right = () => {
    this.setState({ flag: 2 })
  }
  rightTwo = () => {
    this.setState({ flag: 3 })
  }

  async UploadVenueImgs(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      this.setState({ filesSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ files: [], loading: true })
    } else {
      this.setState({ files: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }

  }


  handleChange = (files, type, index) => {
    this.setState({ files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgs(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSon: '' })
    }


  }




  async UploadVenueImgsTwo(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      let resB = res.data.data.baseURL + res.data.data.filesURL
      this.setState({ filesTwoSon: this.state.filesTwoSon + '|' + resB, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      let ko = this.state.filesTwo
      ko.splice(this.state.num - 1, 1)
      this.setState({ filesTwo: ko, num: 0, loading: true })
    }
  }

  handleChangeT = (files, type, index) => {
    this.setState({ filesTwo: files })
    this.setState({ num: 0 })
    if (type === 'add') {
      if (files[files.length - 1].file.size / 1024 / 1024 < 7) {
        lrz(files[files.length - 1].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      let pok = this.state.filesTwoSon.slice(1, this.state.filesTwoSon.length).split('|')
      pok.splice(index, 1)
      this.setState({ filesTwoSon: pok.length === 0 ? '' : '|' + pok.join('|') })
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




  onChangeSite = e => {
    this.setState({ facilities: e })
  }

  onChangeCheck = e => {
    this.setState({ sport: e })
    console.log(e)
  }





  //场馆信息修改获取
  cgName = e => {
    this.setState({ cgName: e.target.value })
  }
  address = e => {
    this.setState({ address: e })
  }
  linkMan = e => {
    this.setState({ linkMan: e.target.value })
  }
  telephone = e => {
    this.setState({ telephone: e.target.value })
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }





  siteInfo = e => {
    this.setState({ siteInfo: e.target.value })
  }
  comment = e => {
    this.setState({ comment: e.target.value })
  }

  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.getVenueIssecondaudit()
      this.setState({ other: res.data.other })
      this.getVenueInformation()
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  confirm = () => {
    let { cgName, address, linkMan, telephone, filesTwoSon, filesSon, sport, facilities, comment, lat, lng, position, province, city, area } = this.state
    if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length > 1) {
      let data = {
        venuename: cgName,
        province: province,
        city: city,
        area: area,
        lat: lat,
        lng: lng,
        address: address,
        linkMan: linkMan,
        telephone: telephone,
        firstURL: filesSon,
        filesURL: filesTwoSon,
        facilities: facilities.join(','),
        sport: sport.join(','),
        siteInfo: comment,
        position: position,
        comment: comment,
        sporttype: '',
        type: 2
      }

      if (this.state.loading === false) {
        Toast.loading('图片上传中', 1);
      } else {
        this.props.history.location.query=undefined
        this.VenueInformationSave(data)
      }
    } else {
      Toast.fail('至少上传两张场地照', 1);
    }
  }

  // 资质信息修改 获取 




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

  corporateName = e => {
    this.setState({ corporateName: e.target.value })
  }
  corporateId = e => {
    this.setState({ corporateId: e.target.value })
  }
  corporatePhone = e => {
    this.setState({ corporatePhone: e.target.value })
  }

  numRadio = e => {
    this.setState({ numRadio: e.target.value, corporateCardId: '', corporateOpen: '' })
    if (e.target.value === 1) {
      this.setState({ bank_id: '', province_id: '', city_id: '' })
    }
  }

  corporateCardId = e => {
    this.setState({ corporateCardId: e.target.value })
  }
  CorporateName = e => {
    this.setState({ CorporateName: e.target.value })
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
      this.setState({ backList: res.data.data })
    }
  }




  typeChange = e => {
    this.setState({ bank_id: e, corporateOpen: '', backList: [] })
  }
  cityChange = e => {
    this.setState({ city_id: e, corporateOpen: '', backList: [] })
  }
  provinceChange = e => {
    this.setState({ province_id: e, corporateOpen: '', backList: [] })
    this.getVenueOpenBankCity({ province_id: e })
  }

  handleSearch = e => {
    if (this.state.bank_id === '') {
      Toast.fail('请选择银行类型', 1.5)
    } else if (this.state.province_id === '') {
      Toast.fail('请选择银行所在省', 1.5)
    } else if (this.state.city_id === '') {
      Toast.fail('请选择银行所在市', 1.5)
    } else {
      if(typeof(this.state.bank_id) !== 'string'){
        this.getVenueOpenBankList({ bank_id: this.state.bank_id.join(), province_id: this.state.province_id.join(), city_id: this.state.city_id.join(), search_name: e })
      }else{
        this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
      }
     
    }
  }

  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }

  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.getVenueIssecondaudit()
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  ziSubmit = () => {
    let { zuo, imgHoodTwo, imgHood, filesThreeSon, corporateName, empowerURL, corporatePhone, CorporateName } = this.state
    let data = {
      legalname: corporateName,
      legalcard: '',
      legalphone: corporatePhone,
      Settlement: 0,
      Bankaccount: '',
      OpeningBank: '',
      lisenceURL: filesThreeSon,
      legalBaseURL: '',
      legalFilesURL: '',
      CorporateName: CorporateName,
      Banktype: '',
      ProvinceBank: '',
      CityBank: '',
      empowerURL: empowerURL,
      type: 2

    }
    if (zuo === 1) {
      if (imgHood === '') {
        Toast.fail('请更换身份证正面照', 1);

      } else if (imgHoodTwo === '') {
        Toast.fail('请更换身份证反面照', 1);
      } else {
        data.legalBaseURL = imgHood
        if (this.state.loading === false) {
          Toast.loading('图片上传中', 1);
        } else {
          this.VenueQualificationInformationSave(data)
        }
      }
    } else {
      if (this.state.loading === false) {
        Toast.loading('图片上传中', 1);
      } else {
        this.VenueQualificationInformationSave(data)
      }
    }
  }
  reture = () => {
    this.props.history.replace('/homePh/minePh')
  }

  mapPh = (e) => {
    this.props.history.push('/mapPh')
    sessionStorage.setItem('inforMap', e.currentTarget.dataset.position)
  }
  onClose = () => {
    this.setState({ previewVisible: false })
  }


  async VenueReceivingBankInformation(data) {
    const res = await VenueReceivingBankInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.getVenueIssecondaudit()
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }


  ziSubmitTwo = () => {
    let { numRadio, filesFourSon, corporateId, legalBaseURL, filesFiveSon, corporateCardId, corporateOpen, bank_id, province_id, city_id } = this.state
    let data = {
      legalcard: numRadio === 0 ? '' : corporateId,
      legalBaseURL: numRadio === 0 ? '' : legalBaseURL,
      legalFilesURL: numRadio === 0 ? '' : filesFourSon + '|' + filesFiveSon,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
    }

    if (this.state.loading === false) {
      Toast.loading('图片上传中', 1);
    } else {
      this.VenueReceivingBankInformation(data)
    }
  }


  async UploadVenueImgsLisenAuthor(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ empowerURL: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ empowerURLBos: [], loading: true })
    } else {
      this.setState({ empowerURLBos: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }



  authorizations = (files, type, index) => {
    this.setState({ empowerURLBos: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenAuthor(formdata1)
          })
      } else {
        Toast.fail('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ empowerURL: '' })
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
    let { listSon } = this.state
    const options = [
      { label: '羽毛球', value: '1' },
      { label: '乒乓球', value: '2' },
      { label: '台球中式黑八', value: '3' },
      { label: '台球美式九球', value: '4' },
      { label: '台球斯诺克', value: '5' },
      { label: '篮球', value: '6' },
      { label: '足球11人制', value: '7' },
      { label: '足球8人制', value: '8' },
      { label: '足球7人制', value: '9' },
      { label: '足球5人制', value: '10' },
      { label: '排球', value: '11' },
      { label: '网球', value: '12' }
    ]



    const optionsTwo = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' },]

    const { files, filesTwo, filesFour, filesThree, filesFive, empowerURLBos } = this.state


    return (
      <div className="inforSitePh">
        <div className="nav">
          <LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px', fontSize: '1rem' }} />
          <div className="left">场馆信息</div>
        </div>
        <div style={localStorage.getItem('ismethod') === '0' ? {} : { display: 'none' }}>
          <div className="topDiv" style={this.state.flag === 1 ? { color: '#fff', background: '#F5A623' } : {}} onClick={this.left}>基本信息</div>

        </div>

        <div style={localStorage.getItem('ismethod') === '1' ? {} : { display: 'none' }}>
          <div className="topDiv" style={this.state.flag === 1 ? { color: '#fff', background: '#F5A623' } : {}} onClick={this.left}>基本信息</div>
          <div className="topDiv" style={this.state.flag === 2 ? { color: '#fff', background: '#F5A623' } : {}} onClick={this.right}>资质信息</div>
          <div className="topDiv" style={this.state.flag === 3 ? { color: '#fff', background: '#F5A623' } : {}} onClick={this.rightTwo}>收款银行信息</div>
        </div>

        <div className="line"></div>
        <div className="basic" style={this.state.spin === false && this.state.flag === 1 ? { display: 'block', overflow: 'scroll', height: '92%' } : { display: 'none' }}>
          <div className="listSon">
            <span>推广员</span>
            <span className="right" style={{ paddingLeft: '11px' }}>{listSon.promote === '' ? '无' : listSon.promote}</span>
          </div>
          <div className="listSon">
            <span>场馆名称</span>
            <Input className="right" value={this.state.cgName} onChange={this.cgName} />
          </div>
          <div className="listSon" onClick={this.mapPh} data-position={listSon.position}>
            <span style={{ float: 'left' }}>场馆位置</span>
            <img style={{ float: 'right', width: '0.85rem', marginTop: '0.9rem' }} src={require('../../assets/icon_pc_dingwei.png')} alt="icon" />
            <Input className="right" style={{ width: '76%' }} value={this.state.position} disabled={true} />
          </div>
          <div className="listSon">
            <TextareaItem
              title="详细地址"
              placeholder="click the button below to focus"
              value={this.state.address}
              onChange={this.address}
              style={{ minHeight: '2rem', fontSize: '0.75rem', color: '#333' }}
              className="textItem"
              autoHeight
            />
          </div>

          <div className="listSon">
            <span>联系人</span>
            <Input className="right" value={this.state.linkMan} placeholder='联系人姓名' onChange={this.linkMan} />
          </div>
          <div className="listSon">
            <span>联系电话</span>
            <Input className="right" value={this.state.telephone} placeholder="联系人电话" onChange={this.telephone} />
          </div>
          <div className="listSon">
            <span>门脸照</span>

            <ImagePicker
              files={files}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChange}
              selectable={files.length < 1}
              length={3}
              onImageClick={this.previewing}
              multiple={false}
            />


          </div>
          <div className="listSon">
            <span>场地照片</span>
            <ImagePicker
              files={filesTwo.slice(0, 8)}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChangeT}
              onImageClick={this.previewing}
              selectable={filesTwo.length < 8}
              length={3}
              multiple={false}
            />
          </div>
          <div className="listSon">
            <span>场地设施</span>
            <div className="rightLi">
              <Checkbox.Group options={optionsTwo} value={this.state.facilities} onChange={this.onChangeSite} />
            </div>
          </div>



          <div className="listSon">
            <span>场地类型</span>
            <div className="rightLi kop">
              <Checkbox.Group options={options} value={this.state.sport} onChange={this.onChangeCheck} />
            </div>
          </div>


          <div className="listSon">
            <span>场馆介绍</span>
            <Input className="right" value={this.state.comment} placeholder='场馆介绍如：比赛等' onChange={this.comment} />
          </div>



          <Button className="submit" onClick={() =>
            alert('提示', '您确定本次修改吗?', [
              { text: '取消', onPress: () => console.log('cancel') },
              {
                text: '确定',
                onPress: () =>
                  this.confirm()
              },
            ])
          } style={this.state.issecondaudit === 1 || this.state.issecondaudit === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>

          <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>



        <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
        <div className="qualification" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>公司名称</span>
            <Input className="right" value={this.state.CorporateName} placeholder="请输入公司名称" onChange={this.CorporateName} />
          </div>
          <div className="listSon">
            <span>营业执照</span>
            <ImagePicker
              files={filesThree}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChangeOne}
              onImageClick={this.previewing}
              selectable={filesThree.length < 1}
              length={3}
              multiple={false}
            />
          </div>

          <div className="listSon">
            <span>授权书照</span>
            <ImagePicker
              files={empowerURLBos}
              style={{ float: 'right', width: '80%' }}
              onChange={this.authorizations}
              onImageClick={this.previewing}
              selectable={empowerURLBos.length < 1}
              length={3}
              multiple={false}
            />
          </div>



          <div className="listSon">
            <span>法人姓名</span>
            <Input className="right" value={this.state.corporateName} placeholder="请输入法人姓名" onChange={this.corporateName} />
          </div>



          <div className="listSon">
            <span>法人手机号</span>
            <Input className="right" value={this.state.corporatePhone} placeholder="请输入法人手机号" onChange={this.corporatePhone} />
          </div>

          <Button className="submit" onClick={() =>
            alert('提示', '您确定本次修改吗?', [
              { text: '取消', onPress: () => console.log('cancel') },
              {
                text: '确定',
                onPress: () =>
                  this.ziSubmit()
              },
            ])
          } style={this.state.issecondaudit === 1 || this.state.issecondaudit === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>

          <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>



        <div className="qualification" style={this.state.flag === 3 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span style={{ float: 'left' }}>结算账号:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '10%' }} onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司账号</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>
          <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span>法人身份证号</span>
            <Input className="right" style={{ width: '60%', paddingLeft: '0.5rem', marginRight: '19%' }} maxLength={18} placeholder="请输入法人身份证号" value={this.state.corporateId} onChange={this.corporateId} />
          </div>
          <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span>身份证</span>
            <ImagePicker
              files={filesFour}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChangeTwo}
              onImageClick={this.previewing}
              selectable={filesFour.length < 1}
              length={3}
              multiple={false}
            />

            <ImagePicker
              files={filesFive}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChangeThree}
              onImageClick={this.previewing}
              selectable={filesFive.length < 1}
              length={3}
              multiple={false}
            />


          </div>




          <div className="listSon">
            <span>银行账号</span>
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
            <span>开户行</span>
            <Select
              showSearch
              className="right"
              style={{ height: '32px', lineHeight: '32px', width: '79%', float: 'right', }}
              onSearch={this.handleSearch}
              onChange={this.corporateOpen}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              placeholder="请输入银行关键字"
              value={this.state.corporateOpen === '' ? null : this.state.corporateOpen}
            >
              {
                this.state.backList.map((item, i) => (
                  <Option key={i} value={item.sub_branch_name} alt={item.sub_branch_name}>
                    <span>{item.sub_branch_name}</span>
                  </Option>
                ))
              }
            </Select>
          </div>


          <Button className="submit" onClick={() =>
            alert('提示', '您确定本次修改吗?', [
              { text: '取消', onPress: () => console.log('cancel') },
              {
                text: '确定',
                onPress: () =>
                  this.ziSubmitTwo()
              }
            ])
          } style={this.state.isbankcard === 1 || this.state.isbankcard === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>

          <Button className="submit" style={this.state.isbankcard === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>





        <Modal
          visible={this.state.previewVisible}
          transparent
          onClose={this.onClose}
        >
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>

        <div className={this.state.masking===true?'masking':'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img"/>
        </div>

      </div>
    )
  }
}

export default inforSitePh;


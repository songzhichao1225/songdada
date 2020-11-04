

import React from 'react';
import './inforSitePh.css';
import { Toast, Modal, TextareaItem, Picker, List, ImagePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Checkbox, Button, Radio, Select, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import lrz from 'lrz';
import { getVenueInformation, getVenueQualificationInformation, VenueInformationSave, UploadVenueImgs,imgUrlTwo, VenueQualificationInformationSave_another, UploadVenueImgsLisenTwo, UploadVenueImgsLisen, getVenueIssecondaudit, getVenueOpenBank, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity, VenueReceivingBankInformation } from '../../api';
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
    CorporateName: '',
    faIdcard: '',
    corporatePhone: '',
    numRadio: 1,
    numRadioFive:0,
    inCorName:'',//公司名称
    inChargeNa:'',//负责人姓名
    corporateId:'',//收款身份证号
    cardId: '',
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
    openingLine: '',
    zuo: 0,
    imgHoodTwo: '',
    imgHood: '',
    spin: true,
    onChangeCheckTwo: [],
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
    ascription: 0,
    BelongingOne: [],
    BelongingOneSon: '',
    BelongingTwo: [],
    BelongingTwoSon: '',
    BelongingThree: [],
    BelongingThreeSon: '',
    BelongingFour: [],
    BelongingFourSon: '',
    BelongingFive: [],
    BelongingFiveSon: '',
    BelongingSix: [],
    BelongingSixSon: '',
    ascrBaceUrl:'',
    legalhourBaseURL:'',
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    let arrImg = []
    if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length).split('|')
      for (let i in imgS) {
        arrImg.push({ url: imgUrlTwo+imgS[i] })
      }

      if (this.props.history.location.query !== undefined) {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','),
          files: [{ url:imgUrlTwo+res.data.data.firstURL }], filesSon: res.data.data.firstURL,
          province: this.props.history.location.query.province, city: this.props.history.location.query.city, area: this.props.history.location.query.district,
          cgName: res.data.data.name, address: this.props.history.location.query.adddress, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          filesTwo: arrImg, filesTwoSon: res.data.data.filesURL, comment: res.data.data.siteInfo, lat: this.props.history.location.query.lat, lng: this.props.history.location.query.lng, position: this.props.history.location.query.title, spin: false
        })
      } else {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), files: [{ url:imgUrlTwo+res.data.data.firstURL }], filesSon: res.data.data.firstURL,
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
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        numRadio: res.data.data.Settlement,numRadioFive:res.data.data.account,inChargeNa:res.data.data.Bankname,inCorName:res.data.data.Bankcorporate, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,corporateId:res.data.data.Bankcard,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url:imgUrlTwo+res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        BelongingFourSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
        BelongingFour: res.data.data.empowerURL === '' ? [] : [{ url:imgUrlTwo+res.data.data.empowerURL }],
        BelongingOneSon: res.data.data.promiseURL === '' ? '' : res.data.data.promiseURL,
        BelongingOne: res.data.data.promiseURL === '' ? [] : [{ url:imgUrlTwo+res.data.data.promiseURL }],
        ascrBaceUrl: res.data.data.ascriphourBaseURL,
        BelongingTwo: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[0] }],
        BelongingTwoSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[0],
        BelongingThree: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[1] }],
        BelongingThreeSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[1],
        legalhourBaseURL: res.data.data.legalhourBaseURL,
        BelongingFive: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[0] }],
        BelongingFiveSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[0],
        BelongingSix: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url:imgUrlTwo+res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[1] }],
        BelongingSixSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[1],
        value: res.data.data.ascription,
        valueTwo: res.data.data.personIncharge,
        valueThree:res.data.data.verification
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
      if (files[0].file.name.indexOf('gif') === -1) {
        if (files[0].file.size / 1024 / 1024 < 9) {
          lrz(files[0].url, { quality: 0.5 })
            .then((rst) => {
              this.setState({ loading: false })
              let formdata1 = new FormData()
              formdata1.append('files', rst.file);
              this.UploadVenueImgs(formdata1)
            })
        } else {
          Toast.fail('图片超过9M无法上传', 2)
        }

      } else {
        this.setState({ files: [] })
        Toast.fail('请上传png/jpg/jpeg类型图片', 2)
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
      if (files[files.length - 1].file.size / 1024 / 1024 < 9) {
        lrz(files[files.length - 1].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
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
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
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
        this.props.history.location.query = undefined
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
      this.setState({ filesFiveSon: '', filesFourSon: '', filesFour: [] })
    }
  }


  corporateId = e => {
    this.setState({ faIdcard: e.target.value })
  }
  corporatePhone = e => {
    this.setState({ corporatePhone: e.target.value })
  }

  numRadio = e => {
    this.setState({ numRadio: e.target.value, cardId: '', openingLine: '' })
    if (e.target.value === 1) {
      this.setState({ bank_id: '', province_id: '', city_id: '' })
    }
  }

  numRadioFive = e => {
    this.setState({ numRadioFive: e.target.value,numRadio:e.target.value, cardId: '', openingLine: '' })
    if (e.target.value === 1) {
      this.setState({ bank_id: '', province_id: '', city_id: '' })
    }
  }
  corporateId=e=>{
    this.setState({corporateId:e.target.value})
  }
  inChargeNa=e=>{
    this.setState({inChargeNa:e.target.value})
  }

  inCorName=e=>{
    this.setState({inCorName:e.target.value})
  }

  corporateCardId = e => {
    this.setState({ cardId: e.target.value })
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




  typeChange = e => {
    this.setState({ bank_id: e, openingLine: '', backList: [] })
  }
  cityChange = e => {
    this.setState({ city_id: e, openingLine: '', backList: [] })
  }
  provinceChange = e => {
    this.setState({ province_id: e, openingLine: '', backList: [] })
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
      if (typeof (this.state.bank_id) !== 'string') {
        this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
      } else {
        this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
      }

    }
  }

  corporateOpen = e => {
    this.setState({ openingLine: e })
  }

  async VenueQualificationInformationSave_another(data) {
    const res = await VenueQualificationInformationSave_another(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.getVenueIssecondaudit()
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  ziSubmit = () => {
    let { zuo,value,valueTwo,valueThree,BelongingTwoSon,BelongingThreeSon,BelongingOneSon,BelongingFourSon,faName,faPhone,faIdcard,legalhourBaseURL,BelongingFiveSon,BelongingSixSon, imgHood,ascrBaceUrl, filesThreeSon, CorporateName } = this.state
    let data = {
      ascription:value,
      CorporateName: value === 1 ? '' : CorporateName,
      lisenceURL: value === 1 ? '' : filesThreeSon,
      promiseURL: value === 1 ? BelongingOneSon : '',
      ascriphourBaseURL: value === 1 && ascrBaceUrl !== '' ? ascrBaceUrl : '',
      ascriphourFilesURL: value === 1 && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
      personIncharge:valueTwo,
      empowerURL:valueTwo === 1 && valueTwo === 2 ? '' : BelongingFourSon,
      verification:valueThree,
      legalname:faName,
      legalphone:faPhone,
      legalcard:faIdcard,
      legalhourBaseURL:legalhourBaseURL,
      legalhourFilesURL: this.state.valueThree === 3 ? BelongingFiveSon + '|' + BelongingSixSon : '',
      Settlement:value,
      Bankaccount: '',
      OpeningBank: '',
      legalBaseURL: '',
      legalFilesURL: '',
      Banktype: '',
      ProvinceBank: '',
      CityBank: '',
      type: 2

    }
    if (zuo === 1) {
     
        data.legalBaseURL = imgHood
        if (this.state.loading === false) {
          Toast.loading('图片上传中', 1);
        } else {
         
            this.VenueQualificationInformationSave_another(data)
          
        }
      
    } else {
      if (this.state.loading === false) {
        Toast.loading('图片上传中', 1);
      } else {
       
          this.VenueQualificationInformationSave_another(data)
        
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
    let { numRadio, numRadioFive,inCorName,inChargeNa, filesFourSon, corporateId, legalBaseURL, filesFiveSon, cardId, openingLine, bank_id, province_id, city_id } = this.state
    let data = {
      Bankcard: numRadio === 0 ? '' : corporateId,
      legalBaseURL: numRadioFive === 1 ? legalBaseURL : numRadio === 1 ? legalBaseURL : '',
      legalFilesURL: numRadioFive === 1 ? filesFourSon + '|' + filesFiveSon : numRadio === 1 ? filesFourSon + '|' + filesFiveSon : '',
      Settlement: numRadio,
      Bankcorporate:numRadio===0?inCorName:'',
      Bankaccount: cardId,
      Bankname:numRadio === 0?'':inChargeNa,
      OpeningBank: openingLine,
      account: numRadioFive,
      Banktype: typeof (bank_id) !== 'string' ? bank_id : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id : city_id,
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
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenAuthor(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ empowerURL: '' })
    }
  }


  previewing = (files, index) => {
    if (this.state.loading === false) {
      Toast.loading('图片上传中', 1)
    } else {
      this.setState({ imgMasking: index[files].url, masking: true })
    }
  }
  maskingF = () => {
    this.setState({ masking: false })
  }

  async BelongingOneLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingOneSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingOne: [], loading: true })
    } else {
      this.setState({ BelongingOne: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingOneSon: '' })
    }
  }

  async BelongingTwoLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingTwoSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingTwo: [], loading: true })
    } else {
      this.setState({ BelongingTwo: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingTwoSon: '', BelongingThree: [], BelongingThreeSon: '' })
    }
  }


  async BelongingThreeLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingThreeSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingThree: [], loading: true })
    } else {
      this.setState({ BelongingThree: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingThreeSon: '', BelongingTwo: [], BelongingTwoSon: '' })
    }
  }

  async BelongingFourLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFourSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingFour: [], loading: true })
    } else {
      this.setState({ BelongingFour: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFourSon: '' })
    }
  }
  faName = e => {
    this.setState({ faName: e.target.value })
  }
  faPhone = e => {
    this.setState({ faPhone: e.target.value })
  }
  faIdcard = e => {
    this.setState({ faIdcard: e.target.value })
  }
  numRadioTwo = e => {
    if (e.target.value === 0) {
      this.setState({ valueTwo: 1 })
    }else{
      this.setState({ valueTwo: 2 })
    }
    this.setState({ value: e.target.value })
  }
  numRadioThree = e => {
    this.setState({ valueTwo: e.target.value })
  }
  numRadioFour=e=>{
    this.setState({valueThree:e.target.value})
  }
  async BelongingFiveLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFiveSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingFive: [], loading: true })
    } else {
      this.setState({ BelongingFive: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFiveSon: '', BelongingSix: [], BelongingSixSon: '' })
    }
  }


  async BelongingSixLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingSixSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingSix: [], loading: true })
    } else {
      this.setState({ BelongingSix: [], loading: true })
      Toast.fail(res.data.msg, 2)
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
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingSixSon: '', BelongingFive: [], BelongingFiveSon: '' })
    }
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

    const { files, filesTwo, filesFour, filesThree, filesFive, BelongingFour, BelongingOne, BelongingThree, BelongingTwo, BelongingFive, BelongingSix } = this.state


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
            <span>推广专员</span>
            <span className="right" style={{ paddingLeft: '11px' }}>{listSon.extenpromote === '' ? '无' : listSon.extenpromote}</span>
          </div>
          <div className="listSon">
            <span>运营专员</span>
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
              style={{ minHeight: '2rem', fontSize: '0.75rem', color: '#333',padding:'0' }}
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
              files={filesTwo}
              style={{ float: 'right', width: '80%' }}
              onChange={this.handleChangeT}
              onImageClick={this.previewing}
              selectable={filesTwo.length < 20}
              length={3}
              multiple={false}
            />
          </div>
          <div className="listSon">
            <span>场馆设施</span>
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
          <Button className="submit" onTouchStart={() =>
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
        <div className="qualification" style={this.state.flag === 2 ? { display: 'block', height: '90%' } : { display: 'none' }}>

          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>场馆归属证明</div>
          <div style={{ width: '100%', height: '2.5rem' }}> </div>
          <Radio.Group style={{ clear: 'both', fontSize: '0.75rem', marginLeft: '2.5%', marginBottom: '1rem', overflow: 'hidden' }} onChange={this.numRadioTwo} value={this.state.value}>
            <Radio value={0}>公司</Radio>
            <Radio value={1}>个人</Radio>
          </Radio.Group>


          <div style={this.state.value === 0 ? {} : { display: 'none' }}>
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
          </div>

          <div style={this.state.value === 1 ? {} : { display: 'none' }}>

            <div className="listSon">
              <span>承诺书照</span>
              <ImagePicker
                files={BelongingOne}
                style={{ float: 'right', width: '80%' }}
                onChange={this.BelongingOne}
                onImageClick={this.previewing}
                selectable={BelongingOne.length < 1}
                length={3}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>

            <div className="listSon">
              <span style={{ float: 'left' }}>手持身份证照</span>
              <ImagePicker
                files={BelongingTwo}
                style={{ float: 'left', width: '28%', marginLeft: '0.2rem' }}
                onChange={this.BelongingTwo}
                onImageClick={this.previewing}
                selectable={BelongingTwo.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={BelongingThree}
                style={{ float: 'left', width: '28%' }}
                onChange={this.BelongingThree}
                onImageClick={this.previewing}
                selectable={BelongingThree.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>
          </div>


          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>场馆负责人</div>
          <div style={{ width: '100%', height: '2.5rem' }}> </div>
          <Radio.Group style={{ clear: 'both', fontSize: '0.75rem', marginLeft: '2.5%', marginBottom: '1rem', overflow: 'hidden' }} onChange={this.numRadioThree} value={this.state.valueTwo}>
            <Radio style={this.state.value === 0 ? {} : { display: 'none' }} value={1}>法人</Radio>
            <Radio style={this.state.value === 1 ? {} : { display: 'none' }} value={2}>承诺人本人</Radio>
            <Radio value={3}>代理人</Radio>
          </Radio.Group>
          <div style={{ clear: 'both' }}>
            <div className="listSon" style={this.state.valueTwo === 1||this.state.valueTwo === 2 ? { display: 'none' } : {}}>
              <span>授权书照</span>
              <ImagePicker
                files={BelongingFour}
                style={{ float: 'right', width: '78%' }}
                onChange={this.BelongingFour}
                onImageClick={this.previewing}
                selectable={BelongingFour.length < 1}
                length={3}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>负责人验证方式</div>
          <div style={{ width: '100%', height: '2.5rem' }}> </div>
          <Radio.Group style={{ clear: 'both', fontSize: '0.75rem', marginLeft: '2.5%', marginBottom: '1rem', overflow: 'hidden' }} onChange={this.numRadioFour} value={this.state.valueThree}>
            <Radio value={1}>姓名、手机号</Radio>
            <Radio value={2}>姓名、手机号、身份证号</Radio>
            <Radio value={3}>姓名、手机号、手持身份证照</Radio>
          </Radio.Group>


          <div>
            <div className="listSon">
              <span>姓名</span>
              <Input className="right" value={this.state.faName} placeholder="请输入法人姓名" onChange={this.faName} />
            </div>

            <div className="listSon">
              <span>手机号</span>
              <Input className="right" value={this.state.faPhone} placeholder="请输入法人手机号" onChange={this.faPhone} />
            </div>
            <div className="listSon" style={this.state.valueThree === 2 ? {} : {display: 'none'}}>
              <span>身份证号</span>
              <Input className="right" onChange={this.faIdcard} value={this.state.faIdcard} placeholder="请输入身份证号" />
            </div>

            <div className="listSon" style={this.state.valueThree === 3 ? {} : {display: 'none'}}>
              <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem', float: 'left' }}>手持身份证照</span>
              <ImagePicker
                files={BelongingFive}
                style={{ float: 'left', width: '28%', marginLeft: '0' }}
                onChange={this.BelongingFive}
                onImageClick={this.previewing}
                selectable={BelongingFive.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={BelongingSix}
                style={{ float: 'left', width: '28%' }}
                onChange={this.BelongingSix}
                onImageClick={this.previewing}
                selectable={BelongingSix.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>
          </div>
          <Button className="submit" onTouchStart={() =>
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














        <div className="qualification" style={this.state.flag === 3 ? { display: 'block', height: '90%' } : { display: 'none' }}>


        <div className="listSon">
            <span style={{ float: 'left' }}>结算账号:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '10%' }} onChange={this.numRadioFive} value={this.state.numRadioFive}>
              <Radio value={0}>场馆归属人</Radio>
              <Radio value={1}>场馆负责人</Radio>
            </Radio.Group>
          </div>


          <div className="listSon" style={this.state.numRadioFive===1?{display:'none'}:{}}>
            <span style={{ float: 'left' }}>归属人性质:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '7%' }} onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司</Radio>
              <Radio value={1}>个人</Radio>
            </Radio.Group>
          </div>

          <div className="listSon" style={this.state.numRadio === 1 ? { display: 'none' } : {}}>
            <span style={{ float: 'left' }}>公司名称</span>
            <Input className="right" style={{ width: '80%', paddingLeft: '0.5rem', float: 'right' }} maxLength={18} placeholder="请输入公司名称" value={this.state.inCorName} onChange={this.inCorName} />
          </div>

          <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span style={{ float: 'left' }}>负责人姓名</span>
            <Input className="right" style={{ width: '80%', paddingLeft: '0.5rem', float: 'right' }} maxLength={18} placeholder="请输入负责人姓名" value={this.state.inChargeNa} onChange={this.inChargeNa} />
          </div>

         


          <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span style={{ float: 'left' }}>负责人身份证号</span>
            <Input className="right" style={{ width: '75%', paddingLeft: '0.5rem', float: 'right' }} maxLength={18} placeholder="请输入法人身份证号" value={this.state.corporateId} onChange={this.corporateId} />
          </div>

          <div className="listSon" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
            <span style={{ float: 'left' }}>身份证照</span>
            <ImagePicker
              files={filesFour}
              style={{ float: 'left', width: '30%', marginLeft: "8%" }}
              onChange={this.handleChangeTwo}
              onImageClick={this.previewing}
              selectable={filesFour.length < 1}
              length={1}
              multiple={false}
            />

            <ImagePicker
              files={filesFive}
              style={{ float: 'left', width: '30%' }}
              onChange={this.handleChangeThree}
              onImageClick={this.previewing}
              selectable={filesFive.length < 1}
              length={1}
              multiple={false}
            />
          </div>
          <div className="listSon">
            <span>银行账号</span>
            <Input className="right" value={this.state.cardId} placeholder="请输入银行账号" onChange={this.corporateCardId} />
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
              value={this.state.openingLine === '' ? null : this.state.openingLine}
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


          <Button className="submit" onTouchStart={() =>
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

        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>

      </div>
    )
  }
}

export default inforSitePh;


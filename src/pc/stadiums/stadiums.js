import React from 'react';
import './stadiums.css';
import 'antd/dist/antd.css';
import { getVenueInformation, VenueInformationSave, getVenueIssecondaudit, getVenueQualificationInformation, getVenueOpenBank, UploadVenueImgsLisenTwo, UploadVenueImgsLisen, VenueReceivingBankInformation, UploadVenueImgs, getVenueSportList, VenueQualificationInformationSave, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity } from '../../api';
import { Input, message, Checkbox, Button, Popconfirm, Radio, Select, Spin } from 'antd';
import { ImagePicker } from 'antd-mobile';
import lrz from 'lrz';
const { Option } = Select;
const { TextArea } = Input;




const options = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' },]


function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}





class stadiums extends React.Component {

  state = {
    informationList: [],
    fileList: [],
    name: '',
    handleAddress: '',
    contacts: '',
    contactNumber: '',
    addtelephone: '',//新增电话
    adddress: '',//场馆位置
    imageUrlOneY: '',
    sport: [],
    facilities: [],
    siteInfo: '',
    comment: '',
    flag: true,
    issecondaudit: 1,
    imageUrlBase: '',//身份证公共路径
    imageUrlTwo: '',//身份证正面照
    imageUrlThree: '',//身份证反面照
    corporateName: '',//法人姓名
    corporateId: '',//法人身份证号
    corporatePhone: '',//法人手机号
    numRadio: 1,//账号类型
    corporateCardId: '',//法人银行卡号
    corporateOpen: '',//开户行
    imgFile: '',
    imgFileTwo: '',
    imagesBasellFe: '',
    imagesBasellFeTwo: '',
    baseImg: '',
    imgHood: '',
    imgHoodTwo: '',
    zuo: 0,

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
    CorporateName: '',
    spinning: true,
    province: '',
    city: '',
    area: '',
    plainOptions: [],
    other: false,
    isbankcard: 0,
    loading: true,
    files: [],
    filesSon: '',
    filesTwo: [],
    filesTwoSon: '',
    filesThreeSon: '',
    filesThree: [],
    empowerURLBos: [],
    empowerURL: '',
    filesFour: [],
    filesFourSon: '',
    filesFive: [],
    filesFiveSon: '',
    imgMasking: '',
    masking: false,
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrImg = []
      let imgS = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length).split('|')
      for (let i in imgS) {
        arrImg.push({ url: imgS[i] })
      }
      localStorage.setItem('handleCity', res.data.data.city)
      localStorage.setItem('handleDistrict', res.data.data.area)
      if (this.props.location.query !== undefined && this.props.location.query.name !== 'sunny') {
        let sportId = res.data.data.sport.split(',')
        let lo = []
        for (let i in sportId) {
          lo.push(parseInt(sportId[i]))
        }
        this.setState({
          spinning: false,
          adddress: this.props.location.query.title,
          handleAddress: this.props.location.query.adddress,
          lat: this.props.location.query.lat,
          lng: this.props.location.query.lng,
          province: this.props.location.query.province,
          city: this.props.location.query.city,
          area: this.props.location.query.district,
          informationList: res.data.data, name: res.data.data.name,
          contacts: res.data.data.linkMan, contactNumber: res.data.data.telephone,
          files: [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.firstURL }], filesSon: res.data.data.firstURL,
          filesTwo: arrImg, filesTwoSon: res.data.data.filesURL, sport: lo, facilities: res.data.data.facilities.split(''), siteInfo: res.data.data.siteInfo, comment: res.data.data.comment
        })
      } else if (this.props.location.query === undefined || this.props.location.query.name === 'sunny') {
        let sportId = res.data.data.sport.split(',')
        let lo = []
        for (let i in sportId) {
          lo.push(parseInt(sportId[i]))
        }
        this.setState({
          spinning: false,
          informationList: res.data.data, name: res.data.data.name, handleAddress: res.data.data.address,
          contacts: res.data.data.linkMan, contactNumber: res.data.data.telephone, adddress: res.data.data.position,
          files: [{ url: 'https://app.tiaozhanmeiyitian.com/' + res.data.data.firstURL }], filesSon: res.data.data.firstURL,
          filesTwo: arrImg, filesTwoSon: res.data.data.filesURL, sport: lo, facilities: res.data.data.facilities.split(''), siteInfo: res.data.data.siteInfo, comment: res.data.data.comment
        })
      }
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    }
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
  async getVenueSportList(data) {
    const res = await getVenueSportList(data)
    this.setState({
      plainOptions: res.data.data
    })
  }
  componentDidMount() {
    this.getVenueInformation()
    this.getVenueIssecondaudit()
    this.getVenueQualificationInformation()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()
    this.getVenueSportList()
  }

  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data, sessionStorage.getItem('venue_token'))
    this.setState({ issecondaudit: res.data.data.issecondaudit, isbankcard: res.data.data.isbankcard })
  }

  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let corporate = res.data.data
      let cardImg = corporate.legalFilesURL.replace('|', ',').split(',')
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        imageUrlTwo: corporate.legalFilesURL === '' ? '' : cardImg[0], imageUrlThree: corporate.legalFilesURL === '' ? '' : cardImg[1],
        legalBaseURL: corporate.legalBaseURL,
        filesFourSon: corporate.legalBaseURL === '' ? '' : corporate.legalFilesURL.split('|')[0],
        filesFiveSon: corporate.legalBaseURL === '' ? '' : corporate.legalFilesURL.split('|')[1],
        filesFour: corporate.legalBaseURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.legalBaseURL + corporate.legalFilesURL.split('|')[0] }],
        filesFive: corporate.legalBaseURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.legalBaseURL + corporate.legalFilesURL.split('|')[1] }],
        corporateName: corporate.legalname, corporateId: corporate.legalcard, corporatePhone: corporate.legalphone, CorporateName: corporate.CorporateName,
        numRadio: corporate.Settlement, corporateCardId: corporate.Bankaccount, corporateOpen: corporate.OpeningBank,
        filesThreeSon: corporate.lisenceURL,
        filesThree: [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.lisenceURL }],
        bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        empowerURLBos: corporate.empowerURL === '' ? [] : [{ url: 'https://app.tiaozhanmeiyitian.com/' + corporate.empowerURL }],
        empowerURL: corporate.empowerURL
      })
    }
  }

  async UploadVenueImgs(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      this.setState({ filesSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ files: [], loading: true })
    } else {
      this.setState({ files: [], loading: true })
      message.warning(res.data.msg, 2)
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
        message.warning('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSon: '' })
    }


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
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisen(formdata1)
          })
      } else {
        message.warning('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesThreeSon: '' })
    }
  }



  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  routerMap = () => {
    this.props.history.push({ pathname: '/map', query: { type: this.state.adddress } })
    sessionStorage.setItem('handleCity', this.state.adddress)
    sessionStorage.setItem('hanclick', 2)
  }

  handleName = e => {
    this.setState({ name: e.target.value })
  }
  handleAddress = e => {
    this.setState({ handleAddress: e.target.value })
  }
  contacts = e => {
    this.setState({ contacts: e.target.value })
  }
  contactNumber = e => {
    this.setState({ contactNumber: e.target.value })
  }
  addtelephone = e => {
    this.setState({ addtelephone: e.target.value })
  }

  async UploadVenueImgsTwo(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      let resB = res.data.data.baseURL + res.data.data.filesURL
      this.setState({ filesTwoSon: this.state.filesTwoSon + '|' + resB, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      let ko = this.state.filesTwo
      ko.splice(this.state.num - 1, 1)
      this.setState({ filesTwo: ko, num: 0, loading: true })
    }
  }

  handleChangeT = (files, type, index) => {
    this.setState({ filesTwo: files })
    this.setState({ num: 0 })
    if (type === 'add') {
      console.log(files)
      if (files[files.length - 1].file.size / 1024 / 1024 < 7) {
        lrz(files[files.length - 1].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsTwo(formdata1)
          })
      } else {
        message.warning('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      let pok = this.state.filesTwoSon.slice(1, this.state.filesTwoSon.length).split('|')
      pok.splice(index, 1)
      this.setState({ filesTwoSon: pok.length === 0 ? '' : '|' + pok.join('|') })
    }
  }

  onChangeCheck = e => {
    this.setState({ sport: e })
  }


  onChangeSite = e => {
    this.setState({ facilities: e })
  }



  onChangeText = e => {
    this.setState({ siteInfo: e.target.value })
    if (e.target.value.length === 200) {
      message.error('最多输入200字')
    }
  }

  onChangeTextTwo = e => {
    this.setState({ comment: e.target.value })
    if (e.target.value.length > 200) {
      message.error('最多输入200字')
    }
  }


  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('修改成功')
      if (res.data.other === false) {
        this.setState({ issecondaudit: 1 })
      } else {
        this.setState({ issecondaudit: 0 })
      }
      this.setState({ other: res.data.other })
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }

  confirm = () => {
    let { informationList, name, handleAddress, contacts, contactNumber, filesTwoSon, adddress, filesSon, sport, facilities, siteInfo, comment } = this.state
    if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length < 2) {
      message.error('至少上传两张场地照')
    } else {
      let data = {
        venuename: name,
        lat: this.state.lat !== undefined ? this.state.lat : informationList.lat,
        lng: this.state.lng !== undefined ? this.state.lng : informationList.lng,
        province: this.state.province !== '' ? this.state.province : informationList.province,
        city: this.state.city !== '' ? this.state.city : informationList.city,
        area: this.state.area !== '' ? this.state.area : informationList.area,
        address: handleAddress,
        linkMan: contacts,
        telephone: contactNumber,
        firstURL: filesSon,
        filesURL: filesTwoSon,
        facilities: facilities.join(','),
        sport: sport.join(','),
        siteInfo: siteInfo,
        position: adddress,
        comment: comment,
        type: 2
      }
      if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(contacts) === false) {
        message.error('联系人只允许输入文字/字母')
      } else if (facilities.length === 0) {
        message.error('请至少选择一项场馆设施');
      } else {
        if (this.state.loading === false) {
          message.warning('图片上传中...')
        } else {
          this.VenueInformationSave(data)
        }
      }
    }
  }
  basic = () => {
    this.setState({ flag: true })
  }
  qualification = () => {
    this.setState({ flag: false })
  }
  qualificationTwo = () => {
    this.setState({ flag: 'no' })
  }

  numRadio = e => {
    this.setState({ numRadio: e.target.value })


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
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwo(formdata1)
          })
      } else {
        message.warning('图片超过7M无法上传', 2)
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
      if (files[0].file.size / 1024 / 1024 < 7) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwoT(formdata1)
          })
      } else {
        message.warning('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFiveSon: '', filesFourSon: '', filesFour: [] })
    }
  }


  async UploadVenueImgsLisenAuthor(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ empowerURL: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ empowerURLBos: [], loading: true })
    } else {
      this.setState({ empowerURLBos: [], loading: true })
      message.warning(res.data.msg, 2)
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
        message.warning('图片超过7M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ empowerURL: '' })
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
  corporateCardId = e => {
    this.setState({ corporateCardId: e.target.value })
  }
  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }



  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      message.success('提交成功')
      this.setState({ issecondaudit: 0 })
    } else {
      message.error(res.data.msg)
    }
  }

  ziSubmit = () => {
    let { zuo, imgHoodTwo, imgHood, filesThreeSon, empowerURL, corporateName, corporatePhone, CorporateName } = this.state
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
      empowerURL: empowerURL,
      CityBank: '',
      type: 2
    }
    if (zuo === 1) {
      if (imgHood === '') {
        message.error('请更换身份证正面照')
      } else if (imgHoodTwo === '') {
        message.error('请更换身份证反面照')
      } else {
        data.legalBaseURL = imgHood
        this.VenueQualificationInformationSave(data)
      }
    } else {
      if (this.state.loading === false) {
        message.warning('图片上传中...')
      } else {
        this.VenueQualificationInformationSave(data)
      }
    }
  }

  typeChange = e => {
    this.setState({ bank_id: e, corporateOpen: '', backList: [] })
  }
  provinceChange = e => {
    this.setState({ province_id: e, city_id: '', corporateOpen: '', backList: [] })
    this.getVenueOpenBankCity({ province_id: e })
  }
  cityChange = e => {
    this.setState({ city_id: e, corporateOpen: '', backList: [] })
  }



  handleSearch = e => {
    if (e !== '') {
      this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
    }
  }

  CorporateName = e => {
    this.setState({ CorporateName: e.target.value })
  }



  async VenueReceivingBankInformation(data) {
    const res = await VenueReceivingBankInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('提交成功')
      this.setState({ isbankcard: 0 })
    } else {
      message.error(res.data.msg)
    }
  }

  ziSubmitTwo = () => {
    let { numRadio, legalBaseURL, imageUrlTwo, corporateId, imageUrlThree, filesFiveSon, filesFourSon, corporateCardId, corporateOpen, bank_id, province_id, city_id } = this.state
    let data = {
      legalBaseURL: numRadio === 0 ? '' : legalBaseURL,
      legalFilesURL: numRadio === 0 ? '' : filesFourSon + '|' + filesFiveSon,
      legalcard: numRadio === 0 ? '' : corporateId,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      Banktype: bank_id,
      ProvinceBank: province_id,
      CityBank: city_id,
    }
    if (numRadio && imageUrlTwo === 1) {
      message.error('图片违规请重新上传')
    } else if (numRadio && imageUrlThree === 1) {
      message.error('图片违规请重新上传')
    } else {
      if (this.state.loading === false) {
        message.warning('图片上传中...')
      } else {
        this.VenueReceivingBankInformation(data)
      }
    }
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

  render() {
    const { files, filesTwo, filesThree, filesFive, empowerURLBos, filesFour } = this.state;

    return (
      <div className="stadiums">
        <div className="navTap">
          <div className={this.state.flag === true ? 'background' : 'div'} onClick={this.basic}>基本信息</div>
          <div className={this.state.flag === false ? 'background' : 'div'} style={sessionStorage.getItem('ismethod') === '1' ? { display: 'block' } : { display: 'none' }} onClick={this.qualification}>场馆资质</div>
          <div className={this.state.flag === 'no' ? 'background' : 'div'} style={sessionStorage.getItem('ismethod') === '1' ? { display: 'block' } : { display: 'none' }} onClick={this.qualificationTwo}>收款银行信息</div>
        </div>
        <div className="xiange"></div>

        <Spin size='large' spinning={this.state.spinning} style={{ minHeight: 600 }}>
          <div className={this.state.flag === true ? 'information' : 'none'}>
            <div className="name">
              <span className="boTitle">推广专员:</span>
              <span className="nameINput" >{this.state.informationList.extenpromote === '' ? '无' : this.state.informationList.extenpromote}</span>
            </div>
            <div className="name">
              <span className="boTitle">运营专员:</span>
              <span className="nameINput" >{this.state.informationList.promote === '' ? '无' : this.state.informationList.promote}</span>
            </div>
            <div className="name">
              <span className="boTitle">场馆名称:</span>
              <Input className="nameINput" value={this.state.name} onInput={this.handleName} />
            </div>
            <div className="name">
              <span className="boTitle">场馆位置:</span>
              <Input className="nameINput" value={this.state.adddress} />
              <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" />
            </div>
            <div className="name">
              <span className="boTitle">详细地址:</span>
              <Input className="nameINput" onChange={this.handleAddress} value={this.state.handleAddress} />
            </div>
            <div className="name">
              <span className="boTitle">联系人:</span>
              <Input className="nameINput" maxLength={10} value={this.state.contacts} onInput={this.contacts} />
            </div>
            <div className="name">
              <span className="boTitle">联系电话:</span>
              <Input className="nameINput" maxLength={11} value={this.state.contactNumber} onInput={this.contactNumber} />
            </div>

            <div className="name">
              <span className="boTitle">门脸照:</span>
              <ImagePicker
                files={files}
                style={{ float: 'left', width: '7%', marginLeft: '20px' }}
                onChange={this.handleChange}
                selectable={files.length < 1}
                length={1}
                onImageClick={this.previewing}
                multiple={false}
              />
            </div>

            <div className="name">
              <span className="boTitle">场地照片:</span>
              <div className="clearfix">
                <ImagePicker
                  files={filesTwo}
                  style={{ float: 'left', width: '31%', marginLeft: '20px' }}
                  onChange={this.handleChangeT}
                  onImageClick={this.previewing}
                  selectable={filesTwo.length < 20}
                  length={5}
                  multiple={false}
                />
              </div>
            </div> 
            <div className="name" style={{ overflow: 'hidden' }}>
              <span className="boTitle">场地类型:</span><span className="kong"></span>
              <Checkbox.Group style={{ float: 'left', width: '50%', marginLeft: '26.8px' }} className="chekkoh" options={this.state.plainOptions} value={this.state.sport} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
            </div>
            <div className="name">
              <span className="boTitle">场馆设施:</span><span className="kong"></span>
              <Checkbox.Group options={options} value={this.state.facilities} onChange={this.onChangeSite}/>
            </div>

            <div className="name">
              <span className="boTitle">场馆介绍:</span><span className="kong"></span>
              <TextArea className="textarea" maxLength={200} value={this.state.siteInfo} placeholder="请输入场馆介绍，如场馆规模、特色等。" onChange={this.onChangeText} rows={3} />
            </div>



            <Popconfirm
              title="您确定本次修改吗?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="确定"
              cancelText="返回"
            >
              <Button className="submit" style={this.state.issecondaudit === 1 || this.state.issecondaudit === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
            </Popconfirm>
            <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
          </div>



          <div className={this.state.flag === false ? 'qualification' : 'none'}>
            <div className="listing" >
              <span>公司名称:</span>
              <Input className="listingInput" value={this.state.CorporateName} onChange={this.CorporateName} />
            </div>
            <div className="listing">
              <span>营业执照:</span>

              <ImagePicker
                files={filesThree}
                style={{ float: 'left', width: '7%', marginLeft: '10px' }}
                onChange={this.handleChangeOne}
                onImageClick={this.previewing}
                selectable={filesThree.length < 1}
                length={1}
                multiple={false}
              />
            </div>

            <div className="listing">
              <span>授权书照:</span>
              <ImagePicker
                files={empowerURLBos}
                style={{ float: 'left', width: '7%', marginLeft: '10px' }}
                onChange={this.authorizations}
                onImageClick={this.previewing}
                selectable={empowerURLBos.length < 1}
                length={1}
                multiple={false}
              />
            </div>


            <div className="listing">
              <span>法人姓名:</span>
              <Input className="listingInput" value={this.state.corporateName} onChange={this.corporateName} />
            </div>

            <div className="listing">
              <span>法人手机号:</span>
              <Input className="listingInput" value={this.state.corporatePhone} onChange={this.corporatePhone} />
            </div>



            <Popconfirm
              title="您确定本次修改吗?"
              onConfirm={this.ziSubmit}
              onCancel={this.cancel}
              okText="确定"
              cancelText="返回"
            >
              <Button className="submit" style={this.state.issecondaudit === 1 || this.state.issecondaudit === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
            </Popconfirm>
            <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
          </div>


          <div className={this.state.flag === 'no' ? 'qualification' : 'none'}>
            <div className="listing">
              <span>结算账号:</span>
              <Radio.Group className="accountNum" onChange={this.numRadio} value={this.state.numRadio}>
                <Radio value={0}>公司银行账户</Radio>
                <Radio value={1}>法人账号</Radio>
              </Radio.Group>
            </div>
            <div className="listing" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
              <span>法人身份证号:</span>
              <Input className="listingInput" value={this.state.corporateId} maxLength={18} onChange={this.corporateId} />
            </div>
            <div className="listing" style={this.state.numRadio === 0 ? { display: 'none' } : {}}>
              <span>身份证照:</span>
              <ImagePicker
                files={filesFour}
                style={{ float: 'left', width: '7%', marginLeft: "1%" }}
                onChange={this.handleChangeTwo}
                onImageClick={this.previewing}
                selectable={filesFour.length < 1}
                length={1}
                multiple={false}
              />
              <ImagePicker
                files={filesFive}
                style={{ float: 'left', width: '7%' }}
                onChange={this.handleChangeThree}
                onImageClick={this.previewing} 
                selectable={filesFive.length < 1}
                length={1}
                multiple={false}
              />
            </div>
            <div className="listing">
              <span>银行卡号:</span>
              <Input className="listingInput" placeholder="请输入银行卡号" value={this.state.corporateCardId} onChange={this.corporateCardId} />
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
              title="您确定本次修改吗?"
              onConfirm={this.ziSubmitTwo}
              onCancel={this.cancel}
              okText="确定"
              cancelText="返回"
            >
              <Button className="submit" style={this.state.isbankcard === 1 || this.state.isbankcard === 2 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
            </Popconfirm>
            <Button className="submit" style={this.state.isbankcard === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
          </div>
        </Spin>
        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img"/>
        </div>
      </div>
    )
  }
}

export default stadiums;
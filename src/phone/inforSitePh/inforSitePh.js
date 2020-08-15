import React from 'react';
import './inforSitePh.css';
import { Toast, Modal, TextareaItem, Picker, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Checkbox, Upload, Button, Radio, Select, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getVenueInformation, getVenueQualificationInformation, VenueInformationSave, VenueQualificationInformationSave, getVenueIssecondaudit, getVenueOpenBank, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity, VenueReceivingBankInformation } from '../../api';
import ImgCrop from 'antd-img-crop';
const { Option } = Select
const alert = Modal.alert;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    Toast.fail('只能使用JPG/PNG格式！', 1);
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    Toast.fail('图片不能超过5MB', 1);
  }
  return isJpgOrPng && isLt2M;
}

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

  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }
      if (this.props.history.location.query !== undefined) {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), imageUrlS: res.data.data.firstURL,
          province: this.props.history.location.query.province, city: this.props.history.location.query.city, area: this.props.history.location.query.district,
          cgName: res.data.data.name, address: this.props.history.location.query.adddress, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          fileList: arrImg, comment: res.data.data.siteInfo, lat: this.props.history.location.query.lat, lng: this.props.history.location.query.lng, position: this.props.history.location.query.adddress, spin: false
        })
      } else {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), imageUrlS: res.data.data.firstURL,
          province: res.data.data.province, city: res.data.data.city, area: res.data.data.area,
          cgName: res.data.data.name, address: res.data.data.address, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          fileList: arrImg, comment: res.data.data.siteInfo, lat: res.data.data.lat, lng: res.data.data.lng, position: res.data.data.position, spin: false
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
        imageUrlOne: corporate.lisenceURL,
        baseImg: corporate.legalBaseURL,
        imgFile: corporate.legalBaseURL === '' ? '' : cardImg[0], imgFileTwo: corporate.legalBaseURL === '' ? '' : cardImg[1],
        corporateName: corporate.legalname, corporateId: corporate.legalcard, corporatePhone: corporate.legalphone,
        numRadio: corporate.Settlement, corporateCardId: corporate.Bankaccount, CorporateName: corporate.CorporateName, corporateOpen: corporate.OpeningBank, lisenceURL: corporate.lisenceURL,
        bank_id: corporate.Banktype, city_id: corporate.CityBank, province_id: corporate.ProvinceBank
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
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: true })
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageUrlS: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageUrlS: '' })
      }

      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
        
        })
      )
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 2)

    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 2)
    }



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
  };
  handleChangeT = ({ fileList }) => {
    this.setState({ fileList: fileList, loading: false })
    let arrt = []
    for (let i in fileList) {
      if (fileList[i].url === undefined) {
        arrt.push(fileList[i].response === undefined ? 1 : fileList[i].response)
      }
      if (fileList[i].response !== undefined && fileList[i].response.code === 4004) {
        fileList[i].thumbUrl = ''
        fileList[i].name = '图片违规'
        Toast.fail('有图片违规请重新上传', 2)
        this.setState({ fileList: fileList })
      }

    }
    if (arrt.indexOf(1) === -1) {
      this.setState({ loading: true })
    }

  }

  onChangeSite = e => {
    this.setState({ facilities: e })
  }

  onChangeCheck = e => {
    this.setState({ sport: e })
    console.log(e)
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
    let { cgName, address, linkMan, telephone, fileList, imageUrlS, sport, facilities, comment, lat, lng, position, province, city, area } = this.state
    let filesURLarr = []
    for (let i in fileList) {
      if (fileList[i].response !== undefined) {
        if (fileList[i].response.data.length === 0) {
          filesURLarr.push('无')
        } else {
          filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
        }
      } else if (fileList[i].response === undefined) {
        filesURLarr.push(fileList[i].url)
      }
    }

    if (filesURLarr.length >= 2) {
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
        firstURL: imageUrlS,
        filesURL: filesURLarr.join('|'),
        facilities: facilities.join(','),
        sport: sport.join(','),
        siteInfo: comment,
        position: position,
        comment: comment,
        sporttype: '',
        type: 2
      }
      if (data.firstURL === '') {
        Toast.fail('门脸照违规请重新上传', 2);
      } else if (data.filesURL.split('|').indexOf('无') !== -1) {
        Toast.fail('场地照有违规图片请重新上传', 2);
      } else {
        if(this.state.loading===false){
          Toast.loading('图片上传中', 1);
        }else{
        this.VenueInformationSave(data)
        }
      }
    } else {
      Toast.fail('至少上传两张场地照', 1);
    }
  }

  // 资质信息修改 获取 
  handleChangeTwo = info => {

    if (info.file.status === 'uploading') {
      this.setState({ loading: false })
      return
    }

    if (info.file.status === 'done') {
      this.setState({ loading: true })
      if (info.file.response.data.baseURL !== undefined) {
        if (this.state.imgFile !== '') {
          this.setState({ imgFile: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL, imgFileTwo: '' })
        } else {
          this.setState({ imgFile: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
        }
      } else {
        this.setState({ imgFile: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }



  handleChangeOne = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ loading: 'true' })
      this.setState({ imageUrlOne: info.file.response.data.baseURL + info.file.response.data.filesURL })
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }

  }

  handleChangeThree = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false })
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: true })
      if (info.file.response.data.baseURL !== undefined) {
        if (this.state.imgFileTwo !== '') {
          this.setState({ imgFileTwo: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL, imgFile: '' })
        } else {
          this.setState({ imgFileTwo: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
        }
      } else {
        this.setState({ imgFileTwo: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
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
      this.setState({ CorporateName: '', bank_id: '', province_id: '', city_id: '' })
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
    this.setState({ bank_id: e, corporateOpen: '',backList:[] })
  }
  cityChange = e => {
    this.setState({ city_id: e,corporateOpen: '',backList:[] })
  }
  provinceChange = e => {
    this.setState({ province_id: e,corporateOpen: '',backList:[] })
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
      this.getVenueOpenBankList({ bank_id: this.state.bank_id.join(), province_id: this.state.province_id.join(), city_id: this.state.city_id.join(), search_name: e })
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
    let { zuo, imgHoodTwo, imgHood, lisenceURL, corporateName, corporatePhone, CorporateName } = this.state
    let data = {
      legalname: corporateName,
      legalcard: '',
      legalphone: corporatePhone,
      Settlement: 0,
      Bankaccount: '',
      OpeningBank: '',
      lisenceURL: lisenceURL,
      legalBaseURL: '',
      legalFilesURL: '',
      CorporateName: CorporateName,
      Banktype: '',
      ProvinceBank: '',
      CityBank: '',
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
      if(this.state.loading===false){
        Toast.loading('图片上传中', 1);
      }else{
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
    let { numRadio, baseImg, imgFile, corporateId, imgFileTwo, corporateCardId, corporateOpen, bank_id, province_id, city_id } = this.state
    let data = {
      legalcard: numRadio === 0 ? '' : corporateId,
      legalBaseURL: numRadio === 0 ? '' : baseImg,
      legalFilesURL: numRadio === 0 ? '' : imgFile + '|' + imgFileTwo,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
    }
    if (numRadio && imgFile === undefined) {
      Toast.fail('图片违规请重新上传', 1);
    } else if (numRadio && imgFileTwo === undefined) {
      Toast.fail('图片违规请重新上传', 1);
    } else {
      if(this.state.loading===false){
        Toast.loading('图片上传中', 1);
      }else{
      this.VenueReceivingBankInformation(data)
      }
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
    const uploadButton = (
      <div>
        <svg t="1594106057548" className="icon" viewBox="64 64 896 896" width="1.5em" height="1.5em" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6269"><path d="M864 800a32 32 0 0 0 32-32V256a32 32 0 0 0-32-32H160a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32z m0 64H160a96 96 0 0 1-96-96V256a96 96 0 0 1 96-96h704a96 96 0 0 1 96 96v512a96 96 0 0 1-96 96z" p-id="6270" fill="#1890ff"></path><path d="M384 432a48 48 0 1 0-48 48 48 48 0 0 0 48-48z m64 0a112 112 0 1 1-112-112 112 112 0 0 1 112 112zM503.68 757.44a32 32 0 1 1-47.36-42.88l175.04-192a32 32 0 0 1 47.36 0l112.96 124.16a32 32 0 1 1-47.36 42.88l-89.28-98.24zM277.76 759.36a32 32 0 0 1-43.52-46.72l138.56-128a32 32 0 0 1 43.2 0l53.76 49.28a32 32 0 1 1-43.52 47.04l-32-29.12z" p-id="6271" fill="#1890ff"></path></svg>
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>图片违规</div>
      </div>
    )
    const { imageUrlS, fileList, imgFile, imageUrlOne, imgFileTwo } = this.state
    const uploadButtonT = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="2rem" height="2rem"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const uploadButtonTwo = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="2rem" height="2rem"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const uploadButtonThree = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="2rem" height="2rem"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const propsOne = {
      aspect: 1.295 / 1,
      resize: false, //裁剪是否可以调整大小
      resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
      modalTitle: "编辑图片", //弹窗标题
      modalWidth: 600, //弹窗宽度
      modalOk: "确定",
      modalCancel: "取消"
    }
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
            <ImgCrop scale {...propsOne}>
              <Upload
                name="files"
                listType="picture-card"
                className="avatar-uploader addImg"
                showUploadList={false}
                action="/api/UploadVenueImgs?type=Venue"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                accept="image/*"
                multiple={false}
              >
                {imageUrlS ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlS} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </ImgCrop>
          </div>
          <div className="listSon">
            <span>场地照片</span>
            <Upload
              name="files"
              action="/api/UploadVenueImgs?type=Venue"
              listType="picture-card"
              fileList={fileList}
              className="addImg"
              onPreview={this.handlePreview}
              onChange={this.handleChangeT}
              accept="image/*"
              multiple={false}
            >
              {fileList.length >= 8 ? null : uploadButtonT}
            </Upload>
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
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venuelisence"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeOne}
              style={{ width: '3rem', height: '4.8rem' }}
            >
              {imageUrlOne ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlOne} alt="avatar" style={{ width: '4.1rem', height: '4.8rem' }} /> : uploadButtonTwo}
            </Upload>
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
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=VenueIdCardImgs"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeTwo}
            >
              {imgFile !== '' && imgFile !== 1 ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL + imgFile} alt="avatar" style={{ width: '4.8rem', height: '3rem' }} /> : uploadButtonTwo}
            </Upload>
            <div style={{ clear: 'both' }}></div>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=VenueIdCardImgs"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeThree}
            >
              {imgFileTwo !== '' && imgFileTwo !== 1 ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL + imgFileTwo} alt="avatar" style={{ width: '4.8rem', height: '3rem' }} /> : uploadButtonThree}
            </Upload>
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

      </div>
    )
  }
}

export default inforSitePh;
import React from 'react';
import './inforSitePh.css';
import { Toast, Modal, TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Checkbox, Upload, Button, Radio, Select, Tooltip, Spin } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getVenueInformation, getVenueQualificationInformation, VenueInformationSave, VenueQualificationInformationSave, getVenueIssecondaudit, getVenueOpenBank, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity } from '../../api';
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
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    Toast.fail('图片不能超过2MB', 1);
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
    upData: true,
    corporateOpen: '',
    zuo: 0,
    imgHoodTwo: '',
    imgHood: '',
    spin: true,
    onChangeCheckTwo: [],
    CorporateName: '',
    other: false

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
        console.log(this.props.history.location.query)
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), imageUrlS: res.data.data.firstURL,
          province: this.props.history.location.query.province, city: this.props.history.location.query.city, area: this.props.history.location.query.district,
          cgName: res.data.data.name, address: this.props.history.location.query.adddress, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          fileList: arrImg, comment: res.data.data.comment, lat: this.props.history.location.query.lat, lng: this.props.history.location.query.lng, position: this.props.history.location.query.adddress, spin: false
        })
      } else {
        this.setState({
          listSon: res.data.data, sport: res.data.data.sport.split(','), facilities: res.data.data.facilities.split(','), imageUrlS: res.data.data.firstURL,
          province: res.data.data.province, city: res.data.data.city, area: res.data.data.area,
          cgName: res.data.data.name, address: res.data.data.address, linkMan: res.data.data.linkMan, telephone: res.data.data.telephone, siteInfo: res.data.data.siteInfo,
          fileList: arrImg, comment: res.data.data.comment, lat: res.data.data.lat, lng: res.data.data.lng, position: res.data.data.position, spin: false
        })
      }

    } else {
      Toast.fail(res.data.msg, 1);

    }
  }


  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data, localStorage.getItem('venue_token'))
    this.setState({ issecondaudit: parseInt(res.data.data.issecondaudit) })
  }

  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let corporate = res.data.data
      let cardImg = corporate.legalFilesURL.replace('|', ',').split(',')

      this.setState({
        imageUrlTwo: corporate.legalBaseURL + '/' + cardImg[0], imageUrlThree: corporate.legalBaseURL + '/' + cardImg[1],
        imageUrlOne: corporate.lisenceURL,
        baseImg: corporate.legalBaseURL,
        imgFile: cardImg[0], imgFileTwo: cardImg[1],
        corporateName: corporate.legalname, corporateId: corporate.legalcard, corporatePhone: corporate.legalphone,
        numRadio: corporate.Settlement, corporateCardId: corporate.Bankaccount, CorporateName: corporate.CorporateName, corporateOpen: corporate.OpeningBank, lisenceURL: corporate.lisenceURL,
        Banktype: corporate.Banktype, CityBank: corporate.CityBank, ProvinceBank: corporate.ProvinceBank
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
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageUrlS: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageUrlS: '' })
      }

      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
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
    this.setState({ fileList: fileList })
    for (let i in fileList) {
      if (fileList[i].response !== undefined && fileList[i].response.code === 4004) {
        fileList[i].thumbUrl = ''
        fileList[i].name = '图片违规'
        Toast.fail('有图片违规请重新上传', 2)
        this.setState({ fileList: fileList })
      }

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
      Toast.success('提交成功', 1);

      this.setState({ issecondaudit: 0, other: res.data.other })
      this.getVenueInformation()
    } else {
      Toast.fail(res.data.msg, 1);

    }
  }

  confirm = () => {
    let { cgName, address, linkMan, telephone, fileList, imageUrlS, sport, facilities, siteInfo, comment, lat, lng, position, province, city, area } = this.state
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
        siteInfo: siteInfo,
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
        this.VenueInformationSave(data)
      }
    } else {
      Toast.fail('至少上传两张室内照', 1);
    }
  }

  // 资质信息修改 获取 
  handleChangeTwo = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ zuo: 1, imageUrlTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, loading: false, imgFile: info.file.response.data.filesURL })
    }
  }
  handleChangeOne = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ imageUrlOne: info.file.response.data.baseURL + info.file.response.data.filesURL })
    }

  }

  handleChangeThree = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ zuo: 1, imageUrlThree: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHoodTwo: info.file.response.data.baseURL, loading: false, imgFileTwo: info.file.response.data.filesURL })
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
    this.setState({ numRadio: e.target.value, upData: false, corporateCardId: '', corporateOpen: '' })
    if (e.target.value === 1) {
      this.setState({ CorporateName: '' })
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
      this.setState({ type: res.data.data, flagOne: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backList: res.data.data, flagThree: false })
    }
  }

  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
    }
  }

  upData = () => {
    this.setState({ upData: false, corporateOpen: '' })
  }
  typeChange = e => {
    this.setState({ bank_id: e })
  }
  cityChange = e => {
    this.setState({ city_id: e })
  }
  provinceChange = e => {
    this.setState({ province_id: e })
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
      this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
    }
  }

  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }

  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('提交成功', 1)
      this.setState({ issecondaudit: 0 })
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  ziSubmit = () => {
    let { zuo, imgHoodTwo, imgHood, baseImg, lisenceURL, corporateName, corporateId, corporatePhone, numRadio, corporateCardId, corporateOpen, imgFile, CorporateName, imgFileTwo, Banktype, CityBank, ProvinceBank } = this.state
    let data = {
      legalname: corporateName,
      legalcard: corporateId,
      legalphone: corporatePhone,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      lisenceURL: lisenceURL,
      legalBaseURL: baseImg,
      legalFilesURL: imgFile + '|' + imgFileTwo,
      Banktype: Banktype,
      CityBank: CityBank,
      ProvinceBank: ProvinceBank,
      CorporateName: CorporateName

    }
    if (zuo === 1) {
      if (imgHood === '') {
        Toast.fail('请更换身份证正面照', 1);

      } else if (imgHoodTwo === '') {
        Toast.fail('请更换身份证反面照', 1);
      } else {
        data.legalBaseURL = imgHood
        this.VenueQualificationInformationSave(data)
      }
    } else {
      this.VenueQualificationInformationSave(data)
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
    const { imageUrlS, fileList, imageUrlTwo, imageUrlOne, imageUrlThree } = this.state
    const uploadButtonT = (
      <div>
        <span>场地照</span>
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}></div>
      </div>
    )
    const uploadButtonTwo = (
      <div>
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>正面照</div>
      </div>
    )
    const uploadButtonThree = (
      <div>
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>反面照</div>
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
          <div className={localStorage.getItem('ismethod') === '1' ? 'left' : 'width'} style={this.state.flag === 1 ? { color: '#fff' } : {}} onClick={this.left}>基本信息</div>
          <div className={localStorage.getItem('ismethod') === '1' ? 'right' : 'none'} style={this.state.flag === 1 ? {} : { color: '#fff' }} onClick={this.right}>资质信息</div>
        </div>
        <div className="basic" style={this.state.spin === false && this.state.flag === 1 ? { display: 'block', overflow: 'scroll', height: '98%' } : { display: 'none' }}>
          <div className="listSon">
            <span>推广员</span>
            <span className="right" style={{ paddingLeft: '11px' }}>{listSon.promote}</span>
          </div>
          <div className="listSon">
            <span>场馆名称</span>
            <Input className="right" value={this.state.cgName} onChange={this.cgName} />
          </div>
          <div className="listSon" onClick={this.mapPh} data-position={listSon.position}>
            <span style={{ float: 'left' }}>场馆位置</span>
            <img style={{ float: 'right', width: '0.85rem', marginTop: '0.9rem' }} src={require('../../assets/icon_pc_dingwei.png')} alt="icon" />
            <Input className="right" style={{ width: '75%' }} value={this.state.position} disabled={true} />

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
            } style={this.state.other === false ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
          
          <Button className="submit" style={this.state.other === true ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>



        <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
        <div className="qualification" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>营业执照</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeOne}
              style={{ width: '3rem', height: '4.8rem' }}
            >
              {imageUrlOne ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlOne} alt="avatar" style={{ width: '4.1rem', height: '4.8rem' }} /> : uploadButtonTwo}
            </Upload>
          </div>

          <div className="listSon">
            <span>身份证</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeTwo}
            >
              {imageUrlTwo ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlTwo} alt="avatar" style={{ width: '4.8rem', height: '3rem' }} /> : uploadButtonTwo}
            </Upload>
            <div style={{ clear: 'both' }}></div>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeThree}
            >
              {imageUrlThree ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlThree} alt="avatar" style={{ width: '4.8rem', height: '3rem' }} /> : uploadButtonThree}
            </Upload>
          </div>
          <div className="listSon">
            <span>法人姓名</span>
            <Input className="right" value={this.state.corporateName} placeholder="请输入法人姓名" onChange={this.corporateName} />
          </div>

          <div className="listSon">
            <span>法人身份证号</span>
            <Input className="right" style={{ width: '60%', paddingLeft: '0.5rem', marginRight: '19%' }} placeholder="请输入法人身份证号" value={this.state.corporateId} onChange={this.corporateId} />
          </div>

          <div className="listSon">
            <span>法人手机号</span>
            <Input className="right" value={this.state.corporatePhone} placeholder="请输入法人手机号" onChange={this.corporatePhone} />
          </div>
          <div className="listSon">
            <span style={{ float: 'left' }}>结算账号:</span>
            <Radio.Group style={{ float: 'left', fontSize: '0.75rem', marginLeft: '10%' }} onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司账号</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>

          <div className="listSon" style={this.state.numRadio === 1 ? { display: 'none' } : {}}>
            <span>公司名称</span>
            <Input className="right" value={this.state.CorporateName} placeholder="请输入公司名称" onChange={this.CorporateName} />
          </div>

          <div className="listSon">
            <span>银行账号</span>
            <Input className="right" value={this.state.corporateCardId} placeholder="请输入银行账号" onChange={this.corporateCardId} />
          </div>


          <div className="listSon" style={this.state.upData === true ? { display: 'none' } : { display: 'block' }}>
            <span>开户所在地</span>
            <Select placeholder="银行类型" style={{ width: '5rem', height: '35px', marginLeft: '1.6rem', display: 'inline-block', }} loading={this.state.flagOne} onChange={this.typeChange}>
              {
                this.state.type.map((item, i) => (
                  <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在省" style={{ width: '5rem', height: '35px', marginLeft: '0.2rem', display: 'inline-block' }} loading={this.state.flagTwo} onChange={this.provinceChange}>
              {
                this.state.backProvince.map((item, i) => (
                  <Option key={i} value={item.province_id}>{item.province}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在市" style={{ width: '5rem', height: '35px', marginLeft: '0.2rem', display: 'inline-block' }} loading={this.state.flagThree} onChange={this.cityChange}>
              {
                this.state.backCity.map((item, i) => (
                  <Option key={i} value={item.city_id}>{item.city}</Option>
                ))
              }
            </Select>
          </div>



          <div className="listSon">
            <span>开户行</span>
            <span onClick={this.upData} style={this.state.upData === false ? { color: 'transparent', float: 'right', marginRight: '1.5rem' } : { float: 'right', marginRight: '1.5rem', color: '#D85D27' }}>修改</span>
            <Select
              showSearch
              className="right"
              style={{ height: '32px', lineHeight: '32px', width: '60%', float: 'right', marginRight: '6%' }}
              onSearch={this.handleSearch}
              onChange={this.corporateOpen}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              disabled={this.state.upData}
              placeholder="请输入银行关键字"
              value={this.state.corporateOpen}
            >
              {
                this.state.backList.map((item, i) => (
                  <Option key={i} value={item.sub_branch_name} alt={item.sub_branch_name}>
                    <Tooltip title={item.sub_branch_name}>
                      <span>{item.sub_branch_name}</span>
                    </Tooltip></Option>
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
                  this.ziSubmit()
                },
              ])
            } style={this.state.other === false ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
         
          <Button className="submit" style={this.state.other === true ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
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
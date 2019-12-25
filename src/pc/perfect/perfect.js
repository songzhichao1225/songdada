import React from 'react';
import './perfect.css';
import 'antd/dist/antd.css';
import { getProvince, getCrty, getArea, PerfectingVenueInformation, getVenueInformation, VenueInformationSave } from '../../api';
import { Select, Input, Checkbox, Button, Upload, Icon, message, Modal } from 'antd';


const { Option } = Select;
const { TextArea } = Input;

const plainOptions = [
  { label: '篮球', value: '4' },
  { label: '足球', value: '5' },
  { label: '台球', value: '3' },
  { label: '羽毛球', value: '1' },
  { label: '排球', value: '6' },
  { label: '网球', value: '7' },
  { label: '乒乓球', value: '2' },
  { label: '高尔夫球', value: '8' }
];

const plainOptionsTwo = [
  { label: '中式黑八', value: '1' },
  { label: '美式九球', value: '2' },
  { label: '斯诺克', value: '3' }
]

const plainOptionsThree = [
  { label: '11人制', value: '13' },
  { label: '8人制', value: '14' },
  { label: '7人制', value: '15' },
  { label: '5人制', value: '16' },
]

const plainOptionsFour = [
  { label: '9洞', value: '25' },
  { label: '18洞', value: '26' },
  { label: '27洞', value: '27' },
  { label: '36洞', value: '28' },
  { label: '练习', value: '19' },
]


const options = [{ label: 'WiFi', value: '1' }, { label: '停车场', value: '2' }, { label: '淋浴', value: '3' }]



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传PNG/JPG格式图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    message.error('上传图片必须小于3MB');
  }
  return isJpgOrPng && isLt2M;
}
message.config({
  top: 300
})

class perfect extends React.Component {

  state = {
    handleArea: '',//省
    handleCity: '',//市,
    handleDistrict: '',//区
    handleName: '',//场馆名称
    handleAddress: this.props.location.query === undefined ? '' : this.props.location.query.adddress,//场馆详细地址
    onChangeCheck: '',//运动项目
    onChangeCheckTwo: '',//台球项目
    onChangeCheckThree: '',//足球项目
    onChangeCheckFour: '',//高尔夫项目
    onChangeSite: '',//场地设施
    province: '',//获取的省数组
    city: '',//获取市数组
    getArea: '',//获取区县数组
    loadinng: false,
    previewVisible: false,
    previewImage: '',
    imageRes: '',//上传门脸照的返回
    onChangeText: '',//输入框
    fileList: [],
    position: '',
    lat: '',
    lng: '',
    handelPerson: '',
    handleTelephone: '',
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }
      localStorage.setItem('handleName', res.data.data.name)
      this.setState({
        position: res.data.data.position, handleAddress: res.data.data.address, handleName: res.data.data.name, imageUrl: res.data.data.firstURL, fileList: arrImg,
        onChangeCheck: res.data.data.sport, onChangeSite: res.data.data.facilities, onChangeText: res.data.data.siteInfo, lat: res.data.data.lat, lng: res.data.data.lng,
        onChangeCheckTwo: res.data.data.sporttype.split('|')[0], onChangeCheckThree: res.data.data.sporttype.split('|')[1], onChangeCheckTFour: res.data.data.sporttype.split('|')[2],
        imageRes: res.data.data.firstURL, handelPerson: res.data.data.linkMan, handleTelephone: res.data.data.telephone
      })
    }
  }


  componentDidMount() {

    this.getProvince()
    if (localStorage.getItem('handleAreaId') !== null) {
      this.getCrty({ parent: localStorage.getItem('handleAreaId') })
    }
    if (localStorage.getItem('handleCityId') !== null) {
      this.getArea({ crty: localStorage.getItem('handleCityId') })
    }
    if (sessionStorage.getItem('notType') === '1') {
      this.getVenueInformation()
    }
  }




  handleArea = e => {
    let { province } = this.state
    for (let i in Array.from(province)) {
      if (Array.from(province)[i].id === e) {
        localStorage.setItem('handleArea', Array.from(province)[i].name)
        localStorage.setItem('handleAreaId', Array.from(province)[i].id)
      }
    }
    this.getCrty({ parent: localStorage.getItem('handleAreaId') })
  }
  handleCity = e => {
    let { city } = this.state
    for (let i in Array.from(city)) {
      if (Array.from(city)[i].id === e) {
        localStorage.setItem('handleCity', Array.from(city)[i].name)
        localStorage.setItem('handleCityId', Array.from(city)[i].id)
      }
    }
    this.getArea({ crty: localStorage.getItem('handleCityId') })
  }
  handleDistrict = e => {
    let { getArea } = this.state
    for (let i in Array.from(getArea)) {
      if (Array.from(getArea)[i].id === e) {
        localStorage.setItem('handleDistrict', Array.from(getArea)[i].name)
        localStorage.setItem('handleDistrictId', Array.from(getArea)[i].id)
      }
    }
  }
  routerMap = () => {
    if (localStorage.getItem('handleDistrict') !== null) {
      this.props.history.push({ pathname: '/map', query: { type: localStorage.getItem('handleDistrict'), city: localStorage.getItem('handleCity') } })
      sessionStorage.setItem('hanclick', 1)
    } else {
      message.warning('请先选择地区')
    }
  }
  handleName = e => {
    this.setState({ handleName: e.target.value })
    localStorage.setItem('handleName', e.target.value)
  }
  handleAddress = e => {
    this.setState({ handleAddress: e.target.value })
  }
  onChangeCheck = e => {
    this.setState({ onChangeCheck: e })
    if (e.indexOf('3') === -1) {
      this.setState({ onChangeCheckTwo: '' })
    } else if (e.indexOf('5') === -1) {
      this.setState({ onChangeCheckThree: '' })
    } else if (e.indexOf('8') === -1) {
      this.setState({ onChangeCheckFour: '' })
    }
    sessionStorage.setItem('onChangeCheck', e)
  }
  onChangeCheckTwo = e => {
    this.setState({ onChangeCheckTwo: e })
    sessionStorage.setItem('onChangeCheckTwo', e)
  }
  onChangeCheckThree = e => {
    this.setState({ onChangeCheckThree: e })
    sessionStorage.setItem('onChangeCheckThree', e)
  }
  onChangeCheckFour = e => {
    this.setState({ onChangeCheckFour: e })
    sessionStorage.setItem('onChangeCheckFour', e)
  }
  onChangeSite = e => {
    this.setState({ onChangeSite: e })
    sessionStorage.setItem('onChangeSite', e)
  }

  async getProvince(data) {
    const res = await getProvince(data)
    this.setState({ province: res.data.data })
  }

  async getCrty(data) {
    const res = await getCrty(data)
    this.setState({ city: res.data.data })
  }

  async getArea(data) {
    const res = await getArea(data)
    this.setState({ getArea: res.data.data })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  handleChangeT = ({ fileList }) => this.setState({ fileList });

  onChangeText = e => {
    this.setState({ onChangeText: e.target.value })
  }






  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/qualification')
      message.info(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录')
    } else {
      message.error(res.data.msg)
    }
  }

  onClickNex = () => {
    let { imageRes, fileList, handleAddress, handelPerson, handleTelephone } = this.state
    if (sessionStorage.getItem('notType') === '1') {
      let filesURLarr = []
      for (let i in fileList) {
        if (fileList[i].response === undefined) {
          filesURLarr.push(fileList[i].url)
        } else {
          filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
        }
      }
      if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")
      } else if (this.state.onChangeCheck.indexOf('3') !== -1 && this.state.onChangeCheckTwo === '') {
        message.warning('请选择台球分类')
      } else if (this.state.onChangeCheck.indexOf('5') !== -1 && this.state.onChangeCheckThree === '') {
        message.warning('请选择足球分类')
      } else if (this.state.onChangeCheck.indexOf('8') !== -1 && this.state.onChangeCheckFour === '') {
        message.warning('请选择高尔夫分类')
      } else {
        let sportId = sessionStorage.getItem('onChangeCheck') === null ? this.state.onChangeCheck.split(',') : sessionStorage.getItem('onChangeCheck').split(',')
        let onChangeCheckTwo = sessionStorage.getItem('onChangeCheckTwo') === null ? this.state.onChangeCheckTwo.split(',') : sessionStorage.getItem('onChangeCheckTwo').split(',')
        let onChangeCheckThree = sessionStorage.getItem('onChangeCheckThree') === null ? this.state.onChangeCheckThree.split(',') : sessionStorage.getItem('onChangeCheckThree').split(',')
        let onChangeCheckFour = sessionStorage.getItem('onChangeCheckFour') === null ? this.state.onChangeCheckFour.split(',') : sessionStorage.getItem('onChangeCheckFour').split(',')
        let facilitiesId = sessionStorage.getItem('onChangeSite') === null ? this.state.onChangeSite.split(',') : sessionStorage.getItem('onChangeSite').split(',')
        let data = {
          venuename: localStorage.getItem('handleName'),
          lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
          lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
          address: handleAddress,
          filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
          firstURL: imageRes,
          sport: sportId === '' ? [] : sportId.join(','),
          facilities: facilitiesId === '' ? [] : facilitiesId.join(','),
          siteInfo: this.state.onChangeText,
          position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
          comment: '',
          type: 1,
          linkMan: handelPerson,
          telephone: handleTelephone,
          sporttype: onChangeCheckTwo + '|' + onChangeCheckThree + '|' + onChangeCheckFour
        }
        this.VenueInformationSave(data)
      }

    } else {
      let filesURLarr = []
      for (let i in fileList) {
        filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
      }
      if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")
      } else if (this.state.onChangeCheck.indexOf('3') !== -1 && this.state.onChangeCheckTwo === '') {
        message.warning('请选择台球分类')
      } else if (this.state.onChangeCheck.indexOf('5') !== -1 && this.state.onChangeCheckThree === '') {
        message.warning('请选择足球分类')
      } else if (this.state.onChangeCheck.indexOf('8') !== -1 && this.state.onChangeCheckFour === '') {
        message.warning('请选择高尔夫分类')
      } else if (this.props.location.query === undefined) {
        message.warning('请选择场馆位置')
      } else {
        let sportId = sessionStorage.getItem('onChangeCheck') === null ? '' : sessionStorage.getItem('onChangeCheck').split(',')
        let onChangeCheckTwo = sessionStorage.getItem('onChangeCheckTwo') === null ? this.state.onChangeCheckTwo.split(',') : sessionStorage.getItem('onChangeCheckTwo').split(',')
        let onChangeCheckThree = sessionStorage.getItem('onChangeCheckThree') === null ? this.state.onChangeCheckThree.split(',') : sessionStorage.getItem('onChangeCheckThree').split(',')
        let onChangeCheckFour = sessionStorage.getItem('onChangeCheckFour') === null ? this.state.onChangeCheckFour.split(',') : sessionStorage.getItem('onChangeCheckFour').split(',')
        let facilitiesId = sessionStorage.getItem('onChangeSite') === null ? '' : sessionStorage.getItem('onChangeSite').split(',')
        let data = {
          venueloginuuid: sessionStorage.getItem('uuid'),//看不懂  就别干了
          province: localStorage.getItem('handleArea'),
          city: localStorage.getItem('handleCity'),
          area: localStorage.getItem('handleDistrict'),
          venuename: localStorage.getItem('handleName'),
          lat: this.props.location.query === undefined ? '' : this.props.location.query.lat,
          lng: this.props.location.query === undefined ? '' : this.props.location.query.lng,
          address: handleAddress,
          filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
          firstURL: imageRes,
          sport: sportId === '' ? [] : sportId.join(','),
          facilities: facilitiesId === '' ? '' : facilitiesId.join(','),
          siteInfo: this.state.onChangeText,
          position: this.props.location.query.title,
          linkMan: handelPerson,
          telephone: handleTelephone,
          sporttype: onChangeCheckTwo + '|' + onChangeCheckThree + '|' + onChangeCheckFour
        }
        this.PerfectingVenueInformation(data)
      }
    }
  }

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
    if (res.data.code === 2000) {
      this.props.history.push('/qualification')
    } else {
      message.error(res.data.msg)
    }
  }

  handelPerson = (e) => {
    this.setState({ handelPerson: e.target.value })
  }
  handleTelephone = (e) => {
    this.setState({ handleTelephone: e.target.value })
  }

  render() {
    const { province, city, getArea } = this.state
    const data = Array.from(province);
    const cityT = Array.from(city);
    const getAreaT = Array.from(getArea);

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">门脸照</div>
      </div>
    )
    const { imageUrl } = this.state

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">场地照</div>
      </div>
    )


    return (
      <div className="perfect">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 173, height: 58, marginLeft: 45, marginTop: 40 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          <div className="content">
            <div className="nav">
              <div>1.填写注册信息</div>
              <div>2.完善场馆信息</div>
              <div>3.等待审核</div>
              <div>4.审核成功</div>
            </div>
            <div className="contentSon">
              <span className="titile">场馆基本信息</span>
              <div className="area">
                <span className="symbol">*</span><span className="boTitle">选择地区</span>
                <Select defaultValue={localStorage.getItem('handleArea') === null ? '请选择' : localStorage.getItem('handleArea')} className="one" style={{ width: 118 }} onChange={this.handleArea}>
                  {
                    data.map((item, i) => {
                      return <Option key={i} value={item.id} >{item.name}</Option>
                    })
                  }
                </Select>
                <span>省</span>
                <Select defaultValue={localStorage.getItem('handleCity') === null ? '请选择' : localStorage.getItem('handleCity')} className="one" style={{ width: 118 }} onChange={this.handleCity}>
                  {
                    cityT.map((item, i) => {
                      return <Option key={i} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                <span>市</span>

                <Select defaultValue={localStorage.getItem('handleDistrict') === null ? '请选择' : localStorage.getItem('handleDistrict')} className="one" style={{ width: 118 }} onChange={this.handleDistrict}>
                  {
                    getAreaT.map((item, i) => {
                      return <Option key={i} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                <span>区/县</span>
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆位置</span>
                <Input className="nameINput" value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.position} placeholder="请输选择场馆位置" />
                <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">详细地址</span>
                <Input className="nameINput" onChange={this.handleAddress} value={this.state.handleAddress} placeholder="请输入场馆详细地址如门牌号楼层" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆名称</span>
                <Input className="nameINput" onChange={this.handleName} value={this.state.handleName} placeholder="请输入场馆名称" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">&nbsp;&nbsp;&nbsp;&nbsp;联系人</span>
                <Input className="nameINput" onChange={this.handelPerson} value={this.state.handelPerson} placeholder="请输入联系人姓名" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">联系电话</span>
                <Input className="nameINput" maxLength={11} onChange={this.handleTelephone} value={this.state.handleTelephone} placeholder="请输入联系人电话" />
              </div>

              <div className="name">
                <span className="symbol negative">*</span><span className="boTitle negativeT">门脸照(1张)</span>
                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venue"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  accept=".jpg, .jpeg, .png"
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <span className="rightText">上传图片小于3M<br />上传图片尺寸在1200px*860px 之内</span>
              </div>

              <div className="name">
                <span className="symbol negativeTwo">*</span><span className="boTitle negativeTwoT">场地照片(2-8张)</span>
                <div className="clearfix">
                  <Upload
                    name="files"
                    action="/api/UploadVenueImgs?type=Venue"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChangeT}
                    accept=".jpg, .jpeg, .png"
                  >
                    {fileList.length >= 8 ? null : uploadButtonT}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
                <span className="rightText">上传图片小于3M<br />上传图片尺寸在1200px*860px 之内</span>
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">运动项目</span><span className="kong"></span>
                <Checkbox.Group options={plainOptions} onChange={this.onChangeCheck} value={this.state.onChangeCheck} /><br /><span className="kong"></span>
              </div>

              <div className="name" style={this.state.onChangeCheck.indexOf('3') !== -1 ? { display: 'block' } : { display: 'none' }}>
                <span className="symbol" style={{ marginLeft: '-30px' }}>*</span><span className="boTitle" style={{ marginLeft: '-20px' }}>台球场地类型</span><span className="kong"></span>
                <Checkbox.Group options={plainOptionsTwo} onChange={this.onChangeCheckTwo} value={this.state.onChangeCheckTwo} /><br /><span className="kong"></span>
              </div>

              <div className="name" style={this.state.onChangeCheck.indexOf('5') !== -1 ? { display: 'block' } : { display: 'none' }}>
                <span className="symbol" style={{ marginLeft: '-30px' }}>*</span><span className="boTitle" style={{ marginLeft: '-20px' }}>足球场地类型</span><span className="kong"></span>
                <Checkbox.Group options={plainOptionsThree} onChange={this.onChangeCheckThree} value={this.state.onChangeCheckThree} /><br /><span className="kong"></span>
              </div>

              <div className="name" style={this.state.onChangeCheck.indexOf('8') !== -1 ? { display: 'block' } : { display: 'none' }}>
                <span className="symbol" style={{ marginLeft: '-48px' }}>*</span><span className="boTitle" style={{ marginLeft: '-38px' }}>高尔夫场地类型</span><span className="kong"></span>
                <Checkbox.Group options={plainOptionsFour} onChange={this.onChangeCheckFour} value={this.state.onChangeCheckFour} /><br /><span className="kong"></span>
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场地设施</span><span className="kong"></span>
                <Checkbox.Group options={options} onChange={this.onChangeSite} value={this.state.onChangeSite} />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场地介绍</span><span className="kong"></span>
                <TextArea className="textarea" placeholder="请输入场地介绍，如场地规模、特色等。" onChange={this.onChangeText} value={this.state.onChangeText} rows={4} />
              </div>

              <div className="prompt">请注意<span>*</span>为必填项</div>

              <Button className="next" onClick={this.onClickNex}>下一步</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default perfect;
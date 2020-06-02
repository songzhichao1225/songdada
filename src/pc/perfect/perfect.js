import React from 'react';
import './perfect.css';
import 'antd/dist/antd.css';
import { getProvince, getCrty, getArea, PerfectingVenueInformation, getVenueInformation, getVenueSportList, VenueInformationSave } from '../../api';
import { Select, Input, Checkbox, Button, Upload, message, Modal } from 'antd';
import Icon from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;




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


class perfect extends React.Component {

  state = {
    handleArea: '',//省
    handleCity: '',//市,
    handleDistrict: '',//区
    handleName: '',//场馆名称
    handleAddress: this.props.location.query === undefined ? '' : this.props.location.query.adddress,//场馆详细地址
    onChangeCheck: '',//运动项目
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
    plainOptions: []
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
        province: res.data.data.province, city: res.data.data.city, area: res.data.data.area,
        imageRes: res.data.data.firstURL, handelPerson: res.data.data.linkMan, handleTelephone: res.data.data.telephone
      })
    }
  }



  async getVenueSportList(data) {
    const res = await getVenueSportList(data)
    this.setState({
      plainOptions: res.data.data
    })
  }


  componentDidMount() {
    this.getVenueSportList()
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
    localStorage.setItem('handleCity', '')
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
    localStorage.setItem('handleDistrict', '')
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
        console.log(8888)
        this.setState({ handleDistrict: Array.from(getArea)[i].name })
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
    sessionStorage.setItem('onChangeCheck', e)
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
    let fileListT=fileList.slice(0,9)
    if (sessionStorage.getItem('notType') === '1') {
      let filesURLarr = []
      for (let i in fileListT) {
        if (fileListT[i].response === undefined) {
          filesURLarr.push(fileListT[i].url)
        } else {
          filesURLarr.push(fileListT[i].response.data.baseURL + fileListT[i].response.data.filesURL)
        }
      }
      if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")

      } else {
        let sportId = sessionStorage.getItem('onChangeCheck') === null ? this.state.onChangeCheck.split(',') : sessionStorage.getItem('onChangeCheck').split(',')
        let facilitiesId = sessionStorage.getItem('onChangeSite') === null ? this.state.onChangeSite.split(',') : sessionStorage.getItem('onChangeSite').split(',')
        let data = {
          venuename: localStorage.getItem('handleName'),
          lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
          lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
          province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
          city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
          area: this.props.location.district === undefined ? this.state.area : this.props.location.query.district,
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
        }
        if (data.facilities === '') {
          message.error('请选择至少一项运动设施')
        } else if (data.venuename === '') {
          message.error('请填写场馆名称')
        } else if (data.linkMan === '') {
          message.error('请填写联系人')
        } else if (data.telephone === '') {
          message.error('请输入联系人电话')
        } else if (data.sport === '') {
          message.error('请选择运动项目')
        } else {
          this.VenueInformationSave(data)
        }
      }

    } else {
      let filesURLarr = []
      for (let i in fileListT) {
        filesURLarr.push(fileListT[i].response.data.baseURL + fileListT[i].response.data.filesURL)
      }
      if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")

      } else if (this.props.location.query === undefined) {
        message.warning('请选择场馆位置')
      } else {
        let sportId = sessionStorage.getItem('onChangeCheck') === null ? '' : sessionStorage.getItem('onChangeCheck').split(',')
        let facilitiesId = sessionStorage.getItem('onChangeSite') === null ? '' : sessionStorage.getItem('onChangeSite').split(',')
        let data = {
          venueloginuuid: sessionStorage.getItem('uuid'),
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
        }
        if (data.facilities === '') {
          message.error('请选择至少一项运动设施')
        } else if (data.venuename === '') {
          message.error('请填写场馆名称')
        } else if (data.linkMan === '') {
          message.error('请填写联系人')
        } else if (data.telephone === '') {
          message.error('请输入联系人电话')
        } else if (data.sport === '') {
          message.error('请选择运动项目')
        } else {
          this.PerfectingVenueInformation(data)
        }
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
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginLeft: 45, marginTop: 13.5 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          <div className="content">
            <div className="nav">
              <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
              <div><span>2.完善场馆信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
              <div><span>3.等待审核</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
              <div><span>4.审核成功</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
            </div>
            <div className="contentSon">
              <span className="titile">场馆基本信息</span>
              <div className="area">
                <span className="symbol">*</span><span className="boTitle">选择地区</span>
                <Select value={localStorage.getItem('handleArea') === null ? '请选择' : localStorage.getItem('handleArea')} className="one" style={{ width: 118 }} onChange={this.handleArea}>
                  {
                    data.map((item, i) => {
                      return <Option key={i} value={item.id} >{item.name}</Option>
                    })
                  }
                </Select>
                <span>省</span>
                <Select value={localStorage.getItem('handleCity') === null || localStorage.getItem('handleCity') === '' ? '请选择' : localStorage.getItem('handleCity')} className="one" style={{ width: 118 }} onChange={this.handleCity}>
                  {
                    cityT.map((item, i) => {
                      return <Option key={i} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                <span>市</span>
                <Select value={localStorage.getItem('handleDistrict') === '' ? '请选择' : localStorage.getItem('handleDistrict')} className="one" style={{ width: 118 }} onChange={this.handleDistrict}>
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
                <span className="symbol">*</span><span className="boTitle">联<span style={{paddingLeft:8}}>系</span><span style={{paddingLeft:8}}>人</span></span>
                <Input className="nameINput" onChange={this.handelPerson} style={{ marginLeft: '27px' }} value={this.state.handelPerson} placeholder="请输入联系人姓名" />
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
                    multiple={true}
                    fileNumLimit='5'
                    name="files"
                    action="/api/UploadVenueImgs?type=Venue"
                    listType="picture-card"
                    fileList={fileList.slice(0,9)}
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

              <div className="name" style={{ overflow: 'hidden' }}>
                <span className="symbol">*</span><span className="boTitle">运动项目</span><span className="kong"></span>
                <Checkbox.Group style={{ float: 'left', width: '80%', marginLeft: '26.8px' }} options={this.state.plainOptions} onChange={this.onChangeCheck} value={this.state.onChangeCheck} /><br /><span className="kong"></span>
              </div>


              <div className="name" >
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
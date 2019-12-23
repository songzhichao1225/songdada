import React from 'react';
import './stadiumInformationPh.css';

import { Toast, Picker, List,InputItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Upload, Checkbox, Icon, Modal, Button } from 'antd';
import { PerfectingVenueInformation, getVenueInformation, VenueInformationSave } from '../../api';
let arr = require('./address.json');
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

  return isJpgOrPng
}


class stadiumInformationPh extends React.Component {

  state = {
    province: '',
    getCrty: '',
    address: '',
    lat: '',
    lng: '',
    addressId: '', //选择省市区id
    addressArr: '',//选择省市区名称
    addressXian: '',
    previewVisible: false,
    fileList: [],
    imageRes: '',
    stadiumName: '',//场馆名称
    onChangeRun: null,//运动项目
    onChangeCheck: null,//设施
    textKo: '',//介绍场馆
    beforeList: [],
    pickerValue: '',
    arrCity: [],
    arrCityNum: [],
    arrCouty: [],
    arrCoutyNum: [],
    arrPro: [],
    arrProNum: [],
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }
      this.setState({
        address: res.data.data.position, addressXian: res.data.data.address, stadiumName: res.data.data.name,
        imageUrl: res.data.data.firstURL, fileList: arrImg, onChangeRun: res.data.data.sport, onChangeCheck: res.data.data.facilities, textKo: res.data.data.siteInfo,
        lat: res.data.data.lat, lng: res.data.data.lng
      })
    }


  }



  componentDidMount() {

    if (sessionStorage.getItem('notType') === '1') {
      this.getVenueInformation()
    } else if (this.props.location.query !== undefined) {
      this.setState({
        addressXian: this.props.location.query.adddress,
        address: this.props.location.query.adddress,
        lat: this.props.location.query.lat,
        lng: this.props.location.query.lng
      })
    }
    let arrCity = []
    let arrCityNum = []
    for (let i in arr) {
      for (let j in arr[i].children) {
        arrCity.push(arr[i].children[j].label)
        arrCityNum.push(arr[i].children[j].value)
      }
    }  //市

    let arrCouty = []
    let arrCoutyNum = []
    for (let i in arr) {
      arrCouty.push(arr[i].label)
      arrCoutyNum.push(arr[i].value)
    }  //省


    let arrPro = []
    let arrProNum = []
    for (let i in arr) {
      for (let j in arr[i].children) {
        for (let k in arr[i].children[j].children) {
          arrPro.push(arr[i].children[j].children[k].label)
          arrProNum.push(arr[i].children[j].children[k].value)
        }
      }
    }  //区县

    let se = sessionStorage.getItem('addressId').split(',')
    let arrBack = []
    for (let i in se) {
      arrBack.push(Number(se[i]))
    }
    this.setState({ arrCity: arrCity, arrCityNum: arrCityNum, arrCouty: arrCouty, arrCoutyNum: arrCoutyNum, arrProNum: arrProNum, arrPro: arrPro, addressId: arrBack })

  }


  mapPh = () => {
    if (sessionStorage.getItem('addressId') !== null) {
      this.props.history.push('/mapPh')
    } else {
      Toast.fail('请选择省市区', 1);
    }
  }
  xaingxi = e => {
    this.setState({ addressXian: e })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      )
    }
  }

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

  handleCancel = () => this.setState({ previewVisible: false });

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      sessionStorage.setItem('siteId', res.data.data.siteUUID)
      this.props.history.push('/qualificationPh')
    } else {
      Toast.fail(res.data.msg, 1);
      this.props.history.push('/login')
    }
  }
  stadiumName = e => {
    this.setState({ stadiumName: e })
  }
  onChangeRun = e => {
    this.setState({ onChangeRun: e })
  }
  onChangeCheck = e => {
    this.setState({ onChangeCheck: e })
  }
  textKo = e => {
    this.setState({ textKo: e.target.value })
  }





  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      sessionStorage.setItem('siteId', res.data.data.siteUUID)
      this.props.history.push('/qualificationPh')
    }

  }


  next = () => {
    let { stadiumName, lat, lng, imageUrl, addressXian, address, fileList, imageRes, onChangeRun, onChangeCheck, textKo } = this.state


    if (sessionStorage.getItem('notType') === '1') {
      let arrimg = []
      for (let i in fileList) {
        if (fileList[i].response === undefined) {
          arrimg.push(fileList[i].url)
        } else {
          arrimg.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
        }
      }

      let data = {
        venuename: stadiumName,
        lat: lat,
        lng: lng,
        address: address,
        filesURL: arrimg.join('|'),
        firstURL: imageUrl,
        siteInfo: textKo,
        comment: '',
        linkMan: '',
        telephone: '',
        position: addressXian,
        type: 1
      }
      if (typeof (onChangeRun) === 'string') {
        data.sport = onChangeRun
      } else {
        data.sport = onChangeRun.join(',')
      }

      if (typeof (onChangeCheck) === 'string') {
        data.facilities = onChangeCheck
      } else {
        data.facilities = onChangeCheck.join(',')
      }
      this.VenueInformationSave(data)

    } else {
      let arrimg = []
      for (let i in fileList) {
        arrimg.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
      }
      if (arrimg.length < 3) {
        Toast.fail('最少上传三张场地照', 1);
      } else {
        let data = {
          venueloginuuid: localStorage.getItem('uuid'),
          province: sessionStorage.getItem('province'),
          city: sessionStorage.getItem('city'),
          area: sessionStorage.getItem('county'),
          venuename: stadiumName,
          lat: lat,
          lng: lng,
          address: address,
          filesURL: arrimg.join('|'),
          firstURL: imageRes,
          sport: onChangeRun === '' ? '' : onChangeRun.join(','),
          facilities: onChangeCheck === '' ? '' : onChangeCheck.join(','),
          siteInfo: textKo,
          position: addressXian,
        }
        this.PerfectingVenueInformation(data)
      }
    }
  }

  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack()
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1');
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  onOk = (e) => {
    sessionStorage.setItem('province', this.state.arrCouty[this.state.arrCoutyNum.indexOf(e[0])])
    sessionStorage.setItem('city', this.state.arrCity[this.state.arrCityNum.indexOf(e[1])])
    sessionStorage.setItem('county', this.state.arrPro[this.state.arrProNum.indexOf(e[2])])
    sessionStorage.setItem('addressId', e)
    this.setState({ addressId: e, addressArr: [this.state.arrCouty[this.state.arrCoutyNum.indexOf(e[0])],this.state.arrCity[this.state.arrCityNum.indexOf(e[1])],this.state.arrPro[this.state.arrProNum.indexOf(e[2])]] })


  }


  render() {

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>门脸照</div>
      </div>
    )
    const { imageUrl } = this.state;

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>场地照</div>
      </div>
    )



    return (
      <div className="stadiumInformationPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span>审核  ></span> <span>成功</span><Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }} /> </div>
        <div className="boss">
          <div className="input">

            <Picker
              data={arr}
              title="选择地区"
              value={this.state.addressId}
              onOk={this.onOk}
            >
              <List.Item arrow="horizontal">选择地区</List.Item>
            </Picker>
          </div>



          <div className="input">
            <span>场馆位置</span>
            <InputItem
              placeholder="点击图标选择地址"
              value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.address}
              style={{ fontSize: '0.6rem' }}
              className="select"
              disabled={true}
              onClick={this.mapPh} 
            >
            </InputItem>
            <img className="imgAddress" onClick={this.mapPh} src={require("../../assets/icon_pc_dingwei.png")} alt="地址" />
          </div>

          <div className="input">
            <span>详细地址</span>
            <InputItem
              placeholder="请输入详细地址"
              value={this.props.location.query !== undefined ? this.props.location.query.adddress : this.state.addressXian}
              style={{ fontSize: '0.6rem' }}
              className="select"
              onChange={this.xaingxi}
            >
            </InputItem>
          </div>

          <div className="input">
            <span>场馆名称</span>
            <InputItem
              placeholder="请输入场馆名称"
              value={this.state.stadiumName}
              style={{ fontSize: '0.6rem' }}
              className="select"
              onChange={this.stadiumName}
            >
            </InputItem>
          </div>
          <div className="input">
            <span>门脸照</span>
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
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>

          <div className="input">
            <span>场地照片 (请上传3-9张)</span>
            <Upload
              name="files"
              action="/api/UploadVenueImgs?type=Venue"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChangeT}
              accept="image/*"
              multiple={false}
            >
              {fileList.length >= 8 ? null : uploadButtonT}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          <div className="input">
            <span>运动项目</span>
            <Checkbox.Group options={plainOptions} value={this.state.onChangeRun} onChange={this.onChangeRun} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场地设施</span>
            <Checkbox.Group options={options} style={{ fontSize: '0.75rem' }} value={this.state.onChangeCheck} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场地介绍</span>
            <TextArea rows={3} maxLength={200} onChange={this.textKo} style={{ padding: '0' }} value={this.state.textKo} placeholder="请输入场地介绍，如场地规模、特色等。" />
          </div>
          <Button className="btn" onClick={this.next}>下一步</Button>




        </div>
      </div>
    );
  }
}

export default stadiumInformationPh;
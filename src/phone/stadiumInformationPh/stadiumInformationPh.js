import React from 'react';
import './stadiumInformationPh.css';

import { Toast, Picker, List, InputItem, NavBar, Popover } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Upload, Checkbox, Modal, Button } from 'antd';
import {LeftOutlined,EllipsisOutlined} from '@ant-design/icons';
import { PerfectingVenueInformation, getVenueInformation, VenueInformationSave,getVenueSportList } from '../../api';
let arr = require('./address.json');
const { TextArea } = Input;
const Item = Popover.Item;

const options = [ { label: '停车场', value: '1' },{ label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' }]

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}



function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
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
    addressXian: this.props.location.query !== undefined ? this.props.location.query.adddress:'',
    previewVisible: false,
    fileList: [],
    imageRes: '',
    stadiumName: '',//场馆名称
    onChangeRun: [],//运动项目
    onChangeRunTai: [],//台球类型
    onChangeRunZu: [],//足球类型
    onChangeRunGao: [],//高尔夫类型
    onChangeCheck: [],//设施
    textKo: '',//介绍场馆
    beforeList: [],
    pickerValue: '',
    arrCity: [],
    arrCityNum: [],
    arrCouty: [],
    arrCoutyNum: [],
    arrPro: [],
    arrProNum: [],
    linkMan: '',
    telephone: '',
    plainOptions:[]
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
     if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }
      this.setState({
        address: res.data.data.position, addressXian: res.data.data.address, stadiumName: res.data.data.name,
        telephone: res.data.data.telephone.replace(/\s*/g,""), linkMan: res.data.data.linkMan,
        imageUrl: res.data.data.firstURL, fileList: arrImg, onChangeRun: res.data.data.sport, onChangeRunTai: '',
        onChangeRunZu: '', onChangeRunGao:'',
        onChangeCheck: res.data.data.facilities, textKo: res.data.data.siteInfo,
        lat: res.data.data.lat, lng: res.data.data.lng
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
      this.setState({
        stadiumName:sessionStorage.getItem('stadiumName')
      })
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
    let arrBack = []
    if (sessionStorage.getItem('addressId') !== null) {
      let se = sessionStorage.getItem('addressId').split(',')

      for (let i in se) {
        arrBack.push(Number(se[i]))
      }
    } else {
      arrBack = []
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
    console.log(e)
    this.setState({ addressXian: e })
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
        })
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
    } else if(res.data.code===4000) {
      Toast.fail(res.data.msg, 1);
      this.props.history.push('/login')
    }else{
      Toast.fail(res.data.msg, 1);
    }
  }
  stadiumName = e => {
    this.setState({ stadiumName: e })
    sessionStorage.setItem('stadiumName',e)
  }
  onChangeRun = e => {

    this.setState({ onChangeRun: e })
    if (e.indexOf('3') === -1) {
      this.setState({ onChangeRunTai: '' })
    } else if (e.indexOf('5') === -1) {
      this.setState({ onChangeRunZu: '' })
    } else if (e.indexOf('8') === -1) {
      this.setState({ onChangeRunGao: '' })
    }
  }

  onChangeRunTai = e => {
    this.setState({ onChangeRunTai: e })
  }
  onChangeRunZu = e => {
    this.setState({ onChangeRunZu: e })
  }
  onChangeRunGao = e => {
    this.setState({ onChangeRunGao: e })
  }
  onChangeCheck = e => {
    this.setState({ onChangeCheck: e })
  }
  textKo = e => {
    this.setState({ textKo: e.target.value })
  }

  linkMan = e => {
    this.setState({ linkMan: e })
  }

  telephone = e => {
    this.setState({ telephone: e })
  }



  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, localStorage.getItem('venue_token'))
     if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1)
      sessionStorage.setItem('siteId', res.data.data.siteUUID)
      this.props.history.push('/qualificationPh')
    }
  }


  next = () => {
    let { stadiumName, lat, lng, linkMan, telephone, imageUrl, addressXian, address, fileList, imageRes, onChangeRun, onChangeRunTai, onChangeRunZu, onChangeRunGao, onChangeCheck, textKo } = this.state
    if (sessionStorage.getItem('notType') === '1') {
      let arrimg = []
      for (let i in fileList.slice(0,9)) {
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
        linkMan: linkMan,
        telephone: telephone.replace(/\s*/g,""),
        position: addressXian,
        sporttype: onChangeRunTai + '|' + onChangeRunZu + '|' + onChangeRunGao,
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
      console.log(onChangeRun)
      let arrimg = []
      for (let i in fileList.slice(0,9)) {
        arrimg.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
      }
      if (sessionStorage.getItem('province')=== null) {
        Toast.fail('请先选择地区', 1)
      } else if (stadiumName=== null) {
        Toast.fail('请输入场馆名称', 1)
      } else if (lat === '') {
        Toast.fail('请选择场馆位置', 1)
      }else if(imageRes===''){
        Toast.fail('请选择场馆门脸照', 1)
      } else if (arrimg.length < 3) {
        Toast.fail('最少上传三张场地照', 1)
      }else if(onChangeRun.length===0){
        Toast.fail('请选择场地类型', 1)
      }else if(onChangeCheck.length===0){
        Toast.fail('请选择场地设施', 1)
      }else if(textKo===''){
        Toast.fail('请输入场地介绍', 1)
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
          sporttype: onChangeRunTai + '|' + onChangeRunZu + '|' + onChangeRunGao,
          facilities: onChangeCheck === '' ? '' : onChangeCheck.join(','),
          siteInfo: textKo,
          linkMan: linkMan,
          telephone: telephone.replace(/\s*/g,""),
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


  reture = () => {
    this.props.history.push('/login')
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1')===-1) {
      this.props.history.push('/phone')
    } else {
      this.close()
    }
  }

  onOk = (e) => {
    sessionStorage.setItem('province', this.state.arrCouty[this.state.arrCoutyNum.indexOf(e[0])])
    sessionStorage.setItem('city', this.state.arrCity[this.state.arrCityNum.indexOf(e[1])])
    sessionStorage.setItem('county', this.state.arrPro[this.state.arrProNum.indexOf(e[2])])
    sessionStorage.setItem('addressId', e)
    this.setState({ addressId: e, addressArr: [this.state.arrCouty[this.state.arrCoutyNum.indexOf(e[0])], this.state.arrCity[this.state.arrCityNum.indexOf(e[1])], this.state.arrPro[this.state.arrProNum.indexOf(e[2])]] })
  }


  render() {

    const uploadButton = (
      <div>
       
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>门脸照</div>
      </div>
    )
    const { imageUrl } = this.state;

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButtonT = (
      <div>
        
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>场地照</div>
      </div>
    )

  
    return (
      <div className="stadiumInformationPh">
        <NavBar
          mode="dark"
          icon={ <LeftOutlined  onClick={this.reture} />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1')===-1? '返回官网' : '关闭'}</Item>),
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
        ><span style={{ fontSize: '1rem' }}>完善信息</span></NavBar>
        <div className="boss">
          <div className="input">

            <Picker
              data={arr}
              title="选择地区"
              value={this.state.addressId}
              onOk={this.onOk}
              extra="选择省份   选择市   选择区/县"
            >
              <List.Item arrow="horizontal" style={{fontSize:'16px'}}>选择地区</List.Item>
            </Picker>
          </div>

          <div className="input">
            <span>场馆名称</span>
            <InputItem
              placeholder="请输入场馆名称"
              value={this.state.stadiumName}
              style={{ fontSize: '0.8rem' }}
              className="select"
              onChange={this.stadiumName}
            >
            </InputItem>
          </div>

          <div className="input">
            <span>场馆位置</span>
            <img className="imgAddress" onClick={this.mapPh} src={require("../../assets/icon_pc_dingwei.png")} alt="地址" />
            <InputItem
              placeholder="点击图标选择地址"
              value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.address}
              style={{ fontSize: '0.8rem' }}
              className="select selectOne"
              disabled={true}
              onClick={this.mapPh}
            >
            </InputItem>
           
          </div>

          <div className="input">
            <span>详细地址</span>
            <InputItem
              placeholder="请输入详细地址"
              value={this.state.addressXian}
              style={{ fontSize: '0.8rem' }}
              className="select"
              onChange={this.xaingxi}
            >
            </InputItem>
          </div>



          <div className="input">
            <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
            <InputItem
              placeholder="请输入场馆联系人"
              value={this.state.linkMan}
              style={{ fontSize: '0.8rem'}}
              className="select"
              onChange={this.linkMan}
            >
            </InputItem>
          </div>

          <div className="input">
            <span>联系电话</span>
            <InputItem
              type='phone'
              placeholder="请输入场馆联系人电话"
              value={this.state.telephone}
              style={{ fontSize: '0.8rem' }}
              className="select"
              onChange={this.telephone}
            >
            </InputItem>
          </div>



          <div className="input">
            <span style={{lineHeight:'5rem'}}>门脸照</span>
            
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
              {imageUrl ? <div className="avatar"><img src={imageUrl} alt="avatar" style={{ width: '100%',height:'100%',position:'absolute',left:'50%',marginLeft:'-2rem',top:'0' }} /></div> : uploadButton}
            </Upload>
            
          </div>

          <div className="input">
            <span>场地照片 (请上传3-8张)</span>
            <Upload
              name="files"
              action="/api/UploadVenueImgs?type=Venue"
              listType="picture-card"
              fileList={fileList.slice(0,9)}
              onPreview={this.handlePreview}
              onChange={this.handleChangeT}
              accept="image/*"
              multiple={true}
            >
              {fileList.length >= 8 ? null : uploadButtonT}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          <div className="input">
            <span>场地类型</span>
            <Checkbox.Group options={this.state.plainOptions} value={this.state.onChangeRun} onChange={this.onChangeRun} /><br /><span className="kong"></span>
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
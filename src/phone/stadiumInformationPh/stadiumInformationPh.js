import React from 'react';
import './stadiumInformationPh.css';
import { Input, Cascader, Upload, Checkbox, Icon,Modal,Button, message } from 'antd';
import {PerfectingVenueInformation } from '../../api';
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
    previewVisible:false,
    fileList: [],
    imageRes:'',
    stadiumName:'',//场馆名称
    onChangeRun:'',//运动项目
    onChangeCheck:'',//设施
    textKo:'',//介绍场馆
  };




  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.setState({
        addressXian: this.props.location.query.adddress,
        address: this.props.location.query.adddress,
        lat: this.props.location.query.lat,
        lng: this.props.location.query.lng
      })
    }
  }


  selectChange = (value, selectedOptions) => {
    let addressArr = []
    for (let i in selectedOptions) {
      addressArr.push(selectedOptions[i].label)
    }
    sessionStorage.setItem('province', addressArr[0])
    sessionStorage.setItem('city', addressArr[1])
    sessionStorage.setItem('county', addressArr[2])
    sessionStorage.setItem('addressId', value)
    this.setState({ addressId: value, addressArr: addressArr })
  }


  mapPh = () => {
    if(sessionStorage.getItem('addressId')!==null){
      this.props.history.push('/mapPh')
    }else{
      message.error('请选择省市区')
    }
    
  }
  xaingxi = e => {
    this.setState({ addressXian: e.target.value })
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
      );
    }
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

   handleChangeT = ({ fileList }) => this.setState({ fileList });

   handleCancel = () => this.setState({ previewVisible: false });

   async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
    if(res.data.code===2000){
      message.info(res.data.msg)
      sessionStorage.setItem('siteId',res.data.data.siteUUID)
      this.props.history.push('/qualificationPh')
    }else{
      message.error(res.data.msg)
      this.props.history.push('/login')
    }
  }
  stadiumName=e=>{
    this.setState({stadiumName:e.target.value})
  }
  onChangeRun=e=>{
    this.setState({onChangeRun:e})
  }
  onChangeCheck=e=>{
    this.setState({onChangeCheck:e})
  }
  textKo=e=>{
    this.setState({textKo:e.target.value})
  }

   next=()=>{
     let {stadiumName,lat,lng,addressXian,address,fileList,imageRes,onChangeRun,onChangeCheck,textKo}=this.state
     let arrimg=[]
     for(let i in fileList){
      arrimg.push(fileList[i].response.data.baseURL+ fileList[i].response.data.filesURL)
     }
     if(arrimg.length<2){
      message.error('最少上传两张场地照')
     }else{
      let data={
        venueloginuuid:localStorage.getItem('uuid'),
        province:sessionStorage.getItem('province'),
        city:sessionStorage.getItem('city'),
        area:sessionStorage.getItem('county'),
        venuename:stadiumName,
        lat:lat,
        lng:lng,
        address:address,
        filesURL:arrimg.join('|'),
        firstURL:imageRes,
        sport:onChangeRun.join('|'), 
        facilities:onChangeCheck.join('|'),
        siteInfo:textKo,
        position:addressXian,
       }
      this.PerfectingVenueInformation(data)
     }
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



  render() {

    const uploadButton = (
      <div>
          <Icon type="plus" />
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}>门脸照</div>
      </div>
    );
    const { imageUrl } = this.state;

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}>场地照</div>
      </div>
    );
   

    return (
      <div className="stadiumInformationPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span>审核  ></span> <span>成功</span><Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }} /> </div>

        <div className="headTtitle">完善场馆基本信息</div>
        <div style={{height:'0.63rem',background:'rgba(243,243,243,1)'}}></div>
        <div className="boss">
          <div className="input">
            <span>选择地区</span>
            <Cascader
              className="select"
              options={arr}
              onChange={this.selectChange}
              placeholder="选择省市区"
              value={sessionStorage.getItem('addressId') === null ? '' : [parseInt(sessionStorage.getItem('addressId').split(',')[0]), parseInt(sessionStorage.getItem('addressId').split(',')[1]), parseInt(sessionStorage.getItem('addressId').split(',')[2])]}
            />
          </div>

         

          <div className="input">
            <span>场馆位置</span>
            <Input className="select" value={this.state.address} placeholder="请选择" />
            <img className="imgAddress" onClick={this.mapPh} src={require("../../assets/icon_pc_dingwei.png")} alt="地址" />
          </div>

          <div className="input">
            <span>详细地址</span>
            <Input className="select" value={this.state.addressXian} onChange={this.xaingxi} placeholder="请输入" />
          </div>

          <div className="input">
            <span>场馆名称</span>
            <Input className="select" placeholder="请输入" onChange={this.stadiumName}/>
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
              accept=".jpg, .jpeg, .png"
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
              accept=".jpg, .jpeg, .png"
              multiple={false}
            >
              {fileList.length <= 8&&fileList.length >= 3 ? null : uploadButtonT}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          
          <div className="input">
            <span>运动项目</span>
            <Checkbox.Group options={plainOptions} onChange={this.onChangeRun} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场地设施</span>
            <Checkbox.Group options={options} style={{fontSize:'0.75rem'}} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场地介绍</span>
            <TextArea rows={3} maxLength={200} onChange={this.textKo} style={{padding:'0'}} placeholder="请输入场地介绍，如场地规模、特色等。"/>
          </div>
           <Button className="btn" onClick={this.next}>下一步</Button>




        </div>
      </div>
    );
  }
}

export default stadiumInformationPh;
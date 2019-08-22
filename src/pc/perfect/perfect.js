import React from 'react';
import './perfect.css';
import 'antd/dist/antd.css';
import { getProvince, getCrty, getArea,PerfectingVenueInformation } from '../../api';
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
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class perfect extends React.Component {

  state = {
    handleArea: '',//省
    handleCity: '',//市,
    handleDistrict: '',//区
    handleName: '',//场馆名称
    handleAddress: this.props.location.query===undefined?'':this.props.location.query.adddress,//场馆详细地址
    onChangeCheck: '',//运动项目
    onChangeSite: '',//场地设施
    province: '',//获取的省数组
    city: '',//获取市数组
    getArea: '',//获取区县数组
    loadinng: false,
    previewVisible: false,
    previewImage: '',
    imageRes:'',//上传门脸照的返回
    onChangeText:'',//输入框
    fileList: [
    ],
  };
  componentDidMount() {
    this.getProvince()
    if(sessionStorage.getItem('handleAreaId')!==null){
      this.getCrty({ parent:sessionStorage.getItem('handleAreaId') })
    }
    if(sessionStorage.getItem('handleCityId')!==null){
      this.getArea({ crty: sessionStorage.getItem('handleCityId') })
    }
   
  };

  


  handleArea = e => {
     let {province}=this.state
     for(let i in  Array.from(province)){
        if(Array.from(province)[i].id===e){
          sessionStorage.setItem('handleArea',Array.from(province)[i].name)
          sessionStorage.setItem('handleAreaId',Array.from(province)[i].id)
        }
     }
    this.getCrty({ parent:sessionStorage.getItem('handleAreaId') })
  }
  handleCity = e => {
    let {city}=this.state
     for(let i in  Array.from(city)){
        if(Array.from(city)[i].id===e){
          sessionStorage.setItem('handleCity',Array.from(city)[i].name)
          sessionStorage.setItem('handleCityId',Array.from(city)[i].id)
        }
     }
    this.getArea({ crty: sessionStorage.getItem('handleCityId') })
  }
  handleDistrict = e => {
    let {getArea}=this.state
    for(let i in  Array.from(getArea)){
       if(Array.from(getArea)[i].id===e){
         sessionStorage.setItem('handleDistrict',Array.from(getArea)[i].name)
         sessionStorage.setItem('handleDistrictId',Array.from(getArea)[i].id)
       }
    }
  }
  routerMap=()=>{
    if( sessionStorage.getItem('handleDistrict')!==null){
      this.props.history.push({ pathname: '/map' })
    }else{
      message.info('请先选择地区')
    }
   
  }
  handleName = e => {
    sessionStorage.setItem('handleName',e.target.value)
  }
  handleAddress = e => {
    this.setState({handleAddress:e.target.value})
  }
  onChangeCheck = e => {
    sessionStorage.setItem('onChangeCheck',e)
  }
  onChangeSite = e => {
    sessionStorage.setItem('onChangeSite',e)
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
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response)
      this.setState({imageRes:info.file.response.data.baseURL+info.file.response.data.filesURL})
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
    });
  };

   handleChangeT = ({ fileList }) => this.setState({ fileList });

   onChangeText=e=>{
     this.setState({onChangeText:e.target.value})
   }

  onClickNex=()=>{
    let {imageRes,fileList,handleAddress}=this.state
    let baseURLarr=[]
    let filesURLarr=[]
    for(let i in fileList){
      baseURLarr.push(fileList[i].response.data.baseURL)
      filesURLarr.push(fileList[i].response.data.filesURL)
    }
    let sportId=sessionStorage.getItem('onChangeCheck')===null?'':sessionStorage.getItem('onChangeCheck').split(',')
     let facilitiesId=sessionStorage.getItem('onChangeSite')===null?'':sessionStorage.getItem('onChangeSite').split(',')
     console.log(sportId,facilitiesId)
    let data={
      venueloginuuid:sessionStorage.getItem('uuid'),
      province:sessionStorage.getItem('handleArea'),
      city:sessionStorage.getItem('handleCity'),
      area:sessionStorage.getItem('handleDistrict'),
      venuename:sessionStorage.getItem('handleName'),
      lat:this.props.location.query===undefined?'':this.props.location.query.lat,
      lng:this.props.location.query===undefined?'':this.props.location.query.lng,
      address:handleAddress,
      baseURL:baseURLarr[0],
      filesURL:filesURLarr===null?'':filesURLarr.join('|'),
      firstURL:imageRes,
      sport:sportId===''?[]:sportId.join('|'),
      facilities:facilitiesId===''?[]:facilitiesId.join('|'),
      siteInfo:this.state.onChangeText
    }
    this.PerfectingVenueInformation(data)
  }
 
  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
   console.log(res)
   if(res.data.code===2000){
    this.props.history.push('/qualification')
   }
   
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
    );
    const { imageUrl } = this.state;

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">场地照</div>
      </div>
    );
   
  
    return (
      <div className="perfect">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} alt="6666" />
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
                <Select defaultValue={sessionStorage.getItem('handleArea')===null?'请选择':sessionStorage.getItem('handleArea')} className="one" style={{ width: 118 }} onChange={this.handleArea}>
                  {
                    data.map((item, i) => {
                      return <Option key={i} value={item.id} >{item.name}</Option>
                    })
                  }
                </Select>
                <span>省</span>
                <Select defaultValue={sessionStorage.getItem('handleCity')===null?'请选择':sessionStorage.getItem('handleCity')}  className="one" style={{ width: 118 }} onChange={this.handleCity}>
                  {
                    cityT.map((item, i) => {
                      return <Option key={i} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                <span>市</span>

                <Select defaultValue={sessionStorage.getItem('handleDistrict')===null?'请选择':sessionStorage.getItem('handleDistrict')}  className="one" style={{ width: 118 }} onChange={this.handleDistrict}>
                  {
                    getAreaT.map((item, i) => {
                      return <Option key={i} value={item.id}>{item.name}</Option>
                    })
                  }
                </Select>
                <span>区/县</span>
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆名称</span>
                <Input className="nameINput" onChange={this.handleName}  placeholder="请输入场馆名称" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆位置</span>
                <Input className="nameINput" value={this.props.location.query!==undefined?this.props.location.query.adddress:''} placeholder="请输选择场馆位置" />
                <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">详细地址</span>
                <Input className="nameINput" onChange={this.handleAddress} value={this.state.handleAddress} placeholder="请输入场馆详细地址如门牌号楼层" />
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
                <Checkbox.Group options={plainOptions} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场地设施</span><span className="kong"></span>
                <Checkbox.Group options={options} onChange={this.onChangeSite} />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场地介绍</span><span className="kong"></span>
                <TextArea className="textarea" placeholder="请输入场地介绍，如场地规模、特色等。" onChange={this.onChangeText} rows={4} />
              </div>

              <div className="prompt">请注意<span>*</span>为必填项</div>

              <Button className="next" onClick={this.onClickNex}>下一步</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default perfect;
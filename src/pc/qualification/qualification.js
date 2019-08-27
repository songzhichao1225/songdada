import React from 'react';
import './qualification.css';
import 'antd/dist/antd.css';
import {getIsStatus,VenueQualifications} from '../../api';
import { Input, Radio, Button, Upload, message, Icon } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}



function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('请上传小于2MB的图片');
  }
  return isJpgOrPng && isLt2M;
}


function beforeUploadT(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('请上传小于2MB的图片');
  }
  return isJpgOrPng && isLt2M;
}

function beforeUploadTS(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('请上传小于2MB的图片');
  }
  return isJpgOrPng && isLt2M;
}


class qualification extends React.Component {

  state = {
    handleName: '',//法人姓名
    handleCardId: '',//身份证号
    handlePhone: '',//法人手机号
    handleBankNum: '',//银行卡号
    Radiovalue:'',//选择个人 还是公司
    openingLine:'',//开户行
    siteUUID:'',//场馆Id
    imageRes:'',//营业执照路径
    legalBaseURL:'',//公共路径
    imageReT:'',//身份证正面
    imageReST:'',//反面
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data,sessionStorage.getItem('venue_token'))
     if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({siteUUID:res.data.data.siteUid})
  }
  componentDidMount (){
    
  this.getIsStatus()

  }

  handleName = e => {
    this.setState({ handleName: e.target.value })
  }
  handleCardId = e => {
    this.setState({ handleCardId: e.target.value })
  }
  handlePhone = e => {
    this.setState({ handlePhone: e.target.value })
  }
  handleBankNum = e => {
    this.setState({ handleBankNum: e.target.value })
  }
  openingLine=e=>{
    this.setState({ openingLine: e.target.value })
  }


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response)
      this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  handleChangeT = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response)
      this.setState({ imageReT:info.file.response.data.filesURL,legalBaseURL:info.file.response.data.baseURL  })
      getBase64(info.file.originFileObj, imageUrlT =>
        this.setState({
          imageUrlT,
          loading: false,
        }),
      );
    }
  };


  handleChangeTS = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ imageReST: info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrlS =>
        this.setState({
          imageUrlS,
          loading: false,
        }),
      );
    }
  };

  



  onChangeRadio=e=>{
    this.setState({
      Radiovalue: e.target.value,
    });
   
  }
  
  async VenueQualifications(data) {
    const res = await VenueQualifications(data)
    if(res.data.code!==2000){
  message.error(res.data.msg)
    }else{
      this.props.history.push('/statusAudits')
    }
    
  }
  submit=()=>{
   let { handleName,handleCardId,handlePhone,handleBankNum,Radiovalue,openingLine,siteUUID,imageRes,legalBaseURL,imageReT,imageReST,}=this.state
     
    let data={
      siteUUID:siteUUID,
      lisenceURL:imageRes,
      legalname:handleName,
      legalcard:handleCardId,
      legalphone:handlePhone,
      legalBaseURL:legalBaseURL,
      legalFilesURL:imageReT+'|'+imageReST,
      Settlement:Radiovalue,
      Bankaccount:handleBankNum,
      OpeningBank:openingLine,
    }

  this.VenueQualifications(data)
  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">营业执照</div>
      </div>
    );
    const { imageUrl } = this.state;

    const uploadButtonT = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">( 正面 )</div>
      </div>
    );
    const { imageUrlT } = this.state;

    const uploadButtonS = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">( 反面 )</div>
      </div>
    );
    const { imageUrlS } = this.state;
    return (
      <div className="qualification">
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
              <span className="titile">场馆资质信息</span>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">营业执照</span>
                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                {/* <span className="rightText">上传图片小于3M<br />上传图片尺寸在1200px*860px 之内</span> */}
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人姓名</span>
                <Input className="nameINput" onChange={this.handleName} placeholder="请输入法人姓名" />
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人身份证号</span>
                <Input className="nameINput cardId" maxLength={18} onChange={this.handleCardId} placeholder="请输入法人身份证号" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人手机号</span>
                <Input className="nameINput phone" maxLength={11} onChange={this.handlePhone} placeholder="请输入11位手机号" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人身份证</span>
                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg addimgT"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUploadT}
                  onChange={this.handleChangeT}
                >
                  {imageUrlT ? <img src={imageUrlT} alt="avatar" style={{ width: '100%' }} /> : uploadButtonT}
                </Upload>

                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg addimgT"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUploadTS}
                  onChange={this.handleChangeTS}
                >
                  {imageUrlS ? <img src={imageUrlS} alt="avatar" style={{ width: '100%' }} /> : uploadButtonS}
                </Upload>
                {/* <span className="rightText">上传图片小于3M<br />上传图片尺寸在1200px*860px 之内</span> */}
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">结算账号</span><span className="kong"></span>
                <Radio.Group onChange={this.onChangeRadio} value={this.state.Radiovalue}>
                  <Radio value={0}>公司银行账号</Radio>
                  <Radio value={1}>法人账号</Radio>
                </Radio.Group>
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">银行账号</span>
                <Input className="nameINput" maxLength={19} onChange={this.handleBankNum} placeholder="请输入银行卡号" />
              </div>


              <div className="name">
                <span className="symbol">*</span><span className="boTitle">开户行</span>
                <Input className="nameINput opening " onChange={this.openingLine} placeholder="请输入银行所在支行" />
              </div>
              <div className="prompt">请注意<span>*</span>为必填项</div>

              <Button className="next" onClick={this.submit}>提交</Button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default qualification;
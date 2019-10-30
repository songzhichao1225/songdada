import React from 'react';
import './idCardPh.css';
import { Upload, Icon, Modal,Button, message } from 'antd';
import { } from '../../api';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  return isJpgOrPng
}





class idCardPh extends React.Component {

  state = {
    previewVisible: false,
    imageRes:'',
    imageResT:'',
    imageUrlBaseT:'',
  };

 


  componentDidMount() {


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

  handleChangeT = info => { 
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ imageResT: info.file.response.data.baseURL + info.file.response.data.filesURL,imageUrlBaseT:info.file.response.data.baseURL })
      getBase64(info.file.originFileObj, imageUrlT =>
        this.setState({
          imageUrlT,
          loading: false,
        }),
      ); 
    }
  };

  positive = () => {
    this.setState({ previewVisible: true })
  }
  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  submit=()=>{
    let {imageRes,imageResT,imageUrlBaseT}=this.state
    if(imageRes===''){
      message.error('请上传身份证正面照')
    }else if(imageResT===''){
      message.error('请上传身份证反面照')
    }else{
      this.props.history.push({ pathname: '/qualificationPh', query: {imageRes:imageRes,imageResT:imageRes,imageUrlBaseT:imageUrlBaseT } })
    }
   
  }






  render() {

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">正面</div>
      </div>
    );

    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">反面</div>
      </div>
    );
    const { imageUrl,imageUrlT } = this.state;



    return (
      <div className="idCardPh">
        <div className="headTtitle">请上传您的身份证图片</div>
        <div className="boss">
          <div className="input">
            <span>手持身份证正面照</span>  <span style={{ paddingLeft: '20px', color: '#D85D27' }} onClick={this.positive}>示例图</span>
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
          </div>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '90%' }} src={require("../../assets/zheng.png")} />
          </Modal>




          <div className="input">
            <span>手持身份证反面照</span>  <span style={{ paddingLeft: '20px', color: '#D85D27' }} onClick={this.positive}>示例图</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeT}
            >
              {imageUrlT ? <img src={imageUrlT} alt="avatar" style={{ width: '100%' }} /> : uploadButtonT}
            </Upload>
          </div>
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancelT}>
            <img alt="example" style={{ width: '90%' }} src={require("../../assets/fan.png")} />
          </Modal>


          <Button className="btn" onClick={this.submit}>提交</Button>


        </div>





      </div>
    );
  }
}

export default idCardPh;
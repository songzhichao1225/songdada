import React from 'react';
import './qualification.css';
import { Upload, Input, Button, Radio } from 'antd';
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





class qualification extends React.Component {

  state = {
    place: '请上传手持身份证正反面照片',
    imageRes: '',
    imageResT: '',
    value:1,
  };




  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.setState({ place: '上传成功', imageRes: this.props.location.query.imageRes, imageResT: this.props.location.query.imageResT })
    }

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

  idCard = () => {
    this.props.history.push('/idCardPh')
  }

  radioChange=e=>{
    this.setState({value:e.target.value})
  }
  submit=()=>{
    this.props.history.push('/resultsAuditsPh')
  }








  render() {

    const uploadButton = (
      <div>
        <img src={require("../../assets/menlian.png")} alt='门脸照' />
      </div>
    );
    const { imageUrl } = this.state;



    return (
      <div className="qualification">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span>审核  ></span> <span>成功  ></span> </div>
        <div className="headTtitle">完善场馆资质信息</div>
        <div className="boss">

          <div className="input">
            <span>营业执照</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg left"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>


          <div className="input" onClick={this.idCard}>
            <span>法人身份证</span>
            <img className="arow" src={require("../../assets/right.png")} alt="arrow" />
            <Input className="select" type='number' disabled={true} placeholder={this.state.place} />
          </div>

          <div className="input">
            <span>法人姓名</span>
            <Input className="select" placeholder="请输入姓名" />
          </div>

          <div className="input">
            <span>法人身份证号</span>
            <Input className="select" maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input">
            <span>法人手机号</span>
            <Input className="select" maxLength={11} placeholder="请输入11位手机号码" />
          </div>


          <div className="input">
            <span>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChange} value={this.state.value}>
              <Radio value={1}>公司银行账户</Radio>
              <Radio value={2}>法人账号</Radio>
            </Radio.Group>
          </div>

          <div className="input">
            <span>银行卡号</span>
            <Input className="select" maxLength={11} placeholder="请输入银行卡号" />
          </div>


          <div className="input">
            <span>开户行</span>
            <Input className="select" maxLength={11} placeholder="请输入开户行" />
          </div>
         


          <Button className="btn" onClick={this.submit}>提交</Button>



        </div>


      </div>
    );
  }
}

export default qualification;
import React from 'react';
import './qualificationPh.css';
import { Upload, Input, Button, Radio, message,Select,Tooltip } from 'antd';
import { getIsStatus,getVenueOpenBankList,getVenueOpenBank,getVenueOpenBankProvince,getVenueOpenBankCity,VenueQualifications } from '../../api';
const { Option } = Select;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  return isJpgOrPng
}





class qualificationPh extends React.Component {

  state = {
    place: '请上传手持身份证正反面照片',
    imageResOne: '',//营业执照
    imageRes: '', //身份证正面
    imageResT: '',//身份证反面
    value: 0,
    siteUUID: '',//场馆Id
    imageUrlBaseT: '',//公共路径
    faName: '',//法人姓名
    faIdcard: '',//法人身份证号
    faPhone: '',//法人手机号
    cardId: '',//银行账号
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList:[],//获取的银行
    openingLine:'',
  };


  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ type: res.data.data, flag: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
    }
  }




  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.setState({ place: '上传成功', imageRes: this.props.location.query.imageRes, imageResT: this.props.location.query.imageResT, imageUrlBaseT: this.props.location.query.imageUrlBaseT })
    }
    this.getIsStatus()
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()

  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      sessionStorage.setItem('yinImg', info.file.response.data.baseURL + info.file.response.data.filesURL)
      this.setState({ imageResOne: info.file.response.data.baseURL + info.file.response.data.filesURL })
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

  radioChange = e => {
    this.setState({ value: e.target.value })
  }
  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({ siteUUID: res.data.data.siteUid })
  }
  faName = e => {
    this.setState({ faName: e.target.value })
  }
  faIdcard = e => {
    this.setState({ faIdcard: e.target.value })
  }
  faPhone = e => {
    this.setState({ faPhone: e.target.value })
  }
  cardId = e => {
    this.setState({ cardId: e.target.value })
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backList: res.data.data, flagThree: false })
    }
  }
  provinceChange = e => {
    
    this.setState({ province_id: e })
    this.getVenueOpenBankCity({ province_id: e })

  }

  typeChange = e => {
    this.setState({ bank_id: e })
  }
 
  cityChange = e => {
    this.setState({ city_id: e })
  }
  handleSearch=e=>{
    this.getVenueOpenBankList({bank_id:this.state.bank_id,province_id:this.state.province_id,city_id:this.state.city_id,search_name:e})
}
openingLine = e => {
  this.setState({ openingLine: e})
}

async VenueQualifications(data) {
  const res = await VenueQualifications(data)
  if (res.data.code === 2000) {
     this.props.history.push('/resultsAuditsPh')
     message.info(res.data.msg)
  }else{
    message.error(res.data.msg)
  }
}
  submit = () => {
    let { siteUUID, imageRes, imageResT, imageUrlBaseT, faName, faIdcard, faPhone, value, cardId,openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      lisenceURL: sessionStorage.getItem('yinImg'),
      legalname: faName,
      legalcard: faIdcard,
      legalphone: faPhone,
      legalBaseURL: imageUrlBaseT,
      legalFilesURL: imageRes + '|' + imageResT,
      Settlement: value,
      Bankaccount: cardId,
      OpeningBank:openingLine
    }

    this.VenueQualifications(data)
  }









  render() {

    const uploadButton = (
      <div>
        <img src={require("../../assets/menlian.png")} alt='门脸照' />
      </div>
    );
    const { imageUrl } = this.state;



    return (
      <div className="qualificationPh">
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
            <Input className="select" disabled={true} placeholder={this.state.place} />
          </div>

          <div className="input">
            <span>法人姓名</span>
            <Input className="select" onChange={this.faName} placeholder="请输入姓名" />
          </div>

          <div className="input">
            <span>法人身份证号</span>
            <Input className="select" onChange={this.faIdcard} maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input">
            <span>法人手机号</span>
            <Input className="select" maxLength={11} onChange={this.faPhone} placeholder="请输入11位手机号码" />
          </div>


          <div className="input">
            <span>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChange} value={this.state.value}>
              <Radio value={0}>公司银行账户</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>

          <div className="input">
            <span>银行卡号</span>
            <Input className="select" maxLength={21} onChange={this.cardId} placeholder="请输入银行卡号" />
          </div>

          <div className="input">
            <span>开户所在地</span>
            <Select placeholder="银行类型" style={{ width: '5rem', height: '2.9rem' }} loading={this.state.flag} onChange={this.typeChange}>
                  {
                    this.state.type.map((item, i) => (
                      <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在省" style={{ width: '5rem', height: '2.9rem' }} loading={this.state.flagTwo} onChange={this.provinceChange}>
                  {
                    this.state.backProvince.map((item, i) => (
                      <Option key={i} value={item.province_id}>{item.province}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在市" style={{ width: '5rem', height: '2.9rem'}} loading={this.state.flagThree} onChange={this.cityChange}>
                  {
                    this.state.backCity.map((item, i) => (
                      <Option key={i} value={item.city_id}>{item.city}</Option>
                    ))
                  }
                </Select>
          </div>


          <div className="input">
            <span>开户行</span>
            <Select
                  showSearch
                  style={{ width: '15rem', height: '2.9rem',}}
                  onSearch={this.handleSearch}
                  onChange={this.openingLine}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  notFoundContent={null}
                >
                  {
                    this.state.backList.map((item,i)=>(
                      <Option key={i} value={item.sub_branch_name} alt={item.sub_branch_name}>
                        <Tooltip title={item.sub_branch_name}>
                      <span>{item.sub_branch_name}</span>
                    </Tooltip></Option>
                    ))
                  } 
                </Select>
          </div> 



          <Button className="btn" onClick={this.submit}>提交</Button>



        </div>


      </div>
    );
  }
}

export default qualificationPh;
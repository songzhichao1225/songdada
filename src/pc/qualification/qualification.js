import React from 'react';
import './qualification.css';
import 'antd/dist/antd.css';
import { getIsStatus, VenueQualifications, getVenueOpenBank, getVenueOpenBankProvince, getVenueOpenBankCity, getVenueOpenBankList, getVenueQualificationInformation, VenueQualificationInformationSave } from '../../api';
import { Input, Radio, Button, Upload, message, Icon, Select, Tooltip } from 'antd';
const { Option } = Select;
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
    Radiovalue: '',//选择个人 还是公司
    openingLine: '',//开户行
    siteUUID: '',//场馆Id
    imageRes: '',//营业执照路径
    legalBaseURL: '',//公共路径
    imageReT: '',//身份证正面
    imageReST: '',//反面
    flag: true,
    flagTwo: true,
    flagThree: true,
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({ siteUUID: res.data.data.siteUid })
  }





  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ type: res.data.data, flag: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
    }
  }



  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backList: res.data.data, flagThree: false })
    }
  }


  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code === 2000) {
      this.setState({
        imageUrl: res.data.data.lisenceURL, handleName: res.data.data.legalname, handleCardId: res.data.data.legalcard, imageRes: res.data.data.lisenceURL,
        handlePhone: res.data.data.legalphone, Radiovalue: res.data.data.Settlement, handleBankNum: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank, legalBaseURL: res.data.data.legalBaseURL,
        imageReT: res.data.data.legalFilesURL.split('|')[0], imageReST: res.data.data.legalFilesURL.split('|')[1], imageUrlT: res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0],
        imageUrlS: res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1]
      })
    }
  }



  componentDidMount() {
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()
    this.getIsStatus()
    this.getVenueQualificationInformation()
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

  handleSearch = e => {
    this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
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
  openingLine = e => {
    this.setState({ openingLine: e })
  }


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
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
      this.setState({ imageReT: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
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





  onChangeRadio = e => {
    this.setState({
      Radiovalue: e.target.value,
    });

  }

  async VenueQualifications(data) {
    const res = await VenueQualifications(data)
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      this.props.history.push('/statusAudits')
    }
  }




  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      this.props.history.push('/statusAudits')
    }
  }


  submit = () => {
    let { handleName, handleCardId, handlePhone, handleBankNum, Radiovalue, openingLine, siteUUID, imageRes, legalBaseURL, imageReT, imageReST, } = this.state
    if (sessionStorage.getItem('notType') === '1') {

      let data = {
        lisenceURL: imageRes,
        legalname: handleName,
        legalcard: handleCardId,
        legalphone: handlePhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageReT + '|' + imageReST,
        Settlement: Radiovalue,
        Bankaccount: handleBankNum,
        OpeningBank: openingLine,
      }
      this.VenueQualificationInformationSave(data)
    } else {
      let data = {
        siteUUID: siteUUID,
        lisenceURL: imageRes,
        legalname: handleName,
        legalcard: handleCardId,
        legalphone: handlePhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageReT + '|' + imageReST,
        Settlement: Radiovalue,
        Bankaccount: handleBankNum,
        OpeningBank: openingLine,
      }
      this.VenueQualifications(data)
    }

  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">营业执照</div>
      </div>
    )
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
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人姓名</span>
                <Input className="nameINput" onChange={this.handleName} value={this.state.handleName} placeholder="请输入法人姓名" />
              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人身份证号</span>
                <Input className="nameINput cardId" maxLength={18} value={this.state.handleCardId} onChange={this.handleCardId} placeholder="请输入法人身份证号" />
              </div> 
               
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">法人手机号</span>
                <Input className="nameINput phone" maxLength={11} value={this.state.handlePhone} onChange={this.handlePhone} placeholder="请输入11位手机号" />
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
                <Input className="nameINput" maxLength={19} onChange={this.handleBankNum} value={this.state.handleBankNum} placeholder="请输入银行卡号" />
              </div>
              
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">开户行所在地</span>
                <Select placeholder="银行类型" style={{ width: 120, height: '35px', marginLeft: '27px' }} loading={this.state.flag} onChange={this.typeChange}>
                  {
                    this.state.type.map((item, i) => (
                      <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在省" style={{ width: 120, height: '35px', marginLeft: '27px' }} loading={this.state.flagTwo} onChange={this.provinceChange}>
                  {
                    this.state.backProvince.map((item, i) => (
                      <Option key={i} value={item.province_id}>{item.province}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在市" style={{ width: 120, height: '35px', marginLeft: '27px' }} loading={this.state.flagThree} onChange={this.cityChange}>
                  {
                    this.state.backCity.map((item, i) => (
                      <Option key={i} value={item.city_id}>{item.city}</Option>
                    ))
                  }
                </Select>
              </div>
              
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">开户行</span>
                <Select
                  showSearch
                  style={{ width: 273, height: '36px', marginLeft: '75px' }}
                  onSearch={this.handleSearch}
                  onChange={this.openingLine}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  notFoundContent={null}
                  value={this.state.openingLine}
                >
                  {
                    this.state.backList.map((item, i) => (
                      <Option key={i} value={item.sub_branch_name} alt={item.sub_branch_name}>
                        <Tooltip title={item.sub_branch_name}>
                          <span>{item.sub_branch_name}</span>
                        </Tooltip>
                      </Option>
                    ))
                  }
                </Select>

              </div>
              <div className="prompt">请注意<span>*</span>为必填项</div>
              <Button className="next" onClick={this.submit}>提交</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default qualification;
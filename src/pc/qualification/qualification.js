import React from 'react';
import './qualification.css';
import 'antd/dist/antd.css';
import { getIsStatus, VenueQualifications, getVenueOpenBank, getVenueOpenBankProvince, _code, getVenueQualified, getVenueOpenBankCity, getVenueQualifiedCompany, TemporaryQualificationInformation, getVenueOpenBankList, getVenueQualificationInformation, VenueQualificationInformationSave } from '../../api';
import { Input, Radio, Button, Upload, message, Select, Tooltip, Modal } from 'antd';
const { Option } = Select;


function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    message.error('请上传小于3MB的图片');
  }
  return isJpgOrPng && isLt2M;
}


function beforeUploadT(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    message.error('请上传小于3MB的图片');
  }
  return isJpgOrPng && isLt2M;
}

function beforeUploadTS(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您好图片格式只能是JPG/PNG');
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    message.error('请上传小于3MB的图片');
  }
  return isJpgOrPng && isLt2M;
}

message.config({
  top: 300
})

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
    CorporateName: '',
    textT: '获取验证码',
    codeNum: '',
    flagDis: false,
    issite: 0,
    isqult: 0
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    }
    this.setState({ siteUUID: res.data.data.siteUid, issite: res.data.data.issite, isqult: res.data.data.isqult })
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
      sessionStorage.clear()
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      if (res.data.data.legalFilesURL !== '') {
        if (res.data.data.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
        }
        this.setState({
          imageUrl: res.data.data.lisenceURL, handleName: res.data.data.legalname, handleCardId: res.data.data.legalcard, imageRes: res.data.data.lisenceURL,
          handlePhone: res.data.data.legalphone, Radiovalue: res.data.data.Settlement, handleBankNum: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
          legalBaseURL: res.data.data.legalBaseURL,
          imageResT: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[0],
          imageReST: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[1], CorporateName: res.data.data.CorporateName,
          bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank
        })
      } else {
        if (res.data.data.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
        }
        this.setState({
          imageUrl: res.data.data.lisenceURL, handleName: res.data.data.legalname, handleCardId: res.data.data.legalcard, imageRes: res.data.data.lisenceURL,
          handlePhone: res.data.data.legalphone, Radiovalue: res.data.data.Settlement, handleBankNum: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank, legalBaseURL: res.data.data.legalBaseURL,
          imageResT: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[0],
          imageReST: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[1], CorporateName: res.data.data.CorporateName,
          bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank
        })
      }

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
    if (e !== this.state.province_id) {
      this.setState({ city_id: '', openingLine: '' })
    }
    this.getVenueOpenBankCity({ province_id: e })

  }

  typeChange = e => {
    this.setState({ bank_id: e })
    if (e !== this.state.bank_id) {
      this.setState({ province_id: '', city_id: '', openingLine: '' })
    }
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
    if (e.target.value === '') {
      this.setState({ bank_id: '', province_id: '', city_id: '', openingLine: '' })
    }
  }
  openingLine = e => {
    this.setState({ openingLine: e })
  }

  CorporateName = e => {
    this.setState({ CorporateName: e.target.value })

  }


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageRes: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    } else if (info.file.response.code === 4002) {
      message.error('上传失败')
    }
  }





  handleChangeT = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        if (info.file.response.data.baseURL.split('/')[2].indexOf(new Date().getDate()) === -1) {
          this.setState({ imageReST: 1 })
        }
        this.setState({ imageResT: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
      } else {
        this.setState({ imageReST: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    } else if (info.file.response.code === 4002) {
      message.error('上传失败')
    }
  }




  handleChangeTS = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        if (info.file.response.data.baseURL.split('/')[2].indexOf(new Date().getDate()) === -1) {
          this.setState({ imageResT: 1 })
        }
        this.setState({ imageReST: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
      } else {
        this.setState({ imageReST: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    } else if (info.file.response.code === 4002) {
      message.error('上传失败')
    }
  }





  onChangeRadio = e => {
    this.setState({
      Radiovalue: e.target.value,
      handleBankNum: '', bank_id: '', province_id: '', city_id: '', openingLine: ''
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
    let { handleName, handleCardId, handlePhone, handleBankNum, Radiovalue, openingLine, siteUUID, imageRes, legalBaseURL, imageResT, imageReST, CorporateName, bank_id, province_id, city_id } = this.state

    if (this.state.isqult === 0) {
      let data = {
        siteUUID: siteUUID,
        lisenceURL: imageRes,
        legalname: handleName,
        legalcard: handleCardId,
        legalphone: handlePhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageResT + '|' + imageReST,
        Settlement: Radiovalue,
        Bankaccount: handleBankNum,
        OpeningBank: openingLine,
        CorporateName: CorporateName,
        Banktype: bank_id,
        ProvinceBank: province_id,
        CityBank: city_id
      }
      if (data.lisenceURL === 1) {
        message.error('营业执照违规请重新上传');
      } else if (imageResT === 1) {
        message.error('身份证正面照违规请重新上传');
      } else if (imageReST === 1) {
        message.error('身份证反面照违规请重新上传');
      } else {
        this.VenueQualifications(data)
      }
    } else {
      let data = {
        lisenceURL: imageRes,
        legalname: handleName,
        legalcard: handleCardId,
        legalphone: handlePhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageResT + '|' + imageReST,
        Settlement: Radiovalue,
        Bankaccount: handleBankNum,
        OpeningBank: openingLine,
        CorporateName: CorporateName,
        Banktype: bank_id,
        ProvinceBank: province_id,
        CityBank: city_id,
        type: 1
      }
      if (data.lisenceURL === 1) {
        message.error('营业执照违规请重新上传');
      } else if (imageResT === 1) {
        message.error('身份证正面照违规请重新上传');
      } else if (imageReST === 1) {
        message.error('身份证反面照违规请重新上传');
      } else {
        this.VenueQualificationInformationSave(data)
      }
    }






  }
  stepBack = () => {
    this.props.history.push('perfect')
  }


  async TemporaryQualificationInformation(data) {
    const res = await TemporaryQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
    }
  }
  save = () => {
    let { handleName, handleCardId, handlePhone, handleBankNum, Radiovalue, openingLine, siteUUID, imageRes, legalBaseURL, imageResT, imageReST, CorporateName, bank_id, province_id, city_id } = this.state
    let data = {
      siteUUID: siteUUID,
      lisenceURL: imageRes,
      legalname: handleName,
      legalcard: handleCardId,
      legalphone: handlePhone,
      legalBaseURL: legalBaseURL,
      legalFilesURL: imageResT + '|' + imageReST,
      Settlement: Radiovalue,
      Bankaccount: handleBankNum,
      OpeningBank: openingLine,
      CorporateName: CorporateName,
      Banktype: bank_id,
      ProvinceBank: province_id,
      CityBank: city_id
    }
    if (data.lisenceURL === 1) {
      message.error('营业执照违规请重新上传');
    } else if (imageResT === 1) {
      message.error('身份证正面照违规请重新上传');
    } else if (imageReST === 1) {
      message.error('身份证反面照违规请重新上传');
    } else {
      this.TemporaryQualificationInformation(data)
    }

  }




  async getVenueQualifiedCompany(data) {
    const res = await getVenueQualifiedCompany(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visible: true, legePhone: res.data.data.phone })
    } else {
      message.warning(res.data.msg)
    }
  }

  search = () => {
    this.getVenueQualifiedCompany({ CorporateName: this.state.CorporateName })
  }


  async nacode(data) {
    const res = await _code(data)
    if (res.data.code === 4007) {
      this.setState({ visiblePhone: true, textTwo: res.data.msg })
    } else if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
    } else {
      message.error(res.data.msg)
    }
  }

  code = () => {
    this.nacode({ mobile: this.state.legePhone, type: 'venuequalifiedcompany', uuid: '' })
  }
  codeNum = (e) => {
    this.setState({ codeNum: e.target.value })
  }

  async getVenueQualified(data) {
    const res = await getVenueQualified(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        imageUrl: res.data.data.lisenceURL, handleName: res.data.data.legalname, handleCardId: res.data.data.legalcard, imageRes: res.data.data.lisenceURL,
        handlePhone: res.data.data.legalphone, Radiovalue: res.data.data.Settlement, handleBankNum: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank, legalBaseURL: res.data.data.legalBaseURL,
        imageResT: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[0],
        imageReST: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[1], CorporateName: res.data.data.CorporateName,
        bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        flagDis: true, visible: false
      })
    }
  }

  get = () => {
    this.getVenueQualified({ CorporateName: this.state.CorporateName, code: this.state.codeNum, phone: this.state.legePhone })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  render() {
    const uploadButton = (
      <div>
        <div className="ant-upload-text">营业执照</div>
      </div>
    )
    const { imageRes } = this.state;

    const uploadButtonT = (
      <div>
        <div className="ant-upload-text">( 正面 )</div>
      </div>
    );
    const { imageResT } = this.state;

    const uploadButtonS = (
      <div>
        <div className="ant-upload-text">( 反面 )</div>
      </div>
    );
    const { imageReST } = this.state;

    return (
      <div className="qualification">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginLeft: 45, marginTop: 13.5 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          <div className="content">
            <div className="nav">
              <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
              <div><span>2.完善资质信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
              <div><span>3.等待审核</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
              <div><span>4.审核成功</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
            </div>
            <div className="contentSon">
              <span className="titile">场馆资质信息</span>

              <div className="name" style={this.state.Radiovalue === 0 ? { display: 'block' } : { display: 'none' }}>
                <div className="nameSonTle">
                  <span className="boTitle">公司名称</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput" value={this.state.CorporateName} onChange={this.CorporateName} placeholder="请输入公司名称" />
                <span className="sreach" onClick={this.search}>查询</span>
              </div>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">营业执照</span><span className="symbol">*</span>
                </div>
                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  disabled={this.state.flagDis}
                >
                  {imageRes !== 1 && imageRes !== '' ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageRes} alt="avatar" style={{ maxWidth: '4.5rem', maxHeight: '4.5rem' }} /> : uploadButton}
                </Upload>


              </div>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">法人姓名</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput" disabled={this.state.flagDis} onChange={this.handleName} value={this.state.handleName} placeholder="请输入法人姓名" />
              </div>
              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">法人身份证号</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput cardId" disabled={this.state.flagDis} maxLength={18} value={this.state.handleCardId} onChange={this.handleCardId} placeholder="请输入法人身份证号" />
              </div>

              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">法人手机号</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput phone" maxLength={11} disabled={this.state.flagDis} value={this.state.handlePhone} onChange={this.handlePhone} style={{ fontSize: '14px' }} placeholder="请输入11位手机号" />
              </div>

              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">法人身份证</span><span className="symbol">*</span>
                </div>
                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg addimgT"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUploadT}
                  onChange={this.handleChangeT}
                  disabled={this.state.flagDis}
                >
                  {imageResT !== 1 && imageResT !== '' ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL + imageResT} alt="avatar" style={{ maxWidth: '4.5rem', maxHeight: '4.5rem' }} /> : uploadButtonT}
                </Upload>

                <Upload
                  name="files"
                  listType="picture-card"
                  className="avatar-uploader addImg addimgT"
                  showUploadList={false}
                  action="/api/UploadVenueImgs?type=Venuelisence"
                  beforeUpload={beforeUploadTS}
                  onChange={this.handleChangeTS}
                  disabled={this.state.flagDis}
                >
                  {imageReST !== 1 && imageReST !== '' ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL + imageReST} alt="avatar" style={{ maxWidth: '4.5rem', maxHeight: '4.5rem' }} /> : uploadButtonS}
                </Upload>

              </div>

              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">结算账号</span> <span className="symbol">*</span>
                </div>
                <Radio.Group onChange={this.onChangeRadio} disabled={this.state.flagDis} value={this.state.Radiovalue}>
                  <Radio value={0}>公司银行账号<span style={{ fontSize: '12px', paddingLeft: '5px' }}>(法人不是股东或有多个股东时只能选择公司银行账户结算)</span></Radio><br />
                  <Radio value={1}>法人账号</Radio>
                </Radio.Group>
              </div>



              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">银行账号</span><span className="symbol">*</span>
                </div>
                <Input className="nameINput" disabled={this.state.flagDis} maxLength={19} onChange={this.handleBankNum} value={this.state.handleBankNum} placeholder="请输入银行卡号" />
              </div>



              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">开户行及所在地</span><span className="symbol">*</span>
                </div>
                <Select placeholder="银行类型" disabled={this.state.flagDis} style={{ width: 120, height: '35px' }} value={this.state.bank_id === '' ? null : Number(this.state.bank_id)} loading={this.state.flag} onChange={this.typeChange}>
                  {
                    this.state.type.map((item, i) => (
                      <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在省" disabled={this.state.flagDis} style={{ width: 120, height: '35px', marginLeft: '27px' }} loading={this.state.flagTwo} value={this.state.province_id === '' ? null : Number(this.state.province_id)} onChange={this.provinceChange}>
                  {
                    this.state.backProvince.map((item, i) => (
                      <Option key={i} value={item.province_id}>{item.province}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在市" disabled={this.state.flagDis} style={{ width: 120, height: '35px', marginLeft: '27px' }} value={this.state.city_id === '' ? null : Number(this.state.city_id)} loading={this.state.flagThree} onChange={this.cityChange}>
                  {
                    this.state.backCity.map((item, i) => (
                      <Option key={i} value={item.city_id}>{item.city}</Option>
                    ))
                  }
                </Select>
              </div>

              <div className="name">
                <div className="nameSonTle">
                  <span className="boTitle">支行名称</span><span className="symbol">*</span>
                </div>
                <Select
                  showSearch
                  style={{ width: 273, height: '36px' }}
                  onSearch={this.handleSearch}
                  onChange={this.openingLine}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  notFoundContent={null}
                  value={this.state.openingLine}
                  disabled={this.state.flagDis}
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
              <Button className="next" onClick={this.stepBack}>上一步</Button><Button className="next" style={this.state.flagDis === true ? { display: 'none' } : { marginLeft: 20 }} onClick={this.save}>保存</Button><Button className="next" style={{ marginLeft: 20 }} onClick={this.submit}>提交</Button>
            </div>
          </div>
        </div>
        <Modal
          title="获取该公司详细资质信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancel}
        >
          <div><span style={{ float: 'left', lineHeight: '42px', width: '70px' }}>法人手机号</span><Input value={this.state.legePhone} disabled={true} style={{ width: '270px', float: 'left', marginLeft: '20px' }} /></div>
          <div style={{ float: 'left', marginTop: "10px" }}>
            <span style={{ float: 'left', lineHeight: '42px', width: '70px' }} >验证码</span>
            <Input style={{ width: '190px', float: 'left', marginLeft: '20px' }} onChange={this.codeNum} />
            <span style={{ width: '80px', height: '47px', color: '#fff', background: '#F5A623', textAlign: 'center', lineHeight: '47px', float: 'left', cursor: 'pointer' }} onClick={this.code}>{this.state.textT}</span>
          </div>
          <div style={{ width: '80px', height: '30px', color: '#fff', background: '#F5A623', cursor: 'pointer', clear: 'both', textAlign: 'center', lineHeight: '30px', marginLeft: '90px', marginTop: '120px' }} onClick={this.get}>获取</div>
        </Modal>
      </div>
    )
  }
}

export default qualification;
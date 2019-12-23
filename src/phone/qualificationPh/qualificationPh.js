import React from 'react';
import './qualificationPh.css';

import { Toast, Picker, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Upload, Input, Button, Radio, Select, Tooltip, Icon } from 'antd';
import { getIsStatus, getVenueOpenBankList, getVenueOpenBank, getVenueOpenBankProvince, getVenueOpenBankCity, VenueQualifications, getVenueQualificationInformation, VenueQualificationInformationSave } from '../../api';
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
    backList: [],//获取的银行
    openingLine: '',
    kai: true,
    kaiText: '请选择银行所在地',
    imageResOneTwo: '',
  };


  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].bank_name
        k.value = res.data.data[i].bank_id
        arrType.push(k)
      }

      this.setState({ type: arrType, flag: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].province
        k.value = res.data.data[i].province_id
        arrType.push(k)
      }
      this.setState({ backProvince: arrType, flagTwo: false })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].city
        k.value = res.data.data[i].city_id
        arrType.push(k)
      }
      this.setState({ backCity: arrType, flagThree: false })
    }
  }



  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        value: res.data.data.Settlement, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank, imageUrlBaseT: res.data.data.legalBaseURL,
        imageResOneTwo: res.data.data.legalFilesURL,
      })
      if (res.data.data.legalBaseURL !== '') {
        this.setState({ place: '上传成功' })
      }
      console.log(sessionStorage.getItem('yinImg'))
      if (sessionStorage.getItem('yinImg') !== null) {
        this.setState({ imageUrl: 'https://app.tiaozhanmeiyitian.com/' + sessionStorage.getItem('yinImg') })
      } else {
        this.setState({ imageUrl: res.data.data.lisenceURL })
      }
    }
    if (this.props.location.query !== undefined) {
      this.setState({ place: '上传成功', imageResOneTwo: this.props.location.query.imageRes + '|' + this.props.location.query.imageResT, imageUrlBaseT: this.props.location.query.imageUrlBaseT })
    }
  }



  componentDidMount() {
    this.getIsStatus()
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()
    this.getVenueQualificationInformation()
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      sessionStorage.setItem('yinImg', info.file.response.data.baseURL + info.file.response.data.filesURL)
      this.setState({ imageResOne: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      )
    }
  }

  idCard = () => {
    this.props.history.push({ pathname: '/idCardPh', query: { imageUrlBaseT: this.state.imageUrlBaseT, imageResOneTwo: this.state.imageResOneTwo } })
  }

  radioChange = e => {
    this.setState({ value: e.target.value })
  }
  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      Toast.fail('登陆超时请重新登陆！', 1);
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
    if (this.state.bank_id !== '') {
      this.setState({ province_id: e })
      this.getVenueOpenBankCity({ province_id: e })
    } else {
      Toast.fail('请选择银行类型', 1);

      this.getVenueOpenBankCity({ province_id: e })
    }

  }

  typeChange = e => {

    if (this.state.city_id !== '') {
      this.setState({ kai: false, bank_id: e })
    } else {
      this.setState({ bank_id: e })
    }
  }

  cityChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ city_id: e, kai: false, kaiText: '请输入银行关键字' })
    } else {
      this.setState({ city_id: e, kaiText: '请输入银行关键字' })
    }

  }
  handleSearch = e => {
    this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
  }
  openingLine = e => {
    this.setState({ openingLine: e })
  }

  async VenueQualifications(data) {
    const res = await VenueQualifications(data)
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success(res.data.msg, 1);

    } else {
      Toast.fail(res.data.msg, 1);

    }
  }



  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success(res.data.msg, 1);

    } else {
      Toast.fail(res.data.msg, 1);
    }
  }


  submit = () => {
    let { siteUUID, imageResOneTwo, imageUrlBaseT, faName, faIdcard, faPhone, value, cardId, openingLine } = this.state

    if (sessionStorage.getItem('notType') === '1') {
      let data = {
        lisenceURL: sessionStorage.getItem('yinImg'),
        legalname: faName,
        legalcard: faIdcard,
        legalphone: faPhone,
        legalBaseURL: imageUrlBaseT,
        legalFilesURL: imageResOneTwo,
        Settlement: value,
        Bankaccount: cardId,
        OpeningBank: openingLine
      }
      this.VenueQualificationInformationSave(data)
    } else {
      let data = {
        siteUUID: siteUUID,
        lisenceURL: sessionStorage.getItem('yinImg'),
        legalname: faName,
        legalcard: faIdcard,
        legalphone: faPhone,
        legalBaseURL: imageUrlBaseT,
        legalFilesURL: imageResOneTwo,
        Settlement: value,
        Bankaccount: cardId,
        OpeningBank: openingLine
      }
      this.VenueQualifications(data)
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
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>营业执照</div>
      </div>
    );
    const { imageUrl } = this.state;



    return (
      <div className="qualificationPh">
        <div className="title"> <span style={{ color: '#D85D27' }}>注册 ></span> <span style={{ color: '#D85D27' }}>完善信息 ></span> <span>审核  ></span> <span>成功  ></span> <Icon type="close" onClick={this.close} style={{ position: 'absolute', right: '5%', top: '35%' }} /> </div>
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
            <Input className="select" style={{ width: '65%' }} disabled={true} placeholder={this.state.place} />
          </div>

          <div className="input">
            <span>法人姓名</span>
            <Input className="select" onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
          </div>

          <div className="input">
            <span>法人身份证号</span>
            <Input className="select" onChange={this.faIdcard} value={this.state.faIdcard} maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input">
            <span>法人手机号</span>
            <Input className="select" maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
          </div>


          <div className="input">
            <span>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChange} value={this.state.value}>
              <Radio value={0}>公司账户</Radio>
              <Radio value={1}>法人账户</Radio>
            </Radio.Group>
          </div>

          <div className="input">
            <span>银行卡号</span>
            <Input className="select" maxLength={21} onChange={this.cardId} value={this.state.cardId} placeholder="请输入银行卡号" />
          </div>

          <div className="input">

            {/* <Select placeholder="银行类型" style={{ width: '67%', height: '2.9rem', float: 'right' }} loading={this.state.flag} onChange={this.typeChange}>
              {
                this.state.type.map((item, i) => (
                  <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                ))
              }
            </Select> */}

            <Picker data={this.state.type} cols={1} onChange={this.typeChange} value={this.state.bank_id} className="forss">
              <List.Item arrow="horizontal">银行类型</List.Item>
            </Picker>


          </div>

          <div className="input">
            <Picker data={this.state.backProvince} cols={1} onChange={this.provinceChange} value={this.state.province_id} className="forss">
              <List.Item arrow="horizontal">开户所在省</List.Item>
            </Picker>

          </div>

          <div className="input">
            <Picker data={this.state.type} cols={1} onChange={this.cityChange} value={this.state.city_id} className="forss">
              <List.Item arrow="horizontal">开户所在市</List.Item>
            </Picker>

          </div>
        



          <div className="input">
            <span>开户行</span>
            <Select
              showSearch
              style={{ width: '67%', height: '2.9rem', background: 'transparent', float: 'right' }}
              onSearch={this.handleSearch}
              onChange={this.openingLine}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              disabled={this.state.kai}
              placeholder={this.state.kaiText}
              value={this.state.openingLine}
            >
              {
                this.state.backList.map((item, i) => (
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
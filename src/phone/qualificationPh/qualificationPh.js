import React from 'react';
import './qualificationPh.css';

import { Toast, Picker, List, NavBar, Popover,Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Upload, Input, Radio, Select, Tooltip } from 'antd';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { getIsStatus, getVenueOpenBankList, getVenueOpenBank, getVenueOpenBankProvince, getVenueOpenBankCity,_code,getVenueQualified,TemporaryQualificationInformation, VenueQualifications, getVenueQualificationInformation, VenueQualificationInformationSave,getVenueQualifiedCompany } from '../../api';
const alert = Modal.alert;
const prompt = Modal.prompt;
const { Option } = Select;
const Item = Popover.Item;



function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  return isJpgOrPng
}


function beforeUploadT(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    Toast.fail('图片格式只能是JPG/PNG!', 1);
  }
  const isLt2M = file.size / 1024 / 1024 < 3;
  if (!isLt2M) {
    Toast.fail('请上传小于3MB的图片!', 1);
  }
  return isJpgOrPng && isLt2M;
}



class qualificationPh extends React.Component {

  state = {
    place: '请上传手持身份证正反面照片',
    imageResOne: '',//营业执照
    imageReT: '',//身份证正面
    imageReST: '',//反面
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
    flagDis:false
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
      this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        value: res.data.data.Settlement, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL:res.data.data.legalBaseURL,
        imageUrl:res.data.data.lisenceURL,
        imageResOneTwo: res.data.data.legalFilesURL, imageResT: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[0],
        imageReST: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[1],
      })
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
      if (info.file.response.data.baseURL !== undefined) {

        this.setState({ imageUrl: info.file.response.data.baseURL + info.file.response.data.filesURL })
        
      } else {
        this.setState({ imageUrl: 1 })
      }
     
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }

  idCard = () => {
    this.props.history.push({ pathname: '/idCardPh', query: { imageUrlBaseT: this.state.imageUrlBaseT, imageResOneTwo: this.state.imageResOneTwo } })
  }

  radioChange = e => {
    this.setState({ value: e.target.value,cardId:'',bank_id:'',province_id:'',city_id:'',openingLine:'' })
    
   
  }
  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      localStorage.setItem('isqult', undefined)
      localStorage.setItem('issite', undefined)
      localStorage.setItem('islegal', undefined)
      Toast.fail('登录超时请重新登录!', 1);
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
      this.setState({ province_id: e,city_id:'', kai: false,openingLine:'' })
      this.getVenueOpenBankCity({ province_id: e })
    } else {
      Toast.fail('请选择银行类型', 1);

      this.getVenueOpenBankCity({ province_id: e })
    }
 
  }

  typeChange = e => {
    if (this.state.city_id !== '') {
      this.setState({ kai: false, bank_id: e ,province_id:'',city_id:'',openingLine:''})
    } else {
      this.setState({ bank_id: e })
    }
  }

  cityChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ city_id: e,openingLine:'', kai: false, kaiText: '请输入银行关键字' })
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
    let { siteUUID, imageUrl, legalBaseURL, CorporateName,imageResT,imageReST, faIdcard,faName,bank_id,province_id,city_id, faPhone, value, cardId, openingLine } = this.state

    if (sessionStorage.getItem('notType') === '1') {
      let data = {
        lisenceURL: imageUrl,
        legalname: faName,
        legalcard: faIdcard,
        legalphone: faPhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageResT+'|'+imageReST,
        CorporateName:value===0?CorporateName:'',
        Settlement: value,
        Bankaccount: cardId,
        OpeningBank: openingLine,
        Banktype:bank_id,
        ProvinceBank:province_id,
        CityBank:city_id,
        type:1
      }
      this.VenueQualificationInformationSave(data)
    } else {
      let data = {
        siteUUID: siteUUID,
        lisenceURL: imageUrl,
        legalname: faName,
        legalcard: faIdcard,
        legalphone: faPhone,
        legalBaseURL: legalBaseURL,
        legalFilesURL: imageResT+'|'+imageReST,
        CorporateName:value===0?CorporateName:'',
        Settlement: value,
        Bankaccount: cardId,
        OpeningBank: openingLine,
        Banktype:bank_id,
        ProvinceBank:province_id,
        CityBank:city_id,
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

  reture = () => {
    this.props.history.push('/stadiumInformationPh')
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
    } else {
      this.close()
    }
  }
  CorporateName = (e) => {
    this.setState({ CorporateName: e.target.value })
  }

  handleChangeT = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {

        if(this.state.legalBaseURL.split('/')[2].indexOf(new Date().getDate())===-1){
          this.setState({imageReST:1})
       }
        this.setState({ imageResT: info.file.response.data.filesURL, legalBaseURL: info.file.response.data.baseURL })
        
      } else {
        this.setState({ imageResT: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }
  handleChangeTS = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        if(this.state.legalBaseURL.split('/')[2].indexOf(new Date().getDate())===-1){
          this.setState({imageResT:1})
       }
        this.setState({ imageReST: info.file.response.data.filesURL,legalBaseURL: info.file.response.data.baseURL })
        
      } else {
        this.setState({ imageReST: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }
 
  async  _code(data) {
    const res = await  _code(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1)
      this.lp()
    }else{
      Toast.fail(res.data.msg, 1);
      this.lp()
    }
  }

  lp=()=>{
    prompt('请输入验证码', '', [
      { text: '取消' },
      { text: '确定', onPress: value => this.getVenueQualified({CorporateName:this.state.CorporateName,code:value,phone:this.state.legePhone}) },
    ])
  }

  async getVenueQualifiedCompany(data) {
    const res = await getVenueQualifiedCompany(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      alert('是否获取该公司详细资质信息', '请注意查收'+res.data.data.phone+'的验证码', [
        { text: '否' },
        { text: '是', onPress:() => this._code({mobile:res.data.data.phone,type:'venuequalifiedcompany'}) 
},
      ])

      this.setState({ legePhone: res.data.data.phone })
    }else{
      Toast.fail(res.data.msg, 1);
    }
  }

  search=()=>{
    this.getVenueQualifiedCompany({CorporateName:this.state.CorporateName})
  }


  async getVenueQualified(data) {
    const res = await getVenueQualified(data, localStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      if(res.data.data.ProvinceBank!==''){
        this.getVenueOpenBankCity({ province_id:res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard, faPhone: res.data.data.legalphone,
        value: res.data.data.Settlement, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL:res.data.data.legalBaseURL,
        imageUrl:res.data.data.lisenceURL,
        imageResOneTwo: res.data.data.legalFilesURL, imageResT: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[0],
        imageReST: res.data.data.legalBaseURL === '' ? '' : res.data.data.legalFilesURL.split('|')[1],
        flagDis:true
      })
    }
  }

  async TemporaryQualificationInformation(data) {
    const res = await TemporaryQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
    }
  }
  save = () => {
    let {siteUUID, imageUrl, legalBaseURL, CorporateName,imageResT,imageReST, faIdcard,faName,bank_id,province_id,city_id, faPhone, value, cardId, openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      lisenceURL: imageUrl,
      legalname: faName,
      legalcard: faIdcard,
      legalphone: faPhone,
      legalBaseURL: legalBaseURL,
      legalFilesURL: imageResT+'|'+imageReST,
      CorporateName:value===0?CorporateName:'',
      Settlement: value,
      Bankaccount: cardId,
      OpeningBank: openingLine,
      Banktype:bank_id,
      ProvinceBank:province_id,
      CityBank:city_id,
    }
    if (data.lisenceURL === 1) {
      Toast.fail('营业执照违规请重新上传', 1);
    } else if (imageResT === 1) {
      Toast.fail('身份证正面照违规请重新上传', 1);
    } else if (imageReST === 1) {
      Toast.fail('身份证反面照违规请重新上传', 1);
    } else {
      this.TemporaryQualificationInformation(data)
    }

  }



  render() {

    const uploadButton = (
      <div>
        <div className="ant-upload-text" style={{ fontSize: '0.75rem' }}>营业执照</div>
      </div>
    )
    const uploadButtonT = (
      <div>
        <div className="ant-upload-text">( 正面 )</div>
      </div>
    );
    const uploadButtonS = (
      <div>
        <div className="ant-upload-text">( 反面 )</div>
      </div>
    );
    const { imageUrl,imageResT,imageReST } = this.state;



    return (
      <div className="qualificationPh">
        <NavBar
          mode="dark"
          icon={<LeftOutlined onClick={this.reture} />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
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
        ><span style={{ fontSize: '1rem' }}>完善资质信息</span></NavBar>
        <div className="boss">

          <div className="input" style={this.state.value===1?{display:'none'}:{}}>
            <span>公司名称</span>
            <span className="lkpoji" style={{float:'right'}} onClick={this.search}>查询</span>
            <Input className="select" onChange={this.CorporateName} style={{width:'55%',float:'right'}} value={this.state.CorporateName} placeholder="请输入公司名称" />
            
          </div>
          <div className="input">
            <span style={{lineHeight:'4rem',paddingRight:'0.5rem'}}>营业执照</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg left"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              disabled={this.state.flagDis}
            >
              {imageUrl !==1&& imageUrl!==''? <img src={'https://app.tiaozhanmeiyitian.com/'+imageUrl} alt="avatar" style={{ maxWidth: '4rem', maxHeight: '4rem'  }} /> : uploadButton}
            </Upload>
          </div>
          

          <div className="input" style={{ marginTop: '0.2rem' }} >
            <span style={{lineHeight:'2rem'}}>(正面照)<br />法人身份证</span>
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
              {imageResT !== 1 && imageResT !== '' ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL + imageResT} alt="avatar" style={{ maxWidth: '4rem', maxHeight: '4rem' }} /> : uploadButtonT}
            </Upload>

          </div>

          <div className="input" style={{ marginTop: '0.2rem' }} >
            <span style={{lineHeight:'2rem'}}>(反面照)<br />法人身份证</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg addimgT"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venuelisence"
              beforeUpload={beforeUploadT}
              onChange={this.handleChangeTS}
              disabled={this.state.flagDis}
            >
            {imageReST !== 1 && imageReST !== '' ? <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.legalBaseURL+ imageReST} alt="avatar" style={{ maxWidth: '4rem', maxHeight: '4rem' }} /> : uploadButtonS}
            </Upload>

          </div>

          <div className="input">
            <span>法人姓名</span>
            <Input className="select" disabled={this.state.flagDis} onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
          </div>

          <div className="input">
            <span>法人身份证号</span>
            <Input className="select" disabled={this.state.flagDis} onChange={this.faIdcard} value={this.state.faIdcard} maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input">
            <span>法人手机号</span>
            <Input className="select" disabled={this.state.flagDis} maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
          </div>


          <div className="input">
            <span style={{lineHeight:'6rem'}}>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChange} disabled={this.state.flagDis} value={this.state.value}>
              <Radio value={0}>公司账户</Radio><span style={{fontSize:'12px'}}>(法人不是股东或有多个股东时只能选择公司银行账户结算)</span><br/>
              <Radio value={1}>法人账户</Radio>
            </Radio.Group>
          </div>

          <div className="input">
            <span>银行卡号</span>
            <Input className="select" maxLength={21} disabled={this.state.flagDis} onChange={this.cardId} value={this.state.cardId} placeholder="请输入银行卡号" />
          </div>

          <div className="input">



            <Picker data={this.state.type} cols={1} onChange={this.typeChange} disabled={this.state.flagDis} value={[Number(this.state.bank_id)]} className="forss">
              <List.Item arrow="horizontal">银行类型</List.Item>
            </Picker>


          </div>

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backProvince} cols={1} onChange={this.provinceChange} disabled={this.state.flagDis} value={[Number(this.state.province_id)]} className="forss">
              <List.Item arrow="horizontal" >开户所在省</List.Item>
            </Picker>

          </div>

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backCity} cols={1} onChange={this.cityChange} disabled={this.state.flagDis} value={[Number(this.state.city_id)]} className="forss">
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


          <div className="footerBtn">
            <div onClick={this.reture}>上一步</div>
            <div onClick={this.save}>保存</div>
            <div onClick={this.submit}>提交</div>
          </div>
         



        </div>


      </div>
    );
  }
}

export default qualificationPh;
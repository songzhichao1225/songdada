import React from 'react';
import './stadiums.css';
import 'antd/dist/antd.css';
import { getVenueInformation, VenueInformationSave, getVenueIssecondaudit, getVenueQualificationInformation, getVenueOpenBank,getVenueSportList, VenueQualificationInformationSave, getVenueOpenBankList, getVenueOpenBankProvince, getVenueOpenBankCity } from '../../api';
import { Modal, Upload, Input, message, Checkbox, Button, Popconfirm, Radio, Select, Tooltip,Spin } from 'antd';
import Icon from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;




const options = [{ label: 'WiFi', value: '1' }, { label: '停车场', value: '2' }, { label: '淋浴', value: '3' }]




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
    message.error('只能使用JPG/PNG格式！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
}





class stadiums extends React.Component {

  state = {
    informationList: [],
    fileList: [],
    name: '',
    handleAddress: '',
    contacts: '',
    contactNumber: '',
    addtelephone: '',//新增电话
    adddress: '',//场馆位置
    imageUrl: '',
    sport: [],
    facilities: [],
    siteInfo: '',
    comment: '',
    flag: true,
    issecondaudit: 1,
    imageUrlBase: '',//身份证公共路径
    imageUrlTwo: '',//身份证正面照
    imageUrlThree: '',//身份证反面照
    corporateName: '',//法人姓名
    corporateId: '',//法人身份证号
    corporatePhone: '',//法人手机号
    numRadio: 1,//账号类型
    corporateCardId: '',//法人银行卡号
    corporateOpen: '',//开户行
    lisenceURL: '',//营业执照
    imgFile: '',
    imgFileTwo: '',
    imagesBasellFe: '',
    imagesBasellFeTwo: '',
    baseImg: '',
    imgHood: '',
    imgHoodTwo: '',
    zuo: 0,

    flagOne: true,
    flagTwo: true,
    flagThree: true,
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    upData: true,
    CorporateName: '',
    spinning:true,
    province:'',
    city:'',
    area:'',
    plainOptions:[],
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }

      if (this.props.location.query !== undefined && this.props.location.query.name !== 'sunny') {
        let sportId=res.data.data.sport.split(',')
        let lo=[]
        for(let i in sportId){
           lo.push(parseInt(sportId[i]))
        }
        this.setState({
          spinning:false,
          adddress: this.props.location.query.title,
          handleAddress: this.props.location.query.adddress,
          lat: this.props.location.query.lat,
          lng: this.props.location.query.lng,
          province:this.props.location.query.province,
          city:this.props.location.query.city,
          area:this.props.location.query.district,
          informationList: res.data.data, name: res.data.data.name,
          contacts: res.data.data.linkMan, contactNumber: res.data.data.telephone, imageUrl: res.data.data.firstURL,
          fileList: arrImg, sport: lo, facilities: res.data.data.facilities.split(''), siteInfo: res.data.data.siteInfo, comment: res.data.data.comment
        })
      } else if (this.props.location.query === undefined || this.props.location.query.name === 'sunny') {
        let sportId=res.data.data.sport.split(',')
        let lo=[]
        for(let i in sportId){
           lo.push(parseInt(sportId[i]))
        }
        this.setState({
          spinning:false,
          informationList: res.data.data, name: res.data.data.name, handleAddress: res.data.data.address,
          contacts: res.data.data.linkMan, contactNumber: res.data.data.telephone, adddress: res.data.data.position, imageUrl: res.data.data.firstURL,
          fileList: arrImg, sport:lo, facilities: res.data.data.facilities.split(''), siteInfo: res.data.data.siteInfo, comment: res.data.data.comment
        })
      }
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
  }

  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ type: res.data.data, flagOne: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backProvince: res.data.data, flagTwo: false })
    }
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backList: res.data.data, flagThree: false })
    }
  }
  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ backCity: res.data.data, flagThree: false })
    }
  }
  async getVenueSportList(data) {
    const res = await getVenueSportList(data)
    this.setState({
      plainOptions:res.data.data
    })
  }
  componentDidMount() {
    this.getVenueInformation()
    this.getVenueIssecondaudit()
    this.getVenueQualificationInformation()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()
    this.getVenueSportList()
  }

  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data, sessionStorage.getItem('venue_token'))
    this.setState({ issecondaudit: res.data.data.issecondaudit })
  }

  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let corporate = res.data.data
      let cardImg = corporate.legalFilesURL.replace('|', ',').split(',')
      this.setState({
        imageUrlTwo: corporate.legalBaseURL + '/' + cardImg[0], imageUrlThree: corporate.legalBaseURL + '/' + cardImg[1],
        baseImg: corporate.legalBaseURL,
        imgFile: cardImg[0], imgFileTwo: cardImg[1],
        corporateName: corporate.legalname, corporateId: corporate.legalcard, corporatePhone: corporate.legalphone, CorporateName: corporate.CorporateName,
        numRadio: corporate.Settlement, corporateCardId: corporate.Bankaccount, corporateOpen: corporate.OpeningBank, lisenceURL: corporate.lisenceURL
      })
    }
  }



  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ imageUrl: info.file.response.data.baseURL + info.file.response.data.filesURL, loading: false })
    }
  }




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
  routerMap = () => {
    this.props.history.push({ pathname: '/map', query: { type: this.state.adddress } })
    sessionStorage.setItem('handleCity', this.state.adddress)
    sessionStorage.setItem('hanclick', 2)
  }

  handleName = e => {
    this.setState({ name: e.target.value })
  }
  handleAddress = e => {
    this.setState({ handleAddress: e.target.value })
  }
  contacts = e => {
    this.setState({ contacts: e.target.value })
  }
  contactNumber = e => {
    this.setState({ contactNumber: e.target.value })
  }
  addtelephone = e => {
    this.setState({ addtelephone: e.target.value })
  }

  handleChangeT = ({ fileList }) => this.setState({ fileList });

  onChangeCheck = e => {
    this.setState({ sport: e })
  }


  onChangeSite = e => {
    this.setState({ facilities: e })
  }
  onChangeText = e => {
    this.setState({ siteInfo: e.target.value })
    if (e.target.value.length === 200) {
      message.error('最多输入200字')
    }
  }
  onChangeTextTwo = e => {
    this.setState({ comment: e.target.value })
    if (e.target.value.length > 200) {
      message.error('最多输入200字')
    }
  }


  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('提交成功')
      this.setState({ issecondaudit: 0 })
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }

  confirm = () => {
    let { informationList, name, handleAddress, contacts, contactNumber, fileList, adddress, imageUrl, sport, facilities, siteInfo, comment } = this.state
    let filesURLarr = []
    for (let i in fileList) {
      if (fileList[i].response !== undefined) {
        filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
      } else if (fileList[i].response === undefined) {
        filesURLarr.push(fileList[i].url)
      }
    }
     if (filesURLarr.length < 2) {
      message.error('至少上传两张室内照')
    } else {
      let data = {
        venuename: name,
        lat: this.state.lat!==undefined?this.state.lat:informationList.lat,
        lng: this.state.lng!==undefined?this.state.lng:informationList.lng,
        province:this.state.province!==undefined?this.state.province:informationList.province,
        city:this.state.city!==undefined?this.state.city:informationList.city,
        area:this.state.area!==undefined?this.state.area:informationList.area,
        address: handleAddress,
        linkMan: contacts,
        telephone: contactNumber,
        firstURL: imageUrl,
        filesURL: filesURLarr.join('|'),
        facilities: facilities.join(','),
        sport: sport.join(','),
        siteInfo: siteInfo,
        position: adddress,
        comment: comment,
        type: 2
      }
      this.VenueInformationSave(data)
    }
  }
  basic = () => {
    this.setState({ flag: true })
  }
  qualification = () => {
    this.setState({ flag: false })
  }

  numRadio = e => {
    this.setState({ numRadio: e.target.value })
  }

  handleChangeTwo = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({ zuo: 1, imageUrlTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, loading: false, imgFile: info.file.response.data.filesURL })
    }
  };

  handleChangeThree = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ zuo: 1, imageUrlThree: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHoodTwo: info.file.response.data.baseURL, loading: false, imgFileTwo: info.file.response.data.filesURL })
    }
  }



  corporateName = e => {
    this.setState({ corporateName: e.target.value })
  }
  corporateId = e => {
    this.setState({ corporateId: e.target.value })
  }
  corporatePhone = e => {
    this.setState({ corporatePhone: e.target.value })
  }
  corporateCardId = e => {
    this.setState({ corporateCardId: e.target.value })
  }
  corporateOpen = e => {
    this.setState({ corporateOpen: e })
  }


  
  async VenueQualificationInformationSave(data) {
    const res = await VenueQualificationInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      message.info('提交成功')
    } else {
      message.error(res.data.msg)
    }
  }

  ziSubmit = () => {
    let { zuo, imgHoodTwo, imgHood, baseImg, lisenceURL, corporateName, corporateId, corporatePhone, numRadio, corporateCardId, corporateOpen, imgFile, imgFileTwo,CorporateName } = this.state
    let data = {
      legalname: corporateName,
      legalcard: corporateId,
      legalphone: corporatePhone,
      Settlement: numRadio,
      Bankaccount: corporateCardId,
      OpeningBank: corporateOpen,
      lisenceURL: lisenceURL,
      legalBaseURL: baseImg,
      legalFilesURL: imgFile + '|' + imgFileTwo,
      CorporateName: CorporateName,
      type: 2
    }
    if (zuo === 1) {
      if (imgHood === '') {
        message.error('请更换身份证正面照')
      } else if (imgHoodTwo === '') {
        message.error('请更换身份证反面照')
      } else {
        data.legalBaseURL = imgHood
        
        this.VenueQualificationInformationSave(data)
      }
    } else {
     
      this.VenueQualificationInformationSave(data)
    }
  }

  typeChange = e => {
    this.setState({ bank_id: e })
  }
  provinceChange = e => {
    this.setState({ province_id: e })
    this.getVenueOpenBankCity({ province_id: e })
  }
  cityChange = e => {
    this.setState({ city_id: e })
  }

  upData = () => {
    this.setState({ upData: false })
  }

  handleSearch = e => {
    this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
  }

  CorporateName = e => {
    this.setState({ CorporateName: e.target.value })
  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">门脸照</div>
      </div>
    );
    const uploadButtonTwo = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">正面照</div>
      </div>
    );
    const uploadButtonThree = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">反面照</div>
      </div>
    );
    const { imageUrl, imageUrlTwo, imageUrlThree } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">场地照</div>
      </div>
    );
    return (
      <div className="stadiums">
        <div className="navTap">
          <div className={this.state.flag === true ? 'background' : 'div'} onClick={this.basic}>基本信息</div>
          <div className={this.state.flag === true ? 'div' : 'background'} style={sessionStorage.getItem('ismethod') === '1' ? { display: 'block' } : { display: 'none' }} onClick={this.qualification}>场馆资质</div>
        </div>
        <div className="xiange"></div>

        <Spin size='large' spinning={this.state.spinning} style={{minHeight:600}}>
        <div className={this.state.flag === true ? 'information' : 'none'}>
          <div className="name">
            <span className="boTitle">推广员:</span>
            <span className="nameINput">{this.state.informationList.promote===''?'无':this.state.informationList.promote}</span>
          </div>
          <div className="name">
            <span className="boTitle">场馆名称:</span>
            <Input className="nameINput" value={this.state.name} onInput={this.handleName} />
          </div>
          <div className="name">
            <span className="boTitle">场馆位置:</span>
            <Input className="nameINput" value={this.state.adddress} />
            {/* <Input className="nameINput" value={this.props.location.query !== undefined ? this.props.location.query.adddress : this.state.adddress}  /> */}
            <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" />
          </div>
          <div className="name">
            <span className="boTitle">详细地址:</span>
            <Input className="nameINput" onChange={this.handleAddress} value={this.state.handleAddress} />
          </div>
          <div className="name">
            <span className="boTitle">联系人:</span>
            <Input className="nameINput" maxLength={10} value={this.state.contacts} onInput={this.contacts} />
          </div>
          <div className="name">
            <span className="boTitle">联系电话:</span>
            <Input className="nameINput" maxLength={11} value={this.state.contactNumber} onInput={this.contactNumber} />
          </div>

          <div className="name">
            <span className="boTitle">门脸照:</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              accept=".jpg, .jpeg, .png"
            >
              {imageUrl ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>

          <div className="name">
            <span className="boTitle">场地照片:</span>
            <div className="clearfix">
              <Upload
                name="files"
                action="/api/UploadVenueImgs?type=Venue"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChangeT}
                accept=".jpg, .jpeg, .png"
              >
                {fileList.length >= 8 ? null : uploadButtonT}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </div>

          <div className="name" style={{overflow:'hidden'}}>
            <span className="boTitle">运动项目:</span><span className="kong"></span>
            <Checkbox.Group style={{float:'left',width:'80%',marginLeft:'26.8px'}} options={this.state.plainOptions} value={this.state.sport}  onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="name">
            <span className="boTitle">场地设施:</span><span className="kong"></span>
            <Checkbox.Group options={options} value={this.state.facilities} onChange={this.onChangeSite} />
          </div>

          <div className="name">
            <span className="boTitle">场地介绍:</span><span className="kong"></span>
            <TextArea className="textarea" maxLength={200} value={this.state.siteInfo} placeholder="请输入场地介绍，如场地规模、特色等。" onChange={this.onChangeText} rows={3} />
          </div>
          {/* <div className="name">
            <span className="boTitle">其他:</span><span className="kong"></span>
            <TextArea className="textarea" maxLength={200} value={this.state.comment} placeholder="请输入场地其他介绍，如比赛、特色等。" onChange={this.onChangeTextTwo} rows={2} />
          </div> */}



          <Popconfirm
            title="您确定本次修改吗?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
            <Button className="submit" style={this.state.issecondaudit !== 0 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
          </Popconfirm>
          <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>



        <div className={this.state.flag === true ? 'none' : 'qualification'}>
          <div className="listing">
            <span>营业执照:</span>
            <span style={{ lineHeight: '38px', display: 'block' }}>通过|长期</span>
          </div>

          <div className="listing">
            <span>身份证:</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeTwo}
              accept=".jpg, .jpeg, .png"
            >
              {imageUrlTwo ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlTwo} alt="avatar" style={{ width: '100%' }} /> : uploadButtonTwo}
            </Upload>
            <div style={{ clear: 'both' }}></div>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeThree}
              accept=".jpg, .jpeg, .png"
            >
              {imageUrlThree ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlThree} alt="avatar" style={{ width: '100%' }} /> : uploadButtonThree}
            </Upload>
          </div>

          <div className="listing">
            <span>法人姓名:</span>
            <Input className="listingInput" value={this.state.corporateName} onChange={this.corporateName} />
          </div>
          <div className="listing">
            <span>法人身份证号:</span>
            <Input className="listingInput" value={this.state.corporateId} onChange={this.corporateId} />
          </div>

          <div className="listing">
            <span>法人手机号:</span>
            <Input className="listingInput" value={this.state.corporatePhone} onChange={this.corporatePhone} />
          </div>

          <div className="listing">
            <span>结算账号:</span>
            <Radio.Group className="accountNum" onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司银行账号</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>

          <div className="listing" style={this.state.numRadio === 0 ? { display: 'block' } : { display: 'none' }}>
            <span>公司名称:</span>
            <Input className="listingInput" value={this.state.CorporateName} onChange={this.CorporateName} />
          </div>

          <div className="listing">
            <span>银行卡号:</span>
            <Input className="listingInput" value={this.state.corporateCardId} onChange={this.corporateCardId} />
          </div>

          <div className="listing" style={this.state.upData === true ? { display: 'none' } : { display: 'block' }}>
            <span>开户所在地</span>
            <Select placeholder="银行类型" style={{ width: 120, height: '35px', marginLeft: '18px' }} loading={this.state.flagOne} onChange={this.typeChange}>
              {
                this.state.type.map((item, i) => (
                  <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在省" style={{ width: 120, height: '35px', marginLeft: '18px' }} loading={this.state.flagTwo} onChange={this.provinceChange}>
              {
                this.state.backProvince.map((item, i) => (
                  <Option key={i} value={item.province_id}>{item.province}</Option>
                ))
              }
            </Select>
            <Select placeholder="所在市" style={{ width: 120, height: '35px', marginLeft: '18px' }} loading={this.state.flagThree} onChange={this.cityChange}>
              {
                this.state.backCity.map((item, i) => (
                  <Option key={i} value={item.city_id}>{item.city}</Option>
                ))
              }
            </Select>
          </div>


          <div className="listing">
            <span>开户行:</span>
            <Select
              showSearch
              style={{ width: 273, height: '36px', marginLeft: '18px', float: 'left' }}
              onSearch={this.handleSearch}
              onChange={this.corporateOpen}
              defaultActiveFirstOption={false}
              showArrow={false} 
              notFoundContent={null}
              disabled={this.state.upData}
              value={this.state.corporateOpen}
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
            <span onClick={this.upData}>修改</span>
          </div>

          <Popconfirm
            title="您确定本次修改吗?"
            onConfirm={this.ziSubmit}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
            <Button className="submit" style={this.state.issecondaudit !== 0 ? { display: 'block' } : { display: 'none' }}>提交修改</Button>
          </Popconfirm>
          <Button className="submit" style={this.state.issecondaudit === 0 ? { display: 'block' } : { display: 'none' }}>审核中~</Button>
        </div>
        </Spin>
      </div>
    );
  }
}

export default stadiums;
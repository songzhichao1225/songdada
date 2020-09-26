import React from 'react';
import './stadiumInformationPh.css';

import { Toast, InputItem, NavBar, Popover, TextareaItem, ImagePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Checkbox } from 'antd';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import lrz from 'lrz';
import { PerfectingVenueInformation, getVenueInformation, VenueInformationSave, UploadVenueImgs, getVenueSportList,imgUrlTwo, TemporaryVenueInformation, getIsSignOut } from '../../api';
const { TextArea } = Input;
const Item = Popover.Item;
const options = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' }]



function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}






class stadiumInformationPh extends React.Component {

  state = {
    province: '',
    getCrty: '',
    address: '点击选择场馆位置',
    lat: '',
    lng: '',
    addressId: '', //选择省市区id
    addressArr: '',//选择省市区名称
    addressXian: this.props.location.query !== undefined ? this.props.location.query.adddress : '',
    previewVisible: false,
    fileList: [],
    imageRes: '',
    stadiumName: '',//场馆名称
    onChangeRun: [],//运动项目
    onChangeCheck: [],//设施
    textKo: '',//介绍场馆
    beforeList: [],
    pickerValue: '',
    arrCity: [],
    arrCityNum: [],
    arrCouty: [],
    arrCoutyNum: [],
    arrPro: [],
    arrProNum: [],
    linkMan: '',
    telephone: '',
    plainOptions: [],
    siteUid: '',
    files: [],
    filesSon: '',//门脸照
    filesTwo: [],
    filesTwoSon: '',//场地照
    num: 0,//计数,
    loading: true,
    imgMasking:'',
    masking:false,
    go:0,
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrImg = []
      if (res.data.data.filesURL !== null && res.data.data.filesURL !== '') {
        let imgT = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length)
        let imgS = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length).split('|')
        if (imgT === '') {
          arrImg = []
        } else {
          for (let i in imgS) {
            arrImg.push({ url: imgUrlTwo+imgS[i] })
          }
        }

      }

      if (this.props.location.query !== undefined) {
        let arrjo = []
        if (res.data.data.sport !== null) {
          for (let i in res.data.data.sport.split(',')) {
            arrjo.push(Number(res.data.data.sport.split(',')[i]))
          }
        } else {
          arrjo = ''
        }
        this.setState({
          addressXian: this.props.location.query.adddress,
          address: this.props.location.query.title,
          lat: this.props.location.query.lat,
          lng: this.props.location.query.lng,
          handleAreaTwo: sessionStorage.getItem('handleAreaTwo'),
          handleCityTwo: sessionStorage.getItem('handleCityTwo'),
          handleDistrictTwo: sessionStorage.getItem('handleDistrictTwo'), stadiumName: res.data.data.name,
          telephone: res.data.data.telephone === null ? res.data.data.telephone : res.data.data.telephone.replace(/\s*/g, ""), linkMan: res.data.data.linkMan,
          filesSon: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? res.data.data.firstURL : '',
          files: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? [{ url: imgUrlTwo+res.data.data.firstURL }] : [],
          filesTwo: arrImg,
          filesTwoSon: res.data.data.filesURL === null ? '' : res.data.data.filesURL,
          onChangeRun: arrjo,
          onChangeCheck: res.data.data.facilities, textKo: res.data.data.siteInfo, siteUid: res.data.data.uid,
        })
      } else {
        let arrjo = []
        if (res.data.data.sport !== null) {
          for (let i in res.data.data.sport.split(',')) {
            arrjo.push(Number(res.data.data.sport.split(',')[i]))
          }
        }

        this.setState({
          address: res.data.data.position, addressXian: res.data.data.address, stadiumName: res.data.data.name,
          telephone: res.data.data.telephone === null ? res.data.data.telephone : res.data.data.telephone.replace(/\s*/g, ""), linkMan: res.data.data.linkMan,
          filesSon: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? res.data.data.firstURL : '',
          files: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? [{ url:imgUrlTwo+res.data.data.firstURL }] : [],
          filesTwo: arrImg,
          filesTwoSon: res.data.data.filesURL === null ? '' : res.data.data.filesURL,
          onChangeRun: arrjo,
          onChangeCheck: res.data.data.facilities, textKo: res.data.data.siteInfo,
          lat: res.data.data.lat, lng: res.data.data.lng,
          handleAreaTwo: res.data.data.province, handleCityTwo: res.data.data.city, handleDistrictTwo: res.data.data.area, siteUid: res.data.data.uid,
        })

      }

    }


  }

  async getVenueSportList(data) {
    const res = await getVenueSportList(data)
    this.setState({
      plainOptions: res.data.data
    })
  }


  async getIsSignOut(data) {
    const res = await getIsSignOut(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      localStorage.clear()
      Toast.fail('您的账号已在别处登录', 2)
    }
  }


  componentDidMount() {
    this.getVenueSportList()
    this.setState({
      stadiumName: sessionStorage.getItem('stadiumName')
    })

    this.getVenueInformation()
    var timer = setInterval(() => {
      if (this.props.history.location.pathname.split('/')[1] !== 'stadiumInformationPh') {
        clearInterval(timer)
      } else {
        this.getIsSignOut()
      }
    }, 3000)
    

  }



  mapPh = () => {
    this.props.history.push('/mapPh')
    sessionStorage.setItem('inforMap', 1)
  }
  xaingxi = e => {
    this.setState({ addressXian: e })
  }

  async UploadVenueImgs(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      this.setState({ filesSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ files: [], loading: true })
    } else {
      Toast.fail(res.data.msg, 2)
    }
  }


  handleChange = (files, type, index) => {
    this.setState({ files })
    if (type === 'add') {
      lrz(files[0].url, { quality: 0.5 })
        .then((rst) => {
          console.log(rst)
          this.setState({ loading: false })
          let formdata1 = new FormData();
          formdata1.append('files', rst.file);
          this.UploadVenueImgs(formdata1)
        })

    } else if (type === 'remove') {
      this.setState({ filesSon: '' })
    }


  }


  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }


  async UploadVenueImgsTwo(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      let resB = res.data.data.baseURL + res.data.data.filesURL
      this.setState({ filesTwoSon: this.state.filesTwoSon + '|' + resB, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      let ko = this.state.filesTwo
      ko.splice(this.state.num - 1, 1)
      this.setState({ filesTwo: ko, num: 0, loading: true })
    }
  }



  handleChangeT = (files, type, index) => {
    this.setState({ filesTwo: files })
    this.setState({ num: 0 })
    if (type === 'add') {
      if (files[files.length - 1].file.size / 1024 / 1024 < 9) {
        lrz(files[files.length - 1].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      let pok = this.state.filesTwoSon.slice(1, this.state.filesTwoSon.length).split('|')
      pok.splice(index, 1)
      this.setState({ filesTwoSon: pok.length === 0 ? '' : '|' + pok.join('|') })
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/qualificationPh')
    } else if (res.data.code === 4000) {
      Toast.fail(res.data.msg, 1)
      this.props.history.replace('/login')
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  stadiumName = e => {
    this.setState({ stadiumName: e })
    sessionStorage.setItem('stadiumName', e)
  }

  onChangeRun = e => {
    this.setState({ onChangeRun: e })
  }



  onChangeCheck = e => {
    this.setState({ onChangeCheck: e })
  }
  textKo = e => {
    this.setState({ textKo: e.target.value })
  }

  linkMan = e => {
    this.setState({ linkMan: e })
  }

  telephone = e => {
    this.setState({ telephone: e })
  }



  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/qualificationPh')
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }



  next = () => {
    let { stadiumName, lat, lng, linkMan, telephone, filesSon, filesTwoSon, addressXian, address, onChangeRun, onChangeCheck, textKo, handleAreaTwo, handleCityTwo, handleDistrictTwo } = this.state
    if (this.state.siteUid !== null) {
      if (lat === '') {
        Toast.fail('请选择场馆位置', 1)
      } if (stadiumName === '') {
        Toast.fail('请输入场馆名称', 1)
      } else if (linkMan === '') {
        Toast.fail('请填写联系人', 1)
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
        Toast.fail('联系人只允许输入文字/字母', 1)
      } else if (telephone === '') {
        Toast.fail('请输入联系电话', 1)
      } else if (filesSon === '') {
        Toast.fail('请选择场馆门脸照', 1)
      } else if (filesTwoSon === null || filesTwoSon === '') {
        Toast.fail('请上传场地照', 1)
      } else if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length < 2) {
        Toast.fail('最少上传两张场地照', 1)
      } else if (onChangeRun.length === 0) {
        Toast.fail('请选择场地类型', 1)
      } else if (onChangeCheck.length === 0 || onChangeCheck === ',,,') {
        Toast.fail('请选择场馆设施', 1)
      } else if (textKo === '') {
        Toast.fail('请输入场馆介绍', 1)
      } else {
        let data = {
          venueloginuuid: localStorage.getItem('uuid'),
          venuename: stadiumName,
          lat: lat,
          lng: lng,
          address: addressXian,
          filesURL: filesTwoSon,
          firstURL: filesSon,
          sport: onChangeRun === '' ? [] : typeof (onChangeRun) !== 'string' ? onChangeRun.join(',') : onChangeRun,
          facilities: onChangeCheck === '' ? [] : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
          siteInfo: textKo,
          linkMan: linkMan,
          telephone: telephone.replace(/\s*/g, ""),
          position: address,
          province: handleAreaTwo,
          city: handleCityTwo,
          area: handleDistrictTwo,
          type: 1
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中', 1)
        } else {
          this.VenueInformationSave(data)
        }
      }


    } else {
      if (lat === null || lat === '') {
        Toast.fail('请选择场馆位置', 1)
      } else if (addressXian === '' || addressXian === null) {
        Toast.fail('场馆详细地址不能为空', 1)
      } else if (addressXian === '' || addressXian === null) {
        Toast.fail('场馆详细地址不能为空', 1)
      } else if (stadiumName === null || stadiumName === '') {
        Toast.fail('请输入场馆名称', 1)
      } else if (linkMan === '' || linkMan === null) {
        Toast.fail('请填写联系人', 1)
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
        Toast.fail('联系人只允许输入文字/字母', 1)
      } else if (telephone === '') {
        Toast.fail('请输入联系电话', 1)
      } else if (filesSon === '') {
        Toast.fail('请选择场馆门脸照', 1)
      } else if (filesTwoSon === null || filesTwoSon === '') {
        Toast.fail('请上传场地照', 1)
      } else if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length < 2) {
        Toast.fail('最少上传两张场地照', 1)
      } else if (onChangeRun.length === 0) {
        Toast.fail('请选择场地类型', 1)
      } else if (onChangeCheck.length === 0 || onChangeCheck === ',,,') {
        Toast.fail('请选择场馆设施', 1)
      } else if (textKo === '') {
        Toast.fail('请输入场馆介绍', 1)
      } else {
        let data = {
          venueloginuuid: localStorage.getItem('uuid'),
          venuename: stadiumName,
          lat: lat,
          lng: lng,
          address: addressXian,
          filesURL: filesTwoSon,
          firstURL: filesSon,
          sport: onChangeRun === '' ? [] : typeof (onChangeRun) !== 'string' ? onChangeRun.join(',') : onChangeRun,
          facilities: onChangeCheck === '' ? [] : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
          siteInfo: textKo,
          linkMan: linkMan,
          telephone: telephone === null ? telephone : telephone.replace(/\s*/g, ""),
          position: address,
          province: handleAreaTwo,
          city: handleCityTwo,
          area: handleDistrictTwo,
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中', 1)
        } else {
          this.PerfectingVenueInformation(data)
        }
      }
    }
  }

  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack()
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
    this.props.history.replace('/login')
    localStorage.clear()
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
    } else {
      this.close()
    }
  }

  SaveInfor = () => {
    let { stadiumName, lat, lng, linkMan, telephone, filesTwoSon, filesSon, addressXian, address, onChangeRun, onChangeCheck, textKo, handleAreaTwo, handleCityTwo, handleDistrictTwo } = this.state
    let data = {
      siteuuid: this.state.siteUid,
      venueloginuuid: localStorage.getItem('uuid'),
      venuename: stadiumName,
      lat: lat,
      lng: lng,
      address: addressXian,
      filesURL: filesTwoSon,
      firstURL: filesSon,
      sport: onChangeRun === '' ? '' : typeof (onChangeRun) !== 'string' ? onChangeRun.join(',') : onChangeRun,
      facilities: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
      siteInfo: textKo,
      linkMan: linkMan,
      telephone: telephone === null ? telephone : telephone.replace(/\s*/g, ""),
      position: address,
      province: handleAreaTwo,
      city: handleCityTwo,
      area: handleDistrictTwo,
    }
    if (stadiumName === '') {
      Toast.fail('请填写场馆名称', 1)
    } else if (addressXian === '' || addressXian === null) {
      Toast.fail('场馆详细地址不能为空', 1)
    } else if (linkMan === '') {
      Toast.fail('请填写联系人', 1)
    } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
      Toast.fail('联系人只允许输入文字/字母', 1)
    } else {
      if (this.state.loading === false) {
        Toast.loading('图片上传中', 1)
      } else {
        this.props.location.query = undefined
        this.TemporaryVenueInformation(data)
      }
    }
  }

  async TemporaryVenueInformation(data) {
    const res = await TemporaryVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
        Toast.success(res.data.msg, 1)
      
      setTimeout(() => {
        this.getVenueInformation()
      }, 600)
    } else {
        Toast.fail(res.data.msg, 1)
    }
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  previewing = (files, index) => {
    if(this.state.loading===false){
      Toast.loading('图片上传中', 1)
    }else{
      this.setState({imgMasking:index[files].url,masking:true})
    }
  }
  maskingF=()=>{
    this.setState({masking:false})
  }



  render() {
    const { files, filesTwo } = this.state;

    return (
      <div className="stadiumInformationPh">
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
        ><span style={{ fontSize: '1rem' }}>完善信息</span></NavBar>
        <div className="boss">

          <div className="input" onClick={this.mapPh}>
            <span>场馆位置</span>
            <img className="imgAddress"  src={require("../../assets/icon_pc_dingwei.png")} alt="地址" />
            <InputItem
              placeholder="点击图标选择地址"
              value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.address}
              style={{ fontSize: '0.75rem', color: '#333' }}
              className="select selectOne"
              disabled={true}
              
            >
            </InputItem>
          </div>

          <div className="input">
            <TextareaItem
              title="详细地址"
              placeholder="请输入详细地址  "
              value={this.state.addressXian}
              style={{ fontSize: '0.75rem', float: 'right',paddingLeft:'0.45rem' }}
              onChange={this.xaingxi}
              autoHeight
            />

          </div>
          <div className="input">
            <span>场馆名称</span>
            <InputItem
              placeholder="请输入场馆名称"
              value={this.state.stadiumName}
              style={{ fontSize: '0.75rem' }}
              className="select"
              onChange={this.stadiumName}
            >
            </InputItem>
          </div>


          <div className="input">
            <span>联&nbsp;&nbsp;系&nbsp;&nbsp;人</span>
            <InputItem
              placeholder="请输入场馆联系人"
              value={this.state.linkMan}
              style={{ fontSize: '0.75rem' }}
              className="select"
              onChange={this.linkMan}
            >
            </InputItem>
          </div>

          <div className="input">
            <span>联系电话</span>
            <InputItem
              type='number'
              placeholder="请输入场馆联系人电话"
              value={this.state.telephone}
              style={{ fontSize: '0.75rem' }}
              className="select"
              onChange={this.telephone}
            >
            </InputItem>
          </div>




          <div className="input">
            <span style={{ lineHeight: '5rem', paddingRight: '0.8rem' }}>门脸照</span>

            <ImagePicker
              files={files}
              style={{ float: 'right', width: '75%', }}
              onChange={this.handleChange}
              selectable={files.length < 1}
              length={3}
              onImageClick={this.previewing}
              multiple={false}
            />
          </div>

          <div className="input">
            <span style={{ lineHeight: '20px' }}>场地照&nbsp;&nbsp;&nbsp;<br />(2-20张)</span>
            <ImagePicker
              files={filesTwo}
              style={{ float: 'right', width: '75%' }}
              onChange={this.handleChangeT}
              onImageClick={this.previewing}
              selectable={filesTwo.length < 20}
              length={3}
              multiple={false}
            />
          </div>

          <div className="input" style={{ width: '98%' }}>
            <span>场地类型</span>
            <Checkbox.Group options={this.state.plainOptions} value={this.state.onChangeRun} onChange={this.onChangeRun} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场馆设施</span>
            <Checkbox.Group options={options} style={{ fontSize: '0.75rem' }} value={this.state.onChangeCheck} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span style={{ lineHeight: '1.3rem' }}>场馆介绍</span>
            <TextArea rows={3} maxLength={200} onChange={this.textKo} style={{ padding: '0', width: '63%', marginLeft: '10%', fontSize: '0.75rem' }} value={this.state.textKo} placeholder="请输入场馆介绍，如场馆规模、特色等。" />
          </div>
          <div className="footerBtn">
            <div onTouchStart={this.SaveInfor}>保存</div>
            <div onTouchStart={this.next}>下一步</div>
          </div>
        </div>
        <div className={this.state.masking===true?'masking':'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img"/>
        </div>
      </div>
    );
  }
}

export default stadiumInformationPh;
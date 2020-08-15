import React from 'react';
import './stadiumInformationPh.css';

import { Toast, InputItem, NavBar, Popover, TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Upload, Checkbox, Modal } from 'antd';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PerfectingVenueInformation, getVenueInformation, VenueInformationSave, getVenueSportList, TemporaryVenueInformation, getIsSignOut } from '../../api';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input;
const Item = Popover.Item;
const options = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' }]

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}



function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  return isJpgOrPng
}



class stadiumInformationPh extends React.Component {

  state = {
    province: '',
    getCrty: '',
    address: '',
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
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrImg = []
      if (res.data.data.filesURL !== null&&res.data.data.filesURL !=='') {
        let imgS = (res.data.data.filesURL).split('|')
        for (let i in imgS) {
          arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
        }
      } else {
        arrImg = ''
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
          imageRes: res.data.data.firstURL, fileList: arrImg, onChangeRun: arrjo,
          onChangeCheck: res.data.data.facilities, textKo: res.data.data.siteInfo, siteUid: res.data.data.uid,
        })
      } else {
        let arrjo = []
        if (res.data.data.sport !== null) {

          for (let i in res.data.data.sport.split(',')) {
            arrjo.push(Number(res.data.data.sport.split(',')[i]))
          }
        } else {
          arrjo = ''
        }

        this.setState({
          address: res.data.data.position, addressXian: res.data.data.address, stadiumName: res.data.data.name,
          telephone: res.data.data.telephone === null ? res.data.data.telephone : res.data.data.telephone.replace(/\s*/g, ""), linkMan: res.data.data.linkMan,
          imageRes: res.data.data.firstURL, fileList: arrImg, onChangeRun: arrjo,
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
    }, 1500)
  }


  mapPh = () => {
    this.props.history.push('/mapPh')
    sessionStorage.setItem('inforMap', 1)
  }
  xaingxi = e => {
    this.setState({ addressXian: e })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false })
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageRes: 1 })
      }
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: true,
        })
      )
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 2)

    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 2)
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

  handleChangeT = ({ fileList }) => {
    this.setState({loading:false})
    let arrt=[]
    this.setState({ fileList: fileList })
    for (let i in fileList) {
      if(fileList[i].url===undefined){
        arrt.push(fileList[i].response===undefined?1:fileList[i].response)
      }
     
      if (fileList[i].response !== undefined && fileList[i].response.code === 4004) {
        fileList[i].thumbUrl = ''
        fileList[i].name = '图片违规'
        Toast.fail('有图片违规请重新上传', 2)
        this.setState({ fileList: fileList })
      }

    }
    if(arrt.indexOf(1)===-1){
      this.setState({loading:true})
      
    }




  }

  handleCancel = () => this.setState({ previewVisible: false });

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.props.history.push('/qualificationPh')
    } else if (res.data.code === 4000) {
      Toast.fail(res.data.msg, 1);
      this.props.history.push('/login')
    } else {
      Toast.fail(res.data.msg, 1);
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
      Toast.success('提交成功', 1)
      this.props.history.push('/qualificationPh')
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }


  next = () => {
    let { stadiumName, lat, lng, linkMan, telephone, imageRes, addressXian, address, fileList, onChangeRun, onChangeCheck, textKo, handleAreaTwo, handleCityTwo, handleDistrictTwo } = this.state
    if (this.state.siteUid !== null) {
      let fileListT = fileList.slice(0, 9)
      let filesURLarr = []
      for (let i in fileListT) {
        if (fileListT[i].response !== undefined) {
          if (fileListT[i].response.data.length === 0) {
            filesURLarr.push('无')
          } else {
            filesURLarr.push(fileListT[i].response.data.baseURL + fileListT[i].response.data.filesURL)
          }

        } else if (fileListT[i].response === undefined) {
          filesURLarr.push(fileListT[i].url)
        }
      }
      console.log(telephone)
      if (lat === '') {
        Toast.fail('请选择场馆位置', 1)
      } if (stadiumName === '') {
        Toast.fail('请输入场馆名称', 1)
      } else if (linkMan === '') {
        Toast.fail('请填写联系人', 1)
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
        Toast.fail('联系人只允许输入文字/字母', 1)
      }else if(telephone===''){
        Toast.fail('请输入联系电话', 1)
      } else if (imageRes === '') {
        Toast.fail('请选择场馆门脸照', 1)
      } else if (imageRes === 1) {
        Toast.fail('门脸照违规请重新上传', 1)
      } else if (filesURLarr.length < 2) {
        Toast.fail('最少上传两张场地照', 1)
      } else if (filesURLarr.indexOf('无') !== -1) {
        Toast.fail('场地照违规请重新上传', 1)
      } else if (onChangeRun.length === 0) {
        Toast.fail('请选择场地类型', 1)
      } else if (onChangeCheck.length === 0||onChangeCheck===',,,') {
        Toast.fail('请选择场地设施', 1)
      } else if (textKo === '') {
        Toast.fail('请输入场馆介绍', 1)
      } else {
        let data = {
          venueloginuuid: localStorage.getItem('uuid'),
          venuename: stadiumName,
          lat: lat,
          lng: lng,
          address: addressXian,
          filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
          firstURL: imageRes,
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
        console.log(this.state.loading)
        if (this.state.loading === false) {
          Toast.fail('图片上传中', 1)
        } else {
          this.VenueInformationSave(data)
        }
      }


    } else {

      let fileListT = fileList.slice(0, 9)
      let filesURLarr = []
      for (let i in fileListT) {
        if (fileListT[i].response !== undefined) {
          if (fileListT[i].response.data.length === 0) {
            filesURLarr.push('无')
          } else {
            filesURLarr.push(fileListT[i].response.data.baseURL + fileListT[i].response.data.filesURL)
          }

        } else if (fileListT[i].response === undefined) {
          filesURLarr.push(fileListT[i].url)
        }
      }
      console.log(imageRes)
      if (lat === null||lat === '') {
        Toast.fail('请选择场馆位置', 1)
      }else if(addressXian===''||addressXian===null){
        Toast.fail('场馆详细地址不能为空', 1)
      } else if(addressXian===''||addressXian===null){
        Toast.fail('场馆详细地址不能为空', 1)
      } else if (stadiumName === null || stadiumName === '') {
        Toast.fail('请输入场馆名称', 1)
      } else if (linkMan === '' || linkMan === null) {
        Toast.fail('请填写联系人', 1)
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
        Toast.fail('联系人只允许输入文字/字母', 1)
      }else if(telephone===''){
        Toast.fail('请输入联系电话', 1)
      }  else if (imageRes === '' || imageRes === null) {
        Toast.fail('请选择场馆门脸照', 1)
      } else if (imageRes === 1) {
        Toast.fail('门脸照违规请重新上传', 1)
      } else if (filesURLarr.length < 2) {
        Toast.fail('最少上传两张场地照', 1)
      } else if (filesURLarr.indexOf('无') !== -1) {
        Toast.fail('场地照违规请重新上传', 1)
      } else if (onChangeRun.length === 0) {
        Toast.fail('请选择场地类型', 1)
      } else if (onChangeCheck.length === 0||onChangeCheck===',,,') {
        Toast.fail('请选择场地设施', 1)
      } else if (textKo === '') {
        Toast.fail('请输入场馆介绍', 1)
      } else {
        let data = {
          venueloginuuid: localStorage.getItem('uuid'),
          venuename: stadiumName,
          lat: lat,
          lng: lng,
          address: addressXian,
          filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
          firstURL: imageRes,
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
          Toast.fail('图片上传中', 1)
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
    this.props.history.push('/login')
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
    } else {
      this.close()
    }
  }

  SaveInfor = () => {
    let { stadiumName, lat, lng, linkMan, telephone, imageRes, addressXian, address, fileList, onChangeRun, onChangeCheck, textKo, handleAreaTwo, handleCityTwo, handleDistrictTwo } = this.state
    let fileListT = fileList.slice(0, 9)
    let filesURLarr = []
    for (let i in fileListT) {
      if (fileListT[i].response !== undefined) {
        if (fileListT[i].response.data.length === 0) {
          filesURLarr.push('无')
        } else {
          filesURLarr.push(fileListT[i].response.data.baseURL + fileListT[i].response.data.filesURL)
        }

      } else if (fileListT[i].response === undefined) {
        filesURLarr.push(fileListT[i].url)
      }
    }

    let data = {
      siteuuid: this.state.siteUid,
      venueloginuuid: localStorage.getItem('uuid'),
      venuename: stadiumName,
      lat: lat,
      lng: lng,
      address: addressXian,
      filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
      firstURL: imageRes,
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
    }else if(addressXian===''||addressXian===null){
      Toast.fail('场馆详细地址不能为空', 1)
    }  else if (linkMan === '') {
      Toast.fail('请填写联系人', 1)
    } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(linkMan) === false) {
      Toast.fail('联系人只允许输入文字/字母', 1)
    } else if (data.firstURL === 1) {
      Toast.fail('门脸照违规请重新上传', 1)
    } else if (data.filesURL.split('|').indexOf('无') !== -1) {
      Toast.fail('场地照违规请重新上传', 1)
    } else {
      if(this.state.loading===false){
        Toast.fail('图片上传中', 1)
      }else{
      this.TemporaryVenueInformation(data)
      }
    }


  }

  async TemporaryVenueInformation(data) {
    const res = await TemporaryVenueInformation(data)
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1)
      this.getVenueInformation()
    } else {
      Toast.fail(res.data.msg, 1)
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }



  render() {

    const uploadButton = (
      <div>
        <svg t="1596268702646" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const { imageRes } = this.state;

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButtonT = (
      <div>
        <svg t="1596268702646" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )

    const propsOne = {
      aspect: 1.295 / 1,
      resize: true, //裁剪是否可以调整大小
      resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
      modalTitle: "编辑图片", //弹窗标题
      modalWidth: 600, //弹窗宽度
      modalOk: "确定",
      modalCancel: "取消"
    }


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
            <img className="imgAddress" onClick={this.mapPh} src={require("../../assets/icon_pc_dingwei.png")} alt="地址" />
            <InputItem
              placeholder="点击图标选择地址"
              value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.address}
              style={{ fontSize: '0.75rem', color: '#333' }}
              className="select selectOne"
              disabled={true}
              onClick={this.mapPh}
            >
            </InputItem>

          </div>

          <div className="input">

            <TextareaItem
              title="详细地址"
              placeholder="请输入详细地址  "
              value={this.state.addressXian}
              style={{ fontSize: '0.75rem', float: 'right' }}
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
            <ImgCrop scale rotate {...propsOne}>
              <Upload
                name="files"
                listType="picture-card"
                className="avatar-uploader addImg"
                showUploadList={false}
                action="/api/UploadVenueImgs?type=Venue"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                accept="image/*"
                multiple={false}
              >
                {imageRes !== 1 && imageRes !== '' && imageRes !== null ? <div className="avatar"><img src={'https://app.tiaozhanmeiyitian.com/' + imageRes} alt="avatar" style={{ width: '100%', height: '100%', position: 'absolute', left: '50%', marginLeft: '-2.15rem', top: '0' }} /></div> : uploadButton}
              </Upload>

            </ImgCrop>
          </div>

          <div className="input">
            <span style={{ lineHeight: '20px' }}>场地照&nbsp;&nbsp;&nbsp;<br />(2-8张)</span>
            <Upload
              name="files"
              action="/api/UploadVenueImgs?type=Venue"
              listType="picture-card"
              fileList={fileList.slice(0, 8)}
              onPreview={this.handlePreview}
              onChange={this.handleChangeT}
              accept="image/*"
              multiple={true}
            >
              {fileList.length >= 8 ? null : uploadButtonT}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          <div className="input" style={{ width: '98%' }}>
            <span>场地类型</span>
            <Checkbox.Group options={this.state.plainOptions} value={this.state.onChangeRun} onChange={this.onChangeRun} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span>场地设施</span>
            <Checkbox.Group options={options} style={{ fontSize: '0.75rem' }} value={this.state.onChangeCheck} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="input">
            <span style={{ lineHeight: '1.3rem' }}>场馆介绍</span>
            <TextArea rows={3} maxLength={200} onChange={this.textKo} style={{ padding: '0', width: '63%', marginLeft: '10%', fontSize: '0.75rem' }} value={this.state.textKo} placeholder="请输入场馆介绍，如场馆规模、特色等。" />
          </div>
          <div className="footerBtn">
            <div onClick={this.SaveInfor}>保存</div>
            <div onClick={this.next}>下一步</div>

          </div>




        </div>
      </div>
    );
  }
}

export default stadiumInformationPh;
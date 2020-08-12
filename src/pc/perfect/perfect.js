import React from 'react';
import './perfect.css';
import 'antd/dist/antd.css';
import { PerfectingVenueInformation, getVenueInformation, getVenueSportList, VenueInformationSave, TemporaryVenueInformation } from '../../api';
import { Input, Checkbox, Button, Upload, message, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
const { TextArea } = Input;




const options = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' },]




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
    message.error('只能上传PNG/JPG格式图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('上传图片必须小于5MB');
  }
  return isJpgOrPng && isLt2M;
}


class perfect extends React.Component {

  state = {
    handleName: '',//场馆名称
    handleAddress: this.props.location.query === undefined ? '' : this.props.location.query.adddress,//场馆详细地址
    onChangeCheck: '',//运动项目
    onChangeSite: '',//场地设施
    province: '',//获取的省数组
    city: '',//获取市数组
    getArea: '',//获取区县数组
    loadinng: false,
    previewVisible: false,
    previewImage: '',
    imageRes: '',//上传门脸照的返回
    onChangeText: '',//输入框
    fileList: [],
    position: '',
    lat: '',
    lng: '',
    handelPerson: '',
    handleTelephone: '',
    plainOptions: [],
    siteUid: '',
    click:true
  };



  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      sessionStorage.clear()
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      let arrImg = []
      if (res.data.data.filesURL !== null && res.data.data.filesURL !== '') {
        let imgS = (res.data.data.filesURL).split('|')
        for (let i in imgS) {
          arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
        }
      } else {
        arrImg = []
      }

      localStorage.setItem('handleName', res.data.data.name)
      let arrjo = []
      for (let i in res.data.data.sport.split(',')) {
        arrjo.push(Number(res.data.data.sport.split(',')[i]))
      }
      this.setState({
        position: res.data.data.position, handleAddress: this.props.location.query === undefined ? res.data.data.address : this.props.location.query.adddress, handleName: res.data.data.name, imageUrl: res.data.data.firstURL, fileList: arrImg,
        onChangeCheck: arrjo, onChangeSite: res.data.data.facilities === ',,,' ? '' : res.data.data.facilities, onChangeText: res.data.data.siteInfo, lat: res.data.data.lat, lng: res.data.data.lng,
        province: res.data.data.province, city: res.data.data.city, area: res.data.data.area, siteUid: res.data.data.uid,
        imageRes: res.data.data.firstURL, handelPerson: res.data.data.linkMan, handleTelephone: res.data.data.telephone,click:true
      })

    }
  }



  async getVenueSportList(data) {
    const res = await getVenueSportList(data)
    this.setState({
      plainOptions: res.data.data
    })
  }


  componentDidMount() {
    this.getVenueSportList()
    this.getVenueInformation()
  }





  routerMap = () => {

    console.log()
    this.props.history.push({ pathname: '/map', query: { type: localStorage.getItem('handleDistrict'), city: localStorage.getItem('handleCity') } })
    sessionStorage.setItem('hanclick', 1)
  }
  handleName = e => {
    this.setState({ handleName: e.target.value })
    localStorage.setItem('handleName', e.target.value)
  }
  handleAddress = e => {
    this.setState({ handleAddress: e.target.value })
  }
  onChangeCheck = e => {
    this.setState({ onChangeCheck: e })
    sessionStorage.setItem('onChangeCheck', e)
  }

  onChangeSite = e => {
    this.setState({ onChangeSite: e })
    sessionStorage.setItem('onChangeSite', e)
  }





  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false })
      return
    }
    if (info.file.status === 'done') {
        this.setState({loading:true})
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


  handleCancel = () => this.setState({ previewVisible: false });

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
        message.error('有图片违规请重新上传')
        this.setState({ fileList: fileList })
      }
    }
    if(arrt.indexOf(1)===-1){
      this.setState({loading:true})
    }

  }

  onChangeText = e => {
    this.setState({ onChangeText: e.target.value })
  }






  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/qualification')
      message.success('提交成功')
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录')
    } else {
      message.warning(res.data.msg)
    }
  }

  onClickNex = () => {
    let { imageRes, fileList, handleAddress, handelPerson, handleTelephone, onChangeSite, onChangeCheck } = this.state
    let fileListT = fileList.slice(0, 9)
    if (this.state.siteUid !== '' && this.state.siteUid !== null) {

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
        venuename: localStorage.getItem('handleName'),
        lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
        lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
        province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
        city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
        area: this.props.location.query === undefined ? this.state.area : this.props.location.query.district,
        address: handleAddress,
        filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
        firstURL: imageRes,
        sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
        facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
        siteInfo: this.state.onChangeText,
        position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
        type: 1,
        linkMan: handelPerson,
        telephone: handleTelephone,
      }
      if (data.lat === '') {
        message.warning('请选择场馆位置')
      }else if (data.venuename === '') {
        message.warning('请填写场馆名称')
      } else if (handelPerson === '') {
        message.warning('请填写联系人')
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
        message.warning('联系人只允许输入文字/字母')
      } else if (data.telephone === '') {
        message.warning('请输入联系人电话')
      } else if (imageRes === '') {
        message.warning("请上传门脸照")
      } else if (data.firstURL === 1) {
        message.warning('门脸照违规请重新上传')
      } else if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")
      } else if (data.filesURL.split('|').indexOf('无') !== -1) {
        message.warning('场地照有违规图片请重新上传')
      } else if (data.sport === ''||data.sport === '0') {
        message.warning('请选择场地类型')
      } else if (data.facilities === ''||data.facilities === ',,,') {
        message.warning('请选择至少一项场地设施')
      } else {
        if(this.state.loading===false){
          message.warning('图片上传中...')
        }else{
          this.VenueInformationSave(data)
        }
      }


    } else {
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
        venueloginuuid: sessionStorage.getItem('uuid'),
        province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
        city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
        area: this.props.location.query === undefined ? this.state.area : this.props.location.query.district,
        venuename: localStorage.getItem('handleName'),
        lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
        lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
        address: handleAddress,
        filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
        firstURL: imageRes,
        sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
        facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
        siteInfo: this.state.onChangeText,
        position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
        linkMan: handelPerson,
        telephone: handleTelephone,
      }
      
      if (data.lat === null||data.lat==='') {
        message.warning('请选择场馆位置')
      }else if (data.venuename=== 'null'||data.venuename=== '') {
        message.warning('请填写场馆名称')
      } else if (handelPerson === null||handelPerson === '') {
        message.warning('请填写联系人')
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
        message.warning('联系人只允许输入文字/字母')
      } else if (data.telephone === null||data.telephone === '') {
        message.warning('请输入联系人电话')
      } else if (imageRes === null||imageRes === '') {
        message.warning("请上传门脸照")
      } else if (data.firstURL === 1) {
        message.warning('门脸照违规请重新上传')
      } else if (filesURLarr.length < 2) {
        message.warning("至少上传两张场地照片")
      } else if (data.filesURL.split('|').indexOf('无') !== -1) {
        message.warning('场地照有违规图片请重新上传')
      } else if (data.sport === ''||data.sport === '0') {
        message.warning('请选择场地类型')
      } else if (data.facilities === ''||data.facilities === ',,,') {
        message.warning('请选择至少一项场地设施')
      } else {
        if(this.state.loading===false){
          message.warning('图片上传中...')
        }else{
        this.PerfectingVenueInformation(data)
        }
      }
    }
  }

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data)
    if (res.data.code === 2000) {
      this.props.history.push('/qualification')
    } else {
      message.warning(res.data.msg)
    }
  }

  handelPerson = (e) => {
    this.setState({ handelPerson: e.target.value })
  }
  handleTelephone = (e) => {
    this.setState({ handleTelephone: e.target.value })
  }


  async TemporaryVenueInformation(data) {
    const res = await TemporaryVenueInformation(data)
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({click:false})
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }

  onClickSave = () => {
    if(this.state.click===true){

    
    let { imageRes, fileList, handleAddress, handelPerson, handleTelephone, onChangeCheck, onChangeSite } = this.state
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
      venueloginuuid: sessionStorage.getItem('uuid'),
      province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
      city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
      area: this.props.location.query === undefined ? this.state.area : this.props.location.query.district,
      venuename: localStorage.getItem('handleName'),
      lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
      lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
      address: handleAddress,
      filesURL: filesURLarr === null ? '' : filesURLarr.join('|'),
      firstURL: imageRes,
      sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
      facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
      siteInfo: this.state.onChangeText,
      position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
      linkMan: handelPerson,
      telephone: handleTelephone,
    }
    if (localStorage.getItem('handleName') === 'null') {
      message.error('请填写场馆名称')
    } else if (handelPerson === '') {
      message.error('请填写联系人')
    } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
      message.error('联系人只允许输入文字/字母')
    } else if (data.firstURL === 1) {
      message.error('门脸照违规请重新上传');
    } else if (data.filesURL.split('|').indexOf('无') !== -1) {
      message.error('场地照有违规图片请重新上传');
    } else {
      if(this.state.loading===false){
        message.warning('图片上传中...')
      }else{
      this.TemporaryVenueInformation(data)
      }
    }
  }
  }

  render() {



    const uploadButton = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    const { imageRes } = this.state

    const { previewVisible, previewImage, fileList } = this.state
    const uploadButtonT = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )

    const propsOne = {
      aspect: 1.295 / 1,
      resize: false, //裁剪是否可以调整大小
      resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
      modalTitle: "编辑图片", //弹窗标题
      modalWidth: 600, //弹窗宽度
      modalOk: "确定",
      modalCancel: "取消"
    }




    return (
      <div className="perfect">
        <div className="header">
          <div className="heCenter">
            <img className="logo" src={require("../../assets/tiaozhanicon.png")} style={{ width: 53, height: 53, marginLeft: 45, marginTop: 13.5 }} alt="6666" />
            <span className="title">北京甲乙电子商务有限公司</span>
          </div>
          
      </div>
          <div className="content">
            <div className="nav">
              <div><span>1.填写注册信息</span><img src={require("../../assets/oneline.png")} alt="5" /></div>
              <div><span>2.完善基本信息</span><img src={require("../../assets/lineThree.png")} alt="5" /></div>
              <div><span>3.等待审核</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
              <div><span>4.审核结果</span><img src={require("../../assets/twoline.png")} alt="5" /></div>
            </div>
            <div className="contentSon">
              <span className="titile">场馆基本信息</span>
              <div className="area">



              </div>
              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆位置</span>
                <Input className="nameINput" disabled={true} value={this.props.location.query !== undefined ? this.props.location.query.title : this.state.position} placeholder="请选择场馆位置" />
                <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">详细地址</span>
                <TextArea className="nameINput" autoSize={true} onChange={this.handleAddress} value={this.state.handleAddress} placeholder="请输入场馆详细地址如门牌号楼层" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆名称</span>
                <Input className="nameINput" onChange={this.handleName} value={this.state.handleName} placeholder="请输入场馆名称" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">联<span style={{ paddingLeft: 8 }}>系</span><span style={{ paddingLeft: 8 }}>人</span></span>
                <Input className="nameINput" onChange={this.handelPerson} style={{ marginLeft: '27px' }} value={this.state.handelPerson} placeholder="请输入联系人姓名" />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">联系电话</span>
                <Input className="nameINput"  onChange={this.handleTelephone} value={this.state.handleTelephone} placeholder="请输入联系人电话" />
              </div>

              <div className="name">
                <span className="symbol negative">*</span><span className="boTitle negativeT">门脸照</span>
                <ImgCrop scale {...propsOne}>
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
                    {imageRes !== 1 && imageRes !== '' && imageRes !== null ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageRes} alt="avatar" style={{ width: '100%', height: '100%' }} /> : uploadButton}
                  </Upload>
                </ImgCrop>
                <span className="rightText">上传图片小于5M</span>
              </div>

              <div className="name">
                <span className="symbol negativeTwo">*</span><span className="boTitle negativeTwoT">场地照(2-8张)</span>
                <div className="clearfix">

                  <Upload
                    fileNumLimit='5'
                    name="files"
                    action="/api/UploadVenueImgs?type=Venue"
                    listType="picture-card"
                    fileList={fileList.slice(0, 8)}
                    onPreview={this.handlePreview}
                    onChange={this.handleChangeT}
                    accept=".jpg, .jpeg, .png"
                    multiple={true}
                  >
                    {fileList.length >= 8 ? null : uploadButtonT}
                  </Upload>

                  <span className="rightText">上传图片小于5M</span>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </div>

              <div className="name" style={{ overflow: 'hidden' }}>
                <span className="symbol">*</span><span className="boTitle">场地类型</span><span className="kong"></span>
                <Checkbox.Group style={{ float: 'left', width: '80%', marginLeft: '26.8px' }} className="chekkoh" options={this.state.plainOptions} onChange={this.onChangeCheck} value={this.state.onChangeCheck} /><br /><span className="kong"></span>
              </div>



              <div className="name" >
                <span className="symbol">*</span><span className="boTitle">场地设施</span><span className="kong"></span>
                <Checkbox.Group options={options} onChange={this.onChangeSite} value={this.state.onChangeSite} />
              </div>

              <div className="name">
                <span className="symbol">*</span><span className="boTitle">场馆介绍</span><span className="kong"></span>
                <TextArea className="textarea" placeholder="请输入场馆介绍，如场馆规模、特色等。" onChange={this.onChangeText} maxLength={200} value={this.state.onChangeText} rows={4} />
              </div>

              <div className="prompt">请注意<span>*</span>为必填项</div>
              <Button className="next" onClick={this.onClickNex}>下一步</Button><Button className="next" style={{ marginLeft: '20px' }} onClick={this.onClickSave}>保存</Button>
            </div>
          </div>
        </div>
    )
  }
}

export default perfect;
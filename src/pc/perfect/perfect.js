import React from 'react';
import './perfect.css';
import 'antd/dist/antd.css';
import { PerfectingVenueInformation, getVenueInformation, getVenueSportList, VenueInformationSave, imgUrlTwo, TemporaryVenueInformation, UploadVenueImgs } from '../../api';
import { Input, Checkbox, Button, message,Select } from 'antd';
import { ImagePicker } from 'antd-mobile';
import lrz from 'lrz';
const { TextArea } = Input;
const { Option } = Select;





const options = [{ label: '停车场', value: '1' }, { label: 'WiFi', value: '2' }, { label: '淋浴', value: '3' }, { label: '室内摄像头', value: '4' },]







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
    onChangeText: '',//输入框
    position: '',
    lat: '',
    lng: '',
    handelPerson: '',
    handleTelephone: '',
    plainOptions: [],
    siteUid: '',
    click: true,
    files: [],
    filesSon: '',//门脸照
    filesTwo: [],
    filesTwoSon: '',//场地照
    imgMasking: '',
    masking: false,
    starttime:'',
    endtime:'',
    timer: [{ name: '00:00' }, { name: '00:30' }, { name: '01:00' }, { name: '01:30' }, { name: '02:00' }, { name: '02:30' }, { name: '03:00' }, { name: '03:30' }, { name: '04:00' }, { name: '04:30' }, { name: '05:00' }, { name: '05:30' }, { name: '06:00' }, { name: '06:30' }, { name: '07:00' }, { name: '07:30' }, { name: '08:00' }, { name: '08:30' }, { name: '09:00' }, { name: '09:30' }, { name: '10:00' }, { name: '10:30' }, { name: '11:00' }, { name: '11:30' }, { name: '12:00' }, { name: '12:30' }, { name: '13:00' }, { name: '13:30' }, { name: '14:00' }, { name: '14:30' }, { name: '15:00' }, { name: '15:30' }, { name: '16:00' }, { name: '16:30' }, { name: '17:00' }, { name: '17:30' }, { name: '18:00' }, { name: '18:30' }, { name: '19:00' }, { name: '19:30' }, { name: '20:00' }, { name: '20:30' }, { name: '21:00' }, { name: '21:30' }, { name: '22:00' }, { name: '22:30' }, { name: '23:00' }, { name: '23:30' }, { name: '24:00' }],
    
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
        let imgT = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length)
        let imgS = (res.data.data.filesURL).slice(1, (res.data.data.filesURL).length).split('|')
        if (imgT === '') {
          arrImg = []
        } else {
          for (let i in imgS) {
            arrImg.push({ url: imgUrlTwo + imgS[i] })
          }
        }

      }

      localStorage.setItem('handleName', res.data.data.name)
      let arrjo = []
      for (let i in res.data.data.sport.split(',')) {
        arrjo.push(Number(res.data.data.sport.split(',')[i]))
      }
      this.setState({
        position: res.data.data.position, handleAddress: this.props.location.query === undefined ? res.data.data.address : this.props.location.query.adddress, handleName: res.data.data.name, imageUrl: res.data.data.firstURL,
        filesTwo: arrImg,
        filesTwoSon: res.data.data.filesURL === null ? '' : res.data.data.filesURL,
        onChangeCheck: arrjo, onChangeSite: res.data.data.facilities === ',,,' ? '' : res.data.data.facilities, onChangeText: res.data.data.siteInfo, lat: res.data.data.lat, lng: res.data.data.lng,
        province: res.data.data.province, city: res.data.data.city, area: res.data.data.area, siteUid: res.data.data.uid,
        filesSon: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? res.data.data.firstURL : '',
        files: res.data.data.firstURL !== null && res.data.data.firstURL !== '' ? [{ url: imgUrlTwo + res.data.data.firstURL }] : [],
        handelPerson: res.data.data.linkMan, handleTelephone: res.data.data.telephone, click: true,
        starttime:res.data.data.openingtime,endtime:res.data.data.closingtime
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


  async UploadVenueImgs(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      this.setState({ filesSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
      this.setState({ files: [], loading: true })
    } else {
      message.warning(res.data.msg, 2)
    }
  }


  handleChange = (files, type, index) => {
    this.setState({ files })
    if (type === 'add') {
      lrz(files[0].url, { quality: 0.5 })
        .then((rst) => {
          this.setState({ loading: false })
          let formdata1 = new FormData();
          formdata1.append('files', rst.file);
          this.UploadVenueImgs(formdata1)
        })

    } else if (type === 'remove') {
      this.setState({ filesSon: '' })
    }


  }




  async UploadVenueImgsTwo(data) {
    const res = await UploadVenueImgs(data)
    if (res.data.code === 2000) {
      let resB = res.data.data.baseURL + res.data.data.filesURL
      this.setState({ filesTwoSon: this.state.filesTwoSon + '|' + resB, loading: true })
    } else if (res.data.code === 4004) {
      message.warning('图片违规请重新上传', 2)
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
        message.warning('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      let pok = this.state.filesTwoSon.slice(1, this.state.filesTwoSon.length).split('|')
      pok.splice(index, 1)
      this.setState({ filesTwoSon: pok.length === 0 ? '' : '|' + pok.join('|') })
    }
  }

  onChangeText = e => {
    this.setState({ onChangeText: e.target.value })
  }


  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/qualification')
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录')
    } else {
      message.warning(res.data.msg)
    }
  }

  onClickNex = () => {
    let { filesSon, handleAddress, handelPerson, filesTwoSon, handleTelephone, onChangeSite, onChangeCheck,starttime,endtime } = this.state

    if (this.state.siteUid !== '' && this.state.siteUid !== null) {



      let data = {
        venuename: localStorage.getItem('handleName'),
        lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
        lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
        province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
        city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
        area: this.props.location.query === undefined ? this.state.area : this.props.location.query.district,
        address: handleAddress,
        filesURL: filesTwoSon,
        firstURL: filesSon,
        sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
        facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
        siteInfo: this.state.onChangeText,
        position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
        type: 1,
        linkMan: handelPerson,
        telephone: handleTelephone,
        openingtime:starttime,
        closingtime:endtime
      }
      if (data.lat === '') {
        message.warning('请选择场馆位置')
      } else if (data.venuename === '') {
        message.warning('请填写场馆名称')
      } else if (handelPerson === '') {
        message.warning('请填写联系人')
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
        message.warning('联系人只允许输入文字/字母')
      } else if (data.telephone === '') {
        message.warning('请输入联系人电话')
      } else if (filesSon === '') {
        message.warning('请选择场馆门脸照', 1)
      } else if (filesTwoSon === null || filesTwoSon === '') {
        message.warning('请上传场地照', 1)
      } else if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length < 2) {
        message.warning('最少上传两张场地照', 1)
      } else if (data.filesURL.split('|').indexOf('无') !== -1) {
        message.warning('场地照有违规图片请重新上传')
      } else if (data.sport === '' || data.sport === '0') {
        message.warning('请选择场地类型')
      } else if (data.facilities === '' || data.facilities === ',,,') {
        message.warning('请选择至少一项场馆设施')
      } else {
        if (this.state.loading === false) {
          message.warning('图片上传中...')
        } else {
          this.VenueInformationSave(data)
        }
      }


    } else {


      let data = {
        venueloginuuid: sessionStorage.getItem('uuid'),
        province: this.props.location.query === undefined ? this.state.province : this.props.location.query.province,
        city: this.props.location.query === undefined ? this.state.city : this.props.location.query.city,
        area: this.props.location.query === undefined ? this.state.area : this.props.location.query.district,
        venuename: localStorage.getItem('handleName'),
        lat: this.props.location.query === undefined ? this.state.lat : this.props.location.query.lat,
        lng: this.props.location.query === undefined ? this.state.lng : this.props.location.query.lng,
        address: handleAddress,
        filesURL: filesTwoSon,
        firstURL: filesSon,
        sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
        facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
        siteInfo: this.state.onChangeText,
        position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
        linkMan: handelPerson,
        telephone: handleTelephone,
        openingtime:starttime,
        closingtime:endtime
      }

      if (data.lat === null || data.lat === '') {
        message.warning('请选择场馆位置')
      } else if (data.venuename === 'null' || data.venuename === '') {
        message.warning('请填写场馆名称')
      } else if (handelPerson === null || handelPerson === '') {
        message.warning('请填写联系人')
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
        message.warning('联系人只允许输入文字/字母')
      } else if (data.telephone === null || data.telephone === '') {
        message.warning('请输入联系人电话')
      } else if (filesTwoSon === null || filesTwoSon === '') {
        message.warning('请上传场地照', 1)
      } else if (filesTwoSon.slice(1, filesTwoSon.length).split('|').length < 2) {
        message.warning('最少上传两张场地照', 1)
      } else if (data.sport === '' || data.sport === '0') {
        message.warning('请选择场地类型')
      } else if (data.facilities === '' || data.facilities === ',,,') {
        message.warning('请选择至少一项场馆设施')
      } else {
        if (this.state.loading === false) {
          message.warning('图片上传中...')
        } else {
          this.PerfectingVenueInformation(data)
        }
      }
    }
  }

  async PerfectingVenueInformation(data) {
    const res = await PerfectingVenueInformation(data, sessionStorage.getItem('venue_token'))
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
    const res = await TemporaryVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ click: false })
      this.props.location.query = undefined
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }




  onClickSave = () => {
    if (this.state.click === true) {


      let { filesSon, filesTwoSon, handleAddress, handelPerson, handleTelephone, onChangeCheck, onChangeSite,starttime,endtime } = this.state


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
        filesURL: filesTwoSon,
        firstURL: filesSon,
        sport: onChangeCheck === '' ? '' : typeof (onChangeCheck) !== 'string' ? onChangeCheck.join(',') : onChangeCheck,
        facilities: onChangeSite === '' ? '' : typeof (onChangeSite) !== 'string' ? onChangeSite.join(',') : onChangeSite,
        siteInfo: this.state.onChangeText,
        position: this.props.location.query === undefined ? this.state.position : this.props.location.query.title,
        linkMan: handelPerson,
        telephone: handleTelephone,
        openingtime:starttime,
        closingtime:endtime

      }
      if (data.lat === '') {
        message.warning('请选择场馆位置')
      } else if (handleAddress === '') {
        message.warning('请填写场馆详细地址')
      } else if (localStorage.getItem('handleName') === 'null') {
        message.warning('请填写场馆名称')
      } else if (handelPerson === '') {
        message.warning('请填写联系人')
      } else if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(handelPerson) === false) {
        message.warning('联系人只允许输入文字/字母')
      } else {
        if (this.state.loading === false) {
          message.warning('图片上传中...')
        } else {
          this.TemporaryVenueInformation(data)
        }
      }
    }
  }
  previewing = (files, index) => {
    if (this.state.loading === false) {
      message.warning('图片上传中...', 1)
    } else {
      this.setState({ imgMasking: index[files].url, masking: true })
    }
  }
  maskingF = () => {
    this.setState({ masking: false })
  }

  starttime=(e)=>{
    this.setState({starttime:e})
  }
  endtime=(e)=>{
    this.setState({endtime:e})
  }


  render() {
    const { files, filesTwo } = this.state
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
              <Input className="nameINput" onChange={this.handleTelephone} value={this.state.handleTelephone} placeholder="请输入联系人电话" />
            </div>

            <div className="name">
              <span className="symbol negative">*</span><span className="boTitle negativeT">门脸照</span>
              <ImagePicker
                files={files}
                style={{ float: 'left', width: '15%', marginLeft: '27px' }}
                onChange={this.handleChange}
                selectable={files.length < 1}
                length={1}
                onImageClick={this.previewing}
                multiple={false}
              />
            </div>

            <div className="name">
              <span className="symbol negativeTwo">*</span><span className="boTitle negativeTwoT">场地照(2-20张)</span>
              <div className="clearfix">

                <ImagePicker
                  files={filesTwo}
                  style={{ float: 'left', width: '65%', marginLeft: '20px' }}
                  onChange={this.handleChangeT}
                  onImageClick={this.previewing}
                  selectable={filesTwo.length < 20}
                  length={5}
                  multiple={false}
                />
              </div>
            </div>

            <div className="name" style={{ overflow: 'hidden' }}>
              <span className="symbol">*</span><span className="boTitle">场地类型</span><span className="kong"></span>
              <Checkbox.Group style={{ float: 'left', width: '80%', marginLeft: '26.8px' }} className="chekkoh" options={this.state.plainOptions} onChange={this.onChangeCheck} value={this.state.onChangeCheck} /><br /><span className="kong"></span>
            </div>

            <div className="name" style={{ overflow: 'hidden' }}>
              <span className="symbol">*</span><span className="boTitle">营业时间</span><span className="kong"></span>
              <Select style={{ width: 128, height: 'auto', marginLeft: 28, float: 'left' }} value={this.state.starttime === '' ? '00:00' : this.state.starttime} onChange={this.starttime} placeholder="开始时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select><span style={{float:'left',marginLeft:'25px',lineHeight:'32px'}}>至</span><Select style={{ width: 130, height: 'auto' }} value={this.state.endtime === '' ? '24:00' : this.state.endtime} onChange={this.endtime} placeholder="结束时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select>
             
            </div>


            <div className="name" >
              <span className="symbol">*</span><span className="boTitle">场馆设施</span><span className="kong"></span>
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

        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>

      </div>
    )
  }
}

export default perfect;
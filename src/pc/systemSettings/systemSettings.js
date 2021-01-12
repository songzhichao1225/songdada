import React from 'react';
import './systemSettings.css';
import 'antd/dist/antd.css';
import { _code, VenueChangePassword, VenueBindingPhone, getVenueSport, VenueTemporarilyClosed,VenueAdvertiseSave, VenueAdvertiseFirst, gerVenueName, imgUrlTwo, VenueIsClose, getVenueIsClose, VenueFeedback, getVenueHelpCenter } from '../../api';
import { Input, message, Checkbox, Drawer, Pagination, Popconfirm, Upload } from 'antd';
import Icon from '@ant-design/icons';
import 'moment/locale/zh-cn';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input


class systemSettings extends React.Component {

  state = {
    flag: false,
    flagList: true,
    flagUntie: true,
    flagListOne: true,
    flagUntieTwo: true,
    text: '',
    textT: '获取验证码',
    textTwo: '获取验证码',
    textOne: '获取验证码',
    phone: '',
    code: '',
    passWord: '',
    passWordT: '',
    corporatePhone: '',//法人手机号
    corporateCode: '',//法人验证码
    operationPhone: '',//操作员手机号
    operationCode: '',//操作员验证码
    visible: false,
    ListSport: [],
    runName: '',
    runId: '',
    start: '',
    end: '',
    textArea: '',
    isClose: '',
    Drawervisible: false,
    bot: false,
    textNum: 0,
    textAreaT: '',
    help: false,
    helpList: [],
    other: 0,
    page: 1,
    advertising: '',
    advertisingTwo: '',
    cgName: '',
    btnList: 1,
    advertise_uuid:'',
    ismethod:0,
  }

  showDrawer = () => {
    this.setState({
      Drawervisible: true,
    });
  };
  onClose = () => {
    this.setState({
      Drawervisible: false,
      help: false,
      page: 1
    });
  }


  async getVenueIsClose(data) {
    const res = await getVenueIsClose(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ isClose: res.data.data.isclose })
    }
  }



  componentDidMount() {
    this.getVenueIsClose()
    this.setState({ corporatePhone: sessionStorage.getItem('legalphone'),ismethod:Number(sessionStorage.getItem('ismethod'))})
    setInterval(() => {
      if (sessionStorage.getItem('sitew') === 'false') {
        this.setState({
          flag: false,
          flagList: true,
          flagUntie: true,
          flagListOne: true,
          flagUntieTwo: true,
        })
        sessionStorage.setItem('sitew', true)
      }
    }, 50)
    this.gerVenueName()


  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      sessionStorage.setItem('phone', res.data.data.phone)
      sessionStorage.setItem('legalphone', res.data.data.legalphone)
      this.setState({ cgName: res.data.data.name })
    }
  }



  async VenueIsClose(data) {
    const res = await VenueIsClose(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      message.success(res.data.msg)
    }
  }



  confirm = () => {
    if (this.state.isClose === 0) {
      this.setState({ isClose: 1 })
      this.VenueIsClose({ close: 1 })
    } else {
      this.setState({ isClose: 0 })
      this.VenueIsClose({ close: 0 })
    }
  }


  agreement = () => {
    this.props.history.push({ pathname: '/Agreement', query: { flag: 1 } })
  }
  reset = () => {
    this.setState({ text: '>重置密码', flagList: false, flagListOne: false })
  }
  Untie = () => {
    this.setState({ text: '>解除/更换绑定手机号', flagUntie: false, flagListOne: false })
    this.gerVenueName()
  }
  resetNot = () => {
    this.setState({ flagListOne: true, flagList: true, flagUntie: true, flagUntieTwo: true })
  }



  async VenueAdvertiseFirst(data) {
    const res = await VenueAdvertiseFirst(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.length !== 0) {
        if(res.data.data.imgURL.indexOf('|')!==-1){
          this.setState({advertising:res.data.data.imgURL.split('|')[0],advertisingTwo:res.data.data.imgURL.split('|')[1]})
        }else{
          this.setState({advertising:res.data.data.imgURL})
        }
        this.setState({ btnList: res.data.data.status,advertise_uuid:res.data.data.uuid,})
      }
    }
  }



  advertisingOne = () => {
    this.setState({ text: '>设置广告宣传图片', flagUntieTwo: false, flagUntie: false, flagListOne: false })
    this.VenueAdvertiseFirst()
  }

  async nacode(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
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
  phone = e => {
    this.setState({ phone: e.target.value })
  }
  code = e => {
    this.setState({ code: e.target.value })
  }
  passWord = e => {
    this.setState({ passWord: e.target.value })
  }

  passWordT = e => {
    this.setState({ passWordT: e.target.value })
  }

  naCode = () => {
    if (this.state.phone !== '' && (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.phone)) && this.state.phone.length === 11) {
      this.nacode({ "mobile": this.state.phone, "type": 'venuesavepass', "uuid": sessionStorage.getItem('uuid') })
    } else {
      message.error('请输入正确手机号')
    }
  }


  async VenueChangePassword(data) {
    const res = await VenueChangePassword(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      message.success('修改成功')
      setTimeout(() => {
        this.props.history.push('/')
      }, 2000)
      sessionStorage.removeItem('venue_token')
      sessionStorage.removeItem('uuid')
    }
  }



  naCodeOutie = () => {
    if (this.state.corporatePhone !== '' && (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.corporatePhone)) && this.state.corporatePhone.length === 11) {
      this.nacodeOned({ "mobile": this.state.corporatePhone, "type": 'venuebindingfr', "uuid": sessionStorage.getItem('uuid') })
    } else {
      message.error('请输入正确手机号')
    }
  }

  async nacodeOned(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textOne: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textOne: '获取验证码' })
        }
      }, 1000)
    } else {
      message.error(res.data.msg)
    }
  }


  async nacodeTwo(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textTwo: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textTwo: '获取验证码' })
        }
      }, 1000)
    } else {
      message.error(res.data.msg)
    }
  }

  naCodeOutieTwo = () => {
    if (this.state.operationPhone !== '' && (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.operationPhone)) && this.state.operationPhone.length === 11) {
      this.nacodeTwo({ "mobile": this.state.operationPhone, "type": 'venuebindingczy' })
    } else {
      message.error('请输入正确手机号')
    }
  }


  submit = () => {
    let { phone, code, passWord, passWordT, } = this.state
    if (phone === '') {
      message.error('请输入操作员手机号')
    } else if (code === '') {
      message.error('请输入验证码')
    } else if (passWord === '') {
      message.error('请输入密码')
    } else if (passWordT === '') {
      message.error('请再次输入密码')
    } else if (/^[^\s]*$/.test(this.state.passWord) === false) {
      message.error('密码输入有误')
    } else if (/^[^\s]*$/.test(this.state.passWordT) === false) {
      message.error('密码输入有误')
    } else if (passWord === passWordT) {
      this.VenueChangePassword({ phone: phone, code: code, pass: passWordT })
    } else {
      message.error('两次密码输入不一致')
    }
  }



  corporatePhone = e => {
    this.setState({ corporatePhone: e.target.value })
  }
  corporateCode = e => {
    this.setState({ corporateCode: e.target.value })
  }
  operationPhone = e => {
    this.setState({ operationPhone: e.target.value })
  }
  operationCode = e => {
    this.setState({ operationCode: e.target.value })
  }


  async VenueBindingPhone(data) {
    const res = await VenueBindingPhone(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      message.success('修改成功')
      this.gerVenueName()
      this.setState({ flagListOne: true, flagList: true, flagUntie: true, flagUntieTwo: true })
    }
  }



  UoiteSubimt = () => {
    let { corporatePhone, corporateCode, operationPhone, operationCode } = this.state
    this.VenueBindingPhone({ legalphone: corporatePhone, legalcode: corporateCode, operatorphone: operationPhone, operatorcode: operationCode })
  }

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ ListSport: res.data.data })
    }
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  model = () => {
    this.getVenueSport()
    this.setState({ visible: true })
  }

  handleChangeSelect = e => {
    this.setState({ runId: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
        break;
      default:
        day = "";
    }
    this.setState({ runName: day })
  }
  dateSelect = (e) => {

    let start = this.timer(e[0]._d)
    let end = this.timer(e[1]._d)
    this.setState({ start: start, end: end })
  }
  timer = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dateR = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    var time = year + "-" + month + "-" + dateR + " " + hour + ":" + minutes; //2009-06-12 17:18:05
    return time;
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }

  async VenueTemporarilyClosed(data) {
    const res = await VenueTemporarilyClosed(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ visible: false })
      message.success(res.data.msg)
    }
  }
  modelSubmit = () => {
    let { runName, runId, start, end, textArea, } = this.state
    this.VenueTemporarilyClosed({ sportid: runId, sportname: runName, starttime: start, endtime: end, comment: textArea })
  }

  closeYu = () => {
    this.props.history.push("/home/closeYu")
  }
  command=()=>{
    this.props.history.push("/home/command")
  }
  feedBack = () => {
    this.setState({ bot: !this.state.bot })
  }
  text = e => {

    this.setState({ textNum: e.target.value.length, textAreaT: e.target.value })

  }
  async VenueFeedback(data) {
    const res = await VenueFeedback(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
    } else {
      message.error(res.data.msg)
    }

  }

  subfeed = () => {
    if (this.state.textAreaT !== '') {
      this.VenueFeedback({ comment: this.state.textAreaT })
    } else {
      message.warning('请输入意见反馈')
    }
  }


  async getVenueHelpCenter(data) {
    const res = await getVenueHelpCenter(data, sessionStorage.getItem('venue_token'))
    this.setState({ helpList: res.data.data, other: res.data.other })
  }

  help = () => {
    this.getVenueHelpCenter()
    this.setState({ help: true })
  }
  current = (page, pageSize) => {
    this.setState({ page: page })
    this.getVenueHelpCenter({ page: page })
  }

  advertising = info => {

    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (this.state.imgFileTwo !== '') {
        this.setState({ advertising: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlThree: '', imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL, imgFileTwo: '' })
      } else {
        this.setState({ advertising: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL })
      }
    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    }
  };
  advertisingTwo = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (this.state.imgFileTwo !== '') {
        this.setState({ advertisingTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlThree: '', imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL, imgFileTwo: '' })
      } else {
        this.setState({ advertisingTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL })
      }
    }
    if (info.file.response.code === 4004) {
      message.error(info.file.response.msg)
    }
  };


  async VenueAdvertiseSave(data) {
    const res = await VenueAdvertiseSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.VenueAdvertiseFirst()
    }else{
      message.error(res.data.msg)
    }
  }


  addBtn=()=>{
    let imgurl=''
    let {advertising,advertisingTwo}=this.state
    if(advertising!==''&&advertisingTwo!==''){
       imgurl=advertising+'|'+advertisingTwo
    }else if(advertising===''&&advertisingTwo!==''){
      imgurl=advertisingTwo
    }else if(advertisingTwo===''&&advertising!==''){
      imgurl=advertising
    }else{
      imgurl=''
    }
    this.VenueAdvertiseSave({imgurl:imgurl,advertise_uuid:this.state.advertise_uuid})
  }



  render() {
    const { advertising, advertisingTwo } = this.state
    const uploadButtonThree = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
    
    return (
      <div className="systemSettings">
        <div className="title"><span style={{ cursor: 'pointer' }} onClick={this.resetNot}>系统设置</span> <span className={this.state.flagListOne === false ? 'titleSpan' : 'listNone'}>{this.state.text}</span></div>
        <div className={this.state.flagListOne === true ? 'list' : 'listNone'}>
          <ul className="ul">
            <Popconfirm
              title={this.state.isClose === 0 ? '您确定要关闭预约么?关闭后场馆的所有时间段将不能被提前预约!' : '您确定取消关闭预约么?取消后场馆的所有时间段可以被提前预约!'}
              onConfirm={this.confirm}
              placement="topLeft"
              onCancel={this.cancel}
              okText="是"
              cancelText="否"
            >
              <li><Checkbox style={{ fontSize: '16px', color: '#4A4A4A' }} checked={this.state.isClose === 1 ? true : false}>关闭预约</Checkbox></li>
            </Popconfirm>
            <li onClick={this.closeYu}>设置临时关闭预约时间</li>
          </ul>


          <ul className="ul">
            <li onClick={this.Untie}>更换操作员</li>
            <li onClick={this.command} style={this.state.ismethod===1?{}:{display:'none'}}>添加/解除第二负责人</li>
            <li onClick={this.reset}>重置密码</li>
            <li onClick={this.advertisingOne}>设置广告宣传图片</li>
          </ul>

          <ul className="ul">
            <li>
              <span onClick={this.agreement}>用户协议</span>
            </li>
            <li onClick={this.showDrawer}>关于我们</li>
            <li>客服电话 （010-80895077)</li>
            <li onClick={this.help}>帮助中心</li>
            <li><span style={{ marginTop: 0 }} onClick={this.feedBack}>意见反馈</span>
              <div className='feedback' style={this.state.bot === true ? { display: 'block' } : { display: 'none' }}>
                <TextArea style={{ width: '300px', minHeight: '80px' }} maxLength={200} placeholder='您的意见对我们非常重要，以便我们不断提升场馆端的用户体验，被采纳后会有200元奖励' onChange={this.text} />
                <span style={{ marginLeft: '10px', padding: '4px 20px', background: '#F5A623', color: '#fff', fontSize: '16px' }} onClick={this.subfeed}>提交</span>
                <div>{this.state.textNum}/200</div>
              </div>
            </li>
          </ul>
        </div>

        <div className={this.state.flagUntieTwo === false ? 'reset' : 'listNone'}>
          <div className="advertising">
            <div style={{ fontSize: '14x' }}>请上传广告宣传图片(最多2张)</div>
            <div style={{ fontSize: '12x', color: '#D85D27' }}>在“找对手”平台做广告时提供</div>
            <div className="name">
              <div className="clearfix">
                <ImgCrop aspect={20 / 9} quality={1} width={200} height={90}>
                  <Upload
                    name="files" 
                    listType="picture-card"
                    className="avatar-uploader addImg"
                    showUploadList={false}
                    action={imgUrlTwo+"api/UploadVenueImgs?type=Venue"}
                    onChange={this.advertising}
                    accept=".jpg, .jpeg, .png"
                  >
                    {advertising ? <img src={imgUrlTwo + advertising} style={{ width: '200px', height: '90px' }} alt="avatar" /> : uploadButtonThree}
                  </Upload>
                </ImgCrop>
              </div>

              <div className="clearfix">
                <ImgCrop aspect={20 / 9} quality={1} width={200} height={90}>
                  <Upload
                    name="files"
                    listType="picture-card"
                    className="avatar-uploader addImg"
                    showUploadList={false}
                    action={imgUrlTwo+"api/UploadVenueImgs?type=Venue"}
                    onChange={this.advertisingTwo}
                    accept=".jpg, .jpeg, .png"
                  >
                    {advertisingTwo ? <img src={imgUrlTwo + advertisingTwo} style={{ width: '200px', height: '90px' }} alt="avatar" /> : uploadButtonThree}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
            <div className="submit" style={{ margin: 0 }} onClick={this.state.btnList===0?this.lokomook:this.addBtn}>{this.state.btnList === 0 ? '待审核' : '确定'}</div>
          </div>
        </div>

        <div className={this.state.flagList === false ? 'reset' : 'listNone'}>
          <div className="resetSon">
            <div className="inputSon">
              <span>手机号码</span>
              <Input maxLength={11} style={{ marginLeft: 13, padding: '0 5px', height: '43px' }} onChange={this.phone} placeholder="请输入手机号" />
            </div>

            <div className="inputSonT inputSon">
              <span>验证码</span>
              <Input maxLength={6} style={{ width: 150, marginLeft: 28, padding: '0 5px', height: '43px' }} onChange={this.code} placeholder="请输入验证码" />
              <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} style={{ marginRight: 32 }} onClick={this.naCode}>{this.state.textT}</div>
              <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
            </div>

            <div className="inputSonT inputSon" style={{ opacity: 0, position: 'absolute' }}>
              <span>验证码</span>
              <Input maxLength={6} style={{ width: 150, marginLeft: 28, padding: '0 5px', height: '43px' }} onChange={this.code} placeholder="请输入验证码" />
              <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} style={{ marginRight: 32 }} onClick={this.naCode}>{this.state.textT}</div>
              <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
            </div>

            <div className="inputSon" style={{ opacity: 0, position: 'absolute' }}>
              <span>重置密码</span>
              <Input.Password maxLength={15} onChange={this.passWord} placeholder="请输入重置密码" />
            </div>

            <div className="inputSon" >
              <span>重置密码</span>
              <Input.Password maxLength={15} onChange={this.passWord} placeholder="请输入重置密码" />
            </div>

            <div className="inputSon">
              <span>确认密码</span>
              <Input.Password maxLength={15} onChange={this.passWordT} placeholder="请输入确认密码" />
            </div>
            <div className="submit" style={{ marginLeft: 72 }} onClick={this.submit}>确定</div>
          </div>
        </div>

        <div className={this.state.flagUntie === false ? 'Untie' : 'listNone'}>
          <div className="resetSon">
            <div className="inputSon">
              <span style={{ width: 145, marginLeft: -42, textAlign: 'right' }}>负责人手机号</span>
              <Input maxLength={11} value={this.state.corporatePhone} disabled={true} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporatePhone} placeholder="请输入手机号" />
            </div>

            <div className="inputSonT inputSon">
              <span style={{ textAlign: 'right' }}>验证码</span>
              <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporateCode} placeholder="请输入验证码" />
              <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textOne === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutie}>{this.state.textOne}</div>
              <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textOne === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textOne}</div>
            </div>
            <div className="inputSon">
              <span style={{ width: 145, marginLeft: -28, textAlign: 'right' }}>操作员手机号：{sessionStorage.getItem('phone')}</span>

            </div>
            <div className="inputSon">
              <span style={{ width: 145, marginLeft: -84, textAlign: 'right' }}>绑定操作员新手机号</span>
              <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationPhone} placeholder="请输入手机号" />
            </div>
            <div className="inputSonT inputSon">
              <span style={{ textAlign: 'right' }}>验证码</span>
              <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationCode} placeholder="请输入验证码" />
              <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textTwo === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutieTwo}>{this.state.textTwo}</div>
              <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textTwo === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textTwo}</div>
            </div>
            <div className="submit" onClick={this.UoiteSubimt}>确定</div>
          </div>
        </div>
        <Drawer
          title="关于我们"
          placement="right"
          closable={false}
          onClose={this.onClose}
          width={'350px'}
          visible={this.state.Drawervisible}
        >
          <span style={{ display: 'block' }}>北京甲乙电子商务有限公司，成立于2015年，位于北京市城市副中心。</span>
          <span style={{ display: 'block', marginTop: '30px' }}>随着社会经济的发展，科学技术的进步，生产力水平的提高，人们逐渐从繁重的体力劳动中解放出来。随之而来的“运动量不足”、“富贵病”却又影响着人们的健康，尤其是坐办公室的上班一族。健康是1，其它都是0，只有这个1，更多的0才有意义。</span>
          <span style={{ display: 'block', marginTop: '30px' }}>跑步、练器械等一个人可开展的体育运动略显枯燥，有很大一部分人无法长期坚持。羽毛球、乒乓球、台球等两个人以上才能完成的对抗性运动，有趣、易坚持但又不好找到运动对手、伙伴。初步统计，有2/3左右的人有运动需求，但因为找不到运动伙伴，运动需求得不到满足。</span>
          <span style={{ display: 'block', marginTop: '30px' }}> “找对手”是北京甲乙电子商务有限公司推出的用户找运动对手、伙伴平台，通过平台的服务：1）让用户更方便地找到运动对手、伙伴；2）建立技术等级，让用户更有征服欲、成就感，运动更有趣；3）让场馆提高场馆预订率、降低场馆人员支出成本。</span>
          <span style={{ display: 'block', marginTop: '30px' }}>公司的愿景：让运动更简单、更有趣！</span>
          <span style={{ display: 'block', marginTop: '30px' }}>期待志同道合的优秀人士加入到我公司，一起为这个愿景努力！</span>
          <a href="http://www.zhaoduishou.com" >www.zhaoduishou.com</a>
        </Drawer>


        <Drawer
          title="帮助中心"
          placement="right"
          closable={false}
          width={'50%'}
          onClose={this.onClose}
          visible={this.state.help}
        >
          {
            this.state.helpList.map((item, i) => (
              <div key={i} style={{ marginTop: '30px' }}>
                <div style={{ fontSize: '16px', color: '#F5A623' }}>{item.title}</div>
                <div style={{ fontSize: '14px', marginTop: '10px' }}>{item.content}</div>
              </div>
            ))
          }
          <Pagination className='fenye' defaultCurrent={1} hideOnSinglePage={true} showSizeChanger={false} current={this.state.page} onChange={this.current} total={this.state.other} />

        </Drawer>






      </div>
    )
  }
}

export default systemSettings;
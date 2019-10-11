import React from 'react';
import './systemSettings.css';
import 'antd/dist/antd.css';
import { _code, VenueChangePassword, VenueBindingPhone, getVenueSport, VenueTemporarilyClosed, VenueIsClose, getVenueIsClose } from '../../api';
import { Input, Icon, message, Checkbox, Modal, Select, DatePicker, LocaleProvider,Drawer } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const { Option } = Select;


const { RangePicker } = DatePicker;
const { TextArea } = Input;


function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}




class systemSettings extends React.Component {

  state = {
    flag: false,
    flagList: true,
    flagUntie: true,
    flagListOne: true,
    text: '',
    textT: '获取验证码',
    textTwo: '获取验证码',
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
    Drawervisible:false,
  }

  showDrawer = () => {
    this.setState({
      Drawervisible: true,
    });
  };
  onClose=()=>{
    this.setState({
      Drawervisible: false,
    });
  }


  async getVenueIsClose(data) {
    const res = await getVenueIsClose(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ isClose: res.data.data.isclose })
    }
  }
  componentDidMount() {
    this.getVenueIsClose()
  }




  async VenueIsClose(data) {
    const res = await VenueIsClose(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      message.info(res.data.msg)
    }
  }
  order = e => {
    
    this.setState({ isClose: e.target.checked ? 1 : 0 })
    this.VenueIsClose({ close: e.target.checked ? 1 : 0 })
  }
 

  agreement = () => {
    this.setState({ flag: !this.state.flag })
  }
  reset = () => {
    this.setState({ text: '>重置密码', flagList: false, flagListOne: false })
  }
  Untie = () => {
    this.setState({ text: '>解除/更换绑定手机号', flagUntie: false, flagListOne: false })
  }
  resetNot = () => {
    this.setState({ flagListOne: true, flagList: true, flagUntie: true })
  }

  async nacode(data) {
    const res = await _code(data)
    console.log(res)
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
    if (this.state.phone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.phone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.phone, "type": 'venuesavepass' })
    } else {
      message.error('请输入手机号')
    }
  }

  naCodeOutie = () => {
    if (this.state.corporatePhone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.corporatePhone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.corporatePhone, "type": 'venuebinding' })
    } else {
      message.error('请输入手机号')
    }
  }

  async VenueChangePassword(data) {
    const res = await VenueChangePassword(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      message.success('修改成功')
      sessionStorage.removeItem('venue_token')
      sessionStorage.removeItem('uuid')
    }
  }

  naCodeOutieTwo = () => {
    if (this.state.operationPhone !== '' && (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.state.operationPhone))) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textT: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textT: '获取验证码' })
        }
      }, 1000)
      this.nacode({ "mobile": this.state.operationPhone, "type": 'venuebinding' })
    } else {
      message.error('请输入手机号')
    }
  }




  submit = () => {
    let { phone, code, passWord, passWordT, } = this.state
    if (passWord === passWordT) {
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
      message.error('登陆超时请重新登陆！')
    } else {
      message.success('修改成功')
      this.setState({ flagListOne: true, flagList: true, flagUntie: true })
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
      message.error('登陆超时请重新登陆！')
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
    console.log(e)
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
    // if (month < 10) {
    //   month = "0" + month;
    // }
    // if (dateR < 10) {
    //   dateR = "0" + date;
    // }
    // if (hour < 10) {
    //   hour = "0" + hour;
    // }
    // if (minutes < 10) {
    //   minutes = "0" + minutes;
    // }


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
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({visible:false})
      message.info(res.data.msg)
    }
  }
  modelSubmit = () => {
    let { runName, runId, start, end, textArea, } = this.state

    this.VenueTemporarilyClosed({ sportid: runId, sportname: runName, starttime: start, endtime: end, comment: textArea })

  }

  render() {
    return (
      <div className="systemSettings" style={{ height: parseInt(sessionStorage.getItem('min-height')) }}>
        <div className="title"><span style={{ cursor: 'pointer' }} onClick={this.resetNot}>系统设置</span> <span className={this.state.flagListOne === false ? 'titleSpan' : 'listNone'}>{this.state.text}</span></div>
        <div className={this.state.flagListOne === true ? 'list' : 'listNone'}>
          <ul className="ul">
            <li><Checkbox onChange={this.order} checked={this.state.isClose === 1 ? true : false}>关闭预约</Checkbox></li>
              <li onClick={this.model}>设置临时关闭预约时间</li>
          </ul>


            <ul className="ul">
              <li onClick={this.Untie}>解除/更换绑定手机号</li>
              <li onClick={this.reset}>重置密码</li>
            </ul>

            <ul className="ul">
              <li>
                <span onClick={this.agreement}>用户协议</span>
                <span className={this.state.flag === true ? 'block' : 'none'}>挑战约球的创始团队来自阿里巴巴、GOOGLE、舒适堡、格力，及全球连锁酒店顶级管理人士。一群狂热的健身&互联网信徒，乐刻运动是一个充满极客精神以追求极致的态度为都市年轻人提供健身服务的创业公司。致力于成为混乱的国内健身行业的颠覆者。</span>
              </li>
              <li onClick={this.showDrawer}>关于我们</li>
              <li>客服电话 （010-120101021）</li>
              <li>帮助中心</li>
            </ul>
        </div>

          <div className={this.state.flagList === false ? 'reset' : 'listNone'}>
            <div className="resetSon">
              <div className="inputSon">
                <span>手机号码</span>
                <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.phone} placeholder="请输入手机号" />
              </div>

              <div className="inputSonT inputSon">
                <span>验证码</span>
                <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.code} placeholder="请输入验证码" />
                <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCode}>{this.state.textT}</div>
                <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
              </div>

              <div className="inputSon">
                <span>重置密码</span>
                <Input.Password maxLength={8} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.passWord} placeholder="请输入重置密码" />
              </div>

              <div className="inputSon">
                <span>确认密码</span>
                <Input.Password maxLength={8} prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.passWordT} placeholder="请输入确认密码" />
              </div>
              <div className="submit" onClick={this.submit}>确定</div>
            </div>
          </div>

          <div className={this.state.flagUntie === false ? 'Untie' : 'listNone'}>
            <div className="resetSon">
              <div className="inputSon">
                <span style={{ width: 145, marginLeft: -80, textAlign: 'right' }}>法人手机号</span>
                <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporatePhone} placeholder="请输入手机号" />
              </div>

              <div className="inputSonT inputSon">
                <span style={{ textAlign: 'right' }}>验证码</span>
                <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.corporateCode} placeholder="请输入验证码" />
                <div className={this.state.textT === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutie}>{this.state.textT}</div>
                <div className={this.state.textT === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textT}</div>
              </div>
              <div className="inputSon">
                <span style={{ width: 145, marginLeft: -80, textAlign: 'right' }}>绑定操作员新手机号</span>
                <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationPhone} placeholder="请输入手机号" />
              </div>
              <div className="inputSonT inputSon">
                <span style={{ textAlign: 'right' }}>验证码</span>
                <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.operationCode} placeholder="请输入验证码" />
                <div className={this.state.textTwo === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutieTwo}>{this.state.textTwo}</div>
                <div className={this.state.textTwo === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textTwo}</div>
              </div>
              <div className="submit" onClick={this.UoiteSubimt}>确定</div>
            </div>
          </div>
          <Modal
            title="设置临时关闭预约时间"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div className="one">
              <span>运动项目</span>
              <Select defaultValue="请选择" className="selectN" style={{ width: 350, marginLeft: 15 }} onChange={this.handleChangeSelect}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>
            <div className="one" style={{ marginTop: 20 }}>
              <span>选择时间</span>
              <LocaleProvider locale={zh_CN}>
                <RangePicker
                  style={{ width: 350, marginLeft: 15 }}
                  disabledDate={disabledDate}
                 
                  onOk={this.dateSelect}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
                  }}
                  format="YYYY-MM-DD HH:mm"
                />
              </LocaleProvider>
            </div>

            <div className="one" style={{ marginTop: 20 }}>
              <span style={{ display: 'block', float: 'left' }}>备注</span>
              <TextArea style={{ width: 350, marginLeft: 43 }} onChange={this.textArea} rows={3} />

            </div>
            <div className="submit" onClick={this.modelSubmit}>确认</div>
          </Modal>
          <Drawer
          title="关于我们"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.Drawervisible}
        >
         <span style={{display:'block'}}>挑战约球，2019年在背景成立，是由背景甲乙电子商务技术有限公司开发，是国内领先的运动O2O平台，全国规模最大的24小时连锁健身品牌</span>
         <span style={{display:'block',marginTop:'30px'}}>挑战约球的创始团队来自阿里巴巴、GOOGLE、舒适堡、格力，及全球连锁酒店顶级管理人士。一群狂热的健身&互联网信徒，乐刻运动是一个充满极客精神以追求极致的态度为都市年轻人提供健身服务的创业公司。致力于成为混乱的国内健身行业的颠覆者。</span>
        <span style={{display:'block',marginTop:'30px'}}>在健身房行业，中美差距正在拉大。乐刻的创始人韩伟想参考的正是小型健身房模式，他为此准备了接近一年时间，对比模式、做市场调研、考察门店，将24小时不打烊的小型健身房正式带入中国市场。</span>
        </Drawer>
        </div>
        );
      }
    }
    
export default systemSettings;
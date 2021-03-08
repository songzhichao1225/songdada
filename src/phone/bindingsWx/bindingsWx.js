import React from 'react';
import './bindingsWx.css';
import { } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';
import { getOpenidBindingVenue, VenueUnbundling, _code, WetchSelectSiteName,VenueBinding } from '../../api';
import { Toast, Modal, List, Radio, } from 'antd-mobile';
import { LeftOutlined } from '@ant-design/icons';
const RadioItem = Radio.RadioItem;
class bindingsWx extends React.Component {

  state = {
    para: '',
    listSon: [],
    flag: 0,
    textT: '获取验证码',
    phone: '',
    code: '',
    venueList: [],
    modal: false,
    siteuuid: '',
  };


  componentDidMount() {
    this.setState({ para: this.props.location.search.split('=')[1] })
    this.getOpenidBindingVenue({ openid: this.props.location.search.split('=')[1] })
  }

  async getOpenidBindingVenue(data) {
    const res = await getOpenidBindingVenue(data)
    this.setState({ listSon: res.data.data })
  }

  jiebang = (e) => {
    this.VenueUnbundling({ openid: this.state.para, siteuuid: e.currentTarget.dataset.uuid })
  }

  async VenueUnbundling(data) {
    const res = await VenueUnbundling(data)
    if (res.data.code === 2000) {
      Toast.success('成功解绑')
      this.getOpenidBindingVenue({ openid: this.state.para })
    }
  }
  btnSubBind = () => {
    this.setState({ flag: 1 })
  }

  phone = (e) => {
    this.setState({ phone: e.target.value })
  }

  async toVenueSendCode(data) {
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
      Toast.fail(res.data.msg)
    }
  }

  getCode = () => {
    this.toVenueSendCode({ mobile: this.state.phone, type: 'Bindofficialaccount' })
  }

  code = (e) => {
    this.setState({ code: e.target.value })
  }

  async WetchSelectSiteName(data) {
    const res = await WetchSelectSiteName(data)
    if (res.data.code === 2000) {
      let arr=[]
      for (let i in res.data.data) {
        let obj = {}
        obj.label = res.data.data[i].name
        obj.value = res.data.data[i].siteuuid
        arr.push(obj)
      }
      this.setState({ venueList: arr, modal: true })
    } else {
      Toast.fail(res.data.msg)
    }
  }


  submitSub = () => {
    this.WetchSelectSiteName({ phone: this.state.phone, code: this.state.code })
  }



  onClose = () => {
    this.setState({ modal: false })
  }

  venueId = (e) => {
    this.setState({ siteuuid: e.currentTarget.dataset.siteuuid })
  }


  async VenueBinding(data) {
    const res = await VenueBinding(data)
    if (res.data.code === 2000) {
      Toast.success('新增成功')
      this.setState({modal:false})
      localStorage.setItem('venue_token', res.data.data.token)
      setTimeout(()=>{
        this.setState({flag:0})
        this.getOpenidBindingVenue({ openid: this.state.para })
      },1500)
    }else{
      Toast.fail(res.data.msg)
    }
  }

  subKtwo=()=>{
  this.VenueBinding({phone:this.state.phone,openid:this.state.para,siteuuid:this.state.siteuuid})
  }

  reture = () => {
    this.setState({ flag: 0 })
  }
  render() {
    return (
      <div className="bindingsWx">
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />绑定场馆</div>
        <div className="listClick" style={this.state.flag === 0 ? {} : { display: 'none' }}>
          {
            this.state.listSon.map((item, i) => (
              <div className="listSon" key={i}>{item.name}<span data-uuid={item.siteuuid} onClick={this.jiebang}>解绑</span></div>
            ))
          }
          <div className="btnSubBind" onClick={this.btnSubBind}>+新增绑定场馆</div>
        </div>


        <div className="joinList" style={this.state.flag === 1 ? {} : { display: 'none' }}>
          <div className="join">
            <div className="phone">
              <input type="number" maxLength={11} className="fname" onChange={this.phone} placeholder="请输入手机号" />
              <div className="lppol" onClick={this.getCode}>{this.state.textT}</div>
            </div>
            <div className="code">
              <input type="number" className="faCode" onChange={this.code} placeholder="请输入验证码" />
            </div>
            <div className="soSelect"></div>
            <div className="submit" onClick={this.submitSub} >绑定场馆</div>
            <div className="text"><span >温馨提示:</span>绑定手机号后，微信公众号能接收到该手机账号在找对手用户端或场馆端应收到的通知消息，以免您错过重要信息。
        </div>
          </div>

        </div>

        <Modal
          popup
          animationType="slide-up"
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title="选择场馆"
          style={{ height: '25rem' }}
        >
          <List>
            {this.state.venueList.map((item, i) => (
              <RadioItem key={i} checked={item.value === this.state.siteuuid}  data-siteuuid={item.value}  onClick={this.venueId}>
                {item.label}
              </RadioItem>
            ))}
          </List>

          <div className="lokoisdjfsdg" onClick={this.subKtwo}>确定</div>

        </Modal>




      </div>
    );
  }
}

export default bindingsWx;
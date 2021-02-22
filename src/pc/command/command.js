import React from 'react';
import './command.css';
import 'antd/dist/antd.css';
import { _code, getSecondSupervisorList, AddSecondSupervisor,RelieveSecondSupervisor } from '../../api';
import { Input, message,Popconfirm } from 'antd';
import Icon from '@ant-design/icons';
import 'moment/locale/zh-cn';








class command extends React.Component {

  state = {
    textOne: '获取验证码',
    textTwo: '获取验证码',
    command: [],
    parameterid:''
  };




  async getSecondSupervisorList(data) {
    const res = await getSecondSupervisorList(data, sessionStorage.getItem('venue_token'))
    this.setState({ command: res.data.data })
  }


  componentDidMount() {
    this.setState({ corporatePhone: sessionStorage.getItem('legalphone') })
    this.getSecondSupervisorList()
  }


  next = () => {
    this.props.history.goBack()
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
  operationPhone = e => {
    this.setState({ operationPhone: e.target.value })
  }
  operationCode = e => {
    this.setState({ operationCode: e.target.value })
  }


  naCodeOutieTwo = () => {
    if (this.state.operationPhone !== '' && (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.state.operationPhone)) && this.state.operationPhone.length === 11) {
      this.nacodeTwo({ "mobile": this.state.operationPhone, "type": 'venuesecondsupervisor', uuid: sessionStorage.getItem('uuid') })
    } else {
      message.error('请输入正确手机号')
    }
  }


  async AddSecondSupervisor(data) {
    const res = await AddSecondSupervisor(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('添加成功')
      this.getSecondSupervisorList()
      this.setState({operationPhone:'',operationCode:''})
    } else {
      message.error(res.data.msg)
    }
  }


  UoiteSubimt = () => {
    this.AddSecondSupervisor({ phone: this.state.operationPhone, code: this.state.operationCode })
  }



  parameterid=e=>{
    this.setState({parameterid:e.currentTarget.dataset.uuid})
  }

  
  async RelieveSecondSupervisor(data) {
    const res = await RelieveSecondSupervisor(data, sessionStorage.getItem('venue_token'))
    if(res.data.code===2000){
      message.success(res.data.msg)
      this.getSecondSupervisorList()
    }
  }

  confirm=()=>{
  this.RelieveSecondSupervisor({parameterid:this.state.parameterid})
  }



  render() {
    return (
      <div className="command">
        <div className="headTitle"><span onClick={this.next}>系统设置 > </span><span style={{ color: '#F5A623' }}>添加/解除第二负责人</span></div>
        <div className="resetSon">
          <div className="inputSon" style={this.state.command.length === 0 ? {display:'none'}:{ marginLeft: '-68px', overflow: 'hidden' }}>
            <span style={{ float: 'left', width: '125px' }}>第二负责人手机号</span>
            <div>
              {
                this.state.command.map((item, i) => (
                  <Popconfirm
                    title="您确定删除第二负责人的该手机号么?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                    key={i}
                  >
                    <div className="phoneRight" ><span>{item.phone}</span><span data-uuid={item.parameterid} onClick={this.parameterid}>解除</span></div>
                  </Popconfirm>
                ))
              }


            </div>

          </div>
          <div className="inputSon">
            <span style={{ width: 145, marginLeft: -98, textAlign: 'right' }}>添加第二负责人手机号</span>
            <Input maxLength={11} prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.state.operationPhone} onChange={this.operationPhone} placeholder="请输入手机号" />
          </div>
          <div className="inputSonT inputSon">
            <span style={{ textAlign: 'right' }}>验证码</span>
            <Input maxLength={6} prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.state.operationCode} onChange={this.operationCode} placeholder="请输入验证码" />
            <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textTwo === '获取验证码' ? 'obtainCode' : 'koohidden'} onClick={this.naCodeOutieTwo}>{this.state.textTwo}</div>
            <div style={{ height: 43, lineHeight: '43px' }} className={this.state.textTwo === '获取验证码' ? 'koohidden' : 'obtainCode'} >{this.state.textTwo}</div>
          </div>
          <div className="submit" onClick={this.UoiteSubimt}>确定</div>
        </div>
      </div>
    )
  }
}

export default command;
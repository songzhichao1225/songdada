import React from 'react';
import './commandPh.css';

import { Input } from 'antd';
import { Toast,Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { _code, getSecondSupervisorList,AddSecondSupervisor,RelieveSecondSupervisor } from '../../api';
import { LeftOutlined } from '@ant-design/icons';
const alert = Modal.alert;
class commandPh extends React.Component {

  state = {
    phoneTwo: '',
    codeTwo: '',
    textTwo: '获取验证码',
    command: []
  };

  async getSecondSupervisorList(data) {
    const res = await getSecondSupervisorList(data, localStorage.getItem('venue_token'))
    this.setState({ command: res.data.data })
  }

  componentDidMount() {

    this.getSecondSupervisorList()
  }

  reture = () => {
    this.props.history.goBack()
  }

  phoneTwo = e => {
    this.setState({ phoneTwo: e.target.value })
  }

  codeTwo = e => {
    this.setState({ codeTwo: e.target.value })
  }

  async nacodeTwo(data) {
    const res = await _code(data)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textTwo: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textTwo: '获取验证码' })
        }
      }, 1000)
    }
  }


  nacodeTwoT = () => {
    this.nacodeTwo({ "mobile": this.state.phoneTwo, "type": 'venuesecondsupervisor', 'uuid': localStorage.getItem('uuid') })
  }
  async AddSecondSupervisor(data) {
    const res = await AddSecondSupervisor(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('添加成功')
      this.getSecondSupervisorList()
    } else {
      Toast.fail(res.data.msg)
    }
  }


  submit = () => {
    this.AddSecondSupervisor({ phone: this.state.phoneTwo, code: this.state.codeTwo })
  }

  async RelieveSecondSupervisor(data) {
    const res = await RelieveSecondSupervisor(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000){
      Toast.success(res.data.msg)
      this.getSecondSupervisorList()
    }
  }

  jiechu=e=>{
    console.log()
    let uuid=e.currentTarget.dataset.uuid
    alert('提示', '您确定删除第二负责人的该手机号么?', [
      { text: '取消', onPress: () =>  console.log('取消') },
      { text: '确定', onPress: () => this.RelieveSecondSupervisor({parameterid:uuid}) },
    ]);
  }



  render() {
    return (
      <div className="commandPh">
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />添加/解除第二负责人</div>
        <div className="listSon">
          <div style={this.state.command.length===0?{display:'none'}:{ paddingLeft: '0.5rem' }}>
            <span style={{ float: 'left' }}>第二负责人手机号</span>
            <div className="phoneRight">
              {
                this.state.command.map((item,i)=>(
                  <div key={i}><span>{item.phone}</span><span data-uuid={item.parameterid} onClick={this.jiechu}>解除</span></div>
                ))
              }
             
            </div>
          </div>
        </div>
        <div className="listSon">
          <Input maxLength={11} onChange={this.phoneTwo} placeholder="请输入操作员新手机号" />
        </div>

        <div className="listSon">
          <Input maxLength={11} placeholder="请输入验证码" onChange={this.codeTwo} /><span onClick={this.state.textTwo === '获取验证码' ? this.nacodeTwoT : this.ko}>{this.state.textTwo}</span>
        </div>
        <div className="btn" onClick={this.submit}>提交</div>

      </div>
    );
  }
}

export default commandPh;
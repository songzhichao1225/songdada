import React from 'react';
import './management.css';

import { Card, List, InputItem, DatePicker, Picker, Toast, Modal, SearchBar } from 'antd-mobile';
import { Pagination, Spin, Drawer,Select,Input } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';
import { getVenueMemberlist, AddVenueMember, getVenueMemberRecordsOfConsumption, getVenueMemberDetails,getSiteSelectMemberlevel, VenueMemberRecharge,getSiteAddMember, VenueMemberRefundCardDetails, EditVenueMember, _code, VenueMemberRefundCard } from '../../api';
import { LeftOutlined } from '@ant-design/icons';

const alert = Modal.alert;
const { Option } = Select;
const { TextArea } = Input;
class management extends React.Component {

  state = {
    page: 1,
    memberList: [],
    spin: true,
    visibleJoin: false,
    seasons: [{ label: '1个月', value: '1' }, { label: '2个月', value: '2' }, { label: '3个月', value: '3' }, { label: '四个月', value: '4' }, { label: '五个月', value: '5' },
    { label: '六个月', value: '6' }, { label: '七个月', value: '7' }, { label: '八个月', value: '8' }, { label: '九个月', value: '9' }, { label: '十个月', value: '10' }, { label: '十一个月', value: '11' },
    { label: '十二个月', value: '12' }, { label: '两年', value: '13' }, { label: '三年', value: '14' }, { label: '四年', value: '15' }, { label: '五年', value: '16' }, { label: '六年', value: '17' },
    ],
    gradeList: [],
    cardHolder: '',//卡主名称
    contactPerson: '',//联系人
    birthday: '',//生日
    contactNumber: '',//联系电话
    Vipcard: '',//会员卡号
    topUp: '',//充值金额
    giveAway: '',//赠送金额
    balance: '0',//余额
    validity: '',//有效期
    grade: '',//等级
    other: '',
    consumption: false,
    consumptionList: [],
    pageTwo: 1,
    otherTwo: '',
    memberuuidOne: '',
    visibleJoinTwo: false,
    ChUUid: '',
    visibleJoinThree: false,//修改抽屉
    cardHolderThree: '',
    contactPersonThree: '',
    birthdayThree: '',
    contactNumberThree: '',
    VipcardThree: '',
    gradeThree: '',
    balanceThree: '',
    validityThree: '',
    searchVal: '',
    contactOpen: false,
    textFour: '获取验证码',
    textFive: '获取验证码',
    ipCode: '',
    ipCodeTwo: '',
    makeNumTwo: '',
    memberuuidlokl: '',
    balanceTwo: '0',
    text:'',
    balanceTowT:0,
    joinVipTitle:false,
    vipGrade: '1',
    vipTextArea: '',
  };


  async getVenueMemberlist(data) {
    const res = await getVenueMemberlist(data, localStorage.getItem('venue_token'))
    this.setState({ memberList: res.data.data, spin: false, other: res.data.other.maxcount })
  }

  async getSiteSelectMemberlevel(data) {
    const res = await getSiteSelectMemberlevel(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
     
      let arr=[]
      for(let i in res.data.data){
         let obj={}
         obj.label=res.data.data[i].grade_name+'-('+res.data.data[i].grade_level+'级)'
         obj.value=res.data.data[i].id
         arr.push(obj)
      }
      this.setState({ gradeList:arr})
    } 
  }

  componentDidMount() {
    this.getVenueMemberlist({ page: this.state.page })
    this.getSiteSelectMemberlevel()
  }

  current = (page, pageSize) => {
    this.getVenueMemberlist({ page: page })
    this.setState({ page: page })
  }

  reture = () => {
    this.props.history.goBack()
  }
  visibleXin = () => {
    this.setState({ visibleJoin: true })
  }

  async AddVenueMember(data) {
    const res = await AddVenueMember(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg)
      this.setState({ visibleJoin: false, page: 1 })
      this.getVenueMemberlist({ page: 1 })
    } else {
      Toast.fail(res.data.msg)
    }

  }

  btnSubmit = () => {
    let { cardHolder, contactPerson, birthday, contactNumber, Vipcard, grade, topUp, giveAway, balance, validity } = this.state
    let g=''
    for(let i in this.state.gradeList){
        if(this.state.gradeList[i].value===grade[0]){
          g=this.state.gradeList[i].label.split('-')[0]
          
        }
    }
    let obj = {
      cardholderName: cardHolder,
      contacts: contactPerson,
      birthday: birthday,
      contactNumber: contactNumber,
      cardNumber: Vipcard,
      grade: grade[0],
      gradeName:g,
      rechargeMoney: topUp,
      giveMoney: giveAway,
      balance: balance,
      effective: validity[0],
    }
    console.log(obj)

    if (cardHolder === '') {
       Toast.fail('请填写卡主名称')
    } else if (contactPerson === '') {
      Toast.fail('请填写联系人')
    } else if (contactNumber === '') {
      Toast.fail('请填写联系电话')
    } else if (Vipcard === '') {
      Toast.fail('请填写会员卡号')
    } else if (grade.length ===0) {
      Toast.fail('请选择会员等级')
    } else if (topUp === '') {
      Toast.fail('请输入充值金额')
    } else if (validity.length ===0) {
      Toast.fail('请选择有效期')
    } else {
      this.AddVenueMember(obj)
    }
  }

  async getVenueMemberRecordsOfConsumption(data) {
    const res = await getVenueMemberRecordsOfConsumption(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ consumptionList: res.data.data, otherTwo: res.data.other.maxcount })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  consumptionOne = (e) => {
    this.setState({ consumption: true, memberuuidOne: e.currentTarget.dataset.uuid })
    this.getVenueMemberRecordsOfConsumption({ memberuuid: e.currentTarget.dataset.uuid, page: this.state.pageTwo })
  }

  currentTwo = (page, pageSize) => {
    this.getVenueMemberRecordsOfConsumption({ memberuuid: this.state.memberuuidOne, page: page })
    this.setState({ pageTwo: page })
  }

  onClose = () => {
    this.setState({ visibleJoin: false, consumption: false, visibleJoinTwo: false, visibleJoinThree: false })
  }
  onCloseTwokoj = () => {
    this.setState({ contactOpen: false, makeNumTwo: '', ipCode: '', ipCodeTwo: '' })
  }

  async getVenueMemberDetails(data) {
    const res = await getVenueMemberDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        cardHolderTwo: res.data.data.cardholderName, contactPersonTwo: res.data.data.contacts, birthdayTwo: res.data.data.birthday,
        contactNumberTwo: res.data.data.contactNumber, VipcardTwo: res.data.data.cardNumber, validityTwo: [res.data.data.effective.toString()],
        gradeTwo: res.data.data.grade,balanceTowT:res.data.data.balance
      })

    } else {
      Toast.fail(res.data.msg)
    }
  }


  visibleJoinTwo = (e) => {
    this.getVenueMemberDetails({ memberuuid: e.currentTarget.dataset.uuid })
    this.setState({ visibleJoinTwo: true, ChUUid: e.currentTarget.dataset.uuid })
  }


  async VenueMemberRecharge(data) {
    const res = await VenueMemberRecharge(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visibleJoinTwo: false })
      if(this.state.text!==''){
        this.getVenueMemberlist({ search: this.state.text })
      }else{
      this.getVenueMemberlist({ page: this.state.page })
      }
    } else {
      Toast.fail(res.data.msg)
    }
  }


  btnSubmitTwo = () => {
    let { ChUUid, validityTwo, topUpTwo, giveAwayTwo } = this.state
    let obj = {
      memberuuid: ChUUid,
      rechargeMoney: topUpTwo,
      giveMoney: giveAwayTwo,
      effective:validityTwo[0],
    }
    this.VenueMemberRecharge(obj)

  }


  async VenueMemberRefundCardDetails(data) {
    const res = await VenueMemberRefundCardDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      alert('退卡详情', <div>
        <div style={{ overflow: 'hidden' }}><span style={{ float: 'left' }}>卡内余额</span><span style={{ float: 'right' }}>￥{res.data.data.balance}</span></div>
        <div style={{ overflow: 'hidden' }}><span style={{ float: 'left' }}>折算后余额</span><span style={{ float: 'right' }}>￥{res.data.data.ConvertedBalance}</span></div>
        <div style={{ overflow: 'hidden' }}><span style={{ float: 'left' }}>建议退卡金额</span><span style={{ float: 'right' }}>￥{res.data.data.SuggestedBalance}</span></div>
      </div>, [
        { text: '取消', onPress: () => console.log('') },
        { text: '确定', onPress: () => this.VenueMemberRefundCard(data) },
      ])
    } else {
      Toast.fail(res.data.msg)
    }
  }

  fallBack = e => {
    this.VenueMemberRefundCardDetails({ memberuuid: e.currentTarget.dataset.uuid })
  }


  async VenueMemberRefundCard(data) {
    const res = await VenueMemberRefundCard(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('退卡成功')
      this.getVenueMemberlist({ page: this.state.page })

    } else {
      Toast.fail(res.data.msg)
    }
  }


  async getVenueMemberDetailsTwo(data) {
    const res = await getVenueMemberDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        cardHolderThree: res.data.data.cardholderName, contactPersonThree: res.data.data.contacts, birthdayThree: new Date(res.data.data.birthday),
        contactNumberThree: res.data.data.contactNumber, VipcardThree: res.data.data.cardNumber, gradeThree: [res.data.data.grade.toString()],
        balanceThree: res.data.data.balance, validityThree: [res.data.data.effective.toString()]
      })
    } else {
      Toast.fail(res.data.msg)
    }
  }




  edidor = e => {
    this.getVenueMemberDetailsTwo({ memberuuid: e.currentTarget.dataset.uuid })
    this.setState({ memberuuidlokl: e.currentTarget.dataset.uuid })
    this.setState({ visibleJoinThree: true })
  }

  searchBar = e => {
    this.setState({page:1})
    this.setState({text:e})
    this.getVenueMemberlist({ search: e })
  }
  close = () => {
    this.getVenueMemberlist({ page: 1 })
  }
  lookText = e => {
    alert('详情', e.currentTarget.dataset.txt, [

      { text: '确定', onPress: () => 6 },
    ])
  }

  contactOpen = () => {
    this.setState({ contactOpen: true })
  }


  async codeClickMsg(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textFour: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textFour: '获取验证码' })
        }
      }, 1000)
    } else {
      Toast.fail(res.data.msg)
    }
  }

  codeGo = () => {
    this.codeClickMsg({ mobile: this.state.contactNumberThree, type: 'venuememberprimaryphone', uuid: sessionStorage.getItem('uuid') })
  }


  async codeClickMsgTwo(data) {
    const res = await _code(data)
    if (res.data.code === 2000) {
      let num = 60
      const timer = setInterval(() => {
        this.setState({ textFive: num-- })
        if (num === -1) {
          clearInterval(timer)
          this.setState({ textFive: '获取验证码' })
        }
      }, 1000)
    } else {
      Toast.fail(res.data.msg)
    }
  }

  codeGoTwo = () => {
    this.codeClickMsgTwo({ mobile: this.state.makeNumTwo, type: 'venuemembernewphone', uuid: sessionStorage.getItem('uuid') })
  }

  ipCode = e => {
    this.setState({ ipCode: e.target.value })
  }
  ipCodeTwo = e => {
    this.setState({ ipCodeTwo: e.target.value })
  }

  cubmitHood = () => {
    let { makeNumTwo, ipCode, ipCodeTwo } = this.state
    if (ipCode === '') {
      Toast.fail('请输入原联系电话验证码')
    } else if (makeNumTwo === '') {
      Toast.fail('请输入新联系电话号码')
    } else if (ipCodeTwo === '') {
      Toast.fail('请输入新联系电话验证码')
    } else {
      this.setState({ contactOpen: false })
    }
  }


  async EditVenueMember(data) {
    const res = await EditVenueMember(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg)
      this.setState({ visibleJoinThree: false })
      this.getVenueMemberlist({ page: 1 })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  btnSubmitTosjij = () => {
    let { memberuuidlokl, cardHolderThree, contactPersonThree, birthdayThree, contactNumberThree, makeNumTwo, ipCode, ipCodeTwo, VipcardThree, gradeThree, validityThree } = this.state
    let g=''
    for(let i in this.state.gradeList){
        if(this.state.gradeList[i].value===gradeThree[0]){
          g=this.state.gradeList[i].label.split('-')[0]
          
        }
    }
    
    
    let obj = {
      memberuuid: memberuuidlokl,
      cardholderName: cardHolderThree,
      contacts: contactPersonThree,
      birthday: birthdayThree,
      contactNumber: contactNumberThree,
      newContactNumber: makeNumTwo,
      code: ipCode,
      newcode: ipCodeTwo,
      cardNumber: VipcardThree,
      grade: gradeThree[0],
      gradeName:g,
      effective: validityThree[0]
    }
    this.EditVenueMember(obj)
  }

  
  joinVipTitle = () => {
    this.setState({ joinVipTitle: true })
  }

  joinVipTitleTwo = () => {
    this.setState({ joinVipTitle: false })
  }

  async getSiteAddMember(data) {
    const res = await getSiteAddMember(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg)
      this.setState({ joinVipTitle: false })
      this.getSiteSelectMemberlevel()
    } else if (res.data.code === 4001) {
      Toast.fail('请输入会员等级名称')
    } else {
      Toast.fail(res.data.msg)
    }
  }


  btnVipTitle = () => {
    this.getSiteAddMember({ grade_name: this.state.vipTextArea, grade_level: this.state.vipGrade })
  }

  vipGrade = e => {
    this.setState({ vipGrade: e })
  }

  vipTextArea = e => {
    this.setState({ vipTextArea: e.target.value })
  }

  render() {
    return (
      <div className="management">
        <div className="nav">
          <LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px', fontSize: '1rem' }} />
          <div className="left">会员管理</div>
        </div>
        <SearchBar placeholder="请输入卡主名称/手机号/会员卡号" onSubmit={this.searchBar} onCancel={this.close} />
        <div className="wsMa4">
          <div className="Subdivide">
            {
              this.state.memberList.map((item, i) => (
                <Card key={i} className="card">
                  <Card.Header
                    title={<span className="titleLeft">卡主名称:{item.cardholderName}</span>}
                    extra={<span className="titleRight">联系人:{item.contacts}</span>}
                  />
                  <Card.Body className="listDetails" style={{ fontSize: '0.75rem' }}>
                    <div>生日：{item.birthday}</div> <div>联系电话：{item.contactNumber}</div> <div><div style={{ float: 'left' }}>会员卡号：</div><div className="vipText" data-txt={item.cardNumber} onClick={this.lookText}>{item.cardNumber}</div></div>
                    <div>会员等级：{item.gradeName}</div>
                    <div>折扣：{item.discount}折</div>  <div>充值金额：￥{item.rechargeMoney}</div> <div>赠送金额：￥{item.giveMoney}</div>   <div>余额：￥{item.balance}<span className="lishi" onClick={this.consumptionOne} data-uuid={item.uuid}>历史记录</span></div>
                    <div style={{ paddingBottom: '0.5rem' }}>有效日期：{item.effectiveDate}</div> <div style={{ paddingBottom: '0.5rem' }}>会员卡状态：{item.status === 1 ? '正常' : item.status === 2 ? '已退卡' : item.status === 3 ? '已过期' : ''}</div>

                    <span className="topUp" data-uuid={item.uuid} onClick={this.visibleJoinTwo}>充</span> <span className="topUp tui" data-uuid={item.uuid} onClick={this.fallBack}>退</span> <img data-uuid={item.uuid} onClick={this.edidor} src={require('../../assets/icon_pc_updata.png')} alt="img" />
                  </Card.Body>
                </Card>
              ))
            }
            <div className="request" style={this.state.memberList.length === 0 && this.state.spin === false ? {} : { display: 'none' }}><img src={require('../../assets/vipno.png')} alt="img" /><div>您还没添加会员信息!</div></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
            <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
          </div>
          <div className="footerSite">
            <div style={{ width: '100%' }} onClick={this.visibleXin}>+新增会员信息</div>
          </div>
        </div>

        <Drawer
          title="新增会员信息"
          placement="right"
          closable={true}
          width="100%"
          onClose={this.onClose}
          className="managementTwo"
          visible={this.state.visibleJoin}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolder}
              onChange={(v) => { this.setState({ cardHolder: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPerson}
              onChange={(v) => { this.setState({ contactPerson: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <DatePicker
            mode="date"
            title="选择生日"
            extra="请选择"
            minDate={new Date(1930, 0, 0)}
            value={this.state.birthday}
            onChange={birthday => this.setState({ birthday })}
          >
            <List.Item arrow="horizontal" className="lood" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>生日</span></List.Item>
          </DatePicker>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.contactNumber}
              maxLength={11}
              onChange={(v) => { this.setState({ contactNumber: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.Vipcard}
              onChange={(v) => { this.setState({ Vipcard: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>

          <Picker
            data={this.state.gradeList}
            cols={1}
            title="选择等级"
            extra="请选择"
            value={this.state.gradeName}
            onChange={v => this.setState({ grade: v })}
            onOk={v => this.setState({ grade: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡等级</span></List.Item>
          </Picker>

         

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              className="look"
              maxLength={8}
              value={this.state.topUp}
              onChange={(v) => { this.setState({ topUp: v, balance: Number(this.state.giveAway) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>充值金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              className="look"
              maxLength={8}
              value={this.state.giveAway}
              onChange={(v) => { this.setState({ giveAway: v, balance: Number(this.state.topUp) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>赠送金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" extra={this.state.balance} style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>余额</span></List.Item>

          <Picker
            data={this.state.seasons}
            cols={1}
            title="选择有效期"
            extra="请选择"
            value={this.state.validity}
            onChange={v => this.setState({ validity: v })}
            onOk={v => this.setState({ validity: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>有效期</span></List.Item>
          </Picker>

          <div className="btnsubmit" onClick={this.btnSubmit}>保存</div>

          <div onClick={this.joinVipTitle} style={{marginTop:'1rem',color:'blue'}}>+添加会员等级</div>

        </Drawer>


        <Drawer
          title="添加会员等级名称"
          placement="bottom"
          height='50%'
          onClose={this.joinVipTitleTwo}
          visible={this.state.joinVipTitle}
        >
          <div className="modelList" style={{ height: '32px' }}>
            <span>等级</span>
            <Select defaultValue="1" style={{ width: 120, marginLeft: '25px' }} onChange={this.vipGrade}>
              <Option value="1">1级</Option>
              <Option value="2">2级</Option>
              <Option value="3">3级</Option>
              <Option value="4">4级</Option>
              <Option value="5">5级</Option>
              <Option value="6">6级</Option>
              <Option value="7">7级</Option>
              <Option value="8">8级</Option>
              <Option value="9">9级</Option>
            </Select>
          </div>
          <div className="modelList">
            <span>名称</span>
            <TextArea className="textAreaName" onChange={this.vipTextArea} placeholder="请输入会员等级名称"></TextArea>
          </div>
          <button className="submit" onClick={this.btnVipTitle} style={{ border: 'none' }}>提交</button>
        </Drawer>


        <Drawer
          title="历史记录"
          placement="bottom"
          closable={true}
          height="80%"
          onClose={this.onClose}
          visible={this.state.consumption}
        >
          <div style={{ height: '100%', overflowY: 'auto' }}>
            {
              this.state.consumptionList.map((item, i) => (
                <Card key={i} className="card" style={{ marginTop: '0.5rem' }}>
                  <Card.Body className="listDetailsTwo" style={{ fontSize: '0.75rem' }}>
                    <div>时间：{item.intime}</div><div>明细：{item.content}</div>
                    <div>类型：{item.status === 1 ? '会员充值' : item.status === 2 ? '会员消费' : item.status === 3 ? '会员退卡' : ''}</div>
                    <div>金额：{item.status === 1 ? parseFloat(item.recharge) + parseFloat(item.give) : item.recharge}</div>
                  </Card.Body>
                </Card>
              ))
            }
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageTwo} total={this.state.otherTwo} onChange={this.currentTwo} />

          </div>

        </Drawer>

        <Drawer
          title="充值"
          placement="right"
          closable={true}
          width="100%"
          className="managementTwo"
          onClose={this.onClose}
          visible={this.state.visibleJoinTwo}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolderTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPersonTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" className="loodTo" extra={this.state.birthdayTwo} style={{ borderBottom: '1px solid #E9E9E9', textAlign: 'right' }}><span style={{ fontSize: '0.88rem', border: 'none' }}>生日</span></List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.contactNumberTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.VipcardTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>


          <List.Item arrow="empty" className="gorad" extra={this.state.gradeTwo} style={{ borderBottom: '1px solid #E9E9E9', textAlign: 'right' }}><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡等级</span></List.Item>

       

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              className="look"
              value={this.state.topUpTwo}
              maxLength={8}
              onChange={(v) => { this.setState({ topUpTwo: v,balanceTwo:Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>充值金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              className="look"
              maxLength={8}
              value={this.state.giveAwayTwo}
              onChange={(v) => { this.setState({ giveAwayTwo: v, balanceTwo: Number(this.state.topUpTwo) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>赠送金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" extra={Number(this.state.balanceTowT)+this.state.balanceTwo} style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none' }}>充值后余额</span></List.Item>


       

          <Picker
            data={this.state.seasons}
            cols={1}
            title="选择有效期"
            extra="请选择"
            value={this.state.validityTwo}
            onChange={v => this.setState({ validityTwo: v })}
            onOk={v => this.setState({ validityTwo: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none' }}>有效期</span></List.Item>
          </Picker>


          <div className="btnsubmit" onClick={this.btnSubmitTwo}>保存</div>




        </Drawer>



        <Drawer
          title="修改会员信息"
          placement="right"
          closable={true}
          width="100%"
          className="managementTwo"
          onClose={this.onClose}
          visible={this.state.visibleJoinThree}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolderThree}
              onChange={(v) => { this.setState({ cardHolderThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right', color: '#888' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPersonThree}
              onChange={(v) => { this.setState({ contactPersonThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right', color: '#888' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <DatePicker
            mode="date"
            title="选择生日"
            extra="请选择"
            value={this.state.birthdayThree}
            style={{ textAlign: 'right', color: '#888' }}
            onChange={birthdayThree => this.setState({ birthdayThree })}
          >
            <List.Item arrow="horizontal" className="lood" style={{ borderBottom: '1px solid #E9E9E9' }}> <span style={{ fontSize: '0.88rem', border: 'none'}}>生日</span></List.Item>
          </DatePicker>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }} onClick={this.contactOpen}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={'点击修改：' + this.state.contactNumberThree}
              maxLength={11}
              disabled={true}
              onChange={(v) => { this.setState({ contactNumberThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={this.state.makeNumTwo === '' ? { display: 'none' } : { borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.makeNumTwo}
              maxLength={11}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>新联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.VipcardThree}
              maxLength={20}
              onChange={(v) => { this.setState({ VipcardThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'right', color: '#888' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>

          <Picker
            data={this.state.gradeList}
            cols={1}
            title="选择等级"
            extra="请选择"
            value={this.state.gradeName}
            onChange={v => this.setState({ gradeThree: v })}
            onOk={v => this.setState({ gradeThree: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>会员卡等级</span></List.Item>
          </Picker>





          <List.Item arrow="empty" extra={this.state.balanceThree} style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>余额</span></List.Item>

          <Picker
            data={this.state.seasons}
            cols={1}
            title="选择有效期"
            extra="请选择"
            value={this.state.validityThree}
            onChange={v => this.setState({ validityThree: v })}
            onOk={v => this.setState({ validityThree: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}><span style={{ fontSize: '0.88rem', border: 'none'}}>有效期</span></List.Item>
          </Picker>

          <div className="btnsubmit" onClick={this.btnSubmitTosjij}>保存</div>




        </Drawer>


        <Modal
          visible={this.state.contactOpen}
          transparent
          maskClosable={false}
          closable={true}
          onClose={this.onCloseTwokoj}
          title="修改联系电话"
          style={{ width: '90%' }}
        >
          <div style={{ height: 250, overflow: 'scroll' }}>
            <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }} >
              <InputItem
                type='number'
                placeholder="请输入"
                value={this.state.contactNumberThree}
                maxLength={11}
                disabled={true}
                onChange={(v) => { this.setState({ contactNumberThree: v }) }}
                style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'left' }}
              ><span style={{ fontSize: '0.88rem', border: 'none' }}>原联系电话</span></InputItem>
            </List.Item>

            <div style={{ borderBottom: '1px solid #E9E9E9', overflow: 'hidden' }} >
              <div style={{ float: 'left', color: '#000', lineHeight: '44px', paddingLeft: "15px" }}>验证码</div>
              <input style={{ height: '44px', float: 'left', border: 'none', marginLeft: '45px', width: '30%', fontSize: '0.88rem' }} onChange={this.ipCode} placeholder="请输入验证码" />
              <div className="sdfgdfghdr" onClick={this.codeGo}>{this.state.textFour}</div>
            </div>

            <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }} >
              <InputItem
                type='number'
                placeholder="请输入"
                maxLength={11}
                onChange={(v) => { this.setState({ makeNumTwo: v }) }}
                style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem', textAlign: 'left' }}
              ><span style={{ fontSize: '0.88rem', border: 'none' }}>新联系电话</span></InputItem>
            </List.Item>

            <div style={{ borderBottom: '1px solid #E9E9E9', overflow: 'hidden' }} >
              <div style={{ float: 'left', color: '#000', lineHeight: '44px', paddingLeft: "15px" }}>验证码</div>
              <input style={{ height: '44px', float: 'left', border: 'none', marginLeft: '45px', width: '30%', fontSize: '0.88rem' }} onChange={this.ipCodeTwo} placeholder="请输入验证码" />
              <div className="sdfgdfghdr" onClick={this.codeGoTwo}>{this.state.textFive}</div>
            </div>
            <div className="sdfdsfger" onClick={this.cubmitHood}>确认</div>

          </div>
        </Modal>




      </div>
    );
  }
}

export default management;
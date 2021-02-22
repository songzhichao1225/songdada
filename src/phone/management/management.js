import React from 'react';
import './management.css';

import { Card, List, InputItem, DatePicker, Picker, Toast, Modal,SearchBar } from 'antd-mobile';
import { Pagination, Spin, Drawer } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';
import { getVenueMemberlist, AddVenueMember, getVenueMemberRecordsOfConsumption, getVenueMemberDetails, VenueMemberRecharge, VenueMemberRefundCardDetails, VenueMemberRefundCard } from '../../api';
import { LeftOutlined } from '@ant-design/icons';

const alert = Modal.alert;

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
    gradeList: [{ label: '普通会员', value: '1' }, { label: '银卡会员', value: '2' }, { label: '金卡会员', value: '3' }, { label: '铂金会员', value: '4' }, { label: '钻石会员', value: '5' }, { label: '星耀会员', value: '6' },],
    cardHolder: '',//卡主名称
    contactPerson: '',//联系人
    birthday: '',//生日
    contactNumber: '',//联系电话
    Vipcard: '',//会员卡号
    discountVal: '',//折扣
    topUp: '',//充值金额
    giveAway: '',//赠送金额
    balance: '',//余额
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
    discountValTwo: '',//充值折扣
    visibleJoinThree: false,//修改抽屉
    cardHolderThree: '',
    contactPersonThree: '',
    birthdayThree: '',
    contactNumberThree: '',
    VipcardThree: '',
    gradeThree: '',
    balanceThree: '',
    validityThree: '',
    searchVal:'',
  };


  async getVenueMemberlist(data) {
    const res = await getVenueMemberlist(data, localStorage.getItem('venue_token'))
    this.setState({ memberList: res.data.data, spin: false, other: res.data.other.maxcount })
  }

  componentDidMount() {
    this.getVenueMemberlist({ page: this.state.page })
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
      this.setState({ visibleJoin: false,page:1 })
      this.getVenueMemberlist({ page: 1 })
    } else {
      Toast.fail(res.data.msg)
    }

  }

  btnSubmit = () => {
    let { cardHolder, contactPerson, birthday, contactNumber, Vipcard, discountVal, grade, topUp, giveAway, balance, validity } = this.state
    let obj = {
      cardholderName: cardHolder,
      contacts: contactPerson,
      birthday: birthday,
      contactNumber: contactNumber,
      cardNumber: Vipcard,
      grade: grade[0],
      discount: discountVal,
      rechargeMoney: topUp,
      giveMoney: giveAway,
      balance: balance,
      effective: validity[0],
    }
    this.AddVenueMember(obj)
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


  async getVenueMemberDetails(data) {
    const res = await getVenueMemberDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        cardHolderTwo: res.data.data.cardholderName, contactPersonTwo: res.data.data.contacts, birthdayTwo: res.data.data.birthday,
        contactNumberTwo: res.data.data.contactNumber, VipcardTwo: res.data.data.cardNumber, validityTwo: res.data.data.effective,
        gradeTwo: res.data.data.grade
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
      this.getVenueMemberlist({ page: this.state.page })
    } else {
      Toast.fail(res.data.msg)
    }
  }


  btnSubmitTwo = () => {
    let { ChUUid, discountValTwo, topUpTwo, giveAwayTwo } = this.state
    let obj = {
      memberuuid: ChUUid,
      discount: discountValTwo,
      rechargeMoney: topUpTwo,
      giveMoney: giveAwayTwo
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
    this.setState({ visibleJoinThree: true })
  }

  searchBar=e=>{
    
    this.getVenueMemberlist({ search: e})
  }
  close=()=>{
    this.getVenueMemberlist({ page: 1})
  }
  lookText=e=>{
    alert('详情', e.currentTarget.dataset.txt, [
    
      { text: '确定', onPress: () => 6},
    ])
  }
  cofirmMoney=e=>{
   if(e>10){
     Toast.fail('折扣不能大于10')
     this.setState({discountVal:10})
   }
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
                    <div>生日：{item.birthday}</div> <div>联系电话：{item.contactNumber}</div> <div><div style={{float:'left'}}>会员卡号：</div><div className="vipText" data-txt={item.cardNumber} onClick={this.lookText}>{item.cardNumber}</div></div>
                    <div>会员等级：{item.grade === 1 ? '普通' : item.grade === 2 ? 'vip' : item.grade === 3 ? '银卡' : item.grade === 4 ? '金卡' : '超级vip'}</div>
                    <div>折扣：{item.discount}折</div>  <div>充值金额：￥{item.rechargeMoney}</div> <div>赠送金额：￥{item.giveMoney}</div>   <div>余额：￥{item.balance}<span className="lishi" onClick={this.consumptionOne} data-uuid={item.uuid}>历史记录</span></div>
                    <div>有效日期：{item.effectiveDate}</div><span className="topUp" data-uuid={item.uuid} onClick={this.visibleJoinTwo}>充</span> <span className="topUp tui" data-uuid={item.uuid} onClick={this.fallBack}>退</span> <img data-uuid={item.uuid} onClick={this.edidor} src={require('../../assets/icon_pc_updata.png')} alt="img" />
                  </Card.Body>
                </Card>
              ))
            }
            <div className="request" style={this.state.memberList.length === 0 && this.state.spin === false ? {} : { display: 'none' }}><img src={require('../../assets/xifen (1).png')} alt="img" /><div>您还没有设置场地细分!</div></div>
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
          visible={this.state.visibleJoin}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolder}
              onChange={(v) => { this.setState({ cardHolder: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPerson}
              onChange={(v) => { this.setState({ contactPerson: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <DatePicker
            mode="date"
            title="选择生日"
            extra="请选择"
            minDate={new Date(1930,0,0)}
            value={this.state.birthday}
            onChange={birthday => this.setState({ birthday })}
          >
            <List.Item arrow="horizontal" className="lood" style={{ borderBottom: '1px solid #E9E9E9' }}>生日</List.Item>
          </DatePicker>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.contactNumber}
              maxLength={11}
              onChange={(v) => { this.setState({ contactNumber: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.Vipcard}
              onChange={(v) => { this.setState({ Vipcard: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>

          <Picker
            data={this.state.gradeList}
            cols={1}
            title="选择等级"
            extra="请选择"
            value={this.state.grade}
            onChange={v => this.setState({ grade: v })}
            onOk={v => this.setState({ grade: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>会员卡等级</List.Item>
          </Picker>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              className="look"
              value={this.state.discountVal}
              onVirtualKeyboardConfirm={this.cofirmMoney}
              onChange={(v) => { this.setState({ discountVal: v }) }}
              style={{ padding: '0', textAlign: 'left', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>折扣</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              className="look"
              value={this.state.topUp}
              onChange={(v) => { this.setState({ topUp: v,balance: Number(this.state.giveAway) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>充值金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              className="look"
              value={this.state.giveAway}
              onChange={(v) => { this.setState({ giveAway: v, balance: Number(this.state.topUp) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>赠送金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" extra={this.state.balance} style={{ borderBottom: '1px solid #E9E9E9' }}>余额</List.Item>

          <Picker
            data={this.state.seasons}
            cols={1}
            title="选择有效期"
            extra="请选择"
            value={this.state.validity}
            onChange={v => this.setState({ validity: v })}
            onOk={v => this.setState({ validity: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>有效期</List.Item>
          </Picker>

          <div className="btnsubmit" onClick={this.btnSubmit}>保存</div>




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
                    <div>金额：{item.status === 1 ? item.recharge + item.give : item.recharge}</div>
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
          onClose={this.onClose}
          visible={this.state.visibleJoinTwo}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolderTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPersonTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" className="loodTo" extra={this.state.birthdayTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>生日</List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.contactNumberTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.VipcardTwo}
              disabled={true}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>


          <List.Item arrow="empty" className="gorad" extra={this.state.gradeTwo === 1 ? '普通会员' : this.state.gradeTwo === 2 ? '银卡会员' : this.state.gradeTwo === 3 ? '金卡会员' : this.state.gradeTwo === 4 ? '铂金会员' : this.state.gradeTwo === 5 ? '钻石会员' : this.state.gradeTwo === 6 ? '星耀会员' : ''} style={{ borderBottom: '1px solid #E9E9E9' }}>会员卡等级</List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              disabledKeys={['.', '0']}
              placeholder="请输入"
              maxLength={2}
              className="look"
              value={this.state.discountValTwo}
              onChange={(v) => { this.setState({ discountValTwo: v }) }}
              style={{ padding: '0', textAlign: 'left', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>折扣</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              className="look"
              value={this.state.topUpTwo}
              onChange={(v) => { this.setState({ topUpTwo: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>充值金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              className="look"
              value={this.state.giveAwayTwo}
              onChange={(v) => { this.setState({ giveAwayTwo: v, balanceTwo: Number(this.state.topUpTwo) + Number(v) }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>赠送金额</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" extra={this.state.balanceTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>充值后余额</List.Item>


          <List.Item arrow="empty"
          className="gorad"
            extra={this.state.validityTwo === 1 ? '1个月' : this.state.validityTwo === 2 ? '2个月' : this.state.validityTwo === 3 ? '3个月' : this.state.validityTwo === 4 ? '4个月' :
              this.state.validityTwo === 5 ? '5个月' : this.state.validityTwo === 6 ? '6个月' : this.state.validityTwo === 7 ? '7个月' : this.state.validityTwo === 8 ? '8个月' :
                this.state.validityTwo === 9 ? '9个月' : this.state.validityTwo === 10 ? '十个月' : this.state.validityTwo === 11 ? '十一个月' : this.state.validityTwo === 12 ? '十二个月' :
                  this.state.validityTwo === 13 ? '两年' : this.state.validityTwo === 14 ? '三年' : this.state.validityTwo === 15 ? '四年' : this.state.validityTwo === 16 ? '五年' : this.state.validityTwo === 17 ? '六年' : ''
            }
            style={{ borderBottom: '1px solid #E9E9E9' }}>有效期</List.Item>


          <div className="btnsubmit" onClick={this.btnSubmitTwo}>保存</div>




        </Drawer>



        <Drawer
          title="修改会员信息"
          placement="right"
          closable={true}
          width="100%"
          onClose={this.onClose}
          visible={this.state.visibleJoinThree}
        >
          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.cardHolderThree}
              onChange={(v) => { this.setState({ cardHolderThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>卡主名称</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.contactPersonThree}
              onChange={(v) => { this.setState({ contactPersonThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系人</span></InputItem>
          </List.Item>

          <DatePicker
            mode="date"
            title="选择生日"
            extra="请选择"
            value={this.state.birthdayThree}
            onChange={birthdayThree => this.setState({ birthdayThree })}
          >
            <List.Item arrow="horizontal" className="lood" style={{ borderBottom: '1px solid #E9E9E9' }}>生日</List.Item>
          </DatePicker>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='number'
              placeholder="请输入"
              value={this.state.contactNumberThree}
              maxLength={11}
              disabled={true}
              onChange={(v) => { this.setState({ contactNumberThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>联系电话</span></InputItem>
          </List.Item>

          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='text'
              placeholder="请输入"
              value={this.state.VipcardThree}
              onChange={(v) => { this.setState({ VipcardThree: v }) }}
              style={{ padding: '0', left: '0.5rem', fontSize: '0.88rem' }}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>会员卡号</span></InputItem>
          </List.Item>

          <Picker
            data={this.state.gradeList}
            cols={1}
            title="选择等级"
            extra="请选择"
            value={this.state.gradeThree}
            onChange={v => this.setState({ gradeThree: v })}
            onOk={v => this.setState({ gradeThree: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>会员卡等级</List.Item>
          </Picker>





          <List.Item arrow="empty" extra={this.state.balanceThree} style={{ borderBottom: '1px solid #E9E9E9' }}>余额</List.Item>

          <Picker
            data={this.state.seasons}
            cols={1}
            title="选择有效期"
            extra="请选择"
            value={this.state.validityThree}
            onChange={v => this.setState({ validityThree: v })}
            onOk={v => this.setState({ validityThree: v })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>有效期</List.Item>
          </Picker>

          <div className="btnsubmit" onClick={this.btnSubmit}>保存</div>




        </Drawer>




      </div>
    );
  }
}

export default management;
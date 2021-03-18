import React from 'react';
import './VipAgement.css';
import 'antd/dist/antd.css';
import { AddVenueMember, getVenueMemberlist, getVenueMemberRecordsOfConsumption, getVenueMemberDetails, VenueMemberRecharge, VenueMemberRefundCardDetails, VenueMemberRefundCard, EditVenueMember, _code } from '../../api';
import { Row, Col, Modal, Input, Select, DatePicker, message, Pagination, Popconfirm,Popover } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Search } = Input;
const { Option } = Select;

class VipAgement extends React.Component {

  state = {
    page: 1,
    memberList: [],
    isModalVisible: false,
    birthdays: '',//生日
    hint: false,
    import: false,
    cardHolderVal: '',
    contactPersonVal: '',
    contactNumberVal: '',
    discountVal: 10,
    VipcardVal: '',
    handleChange: '',
    topUp: '',
    giveAway: '',
    balance: '',
    validity: '',
    records: false,
    recordsList: [],
    topAmount: false,
    memberDetails: [],
    topUpTwo: '',
    giveAwayTwo: '',
    discountTwo: 10,
    balanceTwo: '',
    vipUid: '',
    returnCard: false,
    cardDetails: [],
    memberuuidCard: '',
    editor: false,
    cardHolderTwo: '',
    contactPersonTwo: '',
    dateOnChangeTwo: '',
    contactNumberTqwo: '',
    VipcardTwo: '',
    gradeTwo: '',
    validityTwo: '',
    edorTwoLpo: false,
    code: '',
    makeNumTwo: '',
    codeTwo: '',
    textFour: '获取验证码',
    textFive: '获取验证码',
    edorTwoLpoBlock: 0,
    memberuuidFour: '',
    pageTwo:'',
    RecordsUid:''
  }


  async getVenueMemberlist(data) {
    const res = await getVenueMemberlist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ memberList: res.data.data, other: res.data.other.maxcount })
    } else {
      message.error(res.data.msg)
    }
  }
  componentDidMount() {
    this.getVenueMemberlist({ page: this.state.page })
  }

  handleCancel = () => {
    this.setState({ isModalVisible: false })
  }

  handleOk = () => {
    this.setState({ isModalVisible: false })
  }
  bottomJoin = () => {
    this.setState({ isModalVisible: true })
  }

  hintTr = () => {
    this.setState({ hint: true })
  }

  hintClose = () => {
    this.setState({ hint: false })
  }

  importTr = () => {
    this.setState({ import: true })
  }
  import = () => {
    this.setState({ import: false })
  }



  dateOnChange = (date, dateString) => {
    this.setState({ birthdays: dateString })
  }

  search = e => {
    this.getVenueMemberlist({ page: 1, search: e.target.value })
  }

  cardHolder = e => {
    this.setState({ cardHolderVal: e.target.value })
  }
  contactPerson = e => {
    this.setState({ contactPersonVal: e.target.value })
  }
  contactNumber = e => {
    this.setState({ contactNumberVal: e.target.value })
  }
  Vipcard = e => {
    this.setState({ VipcardVal: e.target.value })
  }
  discount = e => {
    if(e.target.value>10){
      this.setState({ discountVal: 10 })
    }else{
      this.setState({ discountVal: e.target.value })
    }
  }
  handleChange = e => {
    this.setState({ handleChange: e })
  }
  topUp = e => {
    this.setState({ topUp: e.target.value,balance: Number(this.state.giveAway) + Number(e.target.value) })
  }
  giveAway = e => {

    this.setState({ giveAway: e.target.value, balance: Number(this.state.topUp) + Number(e.target.value) })

  }
  balance = e => {
    this.setState({ balance: e.target.value })
  }
  validity = e => {
    this.setState({ validity: e })
  }



  vipSubmiter = () => {
    let { cardHolderVal, contactPersonVal, birthdays, contactNumberVal, VipcardVal, discountVal, handleChange, topUp, giveAway, balance, validity } = this.state
    let obj = {
      cardholderName: cardHolderVal,
      contacts: contactPersonVal,
      birthday: birthdays,
      contactNumber: contactNumberVal,
      cardNumber: VipcardVal,
      grade: handleChange,
      discount: discountVal,
      rechargeMoney: topUp,
      giveMoney: giveAway,
      balance: balance,
      effective: validity,
    }
    if (cardHolderVal === '') {
      message.warning('请填写卡主名称')
    } else if (contactPersonVal === '') {
      message.warning('请填写联系人')
    } else if (contactNumberVal === '') {
      message.warning('请填写联系电话')
    } else if (VipcardVal === '') {
      message.warning('请填写会员卡号')
    } else if (handleChange === '') {
      message.warning('请选择会员等级')
    } else if (topUp === '') {
      message.warning('请输入充值金额')
    } else if (validity === '') {
      message.warning('请选择有效期')
    } else {
      this.AddVenueMember(obj)
    }
  }

  async AddVenueMember(data) {
    const res = await AddVenueMember(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.getVenueMemberlist({ page: 1 })
      this.setState({ isModalVisible: false, page: 1 })
    } else {
      message.error(res.data.msg)
    }
  }
  current = (page, pageSize) => {
    this.getVenueMemberlist({ page: page })
    this.setState({ page: page })
  }

  async getVenueMemberRecordsOfConsumption(data) {
    const res = await getVenueMemberRecordsOfConsumption(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ recordsList: res.data.data, otherTwo: res.data.other.maxcount })
    } else {
      message.error(res.data.msg)
    }
  }
  currentTwo=(page,pageSize)=>{
    this.setState({pageTwo:page})
    this.getVenueMemberRecordsOfConsumption({ memberuuid:this.state.RecordsUid, page: page })
  }

  recordsList = e => {
    this.setState({ records: true,RecordsUid: e.currentTarget.dataset.uuid})
    this.getVenueMemberRecordsOfConsumption({ memberuuid: e.currentTarget.dataset.uuid, page: 1 })
  }
  records = () => {
    this.setState({ records: false })
  }

  async getVenueMemberDetails(data) {
    const res = await getVenueMemberDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ memberDetails: res.data.data })
    } else {
      message.error(res.data.msg)
    }
  }

  topAmountDetail = e => {
    this.getVenueMemberDetails({ memberuuid: e.currentTarget.dataset.uuid })
    this.setState({ topAmount: true, vipUid: e.currentTarget.dataset.uuid })
  }
  topAmount = () => {
    this.setState({ topAmount: false })
  }
  topUpTwo = e => {
    this.setState({ topUpTwo: e.target.value,balanceTwo: Number(this.state.memberDetails.balance) + Number(this.state.giveAwayTwo) + Number(e.target.value) })
  }
  giveAwayTwo = e => {
    this.setState({ giveAwayTwo: e.target.value, balanceTwo: Number(this.state.memberDetails.balance) + Number(this.state.topUpTwo) + Number(e.target.value) })
  }
  discountTwo = e => {
    if(e.target.value>10){
      this.setState({ discountTwo: 10 })
    }else{
      this.setState({ discountTwo: e.target.value })
    }
  }


  vipSubmiterTwo = () => {
    let { vipUid, discountTwo, topUpTwo, giveAwayTwo } = this.state
    let obj = {
      memberuuid: vipUid,
      discount: discountTwo,
      rechargeMoney: topUpTwo,
      giveMoney: giveAwayTwo
    }

    this.VenueMemberRecharge(obj)
  }

  async VenueMemberRecharge(data) {
    const res = await VenueMemberRecharge(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ topAmount: false,giveAwayTwo:'',topUpTwo:'',balanceTwo:'' })
      this.getVenueMemberlist({ page: this.state.page })
    } else {
      message.error(res.data.msg)
    }
  }


  async VenueMemberRefundCardDetails(data) {
    const res = await VenueMemberRefundCardDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ cardDetails: res.data.data })
    } else {
      message.error(res.data.msg)
    }
  }
  returnCard = e => {
    this.VenueMemberRefundCardDetails({ memberuuid: e.currentTarget.dataset.uuid })
    this.setState({ returnCard: true, memberuuidCard: e.currentTarget.dataset.uuid })
  }
  returnCardTwo = () => {
    this.setState({ returnCard: false })
  }

  async VenueMemberRefundCard(data) {
    const res = await VenueMemberRefundCard(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.getVenueMemberlist({ page: this.state.page })
      this.setState({ returnCard: false })
    } else {
      message.error(res.data.msg)
    }
  }

  returnCardSub = () => {
    this.VenueMemberRefundCard({ memberuuid: this.state.memberuuidCard })
  }

  async getVenueMemberDetailsTwo(data) {
    const res = await getVenueMemberDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        cardHolderTwo: res.data.data.cardholderName, contactPersonTwo: res.data.data.contacts, dateOnChangeTwo: res.data.data.birthday,
        contactNumberTqwo: res.data.data.contactNumber, VipcardTwo: res.data.data.cardNumber, gradeTwo: res.data.data.grade, validityTwo: res.data.data.effective
      })
    } else {
      message.error(res.data.msg)
    }
  }

  editorKo = e => {
    this.getVenueMemberDetailsTwo({ memberuuid: e.currentTarget.dataset.uuid })
    this.setState({ editor: true, memberuuidFour: e.currentTarget.dataset.uuid })
  }






  editor = e => {
    this.setState({ editor: false })
  }

  //编辑获取
  cardHolderTwo = e => {
    this.setState({ cardHolderTwo: e.target.value })
  }
  contactPersonTwo = e => {
    this.setState({ contactPersonTwo: e.target.value })
  }
  dateOnChangeTwo = (date, dateString) => {
    this.setState({ dateOnChangeTwo: dateString })
  }
  contactNumberTqwo = e => {
    this.setState({ contactNumberTqwo: e.target.value })
  }
  VipcardTwo = e => {
    this.setState({ VipcardTwo: e.target.value })
  }
  gradeTwo = e => {
    this.setState({ gradeTwo: Number(e) })
  }
  validityTwo = e => {
    this.setState({ validityTwo: Number(e) })
  }

  async EditVenueMember(data) {
    const res = await EditVenueMember(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ editor: false })
      this.getVenueMemberlist({ page: this.state.page })
    } else {
      message.error(res.data.msg)
    }
  }

  returnCardSubTwo = () => {
    let { memberuuidFour, cardHolderTwo, contactPersonTwo, dateOnChangeTwo, code, codeTwo, makeNumTwo, contactNumberTqwo, VipcardTwo, gradeTwo, validityTwo } = this.state
    let obj = {
      memberuuid: memberuuidFour,
      cardholderName: cardHolderTwo,
      contacts: contactPersonTwo,
      birthday: dateOnChangeTwo,
      contactNumber: contactNumberTqwo,
      cardNumber: VipcardTwo,
      newContactNumber: makeNumTwo,
      code: code,
      newcode: codeTwo,
      grade: gradeTwo,
      effective: validityTwo,
    }
    this.EditVenueMember(obj)

  }
  edorTwoLpo = () => {
    this.setState({ edorTwoLpo: true })
  }

  edorTwoLpoTwo = () => {
    this.setState({ edorTwoLpo: false })
  }

  code = e => {
    this.setState({ code: e.target.value })
  }

  makeNumTwo = e => {
    this.setState({ makeNumTwo: e.target.value })
  }

  codeTwo = e => {
    this.setState({ codeTwo: e.target.value })
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
      message.error(res.data.msg)
    }
  }

  codeGo = () => {
    this.codeClickMsg({ mobile: this.state.contactNumberTqwo, type: 'venuememberprimaryphone', uuid: sessionStorage.getItem('uuid') })
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
      message.error(res.data.msg)
    }
  }

  codeGoTwo = () => {
    this.codeClickMsgTwo({ mobile: this.state.makeNumTwo, type: 'venuemembernewphone', uuid: sessionStorage.getItem('uuid') })
  }

  confirm = () => {
    if (this.state.code === '') {
      message.warning('请输入原联系电话验证码')
    } else if (this.state.makeNumTwo === '') {
      message.warning('请输入新联系电话号码')
    } else if (this.state.codeTwo === '') {
      message.warning('请输入新联系电话验证码')
    } else {
      this.setState({ edorTwoLpo: false, edorTwoLpoBlock: 1 })
    }
  }



  render() {

    return (
      <div className="VipAgement">
        <div className="header">
          <div className="left">会员信息</div>
          <div className="sreach"> <Search placeholder="请输入卡主名称/手机号/会员卡号" onChange={this.search} /></div>
        </div>
        <div className="line"></div>
        <div className="content">
          <Row className="headList">
            <Col xs={{ span: 2 }}>卡主名称</Col>
            <Col xs={{ span: 1 }}>联系人</Col>
            <Col xs={{ span: 2 }}>生日</Col>
            <Col xs={{ span: 3 }}>联系电话</Col>
            <Col xs={{ span: 2 }}>会员卡号</Col>
            <Col xs={{ span: 2 }}>会员等级</Col>
            <Col xs={{ span: 2 }}>充值金额</Col>
            <Col xs={{ span: 2 }}>赠送金额</Col>
            <Col xs={{ span: 1 }}>折扣</Col>
            <Col xs={{ span: 2 }}>余额</Col>
            <Col xs={{ span: 2 }}>有效期</Col>
            <Col xs={{ span: 1 }}>会员状态</Col>
            <Col xs={{ span: 2 }}>操作</Col>
          </Row>
          {
            this.state.memberList.map((item, i) => (
              <Row className="headListSon" key={i}>
                <Col xs={{ span: 2 }}>{item.cardholderName}</Col>
                <Col xs={{ span: 1 }}>{item.contacts}</Col>
                <Col xs={{ span: 2 }}>{item.birthday}</Col>
                <Col xs={{ span: 3 }}>{item.contactNumber}</Col>
                <Popover content={item.cardNumber} title="详情" trigger="click">
                  <Col xs={{ span: 2 }} style={{ cursor: 'pointer' }}>{item.cardNumber}</Col>
                </Popover>
                <Col xs={{ span: 2 }}>{item.grade === 1 ? '普通会员' : item.grade === 2 ? '银卡会员' : item.grade === 3 ? '金卡会员' : item.grade === 4 ? '铂金会员' : item.grade === 5?'钻石会员':item.grade === 6?'星耀会员':''}</Col>
                <Col xs={{ span: 2 }}>￥{item.rechargeMoney}</Col>
                <Col xs={{ span: 2 }}>￥{item.giveMoney}</Col>
                <Col xs={{ span: 1 }}>{item.discount}</Col>
                <Col xs={{ span: 2 }}>￥{item.balance}<span style={{ fontSize: '10px', paddingLeft: '5px', color: '#4A90E2', cursor: 'pointer' }} data-uuid={item.uuid} onClick={this.recordsList}>历史记录</span></Col>
                <Col xs={{ span: 2 }}>{item.effectiveDate}</Col>
                <Col xs={{ span: 1 }} style={{color:'blue'}}>{item.status===1?'正常':item.status===2?'已退卡':item.status===3?'已过期':''}</Col>
                <Col xs={{ span: 2 }}><span className="topUp" data-uuid={item.uuid} onClick={this.topAmountDetail}>充</span><span className="topUp tui" data-uuid={item.uuid} onClick={this.returnCard}>退</span><img onClick={this.editorKo} data-uuid={item.uuid} style={{ cursor: 'pointer' }} src={require('../../assets/icon_pc_updata.png')} alt="编辑" /></Col>
              </Row>
            ))
          }
          <Pagination style={{ marginBottom: '15px' }} hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
          <div className="bottomJoin" onClick={this.bottomJoin}>+新增会员信息</div>
          <div className="import" onClick={this.importTr}>批量导入会员</div>
          <div className="derived import">导出会员</div>
        </div>


        <Modal
          title="添加会员信息"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          className="mode"
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.handleCancel}>
          <div className="ViplistSon">
            <span className="title">卡主名称<span className="redStart">*</span></span>
            <Input placeholder="请填写" onChange={this.cardHolder} maxLength={10} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系人<span className="redStart">*</span></span>
            <Input placeholder="请填写" onChange={this.contactPerson} maxLength={6} />
          </div>
          <div className="ViplistSon">
            <span className="title">生日</span>
            <DatePicker style={{ marginLeft: '19.5px', width: '300px' }} allowClear={false} onChange={this.dateOnChange} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系电话<span className="redStart">*</span></span>
            <Input placeholder="请填写" onChange={this.contactNumber} maxLength={11} />
          </div>
          <div className="ViplistSon">
            <span className="title">会员卡号<span className="redStart">*</span></span>
            <Input placeholder="请填写" maxLength={20} onChange={this.Vipcard} />
          </div>
          <div className="ViplistSon">
            <span className="title">折扣<span onClick={this.hintTr} style={{ padding: '0px 6px', marginLeft: '10px', background: '#F5A623', color: '#fff', cursor: 'pointer' }}>?</span></span>
            <Input style={{ marginLeft: '18px', width: '300px' }}   value={this.state.discountVal} onChange={this.discount}  placeholder="请填写" />
          </div>
          <div className="ViplistSon">
            <span className="title">会员等级<span className="redStart">*</span></span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }} onChange={this.handleChange}>
              <Option value="1">普通会员</Option>
              <Option value="2">银卡会员</Option>
              <Option value="3">金卡会员</Option>
              <Option value="4">铂金会员</Option>
              <Option value="5">钻石会员</Option>
              <Option value="6">星耀会员</Option>
            </Select>
          </div>
          <div className="ViplistSon">
            <span className="title">充值金额<span className="redStart">*</span></span>
            <Input placeholder="请填写" maxLength={8} onChange={this.topUp} />
          </div>
          <div className="ViplistSon">
            <span className="title">赠送金额</span>
            <Input placeholder="请填写" maxLength={8} onChange={this.giveAway} />
          </div>
          <div className="ViplistSon">
            <span className="title">余额</span>
            <Input placeholder="请填写" value={this.state.balance} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">有效期<span className="redStart">*</span></span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }} onChange={this.validity}>
              <Option value="1">一个月</Option>
              <Option value="2">二个月</Option>
              <Option value="3">三个月</Option>
              <Option value="4">四个月</Option>
              <Option value="5">五个月</Option>
              <Option value="6">六个月</Option>
              <Option value="7">七个月</Option>
              <Option value="8">八个月</Option>
              <Option value="9">九个月</Option>
              <Option value="10">十个月</Option>
              <Option value="11">十一个月</Option>
              <Option value="12">十二个月</Option>
              <Option value="13">两年</Option>
              <Option value="14">三年</Option>
              <Option value="15">四年</Option>
              <Option value="16">五年</Option>
              <Option value="17">六年</Option>
            </Select>
          </div>

          <div className="vipSubmiter" onClick={this.vipSubmiter}>保存</div>
        </Modal>

        <Modal
          title="提示"
          visible={this.state.hint}
          className="mode"
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.hintClose}>
          <p>折扣是什么?</p>
          <p>Some contents...</p>
        </Modal>

        <Modal
          title="导入信息"
          visible={this.state.import}
          className="mode"
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.import}>
          <div className="ViplistSon">
            <span className="title">导入文件</span>
            <Input placeholder="请填写" />
          </div>
          <div className="ViplistSon">
            <span className="title">文件类型</span>
            <Input disabled={true} value="excel" />
          </div>
        </Modal>


        <Modal
          title="历史记录"
          visible={this.state.records}
          className="mode"
          width={800}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.records}>
          <Row className="headListMode">
            <Col xs={{ span: 5 }}>时间</Col>
            <Col xs={{ span: 8 }}>明细</Col>
            <Col xs={{ span: 5 }}>类型</Col>
            <Col xs={{ span: 5 }}>金额</Col>
          </Row>
          {
            this.state.recordsList.map((item, i) => (
              <Row className="headListMode" key={i}>
                <Col xs={{ span: 5 }}>{item.intime}</Col>
                <Col xs={{ span: 8 }}>{item.content}</Col>
                <Col xs={{ span: 5 }}>{item.status === 1 ? '会员充值' : item.status === 2 ? '会员消费' : '会员退卡'}</Col>
                <Col xs={{ span: 5 }}>{item.status === 1 ? item.recharge + item.give : item.recharge}</Col>
              </Row>
            ))
          }
           <Pagination style={{ marginBottom: '15px' }} hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageTwo} total={this.state.otherTwo} onChange={this.currentTwo} />
         

        </Modal>


        <Modal
          title="充值"
          visible={this.state.topAmount}
          className="mode"
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.topAmount}>
          <div className="ViplistSon">
            <span className="title">卡主名称</span>
            <Input value={this.state.memberDetails.cardholderName} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系人</span>
            <Input value={this.state.memberDetails.contacts} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">生日</span>
            <Input value={this.state.memberDetails.birthday} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系电话</span>
            <Input value={this.state.memberDetails.contactNumber} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">会员卡号</span>
            <Input value={this.state.memberDetails.cardNumber} disabled={true} />
          </div>

          <div className="ViplistSon">
            <span className="title">会员等级</span>
            <Input value={this.state.memberDetails.grade === 1 ? '普通会员' : this.state.memberDetails.grade === 2 ? '银卡会员' : this.state.memberDetails.grade === 3 ? '金卡会员' : this.state.memberDetails.grade === 4 ? '铂金会员' : this.state.memberDetails.grade === 5 ? '钻石会员' : this.state.memberDetails.grade === 6 ? '星耀会员' : ''} disabled={true} />
          </div>

          <div className="ViplistSon">
            <span className="title">有效期</span>
            <Input value={this.state.memberDetails.effective === 1 ? '一个月' : this.state.memberDetails.effective === 2 ? '二个月' : this.state.memberDetails.effective === 3 ? '三个月' : this.state.memberDetails.effective === 4 ? '四个月' : this.state.memberDetails.effective === 5 ? '五个月' : this.state.memberDetails.effective === 6 ? '六个月' : this.state.memberDetails.effective === 7 ? '七个月' : this.state.memberDetails.effective === 8 ? '八个月' : this.state.memberDetails.effective === 9 ? '九个月' : this.state.memberDetails.effective === 10 ? '十个月' : this.state.memberDetails.effective === 11 ? '十一个月' : this.state.memberDetails.effective === 12 ? '十二个月' : this.state.memberDetails.effective === 13 ? '两年' : this.state.memberDetails.effective === 14 ? '三年' : this.state.memberDetails.effective === 15 ? '四年' : this.state.memberDetails.effective === 16 ? '五年' : this.state.memberDetails.effective === 17 ? '六年' : ''} disabled={true} />
          </div>

          <div className="ViplistSon">
            <span className="title">当前余额</span>
            <Input placeholder="请填写" value={this.state.memberDetails.balance} disabled={true} />
          </div>

          <div className="ViplistSon">
            <span className="title">充值金额<span className="redStart">*</span></span>
            <Input  maxLength={8} placeholder="请填写" value={this.state.topUpTwo} onChange={this.topUpTwo} />
          </div>
          <div className="ViplistSon">
            <span className="title">赠送金额</span>
            <Input  maxLength={8} placeholder="请填写" value={this.state.giveAwayTwo} onChange={this.giveAwayTwo} />
          </div>

          <div className="ViplistSon">
            <span className="title">折扣</span>
            <Input style={{ marginLeft: '19px', width: '300px' }} value={this.state.discountTwo} onChange={this.discountTwo}  placeholder="请填写" />
          </div>
          <div className="ViplistSon">
            <span className="title">充值后金额</span>
            <Input placeholder="请填写" value={this.state.balanceTwo} disabled={true} />
          </div>
          <div className="vipSubmiter" onClick={this.vipSubmiterTwo}>保存</div>
        </Modal>


        <Modal
          title="退卡详情"
          visible={this.state.returnCard}
          className="mode"
          width={400}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.returnCardTwo}>
          <div className="returnCard">
            <p><span>卡内余额:</span><span>￥{this.state.cardDetails.balance}</span></p>
            <p><span>折算后余额:</span><span>￥{this.state.cardDetails.ConvertedBalance}</span></p>
            <p><span>建议退卡金额:</span><span>￥{this.state.cardDetails.SuggestedBalance}</span></p>
          </div>

          <div className="vipSubmiter" onClick={this.returnCardSub}>确定</div>
        </Modal>

        <Modal
          title="编辑会员信息"
          visible={this.state.editor}
          className="mode"
          width={600}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.editor}>

          <div className="ViplistSon">
            <span className="title">卡主名称</span>
            <Input placeholder="请填写" onChange={this.cardHolderTwo} value={this.state.cardHolderTwo} maxLength={10} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系人</span>
            <Input placeholder="请填写" onChange={this.contactPersonTwo} value={this.state.contactPersonTwo} maxLength={6} />
          </div>
          <div className="ViplistSon">
            <span className="title">生日</span>
            <DatePicker style={{ marginLeft: '19.5px', width: '300px' }} allowClear={false} value={moment(this.state.dateOnChangeTwo)} onChange={this.dateOnChangeTwo} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系电话</span>
            <Input placeholder="请填写" onChange={this.contactNumberTqwo} value={this.state.contactNumberTqwo} disabled={true} maxLength={11} />
            <span className="edorTwoLpo" onClick={this.edorTwoLpo}>修改</span>
          </div>

          <div className="ViplistSon" style={this.state.edorTwoLpoBlock === 1 ? {} : { display: 'none' }}>
            <span className="title">新联系电话</span>
            <Input placeholder="请填写" value={this.state.makeNumTwo} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">会员卡号</span>
            <Input placeholder="请填写" onChange={this.VipcardTwo} value={this.state.VipcardTwo} />
          </div>

          <div className="ViplistSon">
            <span className="title">会员等级</span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }} value={
              this.state.gradeTwo === 1 ? '普通会员' : this.state.gradeTwo === 2 ? '银卡会员' : this.state.gradeTwo === 3 ? '金卡会员' : this.state.gradeTwo === 4 ? '铂金会员' : this.state.gradeTwo === 5 ? '钻石会员' : this.state.gradeTwo === 6 ? '星耀会员' : ''
            } onChange={this.gradeTwo}>
              <Option value="1">普通会员</Option>
              <Option value="2">银卡会员</Option>
              <Option value="3">金卡会员</Option>
              <Option value="4">铂金会员</Option>
              <Option value="5">钻石会员</Option>
              <Option value="6">星耀会员</Option>
            </Select>
          </div>

          <div className="ViplistSon">
            <span className="title">有效期</span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }} value={
              this.state.validityTwo === 1 ? '一个月' : this.state.validityTwo === 2 ? '二个月' : this.state.validityTwo === 3 ? '三个月' :
                this.state.validityTwo === 4 ? '四个月' : this.state.validityTwo === 5 ? '五个月' : this.state.validityTwo === 6 ? '六个月' : this.state.validityTwo === 7 ? '七个月' :
                  this.state.validityTwo === 8 ? '八个月' : this.state.validityTwo === 9 ? '九个月' : this.state.validityTwo === 10 ? '十个月' : this.state.validityTwo === 11 ? '十一个月' :
                    this.state.validityTwo === 12 ? '十二个月' : this.state.validityTwo === 13 ? '两年' : this.state.validityTwo === 14 ? '三年' : this.state.validityTwo === 15 ? '四年' :
                      this.state.validityTwo === 16 ? '五年' : this.state.validityTwo === 17 ? '六年' : ''
            } onChange={this.validityTwo}>
              <Option value="1">一个月</Option>
              <Option value="2">二个月</Option>
              <Option value="3">三个月</Option>
              <Option value="4">四个月</Option>
              <Option value="5">五个月</Option>
              <Option value="6">六个月</Option>
              <Option value="7">七个月</Option>
              <Option value="8">八个月</Option>
              <Option value="9">九个月</Option>
              <Option value="10">十个月</Option>
              <Option value="11">十一个月</Option>
              <Option value="12">十二个月</Option>
              <Option value="13">两年</Option>
              <Option value="14">三年</Option>
              <Option value="15">四年</Option>
              <Option value="16">五年</Option>
              <Option value="17">六年</Option>
            </Select>
          </div>



          <div className="vipSubmiter" onClick={this.returnCardSubTwo}>确定</div>
        </Modal>

        <Modal
          title="联系电话修改"
          visible={this.state.edorTwoLpo}
          className="mode"
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          onCancel={this.edorTwoLpoTwo}>

          <div className="ViplistSon">
            <span className="title">原联系电话</span>
            <Input placeholder="请填写" value={this.state.contactNumberTqwo} disabled={true} />
          </div>
          <div className="ViplistSon">
            <span className="title">验证码</span>
            <Input placeholder="请填写" type="text" onChange={this.code} style={{ width: '230px' }} />
            <span className="codeLpo" onClick={this.codeGo}>{this.state.textFour}</span>
          </div>

          <div className="ViplistSon">
            <span className="title">新联系电话</span>
            <Input placeholder="请填写" onChange={this.makeNumTwo} />
          </div>
          <div className="ViplistSon">
            <span className="title">验证码</span>
            <Input placeholder="请填写" onChange={this.codeTwo} style={{ width: '230px' }} />
            <span className="codeLpo" onClick={this.codeGoTwo}>{this.state.textFive}</span>
          </div>

          <Popconfirm
            title="您确定要修改吗?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="确定"
            cancelText="取消"
          ><div className="vipSubmiter" onClick={this.edorTwoLpoFour}>确定</div>
          </Popconfirm>



        </Modal>



      </div>
    )
  }
}

export default VipAgement;
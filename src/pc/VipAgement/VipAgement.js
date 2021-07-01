import React from 'react';
import './VipAgement.css';
import 'antd/dist/antd.css';
import { AddVenueMember, getVenueMemberlist, getVenueMemberRecordsOfConsumption, getVenueMemberDetails, VenueMemberRecharge,urlKo,getSiteSelectMemberlevel,getSiteAddMember, VenueMemberRefundCardDetails, getVenueMemberlistexcel, VenueMemberRefundCard, EditVenueMember, _code } from '../../api';
import { Row, Col, Modal, Input, Select, DatePicker, message, Pagination, Popconfirm, Upload, Button } from 'antd';
import { CloseCircleOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

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
    pageTwo: 1,
    RecordsUid: '',
    validityThree: '',
    href: '',
    download: '',
    text: '',
    levelList: [],
    joinVipTitle: false,
    vipTextArea:'',
    vipGrade: '1',
  }


  async getVenueMemberlist(data) {
    const res = await getVenueMemberlist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ memberList: res.data.data, other: res.data.other.maxcount })
      setTimeout(() => {
        let html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementsByTagName("table")[0].outerHTML + "</body></html>";
        let blob = new Blob([html], { type: "application/vnd.ms-excel" });
        this.setState({ href: URL.createObjectURL(blob), download: '会员管理第' + this.state.page + '页.xls' })
      }, 500);
    } else {
      message.error(res.data.msg)
    }
  }

  async getSiteSelectMemberlevel(data) {
    const res = await getSiteSelectMemberlevel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ levelList: res.data.data })
    } 
  }

  componentDidMount() {
    this.getVenueMemberlist({ page: this.state.page })
    this.getSiteSelectMemberlevel()
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
    this.setState({ text: e.target.value })
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


  handleChange = e => {
    this.setState({ handleChange: this.state.levelList[e].id,handleChangeTwo:this.state.levelList[e].grade_name })
  }

  topUp = e => {
    this.setState({ topUp: e.target.value, balance: Number(this.state.giveAway) + Number(e.target.value) })
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

  validityThree = e => {
    this.setState({ validityThree: Number(e) })
  }

  vipSubmiter = () => {
    let { cardHolderVal, contactPersonVal, birthdays, contactNumberVal, VipcardVal, handleChange,handleChangeTwo, topUp, giveAway, balance, validity } = this.state
    let obj = {
      cardholderName: cardHolderVal,
      contacts: contactPersonVal,
      birthday: birthdays,
      contactNumber: contactNumberVal,
      cardNumber: VipcardVal,
      grade: handleChange,
      gradeName:handleChangeTwo,
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
  currentTwo = (page, pageSize) => {
    this.setState({ pageTwo: page })
    this.getVenueMemberRecordsOfConsumption({ memberuuid: this.state.RecordsUid, page: page })
  }

  recordsList = e => {
    this.setState({ records: true, RecordsUid: e.currentTarget.dataset.uuid })
    this.getVenueMemberRecordsOfConsumption({ memberuuid: e.currentTarget.dataset.uuid, page: 1 })
  }
  records = () => {
    this.setState({ records: false })
  }

  async getVenueMemberDetails(data) {
    const res = await getVenueMemberDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ memberDetails: res.data.data, validityThree: res.data.data.effective })
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
    this.setState({ topUpTwo: e.target.value, balanceTwo: Number(this.state.memberDetails.balance) + Number(this.state.giveAwayTwo) + Number(e.target.value) })
  }
  giveAwayTwo = e => {
    this.setState({ giveAwayTwo: e.target.value, balanceTwo: Number(this.state.memberDetails.balance) + Number(this.state.topUpTwo) + Number(e.target.value) })
  }



  vipSubmiterTwo = () => {
    let { vipUid, validityThree, topUpTwo, giveAwayTwo } = this.state
    let obj = {
      memberuuid: vipUid,
      rechargeMoney: topUpTwo,
      giveMoney: giveAwayTwo,
      effective: validityThree
    }

    this.VenueMemberRecharge(obj)
  }

  async VenueMemberRecharge(data) {
    const res = await VenueMemberRecharge(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ topAmount: false, giveAwayTwo: '', topUpTwo: '', balanceTwo: '' })
      if (this.state.text !== '') {
        this.getVenueMemberlist({ search: this.state.text })
      } else {
        this.getVenueMemberlist({ page: this.state.page })
      }
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
        contactNumberTqwo: res.data.data.contactNumber, VipcardTwo: res.data.data.cardNumber,gradeThree:res.data.data.gradeName, gradeTwo: res.data.data.grade, validityTwo: res.data.data.effective
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
  dateOnChangeTwoTwo = (value, mode) => {
    this.setState({ dateOnChangeTwo: value._d.format("yyyy-MM-dd") })

  }
  contactNumberTqwo = e => {
    this.setState({ contactNumberTqwo: e.target.value })
  }
  VipcardTwo = e => {
    this.setState({ VipcardTwo: e.target.value })
  }
  gradeTwo = e => {
    this.setState({ gradeTwo:this.state.levelList[e].id,gradeThree:this.state.levelList[e].grade_name })
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
    let { memberuuidFour, cardHolderTwo, contactPersonTwo, dateOnChangeTwo, code, codeTwo, makeNumTwo, contactNumberTqwo, VipcardTwo, gradeTwo,gradeThree, validityTwo } = this.state
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
      gradeName:gradeThree,
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


  async getVenueMemberlistexcel(data) {
    const res = await getVenueMemberlistexcel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
    } else {
      message.error(res.data.msg)
    }
  }


  xlsxChange = (info) => {
    if (info.file.status === 'done') {
      if (info.file.response.code === 2000) {
        message.success('上传成功')
        this.setState({ import: false })
        this.getVenueMemberlist({ page: 1 })
      } else {
        message.error(info.file.response.msg)
      }
    }
  }

  joinVipTitle = () => {
    this.setState({ joinVipTitle: true })
  }

  joinVipTitleTwo=()=>{
    this.setState({joinVipTitle:false})
  }
  vipTextArea = e => {
    this.setState({ vipTextArea: e.target.value })
  }

  vipGrade = e => {
    this.setState({ vipGrade: e })
  }
  async getSiteAddMember(data) {
    const res = await getSiteAddMember(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ joinVipTitle: false })
      this.getSiteSelectMemberlevel()
    } else {
      message.warning(res.data.msg)
    }
  }


  btnVipTitle = () => {
    this.getSiteAddMember({ grade_name: this.state.vipTextArea, grade_level: this.state.vipGrade })
  }

  render() {


    const props = {
      name: 'ss',
      action:urlKo+'api/import',
      headers: {
        authorization: 'authorization-text',
        token: sessionStorage.getItem("venue_token")
      },

    }

    return (
      <div className="VipAgement">
        <div className="header">
          <div className="left">会员信息</div>
          <div className="sreach"> <Search placeholder="请输入卡主名称/手机号/会员卡号" onChange={this.search} /></div>
        </div>
        <div className="line"></div>
        <div className="content">
          <table style={{ width: '100%', border: 'none' }} border="juikj">
            <tbody>
              <tr className="headList">
                <td>卡主名称</td>
                <td>联系人</td>
                <td>生日</td>
                <td>联系电话</td>
                <td>会员卡号</td>
                <td>会员等级</td>
                <td>充值金额</td>
                <td>赠送金额</td>
                <td>折扣</td>
                <td>余额</td>
                <td>有效期</td>
                <td>会员状态</td>
                <td>操作</td>
              </tr>

              {
                this.state.memberList.map((item, i) => (
                  <tr className="headListTwo" key={i}>
                    <td>{item.cardholderName}</td>
                    <td>{item.contacts}</td>
                    <td>{item.birthday}</td>
                    <td>{item.contactNumber}</td>
                    <td>{item.cardNumber}</td>
                    <td>{item.gradeName}</td>
                    <td>￥{item.rechargeMoney}</td>
                    <td>￥{item.giveMoney}</td>
                    <td>{item.discount}</td>
                    <td>￥{item.balance}<br /><span style={{ fontSize: '10px', paddingLeft: '5px', color: '#4A90E2', cursor: 'pointer' }} data-uuid={item.uuid} onClick={this.recordsList}>历史记录</span></td>
                    <td>{item.effectiveDate}</td>
                    <td>{item.status === 1 ? '正常' : item.status === 2 ? '已退卡' : item.status === 3 ? '已过期' : ''}</td>
                    <td><span className="topUp" data-uuid={item.uuid} onClick={this.topAmountDetail}>充</span><span className="topUp tui" data-uuid={item.uuid} onClick={this.returnCard}>退</span><img onClick={this.editorKo} data-uuid={item.uuid} style={{ cursor: 'pointer' }} src={require('../../assets/icon_pc_updata.png')} alt="编辑" /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>


          <div style={this.state.memberList.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '84px', height: '84px', display: 'block', margin: '64px auto 0' }} src={require('../../assets/vipno.png')} alt='icon' /><span style={{ display: 'block', textAlign: 'center' }}>您还没有添加会员信息!</span></div>

          <Pagination style={{ marginBottom: '15px' }} hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
          <div className="bottomJoin" onClick={this.bottomJoin}>+新增会员信息</div>
          <div className="import derivedTwo" ><a href="https://cgstg.zhaoduishou.com/uploads/excel/import.xlsx">下载导入模板</a></div>
          <div className="import" onClick={this.importTr}>导入会员</div>
          <div className="derived import"> <a href={urlKo + 'api/export?token=' + sessionStorage.getItem('venue_token')}>导出会员</a></div>

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
            <Input placeholder="请填写" onChange={this.cardHolder} />
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
            <span className="title">会员等级<span className="redStart">*</span></span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px',float:'left' }} onChange={this.handleChange}>

              {
                this.state.levelList.map((item,i) => (
                  <Option key={i} value={i}>{item.grade_name+'-('+item.grade_level+'级)'}</Option>
                ))
              }
             
            </Select>
            <div style={{float:'left',color:'blue',fontSize:'12px',lineHeight:'32px',cursor:'pointer'}} onClick={this.joinVipTitle}>+添加会员等级</div>
          </div>
          <div className="ViplistSon">
            <span className="title">充值金额<span className="redStart">*</span></span>
            <Input type='number' placeholder="请填写" onChange={this.topUp} />
          </div>
          <div className="ViplistSon">
            <span className="title">赠送金额</span>
            <Input type='number' placeholder="请填写" onChange={this.giveAway} />
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
            title="添加会员等级"
            visible={this.state.joinVipTitle}
            onOk={this.handleOk}
            onCancel={this.joinVipTitleTwo}
            width={630}
            style={{ zIndex: 999 }}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
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
            <Upload {...props} onChange={this.xlsxChange}>
              <Button style={{ marginLeft: '20px' }} icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
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
                <Col xs={{ span: 5 }}>{item.status === 1 ? parseFloat(item.recharge) + parseFloat(item.give) : item.recharge}</Col>
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
            <Input value={this.state.memberDetails.gradeName} disabled={true} />
          </div>


          <div className="ViplistSon">
            <span className="title">有效期<span className="redStart">*</span></span>
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }}
              value={this.state.validityThree === 1 ? '一个月' : this.state.validityThree === 2 ? '二个月' : this.state.validityThree === 3 ? '三个月' : this.state.validityThree === 4 ? '四个月' : this.state.validityThree === 5 ? '五个月' : this.state.validityThree === 6 ? '六个月' : this.state.validityThree === 7 ? '七个月' : this.state.validityThree === 8 ? '八个月' : this.state.validityThree === 9 ? '九个月' : this.state.validityThree === 10 ? '十个月' : this.state.validityThree === 11 ? '十一个月' : this.state.validityThree === 12 ? '十二个月' : this.state.validityThree === 13 ? '两年' : this.state.validityThree === 14 ? '三年' : this.state.validityThree === 15 ? '四年' : this.state.validityThree === 16 ? '五年' : this.state.validityThree === 17 ? '六年' : ''}
              onChange={this.validityThree}>
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



          <div className="ViplistSon">
            <span className="title">当前余额</span>
            <Input placeholder="请填写" value={this.state.memberDetails.balance} disabled={true} />
          </div>

          <div className="ViplistSon">
            <span className="title">充值金额<span className="redStart">*</span></span>
            <Input type='number' placeholder="请填写" value={this.state.topUpTwo} onChange={this.topUpTwo} />
          </div>
          <div className="ViplistSon">
            <span className="title">赠送金额</span>
            <Input type='number' placeholder="请填写" value={this.state.giveAwayTwo} onChange={this.giveAwayTwo} />
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
            <Input placeholder="请填写" onChange={this.cardHolderTwo} value={this.state.cardHolderTwo} />
          </div>
          <div className="ViplistSon">
            <span className="title">联系人</span>
            <Input placeholder="请填写" onChange={this.contactPersonTwo} value={this.state.contactPersonTwo} maxLength={6} />
          </div>
          <div className="ViplistSon">
            <span className="title">生日</span>
            <DatePicker style={{ marginLeft: '19.5px', width: '300px' }} allowClear={false} value={moment(this.state.dateOnChangeTwo)} onPanelChange={this.dateOnChangeTwoTwo} onChange={this.dateOnChangeTwo} />
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
            <Select placeholder="请选择 " style={{ width: 300, marginLeft: '18px' }} value={this.state.gradeThree} onChange={this.gradeTwo}>
            {
                this.state.levelList.map((item,i) => (
                  <Option key={i} value={i}>{item.grade_name+'-('+item.grade_level+'级)'}</Option>
                ))
              }
             
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
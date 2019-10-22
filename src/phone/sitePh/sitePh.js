import React from 'react';
import './sitePh.css';
import { message, Row, Col, Input, Pagination, Drawer, Select, TimePicker, DatePicker, Result, Icon, Popconfirm,Spin } from 'antd';
import { getVenueFieldList, getVenueSport, addVenueField, getFirstField, getVenueDiscountList, addVenueDiscount, delVenueField, DelVenueDiscount, getFirstDiscount } from '../../api';

import moment from 'moment';


const format = 'HH:mm';


const { Option } = Select;
class sitePh extends React.Component {

  state = {
    getVenueFieldList: [],
    total: 0,
    clickNum: 1,
    sportid: '',
    selectNum: null,
    flag: false,
    flagTwo: false,
    visible: false,
    userPickerVisible: false,
    addressPickerVisible: false,
    defaultValue: { name: '足球', value: 5 },
    address: this.defaultAddress,
    sValue: ['2013', '春'],
    sportList: [],
    DrawerVisible: false,
    addsporId: [],
    runName: '',
    dateChange: '',
    startTime: '0:00',
    endTime: '0:00',
    price: '',
    num: '',
    weekChange: [],
    timeChange: [],
    comment: '',
    getVenueDiscountList: [],
    Youtotal: 1,
    selectNumTwo: null,
    Youvisible: false,
    siteDeletId: '',//删除某一条场地设置
    sitePage: 1,//场地设置当前页
    siteEditor: 0,//场地设置打开修改
    editorListId: '',
    opendayname: '',

    projectTwoId: '',
    projectTwoName: [],
    startDateTwo: undefined,
    endDateTwo: undefined,
    startTimeTwo: '0:00',
    endTimeTwo: '0:00',
    priceTwo: '',
    numTwo: '',
    timeChangeTwo: [],
    timeChangeTwoNa: [],
    commentTwo: '',
    perDeletId: '',//删除某一条优惠活动id
    perPage: 1,//优惠活动当前页
    YouId: '',
    siteSportId:0,
    activitySportId:0,
    spin:true
  };
  async getVenueFieldList(data) {
    const res = await getVenueFieldList(data, localStorage.getItem('venue_token'))
    this.setState({spin:false})
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].maxScheduledDate === 0.1) {
          res.data.data[i].date = '一周'
        } else if (res.data.data[i].maxScheduledDate === 0.2) {
          res.data.data[i].date = '二周'
        } else if (res.data.data[i].maxScheduledDate === 0.3) {
          res.data.data[i].date = '三周'
        } else if (res.data.data[i].maxScheduledDate === 1) {
          res.data.data[i].date = '一个月'
        } else if (res.data.data[i].maxScheduledDate === 2) {
          res.data.data[i].date = '两个月'
        }
      }
      this.setState({ getVenueFieldList: res.data.data, total: res.data.other })
    }
  }

  screenChange=e=>{
    this.setState({siteSportId:e,selectNum:'l'})
    this.getVenueFieldList({ sportid: e, page: '' })
  }

  activityChangeTwo=e=>{
    this.setState({activitySportId:e,selectNumTwo:'l'})
    this.getVenueDiscountList({ sportid: e, page: '' })
  }

  screenChangeTwo=e=>{
    this.setState({activitySportId:e,selectNum:'l'})
    this.getVenueDiscountList({ sportid: e, page: '' })
  }

  async getVenueDiscountList(data) {
    const res = await getVenueDiscountList(data, localStorage.getItem('venue_token'))
    
      this.setState({ getVenueDiscountList: res.data.data, Youtotal: res.data.other })
    
  }



  async addVenueDiscount(data) {
    const res = await addVenueDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ Youvisible: false })
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: '' })
    } else if (res.data.code !== 4001 && res.data.code !== 2000) {
      message.info(res.data.msg)
    }
  }
  async getVenueSport(data) {
    const res = await getVenueSport(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ sportList: res.data.data })
    }
  }

  async getFirstField(data) {
    const res = await getFirstField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({
        addsporId: res.data.data.sportid, runName: res.data.data.sportname, dateChange: res.data.data.openday,
        startTime: res.data.data.starttime, endTime: res.data.data.endtime, price: res.data.data.costperhour, num: res.data.data.maxtablecount,
        weekChange: res.data.data.maxScheduledDate, timeChange: res.data.data.appointmenttime, comment: res.data.data.comment
      })
    }

    let day = ''
    switch (parseInt(res.data.data.openday)) {
      case 1:
        day = "周一";
        break;
      case 2:
        day = "周二";
        break;
      case 3:
        day = "周三";
        break;
      case 4:
        day = "周四";
        break;
      case 5:
        day = "周五";
        break;
      case 6:
        day = "周六";
        break;
      case 0:
        day = "周日";
        break;
      default:
        day = "";
    }
    this.setState({ opendayname: day })
  }


  async addVenueField(data) {
    const res = await addVenueField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('操作成功')
      this.setState({ DrawerVisible: false })
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
    } else {
      message.error(res.data.msg)
    }
  }

  componentDidMount() {
    this.getVenueFieldList({ sportid: '', page: '' })
    this.getVenueDiscountList({ sportid: '', page: '' })
    this.getVenueSport()
  }
  site = () => {
    this.setState({ clickNum: 1,selectNumTwo:'l',selectNum:'l' })
  }
  preferential = () => {
    this.setState({ clickNum: 2 })
  }
  current = (page, pageSize) => {
    this.setState({ sitePage: page, flag: false,selectNum:'l' })
    this.getVenueFieldList({ sportid: this.state.siteSportId, page: page })
  }
  currentTwo = (page, pageSize) => {
    this.setState({ perPage: page, flagTwo: false,selectNumTwo:'l' })
    this.getVenueDiscountList({ sportid: this.state.sportid, page: page })
  }
  selectBottom = (e) => {
    if (e.currentTarget.dataset.index === this.state.selectNum) {
      this.setState({ selectNum: 'l' })
    } else if (e.currentTarget.dataset.index !== this.state.selectNum) {
      this.setState({ selectNum: e.currentTarget.dataset.index })
    }


  }
  selectBottomTwo = (e) => {
    if (e.currentTarget.dataset.index===this.state.selectNumTwo) {
      this.setState({ selectNumTwo: 'l' })
    } else if(e.currentTarget.dataset.index!==this.state.selectNumTwo) {
      this.setState({ selectNumTwo: e.currentTarget.dataset.index })
    }
  }

  addList = () => {
    this.setState({ DrawerVisible: true })
    this.setState({
      addsporId: [], runName: '', dateChange: [],
      startTime: '0:00', endTime: '0:00', price: '', num: '',
      weekChange: [], timeChange: [], comment: []
    })
  }

  addYouList = () => {
    this.setState({ Youvisible: true })
    this.setState({
      projectTwoId: '', projectTwoName: [], startDateTwo: undefined, endDateTwo: undefined,
      startTimeTwo: '0:00', endTimeTwo: '0:00', priceTwo: '',
      numTwo: '', timeChangeTwo: [], commentTwo: ''
    })
  }


  drawerClose = () => {
    this.setState({ DrawerVisible: false, siteEditor: 0 })
  }

  drawerCloseTwo = () => {
    this.setState({ Youvisible: false })
  }
  handleChangeUser = (data) => {
    data = data || {}
    this.userData.defaultValue = data
    this.setState({ defaultValue: data })
  }

  closeUserPicker = () => {
    this.setState({ userPickerVisible: false })
  }

  cancelUserPicker = () => {
    this.userData.defaultValue = {};
    this.setState({
      userPickerVisible: false,
      defaultValue: {}
    });
  }
  project = e => {
    this.setState({ addsporId: e })
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

  dateChange = e => {
    console.log(e)
    if (typeof (e) === 'object') {
      this.setState({ dateChange: e })
    } else {
      this.setState({ dateChange: parseInt(e) })
      let day = ''
      switch (parseInt(e)) {
        case 1:
          day = "周一";
          break;
        case 2:
          day = "周二";
          break;
        case 3:
          day = "周三";
          break;
        case 4:
          day = "周四";
          break;
        case 5:
          day = "周五";
          break;
        case 6:
          day = "周六";
          break;
        case 0:
          day = "周日";
          break;
        default:
          day = "";
      }
      this.setState({ opendayname: day })
    }
  }
  startTime = (date, dateString) => {
    this.setState({ startTime: dateString })
  }
  endTime = (date, dateString) => {
    this.setState({ endTime: dateString })
  }
  price = e => {
    this.setState({ price: e.target.value })
  }
  num = e => {
    this.setState({ num: e.target.value })
  }
  weekChange = e => {
    this.setState({ weekChange: parseFloat(e) })
  }
  timeChange = e => {
    this.setState({ timeChange: parseFloat(e) })
  }
  comment = e => {
    this.setState({ comment: e.target.value })
  }
  submit = () => {
    let { addsporId, runName, dateChange, opendayname, startTime, endTime, price, num, weekChange, timeChange, comment, editorListId } = this.state
    if(runName===''){
       message.warning('请选择运动项目')
    }else if(opendayname===''){
      message.warning('请选择营业时间段')
    }else if(startTime===''){
      message.warning('请选择开始时间')
    }else if(endTime===''){
      message.warning('请选择结束时间')
    }else if(price===''){
      message.warning('请填写价格')
    }else if(num===''){
      message.warning('请填写场地数量')
    }else if(weekChange===[]){
      message.warning('请选择最长可预订时间')
    }else if(timeChange===[]){
      message.warning('请选择提前预定时间')
    }else{
      let data = {
        sportid: addsporId,
        sportname: runName,
        opendayname: opendayname,
        starttime: startTime,
        endtime: endTime,
        costperhour: price,
        maxtablecount: num,
        maxScheduledDate: weekChange,
        appointmenttime: timeChange,
        comment: comment,
        uuid: editorListId
      }
      if (typeof (dateChange) === 'number') {
        data.openday = dateChange
      } else {
        data.openday = dateChange.join(',')
      }
      this.addVenueField(data)
    }
  
  }
  editor = e => {
    this.setState({ DrawerVisible: true, siteEditor: 1 })
    this.setState({ editorListId: e.currentTarget.dataset.uuid })
    this.getFirstField({ uuid: e.currentTarget.dataset.uuid })

  }

  //删除某一条场地设置
  async delVenueField(data) {
    const res = await delVenueField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({selectNum:'l'})
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
    } else {
      message.error(res.data.msg)
    }
  }
  mood = e => {
    this.setState({ siteDeletId: e.currentTarget.dataset.uuid })
  }
  siteDelet = () => {
    this.delVenueField({ uuid: this.state.siteDeletId })
  }


  //////////////////////  优惠活动获取添加
  projectTwo = e => {
    this.setState({ projectTwoId: e })
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
    this.setState({ projectTwoName: day })
  }
  startDateTwo = (date, dateString) => {
    this.setState({ startDateTwo: dateString })
  }
  endDateTwo = (date, dateString) => {
    this.setState({ endDateTwo: dateString })
  }
  startTimeTwo = (date, dateString) => {
    this.setState({ startTimeTwo: dateString })
  }

  endTimeTwo = (date, dateString) => {
    this.setState({ endTimeTwo: dateString })
  }
  priceTwo = e => {
    this.setState({ priceTwo: e.target.value })
  }
  numTwo = e => {
    this.setState({ numTwo: e.target.value })
  }
  timeChangeTwo = e => {
    this.setState({ timeChangeTwo: e })
    let day = ''
    switch (parseInt(e)) {
      case 0:
        day = "0分钟";
        break;
      case 30:
        day = "30分钟";
        break;
      case 60:
        day = "60分钟";
        break;
      case 120:
        day = "120分钟";
        break;
      case 180:
        day = "180分钟";
        break;
      default:
        day = "";
    }
    this.setState({ timeChangeTwoNa: day })

  }
  commentTwo = e => {
    this.setState({ commentTwo: e.target.value })
  }
  submitTwo = () => {
    let { projectTwoId, projectTwoName, startDateTwo, endDateTwo, startTimeTwo, endTimeTwo, priceTwo, numTwo, timeChangeTwo, commentTwo, YouId } = this.state
    if(projectTwoId===''){
      message.warning('请选择运动项目')
    }else if(priceTwo===''){
      message.warning('请填写价格')
    }else if(numTwo===''){
      message.warning('请填写场地数量')
    }else if(timeChangeTwo===[]){
      message.warning('请选择可提前预定时间')
    }else{
      let data = {
        sportid: projectTwoId,
        sportname: projectTwoName,
        starttime: startTimeTwo,
        endtime: endTimeTwo,
        costperhour: priceTwo,
        maxtablecount: numTwo,
        appointmenttime: timeChangeTwo,
        fromdate: startDateTwo,
        enddate: endDateTwo,
        comment: commentTwo,
        uuid: YouId
      }
      this.addVenueDiscount(data)
    }
  }

  //删除某一条优惠活动
  async DelVenueDiscount(data) {
    const res = await DelVenueDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: this.state.perPage })
    } else {
      message.error(res.data.msg)
    }
  }

  per = e => {
    this.setState({ perDeletId: e.currentTarget.dataset.uuid })
  }

  perDelet = () => {
    this.DelVenueDiscount({ uuid: this.state.perDeletId })
  }

  editorTwo = (e) => {
    this.setState({ Youvisible: true })
    this.setState({ YouId: e.currentTarget.dataset.uuid })
    this.getFirstDiscount({ uuid: e.currentTarget.dataset.uuid })
  }


  async getFirstDiscount(data) {
    const res = await getFirstDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        projectTwoId: res.data.data.sportid, projectTwoName: res.data.data.sportname, startDateTwo: res.data.data.fromdate, endDateTwo: res.data.data.enddate,
        startTimeTwo: res.data.data.starttime, endTimeTwo: res.data.data.endtime, priceTwo: res.data.data.costperhour,
        numTwo: res.data.data.maxtablecount, timeChangeTwo: res.data.data.appointmenttime, commentTwo: res.data.data.comment
      })
    }
  }



  render() {
    return (
      <div className="sitePh">
        <div className="siteheaderTitle">
          <div onClick={this.site} style={this.state.clickNum === 1 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>场地设置</div>
          <div onClick={this.preferential} style={this.state.clickNum === 2 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>优惠活动</div>
          {/* <div>筛选<img src={require('../../assets/shaixuan.png')} /></div> */}
        </div>
        <div style={{ height: '0.5rem', background: '#f5f5f5' }}></div>
        <div className={this.state.clickNum === 1 ? 'site' : 'none'}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #f5f5f5' }}>
            <Col className="oneCol" xs={{ span: 9 }} lg={{ span: 6 }}>
              <Select defaultValue="运动项目" dropdownStyle={{ textAlign: 'center' }} style={{ width: '100%', textAlign: 'center' }} onChange={this.screenChange}>
              <Option value='0'>全部</Option>
                {
                  this.state.sportList.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>


            </Col>
            <Col xs={{ span: 9 }} lg={{ span: 6 }}>时间</Col>
            <Col xs={{ span: 6 }} lg={{ span: 6 }}>价格(元/时)</Col>
          </Row>
          <div className="contentScorll">
            {
              this.state.getVenueFieldList.map((item, i) => (
                <div key={i} style={{ borderBottom: '0.06rem solid #f5f5f5', transition: '0.2s' }}>
                  <Row onClick={this.selectBottom} data-index={i}>
                    <Col className="oneCol" xs={{ span: 9 }} lg={{ span: 6 }}>{item.sportname}</Col>
                    <Col xs={{ span: 9 }} lg={{ span: 6 }}>{item.starttime + '-' + item.endtime}</Col>
                    <Col xs={{ span: 6 }} lg={{ span: 6 }}>{item.costperhour}</Col>
                  </Row>

                  <div className={parseInt(this.state.selectNum) === i ? 'selectBottom' : 'none'}>
                    <div className="top"><div style={{ paddingLeft: '2rem' }}><span>日期</span>{item.opendayname}</div><div><span>场地数量</span>{item.maxtablecount}</div> <img className="upLoad" style={{right:'7%'}} onClick={this.editor} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /></div>
                    <div className="top" style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}><div><span>最长可预定时间</span>{item.date}</div>
                      <div style={{ marginLeft: '1rem' }}><span>最短预定时间</span>{item.appointmenttime + '分钟'}</div></div>

                    <Popconfirm
                      title="你确定要删除吗?"
                      onConfirm={this.siteDelet}
                      onCancel={this.siteCancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <img className="upLoad" style={{ right: '1.5rem' }} onClick={this.mood} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" />
                    </Popconfirm>
                  </div>
                </div>
              ))
            }
            <Spin spinning={this.state.spin} style={{width:'100%',marginTop:'45%'}}/>
            <Pagination className="fenye" defaultCurrent={1} style={this.state.getVenueFieldList.length < 1 ? { display: 'none' } : {}} size="small" onChange={this.current} total={this.state.total} />
            <Result className={this.state.spin===false&&this.state.getVenueFieldList.length === 0 ? '' : 'nono'} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{fontSize:'2rem'}} />} title="没有场地设置" />
            <img className="addList" onClick={this.addList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
          </div>
          <Drawer
            title="添加/修改场地设置"
            placement="right"
            width='100%'
            onClose={this.drawerClose}
            visible={this.state.DrawerVisible}
            closable={true}
          >
            <div className='drawSite'>
              <div className="sitePhlistSon">
                <span>运动项目</span>
                <Select
                  style={{ width: '50%', float: 'right' }}
                  placeholder="请选择"
                  onChange={this.project}
                  value={this.state.addsporId}
                >
                  {
                    this.state.sportList.map((item, i) => (
                      <Option key={i} value={item.id}>{item.name}</Option>
                    ))
                  }
                </Select>
              </div>

              <div className="sitePhlistSon">
                <span>节假日/工作日</span>
                <Select
                  mode={this.state.siteEditor === 1 ? '' : 'multiple'}
                  style={{ width: '50%', float: 'right' }}
                  placeholder="请选择"
                  onChange={this.dateChange}
                  value={this.state.siteEditor === 1 ? this.state.dateChange === 0 ? '周日' : [] && this.state.dateChange === 1 ? '周一' : [] && this.state.dateChange === 2 ? '周二' : [] && this.state.dateChange === 3 ? '周三' : [] && this.state.dateChange === 4 ? '周四' : [] && this.state.dateChange === 5 ? '周五' : [] && this.state.dateChange === 6 ? '周六' : [] : this.state.dateChange}
                >
                  <Option value='1'>周一</Option>
                  <Option value='2'>周二</Option>
                  <Option value='3'>周三</Option>
                  <Option value='4'>周四</Option>
                  <Option value='5'>周五</Option>
                  <Option value='6'>周六</Option>
                  <Option value='0'>周日</Option>
                </Select>
              </div>
              <div className="sitePhlistSon">
                <span>开始时间</span>
                <TimePicker style={{ float: 'right', width: '50%' }} value={moment(this.state.startTime, format)} minuteStep={30} onChange={this.startTime} placeholder="开始时间" format={format} />
              </div>

              <div className="sitePhlistSon">
                <span>结束时间</span>
                <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.endTime} minuteStep={30} value={moment(this.state.endTime, format)} format={format} />
              </div>

              <div className="sitePhlistSon">
                <span>价格(元/时)</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.price} onChange={this.price} placeholder="请输入" type="number" />
              </div>
              <div className="sitePhlistSon">
                <span>数量</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.num} onChange={this.num} placeholder="请输入" type="number" />
              </div>

              <div className="sitePhlistSon">
                <span>最长可预定时间</span>
                <Select
                  style={{ width: '50%', float: 'right' }}
                  placeholder="请选择"
                  onChange={this.weekChange}
                  value={this.state.weekChange === 0.1 ? '一周' : [] && this.state.weekChange === 0.2 ? '两周' : [] && this.state.weekChange === 0.3 ? '三周' : [] && this.state.weekChange === 1 ? '一个月' : [] && this.state.weekChange === 2 ? '两个月' : []}
                >
                  <Option value='0.1'>一周</Option>
                  <Option value='0.2'>两周</Option>
                  <Option value='0.3'>三周</Option>
                  <Option value='1'>一个月</Option>
                  <Option value='2'>两个月</Option>
                </Select>
              </div>

              <div className="sitePhlistSon">
                <span>最短提前预定时间</span>
                <Select
                  style={{ width: '50%', float: 'right' }}
                  placeholder="请选择"
                  onChange={this.timeChange}
                  value={this.state.timeChange === 0 ? '0分钟' : [] && this.state.timeChange === 30 ? '30分钟' : [] && this.state.timeChange === 60 ? '60分钟' : [] && this.state.timeChange === 120 ? '120分钟' : [] && this.state.timeChange === 180 ? '180分钟' : []}
                >
                  <Option value='0'>0分钟</Option>
                  <Option value='30'>30分钟</Option>
                  <Option value='60'>60分钟</Option>
                  <Option value='120'>120分钟</Option>
                  <Option value='180'>180分钟</Option>
                </Select>
              </div>

              <div className="sitePhlistSon">
                <span>备注</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.comment} onChange={this.comment} placeholder="请输入" type="number" />
              </div>
              <div className="sitePhsubmit" onClick={this.submit}>提交</div>
              {/* <div className="sitePhclose" onClick={this.drawerClose}>取消</div> */}
            </div>
          </Drawer>
        </div>
        <div className={this.state.clickNum === 2 ? 'preferential' : 'none'}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #f5f5f5' }}>
            <Col xs={{ span: 9}} lg={{ span: 6 }}>
            <Select defaultValue="运动项目" dropdownStyle={{ textAlign: 'center' }} style={{ width: '100%', textAlign: 'center' }} onChange={this.activityChangeTwo}>
              <Option value='0'>全部</Option>
                {
                  this.state.sportList.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </Col>
            <Col xs={{ span: 6 }} lg={{ span: 6 }}>时间</Col>
            <Col xs={{ span: 8 }} lg={{ span: 6 }}>价格（元/时）</Col>
          </Row>
          <div style={this.state.getVenueDiscountList.length < 1 ? { display:'none' } : {}}>
            {
              this.state.getVenueDiscountList.map((item, i) => (
                <div key={i} style={{ borderBottom: '0.06rem solid #f5f5f5' }}>
                  <Row onClick={this.selectBottomTwo} data-index={i}>
                    <Col xs={{ span: 9 }} lg={{ span: 6 }}>{item.sportname}</Col>
                    <Col xs={{ span: 6 }} lg={{ span: 6 }}>{item.starttime + '-' + item.endtime}</Col>
                    <Col xs={{ span: 8 }} lg={{ span: 6}}>{item.costperhour}</Col>
                  </Row>
                  {/* && this.state.flagTwo === true */}
                  <div className={parseInt(this.state.selectNumTwo) === i ? 'selectBottom' : 'none'}>
                    <div className="top"><div><span>场地预留数量</span>{item.maxtablecount}</div><div style={{marginLeft:'1rem'}}><span>最短提前预定时间</span>{item.appointmenttime}分钟</div>  <img className="upLoad" onClick={this.editorTwo} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /></div>
                    <div className="top" style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}><span>有效期  </span>{item.fromdate}至{item.enddate}</div>
                  
                    <Popconfirm
                      title="你确定要删除吗?"
                      onConfirm={this.perDelet}
                      onCancel={this.siteCancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <img className="upLoad" style={{ right: '13%' }} onClick={this.per} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" />
                    </Popconfirm>
                  </div>
                </div>
              ))
            }
          </div>

          <Pagination className="fenye" style={this.state.getVenueDiscountList.length < 1 ? { display: 'none' } : {}} defaultCurrent={1} size="small" onChange={this.currentTwo} total={this.state.Youtotal} />
          <Result  className={this.state.getVenueDiscountList.length === 0 ? '' : 'nono'} icon={<Icon  type="gift" theme="twoTone" twoToneColor="#F5A623" style={{fontSize:'2rem'}} />} title="没有优惠活动" />
          <img className="addList" onClick={this.addYouList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
        </div>
        <Drawer
          title="添加/修改优惠活动"
          placement="right"
          closable={true}
          onClose={this.drawerCloseTwo}
          visible={this.state.Youvisible}
          width='100%'
        >
          <div className="SzSon">
            <span>运动项目</span>
            <Select
              style={{ width: '50%', float: 'right' }}
              placeholder="请选择"
              onChange={this.projectTwo}
              value={this.state.projectTwoName}
            >
              {
                this.state.sportList.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>

          <div className="SzSon">
            <span>开始日期</span>
            <DatePicker style={{ width: '50%', float: 'right' }} placeholder="请选择开始日期" onChange={this.startDateTwo} value={moment(this.state.startDateTwo)} />
          </div>

          <div className="SzSon">
            <span>结束日期</span>
            <DatePicker style={{ width: '50%', float: 'right' }} placeholder="请选择结束日期" onChange={this.endDateTwo} value={moment(this.state.endDateTwo)} />
          </div>
          <div className="SzSon">
            <span>开始时间</span>
            <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.startTimeTwo} value={moment(this.state.startTimeTwo, format)} format={format} />
          </div>
          <div className="SzSon">
            <span>结束时间</span>
            <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.endTimeTwo} value={moment(this.state.endTimeTwo, format)} format={format} />
          </div>
          <div className="SzSon">
            <span>价格(元/时)</span>
            <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.priceTwo} onChange={this.priceTwo} placeholder="请输入" type="number" />
          </div>
          <div className="SzSon">
            <span>数量</span>
            <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.numTwo} onChange={this.numTwo} placeholder="请输入" type="number" />
          </div>
          <div className="SzSon">
            <span>最短提前预定时间</span>
            <Select style={{ width: '50%', float: 'right' }} placeholder="请选择" value={this.state.timeChangeTwo === '0' ? '0分钟' : [] && this.state.timeChangeTwo === '30' ? '30分钟' : [] && this.state.timeChangeTwo === '60' ? '60分钟' : [] && this.state.timeChangeTwo === '120' ? '120分钟' : [] && this.state.timeChangeTwo === '180' ? '180分钟' : []} onChange={this.timeChangeTwo}>
              <Option value='0'>0分钟</Option>
              <Option value='30'>30分钟</Option>
              <Option value='60'>60分钟</Option>
              <Option value='120'>120分钟</Option>
              <Option value='180'>180分钟</Option>
            </Select>
          </div>
          <div className="SzSon">
            <span>备注</span>
            <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.commentTwo} onChange={this.commentTwo} placeholder="请输入" />
          </div>
          <div className="sitePhsubmit" onClick={this.submitTwo}>提交</div>
          {/* <div className="sitePhclose" onClick={this.drawerCloseTwo}>取消</div> */}
        </Drawer>
      </div>
    )
  }
}


export default sitePh;
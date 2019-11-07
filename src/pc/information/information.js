import React from 'react';
import './information.css';
import 'antd/dist/antd.css';
import { Input, Button, Row, Col, Select, Pagination, Spin, message, Result, Icon, DatePicker, Modal, Radio, Drawer } from 'antd';
import { getReservationActivitieslist, getVenueReservations, getVenueSport, VenueSendMessage, VenueClickCancelPlace } from '../../api';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Option } = Select;

const { TextArea } = Input;


const antIcon = <Icon type="sync" style={{ fontSize: 24, color: 'black' }} spin />;

class information extends React.Component {

  state = {
    number: '1',
    sport: '',
    status: '',
    listNot: '',
    list: [],
    dianIndex: '0',
    liNum: '',
    loading: true,
    hidden: '',
    Reservations: [],
    letterNum: [],
    activityNav: [],
    tabelFlag: false,
    Oneloading: false,
    other: '',
    visible: false,
    sendCheck: 1,
    textArea: '',
    publicUUID: '',
    placeholder: '请输入预留场地号',
    page: 0,
    macNum: [],
    lookList: [],
    dateString: '',
    informVisible: false,
    informList: [],
    start: '',
    end: '',
    lastTime:'',
    

  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data, liNum: res.data.data[0].id })
      this.getVenueReservations({ sportid: res.data.data[0].id, date: this.state.dateString })
    }
  }

  componentDidMount() {



    this.getVenueSport()
    this.setState({ dateString: new Date().toLocaleDateString().replace(/\//g, "-") })
    if (this.props.location.query !== undefined) {
      if (this.props.location.query.time === 1) {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)
      } else if (this.props.location.query.time === 2) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)
      }else if(this.props.location.query.uuid){
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)

        this.setState({visible:true,publicUUID:this.props.location.query.uuid})
      }
    } else {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
      setInterval(() => {
        this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
      }, 1000 * 60 * 5)
    }

  }

  current = (page, pageSize) => {
    this.setState({ page: page })
    this.getReservationActivitieslist({ page: page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
  }


  handelClick = (e) => {
    this.setState({ number: e.target.dataset.num })
    if (e.target.dataset.num === '1') {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
    }
  }

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data.data, informList: res.data.data.data, other: res.data.other, loading: false, hidden: true, Oneloading: false })
    } else {
      this.setState({ loading: false, hidden: false, Oneloading: false })
    }
  }


  async getVenueReservations(data) {
    const res = await getVenueReservations(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c })
      if(parseInt(res.data.data[res.data.data.length-1].a.slice(0,2))<24){
        if(res.data.data[res.data.data.length-1].a.slice(-2)==='00'){
          this.setState({lastTime:parseInt(res.data.data[res.data.data.length-1].a.slice(0,2))+':30'})
       }else if(res.data.data[res.data.data.length-1].a.slice(-2)==='30'){
         this.setState({lastTime:parseInt(res.data.data[res.data.data.length-1].a.slice(0,2))+1+':00'})
       }
      }
    } else if (res.data.code === 4005) {
      this.setState({ lookList: res.data.data })
    } else if (res.data.code === 4003) {
      this.setState({ lookList: [] })
    }
  }



  nameChang = (e) => {
    this.setState({ sport: e })
    this.getReservationActivitieslist({ page: 1, sport: e, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
  }
  activityChang = (e) => {
    this.setState({ status: e })
    this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: e, startdate: this.state.start, enddate: this.state.end })
  }
  clickLi = (e) => {
    this.getVenueReservations({ sportid: e.target.dataset.num, date: this.state.dateString })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num })
  }
  dateChange = (data, datatring) => {
    this.setState({ dateString: datatring })
    this.getVenueReservations({ sportid: this.state.liNum, date: datatring })
  }
  Oneloading = () => {
    this.setState({ Oneloading: true })
    this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }

  async VenueSendMessage(data) {
    const res = await VenueSendMessage(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ visible: false })
    }else{
      message.error(res.data.msg)
    }
  }

  sending = e => {
    this.setState({ visible: true, publicUUID: e.currentTarget.dataset.uid })
  }
  sendCheck = e => {

    this.setState({ sendCheck: e.target.value })
    if (e.target.value === 2) {
      this.setState({ placeholder: '请说明未预留场地原因' })
    } else {
      this.setState({ placeholder: '请输入预留场地号' })
    }
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }
  sendingMessage = e => {
    let { publicUUID, sendCheck, textArea } = this.state
    this.VenueSendMessage({ type: sendCheck, publicUUID: publicUUID, content: textArea })
  }




  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservations({ sportid: this.state.liNum, date: this.state.dateString })
      message.info(res.data.msg)
    } else {
      message.error('操作失败')
    }
  }

  lookPlate = e => {
    let time = e.currentTarget.dataset.time
    if (e.currentTarget.dataset.type !== '3' && e.currentTarget.dataset.type !== '2') {
      if (e.currentTarget.dataset.type === '1') {
        this.VenueClickCancelPlace({ date: this.state.dateString, time: time, sportid: this.state.liNum, type: e.currentTarget.dataset.type })
      } else if (e.currentTarget.dataset.type === '4') {
        this.VenueClickCancelPlace({ date: this.state.dateString, time: time, sportid: this.state.liNum, type: 2 })
      }
    } else if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '' })
      this.setState({ informVisible: true })
    }
  }

  informOnClose = () => {
    this.setState({ informVisible: false })

  }


  render() {

    let userMessage;
    if (this.state.list.length !== 0) {
      userMessage = (
        <div>
          {
            this.state.list.map((item, i) => (
              <Row key={i}>
                <Col xs={{ span: 3 }}>{item.orderId}</Col>
                <Col xs={{ span: 2 }}>{item.SportName}</Col>
                <Col xs={{ span: 3 }}>{item.StartTime}</Col>
                <Col xs={{ span: 3 }}>{item.FinishedTime}</Col>
                <Col xs={{ span: 1 }}>{item.PlayTime}时</Col>
                <Col xs={{ span: 2 }}>{item.Shouldarrive}</Col>
                <Col xs={{ span: 2 }}>{item.TrueTo}</Col>
                <Col xs={{ span: 2 }}>{item.PublicStatus}</Col>
                <Col xs={{ span: 2 }}>{item.SiteMoney}</Col>
                <Col xs={{ span: 2 }}>{item.SiteMoneyStatus}</Col>
                <Col xs={{ span: 2 }}>
                  <img className={item.PublicStatus === '匹配中' ? 'img' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'img' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'img' : 'circumstanceT'} data-uid={item.uuid} onClick={this.sending} src={require("../../assets/icon_pc_faNews.png")} alt="发送消息" />
                </Col>
              </Row>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} total={this.state.other} onChange={this.current} />
        </div>

      )
    } else {
      userMessage = (
        <h2 className="mast">{this.state.listNot}</h2>
      )
    }
    return (

      <div className="orderList">
        <div className="navTab">
          <Button onClick={this.handelClick} className={this.state.number === '1' ? 'colorGo' : 'colorNot'} data-num='1'>预约活动列表</Button>
          <Button onClick={this.handelClick} data-num='2' className={this.state.number === '2' ? 'colorGo' : 'colorNot'}>场地预约情况</Button>
          <div className="sping"> <Icon type="sync" className={this.state.Oneloading === true || this.state.number === '2' ? 'hidden' : 'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>
        <div className={this.state.number === '1' ? 'listName' : 'listNameT'}>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">

            <Row className="rowConten">
              <Col xs={{ span: 3 }}>活动编号</Col>
              <Col xs={{ span: 2 }}>
                <Select className="selectName" defaultValue="项目名称" style={{ width: 100 }} onChange={this.nameChang}>
                  <Option value="0">全部</Option>
                  <Option value="1">羽毛球</Option>
                  <Option value="2">乒乓球</Option>
                  <Option value="3">台球</Option>
                  <Option value="4">篮球</Option>
                  <Option value="5">足球</Option>
                  <Option value="6">排球</Option>
                  <Option value="7">网球</Option>
                  <Option value="8">高尔夫</Option>
                </Select>
              </Col>
              <Col xs={{ span: 3 }}>开始时间</Col>
              <Col xs={{ span: 3 }}>结束时间</Col>
              <Col xs={{ span: 1 }}>时长</Col>
              <Col xs={{ span: 2 }}>应到人数</Col>
              <Col xs={{ span: 2 }}>已签到人数</Col>
              <Col xs={{ span: 2 }}>
                <Select className="selectName" defaultValue="活动状态" style={{ width: 100 }} onChange={this.activityChang} >
                  <Option value="0">全部</Option>
                  <Option value="1">匹配中</Option>
                  <Option value="2">待出发</Option>
                  <Option value="3">活动中</Option>
                  <Option value="4" title="待填写结果/待确认结束">待填写结果/待确认结束</Option>
                  <Option value="6">待评价</Option>
                  <Option value="5">已完成</Option>
                </Select>
              </Col>
              <Col xs={{ span: 2 }}>场地费金额</Col>
              <Col xs={{ span: 2 }}>场地费状态</Col>
              <Col xs={{ span: 2 }}>发消息</Col>
            </Row>
            <div className={this.state.hidden === true ? '' : 'hidden'} >
              {userMessage}
            </div>
            <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<Icon type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="您还没有预约活动！" />,
          </Spin>


        </div>
        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'}>
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span></span><span>不可选</span></div>
            <div><span></span><span>场馆取消</span></div>
            <div><span></span><span>已占用</span></div>
          </div>
          <ul className="activityNav">
            {
              this.state.activityNav.map((item, i) => (
                <li key={i} onClick={this.clickLi} data-index={i} data-num={item.id} className={parseInt(this.state.dianIndex) === i ? 'borderLi' : ''}>{item.name}</li>
              ))
            }
          </ul>
          <ul className="rightNav">
            {/* <li>今天</li>
            <li>明天</li>
            <li>后天</li> */}
            <li className="dateSelect"><DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} locale={zh_CN} placeholder="请选择日期" className="DatePicker" onChange={this.dateChange} /></li>
          </ul>
          <div className="xiange"></div>
          <div className='lookList' style={this.state.lookList.length < 1 ? { display: 'none' } : { display: 'block' }}>
            {/* <Table pagination={{ simple: false }} columns={this.state.letterNum} dataSource={this.state.Reservations} position='top' scroll={{ x: 2000 }} /> */}
            <div className="headerSon" style={{ width: '' + (this.state.macNum.length + 1) * 3.25 + 'rem' }}>
              <span></span>
              {
                this.state.macNum.map((item, i) => (
                  <span key={i}>{i + 1}</span>
                ))
              }
              {
                this.state.lookList.map((index, i) => (  
                  <div key={i} className="sonList">
                    <span>{index.a}</span>
                    
                    {
                      this.state.lookList[i].c.map((item, i) => (
                        <span key={i} data-time={index.a} data-num={i + 1} data-uuid={item.uuid} data-type={item.type} onClick={this.lookPlate} style={item.type === 1 ? { background: '#6FB2FF', cursor: 'pointer' } : {} && item.type === 2 ? { background: '#E9E9E9' } : {} && item.type === 3 ? { background: '#F5A623', cursor: 'pointer' } : {} && item.type === 4 ? { background: 'red', cursor: 'pointer' } : {}}></span>
                      ))
                    }
                   
                  </div>
                  
                ))
              }
               <span style={{marginTop:'-16px'}}>{this.state.lastTime}</span>
            </div>
          </div>
          <Result className={this.state.lookList.length === 0 ? '' : 'hidden'} icon={<Icon type="fund" theme="twoTone" twoToneColor="#F5A623" />} title="您没有预约情况！" />
        </div>
        <Modal
          title="给参与人员发送消息"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Radio.Group onChange={this.sendCheck} value={this.state.sendCheck}>
            <Radio value={1}>预留场地</Radio>
            <Radio value={2}>未预留场地</Radio>
          </Radio.Group>
          <TextArea style={{ marginTop: '30px' }} className="sending" maxLength={200} placeholder={this.state.placeholder} onChange={this.textArea} rows={4} />
          <span style={{ float: 'left' }}>还可以输入{200 - this.state.textArea.length}字</span>
          <div className="sending">
            <div onClick={this.handleCancel}>取消</div>
            <div onClick={this.sendingMessage}>发送</div>
          </div>
        </Modal>
        <Drawer
          title="该场地详细信息"
          placement="right"
          closable={false}
          width='400px'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >

          <div className="informDrawer">
            <span>活动编号：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].orderId : ''}</span>
          </div>
          <div className="informDrawer">
            <span>项目名称：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SportName : ''}</span>
          </div>
          <div className="informDrawer">
            <span>开始时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].StartTime : ''}</span>
          </div>
          <div className="informDrawer">
            <span>结束时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].FinishedTime : ''}</span>
          </div>
          <div className="informDrawer">
            <span>时长：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}</span>
          </div>
          <div className="informDrawer">
            <span>应到人数：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].Shouldarrive : ''}</span>
          </div>
          <div className="informDrawer">
            <span>已签到人数：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].TrueTo : ''}</span>
          </div>
          <div className="informDrawer">
            <span>活动状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].PublicStatus : ''}</span>
          </div>
          <div className="informDrawer">
            <span>场地费金额：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney : ''}</span>
          </div>
          <div className="informDrawer">
            <span>场地费状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default information;
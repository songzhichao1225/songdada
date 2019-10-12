import React from 'react';
import './orderPh.css';
import { Row, Col, message, Tooltip, Pagination, Modal, Radio, Input, Drawer, DatePicker,Result,Icon } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueReservations,getVenueSport,VenueClickCancelPlace } from '../../api';
const { TextArea } = Input
class orderPh extends React.Component {

  state = {
    activityList: true,
    activeSon: [],
    index: null,
    total: null,
    visible: false,
    sendCheck: 1,
    textArea: '',
    publicUUID: '',
    Drawervisible: false,
    lookList: [],
    macNum: [],
    sportid: 1,
    sportIdVal:0,
    statusIdVal:0,
    flag:false,
    remList:[],
    dataString:'',
    informVisible:false,
    informList:[],
    sport: [
      { name: '全部', id: 0 },
      { name: '羽毛球', id: 1 },
      { name: '乒乓球', id: 2 },
      { name: '台球', id: 3 },
      { name: '篮球', id: 4 },
      { name: '足球', id: 5 },
      { name: '排球', id: 6 },
      { name: '网球', id: 7 },
      { name: '高尔夫', id: 8 }
    ],
    status: [
      { name: '全部', id: 0 },
      { name: '匹配中', id: 1 },
      { name: '待出发', id: 2 },
      { name: '活动中', id: 3 },
      { name: '待确认解释/待填写结果', id: 4 },
      { name: '已完成', id: 5 },
      { name: '待评价', id: 6 },
    ]
  };



  async getVenueReservations(data) {
    const res = await getVenueReservations(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c })
    }
  }
  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ activeSon: res.data.data.data,informList:res.data.data.data, total: res.data.data.count,flag:false })
    }else if(res.data.code===4002){
        this.setState({flag:true})
    }
  }
  

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ remList: res.data.data, liNum: res.data.data[0].id })
    }
  }

  componentDidMount() {
    this.setState({ dataString: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', publicuid: '' })
    this.getVenueReservations({ sportid: 1, date: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.getVenueSport()
  }
  activityList = () => {
    this.setState({ activityList: true })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', publicuid: '' })
  }
  bookingKanban = () => {
    this.setState({ activityList: false })
  }
  select = (e) => {
    if (this.state.index === e.currentTarget.dataset.index) {

    } else {
      this.setState({ index: e.currentTarget.dataset.index })
    }

  }
  current = (page, pageSize) => {
    this.getReservationActivitieslist({ page: page, sport:this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '' })
  }

  showModal = (e) => {
    this.setState({
      visible: true,
      publicUUID: e.currentTarget.dataset.uid
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  sendCheck = e => {
    this.setState({ sendCheck: e.target.value })
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }

  async VenueSendMessage(data) {
    const res = await VenueSendMessage(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ visible: false })
    }
  }

  sendingMessage = e => {
    let { publicUUID, sendCheck, textArea } = this.state
    this.VenueSendMessage({ type: sendCheck, publicUUID: publicUUID, content: textArea })
  }


  showDrawer = () => {
    this.setState({
      Drawervisible: true,
    });
  };

  onClose = () => {
    this.setState({
      Drawervisible: false,
    })
  };

  dateChange = (date, dataString) => {
    this.setState({dataString:dataString})
    this.getVenueReservations({ date: dataString, sportid: this.state.sportid })
  }
  sport=e=>{
    this.setState({sportIdVal:e.currentTarget.dataset.id})
  }
  status=e=>{
    this.setState({statusIdVal:e.currentTarget.dataset.id})
  }
  submitVal=()=>{
    this.getReservationActivitieslist({ page: 1, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '' })
    this.setState({
      Drawervisible: false,
    })
  }

  sportName=e=>{
    console.log(e.currentTarget.dataset.id)
    this.setState({liNum:e.currentTarget.dataset.id})
    this.getVenueReservations({ sportid: e.currentTarget.dataset.id, date:this.state.dataString })
  }

  informOnClose=()=>{
    this.setState({informVisible:false})
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
      if(e.currentTarget.dataset.type==='1'){
        this.VenueClickCancelPlace({ date: this.state.dataString, time: time, sportid: this.state.liNum,type:e.currentTarget.dataset.type })
      }else if(e.currentTarget.dataset.type==='4'){
        this.VenueClickCancelPlace({ date: this.state.dataString, time: time, sportid: this.state.liNum,type:2 })
      }
    }else{
      this.getReservationActivitieslist({publicuid:e.currentTarget.dataset.uuid,page:1,sport:'',status:''})
      this.setState({informVisible:true})
    }
  }


  render() {
    return (
      <div className="orderPh">
        <div className="headerNav">
          <div onClick={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.13rem solid #000' } : { border: 'none' }}>活动列表</div>
          <div onClick={this.bookingKanban} style={this.state.activityList === false ? { borderBottom: '0.13rem solid #000' } : { border: 'none' }}>预约面板</div>
        </div>
        <div className={this.state.activityList === true ? 'activityList' : 'hidden'}>
          <Row >
            <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>ID/项目</Col>
            <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>时间</Col>
            <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>状态</Col>
          </Row>
          <div style={this.state.flag===false?{display:'block'}:{display:'none'}}>
          {
            this.state.activeSon.map((item, i) => (
              <Row key={i} className="list" data-index={i} onClick={this.select}>
                <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>{'**' + item.orderId.slice(-4)}{item.SportName}</Col>
                <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}> <Tooltip title={item.StartTime + '—' + item.FinishedTime} trigger='click'>{item.StartTime}....</Tooltip></Col>
                <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>{item.PublicStatus}</Col>

                <div className={this.state.index === '' + i + '' ? 'select' : 'hidden'}>
                  <Row>
                    <Col xs={{ span: 6, offset: 1 }} style={{textAlign: 'left'}} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>金额</span>  {item.SiteMoney}元</Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>支付状态</span>  {item.SiteMoneyStatus}</Col>
                  </Row>
                  <Row >
                    <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>应到人数</span>  {item.Shouldarrive}人</Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>已到人数</span>  {item.TrueTo}人</Col>
                  </Row>
                  <Row >
                    <Col xs={{ span: 6, offset: 1 }} style={{textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>  时长</span>  {item.PlayTime}小时</Col>
                    <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 3 }}></Col>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}><img onClick={this.showModal} data-uid={item.uuid} src={require('../../assets/sendingBtn.png')} alt="发消息" className="sending" /></Col>
                  </Row>
                </div>
              </Row>
            ))
          }
          </div>
        
         <Result className={this.state.flag===false ? 'hidden' : ''} icon={<Icon type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="没有活动列表！" />
          <div className="screen" onClick={this.showDrawer}><span>筛选</span><img src={require('../../assets/shaixuan.png')} alt="筛选" /></div>
          <Pagination className={this.state.flag===false? 'fenye' : 'hidden'} size="small" defaultCurrent={1} onChange={this.current} total={this.state.total} />
          <Modal
            title="发消息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Radio.Group onChange={this.sendCheck} value={this.state.sendCheck}>
              <Radio value={1}>预留场地</Radio>
              <Radio value={2}>未预留场地</Radio>
            </Radio.Group>
            <TextArea style={{ marginTop: '30px' }} className="sending" maxLength={200} onChange={this.textArea} rows={4} />
            <span style={{ float: 'left' }}>还可以输入{200 - this.state.textArea.length}字</span>
            <div className="sending">
              <div onClick={this.handleCancel}>取消</div>
              <div onClick={this.sendingMessage}>发送</div>
            </div>
          </Modal>

          <Drawer
            title="筛选活动列表"
            placement="right"
            closable={false}
            width='100%'
            onClose={this.onClose}
            visible={this.state.Drawervisible}
          >
            <span>项目名称</span>
            <div className="drawerBoss">
              {
                this.state.sport.map((item, i) => (
                  <div key={i} onClick={this.sport} data-index={i} data-id={item.id} style={parseInt(this.state.sportIdVal)===i?{background:'#D85D27',color:'#fff'}:{}}>{item.name}</div>
                )) 
              }
            </div>
            <span style={{ clear: 'both', display: 'block', marginTop: '2rem' }}>活动状态</span>
            <div className="drawerBossTwo">
              {
                this.state.status.map((item, i) => (
                  <div key={i} data-id={item.id} onClick={this.status} style={parseInt(this.state.statusIdVal)===i?{background:'#D85D27',color:'#fff'}:{}}>{item.name}</div>
                ))
              }
            </div>       
            <div className="drawerBtn">
              <div onClick={this.onClose}>取消</div>
              <div onClick={this.submitVal}>确定</div>
            </div>
          </Drawer>
        </div>

        <div className={this.state.activityList === false ? 'bookingKanban' : 'hidden'}>
          <div className="modTitle">
            <span className="blue"></span><span>空闲</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>已占用</span><span className="red"></span><span>场地取消</span>
          </div>
          <div className="locaList">
            {
              this.state.remList.map((item,i)=>(
                <div key={i} data-id={item.id} onClick={this.sportName}>{item.name}</div>
              ))
            }
           
           
          </div>
          <div className="lookList" style={this.state.lookList.length<1?{display:'none'}:{display:'block'}}>
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
                        <span key={i} data-time={index.a} data-num={i+1} data-uuid={item.uuid} data-type={item.type} onClick={this.lookPlate}  style={item.type === 1 ? { background: '#6FB2FF' } : {} && item.type === 2 ? { background: '#E9E9E9' } : {} && item.type === 3 ? { background: '#F5A623' } : {} && item.type === 4 ? { background: 'red' } : {}}></span>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <DatePicker className="date" placeholder="选择日期" onChange={this.dateChange} />
          <Result className={this.state.lookList.length === 0 ? '' : 'hidden'} icon={<Icon type="reconciliation" theme="twoTone" twoToneColor="#F5A623" />} title="没有预约情况" />
     
          <Drawer
          title="该场地详细信息"
          placement="right"
          closable={false}
          width='80%'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
       
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>活动编号：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].orderId:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>项目名称：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].SportName:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>开始时间：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].StartTime:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>结束时间：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].FinishedTime:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}> 
          <span>时长：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].PlayTime:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>应到人数：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].Shouldarrive:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>已签到人数：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].TrueTo:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>活动状态：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].PublicStatus:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>场地费金额：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].SiteMoney:''}</span>
          </div>
          <div className="informDrawer" style={{fontSize:'0.75rem'}}>
          <span>场地费状态：</span>
          <span>{this.state.informList.length>0?this.state.informList[0].SiteMoneyStatus:''}</span>
          </div>
        </Drawer> 
        </div>
      </div>
    )
  }
}

export default orderPh;
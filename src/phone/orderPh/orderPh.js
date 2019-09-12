import React from 'react';
import './orderPh.css';
import { Row, Col, message, Tooltip, Pagination, Modal, Radio, Input, Drawer } from 'antd';
import { getReservationActivitieslist, VenueSendMessage,getVenueReservations } from '../../api';
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
    lookList:[],
    macNum:[],
  };

  async getVenueReservations(data) {
    const res = await getVenueReservations(data, sessionStorage.getItem('venue_token'))
    console.log(res.data.data[0].c)
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ lookList: res.data.data,macNum:res.data.data[0].c})
    }
    
  }

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ activeSon: res.data.data.data, total: res.data.data.count })
    }
  }
  componentDidMount() {
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', publicuid: '' })
    this.getVenueReservations({sportid:1,date:'2019-09-04'})
  }




  activityList = () => {
    this.setState({ activityList: true })
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
    this.getReservationActivitieslist({ page: page, sport: '', status: '', publicuid: '' })
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
          {
            this.state.activeSon.map((item, i) => (
              <Row key={i} className="list" data-index={i} onClick={this.select}>
                <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>{'**' + item.orderId.slice(-4)}{item.SportName}</Col>
                <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}> <Tooltip title={item.StartTime + '—' + item.FinishedTime} trigger='click'>{item.StartTime}....</Tooltip></Col>
                <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>{item.PublicStatus}</Col>

                <div className={this.state.index === '' + i + '' ? 'select' : 'hidden'}>
                  <Row>
                    <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>金额</span>  {item.SiteMoney}元</Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>支付状态</span>  {item.SiteMoneyStatus}</Col>
                  </Row>
                  <Row >
                    <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>应到人数</span>  {item.Shouldarrive}人</Col>
                    <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>已到人数</span>  {item.TrueTo}人</Col>
                  </Row>
                  <Row >
                    <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ color: '#9B9B9B' }}>  时长</span>  {item.PlayTime}小时</Col>
                    <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 3 }}></Col>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}><img onClick={this.showModal} data-uid={item.uuid} src={require('../../assets/sendingBtn.png')} alt="发消息" className="sending" /></Col>
                  </Row>
                </div>
              </Row>
              
            ))
          }

          <div className="screen" onClick={this.showDrawer}><span>筛选</span><img src={require('../../assets/shaixuan.png')} alt="筛选" /></div>
          <Pagination className="fenye" defaultCurrent={1} onChange={this.current} total={this.state.total} />


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
              <div>羽毛球</div>
              <div>足球</div>
              <div>篮球</div>
              <div>乒乓球</div>
              <div>台球</div>
              <div>网球</div>
              <div>排球</div>
              <div>高尔夫球</div>
            </div>
            <span style={{ clear: 'both', display: 'block', marginTop: '2rem' }}>活动状态</span>
            <div className="drawerBossTwo">
              <div>匹配中</div>
              <div>待出发</div>
              <div>活动中</div>
              <div>待评价</div>
              <div>已完成</div>
              <div>待确认结束/待填写结果</div>

            </div>

            <span style={{ clear: 'both', display: 'block', marginTop: '2rem' }}>支付状态</span>
            <div className="drawerBossTwo">
              <div>已支付</div>
              <div>未支付</div>
            </div>

            <div className="drawerBtn">
              <div onClick={this.onClose}>取消</div>
              <div>确定</div>
            </div>
          </Drawer>
        </div>

        <div className={this.state.activityList === false ? 'bookingKanban' : 'hidden'}>
          <div className="modTitle">
            <span className="blue"></span><span>空闲</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>已占用</span><span className="red"></span><span>场地取消</span>
          </div>
          <div className="locaList">
            <div>篮球</div>
            <div>羽毛球</div>
            <div>台球</div>
            <div>乒乓球</div>
            <div>网球</div>
            <div>足球</div>
            <div>排球</div>
            <div>高尔夫球</div>
          </div>
       <div className="lookList">
          <div className="headerSon" style={{width:''+(this.state.macNum.length+1)*3.25+'rem'}}>
            <span></span>
          {
            this.state.macNum.map((item,i)=>(
              <span key={i}>{i+1}</span> 
            ))
          }

          {
            this.state.lookList.map((item,i)=>(
              <div key={i} className="sonList">
                <span>{item.a}</span>
                {
                  this.state.lookList[i].c.map((item,i)=>(
                    <span key={i} style={item.type===1?{background:'#6FB2FF'}:{}&&item.type===2?{background:'#E9E9E9'}:{}&&item.type===3?{background:'#F5A623'}:{}&&item.type===4?{background:'red'}:{}}></span>
                  ))
                }
              </div>
            ))
          }
          </div>
          
         


         




       </div>





        </div>



      </div>
    )
  }
}

export default orderPh;
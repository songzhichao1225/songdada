import React from 'react';
import './information.css';
import 'antd/dist/antd.css';
import { Button, Row, Col, Select, Pagination, Spin, message, Result, Icon, DatePicker, Table } from 'antd';
import { getReservationActivitieslist, getVenueReservations, getVenueSport } from '../../api';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Option } = Select;




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
    Oneloading:false,
  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if(res.data.code === 2000) {
      this.setState({ activityNav: res.data.data, liNum: res.data.data[0].id })
      this.getVenueReservations({ sportid: this.state.activityNav[0].id, date: new Date().toLocaleDateString().replace(/\//g, "-") })
    }
  }

  componentDidMount() {
    this.getVenueSport()
    this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
    setInterval(() => {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
    }, 1000*60*5)
  }



  handelClick = (e) => {
    this.setState({ number: e.target.dataset.num })
  }

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data.data, loading: false, hidden: true,Oneloading:false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ loading: false, hidden: false,Oneloading:false })
    }
  }

  async getVenueReservations(data) {
    const res = await getVenueReservations(data, sessionStorage.getItem('venue_token'))
    let koArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    if (res.data.code === 2000) {
      let letter = [
        { title: '时间', width: 100, fixed: 'left', align: 'center', dataIndex: 'a', }]
      for (let i in koArr) {
        letter.push({
          title: koArr[i], width: 100, align: 'center', dataIndex: 'c[' + i + '].type', render: (value, row, index) => {
            if (value === 1) {
              return <span className="blue"></span>
            } else if (value === 2) {
              return <span className="white"></span>
            } else if (value === 3) {
              return <span className="yellow"></span>
            }
          },
        })
      }
      for (let i in res.data.data) {
        res.data.data[i].key = i
      }
      this.setState({ Reservations: res.data.data, letterNum: letter })
      console.log(this.state.Reservations, this.state.letterNum)
    } else if (res.data.code === 4005) {
      this.setState({ Reservations: [], letterNum: [], tabelFlag: true })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
  }



  nameChang = (e) => {
    this.setState({ sport: e })
    this.getReservationActivitieslist({ page: 1, sport: e, status: this.state.status })
  }
  activityChang = (e) => {
    this.setState({ status: e })
    this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: e })
  }
  clickLi = (e) => {
    this.getVenueReservations({ sportid: e.target.dataset.num, date: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num })
  }
  dateChange = (data, datatring) => {
    console.log(datatring)
    this.getVenueReservations({ sportid: this.state.liNum, date: datatring })
  }
  Oneloading=()=>{
    this.setState({Oneloading:true})
    this.getReservationActivitieslist({  page: 1, sport: this.state.sport, status: this.state.status })
  }

  render() {

    let userMessage;
    if (this.state.list.length !== 0) {
      userMessage = (
        <div>
          {
            this.state.list.map((item, i) => (
              <Row key={i}>
                <Col xs={{ span: 2 }}>{item.orderId}</Col>
                <Col xs={{ span: 2 }}>{item.SportName}</Col>
                <Col xs={{ span: 2 }}>{item.StartTime}</Col>
                <Col xs={{ span: 2 }}>{item.FinishedTime}</Col>
                <Col xs={{ span: 2 }}>{item.PlayTime}</Col>
                <Col xs={{ span: 2 }}>{item.Shouldarrive}</Col>
                <Col xs={{ span: 2 }}>{item.TrueTo}</Col>
                <Col xs={{ span: 2 }}>{item.PublicStatus}</Col>
                <Col xs={{ span: 2 }}>{item.SiteMoney}</Col>
                <Col xs={{ span: 2 }}>已支付</Col>
                <Col xs={{ span: 2 }}><img src={require("../../assets/icon_pc_faNews.png")} alt="发送消息" /></Col>
              </Row>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} total={10} />
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
          <div className="sping"> <Icon type="sync" className={this.state.Oneloading===true||this.state.number === '2'?'hidden':'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>
        <div className={this.state.number === '1' ? 'listName' : 'listNameT'}>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
            <div className={this.state.hidden === true ? '' : 'hidden'} >
              <Row className="rowConten">
                <Col xs={{ span: 2 }}>活动编号</Col>
                <Col xs={{ span: 2 }}>
                  <Select className="selectName" defaultValue="项目名称" style={{ width: 135.23 }} onChange={this.nameChang}>
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
                <Col xs={{ span: 2 }}>开始时间</Col>
                <Col xs={{ span: 2 }}>结束时间</Col>
                <Col xs={{ span: 2 }}>时长</Col>
                <Col xs={{ span: 2 }}>应到人数</Col>
                <Col xs={{ span: 2 }}>已签到人数</Col>
                <Col xs={{ span: 2 }}>
                  <Select className="selectName" defaultValue="活动状态" style={{ width: 135.23 }} onChange={this.activityChang} >
                    <Option value="1">匹配中</Option>
                    <Option value="2">待出发</Option>
                    <Option value="3">活动中</Option>
                    <Option value="4">填写比赛结果</Option>
                    <Option value="5">已完成</Option>
                    <Option value="6">待评价</Option>
                    <Option value="7">已取消</Option>
                    <Option value="8">确认已结束</Option>
                  </Select>
                </Col>
                <Col xs={{ span: 2 }}>场地费金额</Col>
                <Col xs={{ span: 2 }}>场地状态</Col>
                <Col xs={{ span: 2 }}>发消息</Col>
              </Row>
              {userMessage}
            </div>
            <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<Icon type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="您还没有预约活动！" />,

          </Spin>


        </div>
        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'}>
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span></span><span>不可选</span></div>
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
            <div className={this.state.tabelFlag === false ? '' : 'hidden'}>
            <Table pagination={{ simple: false }} columns={this.state.letterNum} dataSource={this.state.Reservations} position='top' scroll={{ x: 2000 }} />
          </div>
          <Result className={this.state.tabelFlag===true?'':'hidden'} icon={<Icon type="fund" theme="twoTone"  twoToneColor="#F5A623"/>}title="您没有预约情况！"/>

        </div>
      </div>
    );
  }
}

export default information;
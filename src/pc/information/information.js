import React from 'react';
import './information.css';
import 'antd/dist/antd.css';
import { Button, Row, Col, Select, Pagination } from 'antd';
import { getReservationActivitieslist } from '../../api';

const { Option } = Select;

class information extends React.Component {

  state = {
    number: '1',
    sport: '',
    status: '',
    listNot: '',
    list: [],
    dianIndex:'0',
    liNum:'4',
    activityNav:[
      {name:'篮球',num:4},
      {name:'羽毛球',num:1 },
      {name:'网球',num:7},
      {name:'高尔夫球',num:8},
      {name:'台球',num:3},
      {name:'乒乓球',num:2},
      {name:'足球',num:5},
      {name:'排球',num:6},]
  };

  componentDidMount() {
    this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
  }


  handelClick = (e) => {
    this.setState({ number: e.target.dataset.num })
  }

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data.data })
    } else {
      this.setState({ listNot: res.data.msg })
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
  clickLi=(e)=>{
    this.setState({dianIndex:e.target.dataset.index,liNum:e.target.dataset.num})
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
        </div>
        <div className={this.state.number === '1' ? 'listName' : 'listNameT'}>
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
        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'}>
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span></span><span>不可选</span></div>
            <div><span></span><span>已占用</span></div>
          </div>
          <ul className="activityNav">
            {
              this.state.activityNav.map((item, i) => (
                <li key={i} onClick={this.clickLi} data-index={i} data-num={item.num} className={parseInt(this.state.dianIndex)===i?'borderLi':''}>{item.name}</li>
              ))
            }

          </ul>
        </div>
      </div>
    );
  }
}

export default information;
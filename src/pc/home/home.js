import React from 'react';
import { Route, Link } from 'react-router-dom';
import './home.css';
import 'antd/dist/antd.css';
import { getVenueIndex,gerVenueName } from '../../api';
import { Layout, Menu, Icon } from 'antd';
import homePage from '../homePage/homePage';
import information from '../information/information';
import siteSettings from '../siteSettings/siteSettings';
import preferential from '../preferential/preferential';


const { Header, Sider, Content } = Layout;

class home extends React.Component {


  state = {
    collapsed: false,
    year: '',
    mount: '',
    date: '',
    getDay: '',
    hours: '',
    minutes: '',
    minheight: '',
    keyIng: '1',
    getVenue: '',
    gerVenueName:'',
    nookod:'',
  };

  componentDidMount() {
    sessionStorage.setItem('path', '1');
    this.setState({ minheight: document.body.scrollHeight })
    this.getVenueIndex()
    this.gerVenueName() 
    setInterval(()=>{
      this.timer()
    },1000)

    
   this.setState({path:this.props.history.location.pathname})
    if(this.props.history.location.pathname==='/home'){
      sessionStorage.setItem('path', '1'); 
    }else if(this.props.history.location.pathname==='/home/information'){
      sessionStorage.setItem('path', '2');
    }else if(this.props.history.location.pathname==='/home/siteSettings'){
      sessionStorage.setItem('path', '3');
    }else if(this.props.history.location.pathname==='/home/preferential'){
      sessionStorage.setItem('path', '4');
    }
  }

  timer = () => {
    let myDate = new Date();
    let day = ''
    switch (myDate.getDay()) {
      case 0:
        day = "星期天";
        break;
      case 1:
        day = "星期一";
        break;
      case 2:
        day = "星期二";
        break;
      case 3:
        day = "星期三";
        break;
      case 4:
        day = "星期四";
        break;
      case 5:
        day = "星期五";
        break;
      case 6:
        day = "星期六";
        break;
      default:
        day = "";
    }
    let month=""
    if( myDate.getMonth() +1<10){
      month='0'+(myDate.getMonth() +1)
    }else{
      month=myDate.getMonth() +1
    }
    let Tdate=""
    if( myDate.getDate()<10){
      Tdate='0'+myDate.getDate()
    }else{
      Tdate=myDate.getDate()
    }
    let Thours=""
    if(myDate.getHours()<10){
      Thours="0"+myDate.getHours()
    }else{
      Thours=myDate.getHours()
    }
    let Tminutes=""
    if(myDate.getMinutes()<10){
      Tminutes='0'+myDate.getMinutes()
    }else{
      Tminutes=myDate.getMinutes()
    }
    this.setState({
      year: myDate.getFullYear(), mount: month, date:Tdate, getDay: day, hours: Thours, minutes: Tminutes
    })
    if(Thours<12){
     this.setState({nookod:'上午好'})
    }else if(Thours>12){
      this.setState({nookod:'下午好'})
    }
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  kood = (e) => {
    this.setState({ keyIng: e.key })
    sessionStorage.setItem('path',e.key);
    this.setState({path:this.props.history.location.pathname})
  }

  async getVenueIndex(data) {
    const res = await getVenueIndex(data, sessionStorage.getItem('venue_token'))
    this.setState({ getVenue: res.data.data })
  }
  

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    this.setState({ gerVenueName: res.data.data })
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={240} className="sider">
          <div className="logo">
            <img style={{ width: 115, height: 92, marginLeft: 45, marginTop: 16 }}
              src={require("../../assets/tiaozhanicon.png")} alt="logo" />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[ sessionStorage.getItem('path')]} onSelect={this.kood}>
            <Menu.Item key="1">
              <Link to="/home">
                <Icon style={{ paddingLeft: 25 }} type="home" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/home/information">
                <Icon style={{ paddingLeft: 25 }} type="schedule" />
                <span>预约信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/home/siteSettings">
              <Icon style={{ paddingLeft: 25 }} type="global" />
              <span>场地设置</span>
              </Link>
            </Menu.Item>                   
            <Menu.Item key="4">
            <Link to="/home/preferential">
              <Icon style={{ paddingLeft: 25 }} type="gift" />
              <span>优惠活动</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon style={{ paddingLeft: 25 }} type="usergroup-delete" />
              <span>场馆信息</span> 
            </Menu.Item>

            <Menu.Item key="6">
              <Icon style={{ paddingLeft: 25 }} type="setting" />
              <span>系统设置</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon style={{ paddingLeft: 25 }} type="account-book" />
              <span>我的钱包</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout> 
          <Header className="header">
            <div className="Gname">
              <img src={require("../../assets/icon_logo_Gname.png")} alt="logo" />
              <span>{this.state.gerVenueName.name}</span>
            </div>
            <div className="time">
              <span> {this.state.year} / {this.state.mount} / {this.state.date} {this.state.getDay}  {this.state.hours}:{this.state.minutes}</span>
                <div className="new">
                  <img src={require("../../assets/icon_pc_new.png")} alt="message" />
                   <div className="number">{this.state.gerVenueName.mess}</div>
                </div>
                <div className="lvyue">场地履约率：{this.state.gerVenueName.rate}%</div>
            </div>
          </Header>
          <Content style={{
            background: '#fff',
          }}>
            <div className={this.state.path !== '/home' ? 'homePageT' : 'homePage'} >
              <span className="title">{this.state.nookod} 欢迎使用挑战场馆端</span>
              <div className="divContent">
                <div>
                  <div className="left"><span>本月收入</span><span>￥{this.state.getVenue.month_money}</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div>
                  <div className="left"><span>今日收入</span><span>￥{this.state.getVenue.today_money}</span></div>
                  <div className="right" ><img src={require("../../assets/icon_pc_money.png")} alt="icon" /></div>
                </div>
                <div>
                  <div className="left"><span>本月成功预约</span><span>{this.state.getVenue.month_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div>
                  <div className="left"><span>今日成功预约</span><span>{this.state.getVenue.today_count}单</span></div>
                  <div className="right"><img src={require("../../assets/icon_pc_biji.png")} alt="icon" /></div>
                </div>
                <div>
                  <div className="left"><span>场馆评分  {this.state.getVenue.score}分</span>
                    <div className="xing">
                        <img src={this.state.getVenue.score >= 1 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" />
                        <img src={this.state.getVenue.score >= 2 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" />
                        <img src={this.state.getVenue.score >= 3 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" />
                        <img src={this.state.getVenue.score >= 4 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" />
                        <img src={this.state.getVenue.score >= 5 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" />
                    </div></div>
                  <div className="right"><img src={require("../../assets/icon_pc_xingxin.png")} alt="icon" /></div>
                </div>
              </div>
            </div>
             


            <Route path="/home/homePage" component={homePage}/>
            <Route path="/home/information" component={information}/>
            <Route path="/home/siteSettings" component={siteSettings}/>
            <Route path="/home/preferential" component={preferential}/>
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default home;
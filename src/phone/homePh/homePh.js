import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import { Route, Link } from 'react-router-dom';
import { gerVenueName, getVenueIndex } from '../../api';
import { message } from 'antd';
import orderPh from '../orderPh/orderPh';
import sitePh from '../sitePh/sitePh';
import newsPh from '../newsPh/newsPh';
import minePh from '../minePh/minePh';



class homePh extends React.Component {

  state = {
    getVenue: '',
    gerVenueName: '',
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ getVenue: res.data.data })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }
  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
   
      sessionStorage.setItem('name',res.data.data.name)
      sessionStorage.setItem('avatar',"https://app.tiaozhanmeiyitian.com/"+res.data.data.siteimg)
      sessionStorage.setItem('lyv',res.data.data.rate)
      this.setState({ gerVenueName: res.data.data })
    
  }

  monthlyIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh', query: { income: 'month' } })
  }
  dayIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh', query: { income: 'day' } })
  }
  commentPh = () => {
    this.props.history.push('/homePh/commentPh')
  }
  yuYue=()=>{
    this.props.history.push('/homePh/orderPh')
  }



  componentDidMount() {
    this.getVenueIndex()
    this.gerVenueName()
  }





  render() {
    return (
      <div className="homePh">
        <div className="headerTitle" style={this.props.location.pathname === '/homePh/minePh'?{display:'none'}:{display:'block'}}>{this.state.gerVenueName.name}</div>
        <div className={this.props.location.pathname === '/homePh' ? 'homePagePh' : 'none'}>
          <div><span className="title" onClick={this.yuYue}>今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
          <div><span className="title" onClick={this.yuYue}>本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
          <div><span className="title" onClick={this.dayIncomePh}>今日收入</span><div className="content"><span>￥{this.state.getVenue.today_money}</span></div></div>
          <div><span className="title" onClick={this.monthlyIncomePh}>本月收入</span><div className="content"><span>￥{this.state.getVenue.month_money}</span></div></div>
          <div><span className="title" onClick={this.commentPh}>场馆评分  {this.state.getVenue.score}分</span><div className="content">
            <div className="img">
            <img src={this.state.getVenue.score >= 1 ? require("../../assets/oneXing.png") : require("../../assets/phonexingzi.png") && this.state.getVenue.score < 1 && this.state.getVenue.score > 0 ? require("../../assets/phonexing.png") : require("../../assets/phonexingzi.png")} alt="星" />
            </div>
            <div  className="img">
           <img src={this.state.getVenue.score >= 2 ? require("../../assets/oneXing.png") : require("../../assets/phonexingzi.png") && this.state.getVenue.score < 2 && this.state.getVenue.score > 1 ? require("../../assets/phonexing.png") : require("../../assets/phonexingzi.png")} alt="星" />
            </div>
            <div  className="img">
            <img src={this.state.getVenue.score >= 3 ? require("../../assets/oneXing.png") : require("../../assets/phonexingzi.png") && this.state.getVenue.score < 3 && this.state.getVenue.score > 2 ? require("../../assets/phonexing.png") : require("../../assets/phonexingzi.png")} alt="星" />
            </div>
            <div  className="img">
            <img src={this.state.getVenue.score >= 4 ? require("../../assets/oneXing.png") : require("../../assets/phonexingzi.png") && this.state.getVenue.score < 4 && this.state.getVenue.score > 3 ? require("../../assets/phonexing.png") : require("../../assets/phonexingzi.png")} alt="星" />
            </div>
            <div  className="img">
            <img src={this.state.getVenue.score >= 5 ? require("../../assets/oneXing.png") : require("../../assets/phonexingzi.png") && this.state.getVenue.score < 5 && this.state.getVenue.score > 4 ? require("../../assets/phonexing.png") : require("../../assets/phonexingzi.png")} alt="星" />
            </div>  
          </div>
          </div>
        </div>
        <Route path="/homePh/orderPh" component={orderPh}/>
        <Route path="/homePh/sitePh" component={sitePh} />
        <Route path="/homePh/newsPh" component={newsPh} />
        <Route path="/homePh/minePh" component={minePh} />
        <div className="footer">
          <div className="footerSon">
            <div>
              <Link to="/homePh">
                <img src={this.props.location.pathname === '/homePh' ? require("../../assets/shouyeTwo.png") : require("../../assets/shouye.png")} alt="首页" />
                <span style={this.props.location.pathname === '/homePh' ? { color: '#D85D27' } : { color: '#000' }}>首页</span>
              </Link>
            </div>
            <div>
              <Link to="/homePh/orderPh">
                <img src={this.props.location.pathname === '/homePh/orderPh' ? require("../../assets/yuyuexinxiTwo.png") : require("../../assets/yuyuexinxi.png")} alt="预约信息" />
                <span style={this.props.location.pathname === '/homePh/orderPh' ? { color: '#D85D27' } : { color: '#000' }}>预约信息</span>
              </Link>
            </div>
            <div>
              <Link to="/homePh/sitePh">
                <img src={this.props.location.pathname === '/homePh/sitePh' ? require("../../assets/changdishezhiTwo.png") : require("../../assets/changdishezhi.png")} alt="场地设置" />
                <span style={this.props.location.pathname === '/homePh/sitePh' ? { color: '#D85D27' } : { color: '#000' }}>场地设置</span>
              </Link>
            </div>
            <div>
              <Link to="/homePh/newsPh">
                <img src={this.props.location.pathname === '/homePh/newsPh' ? require("../../assets/xiaoxiTwo.png") : require("../../assets/xiaoxi.png")} alt="消息" />
                <span style={this.props.location.pathname === '/homePh/newsPh' ? { color: '#D85D27' } : { color: '#000' }}>消息</span>
              </Link>
            </div>
            <div>
            <Link to="/homePh/minePh">
              <img src={this.props.location.pathname === '/homePh/minePh' ? require("../../assets/wodTwo.png") : require("../../assets/wod.png")} alt="我的" />
              <span style={this.props.location.pathname === '/homePh/minePh' ? { color: '#D85D27' } : { color: '#000' }}>我的</span>
              </Link>
              </div>
          </div>

        </div>








      </div>
    );
  }
}

export default homePh;
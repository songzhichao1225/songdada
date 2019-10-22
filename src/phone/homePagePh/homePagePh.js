import React from 'react';
import './homePagePh.css';
import 'antd/dist/antd.css';
import { getVenueIndex } from '../../api';
import { message } from 'antd';

class homePagePh extends React.Component {

  state = {
    getVenue: '',
   
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ getVenue: res.data.data })
    sessionStorage.setItem('score',res.data.data.score)
    }

  }



  monthlyIncomePh=()=>{
    this.props.history.push({pathname:'/homePh/monthlyIncomePh',query:{income:'month'}})
  }
  dayIncomePh=()=>{
    this.props.history.push({pathname:'/homePh/monthlyIncomePh',query:{income:'day'}})
  }
  commentPh=()=>{
    this.props.history.push('/homePh/commentPh')
  }
 


  componentDidMount() {
    this.getVenueIndex()
   
  }





  render() {
    return (
      <div className="homePagePh">
          <div><span className="title">今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
          <div><span className="title">本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
          <div><span className="title" onClick={this.dayIncomePh}>今日收入</span><div className="content"><span>￥{this.state.getVenue.today_money}</span></div></div>
          <div><span className="title" onClick={this.monthlyIncomePh}>本月收入</span><div className="content"><span>￥{this.state.getVenue.month_money}</span></div></div>
          <div><span className="title" onClick={this.commentPh}>场馆评分  {this.state.getVenue.score}分</span><div className="content">
            <img src={this.state.getVenue.score>=1?require("../../assets/phonexing (2).png"):require("../../assets/50xing (2).png")&&this.state.getVenue.score<1&&this.state.getVenue.score>0?require("../../assets/phonexing.png"):require("../../assets/50xing (2).png")} alt="星"/>
            <img src={this.state.getVenue.score>=2?require("../../assets/phonexing (2).png"):require("../../assets/50xing (2).png")&&this.state.getVenue.score<2&&this.state.getVenue.score>1?require("../../assets/phonexing.png"):require("../../assets/50xing (2).png")} alt="星"/>
            <img src={this.state.getVenue.score>=3?require("../../assets/phonexing (2).png"):require("../../assets/50xing (2).png")&&this.state.getVenue.score<3&&this.state.getVenue.score>2?require("../../assets/phonexing.png"):require("../../assets/50xing (2).png")} alt="星"/>
            <img src={this.state.getVenue.score>=4?require("../../assets/phonexing (2).png"):require("../../assets/50xing (2).png")&&this.state.getVenue.score<4&&this.state.getVenue.score>3?require("../../assets/phonexing.png"):require("../../assets/50xing (2).png")} alt="星"/>
            <img src={this.state.getVenue.score>=5?require("../../assets/phonexing (2).png"):require("../../assets/50xing (2).png")&&this.state.getVenue.score<5&&this.state.getVenue.score>4?require("../../assets/phonexing.png"):require("../../assets/50xing (2).png")} alt="星"/>
            </div></div>
      </div>
    );
  }
}

export default homePagePh;
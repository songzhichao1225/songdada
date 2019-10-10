import React from 'react';
import './newsPh.css';
import { message, Result, Icon, Pagination } from 'antd';
import { getVenueNewsList, getVenueNewsReceivedList,getVenueNewsFirst } from '../../api';


class newsPh extends React.Component {

  state = {
    getVenueNewsList: [],
    other: null,
    flag: 1,
    getVenueNewsReceivedList: [],
    otherPush: 1,
  };
  async getVenueNewsList(data) {
    const res = await getVenueNewsList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ getVenueNewsList: res.data.data, other: res.data.other.sum })
    }
  }

  async getVenueNewsReceivedList(data) {
    const res = await getVenueNewsReceivedList(data, sessionStorage.getItem('venue_token'))
   if (res.data.code === 2000) {
      this.setState({ getVenueNewsReceivedList: res.data.data, otherPush: res.data.other })
    }
  }
  async getVenueNewsFirst(data) {
    const res = await getVenueNewsFirst(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
     console.log(res)
    }
  }



  componentDidMount() {
    this.getVenueNewsList({ page: 1 })
    this.getVenueNewsReceivedList({ page: 1 })
  }

  current = (page, pageSize) => {
    this.getVenueNewsList({ page: page })
  }
  currentPush = (page, pageSize) => {
    this.getVenueNewsReceivedList({ page: page })
  }
  receive = () => {
    this.setState({ flag: 1 })
  }
  publish = () => {
    this.setState({ flag: 2 })
  }
  details=e=>{
    this.getVenueNewsFirst({newsuuid:e.currentTarget.dataset.uid})
  }




  render() {
    return (
      <div className="newsPh">
        <div className="headerTitle">
          <div onClick={this.receive} style={this.state.flag === 1 ? { color: '#333', borderBottom: '0.12rem solid #333' } : {}}>我收到的</div>
          <div onClick={this.publish} style={this.state.flag === 2 ? { color: '#333', borderBottom: '0.12rem solid #333' } : {}}>我发送的</div>
        </div>
        <div className="receive" style={this.state.flag === 1 ? { display: 'block' } : { display: 'none' }}>
          {
            this.state.getVenueNewsList.map((item, i) => (
              <div className="recriveSon" key={i} onClick={this.details} data-uid={item.uuid}>
                <div className={item.isred === 0 ? 'notRead' : 'none'}></div>
                <img className="img" src={require("../../assets/newsRead.png")} alt="img" />
                <div className="content">
                  <div className="contentHead"><span>系统消息</span><span>{item.intime}</span></div>
                  <div className="contentText">{item.comment}</div>
                </div>
              </div> 
            ))
          }
          <Pagination className={this.state.getVenueNewsList.length === 0 ? 'hidden' : 'fenye'} size="small" onChange={this.current} defaultCurrent={1} total={this.state.other} />
          <Result className={this.state.getVenueNewsList.length === 0 ? '' : 'hidden'} icon={<Icon type="message" theme="twoTone" twoToneColor="#F5A623" />} title="没有系统消息" />
        </div>

        <div className="publish" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          {
            this.state.getVenueNewsReceivedList.map((item, i) => (
              <div className="recriveSon" key={i}>
                <div className='none'></div>
                <img className="img" src={require("../../assets/newsPush.png")} alt="img" />
                <div className="content">
                  <div className="contentHead"><span>活动消息</span><span>{item.intime}</span></div>
                  <div className="contentText">{item.comment}</div>
                </div>
              </div>
            ))
          }
          <Pagination className={this.state.getVenueNewsReceivedList.length === 0 ? 'hidden' : 'fenye'} size="small" onChange={this.currentPush} defaultCurrent={1} total={this.state.otherPush} />
          <Result className={this.state.getVenueNewsReceivedList.length === 0 ? '' : 'hidden'} icon={<Icon type="message" theme="twoTone" twoToneColor="#F5A623" />} title="没有发布消息" />
        </div>
      </div>
    )
  }
}

export default newsPh;
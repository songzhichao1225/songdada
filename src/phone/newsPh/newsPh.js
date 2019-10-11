import React from 'react';
import './newsPh.css';
import { message, Result, Icon, Pagination,Drawer } from 'antd';
import { getVenueNewsList, getVenueNewsReceivedList,getVenueNewsFirst,VenueNewsSaveIsRead } from '../../api';


class newsPh extends React.Component {

  state = {
    getVenueNewsList: [],
    other: null,
    flag: 1,
    getVenueNewsReceivedList: [],
    otherPush: 1,
    visibleDrawer:false,
    newsDetails:[],
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
      this.setState({newsDetails:res.data.data})
    }
  }


  

  async VenueNewsSaveIsRead(data) {
    const res = await VenueNewsSaveIsRead(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueNewsList()
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
    this.VenueNewsSaveIsRead({newsuuid:e.currentTarget.dataset.uid})
    this.getVenueNewsFirst({newsuuid:e.currentTarget.dataset.uid})
    this.setState({visibleDrawer:true})
  }


  onClose = () => {
    this.setState({
      visibleDrawer: false,
    });
  };




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
                <div className="notRead" style={item.isred === 0 ?  {opacity:1}:{opacity:0}}></div>
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
        
        <Drawer
          title="信息详情"
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visibleDrawer}
        >
          <span style={{display:'block'}}>平台:{this.state.newsDetails.comment_chk}</span>
          <span style={{display:'block',fontSize:'0.6rem',color:'#ccc'}}>时间:{this.state.newsDetails.intime_chk}</span>
         <span style={{display:'block'}}>我:{this.state.newsDetails.comment}</span> 
         <span style={{display:'block',fontSize:'0.6rem',color:'#ccc'}}>时间:{this.state.newsDetails.intime}</span>
        </Drawer>
       


 
        <div className="publish" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          {
            this.state.getVenueNewsReceivedList.map((item, i) => (
              <div className="recriveSon"  data-uid={item.uuid} key={i}>
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
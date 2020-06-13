import React from 'react';
import './newsPh.css';
import ReactDOM from 'react-dom';
import { Toast, Card, PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Result, Pagination, Drawer, Spin } from 'antd';
import { getVenueNewsList, getVenueNewsReceivedList, getVenueNewsFirst, VenueNewsSaveIsRead } from '../../api';
import {MessageOutlined,LoadingOutlined} from '@ant-design/icons';
import moment from 'moment';

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class newsPh extends React.Component {

  state = {
    getVenueNewsList: [],
    other: null,
    flag: 1,
    getVenueNewsReceivedList: [],
    otherPush: 1,
    visibleDrawer: false,
    newsDetails: [],
    spin: true,
    clenTop: 0,  //下拉加载参数
    clickY: 0,
    moveY: 0,
    spinFlag: false,
    newsPage: 1,
    newsPageTwo: 1,


    refreshing: false,
    refreshingTwo: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],




  };
  async getVenueNewsList(data) {
    const res = await getVenueNewsList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.code === 2000) {
      this.setState({ getVenueNewsList: res.data.data, other: res.data.other.sum, refreshing: false })
    }
    this.setState({ spin: false, spinFlag: false })
  }

  async getVenueNewsReceivedList(data) {
    const res = await getVenueNewsReceivedList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ getVenueNewsReceivedList: res.data.data, otherPush: res.data.other, refreshingTwo: false })
    }
    this.setState({ spinFlag: false })
  }
  async getVenueNewsFirst(data) {
    const res = await getVenueNewsFirst(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ newsDetails: res.data.data })
    }
  }




  async VenueNewsSaveIsRead(data) {
    const res = await VenueNewsSaveIsRead(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueNewsList()
    }
  }

  componentDidMount() {
    this.getVenueNewsList({ page: 1 })
    this.getVenueNewsReceivedList({ page: 1 })

    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);

  }

  current = (page, pageSize) => {
    this.setState({ newsPage: page })
    this.getVenueNewsList({ page: page })
  }
  currentPush = (page, pageSize) => {
    this.setState({ newsPageTwo: page })
    this.getVenueNewsReceivedList({ page: page })
  }
  receive = () => {
    this.setState({ flag: 1 })
  }
  publish = () => {
    this.setState({ flag: 2 })
  }
  details = e => {
    this.VenueNewsSaveIsRead({ newsuuid: e.currentTarget.dataset.uid })
    this.getVenueNewsFirst({ newsuuid: e.currentTarget.dataset.uid })
    this.setState({ visibleDrawer: true })
  }


  onClose = () => {
    this.setState({
      visibleDrawer: false,
    });
  };




  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getVenueNewsList({ page: this.state.newsPage })
    }, 1000);
  }

  refReshTwo = () => {
    this.setState({ refreshingTwo: true })
    setTimeout(() => {
      this.getVenueNewsReceivedList({ page: this.state.newsPageTwo })
    }, 1000);
  }



  render() {
    return (
      <div className="newsPh">
        <div className="newsheaderTitle">
          <div onClick={this.receive} style={this.state.flag === 1 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>我收到的</div>
          <div onClick={this.publish} style={this.state.flag === 2 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>我发送的</div>
        </div>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} > <LoadingOutlined  className='loadingY' style={{ top: this.state.clenTop / 7 }} /></div>
        <div className="receive" style={this.state.flag === 1 ? { display: 'block' } : { display: 'none' }} >
          {/* onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd} */}

          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshing}
            onRefresh={this.refResh}
          >
            <div className="contentScroll">
              {
                this.state.getVenueNewsList.map((item, i) => (
                  <div className="recriveSon" key={i}  onClick={this.details} data-uid={item.uuid}>
                    <Card>
                      <Card.Header
                        title={<span style={{ fontSize: '12px' }}>{item.comment.slice(0, 15) + '...'}</span>}
                        thumb={item.isred === 0 ? require("../../assets/logoTwo.png") : require("../../assets/logo.png")}
                        thumbStyle={{ width: '2rem', height: '2rem', marginTop: '-0.3rem' }}
                        extra={<span style={{ fontSize: '12px' }}>{item.intime.slice(0, 10) === moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-") ? item.intime.slice(10, item.intime.length) : item.intime.slice(0, 10)}</span>}
                      />
                      <Card.Body style={{ display: 'none' }}>
                        <div style={{ fontSize: '14px' }}>{item.comment}</div>
                      </Card.Body>
                      <Card.Footer style={{ display: 'none' }} extra={<div style={{ fontSize: '12px' }}>{item.intime}</div>} />
                    </Card>
                  </div>
                ))
              }
              <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
              <Pagination className={this.state.getVenueNewsList.length === 0 ? 'hidden' : 'fenye'} size="small" onChange={this.current} defaultCurrent={1} current={this.state.newsPage} total={this.state.other} />
              <Result className={this.state.spin === false && this.state.getVenueNewsList.length === 0 ? '' : 'hidden'} icon={<MessageOutlined style={{ fontSize: '2rem',color:'#F5A623' }} />} title="没有系统消息" />
            </div>
          </PullToRefresh>


        </div>

        <Drawer
          title={<span style={{ fontSize: '14px' }}>消息详情</span>}
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visibleDrawer}
        >
          <span style={this.state.newsDetails.comment_chk !== undefined ? { display: 'block' } : { display: 'none' }}>{this.state.newsDetails.comment_chk}</span>
          <span style={this.state.newsDetails.intime_chk !== undefined ? { display: 'block', fontSize: '0.6rem', color: '#888' } : { display: 'none' }}>{this.state.newsDetails.intime_chk}</span>
          <span style={{ display: 'block' }}>{this.state.newsDetails.comment}</span>
          <span style={{ display: 'block', fontSize: '0.6rem', color: '#888' }}>{this.state.newsDetails.intime}</span>

        </Drawer>




        <div className="publish" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }} onTouchMove={this.touMoveTwo} onTouchStart={this.touClickTwo} onTouchEnd={this.touEndTwo}>



          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshingTwo}
            onRefresh={this.refReshTwo}
          >
            <div className="pubScroll">
              {
                this.state.getVenueNewsReceivedList.map((item, i) => (
                  <div className="recriveSon" onClick={this.details} data-uid={item.uuid} key={i}>
                    <Card>
                      <Card.Header
                        title={<span style={{ fontSize: '12px' }}>{item.comment.slice(0, 15) + '...'}</span>}
                        thumb='https://app.tiaozhanmeiyitian.com/uploads/Venue/2019-12-18/20191218135551348.jpg'
                        thumbStyle={{ width: '2rem', height: '2rem', marginTop: '-0.3rem' }}
                        extra={<span style={{ fontSize: '12px' }}>{item.intime.slice(0, 10) === moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-") ? item.intime.slice(10, item.intime.length) : item.intime.slice(0, 10)}</span>}
                      />
                    </Card>
                  </div>
                ))
              }
              <Pagination className={this.state.getVenueNewsReceivedList.length === 0 ? 'hidden' : 'fenye'} size="small" onChange={this.currentPush} defaultCurrent={1} current={this.state.newsPageTwo} total={this.state.otherPush} />
              <Result className={this.state.getVenueNewsReceivedList.length === 0 ? '' : 'hidden'} icon={<MessageOutlined style={{ fontSize: '2rem',color:'#F5A623' }} />} title="没有发布消息" />
            </div>
          </PullToRefresh>



        </div>
      </div>
    )
  }
}

export default newsPh;
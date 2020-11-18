import React from 'react';
import './newsPh.css';
import ReactDOM from 'react-dom';
import { Toast, Card, PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {  Pagination, Drawer, Spin, Checkbox } from 'antd';
import { getVenueNewsList, getVenueNewsReceivedList, getVenueNewsFirst,gerVenueName, delVenueNews,imgUrlTwo } from '../../api';
import {  LoadingOutlined, UnorderedListOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
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
    visibleTwo: false,
    visibleThree: false,
    Checkboxuuid: [],


  };
  async getVenueNewsList(data) {
    const res = await getVenueNewsList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        res.data.data[i].Checkbox = false
      }
      this.setState({ getVenueNewsList: res.data.data, other: res.data.other.sum, refreshing: false,spin: false, })
    }else{

      this.setState({ spin: false, spinFlag: false,getVenueNewsList:[] })
    }
  }

  async getVenueNewsReceivedList(data) {
    const res = await getVenueNewsReceivedList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ getVenueNewsReceivedList: res.data.data, otherPush: res.data.other, refreshingTwo: false })
    }else{
      this.setState({ spinFlag: false,getVenueNewsReceivedList:[] })
    }

  }
  async getVenueNewsFirst(data) {
    const res = await getVenueNewsFirst(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ newsDetails: res.data.data })
    this.getVenueNewsList({ page: this.state.newsPage })
    }
  }


  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))
    localStorage.setItem('avatar', imgUrlTwo + res.data.data.siteimg)
  }

  componentDidMount() {
    this.getVenueNewsList({ page: 1 })
    this.gerVenueName()

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
    this.getVenueNewsReceivedList({ page: 1 })
    this.setState({ flag: 2 })
  }
  details = e => {
    if (this.state.visibleDrawerNum !== 1 && this.state.visibleDrawerNumTwo !== 1) {
      this.getVenueNewsFirst({ newsuuid: e.currentTarget.dataset.uid })
      this.setState({ visibleDrawer: true })
    }
  }



  onClose = () => {
    this.setState({
      visibleDrawer: false,
      visibleTwo: false
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

  loodMenu = e => {
    this.setState({ visibleTwo: true, visibleDrawerNum: 1 })
  }
  closeX = () => {
    this.setState({ visibleTwo: false, visibleDrawerNum: 0 })
  }
  Checkbox = e => {
    let items = this.state.getVenueNewsList
    items[e.currentTarget.dataset.idx].Checkbox = !items[e.currentTarget.dataset.idx].Checkbox
    this.setState({ getVenueNewsList: items })
  }

  loodMenuTwo = e => {
    this.setState({ visibleThree: true, visibleDrawerNumTwo: 1 })
  }
  closeXTwo = () => {
    this.setState({ visibleThree: false, visibleDrawerNumTwo: 0 })
  }
  CheckboxTwo = e => {
    let items = this.state.getVenueNewsReceivedList
    items[e.currentTarget.dataset.idx].Checkbox = !items[e.currentTarget.dataset.idx].Checkbox
    this.setState({ getVenueNewsReceivedList: items })
  }

  async delVenueNews(data) {
    const res = await delVenueNews(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueNewsList({ page: 1 })
      this.getVenueNewsReceivedList({ page: 1 })
      this.setState({newsPage:1,newsPageTwo:1})
      this.setState({ visibleDrawerNum: 0, visibleTwo: false, visibleDrawerNumTwo: 0, visibleThree: false })
    } else {
      this.getVenueNewsList({ page: 1 })
      this.getVenueNewsReceivedList({ page: 1 })
      this.setState({newsPage:1,newsPageTwo:1})
      Toast.fail(res.data.msg, 2);
    }
  }

  delet = () => {
    let items = this.state.getVenueNewsList
    let arrUi = []
    for (let i in items) {
      if (items[i].Checkbox === true) {
        arrUi.push(items[i].uuid)
      }
    }
    if(arrUi.length===0){
      Toast.fail('请选择要删除的消息', 2);
    }else{
      this.delVenueNews({ uuid: arrUi.join(',') })
    }
  }

  deletTwo = () => {
    let items = this.state.getVenueNewsReceivedList
    let arrUi = []
    for (let i in items) {
      if (items[i].Checkbox === true) {
        arrUi.push(items[i].uuid)
      }
    }
    if(arrUi.length===0){
      Toast.fail('请选择要删除的消息', 2);
    }else{
      this.delVenueNews({ uuid: arrUi.join(',') })
    }
  }


  allThem = () => {
    let items = this.state.getVenueNewsList
    for (let i in items) {
      items[i].Checkbox = true
    }
    this.setState({ getVenueNewsList: items })
  }

  allThemTwo = () => {
    let items = this.state.getVenueNewsReceivedList
    for (let i in items) {
      items[i].Checkbox = true
    }
    this.setState({ getVenueNewsReceivedList: items })
  }
  locad=e=>{
    sessionStorage.setItem('modl',null)
    this.props.history.push({pathname:'/homePh/orderPhT',query:{uuid:e.currentTarget.dataset.uuid,typeid:e.currentTarget.dataset.typeid}})
  }
  inforsite=()=>{
    if(localStorage.getItem('ismethod')==='1'){
      this.props.history.push('/homePh/inforSitePh')
    }else{
     Toast.fail('请使用负责人手机号登录后前往修改', 1);
    }
  }

  render() {
    return (
      <div className="newsPh">
        <div className="newsheaderTitle">
          <div onTouchStart={this.receive} style={this.state.flag === 1 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>我收到的</div>
          <div onTouchStart={this.publish} style={this.state.flag === 2 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>我发送的</div>
        </div>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} > <LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 7 }} /></div>
        <div className="receive" style={this.state.flag === 1 ? { display: 'block' } : { display: 'none' }} >


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
                  <div className="recriveSon" key={i} onClick={this.details} onContextMenu={this.loodMenu} data-uid={item.uuid}>
                    <Card>
                      <Card.Header
                        title={<span style={{ fontSize: '12px' }}>{item.comment.length > 15 ? item.comment.slice(0, 15) + '...' : item.comment}</span>}
                        thumb={item.isred === 0 ? require("../../assets/logoTwo.png") : require("../../assets/logo.png")}
                        thumbStyle={{ width: '2rem', height: '2rem', marginTop: '-0.3rem' }}
                        extra={<div><span style={{ fontSize: '12px' }}>{item.intime.slice(0, 10) === moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-") ? item.intime.slice(10, item.intime.length) : item.intime.slice(0, 10)}</span><Checkbox style={this.state.visibleDrawerNum === 1 ? {} : { display: 'none' }} onClick={this.Checkbox} data-idx={i} checked={item.Checkbox}></Checkbox></div>}
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
              <Pagination className={this.state.getVenueNewsList.length === 0 || this.state.visibleDrawerNum === 1 ? 'hidden' : 'fenye'} size="small" onChange={this.current} defaultCurrent={1} hideOnSinglePage={true} showSizeChanger={false} current={this.state.newsPage} total={this.state.other} />
              <div style={this.state.spin === false && this.state.getVenueNewsList.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (9).png')} alt="555" /><span style={{ display: 'block', textAlign: 'center' }}>没有系统消息!</span></div>
              <div className="bottomLook" style={this.state.visibleTwo === true ? { display: 'block' } : { display: 'none' }}>
                <div className="content">
                  <div onClick={this.closeX} style={{ float: 'left' }}><CloseCircleOutlined style={{ fontSize: '1.2rem' }} /> <span style={{ display: 'block' }}>取消</span></div>
                  <div onClick={this.allThem} style={{ float: 'left', marginLeft: '1.3rem' }}><UnorderedListOutlined style={{ fontSize: '1.2rem' }} /><span style={{ display: 'block' }}>全选</span></div>
                  <div onClick={this.delet} style={{ float: 'right' }}><DeleteOutlined style={{ fontSize: '1.2rem' }} /><span style={{ display: 'block' }}>删除</span></div>
                </div>
              </div>
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
          <div style={this.state.newsDetails.type===6?{color:'#9b9b9b'}:{display:'none'}}>请使用负责人手机号登录修改</div>
          <div onClick={this.inforsite} style={this.state.newsDetails.type===6?{color:'#F5A623',cursor:'pointer'}:{display:'none'}}>再次前往修改</div>
          <div onClick={this.locad} style={this.state.newsDetails.publicuuid===''?{display:'none'}:{color:'#F5A623',cursor:'pointer'}} data-uuid={this.state.newsDetails.publicuuid} data-typeid={this.state.newsDetails.public_type}>前往活动列表</div>
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
                  <div className="recriveSon" onClick={this.details} onContextMenu={this.loodMenuTwo} data-uid={item.uuid} key={i}>
                    <Card>
                      <Card.Header
                        title={<span style={{ fontSize: '12px' }}>{item.comment.length > 15 ? item.comment.slice(0, 15) + '...' : item.comment}</span>}
                        thumb={localStorage.getItem('avatar')}
                        thumbStyle={{ minHeight: '2rem',maxHeight:'2rem',minWidth:'2rem',maxWidth:'2.5rem', marginTop: '-0.3rem' }}
                        extra={<div><span style={{ fontSize: '12px' }}>{item.intime.slice(0, 10) === moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-") ? item.intime.slice(10, item.intime.length) : item.intime.slice(0, 10)}</span><Checkbox style={this.state.visibleDrawerNumTwo === 1 ? {} : { display: 'none' }} onClick={this.CheckboxTwo} data-idx={i} checked={item.Checkbox}></Checkbox></div>}
                      />
                    </Card>
                  </div>
                ))
              }
              <Pagination className={this.state.getVenueNewsReceivedList.length === 0 || this.state.visibleDrawerNumTwo === 1 ? 'hidden' : 'fenye'} size="small" hideOnSinglePage={true} showSizeChanger={false} onChange={this.currentPush} defaultCurrent={1} current={this.state.newsPageTwo} total={this.state.otherPush} />
              <div style={this.state.getVenueNewsReceivedList.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (9).png')} alt="555" /><span style={{ display: 'block', textAlign: 'center' }}>没有发送的消息!</span></div>
              <div className="bottomLook" style={this.state.visibleThree === true ? { display: 'block' } : { display: 'none' }}>
                <div className="content">
                  <div onClick={this.closeXTwo} style={{ float: 'left' }}><CloseCircleOutlined style={{ fontSize: '1.2rem' }} /> <span style={{ display: 'block' }}>取消</span></div>
                  <div onClick={this.allThemTwo} style={{ float: 'left', marginLeft: '1.3rem' }}><UnorderedListOutlined style={{ fontSize: '1.2rem' }} /><span style={{ display: 'block' }}>全选</span></div>
                  <div onClick={this.deletTwo} style={{ float: 'right' }}><DeleteOutlined style={{ fontSize: '1.2rem' }} /><span style={{ display: 'block' }}>删除</span></div>
                </div>
              </div>
            </div>
          </PullToRefresh>
        </div>
      </div>
    )
  }
}

export default newsPh;
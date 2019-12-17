import React from 'react';
import './news.css';
import 'antd/dist/antd.css';
import { getVenueNewsList, getVenueNewsFirst, VenueNewsSaveIsRead, delVenueNews, VenueNewsSendMessage, gerVenueName,VenueNewsOneKeyRead } from '../../api';
import { Checkbox, Pagination, Drawer, message, Popconfirm, Modal, Input } from 'antd';

const { TextArea } = Input

class news extends React.Component {

  state = {
    newsList: [],
    isredcount: '0',
    sum: '0',
    flag: false,
    oneChecked: null,
    visible: false,
    newsDetail: '',
    current: '',
    uid: '',
    delet: [],
    visibleTwo: false,
    textArea: '',
  };


  componentDidMount() {
    this.getVenueNewsList({ page: 1 })
  }




  async getVenueNewsList(data) {
    const res = await getVenueNewsList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        res.data.data[i].cheched = false
      }
      this.setState({ newsList: res.data.data, sum: res.data.other.sum, isredcount: res.data.other.isredcount })
    }
  }
  allOnChange = (e) => {
    let { newsList } = this.state
    if (e.target.checked === true) {

      for (let i in newsList) {
        newsList[i].cheched = true
      }
    } else {
      for (let i in newsList) {
        newsList[i].cheched = false
      }
    }
    let foArr = []
    for (let i in newsList) {
      if (newsList[i].cheched === true) {
        foArr.push(newsList[i].uuid)
      }
    }
    this.setState({ oneChecked: !this.state.oneChecked, delet: foArr })
  }
  onChange = e => {
    let { newsList } = this.state
    if (e.target.checked === false) {
      this.setState({ oneChecked: false })
    }
    newsList[e.target.index].cheched = !newsList[e.target.index].cheched
  }



  async delVenueNews(data) {
    const res = await delVenueNews(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ oneChecked: false })
      this.getVenueNewsList({ page: this.state.current })
    }
  }

  kood = e => {
    this.setState({ uid: e.currentTarget.dataset.uid })
  }
  confirm = () => {
    this.delVenueNews({ uuid: this.state.uid })
  }
  arrConfirm = () => {
    let koArr = []
    for (let i in this.state.newsList) {
      if (this.state.newsList[i].cheched === true) {
        koArr.push(this.state.newsList[i].uuid)
      }
    }

    this.delVenueNews({ uuid: koArr.join(',') })
    this.setState({ oneChecked: !this.state.oneChecked })
  }

  // bossDelet = () => {
  //   let koArr = []
  //   for (let i in this.state.newsList) {
  //     if (this.state.newsList[i].cheched === true) {
  //       koArr.push(this.state.newsList[i].uuid)
  //     }
  //   }
  //   console.log(koArr)
  // }
  current = e => {
    this.setState({ current: e, oneChecked: false })
    this.getVenueNewsList({ page: e })
  }





  async getVenueNewsFirst(data) {
    const res = await getVenueNewsFirst(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ newsDetail: res.data.data })
    } else {
      message.error(res.data.msg)
    }
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ gerVenueName: res.data.data })
      sessionStorage.setItem('siteuid', res.data.data.siteuid)
      sessionStorage.setItem('mess', res.data.data.mess)
      sessionStorage.setItem('rate', res.data.data.rate)
    }
  }

  async VenueNewsSaveIsRead(data) {
    const res = await VenueNewsSaveIsRead(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      this.gerVenueName()
    }
  }
  
  consult = e => {
    this.setState({
      visible: true,
    });
    this.getVenueNewsFirst({ newsuuid: e.currentTarget.dataset.uuid })
    this.VenueNewsSaveIsRead({ newsuuid: e.currentTarget.dataset.uuid })
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
    this.getVenueNewsList({ page: this.state.current })
  };

  handleCancel = () => {
    this.setState({ visibleTwo: false })
  }
  sendingMsg = () => {
    this.setState({ visibleTwo: true })
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }

  async VenueNewsSendMessage(data) {
    const res = await VenueNewsSendMessage(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ visibleTwo: false })
    }
  }

  sendingThree = () => {
    this.VenueNewsSendMessage({ comment: this.state.textArea })
  }

  site = (e) => {
    this.props.history.push({ pathname: '/home/information', query: { uuid: e.target.dataset.id } })
  }

  async VenueNewsOneKeyRead(data) {
    const res = await VenueNewsOneKeyRead(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.gerVenueName()
    }else{
      message.error(res.data.msg)
    }
  }

  


  Read=()=>{
    this.VenueNewsOneKeyRead()
    this.getVenueNewsList({ page: this.state.current })
  }


  render() {
    return (
      <div className="news">
        <div className="xiange"></div>
        <div className="heade"><span>所有消息   </span><span>(共{this.state.sum}条，未读{this.state.isredcount}条)</span><div className="button" onClick={this.sendingMsg}>发消息</div></div>
        <div className="xiange"></div>
        <div className="content">
          <div className="newsList">
            <Checkbox className="check" onChange={this.allOnChange} checked={this.state.oneChecked}>全选</Checkbox>
            <Popconfirm
              title="您确定删除选中消息吗?"
              onConfirm={this.arrConfirm}
              okText="删除"
              cancelText="取消"
            >
              <span className="btn" onClick={this.bossDelet}>删除</span>
            </Popconfirm>
             <span className="btn" style={{marginLeft:'10px'}} onClick={this.Read}>一键已读</span>
          </div>
          {
            this.state.newsList.map((item, i) => (
              <div key={i} className="newsList">
                <Checkbox className="check" onChange={this.onChange} index={i} checked={item.cheched} value={item.uuid}></Checkbox>
                <div style={{ float: 'left', marginTop: '12px', marginLeft: 20 }}><img src={item.isred === 0 ? require('../../assets/news.png') : require('../../assets/oldNews.png')} alt="news" />&nbsp;&nbsp;系统消息</div>
                <span className="textOne" data-uuid={item.uuid} onClick={this.consult}>{item.comment}</span>
                <span style={{ paddingLeft: '3%', lineHeight: '44px' }}>{item.intime}</span>
                <Popconfirm
                  title="您确定删除本条消息吗?"
                  onConfirm={this.confirm}
                  okText="删除"
                  cancelText="取消"
                >
                  <img className="imgRight" data-uid={item.uuid} onClick={this.kood} src={require('../../assets/icon_pc_delet.png')} alt="删除" />
                </Popconfirm>
              </div>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} pageSize={10} total={parseInt(this.state.sum)} onChange={this.current} />
          <Drawer
            title="消息详情"
            placement="top"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div>{this.state.newsDetail.comment_chk}</div>
            <div>{this.state.newsDetail.intime_chk}</div>
            <div>{this.state.newsDetail.comment}</div>
            <div>{this.state.newsDetail.intime}</div>
          </Drawer>
        </div>
        <Modal
          title="给找对手平台发消息"
          visible={this.state.visibleTwo}
          onCancel={this.handleCancel}
        >
          <TextArea rows={3} placeholder="请输入您推送的消息" onChange={this.textArea} maxLength={200} />
          <span style={{ paddingTop: 15 }}>还可以输入{200 - this.state.textArea.length}字</span>
          <div className="btnModel">
            <div onClick={this.handleCancel}>取消</div>
            <div onClick={this.sendingThree}>发送</div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default news;
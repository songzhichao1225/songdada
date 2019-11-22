import React from 'react';
import './minePh.css';
import { Drawer, Input, message,Pagination } from 'antd';
import { VenueNewsSendMessage,getVenueHelpCenter } from '../../api';

const { TextArea } = Input



class minePh extends React.Component {

  state = {
    visible: false,
    fanKui: false,
    TextArea: '',
    TextAreaLen: 0,
    help: false,
    helpList: [],
    other:0,
   
  };

  componentDidMount() {

  }

  myWalletPh = () => {
    this.props.history.push('/homePh/myWalletPh')
  }

  sittingPh = () => {
    this.props.history.push('/homePh/sittingPh')
  }

  inforSitePh = () => {
    this.props.history.push('/homePh/inforSitePh')
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      fanKui: false,
      help:false
    });
  };

  fanKui = () => {
    this.setState({ fanKui: true })
  }

  TextArea = e => {
    this.setState({ TextArea: e.target.value, TextAreaLen: e.target.value.length })
  }


  async VenueNewsSendMessage(data) {
    const res = await VenueNewsSendMessage(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ fanKui: false })
    }
  }
  submit = () => {
    this.VenueNewsSendMessage({ comment: this.state.TextArea })
  }

  async getVenueHelpCenter(data) {
    const res = await getVenueHelpCenter(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({helpList: res.data.data,other:res.data.other })
    }
  }

  help = () => {
    this.getVenueHelpCenter()
    this.setState({ help: true })
  }
  current=(page,pageSize)=>{
    this.getVenueHelpCenter({page:page})
  }

  render() {
    return (
      <div className="minePh">
        <div className="headerbanner">
          <div className="headContent">
            <img className="avatar" src={localStorage.getItem('avatar')} alt='头像' />
            <div className="right">
              <span>{localStorage.getItem('name')}</span>
              <span>场地履约率{localStorage.getItem('lyv')}%</span>
            </div>
          </div>
        </div>

      

        <ul className="mineList">
          <li onClick={this.inforSitePh}><img src={require("../../assets/changNews.png")} alt="icon"/><span>场馆信息</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.myWalletPh}><img src={require("../../assets/money.png")} alt="icon" /><span>场馆钱包</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.sittingPh}><img src={require("../../assets/setting.png")} alt="icon" /><span>设置</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li><img src={require("../../assets/xieyi.png")} alt="icon" /><span>用户协议</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.showDrawer}><img src={require("../../assets/myand.png")} alt="icon" /><span>关于我们</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li><img src={require("../../assets/phone.png")} alt="icon" /><span ><a href="tel:18567837551" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>客服电话(010-1008611)</a></span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.help}><img src={require("../../assets/waring.png")} alt="icon" /><span>帮助中心</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.fanKui}><img src={require("../../assets/fankui.png")} alt="icon" /><span>意见反馈</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
        </ul>
        <Drawer
          title="关于我们"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}>
          <p style={{ fontSize:'0.75rem'}}>挑战约球，2019年在北京成立，是由北京甲乙电子商务技术有限公司开发，是国内领先的运动O2O平台，全国规模最大的24小时连锁健身品牌</p>
          <p style={{ fontSize:'0.75rem'}}>挑战约球的创始团队来自阿里巴巴、GOOGLE、舒适堡、格力，及全球连锁酒店顶级管理人士。一群狂热的健身&互联网信徒，乐刻运动是一个充满极客精神以追求极致的态度为都市年轻人提供健身服务的创业公司。致力于成为混乱的国内健身行业的颠覆者。</p>
          <p style={{ fontSize:'0.75rem'}}>在健身房行业，中美差距正在拉大。乐刻的创始人韩伟想参考的正是小型健身房模式，他为此准备了接近一年时间，对比模式、做市场调研、考察门店，将24小时不打烊的小型健身房正式带入中国市场。</p>
        </Drawer>

        <Drawer
          title="意见反馈"
          placement="top"
          onClose={this.onClose}
          visible={this.state.fanKui}>
          <TextArea rows={3} placeholder="请输入您的反馈信息" maxLength={200} onChange={this.TextArea} /><span>{this.state.TextAreaLen}/200</span>
          <div onClick={this.submit} style={{ width: '3rem', height: '1.5rem', background: 'rgba(245,166,35,1)', fontSize: '0.8rem', color: '#fff', textAlign: 'center', float: 'right', marginTop: '0.2rem' }}>提交</div>
        </Drawer>

        <Drawer
          title="帮助中心"
          placement="right"
          onClose={this.onClose}
          visible={this.state.help}>
          {
            this.state.helpList.map((item, i) => (
              <div key={i} style={{marginTop:'1rem'}}>
                <div style={{color:'#F5A623'}}>{item.title}</div>
                <div style={{marginTop:'0.5rem'}}>{item.content}</div>
              </div>
            ))
          }
         <Pagination className='fenye' defaultCurrent={1} onChange={this.current}  total={this.state.other}  />
        </Drawer>

      


      </div>
    )
  }
}

export default minePh;
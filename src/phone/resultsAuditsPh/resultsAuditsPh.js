import React from 'react';
import './resultsAuditsPh.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { getIsStatus } from '../../api';
import { NavBar, Popover } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const Item = Popover.Item;
class resultsAuditsPh extends React.Component {

  state = {
    islegal: 0,
    content: '',
  };

  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ islegal: res.data.data.islegal, content: res.data.data.content })
    } else if (res.data.code === 4001) {
      this.props.history.push('/login')
    }
  }
  

  componentDidMount() {
    this.getIsStatus()
    
  }

  goback = () => {
    this.props.history.replace({ pathname: './stadiumInformationPh' })
    sessionStorage.setItem('notType', 1)
    localStorage.removeItem('qualifData')
  }
  homePh = () => {
    this.props.history.push('./homePh')
    localStorage.setItem('isqult', undefined)
    localStorage.setItem('islegal', 1)
  }
  login = () => {
    this.props.history.replace('/login')
    localStorage.removeItem('venue_token')
  }


  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack();
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1');
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  closeWeb = () => {

    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
      this.setState({ visible: false })
    } else {
      this.close()
    }
  }


  render() {
    return (
      <div className="resultsAuditsPh">
        <NavBar
          mode="dark"
          icon={<img style={{ width: '2rem', height: '2rem', display: 'block', marginTop: '-0.3rem' }} src={require('../../assets/logo.png')} alt="logo" />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}

          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <EllipsisOutlined />
            </div>
          </Popover>}
        ><span style={{ fontSize: '1rem' }}>审核信息</span></NavBar>
        <div className="boss" style={this.state.islegal === 0 ? { display: 'block' } : { display: 'none' }}>
          <img className="icon" src={require("../../assets/icon_pc.png")} alt="图标" />
          <span className="text">信息完善成功！等待审核</span>
          <span className="content">我们会在3个工作日完成审核。<br /> 审核成功后会发送短信到您绑定的手机号上，请注意查收。<br />联系电话：010-80895077 </span>
        </div>
        <div className="boss" style={this.state.islegal === 2 ? { display: 'block' } : { display: 'none' }}>
          <img className="icon" src={require("../../assets/no.png")} alt="图标" />
          <span className="text">抱歉！未通过审核</span>
          <span className="content">审核未通过原因如下:<span style={{ color: '#D85D27' }}>{this.state.content}</span><br />联系电话：010-80895077 </span>
          <span onClick={this.goback} style={{ color: '#D85D27', marginLeft: '1rem', fontSize: '0.75rem' }}> 返回修改信息 </span>
          <span onClick={this.login} style={{ marginLeft: '1rem', color: '#D85D27', display: 'block', fontSize: '0.75rem' }}> 返回重新登录 </span>

        </div>
        <div className="boss" style={this.state.islegal === 1 ? { display: 'block' } : { display: 'none' }}>
          <img className="icon" src={require("../../assets/yes.png")} alt="图标" />
          <span className="text">恭喜您！审核通过</span>
          <span className="content">审核成功后会发送短信到您绑定的手机号上，请注意查收 </span>
          <span onClick={this.homePh} style={{ color: '#D85D27', paddingLeft: '1rem' }}>点击进入场馆端首页</span>
        </div>



      </div>
    );
  }
}

export default resultsAuditsPh;
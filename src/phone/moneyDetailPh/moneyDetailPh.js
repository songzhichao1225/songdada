import React from 'react';
import './moneyDetailPh.css';
import 'antd/dist/antd.css';

import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {LeftOutlined} from '@ant-design/icons';




class moneyDetailPh extends React.Component {

  state = {
    datatring:'',
    public:'',
  };

  componentDidMount() {
    if(this.props.location.query===undefined){
      Toast.fail('数据丢失重新进入', 1);
       this.props.history.goBack()
    }else{
      let data=this.props.location.query
     let dataPublic=this.props.location.query.public
      this.setState({datatring:data,public:dataPublic.split(',')})
    }
  }

  reture = () => {
    this.props.history.goBack()
    sessionStorage.setItem('qiStart',this.state.datatring.qistart)
    sessionStorage.setItem('qiEnd',this.state.datatring.qiend)
    sessionStorage.setItem('qiPage',this.state.datatring.page)
  }

  render() {
    
    return (
      <div className="moneyDetailPh">
         <div className="headerTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px'}} />查看详情</div>
         <div className="title">
           <span>入账金额</span>
           <span>+{this.state.datatring.money}</span>
         </div>
         <div className="list"><div className="listSon"><span>类</span><span>型</span></div><span className="value">收入</span></div>
         <div className="list"><div className="listSon"><span>时</span><span>间</span></div><span className="value">{this.state.datatring.time}</span></div>
         <div className="list"><div className="listSon"><span>备</span><span>注</span></div><span className="value">场地费</span></div>
         <span className="content">活动&nbsp;&nbsp;&nbsp;&nbsp;{this.state.public[0]}<br/>场地类型:{this.state.public[2]}{this.state.public[3]}<br/>活动时间:{this.state.public[1]}</span>
      </div>
    )
  }
}

export default moneyDetailPh;
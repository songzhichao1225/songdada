import React from 'react';
import './minePh.css';
import { } from 'antd';
import { } from '../../api';


class minePh extends React.Component {

  state = {

  };

  componentDidMount() {

  }

  myWalletPh=()=>{
    this.props.history.push('/homePh/myWalletPh')
  }





  render() {
    return (
      <div className="minePh">

        <div className="headerbanner">
          <div className="headContent">
            <img className="avatar" src={sessionStorage.getItem('avatar')} />
            <div className="right">
              <span>{sessionStorage.getItem('name')}</span>
              <span>场地履约率{sessionStorage.getItem('lyv')}%</span>
            </div>
          </div>
        </div>

        <ul className="mineList">
           <li><img src={require("../../assets/changNews.png")} alt="icon"/><span>场馆信息</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li onClick={this.myWalletPh}><img src={require("../../assets/money.png")} alt="icon"/><span>场馆钱包</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li><img src={require("../../assets/setting.png")} alt="icon"/><span>设置</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li><img src={require("../../assets/xieyi.png")} alt="icon"/><span>用户协议</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li><img src={require("../../assets/myand.png")} alt="icon"/><span>关于我们</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li><img src={require("../../assets/phone.png")} alt="icon"/><span>客服电话(010-84512594)</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li><img src={require("../../assets/waring.png")} alt="icon"/><span>帮助中心</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
        </ul>
      </div>
    );
  }
}

export default minePh;
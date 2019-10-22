import React from 'react';
import './recordPh.css';
import { message,Pagination,Result,Icon,Spin} from 'antd';
import { getVenueWithdrawalList } from '../../api';


class recordPh extends React.Component {

  state = {
    recordPhList:[],
    other:0,
    spin:true
  };
  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ recordPhList: res.data.data,other:res.data.other,spin:false })
    }
  }



  componentDidMount() {
    this.getVenueWithdrawalList({page:1})
  }

  current=(page,pageSize)=>{
    this.getVenueWithdrawalList({page:page})
  }
  reture=()=>{
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="recordPh">
        <div className="headTitle"> <Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>提现记录</div>
        { 
          this.state.recordPhList.map((item,i) => (
            <div className="recordSon" key={i}>
              <div className="left">
                <span>{item.OpeningBank}|{'**'+item.BankCard.slice(-4)}|{'**'+item.BankName.slice(-1)}</span>
                <span>{item.SubmitDate}</span>
              </div>
              <div className="right">
                <span>￥{item.RequestMoney}</span>
                <span>{item.status===1?'待处理':''||item.status===2?'已处理':''&&item.status===3?'未通过':''}</span>
              </div>
            </div>
          ))
        }
        <Spin spinning={this.state.spin} style={{width:'100%',marginTop:'45%'}}/>
         <Pagination className={this.state.recordPhList.length===0?'hidden':'fenye'} onChange={this.current} size='small' defaultCurrent={1} total={this.state.other} />
         <Result className={this.state.spin===false&&this.state.recordPhList.length===0?'':'hidden'} icon={<Icon type="account-book" theme="twoTone" style={{fontSize:'2rem'}}  twoToneColor="#F5A623" />} title="没有提现记录" />
      </div>
    )
  }
}

export default recordPh;  
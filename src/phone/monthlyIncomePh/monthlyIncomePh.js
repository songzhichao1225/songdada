import React from 'react';
import './monthlyIncomePh.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList } from '../../api';
import { DatePicker, message,Pagination,Result,Icon,Spin } from 'antd';
import moment from 'moment';
let start = moment().startOf('day').subtract(1, 'months')._d.toLocaleDateString().replace(/\//g, "-")
let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
let startTwo=start.split('-')
const startDate=startTwo[2]+'-'+startTwo[0]+'-'+startTwo[1]
let endTwo=end.split('-')
const endDate=endTwo[2]+'-'+endTwo[0]+'-'+endTwo[1]

let startT = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
let startTwoT=startT.split('-')
const startDateT=startTwoT[2]+'-'+startTwoT[0]+'-'+startTwoT[1]
class monthlyIncomePh extends React.Component {

  state = {
    getVenueMoneyList: '',
    moneyList: [],
    start:'',
    end:'',
    current:'1',
    flag:'',
    spin:true,
  };
  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, localStorage.getItem('venue_token'))

    this.setState({getVenueMoneyList: res.data.data,spin:false})
    
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    }


    if(res.data.data.data!==undefined){
      this.setState({  moneyList: res.data.data.data,flag:false })
    }else{
      this.setState({flag:true})
    }
  }



  componentDidMount() {
    if(this.props.location.query===undefined){
       this.props.history.goBack()
    }else{
      if(this.props.location.query.income==='month'){
        let myDate=new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let startTwo=start.split('-')
        let startDate=startTwo[0]+'-'+startTwo[1]+'-'+startTwo[2]
        let endTwo=end.split('-')
        let endDate=endTwo[0]+'-'+endTwo[1]+'-'+endTwo[2]
          this.setState({start:startDate,end:endDate})
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      }else if(this.props.location.query.income==='day'){
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let startTwo=start.split('-')
        let startDate=startTwo[0]+'-'+startTwo[1]+'-'+startTwo[2]
        let endTwo=end.split('-')
        let endDate=endTwo[0]+'-'+endTwo[1]+'-'+endTwo[2]
        this.setState({start:startDate,end:endDate})
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      }
    }

    
  }
  startDate=(data,datastring)=>{
    this.setState({start:datastring})
  }

  endDate=(data,datastring)=>{
    this.setState({end:datastring})
    this.getVenueMoneyList({ start: this.state.start, end: datastring, page: this.state.current })
  }


  pageChang=(page,pageSize)=>{
    this.setState({current:page})
   this.getVenueMoneyList({ start: this.state.start, end: this.state.end, page: page })
  }

  detail=e=>{

    this.props.history.push({pathname:'/homePh/monthlyIncomePh/moneyDetailPh',query:e.currentTarget.dataset})
  }


  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="monthlyIncomePh">
        <div className="headerTitle">
        <Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>
        {this.props.location.query!==undefined&&this.props.location.query.income==='month'?'本月收入':'今日收入'}
        </div>
        <div className="timer">
          <DatePicker className="start" value={moment(this.state.start)} onChange={this.startDate} showToday={false} /> 
          至 
          <DatePicker className="end" value={moment(this.state.end)} onChange={this.endDate} showToday={false} />
          <span className="text">收入 ￥{this.state.getVenueMoneyList.whereMoney===undefined?'0.00':this.state.getVenueMoneyList.whereMoney}</span>
        </div>

        <div className={this.state.flag===false?'content':'contentNone'}>
          {
            this.state.moneyList.map((item, i) => (
              <div className="contentSon" key={i} data-time={item.time} data-money={item.money} data-public={item.public} onClick={this.detail}>
                <div className="left"><span>场地费</span><span>{item.time}</span></div>
                <img className="image" src={require("../../assets/right.png")}  alt="下一步"/>
                <span className="right">+{item.money}</span>
              </div>
            ))
          }
           <Pagination className="fenye" current={parseInt(this.state.current)} size="small" pageSize={10} total={this.state.getVenueMoneyList.count} onChange={this.pageChang} />
        </div>
        <Result className={this.state.spin===false&&this.state.flag === true ? '' : 'contentNone'} icon={<Icon type="money-collect" style={{fontSize:'2rem'}} theme="twoTone" twoToneColor="#F5A623" />} title="您还没有收入" />
        <Spin spinning={this.state.spin} style={{width:'100%',marginTop:'45%'}}/>
       

      </div>
    );
  }
}

export default monthlyIncomePh;
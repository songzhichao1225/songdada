import React from 'react';
import './homePh.css';
import 'antd/dist/antd.css';
import {getVenueIndex,VenueEvaluationOfOperation,VenueEvaluationSave } from '../../api';
import {Rate,Modal } from 'antd';
import { PullToRefresh, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { LoadingOutlined } from '@ant-design/icons';









class homePh extends React.Component {

  state = {
    getVenue: '',
    title: '首页',
    spin: true,
    clenTop: 0,
    clickY: 0,
    moveY: 0,
    spinFlag: false,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    visible: false,
    mode: false,
    flag: false,
    flagK: false,
    Selabel: [],
    detail: [],
    SelabelTwo: [],
    isModalVisible: false,
    rate: 1,
    labelId:[],
  };
  async getVenueIndex(data) {
    const res = await getVenueIndex(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ getVenue: res.data.data, spin: false, spinFlag: false })
      sessionStorage.setItem('score', res.data.data.score)
      if(res.data.data.isevaluate===0){
        // this.VenueEvaluationOfOperation()
      }
    }
  }








  commentPh = () => {
    this.props.history.push('/homePh/commentPh')
  }
  yuYue = () => {
    sessionStorage.setItem('modl', 1)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 1 } })
    this.setState({ title: '今日成功预约' })
  }

  yuYueTwo = () => {
    sessionStorage.setItem('modl', 2)
    this.props.history.push({ pathname: '/homePh/orderPhT', query: { time: 2 } })
    this.setState({ title: '本月成功预约' })
  }

  monthlyIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/myWalletPh', query: { income: 'month' } })
    sessionStorage.setItem('income', 'month')
  }
  dayIncomePh = () => {
    this.props.history.push({ pathname: '/homePh/myWalletPh', query: { income: 'day' } })
    sessionStorage.setItem('income', 'day')
  }


  async VenueEvaluationOfOperation(data) {
    const res = await VenueEvaluationOfOperation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let object = res.data.data.label
      var arr = []
      for (let i in object) {
        arr.push(object[i]);
      }

      this.setState({ detail: res.data.data, Selabel: arr, SelabelTwo: arr[0], isModalVisible: true })
    }
  }




  componentDidMount() {
    sessionStorage.setItem('kood', 1)
    this.getVenueIndex()
    
  }

  reture = () => {
    this.props.history.goBack()
  }
  homePh = () => {
    this.setState({ title: '首页' })
  }
  orderPh = () => {
    this.setState({ title: '预约信息', refs: 1 })
  }
  sitePh = () => {
    this.setState({ title: '场地设置' })
  }
  newsPh = () => {
    this.setState({ title: '消息' })
  }
  mine = () => {
    this.setState({ title: '我的' })
  }




  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getVenueIndex()
    }, 1000)
  }

  rate = (e) => {
    this.setState({ rate: e,SelabelTwo: this.state.Selabel[e - 1], labelId: [] })
  }

  select = (e) => {
   
    if (this.state.labelId.indexOf(Number(e.currentTarget.dataset.id)) !== -1) {
      let pop = this.state.labelId
      pop.splice(this.state.labelId.indexOf(Number(e.currentTarget.dataset.id)), 1);
      this.setState({ labelId: pop })
      
    } else {
      this.setState({ labelId: [...this.state.labelId, Number(e.currentTarget.dataset.id)] })
    }
  }

  async VenueEvaluationSave(data) {
    const res = await VenueEvaluationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if(data.star!==''){
        Toast.success('评价成功')
      }
        this.setState({isModalVisible:false})
    }else{
      Toast.fail(res.data.msg)
    }
  }

  handleOk = () => {
    this.VenueEvaluationSave({star:this.state.rate,label:this.state.labelId.join('')})
  }
  handleCancel=()=>{
    this.VenueEvaluationSave({star:'',label:''})
  }


  render() {
    return (
      <div className="homePh">
        <div className="headerTitle">
        </div>
        <div className='kog'>
          <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} ><LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 4 }} /></div>
          <div className={this.props.location.pathname === '/homePh/homePh' && this.state.spin === false ? 'homePagePh' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}  >
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
              <div className="homeScroll" >
                <div onTouchStart={this.yuYue}><span className="title" >今日成功预约</span><div className="content"><span>{this.state.getVenue.today_count}</span><span>单</span></div></div>
                <div onTouchStart={this.yuYueTwo}><span className="title">本月成功预约</span><div className="content"><span>{this.state.getVenue.month_count}</span><span>单</span></div></div>
            <div onClick={this.dayIncomePh}><span className="title" >今日收入</span><div className="content"><span style={{display:'block',fontSize:'0.75rem',fontWeight:500}}>会员卡扣款：￥{this.state.getVenue.today_member_money}</span><span style={{display:'block',fontSize:'0.75rem'}}>钱包到账：￥{this.state.getVenue.today_money}</span></div></div>
                <div onClick={this.monthlyIncomePh}><span className="title" >本月收入</span><div className="content"><span style={{display:'block',fontSize:'0.75rem',fontWeight:500}}>会员卡扣款：￥{this.state.getVenue.month_member_money}</span><span style={{display:'block',fontSize:'0.75rem'}}>钱包到账：￥{this.state.getVenue.month_money}</span></div></div>
                <div onTouchStart={this.commentPh}><span className="title" >场馆评分  {this.state.getVenue.score}分</span>
                  <div className="content">
                    <div className="img">
                      <img src={this.state.getVenue.score >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 1 && this.state.getVenue.score > 0 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 2 && this.state.getVenue.score > 1 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 3 && this.state.getVenue.score > 2 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 4 ? require ("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 4 && this.state.getVenue.score > 3 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                    <div className="img">
                      <img src={this.state.getVenue.score >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/oneXing.png") && this.state.getVenue.score < 5 && this.state.getVenue.score > 4 ? require("../../assets/50xing (1).png") : require("../../assets/oneXing.png")} alt="星" />
                    </div>
                  </div>
                </div>
              </div>
            </PullToRefresh>
          </div>
        </div>

        <Modal
          visible={this.state.isModalVisible}
          className="koshone"
          title="请对运营专员上一周的表现做个评价吧!"
          okText="匿名评价" 
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ height: '15rem' }}>
            <div className="headTop">
              <div className="left"><img src={require("../../assets/operations.png")} alt="" /></div>
              <div className="right">
                <span>ID:{this.state.detail.promoteid}</span>
                <span>{this.state.detail.promotename}</span>
              </div>
            </div>
            <div className="startRota">整体评分:<Rate defaultValue={1} allowClear={false} onChange={this.rate} />  {this.state.rate}分</div>
            <div className="textAre">基于对ta的印象点击下方标签评价吧！</div>
             {
               this.state.SelabelTwo.map((item,i)=>(
               <div className="select"  style={this.state.labelId.indexOf(item.id) !== -1 ? { background: 'rgba(216,93,39,0.12)', border: '1px solid #D85D27', color: '#D85D27' } : {}} onClick={this.select} key={i} data-id={item.id}>{item.name}</div>
               ))
             }
          </div>
        </Modal>


      </div>
    )
  }
}

export default homePh;
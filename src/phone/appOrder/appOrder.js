import React from 'react';
import './appOrder.css';
import { Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import { Result, Icon } from 'antd';
import { getAppVenueReservation } from '../../api';

import moment from 'moment';
const now = new Date();


class appOrder extends React.Component {

  state = {
    lookList: [],
    macNum: [],
    date: '',
    show: false,
    lastTime: '',
    moneyCall: '00',
    ko: '',
    lotime:[],
  };



  async getAppVenueReservation(data) {
    const res = await getAppVenueReservation(data)
    if (res.data.code === 2000) {
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c })
      if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 24) {
        if (res.data.data[res.data.data.length - 1].a.slice(-2) === '00') {

          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2))) + ':30' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + ':30' })
          }
        } else if (res.data.data[res.data.data.length - 1].a.slice(-2) === '30') {

          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1) + ':00' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 + ':00' })
          }
        }
      }
    } else {
      this.setState({ lookList: [] })
    }
  }


  componentDidMount() {
    this.setState({ dataString: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.getAppVenueReservation({ date: this.state.date, siteUUID: '94da6c9c-8ced-d0e2-d54f-ad690d247134', sportid: '1' })
    let start = new Date().toLocaleDateString().replace(/\//g, "-")
    this.setState({ option: this.props.location.search,date:start })
    
  }











  onSubmit = () => {
    alert('你提交了')
  }



  lookPlate = e => {
    let time = e.currentTarget.dataset.time

  }

  scroll = () => {
    let scrollTop = this.scrollRef.scrollTop;
    let scrollLeft = this.scrollRef.scrollLeft;
    this.setState({ left: scrollLeft, top: scrollTop })
  }


  touClick = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }
  touMove = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY && this.state.clickY < 130) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }
  touEnd = () => {
    if (this.state.moveY > this.state.clickY + 10) {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal })
      if (this.state.spinFlag === false) {
        this.setState({ moveY: 0, clickY: 0 })
        this.setState({ clenTop: 0 })
      }
    }
  }

  date = () => {
    this.setState({ show: true })
  }

  onConfirm = (e) => {
    this.setState({ show: false, date: e.toLocaleDateString().replace(/\//g, "-") })
    this.getAppVenueReservation({ date:  e.toLocaleDateString().replace(/\//g, "-"), siteUUID: '94da6c9c-8ced-d0e2-d54f-ad690d247134', sportid: '1' })
  }
  onCancel = () => {
    this.setState({ show: false })
  }


  lookPlate = e => {
    let money = e.currentTarget.dataset.money
    let lotime = e.currentTarget.dataset.lo
    this.setState({ moneyCall: parseInt(this.state.moneyCall) + parseInt(money) })
    if (e.currentTarget.dataset.type === '1') {
      if (this.state.lotime.length > 0) {
        if (this.state.lotime.indexOf(lotime) !== -1) {
          this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
        } else {
          this.setState({ lotime: [...this.state.lotime, lotime] })
        }
      } else {
        this.setState({ lotime: [...this.state.lotime, lotime] })
      }

    }
    



  }
  render() {
    return (
      <div className="orderPh" onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>

        <div className='bookingKanban'>
    <div onClick={this.date} style={{ height: '3rem', lineHeight: '3rem', textAlign: 'center', background: 'rgba(245,166,35,1)' }}><div style={{width:'40%',height:'2.5rem',margin:'0 auto',borderBottom:'0.12rem solid #fff',color:'#fff'}}>{this.state.date}</div></div>
          <div className="modTitle">
            <span className="blue"></span><span>可选</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>已占用</span><span className="red"></span><span>已选中</span>
          </div>

          <div className="lookList" onScrollCapture={this.scroll} ref={c => { this.scrollRef = c }} style={this.state.lookList.length < 1 ? { display: 'none' } : { display: 'block' }}>
            <div className="headerSon" style={{ width: '' + (this.state.macNum.length + 1) * 3.25 + 'rem' }}>
              <div className="topFixd" style={{ top: this.state.top, minWidth: '100%' }}>
                <span></span>
                {
                  this.state.macNum.map((item, i) => (
                    <span key={i}>{i + 1}</span>
                  ))
                }
              </div>
              <div style={{ height: '2.5rem',lineHeight:'2.5rem' }}></div>
              {
                this.state.lookList.map((index, i) => (
                  <div key={i} className="sonList">
                    <span style={{ left: this.state.left }}>{index.a}<br />{i === this.state.lookList.length - 1 ? this.state.lastTime : ''}</span>
                    <span></span>
                    {
                      this.state.lookList[i].c.map((item, i) => (
                        <span
                          key={i}
                          data-time={index.a}
                          data-num={i + 1}
                          data-uuid={item.uuid}
                          data-type={item.type}
                          onClick={this.lookPlate}
                          data-money={item.money}
                          data-lo={index.a + '-' + (i + 1)}
                          style={item.type === 1&&this.state.lotime.indexOf(index.a + '-' + (i + 1)) === -1 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff' } : { background: 'red', marginTop: '0.12rem', color: '#fff'} && item.type === 2 ? { background: '#6FB2FF', marginTop: '0.12rem',opacity:'0.3' } : {} && item.type === 3 ? { background: '#F5A623', marginTop: '0.12rem' } : {} && item.type === 4 ? { background: 'red', marginTop: '0.12rem' } : {background: 'red', marginTop: '0.12rem', color: '#fff'}}>
                          {item.type === 1 ? item.money : ''}
                        </span>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <Result style={{ fontSize: '0.75rem' }} className={this.state.lookList.length === 0 ? '' : 'hidden'} icon={<Icon type="reconciliation" style={{ fontSize: '2rem' }} theme="twoTone" twoToneColor="#F5A623" />} title="没有预约情况" />
          <Calendar
            visible={this.state.show}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            defaultDate={now}
            type='one'
            infiniteOpt={true}
            minDate={new Date()}
            maxDate={new Date(+now + 31536000000)}
          />

          <div style={{ float: 'right', marginRight: '1rem' }}>场地费合计：{this.state.moneyCall + '.00'}</div>


        </div>
        <div
          style={{ width: '100%', height: '2.5rem', textAlign: 'center', lineHeight: '2.5rem', fontSize: '1.2rem', color: '#fff', position: 'fixed', bottom: '0', background: 'rgb(245, 166, 35)' }}>
          确定
          </div>
  

      </div>

    )
  }
}

export default appOrder;
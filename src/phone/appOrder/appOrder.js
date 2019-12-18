import React from 'react';
import './appOrder.css';
import { Calendar, Toast, Result, Icon, ActivityIndicator } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { getAppVenueReservation, checkChooseTimes, getVenueNumberTitleList } from '../../api';

const now = new Date();


class appOrder extends React.Component {

  state = {
    lookList: [],
    macNum: [],
    date: '',
    show: false,
    lastTime: '',
    moneyCall: [],
    ko: '',
    lotime: [],
    time: [],
    token: '',
    siteid: '',
    sportid: '',
    obj: '',
    topNumList: [],
    animating: true,
    lp: 0,
    venueNum: [],
    sporttype:[],
  };



  async getAppVenueReservation(data) {
    const res = await getAppVenueReservation(data)

    if (res.data.code === 2000) {
      for (let j in this.state.topNumList) {
        res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
        res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
      }
      this.setState({ lookList: res.data.data, venueNum: res.data.other.venueid,sporttype:Object.values(res.data.other.sporttype), macNum: res.data.data[0].c, animating: false })
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
      this.setState({ lookList: [], animating: false })
    }
  }






  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data)
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
    }
  }

  componentDidMount() {
  
    let query = this.props.location.search
    let arr = query.split('&')
    let siteuid = arr[0].slice(9, arr[0].length)
    let sportid = arr[1].slice(8, arr[1].length)
    let token = arr[2].slice(6, arr[2].length)
    let sporttype = arr[3].slice(6, arr[3].length)
    this.getAppVenueReservation({ date: new Date().toLocaleDateString().replace(/\//g, "-"), siteUUID: siteuid, sportid: sportid, sporttype: sporttype })
    this.getVenueNumberTitleList({ sportid: sportid, type: '2', siteuuid: siteuid })
    let start = new Date().toLocaleDateString().replace(/\//g, "-")
    this.setState({ date: start, token: token,siteid:siteuid,sportid:sportid})
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
    this.setState({ show: false, date: e.toLocaleDateString().replace(/\//g, "-"), lotime: '' })
    this.getAppVenueReservation({ date: e.toLocaleDateString().replace(/\//g, "-"), siteUUID: this.state.siteid, sportid: this.state.sportid })
  }
  onCancel = () => {
    this.setState({ show: false })
  }

  lookPlate = e => {
    let money = e.currentTarget.dataset.money
    let time = e.currentTarget.dataset.time
    let num = e.currentTarget.dataset.num
    let lotime = e.currentTarget.dataset.lo
    if (e.currentTarget.dataset.type === '1') {
      if (this.state.lotime.length > 0) {
        if (this.state.lotime.indexOf(lotime) !== -1) {
          this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
          this.state.time.splice(this.state.time.indexOf(time), 1)
          let moneyCall = 0
          for (let i in this.state.lotime) {
            moneyCall = moneyCall + Number(this.state.lotime[i].slice(8, this.state.lotime[i].length))
          }
          this.setState({ moneyCall: moneyCall })
        } else if (this.state.time.indexOf(time) !== -1) {
          this.state.lotime.splice(this.state.time.indexOf(time), 1, time + '-' + num + '-' + money)
          this.setState({ lotime: this.state.lotime })
          let moneyCall = 0
          for (let i in this.state.lotime) {
            moneyCall = moneyCall + Number(this.state.lotime[i].slice(8, this.state.lotime[i].length))
          }
          this.setState({ moneyCall: moneyCall })
        } else {
          this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: Number(this.state.moneyCall) + Number(money) })
        }
      } else {
        this.setState({ time: [...this.state.time, time], lotime: [...this.state.lotime, lotime], moneyCall: Number(this.state.moneyCall) + Number(money) })
      }
    }
  }




  async checkChooseTimes(data) {
    const res = await checkChooseTimes(data, this.state.token)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 2, null, false);
    } else {
      var sUserAgent = navigator.userAgent;
      var mobileAgents = ['Android', 'iPhone'];
      for (let index = 0; index < mobileAgents.length; index++) {
        if (sUserAgent.indexOf('Android') > -1) {
          let objT = JSON.stringify(this.state.obj)
          window.JsAndroid.goTime(objT)
        } else if (sUserAgent.indexOf('iPhone') > -1) {
          try {
            window.webkit.messageHandlers.ScanAction.postMessage(this.state.obj);
          } catch (error) {
            console.log(error)
          }
        }
      }
    }
  }


  onSubmit = () => {
    let time = ''
    let num = ''
    for (let i in this.state.lotime) {
      num += this.state.lotime[i].split('-')[1] + ','
      time += this.state.lotime[i].split('-')[0] + ','
    }

    if (this.state.lotime.length > 0) {
      let s1 = new Date(this.state.date.replace(/-/g, "/") + ' ' + time.slice(0, time.length - 1).split(',').sort()[this.state.lotime.length - 1])
      let s2 = new Date(this.state.date.replace(/-/g, "/") + ' ' + time.slice(0, time.length - 1).split(',').sort()[0])
      if ((Number(s1) - Number(s2)) / 1000 / 60 / 30 + 1 !== this.state.lotime.length) {
        Toast.fail('时间必须连贯', 2, null, false);
      } else {
        let obj = {
          placeNun: num,
          placeTime: time.slice(0, time.length - 1).split(',').sort()[0] + '-' + time.slice(0, time.length - 1).split(',').sort()[this.state.lotime.length - 1],
          placeDate: this.state.date,
          placeMoney: this.state.moneyCall,
          placeTimeLen: (time.split(',').length - 1) * 0.5 + '小时'
        }
        this.setState({ obj: obj })
        this.checkChooseTimes({ startTime: time.slice(0, time.length - 1).split(',').sort()[0], playTime: (time.split(',').length - 1) * 0.5 })
      }
    } else {
      Toast.fail('请选择场地', 2, null, false);
    }
  }

  render() {
    return (
      <div className="homepage">
        <ActivityIndicator toast animating={this.state.animating} />
        <div className="kog" style={this.state.animating === true ? { display: 'none' } : { display: 'block' }}>
          <div className="appOrder" onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>
            <div className='bookingKanban'>
              <div onClick={this.date} className="titleDiv"><div className="titleDivTwo">{this.state.date}</div></div>
              <div className="modTitle">

                <span className="blue"></span><span>可选</span>


                <span className="white"></span><span>不可选</span>


                <span className="yellow"></span><span>已占用</span>


                <span className="red"></span><span>已选中</span>

              </div>

              <div className="lookList" onScrollCapture={this.scroll} ref={c => { this.scrollRef = c }} style={this.state.lookList.length < 1 ? { display: 'none' } : { display: 'block' }}>
                <div className="headerSon" style={{ width: '' + (this.state.macNum.length + 1) * 4.25 + 'rem' }}>
                  <div className="topFixd" style={{ top: this.state.top, minWidth: '100%', height: '3rem' }}>
                    <div style={this.state.venueNum.length > 0 ? { display: 'none' } : { display: 'block' }}>
                      <span>标题<br />场地号</span>
                      {
                        this.state.macNum.map((item, i) => (
                          <span key={i}>{item.title}<br />{i + 1}</span>
                        ))
                      }
                    </div>

  
                    <div style={this.state.venueNum.length > 0 ? { display: 'block' } : { display: 'none' }}>
                      <span>标题<br />场地号</span>
                      {
                        this.state.sporttype.map((item, i) => (
                          <span key={i}>{item.sporttypename}<br />{item.venueid}</span>
                        ))
                      }
                    </div>


                  </div>
                  <div style={{ height: '3rem', lineHeight: '2.5rem' }}></div>
                  {
                    this.state.lookList.map((index, i) => (
                      <div key={i} className="sonList">
                        <span style={{ left: this.state.left }}>{index.a}<br /><span style={{ paddingTop: '0.5rem', display: 'block' }}>{i === this.state.lookList.length - 1 ? this.state.lastTime : ''}</span></span>
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
                              data-lo={index.a + '-' + (i + 1) + '-' + item.money}
                              style={item.type === 1 && this.state.lotime.indexOf(index.a + '-' + (i + 1) + '-' + item.money) === -1 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff' } : { background: 'red', marginTop: '0.12rem', color: '#fff' } && item.type === 2 ? { background: '#6FB2FF', marginTop: '0.12rem', opacity: '0.3' } : {} && item.type === 3 ? { background: '#F5A623', marginTop: '0.12rem' } : {} && item.type === 4 ? { background: 'red', marginTop: '0.12rem' } : { background: 'red', marginTop: '0.12rem', color: '#fff' }}>
                              {item.type === 1 ? item.money : ''}
                            </span>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
              <Result
                style={this.state.lookList.length > 1 ? { display: 'none' } : { display: 'block' }}
                img={<Icon type="cross-circle-o" style={{ fill: 'rgba(245,166,35,1)', width: '4rem', height: '4rem' }} />}
                title="无场地可预约"
              />
              <Calendar
                visible={this.state.show}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                defaultDate={now}
                type='one'
                infiniteOpt={true}
                minDate={new Date()}
                defaultValue={[now]}
                maxDate={new Date(+now + 31536000000)}
              />
              <div style={{ float: 'right', marginRight: '1rem' }}>场地费合计：{this.state.moneyCall.toString().indexOf('.') === -1 ? this.state.moneyCall + '.0' : this.state.moneyCall + '0'}</div>
            </div>
            <div
              onClick={this.onSubmit}
              style={{ width: '100%', height: '2.5rem', textAlign: 'center', fontSize: '1.2rem', color: '#fff', position: 'absolute', bottom: '0', background: 'rgb(245, 166, 35)' }}>
              确定
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default appOrder;
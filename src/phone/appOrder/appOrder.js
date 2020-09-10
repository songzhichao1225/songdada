import React from 'react';
import './appOrder.css';
import { Calendar, Toast, Result, Icon, ActivityIndicator } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Table } from 'antd';
import { getAppVenueReservations, getVenueNumberTitleList, getAPPVenueSelectSite } from '../../api';
const now = new Date();



class appOrder extends React.Component {

  state = {
    lookList: [],
    macNum: [],
    date: '',
    show: false,
    lastTime: '',
    moneyCall: 0,
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
    sporttype: [],
    sportidQuery: '',
    sporttypeTwo: '',
    start: '',
    otherType: [],
    sportName: '',
    lookBan: [],
    resData: '',
    touchMove: 1,
    touchEnd: 1,
    otherNum:'',
  };



  async getAppVenueReservations(data) {
    const res = await getAppVenueReservations(data, this.state.token)


    if (res.data.code === 2000) {


      if (this.state.topNumList.length > 0) {
        for (let j = 0; j < this.state.topNumList.length; j++) {
          if (res.data.data[0].c[this.state.topNumList[j].venueid - 1] !== undefined) {
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
          }
        }
      }
      let arrVen = []
      for (let i in res.data.other) {
        arrVen.push(parseInt(res.data.other[i].venueid))
      }

      let arrTime = []
      for (let i in res.data.data) {
        arrTime.push(res.data.data[i].a)
      }

      let ko = ''
      if (new Date().getMinutes() >= 30) {
        ko = new Date().getHours() + ':' + '30'
      } else {
        ko = new Date().getHours() + ':' + '00'
      }
      setTimeout(() => {
        if (document.querySelector('.ant-table-body') !== null) {
          document.querySelector('.ant-table-body').scrollTo(0, arrTime.indexOf(ko) * 45)
        }
      }, 50)
      this.setState({
        resData: res.data
      })

      this.loodp(this.state.resData)

      for (let i in res.data.other.bq) {
        res.data.other.bq[i].dataIndex = res.data.other.bq[i].venueid
        res.data.other.bq[i].title = <div style={{ textAlign: 'center' }}>{res.data.other.bq[i].venueid}<br />{res.data.other.bq[i].title}</div>
        res.data.other.bq[i].width = 80
      }
      let ploboj = {
        title: <div>场地号<br />标签</div>,
        fixed: 'left',
        width: 80,
        dataIndex: 'lppd',
      }
      res.data.other.bq.unshift(ploboj)
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, otherType: res.data.other.bq,otherNum:res.data.other.zq, value: 'l', spinningTwo: false, loadingTwo: false, animating: false })


    } else {
      this.setState({ resData: [], animating: false, otherType: [] })
    }
  }


  loodp = (resData) => {
    let jood = []
    for (let i in resData.data) {
      let obj = {}
      for (let j in resData.data[i].c) {
        obj.key = i + 1
        let key = resData.data[i].c[j].venueid
        let value = <div
          data-type={resData.data[i].c[j].type}
          data-time={resData.data[i].a}
          data-num={resData.data[i].c[j].venueid}
          data-uuid={resData.data[i].c[j].uuid}
          onClick={this.lookPlate}
          data-money={resData.data[i].c[j].money}
          data-lo={resData.data[i].a + '-' + resData.data[i].c[j].venueid + '-' + resData.data[i].c[j].money}
          style={resData.data[i].c[j].type === 1 && this.state.lotime.indexOf(resData.data[i].a + '-' + resData.data[i].c[j].venueid + '-' + resData.data[i].c[j].money) === -1 ? { background: '#6FB2FF', height: 40, lineHeight: 3, color: '#fff' } : {} && resData.data[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 40, lineHeight: 3 } : {} && resData.data[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 40, lineHeight: 3 } : {} && resData.data[i].c[j].type === 4 ? { background: 'red', height: 40, lineHeight: 3 } : { background: 'red', height: 40, lineHeight: 3, color: '#fff' }}
        > {resData.data[i].c[j].money}</div>
        obj[key] = value
        let koTwo = parseInt(resData.data[i].a.slice(1, 2)) + 1 + ':00'
        obj.lppd = <div style={{ color: '#F5A623' }}>{resData.data[i].a}<br />{resData.data[i].a.slice(3, resData.data[i].a.length) === '00' ? resData.data[i].a.slice(0, 2) + ':30' : koTwo === '10:00' && resData.data[i].a !== '19:30' ? '10:00' : resData.data[i].a === '19:30' ? '20:00' : resData.data[i].a.slice(0, 1) + koTwo}</div>
      }
      jood.push(obj)
    }
    this.setState({
      lookBan: jood
    })
  }





  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data)
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
    }
  }

  componentDidMount() {
    //测试数据
    // let query = '?siteuid=94da6c9c-8ced-d0e2-d54f-ad690d247134&sportid=1&token=ifMQE9gdvgBJmcXKykRW8QYdQUuuTQfR58OwFRqztJFeRvWmIB8rqufHb73uxDYj&sporttype=5'
    let query = this.props.location.search  


    let arr = query.split('&')
    let siteuid = arr[0].slice(9, arr[0].length)
    let sportid = arr[1].slice(8, arr[1].length)
    let token = arr[2].slice(6, arr[2].length)
    let sporttype = arr[3].slice(10, arr[3].length)
    this.setState({ sportidQuery: sportid, token: token })
    setTimeout(() => {
      this.getAppVenueReservations({ date: '', siteUUID: siteuid, sportid: sportid, sporttype: sporttype })
    }, 500)
    let start = new Date().toLocaleDateString()
    if (start.split('/')[0].length === 4) {
      let yoo = start.split('/')[0] + '/' + start.split('/')[1] + '/' + start.split('/')[2]
      this.setState({ date: yoo, token: token, siteid: siteuid, sportid: sportid, sporttypeTwo: sporttype, start: yoo })
    } else {
      let yoo = start.split('/')[2] + '/' + start.split('/')[0] + '/' + start.split('/')[1]
      this.setState({ date: yoo, token: token, siteid: siteuid, sportid: sportid, sporttypeTwo: sporttype, start: yoo })

    }
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
    this.setState({ show: false, date: e.toLocaleDateString().replace(/\//g, "/"), lotime: '', moneyCall: 0 })
    this.getAppVenueReservations({ date: e.toLocaleDateString().replace(/\//g, "/"), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo })
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
            moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
          }
          this.setState({ moneyCall: moneyCall, lotime: this.state.lotime })
        } else if (this.state.time.sort().indexOf(time) !== -1) {

          this.state.lotime.splice(this.state.time.indexOf(time), 1, time + '-' + num + '-' + money)
          this.setState({ lotime: this.state.lotime })
          let moneyCall = 0
          for (let i in this.state.lotime) {
            moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
          }
          this.setState({ moneyCall: moneyCall })
        } else {
          this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: Number(this.state.moneyCall) + Number(money) })

        }
      } else {
        this.setState({ time: [...this.state.time, time], lotime: [...this.state.lotime, lotime], moneyCall: Number(this.state.moneyCall) + Number(money) })
      }
    }
    setTimeout(() => {
      this.loodp(this.state.resData)
    }, 100)
  }



  async getAPPVenueSelectSite(data) {
    const res = await getAPPVenueSelectSite(data, this.state.token)
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 2, null, false);
    } else {
      var sUserAgent = navigator.userAgent;
      var mobileAgents = ['Android', 'iPhone', 'miniProgram'];
      for (let index = 0; index < mobileAgents.length; index++) {
        if (sUserAgent.indexOf('Android') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
          let objT = JSON.stringify(this.state.obj)
          window.JsAndroid.goTime(objT)

        } else if (sUserAgent.indexOf('iPhone') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
          try {
            window.webkit.messageHandlers.ScanAction.postMessage(this.state.obj)
          } catch (error) {
          }

        } else if (sUserAgent.indexOf('miniProgram') > -1) {
          console.log('执行了')
          //eslint-disable-next-line
          wx.miniProgram.navigateBack({ delta: 1 })
          //eslint-disable-next-line
          wx.miniProgram.postMessage({ data: this.state.obj })
          console.log('执行结束了')
        }
      }
    }
  }



  onSubmit = () => {
    let time = ''
    let num = ''
    for (let i in this.state.lotime.sort()) {
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
          placeTime: time.slice(0, time.length - 1).split(',').sort()[0],
          placeDate: Number(this.state.date.split('/')[0]) > 500 ? this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2] : this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1],
          placeMoney: this.state.moneyCall,
          placeMoneyTwo:this.state.moneyCall/Number(this.state.otherNum),
          placeTimeLen: (time.split(',').length - 1) * 0.5 + '小时'
        }

        this.setState({ obj: obj })
        if (this.state.date.split('/')[0].length === 4) {
          let mood = this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2]
          this.getAPPVenueSelectSite({ startTime: mood + ' ' + time.slice(0, time.length - 1).split(',').sort()[0], playTime: (time.split(',').length - 1) * 0.5, siteUid: this.state.siteid })
        } else {
          let mood = this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1]
          this.getAPPVenueSelectSite({ startTime: mood + ' ' + time.slice(0, time.length - 1).split(',').sort()[0], playTime: (time.split(',').length - 1) * 0.5, siteUid: this.state.siteid })
        }
      }
    } else {
      Toast.fail('请选择场地', 2, null, false);
    }
  }
  dayBefore = e => {
    let myDate = new Date(this.state.date)
    myDate.setDate(myDate.getDate() - 1)
    this.setState({
      date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(),
      lotime: [],
      moneyCall: 0
    })
    this.getAppVenueReservations({ date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo })
  }
  nextDay = e => {
    let myDate = new Date(this.state.date)
    myDate.setDate(myDate.getDate() + 1)
    this.setState({
      date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(),
      lotime: [],
      moneyCall: 0
    })
    this.getAppVenueReservations({ date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo })
  }


  render() {
    return (
      <div className="homepage">
        <ActivityIndicator toast animating={this.state.animating} />

        <div className="kog" style={this.state.animating === true ? { display: 'none' } : { display: 'block' }}>
          <div className="appOrder" onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>
            <div className='bookingKanban'>
              <div className="titleDiv">
                <div className="dayBefore" style={this.state.date === this.state.start ? { display: 'none' } : { display: 'block' }} onTouchStart={this.dayBefore}>前一天</div>
                <div className="nextDay" onTouchStart={this.nextDay}>后一天</div>
                <div className="titleDivTwo" onTouchStart={this.date}>{this.state.date}</div>
              </div>
              <div className="modTitle">

                <span className="blue"></span><span>可选</span>

                <span className="white"></span><span>不可选</span>

                <span className="yellow"></span><span>已占用</span>

                <span className="red"></span><span>已选中</span>
              </div>
              <Table loading={false} style={this.state.otherType.length === 0 ? { display: 'none' } : {}} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 20, y: '93%' }} />,
              <Result
                style={this.state.otherType.length === 0 ? { display: 'block' } : { display: 'none' }}
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
                defaultValue={[new Date(this.state.date)]}
                maxDate={new Date(+now + 31536000000)}
              />
            </div>
            <div className="footerKo">
              <div style={{ float: 'left', lineHeight: '3', marginLeft: '1rem' }}>场地费合计：{this.state.moneyCall.toString().indexOf('.') === -1 ? this.state.moneyCall + '.00' : this.state.moneyCall + '0'}</div>
              <div
                onTouchStart={this.onSubmit}
                style={{ width: '30%', height: '3rem', textAlign: 'center', float: 'right', lineHeight: '2.5', fontSize: '1.2rem', color: '#fff', background: 'rgba(216,93,39,1)' }}>
                确定
           </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default appOrder;
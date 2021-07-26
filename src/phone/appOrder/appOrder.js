import React from 'react';
import './appOrder.css';
import { Calendar, Toast, Icon, ActivityIndicator, NoticeBar, Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Table } from 'antd';
import { getAppVenueReservations, getVenueNumberTitleList, getAPPVenueSelectSite, getRangeOfVenueServiceTime } from '../../api';
import initReactFastclick from 'react-fastclick';
initReactFastclick();
const now = new Date();
const alert = Modal.alert;




class appOrder extends React.Component {

  state = {
    lookList: [],
    macNum: [],
    date: '',
    show: false,
    lastTime: '',
    moneyCall: 0,
    openPrice:0,
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
    flag: '1',
    selectedTwo: [],
    selectId: [],
    moveGo: false,
    StartEndTime: 0,
    week: '',
    durationlimit: 1,
    timeArr: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00'],
    kopl: '我们确保100%留有场地,否则将退还您预付的所有场地费并补偿您：20元（到场签到了）；10元（未到场签到）。',
    modal1: false,
    koploe: '',
    indexKeplo: '1',
    tableShow:true,
  };



  async getAppVenueReservations(data) {
    const res = await getAppVenueReservations(data, this.state.token)
    let dataOne = JSON.stringify(res.data.data)
    let dataTwo = JSON.parse(dataOne)

    if (res.data.code === 2000) {
      if (data.sportid!== '3'&&this.state.sporttypeFive !== '22'&&this.state.sporttypeFive !== '24') {
        let arrty = []
        for (let i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].a.slice(3, 5) === '00') {
            arrty.push(res.data.data[i])
          }
        }
        for (let i in arrty) {
          for (let j in arrty[i].c) {
            arrty[i].c[j].money = arrty[i].c[j].money * 2
            arrty[i].c[j].summoney = Number(arrty[i].c[j].summoney) * 2
            arrty[i].c[j].lr = Number(arrty[i].c[j].lr) * 2
            arrty[i].c[j].pubPrice = Number(arrty[i].c[j].pubPrice) * 2
          }
        }
        res.data.data = arrty
        let ko=[]
        for (let i = 0; i < this.state.timeArr; i++) {
          if (this.state.timeArr[i].slice(3, 5) === '00') {
            ko.push(this.state.timeArr[i])
          }
        }
        this.setState({timeArr:ko})

      }

      

      if (this.state.topNumList.length > 0) {
        for (let j = 0; j < this.state.topNumList.length; j++) {
          if (dataTwo[0].c[this.state.topNumList[j].venueid - 1] !== undefined) {
            dataTwo[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
            dataTwo[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
          }
        }
      }



      if (this.state.sporttypeFive === '10') {
        let arrVen = []
        for (let i in res.data.other.bq) {
          arrVen.push(parseInt(res.data.other.bq[i].venueid))
        }


        let newArr = [];
        for (let i = 0; i < arrVen.length; i++) {
          if (newArr.indexOf(arrVen[i]) === -1) {
            newArr.push(arrVen[i])
          }
        }
        let newarr2 = new Array(newArr.length);
        for (let t = 0; t < newarr2.length; t++) {
          newarr2[t] = 0;
        }
        for (let p = 0; p < newArr.length; p++) {
          for (let j = 0; j < arrVen.length; j++) {
            if (newArr[p] === arrVen[j]) {
              newarr2[p]++;
            }
          }
        }
      }

      let arrTime = []
      for (let i in res.data.data) {
        arrTime.push(res.data.data[i].a)
      }
      let ko = ''
      if (new Date().getMinutes() >= 30) {
        ko = new Date().getHours() + ':30'
      } else {
        ko = new Date().getHours() + ':00'
      }
      if (new Date().getDate() === Number(this.state.date.split('/')[2])) {
        setTimeout(() => {
          if (document.querySelector('.ant-table-body') !== null) {
            document.querySelector('.ant-table-body').scrollTo(0, arrTime.indexOf(ko) * 48)
          }
        }, 50)
      } else {
        setTimeout(() => {
          if (document.querySelector('.ant-table-body') !== null) {
            document.querySelector('.ant-table-body').scrollTo(0, 0)
          }
        }, 50)
      }


      this.setState({
        resData: res.data
      })

      this.loodp(this.state.resData)

      for (let i in res.data.other.bq) {
        res.data.other.bq[i].dataIndex = res.data.other.bq[i].venueid
        res.data.other.bq[i].title = <div className="titleScale" onClick={this.titleDetails} data-title={res.data.other.bq[i].com} style={{ textAlign: 'center', fontSize: '10px' }}>{res.data.other.bq[i].venueid}<br />{res.data.other.bq[i].title}</div>
        res.data.other.bq[i].width = 54
        res.data.other.bq[i].maxWidth = 54
      }
      let ploboj = {
        title: <div style={{ fontSize: '10px' }}>场地号<br />标签</div>,
        fixed: 'left',
        width: 54,
        maxWidth: 54,
        dataIndex: 'lppd',
      }
      res.data.other.bq.unshift(ploboj)
      this.setState({ lookList: res.data.data, durationlimit: res.data.data[0].c[0].durationlimit, macNum: res.data.data[0].c, otherType: res.data.other.bq, value: 'l', spinningTwo: false, loadingTwo: false, animating: false,tableShow:false })
    } else {
      this.setState({ resData: [], animating: false, otherType: []})
    }
  }

  titleDetails = e => {
    alert('标签描述', <div>{e.currentTarget.dataset.title === '' ? '暂无' : e.currentTarget.dataset.title}</div>, [
      { text: '确定', onPress: () => console.log() },
    ])
  }



  onStart = e => {
    this.setState({ StartEndTime: e.timeStamp })
  }

  loodp = (resData) => {

    let kopAd = this.state.lotime
    let arr = []
    for (let i in kopAd) {
      let obj = {}
      obj.time = kopAd[i].split('-')[0]
      obj.num = kopAd[i].split('-')[1]
      arr.push(obj)
    }

    let result = {};

    for (let i in arr) {
      if (result[arr[i].time]) {
        result[arr[i].time] = Number(result[arr[i].time]) + 1;
      } else {
        result[arr[i].time] = 1;
      }
    }
    let keyvalue = []
    for (let i in result) {
      let obj = {}
      obj.name = i
      obj.num = result[i]
      keyvalue.push(obj)
    }

    let jood = []
    for (let i in resData.data) {
      let obj = {}
      for (let j in resData.data[i].c) {
        obj.key = i + 1
        let key = resData.data[i].c[j].venueid
        let value = <div
          data-type={resData.data[i].c[j].type}
          data-time={resData.data[i].a}
          className={'div' + resData.data[i].a.replace(':', '')}
          data-num={j}
          data-venueid={resData.data[i].c[j].venueid}
          data-uuid={resData.data[i].c[j].uuid}
          data-pubprice={resData.data[i].c[j].pubPrice}
          onTouchStart={this.onStart}
          data-index={j}
          data-lr={resData.data[i].c[j].lr}
          onTouchEnd={resData.data[i].c[j].type === 1 ? this.state.flag === '1' ? this.state.sporttypeFive === '10' ? this.lookPlateFive : this.lookPlateTwo : this.state.sporttypeFive === '10' ? this.lookPlateFive : this.lookPlate : this.asfsdhngfju}
          data-money={resData.data[i].c[j].money}
          data-timelimit={resData.data[i].c[j].timelimit}
          data-summoney={resData.data[i].c[j].summoney}
          data-lo={resData.data[i].a + '-' + resData.data[i].c[j].venueid + '-' + resData.data[i].c[j].money + '-' + resData.data[i].c[j].summoney + '-' + resData.data[i].c[j].timelimit+'-'+resData.data[i].c[j].lr+'-'+resData.data[i].c[j].pubPrice}
          style={resData.data[i].c[j].type === 1
            && this.state.lotime.indexOf(resData.data[i].a + '-' + resData.data[i].c[j].venueid + '-' + resData.data[i].c[j].money + '-' + resData.data[i].c[j].summoney + '-' + resData.data[i].c[j].timelimit) === -1 ? { background: '#6FB2FF', height: 40, lineHeight: 3, color: '#fff' } : {}
              && resData.data[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 40, lineHeight: 3 } : {}
                && resData.data[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 40, lineHeight: 3 } : {}
                  && resData.data[i].c[j].type === 4 ? { background: 'red', height: 40, lineHeight: 3 } : { background: 'red', height: 40, lineHeight: 3, color: '#fff' }}
        > <span>{'￥' + resData.data[i].c[j].money}{this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? '' : ''}</span><span>{resData.data[i].c[j].priceunit}</span></div>
        if (resData.data[i].c[j].type === 3) {
          this.setState({ selectedTwo: [...this.state.selectedTwo, resData.data[i].a + '-' + resData.data[i].c[j].venueid + '-' + resData.data[i].c[j].money + '-' + resData.data[i].c[j].summoney] })
        }
        obj[key] = value
      }
      let lo = resData.data[i].a
      let resuLo = ''
      if (result.hasOwnProperty(lo)) {
        resuLo = result[lo]
      }
      obj.lppd = this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? <div>
        <div className="btnAutoi" style={result.hasOwnProperty(lo) ? { display: 'block' } : { display: 'none' }}>{resData.data[i].a === lo ? resuLo : ''}</div></div>
        : <div>
          <div style={i !== '0' ? { color: '#F5A623', marginTop: '-1.4rem' } : { color: '#F5A623' }}>{resData.data[i].a}
            <div style={resData.data[resData.data.length - 1].a === resData.data[i].a ? { width: '100%', position: 'absolute', bottom: '-1rem', textAlign: 'center' } : { display: 'none' }}>
              {resData.data[resData.data.length - 1].a === '23:30' ? '24:00' :
              this.state.sportidQuery==='3'? resData.data[resData.data.length - 1].a.slice(3, 5) === '00' ? Number(resData.data[resData.data.length - 1].a.slice(0, 2)) + ':30' : Number(resData.data[resData.data.length - 1].a.slice(0, 2)) + 1 + ':00':
              resData.data[resData.data.length - 1].a.slice(3, 5) === '00' ? Number(resData.data[resData.data.length - 1].a.slice(0, 2)) + 1 + ':00' : Number(resData.data[resData.data.length - 1].a.slice(0, 2)) + 1 + ':00'}
            </div></div><div className="btnAutoi" style={result.hasOwnProperty(lo) ? { opacity: 1 } : { opacity: 0 }}>{resData.data[i].a === lo ? resuLo : ''}</div></div>
      jood.push(obj)
    }
    this.setState({
      lookBan: jood
    })


    for (let i in resData.data) {
      let ho = document.querySelectorAll('.div' + resData.data[i].a.replace(':', ''))
      for (let i in ho) {
        if (ho[i].style !== undefined && ho[i].dataset.type === '1') {
          ho[i].style.backgroundColor = '#6FB2FF'
        }
      }
    }
  }








  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data)
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
    }
  }

  async getRangeOfVenueServiceTime(data) {
    const res = await getRangeOfVenueServiceTime(data)
    if (res.data.code === 2000) {
      this.setState({ koploe: res.data.data[0] })
    }
  }


  componentDidMount() {
    //测试数据
    // let query = '?siteuid=94da6c9c-8ced-d0e2-d54f-ad690d247134&sportid=4&token=jopZA3czKf5Qw7PBoidM5hXIcGynQL9rEKpYSAsTGTlelJMHWfOW0ezUEM2s5MQf&sporttype=12&flag=1'
    let query = this.props.location.search
    let arr = query.split('&')
    let siteuid = arr[0].slice(9, arr[0].length)
    let sportid = arr[1].slice(8, arr[1].length)
    let token = arr[2].slice(6, arr[2].length)
    let sporttype = arr[3].slice(10, arr[3].length)
    this.setState({ flag: arr[4].slice(5, arr[4].length), sporttypeFive: sporttype })
    this.setState({ sportidQuery: sportid, token: token })

    setTimeout(() => {
      this.getAppVenueReservations({ date: '', siteUUID: siteuid, sportid: sportid, sporttype: sporttype,flag:arr[4].slice(5, arr[4].length) })
      this.getRangeOfVenueServiceTime({ siteUUID: siteuid, sportid: sportid, sporttype: sporttype })
    }, 500)

    let start = new Date().toLocaleDateString()
    if (start.split('/')[0].length === 4) {
      let yoo = start.split('/')[0] + '/' + start.split('/')[1] + '/' + start.split('/')[2]
      let mydate = new Date();
      let myddy = mydate.getDay()
      let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.setState({ date: yoo, week: week[myddy], token: token, siteid: siteuid, sportid: sportid, sporttypeTwo: sporttype, start: yoo })
    } else {
      let mydate = new Date()
      let myddy = mydate.getDay()
      let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      let yoo = start.split('/')[2] + '/' + start.split('/')[0] + '/' + start.split('/')[1]
      this.setState({ date: yoo, week: week[myddy], token: token, siteid: siteuid, sportid: sportid, sporttypeTwo: sporttype, start: yoo })
    }

    setInterval(() => {
      this.setState({ kopl: this.state.kopl + '我们确保100%留有场地,否则将退还您预付的所有场地费并补偿您：20元（到场签到了）；10元（未到场签到）。' })
    }, 8000);
  }



  scroll = () => {
    let scrollTop = this.scrollRef.scrollTop;
    let scrollLeft = this.scrollRef.scrollLeft;
    this.setState({ left: scrollLeft, top: scrollTop })
  }


  date = () => {
    this.setState({ show: true })
  }

  onConfirm = (e) => {
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.setState({ show: false, date: e.toLocaleDateString().replace(/\//g, "/"), week: week[e.getDay()], lotime: '',openPrice:0, moneyCall: 0,tableShow:true })
    this.getAppVenueReservations({ date: e.toLocaleDateString().replace(/\//g, "/"), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo,flag:this.state.flag })
  }

  onCancel = () => {
    this.setState({ show: false })
  }

  lookPlateTwo = e => {
    if (e.timeStamp - this.state.StartEndTime > 150) {
      return false
    }

    let money = e.currentTarget.dataset.money
    let time = e.currentTarget.dataset.time
    let lotime = e.currentTarget.dataset.lo
    let pubPrice=e.currentTarget.dataset.pubprice
    if (e.currentTarget.style.backgroundColor === 'red') {
      e.currentTarget.style.backgroundColor = '#6FB2FF'
    } else {
      e.currentTarget.style.backgroundColor = 'red'
    }


    if (e.currentTarget.dataset.type === '1') {

      if (this.state.lotime.indexOf(lotime) !== -1) {
        console.log(this.state.lotime)
        this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
        this.state.time.splice(this.state.time.indexOf(time), 1)
        let moneyCall = 0
        let openPrice=0
        for (let i in this.state.lotime) {
          moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
        }
        for (let i in this.state.lotime) {
          openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
        }
        this.setState({ moneyCall: moneyCall, lotime: this.state.lotime,openPrice:openPrice })
      } else {
        let pop = (Number(this.state.moneyCall) + Number(money)).toString()
        if (pop.indexOf('.') !== -1) {
          pop = Number(pop.slice(0, pop.indexOf('.'))) + 1
        }
        let popTwo = (Number(this.state.openPrice) + Number(pubPrice)).toString()
        if (popTwo.indexOf('.') !== -1) {
          popTwo = Number(popTwo.slice(0, popTwo.indexOf('.'))) + 1
        }
        this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: pop,openPrice:popTwo })
      }

    }


  }


  lookPlate = e => {
    if (e.timeStamp - this.state.StartEndTime > 150) {
      return false
    }

    let money = e.currentTarget.dataset.money
    let summoney = e.currentTarget.dataset.summoney
    let time = e.currentTarget.dataset.time
    let venueid=e.currentTarget.dataset.venueid
    let lotime = e.currentTarget.dataset.lo
    let timelimit = e.currentTarget.dataset.timelimit
    let pubPrice=e.currentTarget.dataset.pubprice
    let lr=e.currentTarget.dataset.lr

    if (this.state.moneyCall === 0 && timelimit === '2' && time.indexOf('30') !== -1) {
      Toast.fail('请选择整点场地', 2, null, false);
      return false
    } else if (this.state.moneyCall === 0 && timelimit === '3' && time.indexOf('30') !== -1) {
      Toast.fail('请选择单数整点场地', 2, null, false);
      return false
    } else if (this.state.moneyCall === 0 && timelimit === '3' && Number(time.slice(0, 2)) % 2 === 0) {
      Toast.fail('请选择单数整点场地', 2, null, false);
      return false
    } else if (this.state.moneyCall === 0 && timelimit === '4' && time.indexOf('30') !== -1) {
      Toast.fail('请选择双数整点场地', 2, null, false);
      return false
    } else if (this.state.moneyCall === 0 && timelimit === '4' && Number(time.slice(0, 2)) % 2 !== 0) {
      Toast.fail('请选择双数整点场地', 2, null, false);
      return false
    }

    let ho = document.querySelectorAll('.div' + e.currentTarget.dataset.time.replace(':', ''))
    if (ho[e.currentTarget.dataset.index].style.backgroundColor !== 'red') {
      for (let i in ho) {
        if (ho[i].style!== undefined) {
          if (ho[i].style.backgroundColor === 'red') {
            ho[i].style.backgroundColor = '#6FB2FF'
          }
        }
      }
    }

    if (e.currentTarget.style.backgroundColor === 'red') {
      e.currentTarget.style.backgroundColor = "#6FB2FF"
    } else {
      e.currentTarget.style.backgroundColor = "red"
    }


 
    if (e.currentTarget.dataset.type === '1') {
      if (this.state.lotime.indexOf(lotime) !== -1) {
        this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
        this.state.time.splice(this.state.time.indexOf(time), 1)
        let moneyCall = 0
        let openPrice=0
        for (let i in this.state.lotime) {
          moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
        }
        for (let i in this.state.lotime) {
          openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
        }
        this.setState({ moneyCall: moneyCall,openPrice:openPrice, lotime: this.state.lotime })
      } else if (this.state.time.sort().indexOf(time) !== -1) {
        this.state.lotime.sort().splice(this.state.time.indexOf(time), 1, time + '-' + venueid + '-' + money + '-' + summoney + '-' + timelimit + '-' + lr + '-' + pubPrice)
        
        this.setState({ lotime: this.state.lotime })
        let moneyCall = 0
        let openPrice=0
        for (let i in this.state.lotime) {
          moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
        }
        for (let i in this.state.lotime) {
          openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
        }
        this.setState({ moneyCall: moneyCall,openPrice:openPrice })
      } else {
        let pop = (Number(this.state.moneyCall) + Number(money)).toString()
        if (pop.indexOf('.') !== -1) {
          pop = Number(pop.slice(0, pop.indexOf('.'))) + 1
        }

        let popTwo = (Number(this.state.openPrice) + Number(pubPrice)).toString()
        if (popTwo.indexOf('.') !== -1) {
          popTwo = Number(popTwo.slice(0, popTwo.indexOf('.'))) + 1
        }
        this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: pop,openPrice:popTwo })
      }

    }



  }





  lookPlateFive = e => {

    if (e.timeStamp - this.state.StartEndTime > 150) {
      return false
    }

    let money = e.currentTarget.dataset.money
    let summoney = e.currentTarget.dataset.summoney
    let time = e.currentTarget.dataset.time
    let venueid = e.currentTarget.dataset.venueid
    let lotime = e.currentTarget.dataset.lo
    let timelimit = e.currentTarget.dataset.timelimit
    let pubPrice=e.currentTarget.dataset.pubprice
    let lr=e.currentTarget.dataset.lr


    if (this.state.flag === '1') {
      if (this.state.moneyCall === 0 && timelimit === '2' && time.indexOf('30') !== -1) {
        Toast.fail('请选择整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '3' && time.indexOf('30') !== -1) {
        Toast.fail('请选择单数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '3' && Number(time.slice(0, 2)) % 2 === 0) {
        Toast.fail('请选择单数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '4' && time.indexOf('30') !== -1) {
        Toast.fail('请选择双数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '4' && Number(time.slice(0, 2)) % 2 !== 0) {
        Toast.fail('请选择双数整点场地', 2, null, false);
        return false
      }

      if (e.currentTarget.style.backgroundColor === 'red') {
        e.currentTarget.style.backgroundColor = '#6FB2FF'
      } else {
        e.currentTarget.style.backgroundColor = 'red'
      }


      if (e.currentTarget.dataset.type === '1') {
        if (this.state.lotime.indexOf(lotime) !== -1) {
          this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
          this.state.time.splice(this.state.time.indexOf(time), 1)
          let moneyCall = 0
          let openPrice=0
          for (let i in this.state.lotime) {
            moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
          }
          for (let i in this.state.lotime) {
            openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
          }
          this.setState({ moneyCall: moneyCall,openPrice:openPrice, lotime: this.state.lotime })
        } else {
          let pop = (Number(this.state.moneyCall) + Number(money)).toString()
          if (pop.indexOf('.') !== -1) {
            pop = Number(pop.slice(0, pop.indexOf('.'))) + 1
          }
          let popTwo = (Number(this.state.openPrice) + Number(pubPrice)).toString()
          if (popTwo.indexOf('.') !== -1) {
            popTwo = Number(popTwo.slice(0, popTwo.indexOf('.'))) + 1
          }
          this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: pop,openPrice:popTwo })
        }

      }

    } else {
      if (this.state.moneyCall === 0 && timelimit === '2' && time.indexOf('30') !== -1) {
        Toast.fail('请选择整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '3' && time.indexOf('30') !== -1) {
        Toast.fail('请选择单数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '3' && Number(time.slice(0, 2)) % 2 === 0) {
        Toast.fail('请选择单数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '4' && time.indexOf('30') !== -1) {
        Toast.fail('请选择双数整点场地', 2, null, false);
        return false
      } else if (this.state.moneyCall === 0 && timelimit === '4' && Number(time.slice(0, 2)) % 2 !== 0) {
        Toast.fail('请选择双数整点场地', 2, null, false);
        return false
      }

      let ho = document.querySelectorAll('.div' + e.currentTarget.dataset.time.replace(':', ''))
      if (ho[Number(e.currentTarget.dataset.num)].style.backgroundColor !== 'red') {
        for (let i in ho) {
          if (ho[i].style !== undefined) {
            if (ho[i].style.backgroundColor === 'red') {
              ho[i].style.backgroundColor = '#6FB2FF'
            }
          }
        }
      }



      if (e.currentTarget.style.backgroundColor === 'red') {
        e.currentTarget.style.backgroundColor = "#6FB2FF"
      } else {
        e.currentTarget.style.backgroundColor = "red"
      }

      if (e.currentTarget.dataset.type === '1') {
        if (this.state.lotime.length > 0) {
          if (this.state.lotime.indexOf(lotime) !== -1) {
            this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
            this.state.time.splice(this.state.time.indexOf(time), 1)
            let moneyCall = 0
            let openPrice=0
            for (let i in this.state.lotime) {
              moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
            }
            for (let i in this.state.lotime) {
              openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
            }
            this.setState({ moneyCall: moneyCall,openPrice:openPrice, lotime: this.state.lotime })
          } else if (this.state.time.sort().indexOf(time) !== -1) {


            let lo = this.state.lotime.sort()
            lo.splice(this.state.time.indexOf(time), 1, time + '-' + venueid + '-' + money + '-' + summoney + '-' + timelimit+'-'+lr+'-'+pubPrice)
            this.setState({ lotime: lo })

            this.setState({ lotime: this.state.lotime })
            let moneyCall = 0
            let openPrice=0
            for (let i in this.state.lotime) {
              moneyCall = moneyCall + Number(this.state.lotime[i].split('-')[2])
            }
            for (let i in this.state.lotime) {
              openPrice = openPrice + Number(this.state.lotime[i].split('-')[6])
            }
            this.setState({ moneyCall: moneyCall,openPrice:openPrice })
          } else {
            let pop = (Number(this.state.moneyCall) + Number(money)).toString()
            if (pop.indexOf('.') !== -1) {
              pop = Number(pop.slice(0, pop.indexOf('.'))) + 1
            }
            let popTwo = (Number(this.state.openPrice) + Number(pubPrice)).toString()
            if (popTwo.indexOf('.') !== -1) {
              popTwo = Number(popTwo.slice(0, popTwo.indexOf('.'))) + 1
            }
            this.setState({ lotime: [...this.state.lotime, lotime], time: [...this.state.time, time], moneyCall: pop,openPrice:popTwo })
          }
        } else {
          let pop = (Number(this.state.moneyCall) + Number(money)).toString()
          if (pop.indexOf('.') !== -1) {
            pop = Number(pop.slice(0, pop.indexOf('.'))) + 1
          }
          let popTwo = (Number(this.state.openPrice) + Number(pubPrice)).toString()
            if (popTwo.indexOf('.') !== -1) {
              popTwo = Number(popTwo.slice(0, popTwo.indexOf('.'))) + 1
            }
          this.setState({ time: [...this.state.time, time], lotime: [...this.state.lotime, lotime], moneyCall: pop,openPrice:popTwo })
        }
      }
    }




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
          return false
        } else if (sUserAgent.indexOf('iPhone') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
          try {
            window.webkit.messageHandlers.ScanAction.postMessage(this.state.obj)
          } catch (error) {
          }
          return false
        } else if (sUserAgent.indexOf('miniProgram') > -1) {
          console.log('执行了')
          //eslint-disable-next-line
          wx.miniProgram.navigateBack({ delta: 1 })
          //eslint-disable-next-line
          wx.miniProgram.postMessage({ data: this.state.obj })
          console.log('执行结束了')
          return false
        }
      }
    }
  }



  onSubmit = () => {
    let time = ''
    let num = ''
    let original = 0
    let lr=0
    if (this.state.flag === '1') {

      for (let i in this.state.lotime.sort()) {
        original += Number(this.state.lotime[i].split('-')[3])
        lr+=Number(this.state.lotime[i].split('-')[5])
      }
      if (this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24') {
        let kopAd = this.state.lotime.sort()
        let kop = []
        for (let i in kopAd) {
          kop.push(kopAd[i].slice(6, kopAd[i].length))
        }
        let arr = []
        for (let i in kopAd) {
          time += kop[i].split('-')[0] + ','
          let obj = {}
          obj.time = kop[i].split('-')[0]
          obj.num = kop[i].split('-')[1]
          obj.numTwo = kop[i].split('-')[2]
          arr.push(obj)
        }
        let result = {};
        for (let i in arr) {
          if (result[arr[i].time]) {
            result[arr[i].time] += '-' + arr[i].num + '-' + arr[i].numTwo;
          } else {
            result[arr[i].time] = arr[i].num + '-' + arr[i].numTwo;
          }
        }
        let numNa = Object.keys(result)
        let ccj = []
        for (let i in numNa) {
          ccj.push(numNa[i] + '-' + result[numNa[i]].split('-').length / 2 + '-' + result[numNa[i]].split('-')[0] + '-' + result[numNa[i]].split('-')[result[numNa[i]].split('-').length - 1])
        }

           
        let obj = {
          placeNun: numNa.join('-'),
          placeTime: '00:00:00',
          placeDate: Number(this.state.date.split('/')[0]) > 500 ? this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2] : this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1],
          placeMoney: this.state.moneyCall,
          placeMoneyTwo: original,
          placeTimeLen: this.state.sportidQuery === '3' ? this.state.lotime.length * 0.5 + '小时' : this.state.lotime.length * 1 + '小时',
          breakup: ccj.join(','),
          realData: '',
          lr:lr,
          openPrice:this.state.openPrice
        }
        console.log(obj)
        if (obj.placeNun === '') {
          Toast.fail('请选择场地', 2, null, false);
        } else {
          this.setState({ obj: obj })
          let sUserAgent = navigator.userAgent;
          let mobileAgents = ['Android', 'iPhone', 'miniProgram'];
          for (let index = 0; index < mobileAgents.length; index++) {
            if (sUserAgent.indexOf('Android') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              let objT = JSON.stringify(obj)
              window.JsAndroid.goTime(objT)
              return false
            } else if (sUserAgent.indexOf('iPhone') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              try {
                window.webkit.messageHandlers.ScanAction.postMessage(obj)
              } catch (error) {
                console.log(error)
              }
              return false
            } else if (sUserAgent.indexOf('miniProgram') > -1) {
              console.log('执行了')
              //eslint-disable-next-line
              wx.miniProgram.navigateBack({ delta: 1 })
              //eslint-disable-next-line
              wx.miniProgram.postMessage({ data: obj })
              console.log('执行结束了')
              return false
            }
          }
        }




      } else if (this.state.sporttypeFive === '10') {
        let lr=0
        let kopAd = this.state.lotime.sort()
        let arr = []
        for (let i in kopAd) {
          time += kopAd[i].split('-')[0] + ','
          lr+=Number(kopAd[i].split('-')[5])
          let obj = {}
          obj.time = kopAd[i].split('-')[0]
          obj.num = kopAd[i].split('-')[1]
          arr.push(obj)
        }

        let result = {};

        for (let i in arr) {
          if (result[arr[i].time]) {
            result[arr[i].time] += '-' + arr[i].num;
          } else {
            result[arr[i].time] = arr[i].num;
          }
        }

        let keyvalue = [];
        for (let key in result) {
          keyvalue.push(result[key])
        }

        let youhood = time.slice(0, time.length - 1).split(',').sort()
        let s1 = new Date(this.state.date.replace(/-/g, "/") + ' ' + youhood[youhood.length - 1])
        let s2 = new Date(this.state.date.replace(/-/g, "/") + ' ' + youhood[0])
        let longTime = (Number(s1) - Number(s2)) / 1000 / 60 / 30 + 1
        let timeOne = time.slice(0, time.length - 1).split(',')[0]
        let arrTime = this.state.timeArr.slice(this.state.timeArr.indexOf(timeOne), this.state.timeArr.indexOf(timeOne) + longTime)

        for (let i in arrTime) {
          if (youhood.indexOf(arrTime[i]) === -1) {
            keyvalue.splice(Number(i), 0, '')
          }
        }

        let arrGo = []
        for (let i in keyvalue) {
          if (keyvalue[i] !== '') {
            arrGo.push(keyvalue[i])
          }
        }

        let obj = {
          placeNun: keyvalue.join(','),
          placeTime: time.slice(0, time.length - 1).split(',').sort()[0],
          placeDate: Number(this.state.date.split('/')[0]) > 500 ? this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2] : this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1],
          placeMoney: this.state.moneyCall,
          placeMoneyTwo: original,
          placeTimeLen: this.state.sportidQuery === '3' ? longTime * 0.5 + '小时' : longTime * 1 + '小时',
          breakup: '',
          realData: this.state.sportidQuery === '3' ? arrGo.length * 0.5 + '小时' : arrGo.length * 1 + '小时',
          lr:lr,
          openPrice:this.state.openPrice
        }
        console.log(obj)
        let timelimit = this.state.lotime.sort()[0].split('-')[4]
        let timeTwo = this.state.lotime.sort()[0].split('-')[0]
        this.setState({ obj: obj })
        if (obj.placeNun === '') {
          Toast.fail('请选择场地', 2, null, false)
        } else if (timelimit === '2' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为整点场地', 2, null, false);
        } else if (timelimit === '3' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '3' && Number(timeTwo.slice(0, 2)) % 2 === 0) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '4' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (timelimit === '4' && Number(timeTwo.slice(0, 2)) % 2 !== 0) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (this.state.sportidQuery==='3'&&this.state.durationlimit === 1 && this.state.lotime.length < 2) {
          let durationlimit = '最少选择1小时以上场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'&&this.state.durationlimit === 2 && this.state.lotime.length % 2 === 1) {
          let durationlimit = '请选择1小时整数倍场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'?this.state.durationlimit === 3 && this.state.lotime.length / 2 % 2 !== 0:this.state.durationlimit === 3 && this.state.lotime.length % 2 !== 0) {
          let durationlimit = '请选择2小时整数倍场地 '
          Toast.fail(durationlimit, 2, null, false);
        } else {
          let sUserAgent = navigator.userAgent
          let mobileAgents = ['Android', 'iPhone', 'miniProgram'];
          for (let index = 0; index < mobileAgents.length; index++) {
            if (sUserAgent.indexOf('Android') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              let objT = JSON.stringify(obj)
              window.JsAndroid.goTime(objT)
              return false
            } else if (sUserAgent.indexOf('iPhone') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              try {
                window.webkit.messageHandlers.ScanAction.postMessage(obj)
              } catch (error) {
              }
              return false
            } else if (sUserAgent.indexOf('miniProgram') > -1) {
              console.log('执行了')
              //eslint-disable-next-line
              wx.miniProgram.navigateBack({ delta: 1 })
              //eslint-disable-next-line
              wx.miniProgram.postMessage({ data: obj })
              console.log('执行结束了')
              return false
            }
          }
        }


      } else {
        let kopAd = this.state.lotime.sort()
        let arr = []
        let lr=0
        for (let i in kopAd) {
          time += kopAd[i].split('-')[0] + ','
          lr+=Number(kopAd[i].split('-')[5])
          let obj = {}
          obj.time = kopAd[i].split('-')[0]
          obj.num = kopAd[i].split('-')[1]
          arr.push(obj)
        }

        let result = {};

        for (let i in arr) {
          if (result[arr[i].time]) {
            result[arr[i].time] += '-' + arr[i].num;
          } else {
            result[arr[i].time] = arr[i].num;
          }
        }

        let keyvalue = []
        for (let key in result) {
          keyvalue.push(result[key])
        }




        let youhood = time.slice(0, time.length - 1).split(',')
        let s1 = new Date(this.state.date.replace(/-/g, "/") + ' ' + youhood[youhood.length - 1])
        let s2 = new Date(this.state.date.replace(/-/g, "/") + ' ' + youhood[0])

        let longTime =this.state.sportidQuery === '3'?(Number(s1) - Number(s2)) / 1000 / 60 / 30 + 1:(Number(s1) - Number(s2)) / 1000 / 60 / 60 + 1
        let timeOne = time.slice(0, time.length - 1).split(',')[0]
        let arrTime = this.state.timeArr.slice(this.state.timeArr.indexOf(timeOne), this.state.timeArr.indexOf(timeOne) + longTime)
         
        for (let i in arrTime) {
          if (youhood.indexOf(arrTime[i]) === -1) {
            keyvalue.splice(Number(i), 0, '')
          }
        }
        let arrGo = []
        for (let i in keyvalue) {
          if (keyvalue[i] !== '') {
            arrGo.push(keyvalue[i])
          }
        }
        
         let plo=Array.from(new Set(time.split(',')))
        let obj = {
          placeNun: keyvalue.join(','),
          placeTime: time.slice(0, time.length - 1).split(',').sort()[0],
          placeDate: Number(this.state.date.split('/')[0]) > 500 ? this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2] : this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1],
          placeMoney: this.state.moneyCall,
          placeMoneyTwo: original,
          placeTimeLen: this.state.sportidQuery === '3' ? longTime * 0.5 + '小时' : longTime * 1 + '小时',
          breakup: '',
          realData: this.state.sportidQuery === '3' ? arrGo.length * 0.5 + '小时' : arrGo.length * 1 + '小时',
          lr:lr,
          openPrice:this.state.openPrice,
          tPoint:plo.join(','),
        }
        console.log(obj)
        let timelimit = this.state.lotime.sort()[0].split('-')[4]
        let timeTwo = this.state.lotime.sort()[0].split('-')[0]
        if (obj.placeNun === '') {
          Toast.fail('请选择场地', 2, null, false);
        } else if (timelimit === '2' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为整点场地', 2, null, false);
        } else if (timelimit === '3' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '3' && Number(timeTwo.slice(0, 2)) % 2 === 0) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '4' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (timelimit === '4' && Number(timeTwo.slice(0, 2)) % 2 !== 0) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (this.state.sportidQuery==='3'&&this.state.durationlimit === 1 && this.state.lotime.length < 2) {
          let durationlimit = '最少选择1小时以上场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'&&this.state.durationlimit === 2 && this.state.lotime.length / 2 % 2 !== 1 && this.state.lotime.length / 2 % 2 !== 0) {
          let durationlimit = '请选择1小时整数倍场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'?this.state.durationlimit === 3 && this.state.lotime.length / 2 % 2 !== 0:this.state.durationlimit === 3 && this.state.lotime.length % 2 !== 0) {
          let durationlimit = '请选择2小时整数倍场地 '
          Toast.fail(durationlimit, 2, null, false);
        } else {
          var sUserAgent = navigator.userAgent;
          var mobileAgents = ['Android', 'iPhone', 'miniProgram'];
          for (let index = 0; index < mobileAgents.length; index++) {
            if (sUserAgent.indexOf('Android') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              let objT = JSON.stringify(obj)
              window.JsAndroid.goTime(objT)
              return false
            } else if (sUserAgent.indexOf('iPhone') > -1 && sUserAgent.indexOf('miniProgram') === -1) {
              try {
                window.webkit.messageHandlers.ScanAction.postMessage(obj)
              } catch (error) {
              }
              return false
            } else if (sUserAgent.indexOf('miniProgram') > -1) {
              console.log('执行了')
              //eslint-disable-next-line
              wx.miniProgram.navigateBack({ delta: 1 })
              //eslint-disable-next-line
              wx.miniProgram.postMessage({ data: obj })
              console.log('执行结束了')
              return false
            }
          }
        }

      }

    } else {
      let lr=0
      for (let i in this.state.lotime.sort()) {
        num += this.state.lotime[i].split('-')[1] + ','
        time += this.state.lotime[i].split('-')[0] + ','
        original += Number(this.state.lotime[i].split('-')[3])
        lr+=Number(this.state.lotime[i].split('-')[5])
      }
      let timelimit = this.state.lotime.sort()[0].split('-')[4]
      let timeTwo = this.state.lotime.sort()[0].split('-')[0]
      if (this.state.lotime.length > 0) {
        let s1 = new Date(this.state.date.replace(/-/g, "/") + ' ' + time.slice(0, time.length - 1).split(',').sort()[this.state.lotime.length - 1])
        let s2 = new Date(this.state.date.replace(/-/g, "/") + ' ' + time.slice(0, time.length - 1).split(',').sort()[0])
        if (this.state.sportidQuery === '3' ? (Number(s1) - Number(s2)) / 1000 / 60 / 30 + 1 !== this.state.lotime.length && this.state.flag !== '1' : (Number(s1) - Number(s2)) / 1000 / 60 / 60 + 1 !== this.state.lotime.length && this.state.flag !== '1') {
          Toast.fail('时间必须连贯', 2, null, false);
        } else if (timelimit === '2' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为整点场地', 2, null, false);
        } else if (timelimit === '3' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '3' && Number(timeTwo.slice(0, 2)) % 2 === 0) {
          Toast.fail('请选择开始时间为单数整点场地', 2, null, false);
        } else if (timelimit === '4' && timeTwo.indexOf('30') !== -1) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (timelimit === '4' && Number(timeTwo.slice(0, 2)) % 2 !== 0) {
          Toast.fail('请选择开始时间为双数整点场地', 2, null, false);
        } else if (this.state.sportidQuery==='3'&&this.state.durationlimit === 1 && this.state.lotime.length < 2) {
          let durationlimit = '最少选择1小时以上场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'&&this.state.durationlimit === 2 && this.state.lotime.length / 2 % 2 !== 1 && this.state.lotime.length / 2 % 2 !== 0) {
          let durationlimit = '请选择1小时整数倍场地'
          Toast.fail(durationlimit, 2, null, false);
        } else if (this.state.sportidQuery === '3'?this.state.durationlimit === 3 && this.state.lotime.length / 2 % 2 !== 0:this.state.durationlimit === 3 && this.state.lotime.length % 2 !== 0) {
          let durationlimit = '请选择2小时整数倍场地'
          Toast.fail(durationlimit, 2, null, false);
        } else {
          let obj = {
            placeNun: num,
            placeTime: time.slice(0, time.length - 1).split(',').sort()[0],
            placeDate: Number(this.state.date.split('/')[0]) > 500 ? this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2] : this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1],
            placeMoney: this.state.moneyCall,
            placeMoneyTwo: original,
            placeTimeLen:this.state.sportidQuery === '3'?(time.split(',').length - 1) * 0.5 + '小时':(time.split(',').length - 1) * 1 + '小时',
            breakup: '',
            realData: '',
            lr:lr,
            openPrice:this.state.openPrice
          }
          console.log(this.state.lotime)
          console.log(obj)

          this.setState({ obj: obj })
          if (this.state.date.split('/')[0].length === 4) {
            let mood = this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1] + '-' + this.state.date.split('/')[2]
            this.getAPPVenueSelectSite({ startTime: mood + ' ' + time.slice(0, time.length - 1).split(',').sort()[0], playTime: (time.split(',').length - 1) * 0.5, siteUid: this.state.siteid,flag:this.state.flag })
          } else {
            let mood = this.state.date.split('/')[2] + '-' + this.state.date.split('/')[0] + '-' + this.state.date.split('/')[1]
            this.getAPPVenueSelectSite({ startTime: mood + ' ' + time.slice(0, time.length - 1).split(',').sort()[0], playTime: (time.split(',').length - 1) * 0.5, siteUid: this.state.siteid,flag:this.state.flag  })
          }
        }
      } else {
        Toast.fail('请选择场地', 2, null, false);
      }
    }
  }
  dayBefore = e => {
    let myDate = new Date(this.state.date)
    myDate.setDate(myDate.getDate() - 1)
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.setState({
      date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(),
      lotime: [],
      week: week[myDate.getDay()],
      time: [],
      moneyCall: 0,
      openPrice:0,
      tableShow:true
    })
    this.getAppVenueReservations({ date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo,flag:this.state.flag })
  }


  nextDay = e => {
    let myDate = new Date(this.state.date)
    myDate.setDate(myDate.getDate() + 1)
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.setState({
      date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(),
      week: week[myDate.getDay()],
      lotime: [],
      time: [],
      moneyCall: 0,
      openPrice:0,
      tableShow:true
    })
    this.getAppVenueReservations({ date: myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate(), siteUUID: this.state.siteid, sportid: this.state.sportid, sporttype: this.state.sporttypeTwo,flag:this.state.flag })
  }

  showOff = (e) => {
    this.setState({ modal1: true, indexKeplo: e.currentTarget.dataset.index })
  }
  onClose = () => {
    this.setState({ modal1: false })
  }




  render() {
    return (
      <div className="homepage">
        <ActivityIndicator toast animating={this.state.animating} />
        <div className="kog" style={this.state.animating === true ? { display: 'none' } : { display: 'block' }}>
          <div className="appOrder">
            <div className='bookingKanban'>
              <div className="titleDiv" style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { display: 'none' } : {}}>
                <div className="dayBefore" style={this.state.date === this.state.start ? { display: 'none' } : { display: 'block' }} onTouchStart={this.dayBefore}>前一天</div>
                <div className="nextDay" onTouchStart={this.nextDay}>后一天</div>
                <div className="titleDivTwo" onTouchStart={this.date}>{this.state.date}   {this.state.week}</div>
              </div>
              <div className="titleDiv" style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? {} : { display: 'none' }}><span className="fontSize">由于散场人数不可控，为了有更好的体验，出发之前可与场馆方联系。</span></div>

              <NoticeBar onClick={this.showOff} className="textPassTwo" data-index="1" mode="link" marqueeProps={{ loop: true, style: { padding: '0 7.5px', fontSize: '0.75rem', lineHeight: '0.8rem' } }} >
                {this.state.koploe}
              </NoticeBar>
              <div className="modTitle">

                <span className="blue"></span><span>可选</span>

                <span className="white" style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { display: 'none' } : {}}></span><span style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { display: 'none' } : {}}>不可选</span>

                <span className="yellow" style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { display: 'none' } : {}}></span><span style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { display: 'none' } : {}}>已占用</span>

                <span className="red"></span><span>已选中</span>
              </div>

              <Table loading={this.state.tableShow} style={this.state.otherType.length === 0 ? { display: 'none' } : {}} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 20, y: '90%' }} />

              <NoticeBar className="textPass" data-index="2" mode="link" onClick={this.showOff} marqueeProps={{ loop: true, style: { padding: '0 7.5px', fontSize: '0.75rem', lineHeight: '0.8rem' } }}>
                {this.state.kopl}
              </NoticeBar>
              <div style={this.state.otherType.length === 0 ? { display: 'block', marginTop: '3rem' } : { display: 'none' }}><Icon type="cross-circle-o" style={{ fill: 'rgba(245,166,35,1)', width: '4rem', height: '4rem', display: 'block', margin: '0 auto' }} /></div>
              <div style={this.state.otherType.length === 0 ? { display: 'block', fontSize: '1rem', textAlign: 'center' } : { display: 'none' }}>无场地可预订</div>

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
              <div style={{ float: 'left', lineHeight: '3', marginLeft: '1rem' }}>场地费合计：{this.state.moneyCall.toString().indexOf('.') === -1 ? this.state.moneyCall + '.00' : this.state.moneyCall + '0'} <span style={this.state.sporttypeFive === '22' || this.state.sporttypeFive === '24' ? { paddingLeft: '4rem' } : { display: 'none' }}>次数{this.state.lotime.length}</span></div>
              <div
                onClick={this.onSubmit}
                style={{ width: '30%', height: '3rem', textAlign: 'center', float: 'right', lineHeight: '2.5', fontSize: '1.2rem', color: '#fff', background: 'rgba(216,93,39,1)' }}>
                确定
           </div>
            </div>
          </div>
        </div>


        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={true}
          onClose={this.onClose}
          title="详情"


        >
          <span style={this.state.indexKeplo === '2' ? {} : { display: 'none' }}>我们确保100%留有场地,否则将退还您预付的所有场地费并补偿您：20元（到场签到了）；10元（未到场签到）。</span>
          <span style={this.state.indexKeplo === '1' ? {} : { display: 'none' }}>{this.state.koploe}</span>
        </Modal>



      </div>
    )
  }
}

export default appOrder;
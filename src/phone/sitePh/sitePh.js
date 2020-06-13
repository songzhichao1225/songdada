import React from 'react';
import './sitePh.css';
import { Card, Picker, List, Toast, InputItem, Modal, DatePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin } from 'antd';
import { } from '@ant-design/icons';
import { getVenueNumberTitleList, getVenueSportidTitle, DelVenueTitle, getVenueTitleSave, getSiteSelectedVenueid, DelVenueNumberTitle, DelSiteSetting, getVenueNumberTitleSave, getVenueNumberTitleFirst, getSiteSettingList, getSiteSelectedTitle } from '../../api';

const alert = Modal.alert;

let moneyKeyboardWrapProps;


class sitePh extends React.Component {

  state = {
    titleLise: [],
    page: 1,
    sportArr: [
      { label: '全部', value: 0 },
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    sportArrTwo: [
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    Longest:[{label:'一周',value:0.1},{label:'两周',value:0.2},{label:'三周',value:0.3},{label:'一个月',value:1},{label:'两个月',value:2},],
    Shortest:[{label:'0分钟',value:0},{label:'30分钟',value:30},{label:'60分钟',value:60},{label:'120分钟',value:120},{label:'180分钟',value:180},{label:'240分钟',value:240},{label:'360分钟',value:360},{label:'1140分钟',value:1140},{label:'2280分钟',value:2280},{label:'4320分钟',value:4320},],
    LiturgyArr: [{ name: '周一', cheked: false }, { name: '周二', cheked: false }, { name: '周三', cheked: false }, { name: '周四', cheked: false }, { name: '周五', cheked: false }, { name: '周六', cheked: false, }, { name: '周日', cheked: false }],
    asyncValue: 0,
    index: '1',
    visibleXi: false,
    visibleTitle: false,
    pickerValue: '',
    titleList: [],
    titleDetle: false,
    joinTitleC: '',
    idxTitle: '',
    idxTitleTwo: '请选择/添加',
    Serial: false,
    numArr: [],
    chekedArr: [],
    upData: 0,
    firstUUid: '',
    siteList: [],
    otherTwo: 0,
    pageTwo: 1,
    asyncValueTwo: 0,
    spin: true,
    Price: false,
    pickerValueTwo: '',
    titleArrFoter: [],
    titleArr: [],
    cheStr: '',
    titleArrFoterNum: 0,
    Liturgy: false,
    Liturgyche: '请选择',
    starttime:'',
    endtime:'',
    money:'',
    pickerValueFour:[],
    pickerValueFive:[],
  };

  header = e => {
    this.setState({
      index: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index === '1') {
      this.getVenueNumberTitleList({ page: 1, sportid: '' })
      this.setState({ asyncValue: 0 })
    } else {
      this.getSiteSettingList({ page: 1, sportid: '' })
      this.setState({ asyncValueTwo: 0 })
    }
  }

  componentDidMount() {
    this.getVenueNumberTitleList({ page: 1, sportid: '' })
    this.getSiteSettingList({ page: 1, sportid: '' })
    let numArr = []
    for (let i = 1; i <= 100; i++) {
      let obj = { num: i, cheked: false }
      numArr.push(obj)
    }
    this.setState({ numArr: numArr })

  }

  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].sportid === 1) {
          res.data.data[i].sportid = '羽毛球'
        } else if (res.data.data[i].sportid === 2) {
          res.data.data[i].sportid = '兵乓球'
        } else if (res.data.data[i].sportid === 3) {
          res.data.data[i].sportid = '台球中式黑八'
        } else if (res.data.data[i].sportid === 4) {
          res.data.data[i].sportid = '台球美式九球'
        } else if (res.data.data[i].sportid === 5) {
          res.data.data[i].sportid = '台球斯诺克'
        } else if (res.data.data[i].sportid === 6) {
          res.data.data[i].sportid = '篮球'
        } else if (res.data.data[i].sportid === 7) {
          res.data.data[i].sportid = '足球11人制'
        } else if (res.data.data[i].sportid === 8) {
          res.data.data[i].sportid = '足球8人制'
        } else if (res.data.data[i].sportid === 9) {
          res.data.data[i].sportid = '足球7人制'
        } else if (res.data.data[i].sportid === 10) {
          res.data.data[i].sportid = '足球5人制'
        } else if (res.data.data[i].sportid === 11) {
          res.data.data[i].sportid = '排球'
        } else if (res.data.data[i].sportid === 12) {
          res.data.data[i].sportid = '网球'
        }
      }
      this.setState({ titleLise: res.data.data, other: res.data.other, spin: false })
    }
  }
  current = (page, pageSize) => {
    this.setState({
      page: page
    })
    this.getVenueNumberTitleList({ page: page, sportid: this.state.asyncValue })
  }
  currentTwo = (page, pageSize) => {
    this.setState({
      pageTwo: page
    })
    this.getSiteSettingList({ page: page, sportid: this.state.asyncValueTwo })
  }
  visibleXi = () => {
    this.setState({ visibleXi: true })
  }
  onClose = () => {
    this.setState({ visibleXi: false, upData: 0, firstUUid: '' })
  }

  onCloseTitle = () => {
    this.setState({ visibleTitle: false })
  }



  async getVenueSportidTitle(data) {
    const res = await getVenueSportidTitle(data, localStorage.getItem('venue_token'))
    if (res.data.data.length === 0) {
      this.setState({
        titleList: [{ title: '普通' }, { title: 'VIP' }, ...res.data.data]
      })
    } else {
      this.setState({
        titleList: res.data.data
      })
    }

  }

  visibleTitle = () => {
    if (this.state.pickerValue === '') {
      Toast.fail('请选择场地类型', 1);
    } else {
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
      this.setState({ visibleTitle: true })
    }
  }

  titleDetle = () => {
    this.setState({ titleDetle: !this.state.titleDetle })
  }


  async DelVenueTitle(data) {
    const res = await DelVenueTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ titleDetle: false })
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
    }
    Toast.fail(res.data.msg, 1);
  }
  delVenueTitle = e => {
    if (this.state.idxTitle === e.currentTarget.dataset.title) {
      Toast.fail('已选中该标签不可删除', 2);
    } else {
      this.DelVenueTitle({ uuid: e.currentTarget.dataset.uuid })
    }
  }


  async getVenueTitleSave(data) {
    const res = await getVenueTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.fail('添加成功', 1);
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  joinTitleC = e => {
    this.setState({ joinTitleC: e })
  }
  joinTitle = () => {
    if (this.state.joinTitleC === '') {
      Toast.fail('请输入新增标签', 1);
    } else {
      this.getVenueTitleSave({ sportid: this.state.pickerValue[0], title: this.state.joinTitleC, uuid: '' })
    }
  }
  sonClik = e => {
    if (this.state.titleDetle === true) {
      this.setState({ idxTitle: ';4141' })
    } else {
      this.setState({ idxTitle: e.currentTarget.dataset.title })
    }
  }
  btnComfir = () => {
    if (this.state.idxTitle === '') {
      Toast.fail('请选择标签', 1);
    } else {
      this.setState({ visibleTitle: false, idxTitleTwo: this.state.idxTitle, chekedArr: [] })
    }
  }

  async getSiteSelectedVenueid(data) {
    const res = await getSiteSelectedVenueid(data, localStorage.getItem('venue_token'))
    if (this.state.Serial === true) {

      for (let i in res.data.data) {
        this.state.numArr[parseInt(res.data.data[i] - 1)].cheked = 'no'
      }
      if (this.state.chekedArr.length !== 0) {
        for (let j in this.state.chekedArr) {
          this.state.numArr[this.state.chekedArr[j] - 1].cheked = true
        }
      }
      this.setState({ numArr: this.state.numArr })
    }
  }


  Serial = () => {
    console.log(this.state.idxTitleTwo)
    if (this.state.idxTitleTwo === '' || this.state.idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else {
      this.setState({ Serial: true })
      this.getSiteSelectedVenueid({ sportid: this.state.pickerValue[0] })
    }
  }


  SerialClose = () => {
    for (let j in this.state.numArr) {
      if (this.state.numArr[j].cheked === true) {
        this.state.numArr[j].cheked = false
      }
    }
    this.setState({ Serial: false })
  }
  numArrSon = e => {
    if (this.state.numArr[parseInt(e.currentTarget.dataset.num) - 1].cheked !== 'no') {
      this.state.numArr[parseInt(e.currentTarget.dataset.num) - 1].cheked = !this.state.numArr[parseInt(e.currentTarget.dataset.num) - 1].cheked
      this.setState({ numArr: this.state.numArr })
    }

  }
  reverseC = () => {
    for (let i in this.state.numArr) {
      if (this.state.numArr[i].cheked === false) {
        this.state.numArr[i].cheked = true
      }
    }
    this.setState({ numArr: this.state.numArr })
  }

  allThem = () => {
    for (let i in this.state.numArr) {
      if (this.state.numArr[i].cheked === false) {
        this.state.numArr[i].cheked = true
      }
    }
    this.setState({ numArr: this.state.numArr })
  }

  koNumArr = () => {
    let chekedArr = []
    for (let i in this.state.numArr) {
      if (this.state.numArr[i].cheked === true) {
        chekedArr.push(this.state.numArr[i].num)
      }
    }
    if (chekedArr.length === 0) {
      Toast.fail('请选择场地编号', 1);
    } else {
      for (let i in this.state.numArr) {
        if (this.state.numArr[i].cheked === true) {
          this.state.numArr[i].cheked = false
        }
      }
      this.setState({ Serial: false, chekedArr: chekedArr })
    }
  }


  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueNumberTitleList({ page: 1, sportid: this.state.asyncValue })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  asyncValue = e => {
    this.setState({ asyncValue: e[0] })
    this.getVenueNumberTitleList({ page: 1, sportid: e[0] })
  }

  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visibleXi: false, firstUUid: '', upData: 0, page: 1 })
      Toast.success('删除成功', 1);
      this.getVenueNumberTitleList({ page: this.state.page, sportid: this.state.asyncValue })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  xifenPush = () => {
    let { pickerValue, idxTitleTwo, chekedArr } = this.state
    if (pickerValue.length === 0) {
      Toast.fail('请选择场地类型', 1);
    } else if (idxTitleTwo === '' || idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else if (chekedArr.length === 0) {
      Toast.fail('请选择场地编号', 1);
    } else {
      this.getVenueNumberTitleSave({ sportid: pickerValue[0], title: idxTitleTwo, venueid: chekedArr.join(','), number: chekedArr.length, uuid: this.state.firstUUid })
    }
  }

  async getVenueNumberTitleFirst(data) {
    const res = await getVenueNumberTitleFirst(data, localStorage.getItem('venue_token'))
    this.setState({
      pickerValue: [res.data.data[0].sportid], idxTitleTwo: res.data.data[0].title, chekedArr: res.data.data[0].venueid.split(','), firstUUid: res.data.data[0].uuid
    })
  }

  upData = e => {
    this.setState({ visibleXi: true, upData: 1 })
    this.getVenueNumberTitleFirst({ uuid: e.currentTarget.dataset.uuid })

  }



  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, localStorage.getItem('venue_token'))
    for (let i in res.data.data) {
      if (res.data.data[i].maxScheduledDate === '0.1') {
        res.data.data[i].maxScheduledDateTwo = '1周'
      } else if (res.data.data[i].maxScheduledDate === '0.2') {
        res.data.data[i].maxScheduledDateTwo = '2周'
      } else if (res.data.data[i].maxScheduledDate === '0.3') {
        res.data.data[i].maxScheduledDateTwo = '3周'
      } else if (res.data.data[i].maxScheduledDate === '1') {
        res.data.data[i].maxScheduledDateTwo = '1个月'
      } else if (res.data.data[i].maxScheduledDate === '2') {
        res.data.data[i].maxScheduledDateTwo = '2个月'
      }
    }
    for (let i in res.data.data) {
      if (res.data.data[i].openday.split(',').indexOf('1') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周一'
      } if (res.data.data[i].openday.split(',').indexOf('2') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周二'
      } if (res.data.data[i].openday.split(',').indexOf('3') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周三'
      } if (res.data.data[i].openday.split(',').indexOf('4') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周四'
      } if (res.data.data[i].openday.split(',').indexOf('5') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周五'
      } if (res.data.data[i].openday.split(',').indexOf('6') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周六'
      } if (res.data.data[i].openday.split(',').indexOf('7') !== -1) {
        res.data.data[i].opendayname = res.data.data[i].opendayname + ',周日'
      }
    }
    this.setState({
      siteList: res.data.data,
      otherTwo: res.data.other
    })
  }

  asyncValueTwo = e => {
    this.setState({ asyncValueTwo: e[0] })
    this.getSiteSettingList({ page: 1, sportid: e[0] })
  }


  async DelSiteSetting(data) {
    const res = await DelSiteSetting(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('删除成功', 1);
      this.setState({ pageTwo: 1 })
      this.getSiteSettingList({ page: 1, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  Price = () => {
    this.setState({ Price: true })
  }
  onClosePrice = () => {
    this.setState({ Price: false})
  }


  async getSiteSelectedTitle(data) {
    const res = await getSiteSelectedTitle(data, localStorage.getItem('venue_token'))
    if (res.data.data.length !== 0) {
      this.setState({ titleArrFoter: res.data.data })
      let titleArr = []
      for (let i in res.data.data) {
        let obj = { label: res.data.data[i].title, value: i }
        titleArr.push(obj)
      }

      this.setState({ titleArr: titleArr })
    } else {
      alert('提示', <div style={{ textAlign: 'center', fontSize: '0.88rem' }}>您还没对{this.state.sportArrTwo[data.sportid - 1].label}场地进行场地细分，无法选择细分标签，请先去进行场地细分，谢谢！</div>, [
        { text: '确定，去场地细分', onPress: () => this.setState({ Price: false, index: '1', visibleXi: true, pickerValue: [data.sportid] }) },
      ])
    }
  }
  pickerValueTwo = e => {
    this.setState({
      pickerValueTwo: e[0]
    })
    this.setState({pickerValueThree:[],cheStr:'',titleArrFoterNum:0})
    this.getSiteSelectedTitle({ sportid: e[0] })
  }
  pickerValueThree = v => {
    for (let i in this.state.titleArrFoter) {
      if (this.state.titleArrFoter[i].title === this.state.titleArr[v].label) {
        this.setState({ cheStr: this.state.titleArrFoter[i].venueid, titleArrFoterNum: this.state.titleArrFoter[i].number })
      }
    }
    this.setState({ pickerValueThree: v })

  }
  Liturgy = () => {
    this.setState({ Liturgy: true })
  }

  LiturgyClose = () => {
    this.setState({ Liturgy: false })
  }

  LiturgySon = e => {
    this.state.LiturgyArr[e.currentTarget.dataset.index].cheked = !this.state.LiturgyArr[e.currentTarget.dataset.index].cheked
    this.setState({ LiturgyArr: this.state.LiturgyArr })
  }
  LiturgyArrChe = () => {
    let Liturgyche = []
    for (let i in this.state.LiturgyArr) {
      if (this.state.LiturgyArr[i].cheked === true) {
        Liturgyche.push(this.state.LiturgyArr[i].name)
      }
    }
    if (Liturgyche.length === 0) {
      Toast.success('请选择星期', 1);
    } else {
      this.setState({ Liturgyche: Liturgyche.join(','), Liturgy: false })
    }
  }

  pickerValueFour=e=>{
     this.setState({pickerValueFour:e})
  }
  pickerValueFive=e=>{
    this.setState({pickerValueFive:e})
  }


  render() {
    return (
      <div className="sitePh">
        <div className="header">
          <div onClick={this.header} data-index='1' style={this.state.index === '1' ? { color: '#D85D27' } : {}}>场地细分<div style={this.state.index === '1' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onClick={this.header} data-index='2' style={this.state.index === '2' ? { color: '#D85D27' } : {}}>价格设置<div style={this.state.index === '2' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
        </div>
        <div className="wsMa4" style={this.state.index === '1' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.titleLise.map((item, i) => (
                <Card key={i} className="card">
                  <Card.Header
                    title={<span className="titleLeft">{item.sportid}</span>}
                    extra={<span className="titleRight">细分标签：{item.title}</span>}
                  />
                  <Card.Body>
                    <div className="idxNum">场地编号：{item.venueid}</div>
                  </Card.Body>
                  <Card.Footer content={<span className="number">场地数量：{item.number}</span>} extra={<div><img style={{ marginRight: '10px' }} onClick={this.upData} data-uuid={item.uuid} src={require('../../assets/upLoad.png')} alt="img" /><img onClick={() =>
                    alert('提示', '您确定要删除该条场地细分么？删除后用户将无法预订' + item.sportid + '的' + item.title + '场地。', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.DelVenueNumberTitle({ uuid: item.uuid }) },
                    ])} data-uuid={item.uuid} data-title={item.title} src={require('../../assets/delet.png')} alt="img" /></div>} />
                </Card>
              ))
            }
            <div className="request" style={this.state.titleLise.length === 0 && this.state.spin === false ? {} : { display: 'none' }}><img src={require('../../assets/xifen (1).png')} alt="img" /><div>你还没有设置场地细分!</div></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
            <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValue}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValue].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.visibleXi}>+添加场地细分</div>
          </div>
        </div>

        <div className="siting68" style={this.state.index === '2' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.siteList.map((item, i) => (
                <Card className="card" key={i}>
                  <Card.Header
                    title={<span className="titleLeft">{item.sportname}</span>}
                    extra={<span className="titleRight">细分标签：{item.tags}</span>}
                  />
                  <Card.Body>
                    <div className="bossname">
                      <div>场地编号：{item.venueid}</div>
                      <div>场地数量：{item.sitenumber}</div>
                      <div>星期：{item.opendayname}</div>
                      <div>时间范围：{item.starttime}~{item.endtime}</div>
                      <div>价格：{item.costperhour}元/时</div>
                      <div>最长提前预定时间：{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</div>
                      <div>最短提前预定时间：{item.appointmenttime === null ? '' : item.appointmenttime / 60 + '小时'}</div>
                      <div>备注：{item.comment === '' ? '无' : item.comment}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer content={<div className="lookYou">查看优惠</div>} extra={<div><img style={{ marginRight: '10px' }} src={require('../../assets/upLoad.png')} alt="img" /><img onClick={() =>
                    alert('提示', '您确定要删除该条价格设置么？删除后用户将无法预订' + item.sportname + '的' + item.tags + '场地。', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.DelSiteSetting({ uuid: item.uuid }) },
                    ])} src={require('../../assets/delet.png')} alt="img" /></div>} />
                </Card>
              ))
            }
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageTwo} total={this.state.otherTwo} onChange={this.currentTwo} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValueTwo}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValueTwo].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.Price}>+添加价格设置</div>
          </div>
        </div>










        <Drawer
          title="添加场地细分"
          placement="bottom"
          height='100%'
          onClose={this.onClose}
          visible={this.state.visibleXi}
        >
          <Picker
            data={this.state.sportArrTwo}
            value={this.state.pickerValue}
            disabled={this.state.upData === 1 ? true : false}
            onOk={v => this.setState({ pickerValue: v, idxTitleTwo: '请选择/添加', chekedArr: [] })}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>场地类型</List.Item>
          </Picker>
          <List.Item arrow="horizontal" onClick={this.state.upData === 1 ? '' : this.visibleTitle} extra={this.state.idxTitleTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>细分标签</List.Item>
          <List.Item arrow="horizontal" onClick={this.Serial} extra={this.state.chekedArr.length === 0 ? '请选择' : this.state.chekedArr.join(',')} style={{ borderBottom: '1px solid #E9E9E9' }}>场地编号</List.Item>
          <List.Item arrow="horizontal" extra={this.state.chekedArr.length} style={{ borderBottom: '1px solid #E9E9E9' }}>场地数量</List.Item>
          <div className="btnSub" onClick={this.xifenPush}>提交</div>
        </Drawer>


        <Drawer
          title="选择/添加细分标签"
          placement="bottom"
          height='50%'
          onClose={this.onCloseTitle}
          visible={this.state.visibleTitle}
        >
          <div className="sitePhtitle">
            <div className="titleHead">
              {
                this.state.titleList.map((item, i) => (
                  <div key={i} className="son" style={this.state.idxTitle === item.title ? { background: '#D85D27', color: '#fff' } : {}} data-title={item.title} data-uuid={item.uuid} onClick={this.sonClik}><div onClick={this.delVenueTitle} data-uuid={item.uuid} data-title={item.title} style={item.uuid !== undefined && this.state.titleDetle === true ? {} : { display: 'none' }}>x</div>{item.title}</div>
                ))
              }
            </div>
            <div className="titleHead">
              <InputItem style={{ fontSize: '0.75rem' }} maxLength={5} placeholder-style={{ fontSize: '0.75rem' }} onChange={this.joinTitleC} placeholder="新增标签最多输入5个字符"></InputItem>
              <span onClick={this.joinTitle}>+新增自定义标签</span>
            </div>
            <div className="btnDetle" style={this.state.titleDetle === true ? { background: '#e9e9e9', color: '#000' } : { background: '#D85D27' }} onClick={this.titleDetle}>{this.state.titleDetle === true ? '取消' : '删除'}</div><span style={{ lineHeight: '1.75rem', fontSize: '0.6rem', color: '#ccc', display: 'block', float: 'left', marginTop: '0.5rem', marginLeft: '0.3rem' }}>(点击选择某一个标签删除)</span>

            <div className="btnComfir" onClick={this.btnComfir}>确定</div>

          </div>
        </Drawer>



        <Drawer
          title="选择场地编号"
          placement="bottom"
          height='60%'
          onClose={this.SerialClose}
          visible={this.state.Serial}
        >
          <div className="sitePhSerialHeader"><span onClick={this.reverseC}>反选</span><span onClick={this.allThem}>全选</span></div>
          <div className="sitePhSerial">

            {
              this.state.numArr.map((item, i) => (
                <div key={i} onClick={this.numArrSon} data-num={item.num} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : {}}>{item.num}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onClick={this.koNumArr}>确定</div>
        </Drawer>





        <Drawer
          title="添加价格设置"
          placement="bottom"
          height='100%'
          onClose={this.onClosePrice}
          visible={this.state.Price}
        >
          <Picker
            data={this.state.sportArrTwo}
            value={[this.state.pickerValueTwo]}
            onOk={this.pickerValueTwo}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>场地类型</List.Item>
          </Picker>
          <Picker
            data={this.state.titleArr}
            value={this.state.pickerValueThree}
            onOk={this.pickerValueThree}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>细分标签</List.Item>
          </Picker>

          <List.Item arrow="horizontal" extra={<span className="bianhao">{this.state.cheStr === '' ? '无' : this.state.cheStr}</span>} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">场地编号</List.Item>
          <List.Item arrow="horizontal" extra={this.state.titleArrFoterNum} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">场地数量</List.Item>
          <List.Item arrow="horizontal" extra={this.state.Liturgyche} onClick={this.Liturgy} style={{ borderBottom: '1px solid #E9E9E9' }} >星期</List.Item>
          <DatePicker
            mode="time"
            extra="请选择"
            minuteStep={30}
            value={this.state.starttime}
            onChange={starttime => this.setState({ starttime })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>开始时间</List.Item>
          </DatePicker>

          <DatePicker
            mode="time"
            extra="请选择"
            minuteStep={30}
            value={this.state.endtime}
            onChange={endtime => this.setState({ endtime })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>结束时间</List.Item>
          </DatePicker>
          <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty"> 
          <InputItem
            type='money'
            placeholder="请输入"
            value={this.state.money}
            onChange={(v) => { this.setState({money:v}) }}
            onBlur={(v) => { console.log('onBlur', v); }}
            style={{padding:'0'}}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ><span style={{fontSize:'0.75rem'}}>价格(元/时)</span></InputItem></List.Item>
         
         <Picker
            data={this.state.Longest}
            value={this.state.pickerValueFour}
            onOk={this.pickerValueFour}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>最长提前预定时间</List.Item>
          </Picker>

          <Picker
            data={this.state.Shortest}
            value={this.state.pickerValueFive}
            onOk={this.pickerValueFive}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>最短提前预定时间</List.Item>
          </Picker>

           

          <div className="btnSub" onClick={this.xifenPush}>提交</div>
        </Drawer>



        <Drawer
          title="选择星期"
          placement="bottom"
          height='30%'
          onClose={this.LiturgyClose}
          visible={this.state.Liturgy}
        >
          {
            this.state.LiturgyArr.map((item, i) => (
              <div className="LitName" onClick={this.LiturgySon} data-index={i} style={item.cheked === true ? { color: '#fff', background: '#D85D27' } : {}} key={i}>{item.name}</div>
            ))
          }
          <div className="LitBtn" onClick={this.LiturgyArrChe}>确定</div>


        </Drawer>






      </div>



    )
  }
}


export default sitePh;
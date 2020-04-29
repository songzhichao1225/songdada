import React from 'react';
import './siteSettings.css';
import 'antd/dist/antd.css';
import { getSiteSettingList, addVenueField, getVenueSport, getFirstField, delVenueField, getVenueSportidTitle, getVenueTitleSave, getVenueNumberTitleSave,getSiteSelectedTitle } from '../../api';
import { Select, Row, Col, Modal, InputNumber, Input, message, Pagination, Popconfirm, TimePicker, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
const { RangePicker } = TimePicker;

const format = 'HH:mm';

const { TextArea } = Input;





class siteSettings extends React.Component {

  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: '',//运动项目id
    runName: '',//运动项目名称
    tags: '',
    openday: [],//营业时间段Id
    opendayname: '',//营业时间端名称
    starttime: '00:00',//开始时间
    endtime: '00:00',//结束时间
    costperhour: '',//价格
    number: 1,//数量
    maxScheduledDate: '',//最长可预定日期、
    appointmenttime: '',//最短可提前预定时间
    comment: '',//备注
    loading: true,//加载
    DisList: '',
    hidden: '',
    other: 0,
    page: 1,
    deletUid: 0,
    maxScheduledDateName: [],
    siteEditor: 0,//场地设置打开修改
    headerData: '1',
    joinXi: false,
    joinTil: [],
    items: ['jack', 'lucy'],
    name: '',
    joinB: true,
    serialNumber: false,
    arrNum: [],
    arrCheked: [],//选择完的场地
    arrChekedLen: 0,//选择场地的数量
    interpretation: false,
    nameChang:3,
    joinXiList:[],
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({ ListSport: res.data.data })
  }









  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].maxScheduledDate === 0.1) {
          res.data.data[i].maxScheduledDateTwo = '一周'
        } else if (res.data.data[i].maxScheduledDate === 0.2) {
          res.data.data[i].maxScheduledDateTwo = '两周'
        } else if (res.data.data[i].maxScheduledDate === 0.3) {
          res.data.data[i].maxScheduledDateTwo = '三周'
        } else if (res.data.data[i].maxScheduledDate === 1) {
          res.data.data[i].maxScheduledDateTwo = '一个月'
        } else if (res.data.data[i].maxScheduledDate === 2) {
          res.data.data[i].maxScheduledDateTwo = '两个月'
        }
      }

      this.setState({ list: res.data.data, other: res.data.other, loading: false, hidden: true })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ list: res.data.data, loading: false, hidden: false })
    }
  }

  componentDidMount() {
    this.getVenueSport()
    this.getSiteSettingList({ sportid: '', page: '' })
    sessionStorage.setItem('siteSettings', '')
    if (this.state.runId !== '') {
      this.setState({
        joinB: false
      })
    }
    let arrNum = []
    for (let i = 1; i <= 100; i++) {
      let p = {
        id: i, cheked: false
      }
      arrNum.push(p)
    }
    this.setState({
      arrNum: arrNum
    })

    this.getSiteSelectedTitle({sportid:this.state.nameChang})

  }

  handleChangeSelect = e => {
    sessionStorage.setItem('siteSettings', e)
    this.getSiteSettingList({ sportid: e, page: '' })
  }


  showModal = () => {
    this.setState({
      joinXi: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    if (this.state.siteEditor === 1) {
      this.setState({
        runId: [], openday: [], opendayname: '请选择', starttime: '00:00', endtime: '00:00', costperhour: '', maxScheduledDateName: [],
        number: 1, maxScheduledDate: '请选择', appointmenttime: [], comment: '', DisList: ''
      })
    }
    this.setState({
      visible: false,
      siteEditor: 0,
    });
  };
  handleChangeOne = e => {
    this.setState({ runId: e, joinB: false })
    this.getVenueSportidTitle({ sportid: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球中式黑八";
        break;
      case 4:
        day = "台球美式九球";
        break;
      case 5:
        day = "台球斯诺克";
        break;
      case 6:
        day = "篮球";
        break;
      case 7:
        day = "足球11人制";
        break;
      case 8:
        day = "足球8人制";
        break;
      case 9:
        day = "足球7人制";
        break;
      case 10:
        day = "足球5人制";
        break;
      case 11:
        day = "排球";
        break;
      case 12:
        day = "网球";
        break;
      default:
        day = "";
    }
    this.setState({ runName: day })
  }


  handleChangeTwo = e => {

    if (typeof (e) === 'object') {
      this.setState({ openday: e })
    } else {
      this.setState({ openday: parseInt(e) })
      let day = ''
      switch (parseInt(e)) {
        case 1:
          day = "周一";
          break;
        case 2:
          day = "周二";
          break;
        case 3:
          day = "周三";
          break;
        case 4:
          day = "周四";
          break;
        case 5:
          day = "周五";
          break;
        case 6:
          day = "周六";
          break;
        case 7:
          day = "周日";
          break;
        default:
          day = "";
      }
      this.setState({ opendayname: day })
    }
  }

  handleChangThree = (e) => {
    console.log(e)
    // this.setState({ starttime: this.state.time[parseInt(e)].name })
  }
  endtime = (e) => {
    this.setState({ endtime: this.state.time[parseInt(e)].name })
  }
  money = e => {
    this.setState({ costperhour: e })
  }
  handleChangeFour = e => {
    this.setState({ maxScheduledDate: e })
    let dayTwo = ''
    switch (e) {
      case '0.1':
        dayTwo = "一周";
        break;
      case '0.2':
        dayTwo = "两周";
        break;
      case '0.3':
        dayTwo = "三周";
        break;
      case '1':
        dayTwo = "一个月";
        break;
      case '2':
        dayTwo = "两个月";
        break;
      default:
        dayTwo = "请选择";
    }
    this.setState({ maxScheduledDateName: dayTwo })
  }
  handleChangeFive = e => {
    this.setState({ appointmenttime: parseInt(e) })
  }
  textArea = e => {
    this.setState({ comment: e.target.value })
  }

  jian = () => {
    if (this.state.number > 0) {
      this.setState({ number: this.state.number - 1 })
    }
  }

  jia = () => {
    if (this.state.number < 100) {
      this.setState({ number: this.state.number + 1 })
    }
  }

  async addVenueField(data) {
    const res = await addVenueField(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({
        visible: false,
      });
      this.getSiteSettingList({ sportid: sessionStorage.getItem('siteSettings'), page: this.state.page })
    }
  }



  submit = (e) => {

    let { runId, runName, openday, opendayname, starttime, endtime, costperhour, number, maxScheduledDate, appointmenttime, comment } = this.state
    let data = {
      sportid: runId,
      sportname: runName,
      opendayname: opendayname,
      starttime: starttime,
      endtime: endtime,
      costperhour: costperhour,
      maxtablecount: number,
      maxScheduledDate: maxScheduledDate,
      appointmenttime: appointmenttime,
      comment: comment,
      uuid: e.target.dataset.uid
    }
    if (typeof (openday) === 'number') {
      data.openday = openday
    } else {
      data.openday = openday.join(',')
    }
    this.addVenueField(data)
  }
  async getFirstField(data) {
    const res = await getFirstField(data, sessionStorage.getItem('venue_token'))
    let datefor = res.data.data
    if (res.data.code === 4001) {
      this.props.history.push('/')
    } else if (res.data.code === 2000) {
      this.setState({ DisList: res.data.data })
      this.setState({
        runId: datefor.sportid, openday: datefor.openday, opendayname: datefor.opendayname, starttime: datefor.starttime, endtime: datefor.endtime, costperhour: datefor.costperhour,
        number: datefor.maxtablecount, maxScheduledDate: datefor.maxScheduledDate, appointmenttime: datefor.appointmenttime, comment: datefor.comment
      })
      let day = ''
      switch (parseInt(this.state.runId)) {
        case 1:
          day = "羽毛球";
          break;
        case 2:
          day = "乒乓球";
          break;
        case 3:
          day = "台球中式黑八";
          break;
        case 4:
          day = "台球美式九球";
          break;
        case 5:
          day = "台球斯诺克";
          break;
        case 6:
          day = "篮球";
          break;
        case 7:
          day = "足球11人制";
          break;
        case 8:
          day = "足球8人制";
          break;
        case 9:
          day = "足球7人制";
          break;
        case 10:
          day = "足球5人制";
          break;
        case 11:
          day = "排球";
          break;
        case 12:
          day = "网球";
          break;
        default:
          day = "";
      }
      this.setState({ runName: day })
      let days = ''
      switch (parseInt(this.state.openday)) {
        case 1:
          days = "周一";
          break;
        case 2:
          days = "周二";
          break;
        case 3:
          days = "周三";
          break;
        case 4:
          days = "周四";
          break;
        case 5:
          days = "周五";
          break;
        case 6:
          days = "周六";
          break;
        case 0:
          days = "周日";
          break;
        default:
          days = "";
      }
      this.setState({ opendayname: days })
      let dayTwo = ''
      switch (this.state.maxScheduledDate) {
        case 0.1:
          dayTwo = "一周";
          break;
        case 0.2:
          dayTwo = "两周";
          break;
        case 0.3:
          dayTwo = "三周";
          break;
        case 1:
          dayTwo = "一个月";
          break;
        case 2:
          dayTwo = "两个月";
          break;
        default:
          dayTwo = "";
      }
      this.setState({ maxScheduledDateName: dayTwo })
    }
  }

  update = e => {
    this.setState({
      visible: true,
      siteEditor: 1,
    });
    this.getFirstField({ uuid: e.target.dataset.uid })
  }
  async delVenueField(data) {
    const res = await delVenueField(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 4001) {
      message.info(res.data.msg)
      this.getSiteSettingList({ sportid: sessionStorage.getItem('siteSettings'), page: this.state.page })
    }
  }
  delet = e => {
    this.setState({ deletUid: e.target.dataset.uid })
  }
  confirm = () => {
    this.delVenueField({ uuid: this.state.deletUid })
  }

  current = (page, pageSize) => {
    this.setState({ page: page })
    this.getSiteSettingList({ sportid: sessionStorage.getItem('siteSettings'), page: page })
  }
  headerCli = e => {
    this.setState({
      headerData: e.currentTarget.dataset.id
    })
  }
  handlejoinXi = () => {
    this.setState({
      joinXi: false
    })
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    })
  };
  async getVenueSportidTitle(data) {
    const res = await getVenueSportidTitle(data, sessionStorage.getItem('venue_token'))
    this.setState({ joinTil: res.data.data, name: '', })
  }

  async getVenueTitleSave(data) {
    const res = await getVenueTitleSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueSportidTitle({ sportid: this.state.runId })
    }
  }


  addItem = () => {
    const { name } = this.state;
    if (name !== '') {
      this.getVenueTitleSave({ sportid: this.state.runId, title: name })
    }
  }
  closeDelet = e => {
    console.log(e.currentTarget.dataset.id)
  }

  title = e => {
    this.setState({
      tags: e
    })
  }
  serial = () => {
    if (this.state.runId === '') {
      message.error('请选择场地类型')
    } else if (this.state.tags === '') {
      message.error('请选择细分标签')
    } else {
      this.setState({
        serialNumber: true
      })
    }

  }
  handleserialNumber = () => {
    this.setState({
      serialNumber: false
    })
  }

  handleserialNumberTwo = () => {
    this.setState({
      interpretation: false
    })
  }

  seriaSon = e => {
    let { arrNum } = this.state
    if (arrNum[e.currentTarget.dataset.id - 1].cheked === true) {
      arrNum[e.currentTarget.dataset.id - 1].cheked = false
    } else {
      arrNum[e.currentTarget.dataset.id - 1].cheked = true
    }
    this.setState({
      arrNum: arrNum
    })
  }
  allOfThem = () => {
    let { arrNum } = this.state
    for (let i in arrNum) {
      arrNum[i].cheked = true
    }
    this.setState({
      arrNum: arrNum
    })
  }
  reverseElection = () => {
    let { arrNum } = this.state
    for (let i in arrNum) {
      if (arrNum[i].cheked === true) {
        arrNum[i].cheked = false
      } else if (arrNum[i].cheked === false) {
        arrNum[i].cheked = true
      }
    }
    this.setState({
      arrNum: arrNum
    })
  }

  serialComfir = () => {
    let { arrNum } = this.state
    let arrCheked = []
    for (let i in arrNum) {
      if (arrNum[i].cheked === true) {
        arrCheked.push(arrNum[i].id)
      }
    }
    this.setState({
      arrCheked: arrCheked,
      serialNumber: false,
      arrChekedLen: arrCheked.length
    })
  }

  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, sessionStorage.getItem('venue_token'))
    console.log(res)
    if (res.data.code === 2000) {
      this.setState({ joinXi: false })
    }
  }

  subSiteSubdivision = () => {
    let { runId, tags, arrCheked, arrChekedLen } = this.state
    let obj = {
      sportid: runId,
      title: tags,
      veneuid: arrCheked.join(),
      number: arrChekedLen
    }
    this.getVenueNumberTitleSave(obj)
  }

  interpretation = () => {
    this.setState({
      interpretation: true
    })
  }

  
   async getSiteSelectedTitle(data) {
    const res = await getSiteSelectedTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ joinXiList: res.data.data })
    }
  }


  render() {
    const { name } = this.state;
    return (
      <div className="siteStting">
        <div className="header">
          <div className="left" style={this.state.headerData === '1' ? { color: '#fff', background: '#F5A623', border: '1px solid #F5A623' } : {}} onClick={this.headerCli} data-id='1'>场地细分</div>
          <div className="left" style={this.state.headerData === '2' ? { color: '#fff', background: '#F5A623', border: '1px solid #F5A623' } : {}} onClick={this.headerCli} data-id='2'>价格设置</div>
          <div className="right"><span>场地类型</span>
            <Select className="selectName" defaultValue="类型名称" value="0" style={{ width: 120, padding: 0,textAlign:'center' }} onChange={this.nameChang}>
              <Option value="0">全部</Option>
              <Option value="1">羽毛球</Option>
              <Option value="2">兵乓球</Option>
              <Option value="3">台球中式黑八</Option>
              <Option value="4">台球美式九球</Option>
              <Option value="5">台球斯诺克</Option>
              <Option value="6">篮球</Option>
              <Option value="7">足球11人制</Option>
              <Option value="8">足球8人制</Option>
              <Option value="9">足球7人制</Option>
              <Option value="10">足球5人制</Option>
              <Option value="11">排球</Option>
              <Option value="12">网球</Option>
            </Select>

          </div>

        </div>
        <div className="xiange"></div>
        <div style={this.state.headerData === '2' ? { overflowY: 'auto' } : { display: 'none' }}>
          <div className={this.state.hidden === true ? 'siteList' : 'hidden'}>
            <Row className="rowConten">
              <Col xs={{ span: 2 }}>场地类型</Col>
              <Col xs={{ span: 2 }}>场地标签</Col>
              <Col xs={{ span: 2 }}>工作日/周六日</Col>
              <Col xs={{ span: 2 }}>时间范围</Col>
              <Col xs={{ span: 2 }}>价格<span className="fontColor">(元/时)</span></Col>
              <Col xs={{ span: 2 }}>场地编号</Col>
              <Col xs={{ span: 2 }}>场地数量</Col>
              <Col xs={{ span: 2 }}>最长可预定日期</Col>
              <Col xs={{ span: 2 }}>最短提前预定时间</Col>
              <Col xs={{ span: 2 }}>备注</Col>
              <Col xs={{ span: 2 }}>打折优惠</Col>
              <Col xs={{ span: 2, }}>操作</Col>
            </Row>
            <div className="dataList">
              {
                this.state.list.map((item, i) => (
                  <Row key={i} className="rowList">
                    <Col xs={{ span: 2 }}>{item.sportname}</Col>
                    <Col xs={{ span: 2 }}>{item.openday === 1 ? '周一' : '' || item.openday === 2 ? '周二' : '' || item.openday === 3 ? '周三' : '' || item.openday === 4 ? '周四' : '' || item.openday === 5 ? '周五' : '' || item.openday === 6 ? '周六' : '' || item.openday === 0 ? '周日' : ''}</Col>
                    <Col xs={{ span: 2 }}>{item.starttime}</Col>
                    <Col xs={{ span: 2 }}>{item.endtime}</Col>
                    <Col xs={{ span: 2 }}>{item.costperhour}</Col>
                    <Col xs={{ span: 2 }}>{item.maxtablecount}</Col>
                    <Col xs={{ span: 3 }}>{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</Col>
                    <Col xs={{ span: 3 }}>{item.appointmenttime === null ? '' : item.appointmenttime / 60 + '小时'}</Col>
                    <Col xs={{ span: 2, offset: 3 }}>
                      <img onClick={this.update} data-uid={item.uid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;
                      <Popconfirm
                        title="你确定要删除本条信息吗?"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消"
                      >
                        <img onClick={this.delet} data-uid={item.uid} src={require("../../assets/icon_pc_delet.png")} alt="删除" />
                      </Popconfirm>
                    </Col>
                  </Row>
                ))
              }
            </div>
          </div>
          <Pagination className={this.state.hidden === true ? 'fenye' : 'hidden'} defaultCurrent={1} total={this.state.other} onChange={this.current} />
          <div className="join" onClick={this.showModal}>+添加价格设置</div>
        </div>

        <div style={this.state.headerData === '1' ? { overflowY: 'auto' } : { display: 'none' }}>
          <Row className="rowConten" style={{ background: '#FCF7EE', borderBottom: '1px solid #E1E0E1' }}>
            <Col xs={{ span: 5 }}>场地类型</Col>
            <Col xs={{ span: 5 }}>细分标签</Col>
            <Col xs={{ span: 5 }}>场地编号</Col>
            <Col xs={{ span: 5 }}>场地数量</Col>
            <Col xs={{ span: 3 }}>操作</Col>
          </Row>


          <div className="join" onClick={this.showModal}>+添加场地细分</div>
        </div>













        <Modal
          title="添加/修改价格设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={630}
          className='model'
        >
          <div className="modelList" style={{ height: '32px' }}>
            <span>场地类型</span>
            <Select placeholder="请选择" value={this.state.runId} className="selectModel" style={{ width: 249, height: 32 }} onChange={this.handleChangeOne}>
              {
                this.state.ListSport.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>

          <div className="modelList" style={{ height: '32px' }}>
            <span>场地标签</span>
            <Select placeholder="请选择" className="selectModel" style={{ width: 249, height: 32 }} onChange={this.handleChangeTags}>
              <Option value={'VIP'}>VIP</Option>
            </Select>
          </div>

          <div className="modelList" style={{ height: 'auto' }}>
            <span>休息日/工作日</span>
            <Select placeholder="请选择" mode={this.state.siteEditor === 1 ? '' : 'multiple'} className="selectModel"
              value={this.state.siteEditor === 1 ? this.state.openday === 0 ? '周日' : [] && this.state.openday === 1 ? '周一' : [] && this.state.openday === 2 ? '周二' : [] && this.state.openday === 3 ? '周三' : [] && this.state.openday === 4 ? '周四' : [] && this.state.openday === 5 ? '周五' : [] && this.state.openday === 6 ? '周六' : [] : this.state.openday}
              style={{ width: 249, height: 'auto' }} onChange={this.handleChangeTwo}>
              <Option value="1">周一</Option>
              <Option value="2">周二</Option>
              <Option value="3">周三</Option>
              <Option value="4">周四</Option>
              <Option value="5">周五</Option>
              <Option value="6">周六</Option>
              <Option value="7">周日</Option>
            </Select>
          </div>

          <div className="modelList" style={{ height: '32px' }}>
            <span>时间范围</span>
            <RangePicker style={{ float: 'right', marginRight: 150, width: 249 }} minuteStep={30} format={format} locale={locale} onChange={this.handleChangThree} />
          </div>

          <div className="modelList" style={{ height: '32px' }}>
            <span>价格</span><span>（元/小时）</span>
            <InputNumber className="startTime" value={this.state.costperhour} defaultValue={0} min={0} style={{ paddingLeft: '10px', height: 32 }} placeholder="请输入" onChange={this.money} />
          </div>

          <div className="modelList" style={{ height: '32px' }}>
            <span>场地编号</span>
            <Input className="startTime" style={{ paddingLeft: '10px', height: 32 }} disabled={true} placeholder="点击进行添加" onChange={this.money} />
          </div>

          <div className="modelList">
            <span>场地总数量</span>
            <div className="startTime"> <span className="jian" onClick={this.jian}>-</span > &nbsp; {this.state.number} &nbsp;  <span className="jia" onClick={this.jia}>+</span></div>
          </div>

          <div className="modelList">
            <span>最长可预定日期</span>
            <Select placeholder="请选择" className="selectModel" value={this.state.maxScheduledDateName} style={{ width: 249 }} onChange={this.handleChangeFour}>
              <Option value="0.1">一周</Option>
              <Option value="0.2">两周</Option>
              <Option value="0.3">三周</Option>
              <Option value="1">一个月</Option>
              <Option value="2">两个月</Option>
            </Select>
          </div>
          <div className="modelList">
            <span>最短提前预定时间</span>
            <Select placeholder="请选择" className="selectModel"
              defaultActiveFirstOption={false}
              value={
                this.state.appointmenttime === 0 ? '0分钟' : []
                  && this.state.appointmenttime === 30 ? '30分钟' : []
                    && this.state.appointmenttime === 60 ? '60分钟' : []
                      && this.state.appointmenttime === 120 ? '2小时' : []
                        && this.state.appointmenttime === 180 ? '3小时' : []
                          && this.state.appointmenttime === 240 ? '4小时' : []
                            && this.state.appointmenttime === 300 ? '5小时' : []
                              && this.state.appointmenttime === 360 ? '6小时' : []
                                && this.state.appointmenttime === 1140 ? '24小时' : []
                                  && this.state.appointmenttime === 2880 ? '48小时' : []
                                    && this.state.appointmenttime === 4320 ? '72小时' : []
              }
              style={{ width: 249 }}
              onChange={this.handleChangeFive}
            >
              <Option value="0">0分钟</Option>
              <Option value="30">30分钟</Option>
              <Option value="60">60分钟</Option>
              <Option value="120">2小时</Option>
              <Option value="180">3小时</Option>
              <Option value="240">4小时</Option>
              <Option value="300">5小时</Option>
              <Option value="360">6小时</Option>
              <Option value="1140">24小时</Option>
              <Option value="2880">48小时</Option>
              <Option value="4320">72小时</Option>

            </Select>
          </div>
          <div className="modelListT">
            <span>备注</span>
            <TextArea className="textArea" rows={4} placeholder='请输入' value={this.state.comment} onChange={this.textArea} />
          </div>
          <div className="submit" data-uid={this.state.DisList !== '' ? this.state.DisList.uid : ''} onClick={this.submit}>保存</div>
        </Modal>




        <Modal
          title="添加/修改场地细分"
          visible={this.state.joinXi}
          onOk={this.handleOk}
          onCancel={this.handlejoinXi}
          width={630}
          className='model'
        >
          <div className="modelList" style={{ height: '32px' }}>
            <span>场地类型</span><span style={{ position: 'absolute', top: 0, right: 0, color: '#F5A623' }} onClick={this.interpretation}>什么是细分标签?</span>
            <Select placeholder="请选择" className="selectModel" style={{ width: 249, height: 32 }} onChange={this.handleChangeOne}>
              {
                this.state.ListSport.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>

          <div className="modelList" style={{ height: '32px' }}>
            <span>细分标签</span>
            <Select
              style={{ width: 249, height: 32 }}
              placeholder="请选择/添加后选择"
              className="selectModel"
              onChange={this.title}
              disabled={this.state.joinB}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', padding: 8 }}>
                    <Input style={{ height: 32 }} value={name} onChange={this.onNameChange} maxLength={5} />
                    <span style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} onClick={this.addItem}>
                      <PlusOutlined /> 自定义(5个汉字以内)
              </span>
                  </div>
                </div>
              )}
            >
              {this.state.joinTil.map((item, i) => (
                <Option key={i} value={item.title}>{item.title}</Option>
              ))}
            </Select>
          </div>

          <div className="modelList" style={{ height: '32px' }} onClick={this.serial}>
            <span>场地编号</span>
            <Input className="startTime" value={this.state.arrCheked.length !== 0 ? this.state.arrCheked : []} style={{ paddingLeft: '10px', height: 32 }} disabled={true} placeholder="点击进行添加" />
          </div>

          <div className="modelList" style={{ height: '32px' }} >
            <span>场地数量</span>
            <div className="startTime">{this.state.arrChekedLen}</div>
          </div>
          <div className="submit" onClick={this.subSiteSubdivision}>提交</div>
        </Modal>



        <Modal
          title="添加场地编号"
          visible={this.state.serialNumber}
          onOk={this.handleOk}
          onCancel={this.handleserialNumber}
          width={630}
          className='model'
        >
          <div className="serialNumberTop"><span>请选择您要设置的场地编号</span><div onClick={this.reverseElection}>反选</div><div onClick={this.allOfThem} style={{ marginRight: '10px' }}>全选</div></div>
          {
            this.state.arrNum.map((item, i) => (
              <div key={i} className="serialSon" onClick={this.seriaSon} data-id={item.id} style={item.cheked === true ? { color: '#fff', background: '#F5A623', transition: '0.3s' } : {}}>{item.id}</div>
            ))
          }
          <div className="footerSerial">

            <div className="seriaComfir" onClick={this.serialComfir}>提交</div>
          </div>

        </Modal>


        <Modal
          title="什么是细分标签?"
          visible={this.state.interpretation}
          onOk={this.handleOk}
          onCancel={this.handleserialNumberTwo}
          width={630}
          className='model'
        >
          <div>请对所选场地类型进行再细分，如场地类型选择的是羽毛球，贵场馆羽毛球场地是否有普通场、VIP场等之分? 如没有，则所有场地选择一个标签即可，如有，则分开设置标签及对应的场地编号”。总之，同一时刻，不同价格的场地须细分并给出标签。</div>

        </Modal>



      </div>
    );
  }
}

export default siteSettings;
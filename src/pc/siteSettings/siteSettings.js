import React from 'react';
import './siteSettings.css';
import 'antd/dist/antd.css';
import { getVenueFieldList, addVenueField, getVenueSport, getFirstField, delVenueField } from '../../api';
import { Select, Row, Col, Modal, InputNumber, Input, message, Spin, Result, Icon, Pagination, Popconfirm } from 'antd';
const { Option } = Select;



const { TextArea } = Input;







class siteSettings extends React.Component {

  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: [],//运动项目id
    runName: '',//运动项目名称
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
    time: [
      { name: '00:00' },
      { name: '00:30' },
      { name: '01:00' },
      { name: '01:30' },
      { name: '02:00' },
      { name: '02:30' },
      { name: '03:00' },
      { name: '03:30' },
      { name: '04:00' },
      { name: '04:30' },
      { name: '05:00' },
      { name: '05:30' },
      { name: '06:00' },
      { name: '06:30' },
      { name: '07:00' },
      { name: '07:30' },
      { name: '08:00' },
      { name: '08:30' },
      { name: '09:00' },
      { name: '09:30' },
      { name: '10:00' },
      { name: '10:30' },
      { name: '11:00' },
      { name: '11:30' },
      { name: '12:00' },
      { name: '12:30' },
      { name: '13:00' },
      { name: '13:30' },
      { name: '14:00' },
      { name: '14:30' },
      { name: '15:00' },
      { name: '15:30' },
      { name: '16:00' },
      { name: '16:30' },
      { name: '17:00' },
      { name: '17:30' },
      { name: '18:00' },
      { name: '18:30' },
      { name: '19:00' },
      { name: '19:30' },
      { name: '20:00' },
      { name: '20:30' },
      { name: '21:00' },
      { name: '21:30' },
      { name: '22:00' },
      { name: '22:30' },
      { name: '23:00' },
      { name: '23:30' },
      { name: '24:00' },
    ]
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({ ListSport: res.data.data })
  }

  async getVenueFieldList(data) {
    const res = await getVenueFieldList(data, sessionStorage.getItem('venue_token'))
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
    this.getVenueFieldList({ sportid: '', page: '' })
    sessionStorage.setItem('siteSettings', '')
  }

  handleChangeSelect = e => {
    sessionStorage.setItem('siteSettings', e)
    this.getVenueFieldList({ sportid: e, page: '' })
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
    // this.setState({
    //   runId: [], openday: [], opendayname: '请选择', starttime: '', endtime: '', costperhour: '',maxScheduledDateName:[],
    //   number: 1, maxScheduledDate: '请选择', appointmenttime: [], comment: '', DisList: ''
    // })
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    if (this.state.siteEditor === 1) {
      this.setState({
        runId: [], openday: [], opendayname: '请选择', starttime: '', endtime: '', costperhour: '', maxScheduledDateName: [],
        number: 1, maxScheduledDate: '请选择', appointmenttime: [], comment: '', DisList: ''
      })
    }
    this.setState({
      visible: false,
      siteEditor: 0,
    });
  };
  handleChangeOne = e => {
    this.setState({ runId: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
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
        case 0:
          day = "周日";
          break;
        default:
          day = "";
      }
      this.setState({ opendayname: day })
    }
  }

  handleChangThree = (e) => {

    this.setState({ starttime: e })
  }
  endtime = (e) => {
    this.setState({ endtime: e })
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
      this.getVenueFieldList({ sportid: sessionStorage.getItem('siteSettings'), page: this.state.page })
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
          day = "台球";
          break;
        case 4:
          day = "篮球";
          break;
        case 5:
          day = "足球";
          break;
        case 6:
          day = "排球";
          break;
        case 7:
          day = "网球";
          break;
        case 8:
          day = "高尔夫";
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
      this.getVenueFieldList({ sportid: sessionStorage.getItem('siteSettings'), page: this.state.page })
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
    this.getVenueFieldList({ sportid: sessionStorage.getItem('siteSettings'), page: page })
  }



  render() {
    return (
      <div className="siteStting">
        <div className="header">
          <span>运动项目</span>
          <Select defaultValue="全部" className="selectN" style={{ width: 100 }} onChange={this.handleChangeSelect}>
            <Option value=''>全部</Option>
            {
              this.state.ListSport.map((item, i) => (
                <Option key={i} value={item.id}>{item.name}</Option>
              ))
            }
          </Select>
          <div className="addList" onClick={this.showModal}>添加</div>
        </div>
        <div className="xiange"></div>
        <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
          <div className={this.state.hidden === true ? 'siteList' : 'hidden'}>
            <Row className="rowConten">
              <Col xs={{ span: 2 }}>运动项目</Col>
              <Col xs={{ span: 2 }}>节假日/工作日</Col>
              <Col xs={{ span: 2 }}>开始时间</Col>
              <Col xs={{ span: 2 }}>结束时间</Col>
              <Col xs={{ span: 2 }}>价格<span className="fontColor">元/时</span></Col>
              <Col xs={{ span: 2 }}>场地数量</Col>
              <Col xs={{ span: 3 }}>最长可预定日期</Col>
              <Col xs={{ span: 3 }}>最短提前预定时间</Col>
              <Col xs={{ span: 2, offset: 3 }}>操作</Col>
            </Row>
            <div className="dataList">
              {
                this.state.list.map((item, i) => (
                  <Row key={i} className="rowList">
                    <Col xs={{ span: 2 }}>{item.sportname}</Col>
                    <Col xs={{ span: 2 }}>{item.openday ===1? '周一' : '' || item.openday === 2 ? '周二' : '' || item.openday === 3 ? '周三' : '' || item.openday === 4 ? '周四' : '' || item.openday === 5 ? '周五' : '' || item.openday === 6 ? '周六' : '' || item.openday === 0 ? '周日' : ''}</Col>
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
          <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<Icon type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="您没有进行场地设置！" />,
        </Spin>
        <Modal
          title="添加/修改场地设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={630}
          className='model'
        >
          <div className="modelList">
            <span>运动项目</span>
            <Select placeholder="请选择" value={this.state.runId} className="selectModel" style={{ width: 249 }} onChange={this.handleChangeOne}>
              {
                this.state.ListSport.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
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
              <Option value="0">周日</Option>
            </Select>
          </div>

          <div className="modelList">
            <span>开始时间</span>
            <Select value={this.state.starttime} className="startTime" defaultActiveFirstOption={false} onChange={this.handleChangThree} placeholder="开始时间" >
              {
                this.state.time.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))
              }
            </Select>
            {/* <TimePicker className="startTime" placeholder="请选择时间" value={this.state.starttime === undefined || this.state.starttime === '' ? null : moment(this.state.starttime, format)} minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.handleChangThree} /> */}
          </div>

          <div className="modelList">
            <span>结束时间</span>
            <Select value={this.state.endtime} className="startTime" defaultActiveFirstOption={false} onChange={this.endtime} placeholder="开始时间" >
              {
                this.state.time.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))
              }
            </Select>
            {/* <TimePicker className="startTime" placeholder="请选择时间" value={this.state.endtime === undefined || this.state.endtime === '' ? null : moment(this.state.endtime, format)} minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.endtime} /> */}
          </div>

          <div className="modelList">
            <span>价格</span><span>（元/小时）</span>
            <InputNumber className="startTime" value={this.state.costperhour} defaultValue={0} min={0} placeholder="请输入" onChange={this.money} />
          </div>

          <div className="modelList">
            <span>数量</span>
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
      </div>
    );
  }
}

export default siteSettings;
import React from 'react';
import './special.css';
import 'antd/dist/antd.css';
import { getVenueSpecialList, getVenueSport, getVenueSpecialDel, getSetUpFieldSportId, getVenueSpecialSave } from '../../api';
import { Select, Row, Col, Modal, InputNumber, message, Spin, Form, Result, Pagination,Popconfirm } from 'antd';
import {GiftOutlined} from '@ant-design/icons';
import 'moment/locale/zh-cn';
const { Option } = Select;






class special extends React.Component {
  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: [],//运动项目id
    runName: '请选择',//运动项目名称
    openday: [],//营业时间段Id
    starttime: '00:00',//开始时间
    endtime: '00:00',//结束时间
    costperhour: '',//价格
    startDate: '',//开始日期
    endDate: '',//结束日期
    number: 1,//数量
    appointmenttime: '请选择',//最短可提前预定时间
    comment: '',//备注
    loading: true,//加载
    hidden: '',
    other: 0,
    page: 1,
    perOpen: 0,
    upSportid: [],
    numberMax: 0,
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
    ],
    siteEditor: 0,//场地设置打开修改
    minNum: 1,
    maxNum: 1,
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }
    this.setState({ ListSport: res.data.data })
  }


  async getSetUpFieldSportId(data) {
    const res = await getSetUpFieldSportId(data, sessionStorage.getItem('venue_token'))
    this.setState({ upSportid: res.data.data })
  }


  async getVenueSpecialList(data) {
    const res = await getVenueSpecialList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.siteEditor === 0) {
        if (res.data.data.length > 0) {
          this.setState({ list: res.data.data, other: res.data.other, loading: false, hidden: true })
        } else {
          this.setState({ list: res.data.data, other: res.data.other, loading: false, hidden: false })
        }

      } else {
        let day = ''
        switch (res.data.data[0].sportname) {
          case '羽毛球':
            day = 1;
            break;
          case '乒乓球':
            day = 2;
            break;
          case "台球":
            day = 3;
            break;
          case "篮球":
            day = 4;
            break;
          case "足球":
            day = 5;
            break;
          case "排球":
            day = 6;
            break;
          case "网球":
            day = 7;
            break;
          case "高尔夫":
            day = 8;
            break;
          default:
            day = "";
        }
        let { upSportid } = this.state
        for (let i in upSportid) {
          if (upSportid[i].sportid === day) {
            this.setState({ maxNum: upSportid[i].maxtablecount, numberMax: upSportid[i].maxtablecount })
          }
        }
        this.setState({
          openday: res.data.data[0].openday, runId: day, uuid: res.data.data[0].uuid,
          starttime: res.data.data[0].starttime.slice(0, 5), endtime: res.data.data[0].endtime.slice(0, 5),
          costperhour: res.data.data[0].money, minNum: res.data.data[0].venueid.split(',')[0], maxNum: res.data.data[0].venueid.split(',')[res.data.data[0].venueid.split(',').length - 1]
        })

      }
    } else {
      if (this.state.siteEditor === 0) {
        this.setState({ list: res.data.data, loading: false, hidden: false })
      }
    }
  }

  componentDidMount() {
    this.getVenueSport()
    this.getVenueSpecialList({ sportid: '', page: '' })
    sessionStorage.setItem('preferential', '')
    this.getSetUpFieldSportId()
  }

  handleChangeSelect = e => {
    sessionStorage.setItem('preferential', e)
    this.getVenueSpecialList({ sportid: e, page: '' })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });

  };

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

  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    if (this.state.siteEditor === 1) {
      this.setState({
        uuid: '',
        openday: [], starttime: [], endtime: [], costperhour: '', minNum: 1, maxNum: 1, runId: []
      })
    }
    this.setState({
      visible: false,
      siteEditor: 0
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
    let { upSportid } = this.state
    for (let i in upSportid) {
      if (upSportid[i].sportid === e) {
        this.setState({ maxNum: upSportid[i].maxtablecount, numberMax: upSportid[i].maxtablecount })
      }
    }
    this.setState({ runName: day })
  }


  handleChangThree = (e) => {

    this.setState({ starttime: this.state.time[parseInt(e)].name })
  }
  endtime = (e) => {
    this.setState({ endtime: this.state.time[parseInt(e)].name })
  }
  money = e => {
    this.setState({ costperhour: e })
  }
  handleChangeFive = e => {
    this.setState({ appointmenttime: parseInt(e) })
  }
  textArea = e => {
    this.setState({ comment: e.target.value })
  }

  jian = () => {
    if (this.state.number > 1) {
      this.setState({ number: this.state.number - 1 })
    }

  }
  jia = () => {
    if (this.state.number < 100 && this.state.number < this.state.numberMax) {
      this.setState({ number: this.state.number + 1 })
    } else {
      message.warning('已达场地数量最大值')
    }
  }

  onChangeStartDate = (data, dateString) => {
    this.setState({ startDate: dateString[0], endDate: dateString[1] })
  }



  async getVenueSpecialSave(data) {
    const res = await getVenueSpecialSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({
        visible: false,
      });
      message.info(res.data.msg)
      this.getVenueSpecialList({ sportid: '', page: '' })
    }
  }

  submit = (e) => {
    let { runId, starttime, endtime, costperhour, openday, minNum, maxNum } = this.state
    let numGo = []
    for (var i = 0; i <= maxNum - minNum; i++) {
      numGo.push(parseInt(minNum) + parseInt(i))
    }

    let data = {
      sportid: runId,
      starttime: starttime,
      endtime: endtime,
      money: costperhour,
      venueid: numGo.join(','),
      uuid: this.state.uuid
    }
    if (typeof (openday) === 'number') {
      data.openday = openday
    } else {
      data.openday = openday.join(',')
    }
    this.getVenueSpecialSave(data)
  }

  updata = (e) => {
    this.setState({ visible: true, siteEditor: 1, })
    this.getVenueSpecialList({ uuid: e.target.dataset.uid })
  }


  async getVenueSpecialDel(data) {
    const res = await getVenueSpecialDel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      message.info('删除成功')
      this.getVenueSpecialList({ sportid: sessionStorage.getItem('preferential'), page: this.state.page })
    }
  }
  delet = (e) => {
    this.setState({deletUid:e.target.dataset.uid})
  }
  minNum = e => {
    if (this.state.runId.length !== 0) {
      this.setState({ minNum: e })
    } else {
      message.warning('选择运动项目')
    }
  }
  maxNum = e => {
    if (this.state.runId.length !== 0) {
      this.setState({ maxNum: e })
    } else {
      message.warning('选择运动项目')
    }
  }

  confirm = () => {
    this.getVenueSpecialDel({ uuid: this.state.deletUid })
   
  }

  current = (page, pageSize) => {
    this.setState({ page: page })
    this.getVenueSpecialList({ sportid: sessionStorage.getItem('preferential'), page: page })
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
          <div className={this.state.hidden === true ? 'siteList' : 'hidden'} >
            <Row className="rowConten">
              <Col xs={{ span: 2 }}>运动项目</Col>
              <Col xs={{ span: 4 }}>节假日/工作日</Col>
              <Col xs={{ span: 2 }}>开始时间</Col>
              <Col xs={{ span: 2 }}>结束时间</Col>
              <Col xs={{ span: 3 }}>价格(元/时)</Col>
              <Col xs={{ span: 7 }}>场地号</Col>
              <Col xs={{ span: 2 }}>操作</Col>
            </Row>

            <div className="dataList" >
              {
                this.state.list.map((item, i) => (
                  <Row key={i} className="rowList">
                    <Col xs={{ span: 2 }}>{item.sportname}</Col>
                    <Col xs={{ span: 4 }}>{item.openday === 0 ? ['周日'] : '' || item.openday === 1 ? ['周一'] : '' || item.openday === 2 ? ['周二'] : '' || item.openday === 3 ? ['周三'] : '' || item.openday === 4 ? ['周四'] : '' || item.openday === 5 ? ['周五'] : '' || item.openday === 6 ? ['周六'] : ''}</Col>
                    <Col xs={{ span: 2 }}>{item.starttime.slice(0, 5)}</Col>
                    <Col xs={{ span: 2 }}>{item.endtime.slice(0, 5)}</Col>
                    <Col xs={{ span: 3 }}>{item.money + '元'}</Col>
                    <Col xs={{ span: 7 }}>{item.venueid.length >= 2 ? item.venueid.split(',')[0] + '~' + item.venueid.split(',')[item.venueid.split(',').length - 1] : item.venueid}</Col>
                    <Col className="updata" xs={{ span: 2 }}><img onClick={this.updata} data-uid={item.uuid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />
                    <Popconfirm
                        title="你确定要删除本条信息吗?"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消"
                      >
                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img data-uid={item.uuid} onClick={this.delet} src={require("../../assets/icon_pc_delet.png")} alt="删除" />
                      </Popconfirm>
                      </Col>
                  </Row>
                ))
              }
            </div>
          </div>
          <Pagination className={this.state.hidden === true ? 'fenye' : 'hidden'} current={this.state.page}  hideOnSinglePage={true} showSizeChanger={false}  defaultCurrent={1} total={this.state.other === '' ? this.state.list.length : this.state.other} onChange={this.current} />
          <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<GiftOutlined style={{color:'#F5A623'}}/>} title="您还没有设置特殊场地" />
        </Spin>



        <Modal
          title="添加/修改特殊场地"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={630}
          className='model'
        >
          <Form>
            <div className="modelList">
              <span>运动项目</span>
              <Select placeholder="请选择" value={this.state.runId} className="selectModel" style={{ width: 249 }} onChange={this.handleChangeOne}>
                {
                  this.state.upSportid.map((item, i) => (
                    <Option key={i} value={item.sportid}>{item.name}</Option>
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
              <span>场地号</span>
              <InputNumber style={{ marginLeft: '122px', height: '26px', paddingLeft: '10px' }} value={this.state.minNum} defaultValue={1} min={1} max={this.state.numberMax} placeholder="请输入" onChange={this.minNum} />~
              <InputNumber style={{ height: '26px', paddingLeft: '10px' }} value={this.state.maxNum} defaultValue={1} min={1} max={this.state.numberMax} placeholder="请输入" onChange={this.maxNum} />
            </div>


            <div className="modelList">
              <span>开始时间</span>
              <Select value={this.state.starttime} className="startTime" defaultActiveFirstOption={false} onChange={this.handleChangThree} placeholder="开始时间" >
                {
                  this.state.time.map((item, i) => (
                    <Option key={i}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList">
              <span>结束时间</span>

              <Select value={this.state.endtime} className="startTime" defaultActiveFirstOption={false} onChange={this.endtime} placeholder="结束时间" >
                {
                  this.state.time.map((item, i) => (
                    <Option key={i} >{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList">
              <span>价格</span><span>（元/小时）</span>
              <InputNumber className="startTime" style={{ paddingLeft: '10px' }} value={this.state.costperhour} defaultValue={0} min={0} placeholder="请输入" onChange={this.money} />
            </div>

            <div className="submit" onClick={this.submit}>保存</div>
          </Form>


        </Modal>




      </div>
    );
  }
}

export default special;
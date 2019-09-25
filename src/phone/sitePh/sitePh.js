import React from 'react';
import './sitePh.css';
import { message, Row, Col, Input, Pagination, Drawer, Select, TimePicker, DatePicker } from 'antd';
import { getVenueFieldList, getVenueSport, addVenueField, getFirstField, getVenueDiscountList,addVenueDiscount } from '../../api';

import moment from 'moment';

const format = 'HH:mm';


const { Option } = Select;
class sitePh extends React.Component {

  state = {
    getVenueFieldList: [],
    total: 0,
    clickNum: 1,
    sportid: '',
    selectNum: null,
    flag: false,
    visible: false,
    userPickerVisible: false,
    addressPickerVisible: false,
    defaultValue: { name: '足球', value: 5 },
    address: this.defaultAddress,
    sValue: ['2013', '春'],
    sportList: [],
    DrawerVisible: false,
    addsporId: '',
    runName: '',
    dateChange: '',
    startTime: '',
    endTime: '',
    price: '',
    num: '',
    weekChange: '',
    timeChange: '',
    comment: '',
    getVenueDiscountList: [],
    Youtotal: 1,
    selectNumTwo: null,
    Youvisible: false,

    projectTwoId:'',
    projectTwoName:'',
    startDateTwo:'',
    endDateTwo:'',
    startTimeTwo:'',
    endTimeTwo:'',
    priceTwo:'',
    numTwo:'',
    timeChangeTwo:'',
    commentTwo:'',
  };
  async getVenueFieldList(data) {
    const res = await getVenueFieldList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].maxScheduledDate === 0.1) {
          res.data.data[i].date = '一周'
        } else if (res.data.data[i].maxScheduledDate === 0.2) {
          res.data.data[i].date = '二周'
        } else if (res.data.data[i].maxScheduledDate === 0.3) {
          res.data.data[i].date = '三周'
        } else if (res.data.data[i].maxScheduledDate === 1) {
          res.data.data[i].date = '一个月'
        } else if (res.data.data[i].maxScheduledDate === 2) {
          res.data.data[i].date = '两个月'
        }
      }
      this.setState({ getVenueFieldList: res.data.data, total: res.data.other })
    }
  }


  async getVenueDiscountList(data) {
    const res = await getVenueDiscountList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ getVenueDiscountList: res.data.data, Youtotal: res.data.other })
    }
  }


  
  async addVenueDiscount(data) {
    const res = await addVenueDiscount(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({Youvisible:false})
      this.getVenueDiscountList({ sportid: '', page: '' })
    }else if(res.data.code !== 4001&&res.data.code !== 2000){
      message.info(res.data.msg)
    }
  }
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ sportList: res.data.data })
    }
  }

  async getFirstField(data) {
    const res = await getFirstField(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ editor: res.data.data })
    }
  }


  async addVenueField(data) {
    const res = await addVenueField(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      message.info('操作成功')
      this.setState({ DrawerVisible: false })
      this.getVenueFieldList({ sportid: '', page: '' })
    } else {
      message.error(res.data.msg)
    }
  }

  componentDidMount() {
    this.getVenueFieldList({ sportid: '', page: '' })
    this.getVenueDiscountList({ sportid: '', page: '' })
    this.getVenueSport()
  }
  site = () => {
    this.setState({ clickNum: 1 })
  }
  preferential = () => {
    this.setState({ clickNum: 2 })
  }

  current = (page, pageSize) => {
    this.getVenueFieldList({ sportid: this.state.sportid, page: page })
  }

  currentTwo = (page, pageSize) => {
    this.getVenueDiscountList({ sportid: this.state.sportid, page: page })
  }
  selectBottom = (e) => {
    this.setState({ selectNum: e.currentTarget.dataset.index, flag: true })
  }
  selectBottomTwo = (e) => {
    this.setState({ selectNumTwo: e.currentTarget.dataset.index, flag: true })
  }

  addList = () => {
    this.setState({ DrawerVisible: true })
  }

  addYouList = () => {
    this.setState({ Youvisible: true })
  }


  drawerClose = () => {
    this.setState({ DrawerVisible: false })
  }

  drawerCloseTwo = () => {
    this.setState({ Youvisible: false })
  }
  handleChangeUser = (data) => {
    data = data || {}
    this.userData.defaultValue = data
    this.setState({ defaultValue: data })
  }

  closeUserPicker = () => {
    this.setState({ userPickerVisible: false })
  }

  cancelUserPicker = () => {
    this.userData.defaultValue = {};
    this.setState({
      userPickerVisible: false,
      defaultValue: {}
    });
  }
  project = e => {
    this.setState({ addsporId: e })
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

  dateChange = e => {
    this.setState({ dateChange: e.join(',') })
  }
  startTime = (date, dateString) => {
    this.setState({ startTime: dateString })
  }
  endTime = (date, dateString) => {
    this.setState({ endTime: dateString })
  }
  price = e => {
    this.setState({ price: e.target.value })
  }
  num = e => {
    this.setState({ num: e.target.value })
  }
  weekChange = e => {
    this.setState({ weekChange: e })
  }
  timeChange = e => {
    this.setState({ timeChange: e })
  }
  comment = e => {
    this.setState({ comment: e.target.value })
  }
  submit = () => {
    let { addsporId, runName, dateChange, startTime, endTime, price, num, weekChange, timeChange, comment } = this.state

    let data = {
      sportid: addsporId,
      sportname: runName,
      openday: dateChange,
      opendayname: '',
      starttime: startTime,
      endtime: endTime,
      costperhour: price,
      maxtablecount: num,
      maxScheduledDate: weekChange,
      appointmenttime: timeChange,
      comment: comment,
      uuid: ''
    }
    this.addVenueField(data)
  }
  editor = e => {
    this.setState({ DrawerVisible: true })
    this.getFirstField({ uuid: e.currentTarget.dataset.uuid })
  }


 //////////////////////  优惠活动获取添加
 projectTwo = e => {
  this.setState({ projectTwoId: e })
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
  this.setState({ projectTwoName: day })
}
startDateTwo=(date,dateString)=>{
 this.setState({startDateTwo:dateString})
}
endDateTwo=(date,dateString)=>{
  this.setState({endDateTwo:dateString})
}
startTimeTwo=(date,dateString)=>{
  this.setState({startTimeTwo:dateString})
}

endTimeTwo=(date,dateString)=>{
  this.setState({endTimeTwo:dateString})
}
priceTwo=e=>{
  this.setState({priceTwo:e.target.value})
}
numTwo=e=>{
  this.setState({numTwo:e.target.value})
}
timeChangeTwo=e=>{
  this.setState({ timeChangeTwo: e })
}
commentTwo=e=>{
  this.setState({commentTwo:e.target.value})
}
submitTwo=()=>{
  let {projectTwoId,projectTwoName,startDateTwo,endDateTwo,startTimeTwo,endTimeTwo,priceTwo,numTwo,timeChangeTwo,commentTwo}=this.state
  let data={
    sportid:projectTwoId,
    sportname:projectTwoName,
    starttime:startTimeTwo,
    endtime:endTimeTwo,
    costperhour:priceTwo,
    maxtablecount:numTwo,
    appointmenttime:timeChangeTwo,
    fromdate:startDateTwo,
    enddate:endDateTwo,
    comment:commentTwo,
    uuid:''
  }
this.addVenueDiscount(data)
}
  render() {
    return (
      <div className="sitePh">
        <div className="headerTitle">
          <div onClick={this.site} style={this.state.clickNum === 1 ? { color: '#333', borderBottom: '0.12rem solid #333' } : {}}>场地设置</div>
          <div onClick={this.preferential} style={this.state.clickNum === 2 ? { color: '#333', borderBottom: '0.12rem solid #333' } : {}}>优惠活动</div>
        </div>
        <div className={this.state.clickNum === 1 ? 'site' : 'none'}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #f5f5f5' }}>
            <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 1 }}>运动项目</Col>
            <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 1 }}>时间</Col>
            <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>价格（元/时）</Col>
          </Row>
          {
            this.state.getVenueFieldList.map((item, i) => (
              <div key={i} style={{ borderBottom: '0.06rem solid #f5f5f5' }}>
                <Row onClick={this.selectBottom} data-index={i}>
                  <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.sportname}</Col>
                  <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.starttime + '-' + item.endtime}</Col>
                  <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.costperhour}</Col>
                </Row>
                <div className={parseInt(this.state.selectNum) === i && this.state.flag === true ? 'selectBottom' : 'none'}>
                  <div className="top"><div><span>日期</span>{item.opendayname}</div><div><span>场地数量</span>{item.maxtablecount}</div></div>
                  <div className="top" style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}><div><span>最长可预定时间</span>{item.date}</div>
                    <div style={{ marginLeft: '1rem' }}><span>最短预定时间</span>{item.appointmenttime + '分钟'}</div></div>
                  <img className="upLoad" onClick={this.editor} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" />
                </div>
              </div>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} onChange={this.current} total={this.state.total} />
          <img className="addList" onClick={this.addList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
          <Drawer
            title="添加/修改场地设置"
            placement="right"
            width='100%'
            closable={false}
            onClose={this.drawerClose}
            visible={this.state.DrawerVisible}
          >
            <div className="sitePhlistSon">
              <span>运动项目</span>
              <Select
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.project}
              >
                {
                  this.state.sportList.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="sitePhlistSon">
              <span>节假日/工作日</span>
              <Select
                mode="multiple"
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.dateChange}
              >
                <Option value='1'>周一</Option>
                <Option value='2'>周二</Option>
                <Option value='3'>周三</Option>
                <Option value='4'>周四</Option>
                <Option value='5'>周五</Option>
                <Option value='6'>周六</Option>
                <Option value='0'>周日</Option>
              </Select>
            </div>

            <div className="sitePhlistSon">
              <span>开始时间</span>
              <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.startTime} defaultValue={moment('00:00', format)} format={format} />
            </div>

            <div className="sitePhlistSon">
              <span>结束时间</span>
              <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.endTime} defaultValue={moment('00:00', format)} format={format} />
            </div>

            <div className="sitePhlistSon">
              <span>价格(元/时)</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.price} placeholder="请输入" type="number" />
            </div>

            <div className="sitePhlistSon">
              <span>数量</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.num} placeholder="请输入" type="number" />
            </div>

            <div className="sitePhlistSon">
              <span>最长可预定时间</span>
              <Select
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.weekChange}
              >
                <Option value='0.1'>一周</Option>
                <Option value='0.2'>两周</Option>
                <Option value='0.3'>三周</Option>
                <Option value='1'>一个月</Option>
                <Option value='2'>两个月</Option>
              </Select>
            </div>

            <div className="sitePhlistSon">
              <span>最短提前预定时间</span>
              <Select
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.timeChange}
              >
                <Option value='0'>0分钟</Option>
                <Option value='30'>30分钟</Option>
                <Option value='60'>60分钟</Option>
                <Option value='120'>120分钟</Option>
                <Option value='180'>180分钟</Option>
              </Select>
            </div>

            <div className="sitePhlistSon">
              <span>备注</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.comment} placeholder="请输入" type="number" />
            </div>


            <div className="sitePhsubmit" onClick={this.submitTwo}>提交</div>
            <div className="sitePhclose" onClick={this.drawerClose}>取消</div>
          </Drawer>
        </div>
        <div className={this.state.clickNum === 2 ? 'preferential' : 'none'}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #f5f5f5' }}>
            <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 1 }}>运动项目</Col>
            <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 1 }}>时间</Col>
            <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>价格（元/时）</Col>
          </Row>
          {
            this.state.getVenueDiscountList.map((item, i) => (
              <div key={i} style={{ borderBottom: '0.06rem solid #f5f5f5' }}>
                <Row onClick={this.selectBottomTwo} data-index={i}>
                  <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.sportname}</Col>
                  <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.starttime + '-' + item.endtime}</Col>
                  <Col xs={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>{item.costperhour}</Col>
                </Row>
                <div className={parseInt(this.state.selectNumTwo) === i && this.state.flag === true ? 'selectBottom' : 'none'}>
                  <div className="top"><div><span>场地预留数量</span>{item.maxtablecount}</div><div><span>最短提前预定时间</span>{item.appointmenttime}</div></div>
                  <div className="top" style={{ marginTop: '0.5rem', marginBottom: '0.3rem' }}><span>最长可预定时间</span>{item.fromdate}至{item.enddate}</div>
                  <img className="upLoad" onClick={this.editor} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" />
                </div>
              </div>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} onChange={this.currentTwo} total={this.state.Youtotal} />
          <img className="addList" onClick={this.addYouList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
        </div>
        <Drawer
          title="添加/修改优惠活动"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.Youvisible}
          width='100%'
        >
          <div className="SzSon">
            <span>运动项目</span>
            <Select
              style={{ width: '50%', float: 'right' }}
              placeholder="请选择"
              onChange={this.projectTwo}
            >
              {
                this.state.sportList.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>

          <div className="SzSon">
            <span>开始日期</span>
            <DatePicker style={{ width: '50%', float: 'right' }} placeholder="请选择开始日期" onChange={this.startDateTwo} />
          </div>

          <div className="SzSon">
            <span>结束日期</span>
            <DatePicker style={{ width: '50%', float: 'right' }} placeholder="请选择结束日期" onChange={this.endDateTwo} />
          </div>


          <div className="SzSon">
            <span>开始时间</span>
            <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.startTimeTwo} defaultValue={moment('00:00', format)} format={format} />
          </div>

          <div className="SzSon">
            <span>结束时间</span>
            <TimePicker style={{ float: 'right', width: '50%' }} onChange={this.endTimeTwo} defaultValue={moment('00:00', format)} format={format} />
          </div>
         
          <div className="SzSon">
              <span>价格(元/时)</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.priceTwo} placeholder="请输入" type="number" />
            </div>

            <div className="SzSon">
              <span>数量</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.numTwo} placeholder="请输入" type="number" />
            </div>

            <div className="SzSon">
              <span>最短提前预定时间</span>
              <Select
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.timeChangeTwo}
              >
                <Option value='0'>0分钟</Option>
                <Option value='30'>30分钟</Option>
                <Option value='60'>60分钟</Option>
                <Option value='120'>120分钟</Option>
                <Option value='180'>180分钟</Option>
              </Select>
            </div>

            <div className="SzSon">
              <span>备注</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} onChange={this.commentTwo} placeholder="请输入" type="number" />
            </div>
            <div className="sitePhsubmit" onClick={this.submitTwo}>提交</div>
            <div className="sitePhclose" onClick={this.drawerCloseTwo}>取消</div>

        </Drawer>




      </div>
    );
  }
}

export default sitePh;
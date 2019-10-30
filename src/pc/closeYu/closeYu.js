import React from 'react';
import './closeYu.css';
import 'antd/dist/antd.css';
import { VenueTemporarilyClosedList, getVenueSport, VenueTemporarilyClosed, VenueTemporarilyClosedDel,VenueTemporarilyClosedSave } from '../../api';
import { message, Modal, Select, DatePicker, Input, LocaleProvider, Row, Col, Popconfirm, Result, Icon,Pagination } from 'antd';

import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const { Option } = Select;


const { RangePicker } = DatePicker;
const { TextArea } = Input;





function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}



class closeYu extends React.Component {

  state = {
    visible: false,
    start: '',
    end: '',
    ListSport: [],
    runName: [],
    runId: '',
    textArea: '',
    closeList: [],
    Uid: '',
    other: 0,
    page:0,
    update:0,
    colseuuid:'',
  };






  async VenueTemporarilyClosedList(data) {
    const res = await VenueTemporarilyClosedList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code !== 2000 && res.data.code !== 4001) {
      this.setState({ closeList: res.data.data, other: res.data.other })
    } else {
      if(this.state.update===1){
        this.setState({runName:res.data.data[0].sportname,start:res.data.data[0].starttime,end:res.data.data[0].endtime,runId:res.data.data[0].sportid,textArea:res.data.data[0].comment})
      }else if(this.state.update===0){
        this.setState({ closeList: res.data.data, other: res.data.other })
      }
    }
  }


  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆!')
    } else {
      this.setState({ ListSport: res.data.data })
    }
  }


  model = () => {
    this.getVenueSport()
    this.setState({ visible: true })
  }
  componentDidMount() {
    this.VenueTemporarilyClosedList()
    let start = moment().startOf('day').add(1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
    let end = moment().endOf('day').add(1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
    this.setState({ start: start, end: end })
  }


  next = () => {
    this.props.history.goBack()
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  dateSelect = (e) => {
    let start = this.timer(e[0]._d)
    let end = this.timer(e[1]._d)
    this.setState({ start: start, end: end })
  }

  dateChange=(dates,eStrings)=>{
   this.setState({start:eStrings[0],end:eStrings[1]})
  }

  timer = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dateR = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()

    var time = year + "-" + month + "-" + dateR + " " + hour + ":" + minutes; //2009-06-12 17:18:05
    return time;
  }
  handleChangeSelect = e => {
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

  textArea = e => {
    this.setState({ textArea: e.target.value })
  }

  async VenueTemporarilyClosed(data) {
    const res = await VenueTemporarilyClosed(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ visible: false })
      message.info(res.data.msg)
      this.VenueTemporarilyClosedList()
    }
  }


  
  async VenueTemporarilyClosedSave(data) {
    const res = await VenueTemporarilyClosedSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ visible: false,update:0 })
      message.info(res.data.msg)
      this.VenueTemporarilyClosedList()
    }
  }

  modelSubmit = () => {
    let { runName, runId, start, end, textArea,colseuuid } = this.state
    if(this.state.update===0){
    this.VenueTemporarilyClosed({ sportid: runId, sportname: runName, starttime: start, endtime: end, comment: textArea })
    }else if(this.state.update===1){
       this.VenueTemporarilyClosedSave({colseuuid:colseuuid,sportid:runId,sportname:runName,starttime:start,endtime:end,comment:textArea})
    }


  }

  delet = e => {
    this.setState({ Uid: e.target.dataset.uid })
  }


  async VenueTemporarilyClosedDel(data) {
    const res = await VenueTemporarilyClosedDel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      message.info(res.data.msg)
      this.VenueTemporarilyClosedList({page:this.state.page})
    }
  }
  handleCancel=()=>{
    this.setState({update:0,visible:false})
  }



  confirm = () => {
    this.VenueTemporarilyClosedDel({ colseuuid: this.state.Uid })
  }

  update = e => {
    this.getVenueSport()
    this.setState({ visible: true,update:1,colseuuid:e.target.dataset.uid })
    this.VenueTemporarilyClosedList({colseuuid:e.target.dataset.uid})

  }



  current = (page, pageSize) => {
    this.setState({ page: page })
    this.VenueTemporarilyClosedList({ page: page })
  }




  render() {
    return (
      <div className="closeYu">
        <div className="headTitle"><span onClick={this.next}>系统设置</span><span style={{ color: '#F5A623' }}>>临时关闭预约列表</span> <div className='rightBtn' onClick={this.model}>添加</div></div>
        <div style={{ width: '100%', height: '8px', background: '#F5F5F5' }}></div>
        <div style={this.state.closeList.length < 1 ? { display: 'none' } : { display: 'block' }}>
          <Row style={{ borderBottom: '1px solid #E1E0E1' }}>
            <Col xs={{ span: 4 }}>运动名称</Col>
            <Col xs={{ span: 7, offset: 0 }}>开始时间</Col>
            <Col xs={{ span: 4, offset: 0 }}>结束时间</Col>
            <Col xs={{ span: 4, offset: 0 }}>操作</Col>
          </Row>
          {
            this.state.closeList.map((item, i) => (
              <Row key={i} style={{ borderBottom: '1px solid #E1E0E1' }}>
                <Col xs={{ span: 4 }}>{item.sportname}</Col>
                <Col xs={{ span: 7, offset: 0 }}>{item.starttime}</Col>
                <Col xs={{ span: 4, offset: 0 }}>{item.endtime}</Col>
                <Col xs={{ span: 4, offset: 0 }}>
                  <img onClick={this.update} data-uid={item.uuid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;
                 <Popconfirm
                    title="你确定要删除本条信息吗?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <img onClick={this.delet} data-uid={item.uuid} src={require("../../assets/icon_pc_delet.png")} alt="删除" />
                  </Popconfirm>

                </Col>
              </Row>
            ))
          }
        </div>

        <Pagination className={this.state.closeList.length > 1 ? 'fenye' : 'hidden'} defaultCurrent={1} total={parseInt(this.state.other)} onChange={this.current} />
        <Result style={this.state.closeList.length < 1 ? { display: 'block' } : { display: 'none' }} icon={<Icon type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="您还没有关闭预约" />,
  
  
  
        <Modal
          title="添加/修改临时关闭预约时间"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="one">
            <span>运动项目</span>
            <Select placeholder="请选择" className="selectN" style={{ width: 350, marginLeft: 15 }} value={this.state.runName} onChange={this.handleChangeSelect}>
              {
                this.state.ListSport.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>  
          </div>
          <div className="one" style={{ marginTop: 20 }}>
            <span>选择时间</span>
            <LocaleProvider locale={zh_CN}>
              <RangePicker
                style={{ width: 350, marginLeft: 15 }}
                disabledDate={disabledDate}
                onChange={this.dateChange}
                onOk={this.dateSelect}
                value={[moment(this.state.start), moment(this.state.end)]}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
                }}
                format="YYYY-MM-DD HH:mm"
              />
            </LocaleProvider>
          </div>

          <div className="one" style={{ marginTop: 20 }}>
            <span style={{ display: 'block', float: 'left' }}>备注</span>
            <TextArea style={{ width: 350, marginLeft: 43 }} onChange={this.textArea} value={this.state.textArea} rows={3} />

          </div>
          <div className="submit" onClick={this.modelSubmit}>确认</div>
        </Modal>

      </div>


    );
  }
}

export default closeYu;
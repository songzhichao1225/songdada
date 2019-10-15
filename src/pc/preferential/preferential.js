import React from 'react';
import './preferential.css';
import 'antd/dist/antd.css';
import { getVenueDiscountList, addVenueDiscount, getVenueSport, DelVenueDiscount, getFirstDiscount } from '../../api';
import { Select, Row, Col, Modal, TimePicker, InputNumber, Input, message, DatePicker, Spin, Form,Result,Icon,Pagination } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
const format = 'HH:mm';
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;





class preferential extends React.Component {
  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: [],//运动项目id
    runName: '请选择',//运动项目名称
    openday: '',//营业时间段Id
    starttime: '',//开始时间
    endtime: '',//结束时间
    costperhour: 0,//价格
    startDate: '',//开始日期
    endDate: '',//结束日期
    number: 0,//数量
    appointmenttime: '请选择',//最短可提前预定时间
    comment: '',//备注
    loading: true,//加载
    DisList: '',//查看某一条优惠活动信息
    hidden:'',
    other:0,
    page:1,
    perOpen:0
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
     if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } 
    this.setState({ ListSport: res.data.data })
  }

  async getVenueDiscountList(data) {
    const res = await getVenueDiscountList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data,other:res.data.other, loading: false,hidden:true })
    }else {
      this.setState({ list: res.data.data, loading: false,hidden:false })
    }
  }

  componentDidMount() {
    this.getVenueSport()
    this.getVenueDiscountList({ sportid: '', page: '' })
    sessionStorage.setItem('preferential', '')
  }

  handleChangeSelect = e => {
    console.log(e)
    sessionStorage.setItem('preferential', e)
    this.getVenueDiscountList({ sportid: e, page: '' })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    if(this.state.perOpen===1){
      this.setState({
        runId: [], starttime: '', endtime: '', costperhour: '', startDate: '',
        endDate: '', number:1, appointmenttime: '请选择', comment: '',DisList:''
      })
    }
    this.setState({
      visible: false,
      perOpen:0
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


  handleChangThree = (value, dateString) => {

    this.setState({ starttime: dateString })
  }
  endtime = (value, dateString) => {
    this.setState({ endtime: dateString })
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
    if (this.state.number > 0) {
      this.setState({ number: this.state.number - 1 })
    }

  }
  jia = () => {
    if (this.state.number < 100) {
      this.setState({ number: this.state.number + 1 })
    }
  }

  onChangeStartDate = (data, dateString) => {
    console.log(dateString)
    this.setState({ startDate: dateString[0], endDate: dateString[1] })
  }



  async addVenueDiscount(data) {
    const res = await addVenueDiscount(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    }else if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }  else {
      this.setState({
        visible: false,
      });
      this.getVenueDiscountList({ sportid: '', page: '' })
    }

  }

  submit = (e) => {
    let { runId, runName, starttime, endtime, costperhour, number, appointmenttime, comment, startDate, endDate } = this.state
    let data = {
      sportid: runId,
      sportname: runName,
      starttime: starttime,
      endtime: endtime,
      costperhour: costperhour,
      maxtablecount: number,
      appointmenttime: appointmenttime,
      comment: comment,
      fromdate: startDate,
      enddate: endDate,
      uuid: e.target.dataset.uid
    }
    console.log(data)
    this.addVenueDiscount(data)
  }




  async getFirstDiscount(data) {
    const res = await getFirstDiscount(data, sessionStorage.getItem('venue_token'))
    let datefor = res.data.data
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    }else if(res.data.code===4001){
      this.props.history.push('/')
    }  else {
      this.setState({ DisList: res.data.data })
      this.setState({
        runId: datefor.sportid, starttime: datefor.starttime, endtime: datefor.endtime, costperhour: datefor.costperhour, startDate: datefor.fromdate,
        endDate: datefor.enddate, number: datefor.maxtablecount, appointmenttime: datefor.appointmenttime, comment: datefor.comment
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
    }
  }
  updata = (e) => {
    this.setState({ visible: true,perOpen:1, })
    this.getFirstDiscount({ uuid: e.target.dataset.uid })
  }



  async DelVenueDiscount(data) {
    const res = await DelVenueDiscount(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 200) {
      message.error(res.data.msg)
    }else if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }  else {
      message.info('删除成功')
    }
  }
  delet = (e) => {
    this.DelVenueDiscount({ uuid: e.target.dataset.uid })
    this.getVenueDiscountList({ sportid: sessionStorage.getItem('preferential'), page: this.state.page })
  }

  current=(page,pageSize)=>{
    this.setState({page:page})
    this.getVenueDiscountList({sportid:sessionStorage.getItem('siteSettings'),page:page})
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
        <div className={this.state.hidden===true?'siteList':'hidden'} >
          <Row className="rowConten">
            <Col xs={{ span: 2 }}>运动项目</Col>
            <Col xs={{ span: 2 }}>开始时间</Col>
            <Col xs={{ span: 2 }}>结束时间</Col>
            <Col xs={{ span: 2 }}>价格<span className="fontColor">元/时</span></Col>
            <Col xs={{ span: 5 }}>有效日期</Col>
            <Col xs={{ span: 3 }}>预留场地数量</Col>
            <Col xs={{ span: 3 }}>最短提前预定时间</Col>
            <Col xs={{ span: 2 }}>操作</Col>
          </Row>
          
            <div className="dataList" >
              {
                this.state.list.map((item, i) => (
                  <Row key={i} className="rowList">
                    <Col xs={{ span: 2 }}>{item.sportname}</Col>
                    <Col xs={{ span: 2 }}>{item.starttime}</Col>
                    <Col xs={{ span: 2 }}>{item.endtime}</Col>
                    <Col xs={{ span: 2 }}>{item.costperhour}</Col>
                    <Col xs={{ span: 5 }}>{item.fromdate}—{item.enddate}</Col>
                    <Col xs={{ span: 3 }}>{item.maxtablecount}</Col>
                    <Col xs={{ span: 3 }}>{item.appointmenttime}分</Col>
                    <Col className="updata" xs={{ span: 2 }}><img onClick={this.updata} data-uid={item.uid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;&nbsp;<img data-uid={item.uid} onClick={this.delet} src={require("../../assets/icon_pc_delet.png")} alt="删除" /></Col>
                  </Row>
                ))
              }
            </div>
        </div>
        <Pagination className={this.state.hidden===true?'fenye':'hidden'} defaultCurrent={1} total={this.state.other} onChange={this.current} />
          <Result className={this.state.hidden===true?'hidden':''} icon={<Icon type="gift" theme="twoTone"  twoToneColor="#F5A623"/>}title="您没有优惠活动！"/>
         </Spin>

        

        <Modal
          title="添加优惠活动"
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
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList">
              <span>开始时间</span>
              <TimePicker className="startTime" value={this.state.starttime === undefined || this.state.starttime === '' ? null : moment(this.state.starttime, format)} placeholder="请选择时间" minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.handleChangThree} />
            </div>

            <div className="modelList">
              <span>结束时间</span>
              <TimePicker className="startTime" value={this.state.endtime === undefined || this.state.endtime === '' ? null : moment(this.state.endtime, format)} placeholder="请选择时间" minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.endtime} />
            </div>

            <div className="modelList">
              <span>价格</span><span>（元/小时）</span>
              <InputNumber className="startTime" value={this.state.costperhour} defaultValue={0} min={0} placeholder="请输入" onChange={this.money} />
            </div>

            <div className="modelList">
              <span>有效日期</span>
              <RangePicker locale={zh_CN}
                style={{ width: 249, height: 26, marginLeft: 108 }}
                value={this.state.startDate === undefined || this.state.endDate === undefined || this.state.startDate === "" || this.state.endDate === "" ? null : [moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]}
                placeholder={['开始日期', '结束日期']}
                onChange={this.onChangeStartDate} />
            </div>

            <div className="modelList">
              <span>预留场地数量</span>
              <div className="startTime"> <span className="jian" onClick={this.jian}>-</span > &nbsp; {this.state.number} &nbsp;  <span className="jia" onClick={this.jia}>+</span></div>
            </div>

            <div className="modelList">
              <span>最短提前预定时间</span>
              <Select defaultValue="请选择" placeholder="请选择" value={this.state.appointmenttime===0?'0分钟':[]&&this.state.appointmenttime===30?'30分钟':[]&&this.state.appointmenttime===60?'60分钟':[]&&this.state.appointmenttime===120?'120分钟':[]&&this.state.appointmenttime===180?'180分钟':[]} className="selectModel" style={{ width: 249 }} onChange={this.handleChangeFive}>
                <Option value="0">0分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="120">120分钟</Option>
                <Option value="180">180分钟</Option>
              </Select>
            </div>

            <div className="modelListT">
              <span>备注</span>
              <TextArea className="textArea" rows={4} value={this.state.comment} placeholder='请输入' onChange={this.textArea} />
            </div>
            <div className="submit" data-uid={this.state.DisList !== '' ? this.state.DisList.uid : ''} onClick={this.submit}>保存</div>
          </Form>


        </Modal>




      </div>
    );
  }
}

export default preferential;
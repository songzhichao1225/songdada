import React from 'react';
import './preferential.css';
import 'antd/dist/antd.css';
import { getVenueDiscountList, addVenueDiscount, getVenueSport,DelVenueDiscount,getFirstDiscount} from '../../api';
import { Select, Row, Col, Modal, TimePicker, InputNumber, Input, message, DatePicker, Spin,Form,Button } from 'antd';
import moment from 'moment';
const format = 'HH:mm';
const { Option } = Select;
const { RangePicker } = DatePicker;

const { TextArea } = Input;


function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}



class preferential extends React.Component {

  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: '',//运动项目id
    runName: '',//运动项目名称
    openday: '',//营业时间段Id
    starttime: '',//开始时间
    endtime: '',//结束时间
    costperhour: 0,//价格
    startDate: '',//开始日期
    endDate: '',//结束日期
    number: 0,//数量
    appointmenttime: '',//最短可提前预定时间
    comment: '',//备注
    loading: true,//加载
    DisList:'',//查看某一条有毁活动信息
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    this.setState({ ListSport: res.data.data })
  }

  async getVenueDiscountList(data) {
    const res = await getVenueDiscountList(data, sessionStorage.getItem('venue_token'))
    console.log(res)
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data, loading: false })
    }else{
      message.error(res.data.msg)
      this.setState({ list: res.data.data, loading: false })
    }
  }

  componentDidMount() {
    this.getVenueSport()
    this.getVenueDiscountList({ sportid: '', page: '' })
    sessionStorage.setItem('preferential','')
  }

  handleChangeSelect = e => {
    console.log(e)
    sessionStorage.setItem('preferential',e)
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
    console.log(e);
    this.setState({
      visible: false,
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
    this.setState({ appointmenttime: e })
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
    } else {
      this.setState({
        visible: false,
      });
      this.getVenueDiscountList({ sportid: '', page: '' })
    }

  }

  submit = () => {
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
      uuid: ''
    }
    console.log(data)
    this.addVenueDiscount(data)
  }

  
 

  async getFirstDiscount(data) {
    const res = await getFirstDiscount(data,sessionStorage.getItem('venue_token'))
    console.log(res)
    if(res.data.code!==2000){
      message.error(res.data.msg)
    }else{
      this.setState({DisList:res.data.data})
    }
  }
  updata=(e)=>{
    
   this.setState({visible:true})
    this.getFirstDiscount({uuid:e.target.dataset.uid})
     

  }




  async DelVenueDiscount(data) {
    const res = await DelVenueDiscount(data,sessionStorage.getItem('venue_token'))
    if(res.data.code!==200){
      message.error(res.data.msg)
    }else{
      message.info('删除成功')
    }
  }
  delet=(e)=>{
    this.DelVenueDiscount({uuid:e.target.dataset.uid})
    this.getVenueDiscountList({ sportid: sessionStorage.getItem('preferential'), page: '' })
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
        <div className="siteList">

          <Row className="rowConten">
            <Col xs={{ span: 2 }}>运动项目</Col>
            <Col xs={{ span: 2,offset:1 }}>开始时间</Col>
            <Col xs={{ span: 2,offset:1}}>结束时间</Col>
            <Col xs={{ span: 2,offset:1 }}>价格<span className="fontColor">元/时</span></Col>
            <Col xs={{ span: 3 }}>有效日期</Col>
            <Col xs={{ span: 2 }}>预留场地数量</Col>
            <Col xs={{ span: 3 }}>最短提前预定时间</Col>
            <Col xs={{ span: 2,offset:2 }}>操作</Col>
          </Row>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
            <div className="dataList" >
              {
                this.state.list.map((item, i) => (
                  <Row key={i} className="rowList">
                    <Col xs={{ span: 2 }}>{item.sportname}</Col>
                    <Col xs={{ span: 2,offset:1 }}>{item.starttime}</Col>
                    <Col xs={{ span: 2,offset:1 }}>{item.endtime}</Col>
                    <Col xs={{ span: 2,offset:1 }}>{item.costperhour}</Col>
                    <Col xs={{ span: 3 }}>{item.fromdate}—{item.enddate}</Col>
                    <Col xs={{ span: 2 }}>{item.maxtablecount}</Col>
                    <Col xs={{ span: 3 }}>{item.appointmenttime}分</Col>
                    <Col className="updata" xs={{ span: 2,offset:2 }}><img onClick={this.updata} data-uid={item.uid} src={require("../../assets/icon_pc_updata.png")} alt="修改" /> <img data-uid={item.uid} onClick={this.delet} src={require("../../assets/icon_pc_delet.png")} alt="删除" /></Col>
                  </Row>
                ))
              }
            </div>
          </Spin>
        </div>


        <Modal
          title="添加场地设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={630}
          className='model'
        >
           <Form onSubmit={this.submit}>
          <div className="modelList">
            <span>运动项目</span>
            <Select defaultValue='请选择' className="selectModel" style={{ width: 249 }} onChange={this.handleChangeOne}>
              {
                this.state.ListSport.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>
         
          <div className="modelList">
            <span>开始时间</span>
            <TimePicker className="startTime" placeholder="请选择时间" minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.handleChangThree} />
          </div>

          <div className="modelList">
            <span>结束时间</span>
            <TimePicker className="startTime" placeholder="请选择时间" minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.endtime} />
          </div>

          <div className="modelList">
            <span>价格</span><span>（元/小时）</span>
            <InputNumber className="startTime" defaultValue={0} min={0} placeholder="请输入" onChange={this.money} />
          </div>

          <div className="modelList">
            <span>有效日期</span>
            <RangePicker style={{width:249,height:26,marginLeft:108}} disabledDate={disabledDate} placeholder={['开始日期', '结束日期']} onChange={this.onChangeStartDate}  />
          </div>

          <div className="modelList">
            <span>预留场地数量</span>
            <div className="startTime"> <span className="jian" onClick={this.jian}>-</span > &nbsp; {this.state.number} &nbsp;  <span className="jia" onClick={this.jia}>+</span></div>
          </div>

          <div className="modelList">
            <span>最短提前预定时间</span>
            <Select defaultValue="请选择" className="selectModel" style={{ width: 249 }} onChange={this.handleChangeFive}>
              <Option value="0">0分钟</Option>
              <Option value="30">30分钟</Option>
              <Option value="60">1小时</Option>
              <Option value="120">2小时</Option>
              <Option value="180">3小时</Option>
            </Select>
          </div>

          <div className="modelListT">
            <span>备注</span>
            <TextArea className="textArea" rows={4} placeholder='请输入' onChange={this.textArea} />
          </div>
          <Button className="submit"  htmlType='submit'>保存</Button>
          </Form>
         

        </Modal>




      </div>
    );
  }
}

export default preferential;
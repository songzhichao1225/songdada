import React from 'react';
import './siteSettings.css';
import 'antd/dist/antd.css';
import { getVenueFieldList,addVenueField,getVenueSport,getFirstField,delVenueField} from '../../api';
import { Select, Row, Col, Modal, TimePicker, InputNumber, Input, message,Spin,Result,Icon } from 'antd';
import moment from 'moment';
const format = 'HH:mm';
const { Option } = Select;



const { TextArea } = Input;

class siteSettings extends React.Component {

  state = {
    visible: false,
    ListSport:[],
    list: [],
    runId: '',//运动项目id
    runName:'',//运动项目名称
    openday:'',//营业时间段Id
    opendayname:'',//营业时间端名称
    starttime:'',//开始时间
    endtime:'',//结束时间
    costperhour:0,//价格
    number: 0,//数量
    maxScheduledDate:'',//最长可预定日期、
    appointmenttime:'',//最短可提前预定时间
    comment:'',//备注
    loading:true,//加载
    DisList:'',
    hidden:'',
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
     if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } 
    this.setState({ListSport:res.data.data})
  }

  async getVenueFieldList(data) {
    const res = await getVenueFieldList(data, sessionStorage.getItem('venue_token'))
   if(res.data.code===2000){
    this.setState({list:res.data.data,loading:false,hidden:true})
   }else if(res.data.code===4001){
    this.props.history.push('/')
    message.error('登陆超时请重新登陆！')
  } else{
     this.setState({list:res.data.data,loading:false,hidden:false})
   }
  }

  componentDidMount() {
     this.getVenueSport()
     this.getVenueFieldList({sportid:'',page:''})
     sessionStorage.setItem('siteSettings','')
  }
 
  handleChangeSelect=e=>{
    console.log(e)
    sessionStorage.setItem('siteSettings',e)
    this.getVenueFieldList({sportid:e,page:''})
  }

  
  showModal = () => {
    this.setState({
      visible: true,
    });
    this.setState({
      runId: '请选择',openday:'请选择', starttime: '', endtime: '', costperhour: 0, 
     number:0,maxScheduledDate:'请选择',appointmenttime:'请选择', comment: ''
    })
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
   this.setState({runName:day})
  }

  handleChangeTwo = e => {
    console.log(e)
    this.setState({ openday: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "周一到周五";
        break;
      case 2:
        day = "节假日";
        break;
      case 3:
        day = "周一到周日";
        break;
      default:
        day = "";
    }
   this.setState({opendayname:day})
  }
  handleChangThree = (value,dateString) => {
    
    this.setState({starttime:dateString})
  }
  endtime =  (value,dateString) => {
    this.setState({endtime:dateString})
  }
  money=e=>{
    this.setState({costperhour:e})
  }
  handleChangeFour = e => {
    console.log(e)
    this.setState({maxScheduledDate:e})
  }
  handleChangeFive = e => {
    this.setState({appointmenttime:e})
  }
  textArea=e=>{
    this.setState({comment:e.target.value})
  }

  jian = () => {
    if (this.state.number > 0) {
      this.setState({ number: this.state.number - 1 })
    }

  }
  jia = () => {
    if(this.state.number<100){
      this.setState({ number: this.state.number + 1 })
    }
  }

  async addVenueField(data) {
    const res = await addVenueField(data, sessionStorage.getItem('venue_token'))
    if(res.data.code!==2000){
      message.error(res.data.msg)
    }else if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else{
      this.setState({
        visible: false,
      });
      this.getVenueFieldList({sportid:'',page:''})
    }
  
  }
  
  

  submit=(e)=>{
    
   let {runId,runName,openday,opendayname,starttime,endtime,costperhour,number,maxScheduledDate,appointmenttime,comment}=this.state
     let data={
      sportid:runId,
      sportname:runName,
      openday:openday,
      opendayname:opendayname, 
      starttime:starttime,
      endtime:endtime,
      costperhour:costperhour,
      maxtablecount:number,
      maxScheduledDate:maxScheduledDate,
      appointmenttime:appointmenttime,
      comment:comment,
      uuid:e.target.dataset.uid
     }
      this.addVenueField(data)
  }
  async getFirstField(data) {
    const res = await getFirstField(data, sessionStorage.getItem('venue_token'))
    let datefor=res.data.data
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    }else if(res.data.code===4001){
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }  else {
      this.setState({ DisList: res.data.data })
      this.setState({
        runId: datefor.sportid,openday:datefor.openday, starttime: datefor.starttime, endtime: datefor.endtime, costperhour: datefor.costperhour, 
       number: datefor.maxtablecount,maxScheduledDate:datefor.maxScheduledDate,appointmenttime: datefor.appointmenttime, comment: datefor.comment
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
     this.setState({runName:day})
     let days = ''
      switch (parseInt(this.state.openday)) {
        case 1:
          days = "周一到周五";
          break;
        case 2:
          days = "节假日";
          break;
        case 3:
          days = "周一到周日";
          break;
        default:
          days = "";
      }
     this.setState({opendayname:days})
    }
  }

  update=e=>{
    this.setState({
      visible: true,
    });
     this.getFirstField({uuid:e.target.dataset.uid})

     
  }
  async delVenueField(data) {
    const res = await delVenueField(data, sessionStorage.getItem('venue_token'))
    if(res.data.code!==4001){
      message.info(res.data.msg)
    }
  }
  delet=e=>{
    this.delVenueField({uuid:e.target.dataset.uid})
    this.getVenueFieldList({sportid:sessionStorage.getItem('siteSettings'),page:''})
  }

  render() {
    return (
      <div className="siteStting">
        <div className="header">
          <span>运动项目</span>
          <Select defaultValue="全部" className="selectN" style={{ width: 100 }} onChange={this.handleChangeSelect}>
          <Option  value=''>全部</Option>
             {
               this.state.ListSport.map((item,i)=>(
                <Option key={i} value={item.id}>{item.name}</Option>
               ))
             }
          </Select>
          <div className="addList" onClick={this.showModal}>添加</div>
        </div>
        <div className="xiange"></div>

        <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
        <div className={this.state.hidden===true?'siteList':'hidden'}>
          <Row className="rowConten">
            <Col xs={{ span: 2 }}>运动项目</Col>
            <Col xs={{ span: 2 }}>节假日/工作日</Col>
            <Col xs={{ span: 2}}>开始时间</Col>
            <Col xs={{ span: 2}}>结束时间</Col>
            <Col xs={{ span: 2}}>价格<span className="fontColor">元/时</span></Col>
            <Col xs={{ span: 2 }}>场地数量</Col>
            <Col xs={{ span: 3 }}>最长可预定日期</Col>
            <Col xs={{ span: 3 }}>最短提前预定时间</Col>
            <Col xs={{ span: 2 ,offset:3 }}>操作</Col>
          </Row>
         
          <div className="dataList">
            
            {
              this.state.list.map((item, i) => (
                <Row key={i} className="rowList">
                  <Col xs={{ span: 2 }}>{item.sportname}</Col>
                  <Col xs={{ span: 2 }}>{item.opendayname}</Col>
                  <Col xs={{ span: 2 }}>{item.starttime}</Col>
                  <Col xs={{ span: 2 }}>{item.endtime}</Col>
                  <Col xs={{ span: 2 }}>{item.costperhour}</Col>
                  <Col xs={{ span: 2 }}>{item.maxtablecount}</Col>
                  <Col xs={{ span: 3 }}>{item.maxScheduledDate}周</Col>
                  <Col xs={{ span: 3 }}>{item.appointmenttime}分</Col>
                  <Col xs={{ span: 2 ,offset:3}}><img onClick={this.update} data-uid={item.uid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;<img onClick={this.delet} data-uid={item.uid} src={require("../../assets/icon_pc_delet.png")} alt="删除" /></Col>
                </Row>
              ))
            }
          </div>
        </div>
        <Result className={this.state.hidden===true?'hidden':''} icon={<Icon type="bank" theme="twoTone"  twoToneColor="#F5A623"/>}title="您没有进行场地设置！"/>,
        </Spin>



        <Modal
          title="添加场地设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={630}
          className='model'
        >
          <div className="modelList">
            <span>运动项目</span>
            <Select defaultValue="请选择" value={this.state.runId} className="selectModel" style={{ width: 249 }} onChange={this.handleChangeOne}>
            {
               this.state.ListSport.map((item,i)=>(
                <Option key={i} value={item.id}>{item.name}</Option>
               ))
             }
            </Select>
          </div>

          <div className="modelList">
            <span>节假日/工作日</span>
            <Select defaultValue="请选择" className="selectModel" value={this.state.openday} style={{ width: 249 }} onChange={this.handleChangeTwo}>
              <Option value="1">周一到周五</Option>
              <Option value="2">节假日</Option>
              <Option value="3">周一到周日</Option>
            </Select>
          </div>

          <div className="modelList">
            <span>开始时间</span>
            <TimePicker className="startTime" placeholder="请选择时间" value={this.state.starttime===undefined||this.state.starttime===''?null:moment(this.state.starttime, format)} minuteStep={30} defaultValue={moment('00:00', format)} format={format} onChange={this.handleChangThree} />
          </div>

          <div className="modelList">
            <span>结束时间</span>
            <TimePicker className="startTime" placeholder="请选择时间" value={this.state.endtime===undefined||this.state.endtime===''?null:moment(this.state.endtime, format)}  minuteStep={30} defaultValue={moment('00:00', format)} format={format}  onChange={this.endtime}/>
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
            <Select defaultValue="请选择" className="selectModel" value={this.state.maxScheduledDate} style={{ width: 249 }} onChange={this.handleChangeFour}>
              <Option value="1">一周</Option>
              <Option value="2">2周</Option>
              <Option value="3">3周</Option>
              <Option value="4">1个月</Option>
              <Option value="8">2个月</Option>
            </Select>
          </div>
          <div className="modelList">
            <span>最短提前预定时间</span>
            <Select defaultValue="请选择" className="selectModel" value={this.state.appointmenttime}  style={{ width: 249 }} onChange={this.handleChangeFive}>
              <Option value="0">0分钟</Option>
              <Option value="30">30分钟</Option>
              <Option value="60">1小时</Option>
              <Option value="120">2小时</Option>
              <Option value="180">3小时</Option>
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
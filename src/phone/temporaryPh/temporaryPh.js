import React from 'react';
import './temporaryPh.css';

import { Toast, DatePicker, List, Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Select, Row, Col, Drawer, Pagination, Popconfirm } from 'antd';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { getSetPriceVenueSport, VenueTemporarilyClosedList, VenueTemporarilyClosedSave, VenueTemporarilyClosedDel, VenueTemporarilyClosed, getIsClosedPublic } from '../../api';
const { Option } = Select;


const alert = Modal.alert;


class temporaryPh extends React.Component {

  state = {
    sportList: [],
    VenueTemporarilyClosedList: [],
    visible: false,
    startValue: '',
    sportId: null,
    EndValue: '',
    textarea: null,
    sportName: [],
    total: 0,
    listUUid: null,
    upUUid: '',
    temPage: 1,
    clenTop: 0,  //下拉加载参数
    clickY: 0,
    moveY: 0,
    spinFlag: false,
  };
  async getSetPriceVenueSport(data) {
    const res = await getSetPriceVenueSport(data, localStorage.getItem('venue_token'))

    this.setState({ sportList: res.data.data })

  }


  async VenueTemporarilyClosedList(data) {
    const res = await VenueTemporarilyClosedList(data, localStorage.getItem('venue_token'))

    this.setState({ spinFlag: false })
    if (this.state.upUUid !== '') {
      this.setState({ sportName: res.data.data[0].sportname, startValue: new Date(res.data.data[0].starttime), EndValue: new Date(res.data.data[0].endtime), textarea: res.data.data[0].comment })
    } else {
      this.setState({ VenueTemporarilyClosedList: res.data.data, total: res.data.other, upUUid: '' })
    }

  }


  componentDidMount() {
    this.getSetPriceVenueSport()
    this.VenueTemporarilyClosedList({ page: 1 })
    let now = new Date()
    let kpo = now.setMinutes(now.getMinutes() - now.getMinutes());
    let kpotWO = now.setMinutes(now.getMinutes() - now.getMinutes() + 30);
    this.setState({ startValue: new Date(kpo), EndValue: new Date(kpotWO) })
  }

  current = (page, pageSize) => {
    this.setState({ temPage: page })
    this.VenueTemporarilyClosedList({ page: page })
  }

  reture = () => {
    this.props.history.goBack()
  }

  addYouList = () => {
    this.setState({ visible: true })
  }
  onClose = () => {
    this.setState({ visible: false })
  }




  onStartChange = (date, dateString) => {
    this.setState({ startValue: dateString })
  };


  onEndChange = (date, dateString) => {

    this.setState({ EndValue: dateString })
  };


  sportChange = (e) => {
    this.setState({ sportId: e })
    let day = ""
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
    this.setState({ sportName: day })
  }

  textArea = (e) => {
    this.setState({ textarea: e.target.value })
  }

  async VenueTemporarilyClosed(data) {
    const res = await VenueTemporarilyClosed(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visible: false })
      Toast.success(res.data.msg, 2);
      this.VenueTemporarilyClosedList({ page: this.state.temPage })
    } else {
      Toast.fail(res.data.msg, 1);
      this.VenueTemporarilyClosedList({ page: this.state.temPage })
    }
  }

  async VenueTemporarilyClosedSave(data) {
    const res = await VenueTemporarilyClosedSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      Toast.success(res.data.msg, 2);
      this.setState({ visible: false })
      this.VenueTemporarilyClosedList({ page: this.state.temPage })
    } else {
      Toast.fail(res.data.msg, 2);
    }

  }


  async getIsClosedPublic(data) {
    const res = await getIsClosedPublic(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      alert('提示', '您选择的时间段内有活动，继续添加么?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => this.sublok() },
      ])
    } else if (res.data.code !== 2000 && res.data.code !== 2001) {
      Toast.fail(res.data.msg, 2);
    } else {
      this.sublok()
    }

  }

  sublok = () => {
    let { sportId, sportName, startValue, EndValue, textarea, upUUid } = this.state
    if (upUUid === '') {
      let data = {
        sportid: sportId,
        sportname: sportName,
        starttime: startValue,
        endtime: EndValue,
        comment: textarea,
      }
      this.VenueTemporarilyClosed(data)
    } else {
      let data = {
        colseuuid: upUUid,
        sportid: sportId,
        sportname: sportName,
        starttime: startValue,
        endtime: EndValue,
        comment: textarea,
      }
      this.VenueTemporarilyClosedSave(data)
    }
  }


  subCilck = () => {
    let { sportId, startValue, EndValue } = this.state
    this.getIsClosedPublic({ sportid: sportId, starttime: startValue, endtime: EndValue })
  }

  mood = (e) => {
    this.setState({ listUUid: e.target.dataset.uuid })
  }



  async VenueTemporarilyClosedDel(data) {
    const res = await VenueTemporarilyClosedDel(data, localStorage.getItem('venue_token'))
    Toast.success(res.data.msg, 1);
    this.setState({ temPage: 1 })
    this.VenueTemporarilyClosedList({ page: 1 })

  }
  temDelet = () => {
    this.VenueTemporarilyClosedDel({ colseuuid: this.state.listUUid })
  }

  upload = (e) => {
    this.VenueTemporarilyClosedList({ colseuuid: e.target.dataset.uuid })
    this.setState({ visible: true, upUUid: e.target.dataset.uuid })
  }

  touClick = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }
  touMove = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY && this.state.clickY < 200) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }
  touEnd = () => {
    if (this.state.moveY > this.state.clickY + 10) {
      this.VenueTemporarilyClosedList({ page: this.state.temPage })
      if (this.state.spinFlag === false) {
        this.setState({ clenTop: 0 })
      }
    }
  }


  render() {
    return (
      <div className="temporaryPh">
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />设置临时关闭预约</div>
        <Row className='Row'>
          <Col xs={{ span: 6 }} lg={{ span: 6 }}>场地类型</Col>
          <Col xs={{ span: 12 }} lg={{ span: 12 }}>时间</Col>
          <Col xs={{ span: 6 }} lg={{ span: 6 }}>操作</Col>
        </Row>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', background: '#f5f5f5', position: 'relative' } : { display: 'none' }} ><LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 7 }} /></div>

        <div className="temScroll" >
          {
            this.state.VenueTemporarilyClosedList.map((item, i) => (
              <Row className='Row' key={i}>
                <Col xs={{ span: 6 }} lg={{ span: 6 }}>{item.sportname}</Col>
                <Col style={{ lineHeight: '1.5rem' }} xs={{ span: 12 }} lg={{ span: 12 }}>{item.starttime}<br />{item.endtime}</Col>
                <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                 
                  <Popconfirm
                    title="你确定要删除吗?"
                    onConfirm={this.temDelet}
                    onCancel={this.siteCancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <img className="upLoad" style={{ right: '1.5rem', width: '1.37rem', height: '1.37rem' }} onClick={this.mood} data-uuid={item.uuid} src={require("../../assets/delet.png")} alt="删除" />
                  </Popconfirm>
                </Col>
              </Row>
            )
            )
          }

          <img className="addList" onClick={this.addYouList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
          <Pagination className="fenye" defaultCurrent={1} hideOnSinglePage={true} current={this.state.temPage} showSizeChanger={false} style={this.state.VenueTemporarilyClosedList.length < 1 ? { display: 'none' } : {}} size="small" onChange={this.current} total={this.state.total} />
          <div style={this.state.VenueTemporarilyClosedList.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (4).png')} alt="555" /><span style={{ display: 'block', textAlign: 'center' }}>没有添加临时关闭预约</span></div>
        </div>


        <Drawer
          title="添加临时关闭预约信息"
          placement="right"
          closable={true}
          width={'100%'}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ padding: '5%' }}
        >
          <div className='drawerInput'>
            <span style={{ color: '#333' }}>场地类型</span>
            <Select placeholder='请选择' bordered={false} style={{ width: '52%', border: 'none', boxShadow: 'none', float: 'right', textAlign: 'center' }} value={this.state.sportName} onChange={this.sportChange}>
              {
                this.state.sportList.map((item, i) => (
                  <Option key={i} value={item.id}>{item.name}</Option>
                ))
              }
            </Select>
          </div>

          <div className='drawerInput' style={{ border: 'none' }}>
            {/* <DatePicker
              locale={zh_CN}
              disabledDate={this.disabledStartDate}
              showTime={{ minuteStep: 30, secondStep: 60 }}
              format="YYYY-MM-DD HH:mm"
              value={moment(this.state.startValue)}
              placeholder="开始时间"
              onChange={this.onStartChange}
            /> */}

            <DatePicker
              value={this.state.startValue}
              minuteStep={30}
              format='YYYY-MM-DD HH:mm'
              onChange={startValue => this.setState({ startValue })}
            >
              <List.Item className="startTime">开始时间</List.Item>
            </DatePicker>

          </div>

          <div className='drawerInput' style={{ border: 'none' }}>


            <DatePicker
              value={this.state.EndValue}
              minDate={this.state.startValue}
              format='YYYY-MM-DD HH:mm'
              minuteStep={30}
              onChange={EndValue => this.setState({ EndValue })}
            >
              <List.Item className="startTime">结束时间</List.Item>
            </DatePicker>
          </div>

          <div className='drawerInput' style={{ paddingTop: '1rem' }} >
            <span style={{ display: 'block', float: 'left' }}>备注</span>
            <textarea rows={3} style={{ marginLeft: '2.5rem' }} maxLength={200} placeholder="请输入备注" onChange={this.textArea}></textarea>
          </div>

          <div className='drawerInput' style={{ border: 'none' }}>
            <div className="confirm" onClick={this.subCilck}>确认</div>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default temporaryPh;
import React from 'react';
import './temporaryPh.css';
import { message, Select, DatePicker, Input } from 'antd';
import { getVenueSport, VenueTemporarilyClosed } from '../../api';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
class temporaryPh extends React.Component {

  state = {
    sportList: [],
    sportId: '',
    sportName: '',
    startTime: '',
    endTime: '',
    comment: '',
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      this.setState({ sportList: res.data.data })
    }
  }


  componentDidMount() {
    this.getVenueSport()
  }
  handleChange = e => {

    let day = ""
    switch (e) {
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
    this.setState({ sportId: e, sportName: day })

  }
  startOnChange = (date, dateString) => {
    this.setState({ startTime: dateString })
  }
  endOnChange = (date, dateString) => {
    this.setState({ endTime: dateString })
  }
  comment = e => {
    this.setState({ comment: e.target.value })
  }

  async VenueTemporarilyClosed(data) {
    const res = await VenueTemporarilyClosed(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else {
      message.info(res.data.msg)
      this.props.history.goBack()
    }
  }

  submit = () => {
    let { sportId, sportName, startTime, endTime, comment } = this.state
    this.VenueTemporarilyClosed({ sportid: sportId, sportname: sportName, starttime: startTime, endtime: endTime, comment: comment })
  }



  render() {
    return (
      <div className="temporaryPh">
        <div className="headTitle">设置临时关闭预约</div>
        <div className="listSon">
          <span className="span">运动项目</span>
          <Select defaultValue="请选择" style={{ width: '8rem', border: 'none' }} className="select" onChange={this.handleChange}>
            {
              this.state.sportList.map((item, i) => (
                <Option key={i} value={item.id}>{item.name}</Option>
              ))
            }
          </Select>
        </div>

        <div className="listSon">
          <span className="span">有效期（开始时间）</span>
          <DatePicker showTime={{ defaultValue: moment('00:00', 'HH:mm') }} locale={locale} placeholder="选择时间" className="select" onChange={this.startOnChange} onOk={this.onOk} />

        </div>

        <div className="listSon">
          <span className="span">有效期（结束时间）</span>
          <DatePicker showTime={{ defaultValue: moment('00:00', 'HH:mm') }} locale={locale} placeholder="选择时间" className="select" onChange={this.endOnChange} onOk={this.onOk} />
        </div>

        <div className="listSon">
          <span className="span">备注</span>
          <Input className="select" style={{ width: '12rem' }} onChange={this.comment} placeholder="请输入" />
        </div>
        <div className="btn" onClick={this.submit}>提交</div>

      </div>
    )
  }
}

export default temporaryPh;
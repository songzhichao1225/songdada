import React from 'react';
import './sitePh.css';
import { message, Row, Col, Pagination, Drawer } from 'antd';
import { getVenueFieldList } from '../../api';
import 'spring-picker/lib/style.css';
import { Picker, Popup } from 'spring-picker';

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

  componentDidMount() {
    this.getVenueFieldList({ sportid: '', page: '' })
    this.userData = {
      list: [
        { name: '羽毛球', value: 1 },
        { name: '乒乓球', value: 2 },
        { name: '台球', value: 3 },
        { name: '篮球', value: 4 },
        { name: '足球', value: 5 },
        { name: '排球', value: 6 },
        { name: '网球', value: 7 },
        { name: '高尔夫球', value: 8 },


      ],
      defaultValue: this.state.defaultValue,
      displayValue(item) {
        return item.name;
      }
    };
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
  selectBottom = (e) => {
    this.setState({ selectNum: e.currentTarget.dataset.index, flag: true })
  }

  addList = () => {
    this.setState({ visible: true })
  }
  onClose = () => {
    this.setState({ visible: false })
  }

  xiangmu = () => {

  }



  showUserPicker = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ userPickerVisible: true })
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
                  <img className="upLoad" src={require("../../assets/upLoad.png")} alt="修改" />

                </div>

              </div>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} onChange={this.current} total={this.state.total} />
          <img className="addList" onTouchStart={this.addList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
          <Drawer
            title="添加场地设置"
            placement="right"
            width='100%'
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <div className="single-picker">
              <Popup
                onCancel={this.cancelUserPicker}
                onConfirm={this.closeUserPicker}
                visible={this.state.userPickerVisible}>
                <Picker
                  onChange={this.handleChangeUser}
                  data={this.userData}
                />
              </Popup>
            </div>

            <div className="button-wrap"  onClick={this.showUserPicker}>运动项目</div>

          </Drawer> 
        </div>

        <div className={this.state.clickNum === 2 ? 'preferential' : 'none'}>


        </div>


      </div>
    );
  }
}

export default sitePh;
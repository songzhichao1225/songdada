import React from 'react';
import './sitePh.css';
import { Card, Picker, List, Toast, InputItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, } from 'antd';
import { } from '@ant-design/icons';
import { getVenueNumberTitleList, getVenueSportidTitle, DelVenueTitle, getVenueTitleSave,getSiteSelectedVenueid } from '../../api';




class sitePh extends React.Component {

  state = {
    titleLise: [],
    page: 1,
    sportArr: [
      { label: '全部', value: 0 },
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    sportArrTwo: [
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    asyncValue: 0,
    index: '1',
    visibleXi: false,
    visibleTitle: false,
    pickerValue: '',
    titleList: [],
    titleDetle: false,
    joinTitleC: '',
    idxTitle: '',
    idxTitleTwo: '请选择/添加',
    Serial:false,
    numArr:[],
  };

  header = e => {
    this.setState({
      index: e.currentTarget.dataset.index
    })
  }

  componentDidMount() {
    this.getVenueNumberTitleList({ page: 1, sportid: '' })
    let numArr=[]
    for(let i=1;i<=100;i++){
      let obj={num:i,cheked:false}
      numArr.push(obj)
    }
    this.setState({numArr:numArr})

  }

  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].sportid === 1) {
          res.data.data[i].sportid = '羽毛球'
        } else if (res.data.data[i].sportid === 2) {
          res.data.data[i].sportid = '兵乓球'
        } else if (res.data.data[i].sportid === 3) {
          res.data.data[i].sportid = '台球中式黑八'
        } else if (res.data.data[i].sportid === 4) {
          res.data.data[i].sportid = '台球美式九球'
        } else if (res.data.data[i].sportid === 5) {
          res.data.data[i].sportid = '台球斯诺克'
        } else if (res.data.data[i].sportid === 6) {
          res.data.data[i].sportid = '篮球'
        } else if (res.data.data[i].sportid === 7) {
          res.data.data[i].sportid = '足球11人制'
        } else if (res.data.data[i].sportid === 8) {
          res.data.data[i].sportid = '足球8人制'
        } else if (res.data.data[i].sportid === 9) {
          res.data.data[i].sportid = '足球7人制'
        } else if (res.data.data[i].sportid === 10) {
          res.data.data[i].sportid = '足球5人制'
        } else if (res.data.data[i].sportid === 11) {
          res.data.data[i].sportid = '排球'
        } else if (res.data.data[i].sportid === 12) {
          res.data.data[i].sportid = '网球'
        }
      }
      this.setState({ titleLise: res.data.data, other: res.data.other })
    }
  }
  current = (page, pageSize) => {
    this.setState({
      page: page
    })
    this.getVenueNumberTitleList({ page: page, sportid: '' })
  }
  visibleXi = () => {
    this.setState({ visibleXi: true })
  }
  onClose = () => {
    this.setState({ visibleXi: false })
  }

  onCloseTitle = () => {
    this.setState({ visibleTitle: false })
  }



  async getVenueSportidTitle(data) {
    const res = await getVenueSportidTitle(data, localStorage.getItem('venue_token'))
    if (res.data.data.length === 0) {
      this.setState({
        titleList: [{ title: '普通' }, { title: 'VIP' }, ...res.data.data]
      })
    } else {
      this.setState({
        titleList: res.data.data
      })
    }

  }

  visibleTitle = () => {
    if (this.state.pickerValue === '') {
      Toast.fail('请选择场地类型', 1);
    } else {
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
      this.setState({ visibleTitle: true })
    }
  }

  titleDetle = () => {
    this.setState({ titleDetle: !this.state.titleDetle })
  }


  async DelVenueTitle(data) {
    const res = await DelVenueTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ titleDetle: false })
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
    }
    Toast.fail(res.data.msg, 1);
  }
  delVenueTitle = e => {
    if (this.state.idxTitle === e.currentTarget.dataset.title) {
      Toast.fail('已选中该标签不可删除', 2);
    } else {
      this.DelVenueTitle({ uuid: e.currentTarget.dataset.uuid })
    }
  }


  async getVenueTitleSave(data) {
    const res = await getVenueTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.fail('添加成功', 1);
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  joinTitleC = e => {
    this.setState({ joinTitleC: e })
  }
  joinTitle = () => {
    if (this.state.joinTitleC === '') {
      Toast.fail('请输入新增标签', 1);
    } else {
      this.getVenueTitleSave({ sportid: this.state.pickerValue[0], title: this.state.joinTitleC, uuid: '' })
    }
  }
  sonClik = e => {
    if (this.state.titleDetle === true) {
      this.setState({ idxTitle: ';4141' })
    } else {
      this.setState({ idxTitle: e.currentTarget.dataset.title })
    }
  }
  btnComfir = () => {
    if (this.state.idxTitle === '') {
      Toast.fail('请选择标签', 1);
    } else {
      this.setState({ visibleTitle: false, idxTitleTwo: this.state.idxTitle })
    }
  }

  async getSiteSelectedVenueid(data) {
    const res = await getSiteSelectedVenueid(data, localStorage.getItem('venue_token'))
    if(this.state.Serial===true){
       for(let i in res.data.data){
        this.state.numArr[parseInt(res.data.data[i]-1)].cheked='no'
       }
       this.setState({numArr:this.state.numArr})
    }
  }


  Serial=()=>{
    if(this.state.idxTitleTwo===''){
      Toast.fail('请选择细分标签', 1);
    }else{
      this.setState({Serial:true})
      this.getSiteSelectedVenueid({sportid:this.state.pickerValue[0]})
    }
  }


  SerialClose=()=>{
    this.setState({Serial:false})
  }
  numArrSon=e=>{
   if(this.state.numArr[parseInt(e.currentTarget.dataset.num)-1].cheked!=='no'){
    this.state.numArr[parseInt(e.currentTarget.dataset.num)-1].cheked=!this.state.numArr[parseInt(e.currentTarget.dataset.num)-1].cheked
    this.setState({numArr:this.state.numArr})
   }
   
  }
  reverseC=()=>{
    for(let i in this.state.numArr){
      if(this.state.numArr[i].cheked===false){
        this.state.numArr[i].cheked=true
      }
    }
    this.setState({numArr:this.state.numArr})
  }

  allThem=()=>{
    for(let i in this.state.numArr){
      if(this.state.numArr[i].cheked===false){
        this.state.numArr[i].cheked=true
      }
    }
    this.setState({numArr:this.state.numArr})
  
  }



  render() {
    return (
      <div className="sitePh">
        <div className="header">
          <div onClick={this.header} data-index='1' style={this.state.index === '1' ? { color: '#D85D27' } : {}}>场地细分<div style={this.state.index === '1' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onClick={this.header} data-index='2' style={this.state.index === '2' ? { color: '#D85D27' } : {}}>价格设置<div style={this.state.index === '2' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
        </div>
        <div className="wsMa4" style={this.state.index === '1' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.titleLise.map((item, i) => (
                <Card key={i} className="card">
                  <Card.Header
                    title={<span className="titleLeft">{item.sportid}</span>}
                    extra={<span className="titleRight">细分标签：{item.title}</span>}
                  />
                  <Card.Body>
                    <div className="idxNum">场地编号：{item.venueid}</div>
                  </Card.Body>
                  <Card.Footer content={<span className="number">场地数量：{item.number}</span>} extra={<div><img style={{ marginRight: '10px' }} src={require('../../assets/upLoad.png')} alt="img" /><img src={require('../../assets/delet.png')} alt="img" /></div>} />
                </Card>
              ))
            }
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={v => this.setState({ asyncValue: v })}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValue].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.visibleXi}>+添加场地细分</div>
          </div>
        </div>














        <Drawer
          title="添加场地细分"
          placement="bottom"
          height='100%'
          onClose={this.onClose}
          visible={this.state.visibleXi}
        >
          <Picker
            data={this.state.sportArrTwo}
            value={this.state.pickerValue}
            onOk={v => this.setState({ pickerValue: v })}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>场地类型</List.Item>
          </Picker>
          <List.Item arrow="horizontal" onClick={this.visibleTitle} extra={this.state.idxTitleTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>细分标签</List.Item>
          <List.Item arrow="horizontal" onClick={this.Serial} extra={'extra content'} style={{ borderBottom: '1px solid #E9E9E9' }}>场地编号</List.Item>
          <List.Item arrow="horizontal" extra={'extra content'} style={{ borderBottom: '1px solid #E9E9E9' }}>场地数量</List.Item>
          <div className="btnSub">提交</div>
        </Drawer>


        <Drawer
          title="选择/添加细分标签"
          placement="bottom"
          height='50%'
          onClose={this.onCloseTitle}
          visible={this.state.visibleTitle}
        >
          <div className="sitePhtitle">
            <div className="titleHead">
              {
                this.state.titleList.map((item, i) => (
                  <div key={i} className="son" style={this.state.idxTitle === item.title ? { background: '#D85D27', color: '#fff' } : {}} data-title={item.title} data-uuid={item.uuid} onClick={this.sonClik}><div onClick={this.delVenueTitle} data-uuid={item.uuid} data-title={item.title} style={item.uuid !== undefined && this.state.titleDetle === true ? {} : { display: 'none' }}>x</div>{item.title}</div>
                ))
              }
            </div>
            <div className="titleHead">
              <InputItem style={{ fontSize: '0.75rem' }} maxLength={5} placeholder-style={{ fontSize: '0.75rem' }} onChange={this.joinTitleC} placeholder="新增标签最多输入5个字符"></InputItem>
              <span onClick={this.joinTitle}>+新增自定义标签</span>
            </div>
            <div className="btnDetle" style={this.state.titleDetle === true ? { background: '#e9e9e9', color: '#000' } : { background: '#D85D27' }} onClick={this.titleDetle}>{this.state.titleDetle === true ? '取消' : '删除'}</div><span style={{ lineHeight: '1.75rem', fontSize: '0.6rem', color: '#ccc', display: 'block', float: 'left', marginTop: '0.5rem', marginLeft: '0.3rem' }}>(点击选择某一个标签删除)</span>

            <div className="btnComfir" onClick={this.btnComfir}>确定</div>

          </div>
        </Drawer>


        <Drawer
          title="选择场地编号"
          placement="bottom"
          height='60%'
          onClose={this.SerialClose}
          visible={this.state.Serial}
        >
          <div className="sitePhSerialHeader"><span onClick={this.reverseC}>反选</span><span onClick={this.allThem}>全选</span></div>
          <div className="sitePhSerial">
            
             {
              this.state.numArr.map((item,i)=>(
               <div key={i} onClick={this.numArrSon} data-num={item.num} style={item.cheked===true?{background:'#F5A623',color:'#fff'}:{} && item.cheked ==='no'?{ color: '#fff', background: '#F5A623',opacity: '0.2' }:{}}>{item.num}</div>
              ))
             }
          </div>
          <div className="sitePhFooter">确定</div>
        </Drawer>







      </div>



    )
  }
}


export default sitePh;
import React from 'react';
import './news.css';
import 'antd/dist/antd.css';
import { getVenueNewsList,getVenueNewsFirst,VenueNewsSaveIsRead } from '../../api';
import { Checkbox,Pagination,Drawer, message} from 'antd';







class news extends React.Component {

  state = {
    newsList: [],
    isredcount: '0',
    sum: '0',
    flag:false,
    oneChecked:null,
    visible:false,
    newsDetail:'',
    current:'',
  };


  componentDidMount() {
    this.getVenueNewsList({page:1})
  }




  async getVenueNewsList(data) {
    const res = await getVenueNewsList(data, sessionStorage.getItem('venue_token'))
    if(res.data.code===2000){
      for(let i in  res.data.data){
        res.data.data[i].cheched=false
      }
      this.setState({ newsList: res.data.data, sum: res.data.other.sum, isredcount: res.data.other.isredcount })
    }
   

  }
  allOnChange=(e)=>{
    if(e.target.checked===true){
     for(let i in this.state.newsList){
      this.state.newsList[i].cheched=true
     }
    }else{
      for(let i in this.state.newsList){
        this.state.newsList[i].cheched=false
       }
    }
    this.setState({oneChecked:!this.state.oneChecked})
    
  }
  onChange=e=>{
      console.log(e.target.checked)
      if(e.target.checked===false){
        this.setState({oneChecked:false})
      }
      this.state.newsList[e.target.index].cheched=!this.state.newsList[e.target.index].cheched
  }
  delet=(e)=>{
    console.log(e.currentTarget.dataset.uid)
  }

  bossDelet=()=>{
    let koArr=[]
    for(let i in this.state.newsList){
        if(this.state.newsList[i].cheched===true){
          koArr.push(this.state.newsList[i].uuid)
        }
    }
    console.log(koArr)
  }
  current=e=>{
    this.setState({current:e})
    this.getVenueNewsList({page:e})
  }


  


  async getVenueNewsFirst(data) {
    const res = await getVenueNewsFirst(data, sessionStorage.getItem('venue_token'))
    if(res.data.code===2000){
      this.setState({newsDetail:res.data.data})
    }else{
      message.error(res.data.msg)
    }
  }
  

  async VenueNewsSaveIsRead(data) {
    const res = await VenueNewsSaveIsRead(data, sessionStorage.getItem('venue_token'))
   
  }
  consult=e=>{
    this.setState({
      visible: true,
    });
    this.getVenueNewsFirst({newsuuid:e.currentTarget.dataset.uuid})
    this.VenueNewsSaveIsRead({newsuuid:e.currentTarget.dataset.uuid})
   
  }


  onClose = () => {
    this.setState({
      visible: false,
    });
    this.getVenueNewsList({page:this.state.current})
  };


  render() {
    return (
      <div className="news">
        <div className="xiange"></div>
        <div className="heade"><span>所有消息</span><span>(共{this.state.sum}条，未读{this.state.isredcount}条)</span><div className="button">发消息</div></div>
        <div className="xiange"></div>
        <div className="content">

          <div className="newsList">
          <Checkbox className="check" onChange={this.allOnChange} checked={this.state.oneChecked}>全选</Checkbox>
           <span className="btn" onClick={this.bossDelet}>删除</span>
          </div>
          {
            this.state.newsList.map((item,i)=>(
              <div key={i} className="newsList">
              <Checkbox className="check" onChange={this.onChange} index={i} checked={item.cheched}  value={item.uuid}></Checkbox>
               <div style={{float:'left',marginTop:'12px',marginLeft:20}}><img src={item.isred===0?require('../../assets/news.png'):require('../../assets/oldNews.png')} alt="news"/>&nbsp;&nbsp;系统消息</div>
               <span className="textOne" data-uuid={item.uuid} onClick={this.consult}>{item.comment}</span>
               <span style={{paddingLeft:80,lineHeight:'44px'}}>{item.intime}</span>
               <img className="imgRight" data-uid={item.uuid} onClick={this.delet} src={require('../../assets/icon_pc_delet.png')} alt="删除"/>
              </div>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} pageSize={10} total={parseInt(this.state.sum)} onChange={this.current}  />
         
         
          <Drawer
          title="消息详情"
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div>{this.state.newsDetail.comment}</div>
          <div>{this.state.newsDetail.intime}</div>
          
        </Drawer>
        </div>

      </div>
    );
  }
}

export default news;
import React from 'react';
import './commentPh.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Toast, PullToRefresh, Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { getCommentList, getOverallScore, VenueCommentReply } from '../../api';
import { Pagination, Input } from 'antd';
import {  LeftOutlined } from '@ant-design/icons';

const { TextArea } = Input

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class commentPh extends React.Component {

  state = {
    score: [],
    scoreSon: 0,
    getCommentList: [],
    visible: false,
    uid: '',
    textArea: '',
    current: 1,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    other:0,
    modal1:false,
    src:'',
  }
  async getCommentList(data) {
    const res = await getCommentList(data, localStorage.getItem('venue_token'))
    
      let resData=res.data.data
      for(let i in resData){
       if(resData[i].imgnames!==''&&resData[i].imgnames!==null){
        resData[i].imgnames=resData[i].imgnames.split('|')
       }else{
        resData[i].imgnames=[]
       }
      }
      this.setState({ getCommentList: res.data.data, refreshing: false ,other:res.data.other})
    
  }
  async getOverallScore(data) {
    const res = await getOverallScore(data, localStorage.getItem('venue_token'))
    this.setState({ score: res.data.data, scoreSon: res.data.data.score })
  }

  componentDidMount() {
    this.getCommentList({ page: 1 })
    this.getOverallScore()
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0)
  }




  showModal = (e) => {
    this.setState({
      visible: true,
      uid: e.currentTarget.dataset.uid
    })
  }

  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  textArea = e => {
    let p=e.target.value
    for(let i in this.state.Illegality){
      var r = new RegExp(this.state.Illegality[i], "ig");
      p = p.replace(r, "*");
    }
    this.setState({ textArea: p })
  }
  publish = e => {
    let { uid, textArea } = this.state
    this.VenueCommentReply({ commentid: uid, comment: textArea })
  }
  async VenueCommentReply(data) {
    const res = await VenueCommentReply(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visible: false })
      this.getCommentList({ page: this.state.current })
    }  else {
      Toast.fail(res.data.msg, 1);
    }
  }

  pageChang = (page, pageSize) => {
    this.setState({ current: page })
    this.getCommentList({ page: page })
  }



  reture = () => {
    this.props.history.goBack()
  }

  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getCommentList({ page: this.state.current })
    }, 1000)
  }
  model1=e=>{
    this.setState({modal1:true,src:e.currentTarget.dataset.src})
  }
  modal1Close=()=>{
    this.setState({modal1:false})
  }
  render() {

    return (
      <div className="commentPh">
        <div className="headerTitle">
          <LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />
          场馆评分
          </div>
        <div className="essence">
          <div className="whole">
            <span>整体评分</span>
            <img style={{ marginLeft: '1rem' }} src={this.state.scoreSon >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 1 && this.state.scoreSon > 0 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 2 && this.state.scoreSon > 1 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 3 && this.state.scoreSon > 2 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 4 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 4 && this.state.scoreSon > 3 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 5 && this.state.scoreSon > 4 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <span className="right">{this.state.score.score}分</span>
          </div>
          <div className="serve"><span>设施 {this.state.score.equscore}</span> <span>服务 {this.state.score.envscore}</span> <span>价格 {this.state.score.xjbScore}</span></div>
        </div>
        <div style={{ height: '1rem', background: '#f5f5f5', marginTop: '1rem' }}></div>
        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height - 33,
            overflow: 'auto',
          }}
          indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
          direction={this.state.down ? 'down' : 'up'}
          refreshing={this.state.refreshing}
          onRefresh={this.refResh}
        >
          <div className="commentList">
            {
              this.state.getCommentList.map((item, i) => (
                <div className="Son" key={i}>
                  <div className="headerSon">
                    <div className="avatar"><img src={require("../../assets/yonghu.png")} alt="用户" /></div>
                    <div className="right">
                      <span>匿名用户</span>
                      <div className="whole">
                        <img style={{ marginLeft: '1rem' }} src={item.score >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 1 && item.score > 0 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        <img src={item.score >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 2 && item.score > 1 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        <img src={item.score >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 3 && item.score > 2 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        <img src={item.score >= 4 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 4 && item.score > 3 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        <img src={item.score >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 5 && item.score > 4 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        <span className="num">{item.score}</span>
                        <div className="serve"><span>设施 {item.equscore}</span> <span>服务 {item.envscore}</span> <span>价格 {item.xjbScore}</span></div>
                      </div>
                    </div>
                  </div>
                  <span style={{ display: 'block', clear: 'both' }}>{item.content===''?'此用户没有添加评论':item.content}</span>
                  {/* 评论图片 */}
                  <div style={item.imgnames.length===0?{display:'none'}:{ display: 'block', clear: 'both' }} className="commentImg">
                   {
                     item.imgnames.map((ko,j)=>(
                       <img key={j} onClick={this.model1} data-src={"https://app.tiaozhanmeiyitian.com/"+item.imgbaseurl+ko+""} src={"https://app.tiaozhanmeiyitian.com/"+item.imgbaseurl+ko+""} alt="uimg"/>
                     ))
                   }

                  </div>
                  
                  <div className="reply" data-uid={item.uid} style={item.comment_reply!==null?{display:'none'}:{}} onClick={this.showModal}><img src={require("../../assets/icon_pc_comment.png")} alt="回复" /></div>
                  <span style={{ display: 'block',float:'left',marginTop:'0.75rem' }}>{item.commentDate}</span>
                  <div className={item.comment_reply !== null ? 'Stadium' : 'stadiumNone'}>
                    <div className="logoImg"><img src={require("../../assets/kefu.png")} alt="场馆端" /></div>
                  <div className="stadiumText"><div style={{wordBreak:'break-all',wordWrap:'break-word'}}>{item.comment_reply}</div><div style={{paddingTop:'0.3rem',display:'block'}}>{item.comment_reply_time}</div></div>
                  </div>
                  {/* <span className={item.comment_reply !== null ? 'StaiumDate' : 'stadiumNone'}>{item.comment_reply_time}</span> */}
                </div>
              ))

            }

           

            <Modal
              visible={this.state.visible}
              transparent
              maskClosable={false}
              onClose={this.handleCancel}
              title="回复该客户"
              footer={[{ text: '取消', onPress: () => { this.handleCancel(); } },{ text: '回复', onPress: () => { this.publish(); } }]}
            >
             <TextArea rows={4} maxLength={100} value={this.state.textArea} placeholder="最多可输入100字" onInput={this.textArea}  /> 
            </Modal>
 

            <Pagination className="fenye" size='small' style={this.state.getCommentList.length > 0 ? {} : { display: 'none' }} current={parseInt(this.state.current)} pageSize={10} total={this.state.other} onChange={this.pageChang} />
          <div style={this.state.getCommentList.length > 0?{display:'none'}:{width:'100%'}}><img style={{width:'4rem',height:'4rem',display:'block',margin:'4rem auto 0'}} src={require('../../assets/xifen (3).png')} alt="666"/><span style={{display:'block',textAlign:'center'}}>没有场馆评论</span></div>
          </div>

        </PullToRefresh>
 
        <Modal
          visible={this.state.modal1}
          transparent
          onClose={this.modal1Close}
         
         
        >
        <img style={{width:'100%'}} src={this.state.src} alt="img"/>
        </Modal>





      </div>
    );
  }
}

export default commentPh;
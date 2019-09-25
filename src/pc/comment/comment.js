import React from 'react';
import './comment.css';
import 'antd/dist/antd.css';
import { getCommentList, VenueCommentReply, getOverallScore } from '../../api';
import { Spin, Icon, Input, message, Result,Pagination } from 'antd';
const { TextArea } = Input;





const antIcon = <Icon type="sync" style={{ fontSize: 24, color: 'black' }} spin />;
class comment extends React.Component {
  state = {
    loading: false,
    textValue: '',
    flag: null,
    commentList: [],
    imgArr: '',
    hidden: '',
    Oneloading: true,
    score: '',
    scoreSon: '',
    other:1,
    page:0,
  };


  async getOverallScore(data) {
    const res = await getOverallScore(data, sessionStorage.getItem('venue_token'))
    this.setState({ score: res.data.data, scoreSon: res.data.data.score })

  }
  componentDidMount() {
    this.getCommentList({ page: 1 })
    this.getOverallScore()
  }





  async getCommentList(data) {
    const res = await getCommentList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let imgArr = []
      if (res.data.data.length > 0) {
        for (let i in res.data.data) {
          if (res.data.data[i].imgnames !== null) {
            let imgS = res.data.data[i].imgnames.split('|')
            for (let i in imgS) {
              imgArr.push(imgS[i])
            }
          }

        }

        this.setState({ commentList: res.data.data, imgArr: imgArr, other:res.data.other, loading: false, hidden: false, Oneloading: false })
      }
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ loading: false, hidden: false, Oneloading: false })
    }

  }
  textValue = e => {
    this.setState({ textValue: e.target.value })
  }
  clear = () => {
    this.setState({ textValue: '' })
  }
  pullOut = (e) => {
    this.setState({ flag: parseInt(e.currentTarget.dataset.index) })
    if (parseInt(e.currentTarget.dataset.index) === this.state.flag) {
      this.setState({ flag: null })
    }
  }



  async VenueCommentReply(data) {
    const res = await VenueCommentReply(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      this.getCommentList({ page:this.state.page })
      this.setState({flag:null})
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      message.error(res.data.msg)
    }
  }
  operation = (e) => {
    this.VenueCommentReply({ commentid: e.target.dataset.uid, comment: this.state.textValue })


  }
  sping = () => {
    this.getCommentList({ page: this.state.page })
    this.setState({ loading: true, hidden: true })
  }

  current=(page,pageSize)=>{
    this.setState({page:page})
    this.getCommentList({ page: page })
  }







  render() {
    return (
      <div className="comment" >
        <div className="xian"></div>
        <div className="has">
          <span className="title">整体得分</span>
          <div className="xing">
            <img src={this.state.scoreSon >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 1 && this.state.scoreSon > 0 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 2 && this.state.scoreSon > 1 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 3 && this.state.scoreSon > 2 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 4 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 4 && this.state.scoreSon > 3 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
            <img src={this.state.scoreSon >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && this.state.scoreSon < 5 && this.state.scoreSon > 4 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />

          </div>
          <span className="title">设施   {this.state.score.equscore}分    服务   {this.state.score.envscore}分    价格  {this.state.score.xjbScore}分</span>
        </div>
        <div className="xian"></div>
        <div className="content">
          <div className="contentTitle">
            <span className="new">最新评论</span>
            <div className="sping"> <Icon type="sync" className={this.state.hidden === true ? 'hidden' : 'block'} onClick={this.sping} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.loading} /></div>
          </div>
          <Spin spinning={this.state.Oneloading} style={{ minHeight: 600 }} size="large">
            {
              this.state.commentList.map((item, i) => (
                <div className="boss" key={i}>
                  <div className="contentSon">
                    <div className="avatar"> <img src={require('../../assets/yonghu.png')} alt="评论图片" /></div>
                    <div className="introduction">
                      <span className="name">匿名用户</span>
                      <div className="sumFen">
                        <span className="title">打分</span>
                        <div className="xing">
                          <img src={item.score >= 1 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 1 && item.score > 0 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                          <img src={item.score >= 2 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 2 && item.score > 1 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                          <img src={item.score >= 3 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 3 && item.score > 2 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                          <img src={item.score >= 4 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 4 && item.score > 3 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                          <img src={item.score >= 5 ? require("../../assets/50xing (3).png") : require("../../assets/50xing (2).png") && item.score < 5 && item.score > 4 ? require("../../assets/50xing (1).png") : require("../../assets/50xing (2).png")} alt="星" />
                        </div>
                        <span className="sumNum">{item.score}分</span>
                        <span className="titleThree">设施 {item.equscore}分   服务 {item.envscore}分   价格 {item.xjbScore}分</span>
                      </div>
                      <span className="text">
                        {item.content}
                      </span>
                      <div className={this.state.imgArr.length > 0 ? 'imgA' : 'hidden'}>
                        {/* {
                    this.state.imgArr.map((index,i)=>(
                       <img key={i} src={require('https://app.tiaozhanmeiyitian.com'+item.imgbaseurl+'/'+index)} alt="评论图片" />
                    ))
                  } */}

                      </div>
                      <span className="timer">{item.commentDate}</span>




                    </div>
                    <div className={item.comment_reply === null ? 'publishNone' : 'kefu'}>
                      <img src={require("../../assets/kefu.png")} alt="客服" />
                      <div className="kefuSon">
                        <span className="text" style={{ wdith: 500 }}>{item.comment_reply}</span>
                        <span className="timerLok">{item.comment_reply_time}</span>
                      </div>
                    </div>
                    <div className={item.comment_reply !== null ? 'publishNone' : 'textArea'} data-index={i} onClick={this.pullOut}><img src={require('../../assets/icon_pc_comment.png')} alt="评论" /></div>
                  </div>
                  <div className={this.state.flag === i ? 'publish' : 'publishNone'}>
                    <img src={require('../../assets/kefu.png')} alt="场馆" />
                    <TextArea className="news" onChange={this.textValue} value={this.state.textValue} placeholder="请输入您的回复内容" maxLength={200} rows={2} />
                    <div className="operation">
                      <div onClick={this.clear}>清空</div>
                      <div onClick={this.operation} data-uid={item.uid}>发布</div>
                    </div>
                  </div>
                </div>
              ))
            }
             
             <Pagination className="fenye" defaultCurrent={1} onChange={this.current} total={this.state.other} />

            <Result className={this.state.commentList.length === 0 ? 'block' : 'hidden'} icon={<Icon type="calendar" theme="twoTone" twoToneColor="#F5A623" />} title="还没有人评价！" />
          </Spin>

        </div>






      </div>
    );
  }
}

export default comment;
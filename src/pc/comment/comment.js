import React from 'react';
import './comment.css';
import 'antd/dist/antd.css';
import { getCommentList, VenueCommentReply } from '../../api';
import { Spin, Icon, Input, message,Result } from 'antd';
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
    Oneloading:true
  };


  componentDidMount() {
    this.getCommentList({ page: 1 })
  }





  async getCommentList(data) {
    const res = await getCommentList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let imgArr = []
      if (res.data.data.length > 0) {
         for(let i in res.data.data){
           if(res.data.data[i].imgnames!==null){
            let imgS = res.data.data[i].imgnames.split('|')
            for (let i in imgS) {
              imgArr.push(imgS[i])
            }
           }
        
         }
        
        this.setState({ commentList: res.data.data, imgArr: imgArr, loading: false, hidden: false,Oneloading:false })
      }
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ loading: false, hidden: false,Oneloading:false })
    }

  }
  textValue = e => {
    this.setState({ textValue: e.target.value })
  }
  clear = () => {
    this.setState({ textValue: '' })
  }
  pullOut = (e) => {
    this.setState({ flag:parseInt(e.currentTarget.dataset.index) })
    if(parseInt(e.currentTarget.dataset.index)===this.state.flag){
      this.setState({ flag:null})
    }
  }



  async VenueCommentReply(data) {
    const res = await VenueCommentReply(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      this.getCommentList({ page: 1 })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }else{
      message.error(res.data.msg)
    }

  }
  operation = (e) => {
    this.VenueCommentReply({ commentid: e.target.dataset.uid, comment: this.state.textValue })
    

  }
  sping = () => {
    this.getCommentList({ page: 1 })
    this.setState({ loading: true, hidden: true })
  }








  render() {
    return (
      <div className="comment" >
        <div className="xian"></div>
        <div className="has">
          <span className="title">整体得分</span>
          <div className="xing">
            {/* <img src={this.state.getVenue.score >= 1 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" /> */}
            <img src={require('../../assets/50xing (3).png')} alt="666" />
            <img src={require('../../assets/50xing (3).png')} alt="666" />
            <img src={require('../../assets/50xing (3).png')} alt="666" />
            <img src={require('../../assets/50xing (3).png')} alt="666" />
            <img src={require('../../assets/50xing (3).png')} alt="666" />
          </div>
          <span className="title">设施    服务    价格</span>
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
                          {/* <img src={this.state.getVenue.score >= 1 ? require('../../assets/50xing (3).png') : require('../../assets/50xing (2).png')} alt="666" /> */}
                          <img src={require('../../assets/50xing (3).png')} alt="666" />
                          <img src={require('../../assets/50xing (3).png')} alt="666" />
                          <img src={require('../../assets/50xing (3).png')} alt="666" />
                          <img src={require('../../assets/50xing (3).png')} alt="666" />
                          <img src={require('../../assets/50xing (3).png')} alt="666" />
                        </div>
                        <span className="sumNum">{item.score}分</span>
                        <span className="titleThree">设施 {item.equscore}分   服务 {item.envscore}分   价格 {item.xjbScore}</span>
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

                      <span className="text">{item.comment_reply}</span>

                      <span className="timer">{item.comment_reply_time}</span>

                    </div>
                    <div className="textArea" data-index={i} onClick={this.pullOut}><img src={require('../../assets/icon_pc_comment.png')} alt="评论" /></div>
                  </div>
                  <div className={this.state.flag === i ? 'publish' : 'publishNone'}>
                    <img src={require('../../assets/kefu.png')} alt="场馆" />
                    <TextArea className="news" onChange={this.textValue} value={this.state.textValue} rows={2} />
                    <div className="operation">
                      <div onClick={this.clear}>清空</div>
                      <div onClick={this.operation} data-uid={item.uid}>发布</div>
                    </div>
                  </div>
                </div>
              ))
            }
          
          <Result className={this.state.commentList.length===0? 'block' : 'hidden'} icon={<Icon type="calendar" theme="twoTone" twoToneColor="#F5A623" />} title="还没有人评价！" />
          </Spin>


        </div>






      </div>
    );
  }
}

export default comment;
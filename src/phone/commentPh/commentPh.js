import React from 'react';
import './commentPh.css';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Toast, PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { getCommentList, getOverallScore, VenueCommentReply } from '../../api';
import { Pagination, Result, Icon, Modal, Input } from 'antd';

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
  }
  async getCommentList(data) {
    const res = await getCommentList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else {
      this.setState({ getCommentList: res.data.data, refreshing: false })
    }
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
    this.setState({ textArea: e.target.value })
  }
  publish = e => {
    let { uid, textArea } = this.state
    this.VenueCommentReply({ commentid: uid, comment: textArea })
  }
  async VenueCommentReply(data) {
    const res = await VenueCommentReply(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visible: false })
      this.getCommentList({ page: 1 })
    } else if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else {
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

  render() {

    return (
      <div className="commentPh">
        <div className="headerTitle">
          <Icon type="arrow-left" onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px' }} />
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
            <span className="right">{this.state.score.score}</span>
          </div>
          <div className="serve"><span>设施 {this.state.score.equscore}</span> <span>服务 {this.state.score.envscore}</span> <span>价格 {this.state.score.xjbScore}</span></div>
        </div>
        <div style={{ height: '1rem', background: '#f5f5f5', marginTop: '1rem' }}></div>

        <PullToRefresh
          damping={60}
          ref={el => this.ptr = el}
          style={{
            height: this.state.height,
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
                  <span style={{ display: 'block', clear: 'both' }}>{item.content}</span>
                  {/* 评论图片 */}
                  <div style={{ display: 'block', clear: 'both' }} className="commentImg">
                  </div>
                  <span style={{ display: 'block', clear: 'both' }}>{item.commentDate}</span>
                  <div className={item.comment_reply !== null ? 'Stadium' : 'stadiumNone'}>
                    <div className="logoImg"><img src={require("../../assets/kefu.png")} alt="场馆端" /></div>
                    <span className="stadiumText">{item.comment_reply}</span>
                  </div>
                  <span className={item.comment_reply !== null ? 'StaiumDate' : 'stadiumNone'}>{item.comment_reply_time}</span>
                  <div className="reply" data-uid={item.uid} onClick={this.showModal}><img src={require("../../assets/icon_pc_comment.png")} alt="回复" /></div>
                </div>
              ))

            }

            <Modal
              title="回复该客户"
              footer={null}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <TextArea rows={4} maxLength={100} onChange={this.textArea} />
              <div className="commentPhbtn">
                <div onClick={this.handleCancel}>取消</div>
                <div style={{ marginLeft: '0.5rem', background: '#F5A623', color: '#fff' }} onClick={this.publish}>发布</div>
              </div>
            </Modal>


            <Pagination className="fenye" size='small' style={this.state.getCommentList.length > 0 ? {} : { display: 'none' }} current={parseInt(this.state.current)} pageSize={10} total={this.state.getCommentList.length} onChange={this.pageChang} />
            <Result className={this.state.getCommentList.length === 0 ? '' : 'hidden'} icon={<Icon type="database" style={{ fontSize: '2rem' }} theme="twoTone" twoToneColor="#F5A623" />} title="没有场馆评论" />
          </div>

        </PullToRefresh>





      </div>
    );
  }
}

export default commentPh;
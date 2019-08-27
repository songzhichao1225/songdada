import React from 'react';
import './comment.css';
import 'antd/dist/antd.css';
import { getCommentList } from '../../api';
import { Spin, Icon, Input } from 'antd';
const { TextArea } = Input;





const antIcon = <Icon type="sync" style={{ fontSize: 24, color: 'black' }} spin />;
class comment extends React.Component {
  state = {
    loading: false,
    textValue: '',
    flag: false
  };


  componentDidMount() {
    this.getCommentList({ page: 1 })
  }





  async getCommentList(data) {
    const res = await getCommentList(data, sessionStorage.getItem('venue_token'))
    console.log(res)
    this.setState({})
  }
  textValue = e => {
    this.setState({ textValue: e.target.value })
  }
  clear = () => {
    this.setState({ textValue: '' })
  }
  pullOut = () => {
    console.log(!this.state.flag)
    this.setState({ flag: !this.state.flag })
  }
  operation = () => {

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
            <div className="sping"> <Icon type="sync" style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.loading} /></div>
          </div>

          <div className="boss">

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
                  <span className="sumNum">5分</span>
                  <span className="titleThree">设施    服务    价格</span>
                </div>
                <span className="text">
                  场馆是打球里边最干净的场馆了，价格实惠，服务人员态度极好！！地理位置好找，唯一不足的是环境稍差。
              </span>
                <div className="imgA" >
                  <img src={require('../../assets/icon_pc_statusR.png')} alt="评论图片" />
                </div>
                <span className="timer">2019-2-1</span>
              </div>
              <div className="textArea" onClick={this.pullOut}><img src={require('../../assets/icon_pc_comment.png')} alt="评论" /></div>
            </div>
            <div className={this.state.flag === true ? 'publish' : 'publishNone'}>
              <img src={require('../../assets/kefu.png')} alt="场馆" />
              <TextArea className="news" onChange={this.textValue} value={this.state.textValue} rows={2} />
              <div className="operation">
                <div onClick={this.clear}>清空</div>
                <div onClick={this.operation}>发布</div>
              </div>
            </div>


          </div>




        </div>






      </div>
    );
  }
}

export default comment;
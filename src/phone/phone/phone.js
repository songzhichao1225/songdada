import React from 'react';
import './phone.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Popover, NavBar, Icon } from 'antd-mobile';

const Item = Popover.Item;

class phone extends React.Component {

  state = {
    visible: false,
    selected: '',
  };

  componentDidMount() {
  }
  onSelect = (opt) => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    })
  }
  retrun=()=>{
    this.props.history.goBack()
  }



  render() {
    return (
      <div className="phone">
        <div className="header">
          <img src={require('../../assets/logoHead.png')} alt="logo" />
          <div className="rightNav" id='home'> 
            <NavBar
              mode="light" 
              rightContent={
                <Popover mask
                  overlayClassName="fortest"
                  overlayStyle={{ color: 'currentColor' }}
                  visible={this.state.visible}
                  overlay={[
                    (<Item key="8"><div  onClick={this.retrun}>返回场馆端</div></Item>),
                  ]}
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                  }}
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}
                >
                  <div style={{ 
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Icon type="ellipsis" />
                  </div>
                </Popover>
              }
            >

            </NavBar>
          </div>
        </div>
        {/* 头部 */}
        <div className="banner">
          <img rel="prerender" src={require('../../assets/banner@2x.png')} alt="banner" />
        </div>

        {/* banner */}

        <div className="products" id="Two">
          <h3>我们的产品</h3>
          <span className="span">product</span>
          <div className="xian"></div>
          <div className="sportsman">
            <span className="title">如果您是</span>
            <h2 className="topTil">运动者</h2>
            <span className='title' style={{ marginTop: '0.3rem' }}>使用找对手用户端，我们将帮助您：</span>
            <div className="top" style={{ float: 'left',paddingBottom:'25%' }}>
              <div className="text">
                <span className="textOne">找到运动伙伴</span>
                <span className="textTwo">帮助用户随时、随地、快速地找到想要找的对手。</span>
              </div>
              <img src={require('../../assets/people.png')} alt="666" />
            </div>

            <div className="top" style={{ float: 'right', marginLeft: '0', marginRight: '5%',paddingBottom:'25%'  }}>
              <div className="text" style={{ float: 'right', marginRight: '0.5rem' }}>
                <span className="textOne">增加经济收入</span>
                <span className="textTwo">技术等级够高、技术分排名靠前可当陪练、参加平台组织的比赛，陪练费和奖金等你拿。</span>
              </div>
              <img rel="prerender" style={{ left: '-36%' }} src={require('../../assets/peopleTwo.png')} alt="666" />
            </div>

            <div className="top" style={{ float: 'left',paddingBottom:'25%'  }}>
              <div className="text">
                <span className="textOne">荣誉感 成就感</span>
                <span className="textTwo">技术分和技术等级的提升让您充满荣誉感、成就感，激发您的征服欲。</span>
              </div>
              <img rel="prerender" src={require('../../assets/peopleThree.png')} alt="666" />
            </div>
            <div className="footer">
              <span>推广员、场馆先行<br />用户端敬请期待中……</span>
            </div>
          </div>



          <div className="sportsman">
            <span className="title">如果您是</span>
            <h2 className="topTil">场馆方</h2>
            <span className='title' style={{ marginTop: '0.3rem' }}>使用找对手场馆端，我们将帮助您：</span>
            <div className="top" style={{ width: '90%',paddingBottom:'8rem' }}>
              <img style={{ width: '90%', position: 'static', marginLeft: '25%', paddingTop: '1rem' }} src={require('../../assets/changguan.png')} alt="666" />
              <div className="text" style={{ paddingTop: '0.69rem', paddingLeft: '10%', width: '14.19rem' }}>
                <span className="textOne">提高场馆收入</span>
                <span className="textTwo">促成2/3原本找不到对手而不能成行的活动，给场馆增加新的用户流量。</span>
              </div>
            </div>

            <div className="top" style={{ width: '90%', paddingBottom:'11rem' }}>
              <img style={{ width: '90%', position: 'static', marginLeft: '-5%', paddingTop: '1rem' }} src={require('../../assets/changguanTwo.png')} alt="666" />
              <div className="text" style={{ paddingTop: '0.69rem', paddingLeft: '10%', width: '14.19rem' }}>
                <span className="textOne">降低人力成本</span>
                <span className="textTwo" style={{ marginTop: '0.5rem' }}>一个传统活动订单需要接电话、开关灯、收银等，在“找对手”平台产生的订单，只需要开关灯，后期开关灯也不需要。原来两个前台人员的工作现在只需要一个人。</span>
              </div>
            </div>
            <div className="footer" style={{ float: 'right', marginRight: '5%' }}>
              <span style={{ textAlign: 'right' }}><a href='https://venue.tiaozhanmeiyitian.com' style={{ color: '#fff' }}>点此进入场馆端登录>></a></span>
            </div>
          </div>

          <div className="sportsman">
            <span className="title">如果您</span>
            <h2 className="topTil">不是前两者</h2>
            <span className='title' style={{ marginTop: '0.3rem' }}>使用找对手用户端，成为我们的线上兼职推广员，我们会给您带来丰厚的回报：</span>
            <div className="top" style={{ width: '90%', paddingBottom:'8rem' }}>
              <img style={{ width: '90%', position: 'static', marginLeft: '16%', paddingTop: '1rem' }} src={require('../../assets/tui.png')} alt="666" />
              <div className="text" style={{ paddingTop: '0.69rem', paddingLeft: '10%', width: '14.19rem' }}>
                <span className="textOne">分享转发，回报丰厚</span>
                <span className="textTwo">动动手指、轻松分享转发，就可获得丰厚回报，请下载我们的用户端。</span>
              </div>
            </div>

            <div className="top" style={{ width: '90%',paddingBottom:'11rem' }}>
              <img style={{ width: '90%', position: 'static', marginLeft: '-5%', paddingTop: '1rem' }} src={require('../../assets/tuiTwo.png')} alt="666" />
              <div className="text" style={{ paddingTop: '0.69rem', paddingLeft: '10%', width: '14.19rem' }}>
                <span className="textOne">线下推广专员，月薪轻松过万</span>
                <span className="textTwo" style={{ marginTop: '0.5rem' }}>在您引入的合作场馆发产生的每一笔订单都有您的提成，月薪轻松过万。请下载我们的推广专员端。</span>
              </div>
            </div>
            <div className="footer" style={{ float: 'right', marginRight: '5%' }}>
              <span style={{ textAlign: 'right' }}>>></span>
            </div>
          </div>
        </div>

        {/* 我们的产品 */}
        <div className="questions" id="Three">
          <img className="banBack" src={require('../../assets/quThree.png')} alt="555" />
          <div className="content">
            <h3>我们能解决的问题</h3>
            <span>Problem solved</span>
            <div className="xian"></div>
            <div className="contentImg" style={{ width: '55%', position: 'relative',height:'90%' }}><img src={require('../../assets/quOne.png')} alt="55" /><span style={{ position: 'absolute', bottom: '1rem', left: '0.5rem', display: 'block' }}>跟熟人空闲时间不同步</span></div>
            <div className="contentImg" style={{ width: '42%',marginLeft: '3%', position: 'relative' }}><img src={require('../../assets/quTwo.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem',display: 'block' }}>跟熟人距离太远</span></div>
            <div className="contentImg" style={{ width: '32%',  marginTop: '0.25rem', position: 'relative' }}><img src={require('../../assets/quThree.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem', display: 'block' }}>竞技水平差距大</span></div>
            <div className="contentImg" style={{ width: '32%', marginTop: '0.25rem', marginLeft: '2%', position: 'relative' }}><img src={require('../../assets/quFour.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem', display: 'block' }}>技术好无法带来足够荣誉感</span></div>
            <div className="contentImg" style={{ width: '32%',marginTop: '0.25rem', marginLeft: '2%', position: 'relative' }}><img src={require('../../assets/quFive.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem', display: 'block' }}>技术好无法带来经济收入</span></div>
            <div className="contentImg" style={{ width: '42%', marginTop: '0.25rem', position: 'relative' }}><img src={require('../../assets/quSix.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem', display: 'block' }}>场馆总体预订率低</span></div>
            <div className="contentImg" style={{ width: '55%',  marginTop: '0.25rem', marginLeft: '2%', position: 'relative' }}><img src={require('../../assets/quSeven.png')} alt="55" /><span style={{ position: 'absolute', left: '0.5rem', bottom: '1rem', display: 'block' }}>场馆人力成本高</span></div>
          </div>
        </div>
        {/* 我们能解决的问题 */}
        <div className="mine" id='mine'>
          <h3>关于我们</h3>
          <span>about us</span>
          <div className="xian"></div>
          <img src={require('../../assets/mine.png')} alt="77" />
          <span className="span">北京甲乙电子商务有限公司，成立于2015年，位于北京市城市副中心。随着社会经济的发展，科学技术的进步，生产力水平的提高，人们逐渐从繁重的体力劳动中解放出来。随之而来的“运动量不足”、“富贵病”却又影响着人们的健康，尤其是坐办公室的上班一族。健康是1，其它都是0，只有这个1，更多的0才有意义。</span>
          <span className="span">跑步、练器械等一个人可开展的体育运动略显枯燥，有很大一部分人无法长期坚持。羽毛球、乒乓球、台球等两个人以上才能完成的对抗性运动，有趣、易坚持但又不好找到运动对手、伙伴。初步统计，有2/3左右的人有运动需求，但因为找不到运动伙伴，运动需求得不到满足。</span>
          <span className="span">通过我们的服务：1）让用户更方便地找到运动伙伴、运动更有趣;  2）让场馆提高场馆预订率、降低场馆人员支出成本。</span>
          <span className="span">公司的愿景：让大家开展体育运动更方便、更有趣！期待志同道合的优秀人士加入到我公司，一起为这个愿景努力！</span>
        </div>

        <div className="footerBot">
          <ul style={{listStyleType:'none'}}> 
            <li><span>网站首页</span><span>地址：北京通州区华远好天地A座</span></li>
            <li><span>公司产品</span><span>电话：010-80895078</span></li>
            <li><span>公司介绍</span><span>邮编：101016</span></li>
            <li><span>联系我们</span><span>邮编：help@zhaoduishou.com</span></li>
            <li><span>场馆端登录</span><span>网址：www.zhaoduishou.com</span></li>
          </ul>
          <div className="atCop">
            <span>Copyright © 2018 北京甲乙电子商务有限公司  版权所有  </span>
            <span>备案号：京ICP备18030810号-1</span>
          </div>
        </div>
      </div>
    )
  }
}

export default phone;
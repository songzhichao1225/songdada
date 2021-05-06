import React from 'react';
import './aboutNews.css';



class aboutNews extends React.Component {

  state = {

  };


  componentDidMount() {
   alert('6666')
  }

  render() {
    return (
      <div className="aboutNews" style={{background:'red'}}>
        <div className="rivalFruit">
          <h3>关于对手果</h3>
          <div className="son">
            <span className="title">1、对手果是什么？</span>
            <span className="hayi">答：对手果是“找对手”平台为用户设计的一种虚拟币，主要奖励用户的每日打卡、发布活动、分享活动、邀请新人、分享APP、意见反馈等对平台有贡献的行为，也可以说的贡献币。</span>
          </div>
          <div className="son">
            <span className="title">2、怎么获取对手果？</span>
            <span className="hayi">答：用户注册后就可获得10枚对手果，后期获取主要有如下五种方式：</span>
            <span className="hayi">1）每日打卡：+2.5枚对手果/次；</span>
            <span className="hayi">2）发布活动：+50枚对手果/次（匹配成功后）；</span>
            <span className="hayi">3）邀请新人：发布或报名活动后，每邀请一个新用户参与并完成活动，奖励邀请人500枚对手果（合减免场地费10元）。</span>
            <span className="hayi">4）分享APP：分享后您将获得50枚对手果/一级新用户；10枚对手果/二级用户；2枚对手果/三级用户。</span>
            <span className="hayi">5）输入您发现的问题或其他建议，如是客观存在的问题或被采纳的建议，将奖励您1000枚对手果（折合20元人名币）。</span>
          </div>
          <div className="son">
            <span className="title">3、对手果有什么做用？</span>
            <span className="hayi">答：主要有如下4种做用：</span>
            <span className="hayi">1）可按50:1比例兑换现金；</span>
            <span className="hayi">2）可按10:1比例兑换为场地费抵用券；</span>
            <span className="hayi">3）当某项运动项目技术分&lt;5时，系统自动将10枚对手果转换为10技术分。</span>
            <span className="hayi">4）当对手果排名靠前时，我们会有额外的奖励。</span>
          </div>

        </div>


      </div>
    );
  }
}

export default aboutNews;
import React from 'react';
import './Agreement.css';

import { NavBar, Popover } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { EllipsisOutlined, LeftOutlined } from '@ant-design/icons';
const Item = Popover.Item;
class Agreement extends React.Component {

  state = {
    visible: false
  };

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
      this.setState({ visible: false })
    } else {
      this.close()
    }
  }
  reture = () => {
    this.props.history.goBack()
  }



  render() {
    return (
      <div className="Agreement" >
        <NavBar
          mode="dark"
          icon={<LeftOutlined onClick={this.reture} />}
          rightContent={<Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            onSelect={this.closeWeb}
            overlay={[
              (<Item key="1" value="scan" style={{ fontSize: '0.7rem' }} data-seed="logId">{window.location.href.indexOf('flag=1') === -1 ? '返回官网' : '关闭'}</Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}

          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <EllipsisOutlined />
            </div>
          </Popover>}
        ><span style={{ fontSize: '1rem' }}>场馆入驻协议</span></NavBar>
        <div className="boss">
          <span className="block">场馆方：提供场地方（注册方）</span>
          <span className="block">平台方："找对手"平台（北京甲乙电子商务有限公司）</span>
          <span className="block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"找对手"是帮用户找到运动对手、运动伙伴的平台。大量运动需求因没有运动伙伴而无法进行；通过“找对手”平台，大量运动需求发布至平台，其他用户可进行精确筛选和报名。<span className="weight">用户找运动对手、运动伙伴的范围由原来有限的朋友熟人扩大至整个网络平台，匹配成功的概率大幅提高，大量的运动需求得到满足释放</span>；就像滴滴顺风车之于传统熟人拼车。</span>
          <span className="block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="weight">因此，平台能为场馆带来大量的新增用户、流量</span>。场馆方、“找对手”平台双方基于互惠共赢，自愿遵守以下协议：</span>
          <span className="block" style={{ fontSize: '1rem', fontWeight: 'bold', paddingTop: '0.5rem' }}>一、"找对手"平台的责任和义务</span>
          <span className="block">1、"找对手"平台不得主动将场馆方提交的非公开信息（如营业执照、法人姓名、身份证号、法人手机号、收款银行信息）透漏给第三方；否则场馆方有权追诉平台方的责任；</span>
          <span className="block">2、用户发布活动时，平台须第一时间通过场馆端内部推送信息、声音播报、场地占用页面告知场馆方；</span>
          <span className="block">3、活动截止报名时，平台须第一时间通过场馆端内部推送信息、声音播报、场地占用页面告知场馆方活动是否匹配成功，是否需要预留场地；</span>
          <span className="block">4、截止报名时，活动匹配成功。<span className="weight">不管用户是否到场</span>，场馆方正常提供场地前提下（无用户投诉场馆未预留场地），平台方都须第一时间将扣除服务费后的场地费支付给场馆方；<span className="weight">平台服务费=场地费*6%。</span></span>
          <span className="block">5、当有用户投诉场馆未预留场地后，平台方须在24小时内安排推广员进行核实，根据最终核实情况，决定是否将场地费支付给场馆方；</span>
          <span className="block" style={{ fontSize: '1rem', fontWeight: 'bold', paddingTop: '0.5rem' }}>二、场馆方的责任和义务</span>
          <span className="block">1、场馆方注册时填写的信息须客观、真实，不得在平台填写违规、违法等敏感信息内容，否则平台有权解除与场馆方的合作关系；</span>
          <span className="block">2、场馆方可根据各类场地各时间段的供需情况，设置各类场地各时间段的场地价格、最短提前预约时间；</span>
          <span className="block">2.1、<span className="weight">场地价格</span><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="weight">场馆方承诺给平台方的各类场地各时间段价格不得高于相应场地相应时间段对外的最基础会员价</span>，否则平台有权解除与场馆方的合作关系；</span>
          <span className="block">2.2、<span className="weight">最短提前预约时间</span><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;也就是“活动截至报名时间”至“活动开始时间”的时长。</span>
          <span className="block">2.2.1、如场馆端设置的18:00-22:00时间段的最短提前预约时间为1小时，那么用户发布18:00-22:00的活动时，截止报名时间会在活动开始时间前1个小时，也就是在该时间段的活动，平台方都会提前1小时告知场馆方该活动是否匹配成功。从这个意义，最短提前预约时间设置的越长，对场馆相对越安全；</span>
          <span className="block">2.2.2、但最短提前预约时间设置过长也会影响用户通过平台发布活动预订场馆，如场馆端设置的最短提前预约时间为24小时，也就是任何用户通过平台发布活动时，最早只能预订当前时间24小时后的场地，大大影响用户通过平台的预订，无法大幅度提高场馆预订率。</span>
          <span className="block">3、场馆方在收到用户发布活动的通知后，场馆方须及时查看通知且须预留场地直至该活动截止报名时间。</span>
          <span className="block">4、到截止报名时间，根据活动匹配成功与否，决定场馆方是否需要继续预留场地，如下:</span>
          <span className="block">4.1、<span className="weigth">活动匹配成功</span>：场馆方须继续预留场地给匹配成功的活动直至活动结束时间，否则会影响该场馆的履约率。</span>
          <span className="block">4.2、<span className="weight">活动匹配失败</span>：场馆方无须继续给该活动预留场地；</span>
          <span className="block">5、<span className="weight">场馆方须支付场地费的6%作为平台服务费</span>，如场馆方给平台的价格为20元/小时，场馆方收到的场地费为18.8元/小时；</span>
          <span className="block">6、场馆方在特殊情况下须临时关闭场馆时，须第一时间在场馆端进行操作。</span>
          <span className="block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勾选√“已阅读并同意《场馆入驻协议》”，视为双方均同意上述条款，对双方均具有法律约束力。</span>
        </div>




      </div>
    );
  }
}

export default Agreement;
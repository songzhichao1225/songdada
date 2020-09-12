import React from 'react';
import './Membership.css';
import { LeftOutlined } from '@ant-design/icons';
import {getCompleteMembershipRechargeDetails} from '../../api';
class Membership extends React.Component {

  state = {
    chargeDetails:[],
  };

  // async getVenueWithdrawalOneList(data) {
  //   const res = await getVenueWithdrawalOneList(data, localStorage.getItem('venue_token'))
  //    if (res.data.code === 2000) {
  //     res.data.data.Bankaccount=res.data.data.Bankaccount.slice(res.data.data.Bankaccount.length-4,res.data.data.Bankaccount.length)
  //     res.data.data.legalname='***'+res.data.data.legalname.slice(-1)
  //     this.setState({ withdrawalPh: res.data.data,flag:1 })
  //   }
  // }

  componentDidMount() {
    this.getCompleteMembershipRechargeDetails()
  }

  async getCompleteMembershipRechargeDetails(data) {
    const res = await getCompleteMembershipRechargeDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ chargeDetails: res.data.data })
    }
  }


  reture = () => {
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="Membership" style={this.state.chargeDetails.length!==0?{}:{display:'none'}}>
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />会员卡照片</div>
        <div className="vipOne">
          <span>会员卡正面照</span>
          <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.chargeDetails.cardJustURL} alt="img" />
        </div>
        <div className="vipOne">
          <span>会员卡反面照</span>
          <img src={'https://app.tiaozhanmeiyitian.com/' + this.state.chargeDetails.cardBackURL} alt="img" />
        </div>
      </div>
    );
  }
}

export default Membership;
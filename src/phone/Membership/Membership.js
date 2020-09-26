import React from 'react';
import './Membership.css';
import { LeftOutlined } from '@ant-design/icons';
import {getCompleteMembershipRechargeDetails,imgUrlTwo} from '../../api';
class Membership extends React.Component {

  state = {
    chargeDetails:[],
    imgMasking:'',
    masking:false
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

  maskingF=()=>{
    this.setState({masking:false})
  }
 
  fangda=e=>{
   this.setState({imgMasking:e.currentTarget.dataset.url,masking:true})
  }
 
 
 
  render() {
    return (
      <div className="Membership" style={this.state.chargeDetails.length!==0?{}:{display:'none'}}>
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />会员卡照片</div>
        <div className="vipOne">
          <span>会员卡正面照</span>
          <img src={imgUrlTwo+ this.state.chargeDetails.cardJustURL} onClick={this.fangda} data-url={this.state.chargeDetails.cardJustURL} alt="img" />
        </div>
        <div className="vipOne">
          <span>会员卡反面照</span>
          <img src={imgUrlTwo + this.state.chargeDetails.cardBackURL} onClick={this.fangda} data-url={this.state.chargeDetails.cardBackURL} alt="img" />
        </div>
        
        <div className={this.state.masking===true?'masking':'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img"/>
        </div>
      </div>
    );
  }
}

export default Membership;
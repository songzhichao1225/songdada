import React from 'react';
import './advertisingPh.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LeftOutlined } from '@ant-design/icons';
import {VenueAdvertiseSave, VenueAdvertiseFirst,imgUrlTwo, gerVenueName } from '../../api';
import { Toast } from 'antd-mobile';

class advertisingPh extends React.Component {

  state = {
    advertising: '',
    advertisingTwo: '',
    cgName: '',
    btnList: 1,
    advertise_uuid:'',
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000) {
      this.setState({cgName:res.data.data.name})
    }
  }

  async VenueAdvertiseFirst(data) {
    const res = await VenueAdvertiseFirst(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      if (res.data.data.length !== 0) {
        if(res.data.data.imgURL.indexOf('|')!==-1){
          this.setState({advertising:res.data.data.imgURL.split('|')[0],advertisingTwo:res.data.data.imgURL.split('|')[1]})
        }else{
          this.setState({advertising:res.data.data.imgURL})
        }
        this.setState({ btnList: res.data.data.status,advertise_uuid:res.data.data.uuid,})
      }

    }
  }


  componentDidMount() {
    this.gerVenueName()
    this.VenueAdvertiseFirst()
  }

 
  advertising = info => {

    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (this.state.imgFileTwo !== '') {
        this.setState({ advertising: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlThree: '', imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL, imgFileTwo: '' })
      } else {
        this.setState({ advertising: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL })
      }
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    }
  };
  advertisingTwo = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      if (this.state.imgFileTwo !== '') {
        this.setState({ advertisingTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imageUrlThree: '', imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL, imgFileTwo: '' })
      } else {
        this.setState({ advertisingTwo: info.file.response.data.baseURL + info.file.response.data.filesURL, imgHood: info.file.response.data.baseURL, imgFile: info.file.response.data.filesURL })
      }
    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    }
  };


  async VenueAdvertiseSave(data) {
    const res = await VenueAdvertiseSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.VenueAdvertiseFirst()
    }else{
      Toast.fail(res.data.msg, 1);
    }
  }


  addBtn=()=>{
    let imgurl=''
    let {advertising,advertisingTwo}=this.state
    if(advertising!==''&&advertisingTwo!==''){
       imgurl=advertising+'|'+advertisingTwo
    }else if(advertising===''&&advertisingTwo!==''){
      imgurl=advertisingTwo
    }else if(advertisingTwo===''&&advertising!==''){
      imgurl=advertising
    }else{
      imgurl=''
    }
    this.VenueAdvertiseSave({imgurl:imgurl,advertise_uuid:this.state.advertise_uuid})
  }

  
  reture = () => {
    this.props.history.goBack()
  }



 

  render() {
    const { advertising, advertisingTwo } = this.state
    const uploadButtonThree = (
      <div>
        <svg t="1596268702646" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '0.5rem' }} p-id="3225" width="48" height="48"><path d="M1004.8 533.333333H21.333333c-10.666667 0-19.2-8.533333-19.2-19.2V512c0-12.8 8.533333-21.333333 19.2-21.333333h983.466667c10.666667 0 19.2 8.533333 19.2 19.2v2.133333c2.133333 12.8-8.533333 21.333333-19.2 21.333333z" p-id="3226" fill="#8a8a8a"></path><path d="M535.466667 21.333333v981.333334c0 10.666667-8.533333 21.333333-21.333334 21.333333-10.666667 0-21.333333-10.666667-21.333333-21.333333V21.333333c0-10.666667 8.533333-21.333333 21.333333-21.333333 10.666667 0 21.333333 8.533333 21.333334 21.333333z" p-id="3227" fill="#8a8a8a"></path></svg>
      </div>
    )
   
    return (
      <div className="advertisingPh">
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />设置广告宣传图片</div>
        <div className={this.state.flagUntieTwo === false ? 'reset' : 'listNone'}>
          <div className="advertising">
            <div style={{ fontSize: '14x' }}>请上传广告宣传图片(最多2张)</div>
            <div style={{ fontSize: '12x', color: '#D85D27' }}>在“找对手”平台做广告时提供，图片上能须体现出场馆名字</div>
            <div className="name">
              <div className="clearfix">
                <ImgCrop aspect={20 / 9} quality={1} width={200} height={90}>
                  <Upload
                    name="files"
                    listType="picture-card"
                    className="avatar-uploader addImg"
                    showUploadList={false}
                    action={imgUrlTwo+"api/UploadVenueImgs?type=Venue"}
                    onChange={this.advertising}
                    accept=".jpg, .jpeg, .png"
                  >
                    {advertising ? <img src={imgUrlTwo + advertising} style={{ width: '200px', height: '90px' }} alt="avatar" /> : uploadButtonThree}
                  </Upload>
                </ImgCrop>
              </div>

              <div className="clearfix">
                <ImgCrop aspect={20 / 9} quality={1} width={200} height={90}>
                  <Upload
                    name="files"
                    listType="picture-card"
                    className="avatar-uploader addImg"
                    showUploadList={false}
                    action={imgUrlTwo+"api/UploadVenueImgs?type=Venue"}
                    onChange={this.advertisingTwo}
                    accept=".jpg, .jpeg, .png"
                  >
                    {advertisingTwo ? <img src={imgUrlTwo + advertisingTwo} style={{ width: '200px', height: '90px' }} alt="avatar" /> : uploadButtonThree}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
            <div className="submit"  onClick={this.state.btnList===0?this.lokomook:this.addBtn}>{this.state.btnList === 0 ? '待审核' : '确定'}</div>


          </div>
        </div>

      </div>
    )
  }
}

export default advertisingPh;
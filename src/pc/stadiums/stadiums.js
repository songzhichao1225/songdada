import React from 'react';
import './stadiums.css';
import 'antd/dist/antd.css';
import { getVenueInformation, VenueInformationSave,getVenueIssecondaudit } from '../../api';
import { Modal, Upload, Input, Icon, message, Checkbox, Button, Popconfirm,Radio } from 'antd';

const { TextArea } = Input;
const plainOptions = [
  { label: '篮球', value: '4' },
  { label: '足球', value: '5' },
  { label: '台球', value: '3' },
  { label: '羽毛球', value: '1' },
  { label: '排球', value: '6' },
  { label: '网球', value: '7' },
  { label: '乒乓球', value: '2' },
  { label: '高尔夫球', value: '8' }
];

const options = [{ label: 'WiFi', value: '1' }, { label: '停车场', value: '2' }, { label: '淋浴', value: '3' }]


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能使用JPG/PNG格式！');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能超过2MB!');
  }
  return isJpgOrPng && isLt2M;
}





class stadiums extends React.Component {

  state = {
    informationList: [],
    fileList: [],
    name: '',
    handleAddress: '',
    contacts: '',
    contactNumber: '',
    addtelephone: '',//新增电话
    adddress: '',//场馆位置
    imageUrl: '',
    sport: '',
    facilities: '',
    siteInfo: '',
    comment: '',
    flag: true,
    numRadio:1,
    issecondaudit:1,
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    let imgS = (res.data.data.filesURL).split('|')
    let arrImg = []
    for (let i in imgS) {
      arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
    }
    this.setState({
      informationList: res.data.data, name: res.data.data.name, handleAddress: res.data.data.address,
      contacts: res.data.data.linkMan, contactNumber: res.data.data.telephone, adddress: res.data.data.position, imageUrl: res.data.data.firstURL,
      fileList: arrImg, sport: res.data.data.sport.split(''), facilities: res.data.data.facilities.split(''), siteInfo: res.data.data.siteInfo, comment: res.data.data.comment
    })
  }
  componentDidMount() {
    this.getVenueInformation()
    this.getVenueIssecondaudit()
  }

  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data,sessionStorage.getItem('venue_token'))
      console.log(res)
      this.setState({issecondaudit:res.data.data.issecondaudit})
  }


  


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response)
      this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }


    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  routerMap = () => {
    this.props.history.push({ pathname: '/map' })
  }



  handleName = e => {
    this.setState({ name: e.target.value })
  }
  handleAddress = e => {
    this.setState({ handleAddress: e.target.value })
  }
  contacts = e => {
    this.setState({ contacts: e.target.value })
  }
  contactNumber = e => {
    this.setState({ contactNumber: e.target.value })
  }
  addtelephone = e => {
    this.setState({ addtelephone: e.target.value })
  }

  handleChangeT = ({ fileList }) => this.setState({ fileList });

  onChangeCheck = e => {
    this.setState({ sport: e })
  }
  onChangeSite = e => {
    this.setState({ facilities: e })
  }
  onChangeText = e => {
    this.setState({ siteInfo: e.target.value })
  }
  onChangeTextTwo = e => {
    this.setState({ comment: e.target.value })
  }


  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('修改成功')
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }

  confirm = () => {
   
      let { informationList, name, handleAddress, contacts, contactNumber, fileList, adddress, imageUrl, sport, facilities, siteInfo, comment } = this.state
      let filesURLarr = []
      for (let i in fileList) {
        if (fileList[i].response !== undefined) {
          filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
        } else if (fileList[i].response === undefined) {
          filesURLarr.push(fileList[i].url)
        }
      }
      let data = {
        venuename: name,
        lat: informationList.lat,
        lng: informationList.lng,
        address: handleAddress,
        linkMan: contacts,
        telephone: contactNumber,
        firstURL: imageUrl,
        filesURL: filesURLarr.join('|'),
        facilities: facilities.join('|'),
        sport: sport.join('|'),
        siteInfo: siteInfo,
        position: adddress,
        comment: comment,
        type: 2
      }
      this.VenueInformationSave(data)
   
   
  }
  basic = () => {
    this.setState({ flag: true })
  }
  qualification = () => {
    this.setState({ flag: false })
  }

  numRadio=e=>{
    this.setState({numRadio:e.target.value})
  }


  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">门脸照</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButtonT = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">场地照</div>
      </div>
    );
    return (
      <div className="stadiums">
        <div className="navTap">
          <div className={this.state.flag === true ? 'background' : 'div'} onClick={this.basic}>基本信息</div>
          <div className={this.state.flag === true? 'div' : 'background'} style={sessionStorage.getItem('ismethod')==='1'?{display:'block'}:{display:'none'}} onClick={this.qualification}>场馆资质</div>
        </div>
        <div className="xiange"></div>


        <div className={this.state.flag === true ? 'information' : 'none'}>
          <div className="name">
            <span className="boTitle">推广员:</span>
            <span className="nameINput" style={{ lineHeight: '38px' }}>{this.state.informationList.promote}</span>
          </div>
          <div className="name">
            <span className="boTitle">场馆名称:</span>
            <Input className="nameINput" value={this.state.name} onInput={this.handleName} />
          </div>
          <div className="name">
            <span className="boTitle">场馆位置:</span>
            <Input className="nameINput" value={this.state.adddress} />
            {/* <Input className="nameINput" value={this.props.location.query !== undefined ? this.props.location.query.adddress : this.state.adddress}  /> */}
            {/* <img onClick={this.routerMap} className="dingImg" src={require("../../assets/icon_pc_dingwei.png")} alt="" /> */}
          </div>
          <div className="name">
            <span className="boTitle">详细地址:</span>
            <Input className="nameINput" onChange={this.handleAddress} value={this.state.handleAddress} />
          </div>
          <div className="name">
            <span className="boTitle">联系人:</span>
            <Input className="nameINput" value={this.state.contacts} onInput={this.contacts} />
          </div>
          <div className="name">
            <span className="boTitle">联系电话:</span>
            <Input className="nameINput" maxLength={11} value={this.state.contactNumber} onInput={this.contactNumber} />
          </div>
        
          <div className="name">
            <span className="boTitle">门脸照:</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader addImg"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>

          <div className="name">
            <span className="boTitle">场地照片:</span>
            <div className="clearfix">
              <Upload
                name="files"
                action="/api/UploadVenueImgs?type=Venue"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChangeT}
                headers={'http://venue.tiaozhanmeiyitian.com'}
              >
                {fileList.length >= 8 ? null : uploadButtonT}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </div>

          <div className="name">
            <span className="boTitle">运动项目:</span><span className="kong"></span>
            <Checkbox.Group options={plainOptions} value={this.state.sport} onChange={this.onChangeCheck} /><br /><span className="kong"></span>
          </div>

          <div className="name">
            <span className="boTitle">场地设施:</span><span className="kong"></span>
            <Checkbox.Group options={options} value={this.state.facilities} onChange={this.onChangeSite} />
          </div>

          <div className="name">
            <span className="boTitle">场地介绍:</span><span className="kong"></span>
            <TextArea className="textarea" value={this.state.siteInfo} placeholder="请输入场地介绍，如场地规模、特色等。" onChange={this.onChangeText} rows={3} />
          </div>
          <div className="name">
            <span className="boTitle">其他:</span><span className="kong"></span>
            <TextArea className="textarea" value={this.state.comment} placeholder="请输入场地其他介绍，如比赛、特色等。" onChange={this.onChangeTextTwo} rows={2} />
          </div>


          <Popconfirm
            title="您确定本次修改吗?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
            <Button className="submit" style={this.state.issecondaudit===1?{display:'block'}:{display:'none'}}>提交修改</Button>
          </Popconfirm>
          <Button className="submit"  style={this.state.issecondaudit===1?{display:'none'}:{display:'block'}}>审核中~</Button>
        </div>



        <div className={this.state.flag === true ? 'none' : 'qualification'}>
          <div className="listing">
            <span>营业执照:</span>
            <span>通过|长期</span>
            <span>修改</span>
          </div>

          <div className="listing">
            <span>身份证:</span>
            <span>9845645645968456</span>
            <span>修改</span>
          </div>

          <div className="listing">
            <span>法人姓名:</span>
            <Input className="listingInput" />
          </div>
          <div className="listing">
            <span>法人身份证号:</span>
            <Input className="listingInput" />
          </div>

          <div className="listing">
            <span>法人手机号:</span>
            <Input className="listingInput" />
          </div>

          <div className="listing">
            <span>结算账号:</span>
            <Radio.Group className="accountNum" onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司银行账号</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>

          <div className="listing">
            <span>银行卡号:</span>
            <Input className="listingInput" />
          </div>

          <div className="listing">
            <span>开户行:</span>
            <Input className="listingInput" />
          </div>

           <div className="submitListing">提交修改</div>









        </div>

      </div >
    );
  }
}

export default stadiums;
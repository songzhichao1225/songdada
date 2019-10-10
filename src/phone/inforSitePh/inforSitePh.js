import React from 'react';
import './inforSitePh.css';
import { Input, message, Checkbox, Upload, Icon } from 'antd';
import { getVenueInformation,getVenueQualificationInformation } from '../../api';



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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

class inforSitePh extends React.Component {

  state = {
    flag: 1,
    listSon: [],
    imageUrl: '',
    sport: '',
    facilities: '',
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ listSon: res.data.data, sport: res.data.data.sport.split(''), facilities: res.data.data.facilities.split(''), imageUrl: res.data.data.firstURL })
    } else {
      message.error(res.data.msg)
    }
  }
 
  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, sessionStorage.getItem('venue_token'))
   if (res.data.code === 2000) {
     console.log(res.data.data)
    } else {
      message.error(res.data.msg)
    }
  }

  componentDidMount() {
    this.getVenueInformation()
    this.getVenueQualificationInformation()
  }
  left = () => {
    this.setState({ flag: 1 })
  }
  right = () => {
    this.setState({ flag: 2 })
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({ imageRes: info.file.response.data.baseURL + info.file.response.data.filesURL })
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      )
    }
  }
  render() {
    let { listSon } = this.state
    const options = [
      { label: '羽毛球',value: '1'},
      { label: '乒乓球',value: '2'},
      { label: '台球', value: '3' },
      { label: '篮球', value: '4' },
      { label: '足球', value: '5' },
      { label: '排球', value: '6' },
      { label: '网球', value: '7' },
      { label: '高尔夫', value:'8'}
    ]
    const optionsTwo = [{ label: 'WiFi', value: '1' }, { label: '停车场', value: '2' }, { label: '淋浴', value: '3' }]

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">门脸照</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="inforSitePh">
        <div className="headTitle">场馆信息设置</div>
        <div className="nav">
          <div className="left" style={this.state.flag === 1 ? { color: '#000' } : {}} onClick={this.left}>基本信息</div>
          <div className="right" style={this.state.flag === 1 ? {} : { color: '#000' }} onClick={this.right}>资质信息</div>
        </div>
        <div className="basic" style={this.state.flag === 1 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>推广员</span>
            <span className="right" style={{ paddingLeft: '11px' }}>{listSon.promote}</span>
          </div>
          
          <div className="listSon">
            <span>场馆名称</span>
            <Input className="right" value={listSon.name} />
          </div>
          
          <div className="listSon">
            <span>场馆位置</span>
            <Input className="right" value={listSon.position} />
          </div>
          
          <div className="listSon">
            <span>详细地址</span>
            <Input className="right" value={listSon.address} />
          </div>

          <div className="listSon">
            <span>联系人</span>
            <Input className="right" value={listSon.linkMan} />
          </div>
          <div className="listSon">
            <span>联系电话</span>
            <Input className="right" value={listSon.telephone} />
          </div>
          <div className="listSon">
            <span>门脸照</span>
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
          <div className="listSon">
            <span>场地照片</span>
            
          </div>
          <div className="listSon">
            <span>场地设施</span>
            <div className="rightLi">
              <Checkbox.Group options={optionsTwo} value={this.state.facilities} onChange={this.onChange} />
            </div>
          </div>
          
          <div className="listSon">
            <span>运动项目</span>
            <div className="rightLi">
              <Checkbox.Group options={options} value={this.state.sport} onChange={this.onChange} />
            </div>
          </div>

          <div className="listSon">
            <span>场馆介绍</span>
            <Input className="right" value={listSon.siteInfo} />
          </div>

          <div className="listSon">
            <span>其他</span>
            <Input className="right" value={listSon.comment} />
          </div>

          <div className="siteSubmit">提交</div>

        </div>

        <div className="qualification" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>营业执照</span>
            <span className="right">长期</span>
          </div>

          <div className="listSon">
            <span>身份证</span>
            <Input className="right" />
          </div>
          <div className="listSon">
            <span>法人姓名</span>
            <Input className="right" />
          </div>

          <div className="listSon">
            <span>法人身份证号</span>
            <Input className="right" />
          </div>

          <div className="listSon">
            <span>法人手机号</span>
            <Input className="right"/>
          </div>

          <div className="listSon">
            <span>结算账号</span>
            <Input className="right"/>
          </div>





        </div>




      </div>
    );
  }
}

export default inforSitePh;
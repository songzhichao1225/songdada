import React from 'react';
import './inforSitePh.css';
import { Input, message, Checkbox, Upload, Icon,Popconfirm,Button,Radio,Select,Tooltip,Spin } from 'antd';
import { getVenueInformation,getVenueQualificationInformation,VenueInformationSave,VenueQualificationInformationSave,getVenueIssecondaudit,getVenueOpenBank,getVenueOpenBankList,getVenueOpenBankProvince, getVenueOpenBankCity } from '../../api';
const {Option}=Select


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

function getBase64T(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class inforSitePh extends React.Component {

  state = {
    flag: 1,
    issecondaudit:1,
   
    //场馆信息 参数
    listSon: [],
    imageUrl: '',
    cgName:'',
    address:'',
    linkMan:'',
    telephone:'',
    fileList: [],
    facilities: [],
    sport:[],
    siteInfo:'',
    comment:'',
    //资质信息 参数
    imageUrlTwo:'',
    imageUrlThree:'',
    corporateName:'',
    corporateId:'',
    corporatePhone:'',
    numRadio:1,
    corporateCardId:'',
    flagOne: true,
    flagTwo: true,
    flagThree: true,
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList:[],//获取的银行
    upData:true,
    corporateOpen:'',
    zuo:0,
    imgHoodTwo:'',
    imgHood:'',
    spin:true
  };

  async getVenueInformation(data) {
    const res = await getVenueInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {

      let imgS = (res.data.data.filesURL).split('|')
      let arrImg = []
      for (let i in imgS) {
        arrImg.push({ uid: -i, name: 'image.png', status: 'done', url: imgS[i] })
      }
      if(this.props.history.location.query!==undefined){
        this.setState({ listSon: res.data.data, sport: res.data.data.sport.split(''), facilities: res.data.data.facilities.split(''), imageUrl: res.data.data.firstURL,
        cgName:res.data.data.name,address:this.props.history.location.query.adddress,linkMan:res.data.data.linkMan,telephone:res.data.data.telephone,siteInfo:res.data.data.siteInfo,
        fileList: arrImg,comment:res.data.data.comment, lat:this.props.history.location.query.lat,lng:this.props.history.location.query.lng,position:this.props.history.location.query.adddress,spin:false
      })
     }else{
      this.setState({ listSon: res.data.data, sport: res.data.data.sport.split(''), facilities: res.data.data.facilities.split(''), imageUrl: res.data.data.firstURL,
      cgName:res.data.data.name,address:res.data.data.address,linkMan:res.data.data.linkMan,telephone:res.data.data.telephone,siteInfo:res.data.data.siteInfo,
      fileList: arrImg,comment:res.data.data.comment,lat:res.data.data.lat,lng:res.data.data.lng,position:res.data.data.position,spin:false
    })
     }
     
    } else {
      message.error(res.data.msg)
    }
  }
 
 
  async getVenueIssecondaudit(data) {
    const res = await getVenueIssecondaudit(data,localStorage.getItem('venue_token'))
      this.setState({issecondaudit:parseInt(res.data.data.issecondaudit)})
  }

  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data,localStorage.getItem('venue_token'))
      if(res.data.code===2000){
        let corporate=res.data.data
        let cardImg=corporate.legalFilesURL.replace('|',',').split(',')
       
         this.setState({imageUrlTwo:corporate.legalBaseURL+'/'+cardImg[0],imageUrlThree:corporate.legalBaseURL+'/'+cardImg[1],
         baseImg:corporate.legalBaseURL,
         imgFile:cardImg[0],imgFileTwo:cardImg[1],
          corporateName:corporate.legalname,corporateId:corporate.legalcard,corporatePhone:corporate.legalphone,
          numRadio:corporate.Settlement,corporateCardId:corporate.Bankaccount,corporateOpen:corporate.OpeningBank,lisenceURL:corporate.lisenceURL})
      }
  }


  componentDidMount() {
    this.getVenueInformation()
    this.getVenueQualificationInformation()
    this.getVenueIssecondaudit()
    this.getVenueOpenBankProvince()
    this.getVenueOpenBank()
    

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


  //场馆信息修改获取
  cgName=e=>{
    this.setState({cgName:e.target.value})
  }
  address=e=>{
    this.setState({address:e.target.value})
  }
  linkMan=e=>{
    this.setState({linkMan:e.target.value})
  }
  telephone=e=>{
    this.setState({telephone:e.target.value})
  }
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64T(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  handleChangeT = ({ fileList }) => this.setState({ fileList });

  onChangeSite = e => {
    this.setState({ facilities: e })
  }

  onChangeCheck = e => {
    this.setState({ sport: e })
  }
  siteInfo=e=>{
    this.setState({siteInfo:e.target.value})
  }
  comment=e=>{
    this.setState({comment:e.target.value})
  }

  async VenueInformationSave(data) {
    const res = await VenueInformationSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('提交成功')
        this.setState({issecondaudit:0})
      this.getVenueInformation()
    } else {
      message.error(res.data.msg)
    }
  }

  confirm = () => {
    let {cgName, address, linkMan, telephone, fileList, imageUrl, sport, facilities, siteInfo, comment,lat,lng,position } = this.state
    let filesURLarr = []
    for (let i in fileList) {
      if (fileList[i].response !== undefined) {
        filesURLarr.push(fileList[i].response.data.baseURL + fileList[i].response.data.filesURL)
      } else if (fileList[i].response === undefined) {
        filesURLarr.push(fileList[i].url)
      }
    }
    if(filesURLarr.length>=2){
      let data = {
        venuename: cgName,
        lat: lat,
        lng:lng,
        address: address,
        linkMan: linkMan,
        telephone: telephone,
        firstURL: imageUrl,
        filesURL: filesURLarr.join('|'),
        facilities: facilities.join(','),
        sport: sport.join(','),
        siteInfo: siteInfo,
        position: position,
        comment: comment,
        type: 2
      }
      this.VenueInformationSave(data)
    }else{
      message.error('至少上传两张室内照')
    }
}

// 资质信息修改 获取 
handleChangeTwo = info => {
  if (info.file.status === 'uploading') {
    this.setState({ loading: true });
    return;
  }
  if (info.file.status === 'done') {
    this.setState({ zuo:1,imageUrlTwo: info.file.response.data.baseURL + info.file.response.data.filesURL,imgHood:info.file.response.data.baseURL,loading:false,imgFile:info.file.response.data.filesURL })
  }
}

handleChangeThree = info => {
  if (info.file.status === 'uploading') {
    this.setState({ loading: true });
    return;
  }
  if (info.file.status === 'done') {
    this.setState({ zuo:1, imageUrlThree: info.file.response.data.baseURL + info.file.response.data.filesURL,imgHoodTwo:info.file.response.data.baseURL,loading:false,imgFileTwo:info.file.response.data.filesURL })
  }
}

corporateName=e=>{
  this.setState({corporateName:e.target.value})
}
corporateId=e=>{
  this.setState({corporateId:e.target.value})
}
corporatePhone=e=>{
  this.setState({corporatePhone:e.target.value})
}

numRadio=e=>{
  this.setState({numRadio:e.target.value})
}
corporateCardId=e=>{
  this.setState({corporateCardId:e.target.value})
}
async getVenueOpenBank(data) {
  const res = await getVenueOpenBank(data, localStorage.getItem('venue_token'))
  if (res.data.code === 2000) {
    this.setState({ type: res.data.data, flagOne: false })
  }
}

async getVenueOpenBankProvince(data) {
  const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
  if (res.data.code === 2000) {
    this.setState({ backProvince: res.data.data, flagTwo: false})
  }
}

async getVenueOpenBankList(data) {
  const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
  if (res.data.code === 2000) {
    this.setState({ backList: res.data.data, flagThree: false })
  }
}
async getVenueOpenBankCity(data) {
  const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
  if (res.data.code === 2000) {
    this.setState({ backCity: res.data.data, flagThree: false })
  }
}
upData=()=>{
  this.setState({upData:false})
}
typeChange = e => {
  this.setState({ bank_id: e})
}
cityChange = e => {
  this.setState({ city_id: e })
}
provinceChange = e => {
  this.setState({ province_id: e })
  this.getVenueOpenBankCity({ province_id: e })
}

handleSearch=e=>{
  this.getVenueOpenBankList({bank_id:this.state.bank_id,province_id:this.state.province_id,city_id:this.state.city_id,search_name:e})
}

corporateOpen=e=>{
  this.setState({corporateOpen:e})
}

async VenueQualificationInformationSave(data) {
  const res = await VenueQualificationInformationSave(data,localStorage.getItem('venue_token'))
  if (res.data.code === 4001) {
    this.props.history.push('/login')
    message.error('登录超时请重新登录')
  } else if(res.data.code===2000){
       message.info('提交成功')
       this.setState({issecondaudit:0})
  }else{
    message.error(res.data.msg)
  }
}

ziSubmit=()=>{
  let {zuo,imgHoodTwo,imgHood,baseImg,lisenceURL,corporateName,corporateId,corporatePhone,numRadio,corporateCardId,corporateOpen,imgFile,imgFileTwo}=this.state
  let data={
    legalname:corporateName,
    legalcard:corporateId,
    legalphone:corporatePhone,
    Settlement:numRadio,
    Bankaccount:corporateCardId,
    OpeningBank:corporateOpen,
    lisenceURL:lisenceURL,
    legalBaseURL:baseImg,
    legalFilesURL:imgFile+'|'+imgFileTwo
  }
  if(zuo===1){
    if(imgHood===''){
     message.error('请更换身份证正面照')
    }else if(imgHoodTwo===''){
      message.error('请更换身份证反面照')
    }else{
      data.legalBaseURL=imgHood
      this.VenueQualificationInformationSave(data)
    }
  }else{
    this.VenueQualificationInformationSave(data)
  }
}
reture=()=>{
  this.props.history.replace('/homePh/minePh')
}

mapPh=(e)=>{
  this.props.history.push('/mapPh')
  sessionStorage.setItem('inforMap',e.currentTarget.dataset.position)
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
        <Icon type={this.state.loading ? 'loading' : 'upload'} />
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}></div>
      </div>
    );
    const { imageUrl,fileList,imageUrlTwo,imageUrlThree} = this.state;
    const uploadButtonT = (
      <div>
        <Icon type="upload"/>
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}></div>
      </div>
    )
    const uploadButtonTwo = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'upload'} />
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}>正面照</div>
      </div>
    );
    const uploadButtonThree = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'upload'} />
        <div className="ant-upload-text" style={{fontSize:'0.75rem'}}>反面照</div>
      </div>
    );
    return (
      <div className="inforSitePh">
        <div className="nav">
          <Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%',fontSize:'1rem'}}/>
          <div className={localStorage.getItem('ismethod')==='1'?'left':'width'} style={this.state.flag === 1 ? {color: '#000'} : {}}  onClick={this.left}>基本信息</div>
          <div className={localStorage.getItem('ismethod')==='1'?'right':'none'} style={this.state.flag === 1 ?  {} : { color: '#000' }}  onClick={this.right}>资质信息</div>
        </div> 
        <div className="basic" style={this.state.spin===false&&this.state.flag === 1 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>推广员</span>
            <span className="right" style={{ paddingLeft: '11px' }}>{listSon.promote}</span>
          </div>
          <div className="listSon">
            <span>场馆名称</span>
            <Input className="right" value={this.state.cgName}  onChange={this.cgName}/>
          </div>
          <div className="listSon" onClick={this.mapPh}  data-position={listSon.position}>
            <span>场馆位置</span>
            <Input className="right" value={this.state.position}  disabled={true}/>
          </div>
          <div className="listSon">
            <span>详细地址</span>
            <Input className="right" value={this.state.address} onChange={this.address}/>
          </div>

          <div className="listSon">
            <span>联系人</span>
            <Input className="right" value={this.state.linkMan} placeholder='联系人姓名'  onChange={this.linkMan}/>
          </div>
          <div className="listSon">
            <span>联系电话</span>
            <Input className="right" value={this.state.telephone} placeholder="联系人电话" onChange={this.telephone}/>
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
              accept="image/*"
              multiple={false}
            >
              {imageUrl ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div className="listSon">
            <span>场地照片</span>
              <Upload
                name="files"
                action="/api/UploadVenueImgs?type=Venue"
                listType="picture-card"
                fileList={fileList}
                className="addImg" 
                onPreview={this.handlePreview}
                onChange={this.handleChangeT}
                accept="image/*"
                multiple={false}
              >
                {fileList.length >= 8 ? null : uploadButtonT}
                 
              </Upload>
          </div>
          <div className="listSon">
            <span>场地设施</span>
            <div className="rightLi">
              <Checkbox.Group options={optionsTwo} value={this.state.facilities} onChange={this.onChangeSite} />
            </div>
          </div>
          
          <div className="listSon">
            <span>运动项目</span>
            <div className="rightLi">
              <Checkbox.Group options={options} value={this.state.sport} onChange={this.onChangeCheck} /> 
            </div>
          </div>
          
          <div className="listSon">
            <span>场馆介绍</span>
            <Input className="right" value={this.state.siteInfo} placeholder='场馆介绍如：比赛等'  onChange={this.siteInfo} />
          </div>
          
          <div className="listSon">
            <span>其他</span>
            <Input className="right" value={this.state.comment} placeholder="利于场馆的信息"  onChange={this.comment}/>
          </div>
          <Popconfirm
            title="您确定本次修改吗?"
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
             <Button className="submit" style={this.state.issecondaudit!==0?{display:'block'}:{display:'none'}}>提交修改</Button>
          </Popconfirm>
          <Button className="submit"  style={this.state.issecondaudit===0?{display:'block'}:{display:'none'}}>审核中~</Button>
        </div>
        

        <Spin spinning={this.state.spin} style={{width:'100%',marginTop:'45%'}}/>
        <div className="qualification" style={this.state.flag === 2 ? { display: 'block' } : { display: 'none' }}>
          <div className="listSon">
            <span>营业执照</span>
            <span className="right">通过|长期</span>
          </div>
          
          <div className="listSon">
            <span>身份证</span>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader  ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeTwo}
            >
              {imageUrlTwo ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlTwo} alt="avatar" style={{ width: '100%' }} /> : uploadButtonTwo}
            </Upload>
           <div style={{clear:'both'}}></div>
            <Upload
              name="files"
              listType="picture-card"
              className="avatar-uploader  ko"
              showUploadList={false}
              action="/api/UploadVenueImgs?type=Venue"
              beforeUpload={beforeUpload}
              onChange={this.handleChangeThree}
            >
              {imageUrlThree ? <img src={'https://app.tiaozhanmeiyitian.com/' + imageUrlThree} alt="avatar" style={{ width: '100%' }} /> : uploadButtonThree}
            </Upload>
          </div>
          <div className="listSon">
            <span>法人姓名</span>
            <Input className="right" value={this.state.corporateName} onChange={this.corporateName} />
          </div>

          <div className="listSon">
            <span>法人身份证号</span>
            <Input className="right" value={this.state.corporateId} onChange={this.corporateId}/>
          </div>
          
          <div className="listSon">
            <span>法人手机号</span>
            <Input className="right" value={this.state.corporatePhone} onChange={this.corporatePhone}/>
          </div>
          <div className="listSon">
            <span>结算账号:</span>
            <Radio.Group style={{float:'right',fontSize:'0.75rem',marginRight:'3%'}} onChange={this.numRadio} value={this.state.numRadio}>
              <Radio value={0}>公司账号</Radio>
              <Radio value={1}>法人账号</Radio>
            </Radio.Group>
          </div>
          
          <div className="listSon">
            <span>银行账号</span>
            <Input className="right" value={this.state.corporateCardId} onChange={this.corporateCardId}/>
          </div>
           
          <div className="listSon" style={this.state.upData===true?{display:'none'}:{display:'block'}}>
            <span>开户所在地</span>
            <Select placeholder="银行类型" style={{ width: '5rem', height: '35px',marginLeft:'2.2rem',display:'inline-block', }} loading={this.state.flagOne} onChange={this.typeChange}>
                  {
                    this.state.type.map((item, i) => (
                      <Option key={i} value={item.bank_id}>{item.bank_name}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在省" style={{ width: '5rem', height: '35px', marginLeft: '0.2rem',display:'inline-block' }} loading={this.state.flagTwo} onChange={this.provinceChange}>
                  {
                    this.state.backProvince.map((item, i) => (
                      <Option key={i} value={item.province_id}>{item.province}</Option>
                    ))
                  }
                </Select>
                <Select placeholder="所在市" style={{ width: '5rem', height: '35px', marginLeft: '0.2rem',display:'inline-block' }} loading={this.state.flagThree} onChange={this.cityChange}>
                  {
                    this.state.backCity.map((item, i) => (
                      <Option key={i} value={item.city_id}>{item.city}</Option>
                    ))
                  }
                </Select>
          </div>
       
       
          <div className="listSon">
            <span>开户行</span>
            <Select
                  showSearch
                  className="right"
                  style={{height:'3rem',lineHeight:'3rem'}}
                  onSearch={this.handleSearch}
                  onChange={this.corporateOpen}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  notFoundContent={null}
                  disabled={this.state.upData}
                  value={this.state.corporateOpen}
                >
                  {
                    this.state.backList.map((item,i)=>(
                      <Option key={i} value={item.sub_branch_name} alt={item.sub_branch_name}>
                        <Tooltip title={item.sub_branch_name}>
                      <span>{item.sub_branch_name}</span>
                    </Tooltip></Option>
                    ))
                  } 
                </Select>
            <span onClick={this.upData} style={{marginLeft:'0.5rem',color:'#D85D27'}}>修改</span>
          </div>



      
          <Popconfirm
            title="您确定本次修改吗?"
            onConfirm={this.ziSubmit}
            onCancel={this.cancel}
            okText="确定"
            cancelText="返回"
          >
            <Button className="submit" style={this.state.issecondaudit!==0?{display:'block'}:{display:'none'}}>提交修改</Button>
          </Popconfirm>
          <Button className="submit"  style={this.state.issecondaudit===0?{display:'block'}:{display:'none'}}>审核中~</Button>
        </div>




      </div>
    );
  }
}

export default inforSitePh;
import React from 'react';
import './qualificationPh.css';

import { Toast, Picker, List, NavBar, Popover, Modal, ImagePicker, Checkbox } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Radio } from 'antd';
import lrz from 'lrz';
import { LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { getIsStatus, getVenueOpenBankList, getVenueOpenBank, getVenueOpenBankProvince, VenueVerifyThatAllAreFilledIn, imgUrlTwo, getVenueOpenBankCity, VenueQualifications_another, getIsSignOut, UploadVenueImgsLisenTwo, _code, UploadVenueImgsLisen, getVenueQualified, TemporaryQualificationInformation_another, getVenueQualificationInformation, VenueQualificationInformationSave_another, getVenueQualifiedCompany } from '../../api';
const alert = Modal.alert;
const prompt = Modal.prompt;
const Item = Popover.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const {Search}=Input




class qualificationPh extends React.Component {

  state = {
    place: '请上传手持身份证正反面照片',
    imageResOne: '',//营业执照
    imageReT: '',//身份证正面
    imageReST: '',//反面
    radioChange: 1,
    radioChangeTwo: 0,
    inChargeNa:'',//收款负责人姓名
    bankcorporate:'',//收款公司名称
    siteUUID: '',//场馆Id
    imageUrl: '',
    imageUrlBaseT: '',//公共路径
    faName: '',//法人姓名
    faIdcard: '',//法人身份证号
    faIdcardTwo:'',//收款负责人身份证号
    faPhone: '',//法人手机号
    cardId: '',//银行账号
    Bankphone:'',//收款通知
    type: [],//银行类型
    backProvince: [],//省
    backCity: [],//市
    bank_id: '',//类型Id
    province_id: '',//省Id
    city_id: '',//市id
    backList: [],//获取的银行
    openingLine: '',
    kaiText: '请选择银行所在地',
    flagDis: false,
    visibleTwo: false,
    src: '',
    filesThree: [],//营业执照
    filesThreeSon: '',
    filesFour: [],//身份证照
    filesFourSon: '',
    filesFive: [],
    filesFiveSon: '',
    filesSix: [],
    filesSixSon: '',//授权照
    imgMasking: '',
    masking: false,
    companyEd: true,
    individualsEd: false,
    BelongingOne: [],
    BelongingOneSon: '',
    BelongingTwo: [],
    BelongingTwoSon: '',
    BelongingThree: [],
    BelongingThreeSon: '',
    BelongingFour: [],
    BelongingFourSon: '',
    Agent: true,
    promisor: false,
    nameOne: true,
    nameTwo: false,
    nameThree: false,
    BelongingFive: [],
    BelongingFiveSon: '',
    BelongingSix: [],
    BelongingSixSon: '',
    ascrBaceUrl: '',
    legalhourBaseURL: '',
    yinhangSelect: 0,
    hand: 1,
    kolod:'',
  };


  async getVenueOpenBank(data) {
    const res = await getVenueOpenBank(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].bank_name
        k.value = res.data.data[i].bank_id
        arrType.push(k)
      }

      this.setState({ type: arrType, flag: false })
    }
  }

  async getVenueOpenBankProvince(data) {
    const res = await getVenueOpenBankProvince(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].province
        k.value = res.data.data[i].province_id
        arrType.push(k)
      }
      this.setState({ backProvince: arrType, flagTwo: false })
    }
  }



  async getVenueOpenBankCity(data) {
    const res = await getVenueOpenBankCity(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrType = []
      for (let i in res.data.data) {
        let k = {}
        k.label = res.data.data[i].city
        k.value = res.data.data[i].city_id
        arrType.push(k)
      }
      this.setState({ backCity: arrType, flagThree: false })
    }
  }



  async getVenueQualificationInformation(data) {
    const res = await getVenueQualificationInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      if (res.data.data.OpeningBank !== '') {
        this.setState({ kolod: 0 })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard,faIdcardTwo:res.data.data.Bankcard, faPhone: res.data.data.legalphone,
        radioChange: res.data.data.Settlement, radioChangeTwo: res.data.data.account,inChargeNa:res.data.data.Bankname,bankcorporate:res.data.data.Bankcorporate,Bankphone:res.data.data.Bankphone, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        BelongingFourSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
        BelongingFour: res.data.data.empowerURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.empowerURL }],
        BelongingOneSon: res.data.data.promiseURL === '' ? '' : res.data.data.promiseURL,
        BelongingOne: res.data.data.promiseURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.promiseURL }],
        ascrBaceUrl: res.data.data.ascriphourBaseURL,
        BelongingTwo: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[0] }],
        BelongingTwoSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[0],
        BelongingThree: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[1] }],
        BelongingThreeSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[1],
        legalhourBaseURL: res.data.data.legalhourBaseURL,
        BelongingFive: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[0] }],
        BelongingFiveSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[0],
        BelongingSix: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[1] }],
        BelongingSixSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[1],
        companyEd: res.data.data.ascription === 0 ? true : false,
        individualsEd: res.data.data.ascription === 1 ? true : false,
        nameOne: res.data.data.verification === 1 ? true : false,
        nameTwo: res.data.data.verification === 2 ? true : false,
        nameThree: res.data.data.verification === 3 ? true : false,
        promisor: res.data.data.personIncharge === 1 || res.data.data.personIncharge === 2 ? true : false,
        Agent: res.data.data.personIncharge === 3 ? true : false,
      })

      if (localStorage.getItem('qualifData') === null) {

        if (res.data.data.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
        }
        let data = {
          siteUUID: res.data.data.siteUid,
          lisenceURL: res.data.data.lisenceURL,
          legalBaseURL: res.data.data.legalBaseURL,
          legalFilesURL: res.data.data.legalFilesURL,
          legalname: res.data.data.legalname,
          legalcard: res.data.data.legalcard,
          legalphone: res.data.data.legalphone,
          Settlement: res.data.data.Settlement,
          Bankaccount: res.data.data.Bankaccount,
          OpeningBank: res.data.data.OpeningBank,
          CorporateName: res.data.data.CorporateName,
          Banktype: res.data.data.Banktype,
          ProvinceBank: res.data.data.ProvinceBank,
          CityBank: res.data.data.CityBank,
          empowerURL: res.data.data.empowerURL,
          promiseURL: res.data.data.promiseURL,
          ascriphourBaseURL: res.data.data.ascriphourBaseURL,
          ascriphourFilesURL: res.data.data.ascriphourFilesURL,
          legalhourBaseURL: res.data.data.legalhourBaseURL,
          legalhourFilesURL: res.data.data.legalhourFilesURL,
          ascription: res.data.data.ascription,
          personIncharge: res.data.data.personIncharge,
          verification: res.data.data.verification,
          account: res.data.data.account,
          Bankcorporate:res.data.data.Bankcorporate,
          Bankname:res.data.data.Bankname,
          Bankcard:res.data.data.Bankcard,
          Bankphone:res.data.data.Bankphone
        }
        localStorage.setItem('qualifData', JSON.stringify(data))
        let lpk = JSON.parse(localStorage.getItem('qualifData'))

        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard,faIdcardTwo:lpk.Bankcard, faPhone: lpk.legalphone,
          radioChange: lpk.Settlement, radioChangeTwo: lpk.account,inChargeNa:lpk.Bankname,bankcorporate:lpk.Bankcorporate,Bankphone:lpk.Bankphone, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: imgUrlTwo + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          BelongingFourSon: lpk.empowerURL === '' ? '' : lpk.empowerURL,
          BelongingFour: lpk.empowerURL === '' ? [] : [{ url: imgUrlTwo + lpk.empowerURL }],
          ascrBaceUrl: lpk.ascriphourBaseURL,
          BelongingOneSon: lpk.promiseURL === '' ? '' : lpk.promiseURL,
          BelongingOne: lpk.promiseURL === '' ? [] : [{ url: imgUrlTwo + lpk.promiseURL }],
          BelongingTwo: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[0] }],
          BelongingTwoSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[0],
          BelongingThree: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[1] }],
          BelongingThreeSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[1],
          legalhourBaseURL: lpk.legalhourBaseURL,
          BelongingFive: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[0] }],
          BelongingFiveSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[0],
          BelongingSix: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[1] }],
          BelongingSixSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[1],
          companyEd: lpk.ascription === 0 ? true : false,
          individualsEd: lpk.ascription === 1 ? true : false,
          nameOne: lpk.verification === 1 ? true : false,
          nameTwo: lpk.verification === 2 ? true : false,
          nameThree: lpk.verification === 3 ? true : false,
          promisor: lpk.personIncharge === 1 || lpk.personIncharge === 2 ? true : false,
          Agent: lpk.personIncharge === 3 ? true : false,
          flagDis: false
        })
      } else {
        let lpk = JSON.parse(localStorage.getItem('qualifData'))
        if (lpk.ProvinceBank !== '') {
          this.getVenueOpenBankCity({ province_id: lpk.ProvinceBank })
        }
        this.setState({
          CorporateName: lpk.CorporateName, bank_id: lpk.Banktype, province_id: lpk.ProvinceBank, city_id: lpk.CityBank,
          faName: lpk.legalname, faIdcard: lpk.legalcard,faIdcardTwo:lpk.Bankcard, faPhone: lpk.legalphone,
          radioChange: lpk.Settlement, radioChangeTwo: lpk.account,inChargeNa:lpk.Bankname,bankcorporate:lpk.Bankcorporate,Bankphone:lpk.Bankphone, cardId: lpk.Bankaccount, openingLine: lpk.OpeningBank,
          legalBaseURL: lpk.legalBaseURL,
          filesThree: lpk.lisenceURL === '' ? [] : [{ url: imgUrlTwo + lpk.lisenceURL }],
          filesThreeSon: lpk.lisenceURL === '' ? '' : lpk.lisenceURL,
          filesFourSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[0],
          filesFour: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[0] }],
          filesFiveSon: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? '' : lpk.legalFilesURL.split('|')[1],
          filesFive: lpk.legalBaseURL === '' || lpk.legalBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalBaseURL + lpk.legalFilesURL.split('|')[1] }],
          BelongingFourSon: lpk.empowerURL === '' ? '' : lpk.empowerURL,
          BelongingFour: lpk.empowerURL === '' ? [] : [{ url: imgUrlTwo + lpk.empowerURL }],
          ascrBaceUrl: lpk.ascriphourBaseURL,
          BelongingOneSon: lpk.promiseURL === '' ? '' : lpk.promiseURL,
          BelongingOne: lpk.promiseURL === '' ? [] : [{ url: imgUrlTwo + lpk.promiseURL }],
          BelongingTwo: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[0] }],
          BelongingTwoSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[0],
          BelongingThree: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.ascriphourBaseURL + lpk.ascriphourFilesURL.split('|')[1] }],
          BelongingThreeSon: lpk.ascriphourBaseURL === '' || lpk.ascriphourBaseURL === null ? '' : lpk.ascriphourFilesURL.split('|')[1],
          legalhourBaseURL: lpk.legalhourBaseURL,
          BelongingFive: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[0] }],
          BelongingFiveSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[0],
          BelongingSix: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + lpk.legalhourBaseURL + lpk.legalhourFilesURL.split('|')[1] }],
          BelongingSixSon: lpk.legalhourBaseURL === '' || lpk.legalhourBaseURL === null ? '' : lpk.legalhourFilesURL.split('|')[1],
          companyEd: lpk.ascription === 0 ? true : false,
          individualsEd: lpk.ascription === 1 ? true : false,
          nameOne: lpk.verification === 1 ? true : false,
          nameTwo: lpk.verification === 2 ? true : false,
          nameThree: lpk.verification === 3 ? true : false,
          promisor: lpk.personIncharge === 1 || lpk.personIncharge === 2 ? true : false,
          Agent: lpk.personIncharge === 3 ? true : false,
          flagDis: false
        })
      }
    }

  }


  async getIsSignOut(data) {
    const res = await getIsSignOut(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      localStorage.clear()
      Toast.fail('您的账号已在别处登录', 2)
    }
  }




  componentDidMount() {
    this.getIsStatus()
    this.getVenueOpenBank()
    this.getVenueOpenBankProvince()
    this.getVenueQualificationInformation()

    var timer = setInterval(() => {
      if (this.props.history.location.pathname.split('/')[1] !== 'qualificationPh') {
        clearInterval(timer)
      } else {
        this.getIsSignOut()
      }

    }, 3000);

  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: false });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({ loading: true });
      if (info.file.response.data.baseURL !== undefined) {
        this.setState({ imageUrl: info.file.response.data.baseURL + info.file.response.data.filesURL })
      } else {
        this.setState({ imageUrl: 1 })
      }

    }
    if (info.file.response.code === 4004) {
      Toast.fail(info.file.response.msg, 1);
    } else if (info.file.response.code === 4002) {
      Toast.fail('上传失败', 1);
    }
  }



  radioChange = e => {
    this.setState({ radioChange: e.target.value, cardId: '', bank_id: '', province_id: '', city_id: '', openingLine: '' })
  }
  radioChangeTwo = e => {
    this.setState({ radioChangeTwo: e.target.value,radioChange:e.target.value, cardId: '', bank_id: '', province_id: '', city_id: '', openingLine: '' })
  }
  inChargeNa=e=>{
    this.setState({inChargeNa:e.target.value})
  }

  bankcorporate=e=>{
    this.setState({bankcorporate:e.target.value})
  }

  async getIsStatus(data) {
    const res = await getIsStatus(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      localStorage.setItem('isqult', undefined)
      localStorage.setItem('issite', undefined)
      localStorage.setItem('islegal', undefined)
      Toast.fail('登录超时请重新登录!', 1);
    }
    this.setState({ siteUUID: res.data.data.siteUid })
  }
  faName = e => {
    this.setState({ faName: e.target.value })
  }
  faIdcard = e => {
    this.setState({ faIdcard: e.target.value })
  }
  faIdcardTwo=e=>{
    this.setState({faIdcardTwo:e.target.value})
  }
  faPhone = e => {
    this.setState({ faPhone: e.target.value })
  }
  cardId = e => {
    this.setState({ cardId: e.target.value })
  }
  Bankphone=e=>{
    this.setState({Bankphone:e.target.value})
  }

  async getVenueOpenBankList(data) {
    const res = await getVenueOpenBankList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let name = res.data.data
      let arrName = []
      for (let i in name) {
        let obj = {}
        obj.name = name[i].sub_branch_name
        obj.nameT = name[i].sub_branch_name.slice(name[i].sub_branch_name.indexOf('公司') + 2, name[i].sub_branch_name.length)
        obj.id=i
        arrName.push(obj)
      }
      this.setState({ backList: arrName, flagThree: false,yinhangSelect:1 })
    }
  }

  backListJoinInput = e => {
    this.setState({ backListJoinInput: e.target.value })
  }
  backListJoin = () => {
    let arr = this.state.backList
    let lok = {}
    lok.name = this.state.backListJoinInput
    lok.nameT = this.state.backListJoinInput
    lok.id = 1000
    arr.push(lok)
    this.setState({ backList: arr })
  }

  provinceChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ province_id: e, city_id: '', openingLine: '', backCity: [] })
      this.getVenueOpenBankCity({ province_id: e })
    } else {
      Toast.fail('请选择银行类型', 1);
      this.getVenueOpenBankCity({ province_id: e })
    }
  }

  typeChange = e => {
    if (this.state.city_id !== '') {
      this.setState({ bank_id: e, openingLine: '', backList: [] })
    } else {
      this.setState({ bank_id: e })
    }
  }

  cityChange = e => {
    if (this.state.bank_id !== '') {
      this.setState({ city_id: e, openingLine: '', kaiText: '请输入银行关键字', backList: [] })
    } else {
      this.setState({ city_id: e, kaiText: '请输入银行关键字' })
    }

  }
  handleSearch = e => {
    if (this.state.bank_id === '') {
      Toast.fail('请选择银行类型', 1.5)
    } else if (this.state.province_id === '') {
      Toast.fail('请选择银行所在省', 1.5)
    } else if (this.state.city_id === '') {
      Toast.fail('请选择银行所在市', 1.5)
    } else {
      if (typeof (this.state.bank_id) !== 'string') {
        this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
      } else {
        this.getVenueOpenBankList({ bank_id: this.state.bank_id, province_id: this.state.province_id, city_id: this.state.city_id, search_name: e })
      }
    }
  }


  selectChecked = e => {
    if (e.currentTarget.dataset.id === '1000') {
      this.setState({ openingLine: e.currentTarget.dataset.name, yinhangSelect: 0, hand: 1, kolod: e.currentTarget.dataset.id })
    } else {
      this.setState({ openingLine: e.currentTarget.dataset.name, yinhangSelect: 0, hand: 0, kolod: e.currentTarget.dataset.id })
    }
  }




  openingLine = e => {
    if (e !== this.state.openingLine) {
      this.setState({ kolod: '',yinhangSelect:0  })
      this.setState({ openingLine: e.target.value })
    }
  }

  async VenueQualifications_another(data) {
    const res = await VenueQualifications_another(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success('提交成功', 1);
    } else {
      Toast.fail(res.data.msg, 1);

    }
  }



  async VenueQualificationInformationSave_another(data) {
    const res = await VenueQualificationInformationSave_another(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.props.history.push('/resultsAuditsPh')
      Toast.success('提交成功', 1);
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }


  async VenueVerifyThatAllAreFilledIn(data) {
    const res = await VenueVerifyThatAllAreFilledIn(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let { siteUUID, filesThreeSon, legalBaseURL, CorporateName, filesFourSon, BelongingOneSon, BelongingFourSon, BelongingFiveSon, BelongingSixSon, legalhourBaseURL, filesFiveSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, faIdcard,faIdcardTwo, faName, bank_id, province_id, city_id, faPhone, radioChange, radioChangeTwo,inChargeNa,bankcorporate,Bankphone, cardId, openingLine } = this.state

      if (sessionStorage.getItem('notType') === '1') {
        let data = {
          ascription: this.state.companyEd === true ? 0 : 1,
          CorporateName: CorporateName,
          lisenceURL: filesThreeSon,
          promiseURL: this.state.companyEd === false ? BelongingOneSon : '',
          ascriphourBaseURL: this.state.companyEd === false && ascrBaceUrl !== '' ? ascrBaceUrl : '',
          ascriphourFilesURL: this.state.companyEd === false && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
          personIncharge: this.state.companyEd === true && this.state.promisor === true ? 1 : this.state.companyEd === true && this.state.promisor === false ? 3 : this.state.companyEd === false && this.state.promisor === true ? 2 : this.state.companyEd === false && this.state.promisor === false ? 3 : '',
          empowerURL: this.state.Agent === false ? '' : BelongingFourSon,
          verification: this.state.nameOne === true ? 1 : this.state.nameTwo === true ? 2 : this.state.nameThree === true ? 3 : '',
          legalname: faName,
          legalphone: faPhone,
          legalcard: this.state.nameOne === true || this.state.nameThree === true ? '' : faIdcard,
          legalhourBaseURL: this.state.nameThree === true && legalhourBaseURL !== '' ? legalhourBaseURL : '',
          legalhourFilesURL: this.state.nameThree === true && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
          Settlement: radioChange,
          account: radioChangeTwo,
          Bankname:radioChangeTwo===1?inChargeNa:radioChange===1?inChargeNa:'',
          Bankcorporate:radioChangeTwo===0&&radioChange===0?bankcorporate:'',
          legalBaseURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
          legalFilesURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
          Bankaccount: cardId,
          Bankphone:Bankphone,
          Bankcard:faIdcardTwo,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
          type: 1
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中...', 1);
        } else {
          this.VenueQualificationInformationSave_another(data)
        }
      } else {
        let data = {
          siteUUID: siteUUID,
          ascription: this.state.companyEd === true ? 0 : 1,
          CorporateName: CorporateName,
          lisenceURL: filesThreeSon,
          promiseURL: this.state.companyEd === false ? BelongingOneSon : '',
          ascriphourBaseURL: this.state.companyEd === false && ascrBaceUrl !== '' ? ascrBaceUrl : '',
          ascriphourFilesURL: this.state.companyEd === false && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
          personIncharge: this.state.companyEd === true && this.state.promisor === true ? 1 : this.state.companyEd === true && this.state.promisor === false ? 3 : this.state.companyEd === false && this.state.promisor === true ? 2 : this.state.companyEd === false && this.state.promisor === false ? 3 : '',
          empowerURL: this.state.Agent === false ? '' : BelongingFourSon,
          verification: this.state.nameOne === true ? 1 : this.state.nameTwo === true ? 2 : this.state.nameThree === true ? 3 : '',
          legalname: faName,
          legalphone: faPhone,
          legalcard: this.state.nameOne === true || this.state.nameThree === true ? '' : faIdcard,
          legalhourBaseURL: this.state.nameThree === true && legalhourBaseURL !== '' ? legalhourBaseURL : '',
          legalhourFilesURL: this.state.nameThree === true && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
          Settlement: radioChange,
          account: radioChangeTwo,
          Bankname:radioChangeTwo===1?inChargeNa:radioChange===1?inChargeNa:'',
          Bankcorporate:radioChangeTwo===0&&radioChange===0?bankcorporate:'',
          legalBaseURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
          legalFilesURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
          Bankaccount: cardId,
          Bankphone:Bankphone,
          Bankcard:faIdcardTwo,
          OpeningBank: openingLine,
          Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
          ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
          CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
        }
        if (this.state.loading === false) {
          Toast.loading('图片上传中...', 1);
        } else {
          this.VenueQualifications_another(data)
        }
      }
    } else {
      Toast.fail('请完善基本信息', 1);
      this.props.history.push('/stadiumInformationPh')
    }
  }




  submit = () => {
    this.VenueVerifyThatAllAreFilledIn()

  }


  close = () => {
    var sUserAgent = navigator.userAgent;
    var mobileAgents = ['Android', 'iPhone'];
    for (let index = 0; index < mobileAgents.length; index++) {
      if (sUserAgent.indexOf('Android') > -1) {
        window.JsAndroid.goBack();
      } else if (sUserAgent.indexOf('iPhone') > -1) {
        try {
          window.webkit.messageHandlers.getCall.postMessage('1');
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  reture = () => {

    let { siteUUID, filesThreeSon, legalBaseURL, CorporateName, filesFourSon, BelongingOneSon, filesFiveSon, faIdcard,faIdcardTwo, ascrBaceUrl, faName, BelongingTwoSon, BelongingThreeSon, BelongingFourSon, legalhourBaseURL, BelongingFiveSon, BelongingSixSon, bank_id, province_id, city_id, faPhone, radioChange, radioChangeTwo,inChargeNa,bankcorporate,Bankphone, cardId, openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      ascription: this.state.companyEd === true ? 0 : 1,
      CorporateName: CorporateName,
      lisenceURL: filesThreeSon,
      promiseURL: this.state.companyEd === false ? BelongingOneSon : '',
      ascriphourBaseURL: this.state.companyEd === false && ascrBaceUrl !== '' ? ascrBaceUrl : '',
      ascriphourFilesURL: this.state.companyEd === false && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
      personIncharge: this.state.companyEd === true && this.state.promisor === true ? 1 : this.state.companyEd === true && this.state.promisor === false ? 3 : this.state.companyEd === false && this.state.promisor === true ? 2 : this.state.companyEd === false && this.state.promisor === false ? 3 : '',
      empowerURL: this.state.Agent === false ? '' : BelongingFourSon,
      verification: this.state.nameOne === true ? 1 : this.state.nameTwo === true ? 2 : this.state.nameThree === true ? 3 : '',
      legalname: faName,
      legalphone: faPhone,
      legalcard: this.state.nameOne === true || this.state.nameThree === true ? '' : faIdcard,
      legalhourBaseURL: this.state.nameThree === true && legalhourBaseURL !== '' ? legalhourBaseURL : '',
      legalhourFilesURL: this.state.nameThree === true && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
      Settlement: radioChange,
      account: radioChangeTwo,
      Bankname:radioChangeTwo===1?inChargeNa:radioChange===1?inChargeNa:'',
      Bankcorporate:radioChangeTwo===0&&radioChange===0?bankcorporate:'',
      legalBaseURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
      legalFilesURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
      Bankaccount: cardId,
      Bankphone:Bankphone,
      Bankcard:faIdcardTwo,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
      flagDis: this.state.flagDis
    }

    localStorage.setItem('qualifData', JSON.stringify(data))
    this.props.history.push('/stadiumInformationPh')
  }

  closeWeb = () => {
    if (window.location.href.indexOf('flag=1') === -1) {
      this.props.history.push('/phone')
    } else {
      this.close()
    }
  }

  CorporateName = (e) => {
    if (this.state.flagDis === true && e.target.value === '') {
      localStorage.removeItem('qualifData')
      this.getVenueQualificationInformation()
    }
    if (e.target.value.indexOf(' ') !== -1) {
      this.setState({ CorporateName: e.target.value.slice(0, e.target.value.length - 1) })
    } else {
      this.setState({ CorporateName: e.target.value })
    }
  }



  async _code(data) {
    const res = await _code(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.lp()
    } else {
      Toast.fail(res.data.msg, 1);
      this.lp()
    }
  }
  async getVenueQualified(data) {
    const res = await getVenueQualified(data, localStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      Toast.success('获取成功', 1);
      if (res.data.data.ProvinceBank !== '') {
        this.getVenueOpenBankCity({ province_id: res.data.data.ProvinceBank })
      }
      this.setState({
        CorporateName: res.data.data.CorporateName, bank_id: res.data.data.Banktype, province_id: res.data.data.ProvinceBank, city_id: res.data.data.CityBank,
        faName: res.data.data.legalname, faIdcard: res.data.data.legalcard,faIdcardTwo:res.data.data.Bankcard, faPhone: res.data.data.legalphone,
        radioChange: res.data.data.Settlement, radioChangeTwo: res.data.data.account,inChargeNa:res.data.data.Bankname,bankcorporate:res.data.data.Bankcorporate,Bankphone:res.data.data.Bankphone, cardId: res.data.data.Bankaccount, openingLine: res.data.data.OpeningBank,
        legalBaseURL: res.data.data.legalBaseURL,
        filesThree: res.data.data.lisenceURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.lisenceURL }],
        filesThreeSon: res.data.data.lisenceURL === '' ? '' : res.data.data.lisenceURL,
        filesFourSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[0],
        filesFour: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[0] }],
        filesFiveSon: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? '' : res.data.data.legalFilesURL.split('|')[1],
        filesFive: res.data.data.legalBaseURL === '' || res.data.data.legalBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalBaseURL + res.data.data.legalFilesURL.split('|')[1] }],
        BelongingFourSon: res.data.data.empowerURL === '' ? '' : res.data.data.empowerURL,
        BelongingFour: res.data.data.empowerURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.empowerURL }],
        BelongingOneSon: res.data.data.promiseURL === '' ? '' : res.data.data.promiseURL,
        BelongingOne: res.data.data.promiseURL === '' ? [] : [{ url: imgUrlTwo + res.data.data.promiseURL }],
        ascrBaceUrl: res.data.data.ascriphourBaseURL,
        BelongingTwo: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[0] }],
        BelongingTwoSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[0],
        BelongingThree: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.ascriphourBaseURL + res.data.data.ascriphourFilesURL.split('|')[1] }],
        BelongingThreeSon: res.data.data.ascriphourBaseURL === '' || res.data.data.ascriphourBaseURL === null ? '' : res.data.data.ascriphourFilesURL.split('|')[1],
        legalhourBaseURL: res.data.data.legalhourBaseURL,
        BelongingFive: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[0] }],
        BelongingFiveSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[0],
        BelongingSix: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? [] : [{ url: imgUrlTwo + res.data.data.legalhourBaseURL + res.data.data.legalhourFilesURL.split('|')[1] }],
        BelongingSixSon: res.data.data.legalhourBaseURL === '' || res.data.data.legalhourBaseURL === null ? '' : res.data.data.legalhourFilesURL.split('|')[1],
        companyEd: res.data.data.ascription === 0 ? true : false,
        individualsEd: res.data.data.ascription === 1 ? true : false,
        nameOne: res.data.data.verification === 1 ? true : false,
        nameTwo: res.data.data.verification === 2 ? true : false,
        nameThree: res.data.data.verification === 3 ? true : false,
        promisor: res.data.data.personIncharge === 1 || res.data.data.personIncharge === 2 ? true : false,
        Agent: res.data.data.personIncharge === 3 ? true : false,
        flagDis: false
      })
    }
  }
  lok = (code) => {
    this.getVenueQualified({ CorporateName: this.state.CorporateName, code: code, phone: this.state.legePhone })
  }


  lp = () => {
    prompt('请输入验证码', '用户获取公司详细资质信息', [
      { text: '取消' },
      { text: '确定', onPress: code => this.lok(code) },
    ])
  }

  async getVenueQualifiedCompany(data) {
    const res = await getVenueQualifiedCompany(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      alert('是否获取该公司详细资质信息', '请注意查收' + res.data.data.phone + '的验证码', [
        { text: '否' },
        {
          text: '是', onPress: () => this._code({ mobile: res.data.data.phone, type: 'venuequalifiedcompany' })
        },
      ])

      this.setState({ legePhone: res.data.data.phone })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  search = () => {
    this.getVenueQualifiedCompany({ CorporateName: this.state.CorporateName })
  }




  async TemporaryQualificationInformation_another(data) {
    const res = await TemporaryQualificationInformation_another(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let { siteUUID, filesThreeSon, legalBaseURL, CorporateName, filesFourSon, ascrBaceUrl, BelongingTwoSon, BelongingThreeSon, BelongingFourSon, legalhourBaseURL, BelongingFiveSon, BelongingSixSon, BelongingOneSon, filesFiveSon, faIdcard,faIdcardTwo, faName, bank_id, province_id, city_id, faPhone, radioChange, radioChangeTwo,inChargeNa,bankcorporate, cardId, openingLine } = this.state
      let data = {
        siteUUID: siteUUID,
        ascription: this.state.companyEd === true ? 0 : 1,
        CorporateName: CorporateName,
        lisenceURL: filesThreeSon,
        promiseURL: this.state.companyEd === false ? BelongingOneSon : '',
        ascriphourBaseURL: this.state.companyEd === false && ascrBaceUrl !== '' ? ascrBaceUrl : '',
        ascriphourFilesURL: this.state.companyEd === false && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
        personIncharge: this.state.companyEd === true && this.state.promisor === true ? 1 : this.state.companyEd === true && this.state.promisor === false ? 3 : this.state.companyEd === false && this.state.promisor === true ? 2 : this.state.companyEd === false && this.state.promisor === false ? 3 : '',
        empowerURL: this.state.Agent === false ? '' : BelongingFourSon,
        verification: this.state.nameOne === true ? 1 : this.state.nameTwo === true ? 2 : this.state.nameThree === true ? 3 : '',
        legalname: faName,
        legalphone: faPhone,
        legalcard: this.state.nameOne === true || this.state.nameThree === true ? '' : faIdcard,
        legalhourBaseURL: this.state.nameThree === true && legalhourBaseURL !== '' ? legalhourBaseURL : '',
        legalhourFilesURL: this.state.nameThree === true && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
        Settlement: radioChange,
        account: radioChangeTwo,
        Bankname:radioChangeTwo===1?inChargeNa:radioChange===1?inChargeNa:'',
        Bankcorporate:radioChangeTwo===0&&radioChange===0?bankcorporate:'',
        legalBaseURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
        legalFilesURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
        Bankaccount: cardId,
        Bankcard:faIdcardTwo,
        OpeningBank: openingLine,
        Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
        ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
        CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
        flagDis: this.state.flagDis
      }

      localStorage.setItem('qualifData', JSON.stringify(data))
      this.getVenueQualificationInformation()
      Toast.success(res.data.msg, 1);
    }
  }
  save = () => {
    let { siteUUID, filesThreeSon, legalBaseURL, CorporateName, BelongingOneSon, filesFourSon, ascrBaceUrl, filesFiveSon, BelongingTwoSon, BelongingFiveSon, BelongingSixSon, BelongingThreeSon, legalhourBaseURL, BelongingFourSon,faIdcardTwo, faIdcard, faName, bank_id, province_id, city_id, faPhone, radioChange, radioChangeTwo,bankcorporate,inChargeNa, cardId, openingLine } = this.state
    let data = {
      siteUUID: siteUUID,
      ascription: this.state.companyEd === true ? 0 : 1,
      CorporateName: CorporateName,
      lisenceURL: filesThreeSon,
      promiseURL: this.state.companyEd === false ? BelongingOneSon : '',
      ascriphourBaseURL: this.state.companyEd === false && ascrBaceUrl !== '' ? ascrBaceUrl : '',
      ascriphourFilesURL: this.state.companyEd === false && ascrBaceUrl !== '' ? BelongingTwoSon + '|' + BelongingThreeSon : '',
      personIncharge: this.state.companyEd === true && this.state.promisor === true ? 1 : this.state.companyEd === true && this.state.promisor === false ? 3 : this.state.companyEd === false && this.state.promisor === true ? 2 : this.state.companyEd === false && this.state.promisor === false ? 3 : '',
      empowerURL: this.state.Agent === false ? '' : BelongingFourSon,
      verification: this.state.nameOne === true ? 1 : this.state.nameTwo === true ? 2 : this.state.nameThree === true ? 3 : '',
      legalname: faName,
      legalphone: faPhone,
      legalcard: this.state.nameOne === true || this.state.nameThree === true ? '' : faIdcard,
      legalhourBaseURL: this.state.nameThree === true && legalhourBaseURL !== '' ? legalhourBaseURL : '',
      legalhourFilesURL: this.state.nameThree === true && legalhourBaseURL !== '' ? BelongingFiveSon + '|' + BelongingSixSon : '',
      Settlement: radioChange,
      account: radioChangeTwo,
      Bankname:radioChangeTwo===1?inChargeNa:radioChange===1?inChargeNa:'',
      Bankcorporate:radioChangeTwo===0&&radioChange===0?bankcorporate:'',
      legalBaseURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : legalBaseURL,
      legalFilesURL: radioChange === 0 && radioChangeTwo === 0 ? '' : filesFourSon === '' ? '' : filesFourSon + '|' + filesFiveSon,
      Bankaccount: cardId,
      Bankcard:faIdcardTwo,
      OpeningBank: openingLine,
      Banktype: typeof (bank_id) !== 'string' ? bank_id.join() : bank_id,
      ProvinceBank: typeof (province_id) !== 'string' ? province_id.join() : province_id,
      CityBank: typeof (city_id) !== 'string' ? city_id.join() : city_id,
    }

    if (this.state.loading === false) {
      Toast.loading('图片上传中...', 1);
    } else {
      this.TemporaryQualificationInformation_another(data)
    }


  }

  imgScale = (e) => {
    this.setState({ visibleTwo: true, src: e.target.src })
  }
  onClose = () => {
    this.setState({ visibleTwo: false })
  }
  modLine = () => {
    if (this.state.bank_id === '') {
      Toast.fail('请选择银行类型', 1);
    } else if (this.state.province_id === '') {
      Toast.fail('请选择银行所在省', 1);
    } else if (this.state.city_id === '') {
      Toast.fail('请选择银行所在市', 1);
    }
  }




  async UploadVenueImgsLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ filesThreeSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesThree: [], loading: true })
    } else {
      this.setState({ filesThree: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeOne = (files, type, index) => {
    this.setState({ filesThree: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesThreeSon: '' })
    }
  }

  async UploadVenueImgsLisenSix(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ filesSixSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesSix: [], loading: true })
    } else {
      this.setState({ filesSix: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeSix = (files, type, index) => {
    this.setState({ filesSix: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenSix(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesSixSon: '' })
    }
  }


  async UploadVenueImgsLisenTwo(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ filesFourSon: res.data.data.filesURL, legalBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesFour: [], loading: true })
    } else {
      this.setState({ filesFour: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  handleChangeTwo = (files, type, index) => {
    this.setState({ filesFour: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwo(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFourSon: '', filesFiveSon: '', filesFive: [] })
    }
  }

  async UploadVenueImgsLisenTwoT(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ filesFiveSon: res.data.data.filesURL, legalBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ filesFive: [], loading: true })
    } else {
      this.setState({ filesFive: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }


  handleChangeThree = (files, type, index) => {
    this.setState({ filesFive: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.UploadVenueImgsLisenTwoT(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ filesFiveSon: '', filesFourSon: '', filesFour: [] })
    }
  }

  previewing = (files, index) => {
    if (this.state.loading === false) {
      Toast.loading('图片上传中', 1)
    } else {
      this.setState({ imgMasking: index[files].url, masking: true })
    }
  }
  maskingF = () => {
    this.setState({ masking: false })
  }

  company = e => {
    if (e.target.checked === false) {
      this.setState({ radioChangeTwo: 1,radioChange:1 })
    }
    this.setState({ companyEd: e.target.checked, individualsEd: false })
  }
  individuals = e => {
    this.setState({ individualsEd: e.target.checked, companyEd: false, radioChangeTwo: 1,radioChange:1 })
  }


  async BelongingOneLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingOneSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingOne: [], loading: true })
    } else {
      this.setState({ BelongingOne: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingOne = (files, type, index) => {
    this.setState({ BelongingOne: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingOneLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingOneSon: '' })
    }
  }

  async BelongingTwoLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingTwoSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingTwo: [], loading: true })
    } else {
      this.setState({ BelongingTwo: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingTwo = (files, type, index) => {
    this.setState({ BelongingTwo: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingTwoLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingTwoSon: '', BelongingThree: [], BelongingThreeSon: '', ascrBaceUrl: '' })
    }
  }


  async BelongingThreeLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingThreeSon: res.data.data.filesURL, ascrBaceUrl: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingThree: [], loading: true })
    } else {
      this.setState({ BelongingThree: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingThree = (files, type, index) => {
    this.setState({ BelongingThree: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingThreeLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingThreeSon: '', BelongingTwo: [], BelongingTwoSon: '', ascrBaceUrl: '' })
    }
  }


  async BelongingFourLisen(data) {
    const res = await UploadVenueImgsLisen(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFourSon: res.data.data.baseURL + res.data.data.filesURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingFour: [], loading: true })
    } else {
      this.setState({ BelongingFour: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingFour = (files, type, index) => {
    this.setState({ BelongingFour: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingFourLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFourSon: '' })
    }
  }

  Agent = e => {
    this.setState({ Agent: e.target.checked, promisor: false })
  }
  promisor = e => {
    this.setState({ promisor: e.target.checked, Agent: false })
  }
  nameOne = e => {
    this.setState({ nameOne: e.target.checked, nameTwo: false, nameThree: false, })
  }
  nameTwo = e => {
    this.setState({ nameTwo: e.target.checked, nameOne: false, nameThree: false })
  }
  nameThree = e => {
    this.setState({ nameThree: e.target.checked, nameOne: false, nameTwo: false })
  }

  async BelongingFiveLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingFiveSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingFive: [], loading: true })
    } else {
      this.setState({ BelongingFive: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingFive = (files, type, index) => {
    this.setState({ BelongingFive: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingFiveLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingFiveSon: '', BelongingSix: [], BelongingSixSon: '', legalhourBaseURL: '' })
    }
  }


  async BelongingSixLisen(data) {
    const res = await UploadVenueImgsLisenTwo(data)
    if (res.data.code === 2000) {
      this.setState({ BelongingSixSon: res.data.data.filesURL, legalhourBaseURL: res.data.data.baseURL, loading: true })
    } else if (res.data.code === 4004) {
      Toast.fail('图片违规请重新上传', 2)
      this.setState({ BelongingSix: [], loading: true })
    } else {
      this.setState({ BelongingSix: [], loading: true })
      Toast.fail(res.data.msg, 2)
    }
  }

  BelongingSix = (files, type, index) => {
    this.setState({ BelongingSix: files })
    if (type === 'add') {
      if (files[0].file.size / 1024 / 1024 < 9) {
        lrz(files[0].url, { quality: 0.5 })
          .then((rst) => {
            this.setState({ loading: false })
            let formdata1 = new FormData();
            formdata1.append('files', rst.file);
            this.BelongingSixLisen(formdata1)
          })
      } else {
        Toast.fail('图片超过9M无法上传', 2)
      }
    } else if (type === 'remove') {
      this.setState({ BelongingSixSon: '', BelongingFive: [], BelongingFiveSon: '', legalhourBaseURL: '' })
    }
  }



  render() {

    const { filesThree, filesFour, filesFive, BelongingOne, BelongingTwo, BelongingThree, BelongingFour, BelongingFive, BelongingSix } = this.state;
    return (
      <div className="qualificationPh">
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
        ><span style={{ fontSize: '1rem' }}>完善资质信息</span></NavBar>
        <div className="boss">
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>场馆归属证明</div>
          <div className="input">
            <CheckboxItem onChange={this.company} checked={this.state.companyEd} style={{ float: 'left', currentColor: '#D85D27' }} multipleLine>
              公司
            </CheckboxItem>
            <CheckboxItem onChange={this.individuals} checked={this.state.individualsEd} style={{ float: 'left', marginLeft: '1rem' }} multipleLine>
              个人
            </CheckboxItem>

          </div>


          <div style={this.state.companyEd === true ? {} : { display: 'none' }}>
            <div className="input">
              <span>公司名称</span>
              <span className="lkpoji" style={{ float: 'right', color: '#fff' }} onTouchStart={this.search}>查询</span>
              <Input className="select" onChange={this.CorporateName} style={{ width: '55%', float: 'right' }} value={this.state.CorporateName} placeholder="查询已录入公司资质信息" />
            </div>
            <div className="input" style={{ padding: '0.4rem 0' }}>
              <span style={{ lineHeight: '2rem', paddingRight: '0.5rem' }}>营业执照</span>
              <ImagePicker
                files={filesThree}
                style={{ float: 'right', width: '72%' }}
                onChange={this.handleChangeOne}
                onImageClick={this.previewing}
                selectable={filesThree.length < 1}
                length={3}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>
          </div>
          <div style={this.state.individualsEd === true ? {} : { display: 'none' }}>
            <div className="input">
              <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem' }}>承诺书照</span>
              <ImagePicker
                files={BelongingOne}
                style={{ float: 'left', width: '28%', marginLeft: '1.9rem' }}
                onChange={this.BelongingOne}
                onImageClick={this.previewing}
                selectable={BelongingOne.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>

            <div className="input">
              <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem' }}>手持身份证照</span>
              <ImagePicker
                files={BelongingTwo}
                style={{ float: 'left', width: '28%', marginLeft: '0.2rem' }}
                onChange={this.BelongingTwo}
                onImageClick={this.previewing}
                selectable={BelongingTwo.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={BelongingThree}
                style={{ float: 'left', width: '28%' }}
                onChange={this.BelongingThree}
                onImageClick={this.previewing}
                selectable={BelongingThree.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>

          </div>




          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>场馆负责人</div>
          <div className="input" style={{ borderBottom: 'none' }}>
            <CheckboxItem onChange={this.promisor} checked={this.state.promisor} style={{ float: 'left', currentColor: '#D85D27' }} multipleLine>
              {this.state.companyEd === false ? '承诺人本人' : '法人'}
            </CheckboxItem>
            <CheckboxItem onChange={this.Agent} checked={this.state.Agent} style={{ float: 'left', marginLeft: '1rem' }} multipleLine>
              代理人
            </CheckboxItem>
          </div>
          <div className="input" style={this.state.Agent === false ? { display: 'none' } : { padding: '0.4rem 0' }}>
            <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem' }}>授权书照</span>
            <ImagePicker
              files={BelongingFour}
              style={{ float: 'left', width: '28%', marginLeft: '1.9rem' }}
              onChange={this.BelongingFour}
              onImageClick={this.previewing}
              selectable={BelongingFour.length < 1}
              length={1}
              multiple={false}
              disableDelete={this.state.flagDis}
            />
          </div>


          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', paddingLeft: '2.5%' }}>负责人验证方式</div>

          <div className="input" style={{ borderBottom: 'none' }}>
            <CheckboxItem onChange={this.nameOne} checked={this.state.nameOne} style={{ float: 'left', currentColor: '#D85D27' }} multipleLine>
              姓名、手机号
            </CheckboxItem>
            <CheckboxItem onChange={this.nameTwo} checked={this.state.nameTwo} style={{ float: 'left', marginLeft: '1rem' }} multipleLine>
              姓名、手机号、身份证号
            </CheckboxItem>
            <CheckboxItem onChange={this.nameThree} checked={this.state.nameThree} style={{ float: 'left' }} multipleLine>
              姓名、手机号、手持身份证照
            </CheckboxItem>
          </div>
          <div style={this.state.nameOne === true ? {} : { display: 'none' }}>
            <div className="input">
              <span>姓名</span>
              <Input className="select" disabled={this.state.flagDis} onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
            </div>
            <div className="input">
              <span>手机号</span>
              <Input className="select" disabled={this.state.flagDis} maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
            </div>
          </div>

          <div style={this.state.nameTwo === true ? {} : { display: 'none' }}>
            <div className="input">
              <span>姓名</span>
              <Input className="select" disabled={this.state.flagDis} onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
            </div>
            <div className="input">
              <span>手机号</span>
              <Input className="select" disabled={this.state.flagDis} maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
            </div>
            <div className="input">
              <span>身份证号</span>
              <Input className="select" disabled={this.state.flagDis} onChange={this.faIdcard} value={this.state.faIdcard} placeholder="请输入身份证号" />
            </div>
          </div>

          <div style={this.state.nameThree === true ? {} : { display: 'none' }}>
            <div className="input">
              <span>姓名</span>
              <Input className="select" disabled={this.state.flagDis} onChange={this.faName} value={this.state.faName} placeholder="请输入姓名" />
            </div>
            <div className="input">
              <span>手机号</span>
              <Input className="select" disabled={this.state.flagDis} maxLength={11} onChange={this.faPhone} value={this.state.faPhone} placeholder="请输入11位手机号码" />
            </div>
            <div className="input">
              <span style={{ lineHeight: '1.5rem', paddingRight: '0.5rem' }}>身份证照</span>
              <ImagePicker
                files={BelongingFive}
                style={{ float: 'left', width: '28%', marginLeft: '1.9rem' }}
                onChange={this.BelongingFive}
                onImageClick={this.previewing}
                selectable={BelongingFive.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
              <ImagePicker
                files={BelongingSix}
                style={{ float: 'left', width: '28%' }}
                onChange={this.BelongingSix}
                onImageClick={this.previewing}
                selectable={BelongingSix.length < 1}
                length={1}
                multiple={false}
                disableDelete={this.state.flagDis}
              />
            </div>


          </div>







          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', float: 'left', padding: '2rem 0 0.5rem 2.5%' }}>场馆收款银行信息<span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#9B9B9B' }}>(也可在提现前填写)</span></div>


          <div className="input" style={{ borderTop: '0.06rem solid #f3f3f3' }}>
            <span style={{ lineHeight: '3rem' }}>结算账号</span>
            <Radio.Group className="radio" onChange={this.radioChangeTwo} disabled={this.state.flagDis} value={this.state.radioChangeTwo}>
              <Radio style={this.state.companyEd === false ? { display: 'none' } : {}} value={0}>场馆归属人</Radio>
              <Radio value={1}>场馆负责人</Radio>
            </Radio.Group>
          </div>


          <div className="input" style={this.state.radioChangeTwo===1?{display:'none'}:{ borderTop: '0.06rem solid #f3f3f3' }}>
            <span style={{ lineHeight: '3rem' }}>归属性质</span>
            <Radio.Group className="radio" onChange={this.radioChange} disabled={this.state.flagDis} value={this.state.radioChange}>
              <Radio value={0}>公司</Radio>
              <Radio value={1}>个人</Radio>
            </Radio.Group>
          </div>

          <div className="input" style={this.state.radioChange === 1 ? { display: 'none' } : {}}>
            <span>公司名称</span>
            <Input className="select" style={{ width: '68%', float: 'right', paddingLeft: '4.5%' }} disabled={this.state.flagDis} onChange={this.bankcorporate} value={this.state.bankcorporate} maxLength={18} placeholder="请输入公司名称" />
          </div>

          <div className="input" style={this.state.radioChange === 0 ? { display: 'none' } : {}}>
            <span>负责人姓名</span>
            <Input className="select" style={{ width: '68%', float: 'right', paddingLeft: '4.5%' }} disabled={this.state.flagDis} onChange={this.inChargeNa} value={this.state.inChargeNa} maxLength={18} placeholder="请输入负责人姓名" />
          </div>

          <div className="input" style={this.state.radioChange === 0 ? { display: 'none' } : {}}>
            <span>负责人身份证号</span>
            <Input className="select" style={{ width: '59%', float: 'left', }} disabled={this.state.flagDis} onChange={this.faIdcardTwo} value={this.state.faIdcardTwo} maxLength={18} placeholder="请输入身份证号" />
          </div>

          <div className="input" style={this.state.radioChange === 0 ? { display: 'none' } : {}}  >
            <span style={{ lineHeight: '2rem' }}>负责人身份证<br />(正面照)</span>
            <ImagePicker
              files={filesFour}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeTwo}
              onImageClick={this.previewing}
              selectable={filesFour.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />

          </div>

          <div className="input" style={this.state.radioChange === 0 ? { display: 'none' } : {}}  >
            <span style={{ lineHeight: '2rem' }}>负责人身份证<br />(反面照)</span>
            <ImagePicker
              files={filesFive}
              style={{ float: 'right', width: '72%' }}
              onChange={this.handleChangeThree}
              onImageClick={this.previewing}
              selectable={filesFive.length < 1}
              length={3}
              multiple={false}
              disableDelete={this.state.flagDis}
            />

          </div>
 

          <div className="input">
            <span>银行卡号</span>
            <Input className="select"  style={{ paddingLeft: '4.5%' }} disabled={this.state.flagDis} onChange={this.cardId} value={this.state.cardId} placeholder="请输入银行卡号" />
          </div>

          <div className="input">
            <span>短信通知</span>
            <Input className="select"  style={{ paddingLeft: '4.5%' }} disabled={this.state.flagDis} onChange={this.Bankphone} value={this.state.Bankphone} placeholder="请输入通知汇款成功手机号" />
          </div>

          <div className="input">
            <Picker data={this.state.type} cols={1} onChange={this.typeChange} disabled={this.state.flagDis} value={[Number(this.state.bank_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>银行类型</List.Item>
            </Picker>
          </div>   

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backProvince} cols={1} onChange={this.provinceChange} indicatorStyle={{ color: '#c0c0c0' }} disabled={this.state.flagDis} value={[Number(this.state.province_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在省</List.Item>
            </Picker>

          </div>

          <div className="input" style={{ marginTop: '0.2rem' }}>
            <Picker data={this.state.backCity} cols={1} onChange={this.cityChange} disabled={this.state.flagDis} value={[Number(this.state.city_id)]} className="forss">
              <List.Item arrow="horizontal" style={{ borderBottom: 'none' }}>开户所在市</List.Item>
            </Picker>
          </div>




          <div className="input">
            <span>开户行</span>
            <Search placeholder="请输入支行名称" value={this.state.openingLine === '' ? null : this.state.openingLine} onChange={this.openingLine} onSearch={this.handleSearch} style={{ width: '68%',float:'right', height: '2.8rem', paddingLeft: '0', border: 'none',fontSize:'0.75rem' }} />
            <div className="yinhangSelectTwo" style={this.state.yinhangSelect === 0 ? { display: 'none' } : { display: 'block' }}>
              <div style={{ height: '110px', overflowY: 'auto' }}>
                <div style={this.state.backList.length === 0 ? { textAlign: 'center', marginBottom: '30px' } : { display: 'none' }}>未找到该支行名称</div>
                {
                  this.state.backList.map((item, i) => (
                    <div key={i} style={{paddingLeft:'10px'}} onClick={this.selectChecked} data-name={item.name} data-id={item.id}>{item.nameT}</div>
                  ))
                }
              </div>
              <div style={this.state.backList.length < 10 ? {} : { display: 'none' }}>
                <Input placeholder="手动添加支行" style={{ width: '60%',height:'36px',border:'0.06rem solid #f5f5f5' }} onChange={this.backListJoinInput} />
                <span className="pJoin" onClick={this.backListJoin}>+添加</span><span></span>
              </div>
            </div>




            {/* <Select
              showSearch
              style={{ width: '68%', height: '2.9rem', float: 'right', background: '#fff', fontSize: '0.75rem' }}
              onSearch={this.handleSearch}
              onChange={this.openingLine}
              onFocus={this.modLine}
              defaultActiveFirstOption={false}
              showArrow={false}
              notFoundContent={null}
              placeholder='请选择开户行'
              disabled={this.state.flagDis}
              value={this.state.openingLine === '' ? null : this.state.openingLine}
            >
              {
                this.state.backList.map((item, i) => (
                  <Option key={i} value={item.name} alt={item.name}>
                    <span style={{ fontSize: '0.75rem' }}>{item.nameT}</span>
                  </Option>
                ))
              }
            </Select> */}
          </div>





          <div className="footerBtn">
            <div style={this.state.flagDis === true ? { width: '49.5%' } : {}} onTouchStart={this.reture}>上一步</div>
            <div style={this.state.flagDis === true ? { display: 'none' } : {}} onTouchStart={this.save}>保存</div>
            <div style={this.state.flagDis === true ? { width: '49.5%' } : {}} onTouchStart={this.submit}>提交</div>
          </div>



          <Modal
            visible={this.state.visibleTwo}
            transparent
            maskClosable={true}
            onClose={this.onClose}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}

          >
            <img style={{ width: '100%' }} src={this.state.src} alt="img" />
          </Modal>
        </div>


        <div className={this.state.masking === true ? 'masking' : 'hidden'} onClick={this.maskingF}>
          <img src={this.state.imgMasking} alt="img" />
        </div>

      </div>
    );
  }
}

export default qualificationPh;
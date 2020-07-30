import React from 'react';
import './minePh.css';

import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Drawer, Input, Pagination } from 'antd';
import { VenueFeedback, getVenueHelpCenter } from '../../api';

const { TextArea } = Input



class minePh extends React.Component {

  state = {
    visible: false,
    fanKui: false,
    TextArea: '',
    TextAreaLen: 0,
    help: false,
    helpList: [],
    other: 0,
    page: 1,
  }

  componentDidMount() {

  }

  myWalletPh = () => {
    this.props.history.push('/homePh/myWalletPh')
  }

  sittingPh = () => {
    this.props.history.push('/homePh/sittingPh')
  }

  inforSitePh = () => {
    this.props.history.push('/homePh/inforSitePh')
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      fanKui: false,
      help: false,
      page: 1,
    });
  };

  fanKui = () => {
    this.setState({ fanKui: true })
  }

  TextArea = e => {
    this.setState({ TextArea: e.target.value, TextAreaLen: e.target.value.length })
  }


  async VenueFeedback(data) {
    const res = await VenueFeedback(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.setState({ fanKui: false })
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }
  submit = () => {
    this.VenueFeedback({ comment: this.state.TextArea })
  }

  async getVenueHelpCenter(data) {
    const res = await getVenueHelpCenter(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ helpList: res.data.data, other: res.data.other })
    }
  }

  help = () => {
    this.getVenueHelpCenter()
    this.setState({ help: true })
  }
  current = (page, pageSize) => {
    this.getVenueHelpCenter({ page: page })
    this.setState({ page: page })
  }

  render() {
    return (
      <div className="minePh">
        <div className="headerbanner">
          <div className="headContent">
            <div className="avatar">
            <img  src={localStorage.getItem('avatar')} alt='头像' />
            </div>
            
            <div className="right">
              <span>{localStorage.getItem('name')}</span>
              <span>场地履约率{localStorage.getItem('lyv')}%</span>
            </div>
          </div>
        </div>



        <ul className="mineList">
          <li onClick={this.inforSitePh}>
            <svg width="16px" height="16px" style={{ float: 'left', marginTop: '0.75rem' }} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="合作场馆" stroke="none"  fill="none">
                <g id="53-|-我的" transform="translate(-13.000000, -196.000000)" fill="#D85D27">
                  <g id="编组2" transform="translate(1.000000, 178.000000)">
                    <g id="编组-3" transform="translate(12.000000, 0.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/场馆信息" transform="translate(0.000000, 2.000000)">
                            <path d="M5.21975805,8.39521429 C5.41057411,9.74445561 6.58263481,10.7938507 8,10.7938507 C9.41736519,10.7938507 10.5894525,9.75809104 10.7802419,8.39521429 L14.4190896,8.39521429 L14.4190896,7.59115029 L10.7802419,7.59115029 C10.5894525,6.24190896 9.41739183,5.19251383 8,5.19251383 C6.58260817,5.19251383 5.41057411,6.22827353 5.21975805,7.59115029 L1.56730161,7.59115029 L1.56730161,8.39521429 L5.21975805,8.39521429 Z M3.0528173,0 L12.9471827,0 C14.2146381,0 15.236789,1.02212428 15.236789,2.28960632 L15.236789,13.7103937 C15.236789,14.9778491 14.2146647,16 12.9471827,16 L3.0528173,16 C1.78536189,16 0.763210983,14.9778491 0.763210983,13.7103937 L0.763210983,2.28960632 C0.763210983,1.02215091 1.78533526,0 3.0528173,0 Z M12.4156674,0.804090628 L11.6115768,0.804090628 L11.6115768,1.60818126 C11.6115768,1.82624154 11.4344228,2.00339554 11.2163625,2.00339554 L4.78366412,2.00339554 C4.56560384,2.00339554 4.3884232,1.82624154 4.3884232,1.60818126 L4.3884232,0.804090628 L3.58433258,0.804090628 L3.58433258,1.60818126 C3.58433258,2.27597089 4.12948328,2.80748617 4.78366412,2.80748617 L11.2163625,2.80748617 C11.8841521,2.80748617 12.4156674,2.27597089 12.4156674,1.60818126 L12.4156674,0.804090628 Z M12.4156674,15.1822739 L12.4156674,14.3918187 C12.4156674,13.7240025 11.8705167,13.1924872 11.2163625,13.1924872 L4.78366412,13.1924872 C4.11584785,13.1924872 3.58433258,13.7240025 3.58433258,14.3918187 L3.58433258,15.1959094 L4.3884232,15.1959094 L4.3884232,14.3918187 C4.3884232,14.1737585 4.56560384,13.9966045 4.78363749,13.9966045 L11.2163625,13.9966045 C11.4344228,13.9966045 11.6115768,14.1737585 11.6115768,14.3918187 L11.6115768,15.1959094 L12.4156674,15.1959094 L12.4156674,15.1822739 Z M8,9.98978675 C6.8960898,9.98978675 5.99660446,9.09027477 5.99660446,7.98636457 C5.99660446,6.88245438 6.8960898,5.98296903 8,5.98296903 C9.1039102,5.98296903 10.0034222,6.88245438 10.0034222,7.98636457 C10.0034222,9.09027477 9.1039102,9.98978675 8,9.98978675 Z" id="icon_合作场馆_我的_场馆信息"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span>场馆信息</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.myWalletPh}>
            <svg width="16px" height="16px" style={{float:'left',marginTop:'1rem'}} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="合作场馆" stroke="none"  fill="none">
                <g id="53-|-我的" transform="translate(-13.000000, -249.000000)" fill="#F5A623">
                  <g id="编组2" transform="translate(1.000000, 178.000000)">
                    <g id="编组-3" transform="translate(12.000000, 53.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/我的钱包" transform="translate(0.000000, 2.000000)">
                            <path d="M14.2185129,3.80910228 L2.48821448,3.80910228 C2.48821448,3.80910228 1.60050529,3.62920013 1.60050529,3.09252572 L14.3984813,1.83523201 L14.3984813,0.762893884 C14.3984813,0.762893884 14.2407562,-0.219493165 12.8010092,0.0453066366 L1.42154797,2.01715554 C1.42154797,2.01715554 -1.10933485e-12,2.19705769 -1.10933485e-12,3.99001512 L-1.10933485e-12,14.2080533 C-1.10933485e-12,15.1985258 0.795702883,16 1.77845155,16 L14.2225571,16 C15.2042947,16 16,15.1985258 16,14.2080533 L16,5.60104903 C16.001124,4.61525348 15.2046592,3.81411133 14.2185129,3.80910228 L14.2185129,3.80910228 Z M13.1548796,11.1608342 C12.4653378,11.1608342 11.9112778,10.5978819 11.9112778,9.90556183 C11.9112778,9.21324174 12.4663489,8.6492788 13.1548796,8.6492788 C13.8423992,8.6492788 14.3984813,9.21223105 14.3984813,9.90556183 C14.3984813,10.5988926 13.8413881,11.1608342 13.1548796,11.1608342 L13.1548796,11.1608342 Z" id="icon_合作场馆_我的_我的钱包"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span>场馆钱包</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li>
            <svg width="14px" height="16px" viewBox="0 0 14 16" style={{ float: 'left', marginTop: '1rem' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="合作场馆" stroke="none"  fill="none">
                <g id="53-|-我的" transform="translate(-14.000000, -367.000000)" fill="#D85D27">
                  <g id="2" transform="translate(1.000000, 349.000000)">
                    <g id="编组-3" transform="translate(12.000000, 0.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/用户协议" transform="translate(0.000000, 2.000000)">
                            <path d="M13.382817,0.00383612659 L2.60343081,0.00383612659 C1.85390891,0.0162274399 1.24929056,0.620845797 1.23689924,1.3703677 L1.23689924,14.5863492 C1.23689924,15.3449006 1.84498476,15.9633998 2.60343081,15.9760423 L10.2467429,15.9760423 C11.4409082,15.9760423 12.5861636,15.501662 13.4305659,14.6572596 C14.2749683,13.8128572 14.7493486,12.6676019 14.7493486,11.4734366 L14.7493486,1.3703677 C14.7369573,0.620845797 14.1323389,0.0162274399 13.382817,0.00383612659 L13.382817,0.00383612659 Z M8.7227128,9.40279388 L3.96069775,9.40279388 C3.75862109,9.40274674 3.59483057,9.23891802 3.59483057,9.03684135 C3.59483057,8.83476468 3.75862109,8.67093596 3.96069775,8.67088882 L8.7227128,8.67088882 C8.85347537,8.67085834 8.97431802,8.74060182 9.03970811,8.85384045 C9.1050982,8.96707908 9.1050982,9.10660362 9.03970811,9.21984225 C8.97431802,9.33308088 8.85347537,9.40282437 8.7227128,9.40279388 Z M12.0116532,6.84575855 L3.96069775,6.84575855 C3.75862109,6.84571141 3.59483057,6.68188269 3.59483057,6.47980602 C3.59483057,6.27772935 3.75862109,6.11390063 3.96069775,6.11385349 L12.0116532,6.11385349 C12.1424157,6.11382301 12.2632584,6.18356649 12.3286485,6.29680512 C12.3940386,6.41004375 12.3940386,6.54956829 12.3286485,6.66280692 C12.2632584,6.77604555 12.1424157,6.84578904 12.0116532,6.84575855 L12.0116532,6.84575855 Z M12.0116532,4.28872323 L3.96069775,4.28872323 C3.75858775,4.28872323 3.59474522,4.1248807 3.59474522,3.9227707 C3.59474522,3.7206607 3.75858775,3.55681817 3.96069775,3.55681817 L12.0116532,3.55681817 C12.2137632,3.55681817 12.3776057,3.7206607 12.3776057,3.9227707 C12.3776057,4.1248807 12.2137632,4.28872323 12.0116532,4.28872323 Z" id="icon_合作场馆_我的_用户协议"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span>用户协议</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.showDrawer}>
            <svg width="16px" height="16px" viewBox="0 0 16 16" style={{ float: "left", marginTop: '1rem' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/关于我们</title>
              <desc>Created with Sketch.</desc>
              <g id="icon/合作场馆/我的/关于我们" stroke="none" fill="none" >
                <path d="M7.98406388,0 C3.57687825,0 3.19375e-05,3.56886228 3.19375e-05,7.97604791 C3.19375e-05,12.3832335 3.57687825,15.9520958 7.98406388,15.9520958 C12.3912495,15.9520958 15.9680958,12.3832335 15.9680958,7.97604791 C15.9680958,3.56886228 12.3992335,0 7.98406388,0 Z M9.5649022,12.2954092 C9.17368464,12.4550898 8.86230739,12.5748503 8.63077045,12.6546906 C8.39923353,12.7345309 8.12777644,12.7824351 7.82438323,12.7824351 C7.35332534,12.7824351 6.98605988,12.6626746 6.72258683,12.4231537 C6.45911378,12.1836327 6.33136927,11.8802395 6.33136927,11.512974 C6.33136927,11.3692615 6.3393533,11.2255489 6.36330539,11.0738523 C6.37927345,10.9221557 6.41120958,10.754491 6.45911377,10.5708583 L6.94613972,8.78243513 C6.98605988,8.61477045 7.02598003,8.44710578 7.05791617,8.29540919 C7.0898523,8.14371258 7.10582036,8 7.10582036,7.87225548 C7.10582036,7.64071856 7.05791617,7.48902195 6.97009181,7.39321358 C6.88226747,7.30538923 6.70661877,7.25748503 6.45112973,7.25748503 C6.32338522,7.25748503 6.19564072,7.27345309 6.05991217,7.32135728 C5.93216766,7.36127744 5.81240719,7.40119759 5.7165988,7.44111777 L5.84434331,6.89021956 C6.16370459,6.75449102 6.4670978,6.64271458 6.76250698,6.54690619 C7.04194811,6.46706588 7.32138922,6.41916167 7.57687825,6.41916167 C8.04793614,6.41916167 8.40721758,6.53892216 8.66270659,6.77045908 C8.91819561,7.001996 9.04594013,7.31337325 9.04594013,7.68862275 C9.04594013,7.76846306 9.03795609,7.90419161 9.02198803,8.09580839 C9.00601997,8.29540919 8.97408384,8.47105789 8.92617964,8.63073852 L8.43915369,10.4111776 C8.39923353,10.5548902 8.36729741,10.7145709 8.33536128,10.8982036 C8.30342516,11.0818363 8.28745709,11.2175649 8.28745708,11.3133733 C8.28745708,11.5528942 8.33536127,11.7125748 8.43915369,11.7924152 C8.54294611,11.8802395 8.71859481,11.9201597 8.9660998,11.9201597 C9.08586028,11.9201597 9.21360478,11.8962076 9.36530139,11.8562874 C9.516998,11.8163673 9.62079041,11.7764471 9.6926467,11.744511 L9.5649022,12.2954092 L9.5649022,12.2954092 Z M9.47707784,5.06986028 C9.25352495,5.28542914 8.97408383,5.39720559 8.65472256,5.39720559 C8.33536128,5.39720559 8.0639042,5.28542914 7.83236727,5.06986028 C7.60083034,4.85429142 7.48905389,4.59081836 7.48905389,4.27944112 C7.48905389,3.96806388 7.60083034,3.70459083 7.83236727,3.48103792 C8.06390419,3.25748502 8.33536128,3.15369261 8.65472256,3.15369261 C8.97408384,3.15369261 9.24554092,3.26546906 9.47707784,3.48103792 C9.70063073,3.69660678 9.82039122,3.96806388 9.82039122,4.27944112 C9.81240719,4.59081837 9.70063073,4.85429142 9.47707784,5.06986028 L9.47707784,5.06986028 Z" id="icon_合作场馆_我的_关于我们" fill="#D85D27"></path>
              </g>
            </svg>
            <span>关于我们</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li>
            <svg width="16px" height="16px" style={{ float: 'left', marginTop: '1rem' }} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" >
              <title>icon/合作场馆/我的/客服电话</title>
              <desc>Created with Sketch.</desc>
              <g id="icon/合作场馆/我的/客服电话" stroke="none"  fill="none" >
                <path d="M14.7454448,11.8793018 C14.7454448,14.3988484 13.5856535,14.3988484 7.9866612,14.3988484 C2.38766887,14.3988484 1.2278776,14.3988484 1.2278776,11.8793018 C1.2278776,9.11979847 4.26733058,3.60079174 7.9866612,3.60079174 C11.7459846,3.60079174 14.7454448,9.11979847 14.7454448,11.8793018 Z M8.026654,4.80057581 C6.42694191,4.80057581 5.14717223,6.08034549 5.14717223,7.68005758 C5.14717223,9.27976968 6.42694191,10.5595394 8.026654,10.5595394 C9.6263661,10.5595394 10.9061358,9.27976968 10.9061358,7.68005758 C10.9061358,6.08034549 9.6263661,4.80057581 8.026654,4.80057581 L8.026654,4.80057581 Z M2.02773365,6.92019434 C3.18752492,5.04053262 5.22715784,3.0008997 8.026654,3.0008997 C10.8261502,3.0008997 12.9457687,5.20050383 13.9455888,6.92019434 C14.4654952,7.76004319 15.4253224,7.68005758 15.8652433,6.92019434 C16.1052001,6.3602951 16.9450489,1.60115162 7.9866612,1.60115162 C-1.05171213,1.60115162 -0.13187768,6.52026631 0.188064739,6.92019434 C0.747963972,7.76004319 1.82776964,7.32012236 2.02773365,6.92019434 Z" id="icon_合作场馆_我的_客服电话" fill="#6FB2FF"></path>
              </g>
            </svg>
            <span ><a href="tel:18567837551" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>客服电话(010-80895077)</a></span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.help}>
            <svg width="16px" height="16px" style={{ float: 'left', marginTop: '1rem' }} viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="合作场馆" stroke="none"  fill="none" >
                <g id="53-|-我的" transform="translate(-13.000000, -526.000000)" fill="#6FB2FF">
                  <g id="2" transform="translate(1.000000, 349.000000)">
                    <g id="编组-3" transform="translate(12.000000, 159.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/帮助中心" transform="translate(0.000000, 2.000000)">
                            <path d="M15.2000816,8.79999175 L13.5999881,8.79999175 C13.0476744,8.79999175 12.7999047,8.54003522 12.7999047,7.99998167 C12.7999047,7.45989148 13.0476744,7.19997159 13.5999881,7.19997159 L15.2000816,7.19997159 C15.7522853,7.19997159 16,7.45989148 16,7.99998167 C16,8.54003522 15.7522853,8.79999175 15.2000816,8.79999175 Z M12.9497577,4.3652449 C12.5592823,4.74712538 11.9259852,4.74712538 11.5355098,4.3652449 C11.1449061,3.98340108 11.1449061,3.36428851 11.5355098,2.98238971 L12.2425879,2.29098044 C12.6331916,1.90920992 13.2664337,1.90920992 13.6569091,2.29098044 C14.0473113,2.67286092 14.0473113,3.29199181 13.6569091,3.67383563 L12.9497577,4.3652449 Z M9.98885542,11.451237 C9.86233163,11.6289091 9.73069484,11.798481 9.58973003,11.9494885 C9.59097621,11.9670816 9.59997435,11.9821274 9.59997435,12.0000504 L9.59997435,13.6000156 C9.59997435,14.0418226 9.24177127,14.4000623 8.79996426,14.4000623 L7.19999908,14.4000623 C6.75815543,14.4000623 6.39995235,14.0417859 6.39995235,13.6000156 L6.39995235,12.0000504 C6.39995235,11.9821274 6.40898715,11.9670816 6.41019667,11.9494885 C6.26932349,11.798481 6.13766839,11.6289274 6.01110794,11.451237 C4.81448317,10.759956 3.99999542,9.48139496 3.99999542,8.00001833 C3.99999542,5.79085503 5.79084586,4.00000459 8.00004582,4.00000459 C10.2090625,4.00000459 12.0000596,5.79085503 12.0000596,8.00001833 C12.0000596,9.48139496 11.1853886,10.759956 9.98885542,11.451237 Z M8.00004582,3.1999212 C7.44760381,3.1999212 7.19996244,2.93996467 7.19996244,2.40000276 L7.19996244,0.799945952 C7.19996244,0.259947403 7.44760381,-6.41313129e-05 8.00004582,-6.41313129e-05 C8.55217629,-6.41313129e-05 8.79989099,0.259929065 8.79989099,0.799945952 L8.79989099,2.39998444 C8.7999826,2.93996467 8.55221295,3.1999212 8.00004582,3.1999212 Z M3.05011976,4.3652449 L2.34307255,3.67383563 C1.95246883,3.29199181 1.95246883,2.67287924 2.34307255,2.29098044 C2.73363962,1.90920992 3.36675338,1.90920992 3.75739375,2.29098044 L4.46447189,2.98238971 C4.8550756,3.36427019 4.8550756,3.98340108 4.46447189,4.3652449 C4.07386817,4.74712538 3.44071776,4.74712538 3.05011976,4.3652449 Z M3.19987539,8.00001833 C3.19987539,8.54001688 2.95223402,8.79997343 2.39999359,8.79997343 L0.799955104,8.79997343 C0.247641372,8.79997343 -8.27782287e-13,8.5400169 -8.27782287e-13,8.00001833 C-8.27782287e-13,7.45989148 0.247641372,7.1999716 0.799955104,7.1999716 L2.39999359,7.1999716 C2.95223402,7.1999716 3.19987539,7.45990982 3.19987539,8.00001833 Z M7.59996749,15.2000541 L8.40001421,15.2000541 C8.62080776,15.2000541 8.79989096,15.3791006 8.79989096,15.6000591 C8.79989096,15.8209809 8.62080776,16.0000641 8.40001421,16.0000641 L7.59996749,16.0000641 C7.37904566,16.0000641 7.19996245,15.8209809 7.19996245,15.6000591 C7.19996245,15.3791006 7.37904564,15.2000541 7.59996749,15.2000541 Z" id="icon_合作场馆_我的_帮助中心"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span>帮助中心</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.fanKui}>
            <svg width="16px" height="14px" style={{ float: "left", marginTop: '1rem' }} viewBox="0 0 16 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="合作场馆" stroke="none"  fill="none">
                <g id="53-|-我的" transform="translate(-13.000000, -580.000000)" fill="#6FB2FF">
                  <g id="2" transform="translate(1.000000, 349.000000)">
                    <g id="编组-3" transform="translate(12.000000, 212.000000)">
                      <g id="表单/输入框/右箭头" transform="translate(0.000000, 16.000000)">
                        <g id="编组-2">
                          <g id="icon/合作场馆/我的/意见反馈" transform="translate(0.000000, 2.000000)">
                            <path d="M14.3132962,1.08399682 L1.59036624,1.08399682 C0.680732484,0.95660828 0,1.71894904 0,2.73407643 L0,13.1460987 C0,14.1612261 0.680732484,14.9235669 1.59036624,14.9235669 L14.3132962,14.9235669 C15.2229299,14.9235669 15.9036624,14.1612261 15.9036624,13.1460987 L15.9036624,2.73407643 C15.9036624,1.84633758 15.2229299,0.95660828 14.3132962,1.08399682 Z M14.5063694,4.48566879 L7.95183121,8.55812102 L1.39729299,4.48566879 C1.15047771,4.36226115 1.02707006,4.2388535 1.02707006,3.99203822 C1.02707006,3.62181529 1.39729299,3.25159236 1.76950637,3.25159236 C1.89291401,3.25159236 2.01632166,3.25159236 2.1397293,3.375 L7.95183121,6.83041401 L13.7639331,3.24960191 C14.1341561,3.00278662 14.5063694,3.12619427 14.7531847,3.4964172 C14.8766157,3.61982484 14.8766157,3.74323248 14.8766157,3.86664013 C14.8785828,4.11544586 14.7531847,4.36226115 14.5063694,4.48566879 Z" id="形状"></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <span>意见反馈</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
          <li onClick={this.sittingPh}>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" style={{ float: 'left', marginTop: '1rem' }} xmlns="http://www.w3.org/2000/svg">
              <title>icon/合作场馆/我的/设置</title>
              <desc>Created with Sketch.</desc>
              <g id="icon/合作场馆/我的/设置" stroke="none"  fill="none">
                <path d="M15.9400881,6.90301479 C15.876652,6.55940245 15.5418502,6.20786061 15.1920705,6.13208969 L14.9321586,6.07217779 C14.3016445,5.88615868 13.7655237,5.4672159 13.4325991,4.90037163 C13.1002208,4.33317639 13.0010349,3.65909131 13.1559471,3.02019541 L13.2378855,2.77790466 C13.3427313,2.44310289 13.2070485,1.98142889 12.9339207,1.75147295 C12.9339207,1.75147295 12.6889868,1.54706767 12,1.15411611 C11.3101322,0.763807748 11.0132159,0.654556639 11.0132159,0.654556639 C10.6784141,0.533851797 10.2070485,0.649270291 9.96211455,0.90653903 L9.78061674,1.09860951 C9.2984998,1.54901564 8.66240902,1.79803037 8.00264318,1.79464475 C7.3403465,1.79733968 6.70207172,1.54675773 6.21850221,1.09420422 L6.04229075,0.907420083 C5.80088105,0.650151359 5.32863436,0.53649497 4.99207049,0.655437706 C4.99207049,0.655437706 4.69162997,0.764688801 4.00088106,1.15499718 C3.31101323,1.55147295 3.06872248,1.7567593 3.06872246,1.75675928 C2.79559471,1.98230994 2.66079295,2.44045972 2.76475771,2.77878573 L2.84052863,3.02371964 C2.98678414,3.64045973 2.9092511,4.31006324 2.56387665,4.90213373 C2.23024954,5.47287879 1.68984408,5.89340447 1.05462555,6.07658307 L0.803524226,6.13208969 C0.459911887,6.20962273 0.120704842,6.55764035 0.0563876678,6.90301479 C0.0563876678,6.90301479 0,7.21226589 0,7.9999311 C0,8.78671525 0.0563876678,9.0968474 0.0563876678,9.0968474 C0.118061683,9.44398397 0.453744501,9.79200158 0.803524226,9.86777251 L1.0493392,9.92327912 C1.68645912,10.1061354 2.2280027,10.5286341 2.56035243,11.1021337 C2.90396477,11.6942042 2.98678414,12.367332 2.83612335,12.98231 L2.76563876,13.2210765 C2.6599119,13.5558782 2.79647576,14.0175522 3.06872246,14.2475082 C3.06872246,14.2475082 3.31453744,14.4519135 4.00264317,14.844865 C4.69339207,15.2378166 4.9894273,15.3444245 4.98942732,15.3444245 C5.32511014,15.4660104 5.79559472,15.3497108 6.0414097,15.0933232 L6.21321586,14.9100633 C6.68017621,14.4739399 7.30837005,14.2052174 8.00088106,14.2052174 C8.69251102,14.2052174 9.32511013,14.475702 9.78766519,14.9118254 L9.96035242,15.0950853 C10.2017621,15.351473 10.6740088,15.4651293 11.0114537,15.3461866 C11.0114537,15.3461866 11.3110132,15.2378166 12.0017621,14.8466271 C12.692511,14.4536756 12.9339207,14.2492703 12.9339207,14.2492703 C13.2070485,14.0228386 13.3427313,13.5620456 13.2378855,13.2228386 L13.1629956,12.9752615 C13.008774,12.339212 13.1079851,11.6681151 13.4396476,11.1038959 C13.7742553,10.5325524 14.3149486,10.1110323 14.9506608,9.92592228 L15.1955947,9.86953463 C15.5400881,9.79200158 15.8792952,9.44398397 15.9427313,9.09860951 C15.9427313,9.09860951 16,8.78847734 16,8.00169321 C15.9964758,7.21402801 15.9392071,6.90301479 15.9392071,6.90301479 L15.9400881,6.90301479 Z M8.00176211,11.152354 C6.24229075,11.152354 4.81233481,9.74266237 4.81233481,7.9999311 C4.81233481,6.26072405 6.23964758,4.85015136 8.00176211,4.85015136 C9.76211454,4.85015136 11.1929516,6.259843 11.1929516,8.00345533 C11.1885463,9.74266238 9.76211454,11.152354 8.00264318,11.152354 L8.00176211,11.152354 Z" id="icon_合作场馆_我的_设置" fill="#F5A623"></path>
              </g>
            </svg>
            <span>设置</span><img src={require("../../assets/right.png")} alt="arrow" /></li>
        </ul>
        <Drawer
          title="关于我们"
          placement="right" 
          onClose={this.onClose}
          visible={this.state.visible}>
          <span style={{ fontSize: '0.75rem', display: 'block' }}>北京甲乙电子商务有限公司，成立于2015年，位于北京市城市副中心。</span>
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '10px' }}>随着社会经济的发展，科学技术的进步，生产力水平的提高，人们逐渐从繁重的体力劳动中解放出来。随之而来的“运动量不足”、“富贵病”却又影响着人们的健康，尤其是坐办公室的上班一族。健康是1，其它都是0，只有这个1，更多的0才有意义。</span>
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '10px' }}>跑步、练器械等一个人可开展的体育运动略显枯燥，有很大一部分人无法长期坚持。羽毛球、乒乓球、台球等两个人以上才能完成的对抗性运动，有趣、易坚持但又不好找到运动对手、伙伴。初步统计，有2/3左右的人有运动需求，但因为找不到运动伙伴，运动需求得不到满足。</span>
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '10px' }}>“找对手”是北京甲乙电子商务有限公司推出的用户找运动对手、伙伴平台，通过平台的服务：1）让用户更方便地找到运动对手、伙伴；2）建立技术等级，让用户更有征服欲、成就感，运动更有趣；3）让场馆提高场馆预订率、降低场馆人员支出成本。</span>
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '10px' }}>公司的愿景：让运动更简单、更有趣！</span>
          <span style={{ fontSize: '0.75rem', display: 'block', marginTop: '10px' }}>期待志同道合的优秀人士加入到我公司，一起为这个愿景努力！</span>
        </Drawer>

        <Drawer
          title="意见反馈"
          placement="top"
          onClose={this.onClose}
          visible={this.state.fanKui}>
          <TextArea rows={3} placeholder="请输入您的反馈信息" maxLength={200} onChange={this.TextArea} /><span>{this.state.TextAreaLen}/200</span>
          <div onClick={this.submit} style={{ width: '3rem', height: '1.5rem', background: 'rgba(245,166,35,1)', fontSize: '0.8rem', color: '#fff', textAlign: 'center', float: 'right', marginTop: '0.2rem' }}>提交</div>
        </Drawer>

        <Drawer
          title="帮助中心"
          placement="right"
          onClose={this.onClose}
          visible={this.state.help}>
          {
            this.state.helpList.map((item, i) => (
              <div key={i} style={{ marginTop: '1rem' }}>
                <div style={{ color: '#F5A623' }}>{item.title}</div>
                <div style={{ marginTop: '0.5rem' }}>{item.content}</div>
              </div>
            ))
          }
          <Pagination className='fenye' defaultCurrent={1} size="small" hideOnSinglePage={true} showSizeChanger={false} current={this.state.page} onChange={this.current} total={this.state.other} />
        </Drawer>




      </div >
    )
  }
}

export default minePh;
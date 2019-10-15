import React from 'react';
import './map.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;


const { BMap } = window
class map extends React.Component {

  state = {
    mapList: [],
    position:''
  };

  componentDidMount(data) {
    if(this.props.location.query!==undefined){
    sessionStorage.setItem('hanclick',this.props.location.query.type)
    }
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.enableScrollWheelZoom(true);
    map.clearOverlays();
    var myGeo = new BMap.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(sessionStorage.getItem('handleCity'), function(point){      
        if (point) {      
            map.centerAndZoom(point, 16);      
            map.addOverlay(new BMap.Marker(point));      
        }      
     }, 
     sessionStorage.getItem('handleCity'));
    var that = this
    var option = {
      renderOptions: { map: map, panel: "results" }, onSearchComplete: function (results) {
        if (results !== undefined){
          that.setState({ mapList: results.Qq })
        }
      }
    }
    var local = new BMap.LocalSearch(map, option);
   
    if(this.state.position===''){
      local.search(sessionStorage.getItem('handleCity'));
      this.setState({
        position:sessionStorage.getItem('handleCity')
      })
    }else{
      local.search(data)
    }
  }





  handleSearch = e => {
    this.setState({position:e})
    this.componentDidMount(e)
  }

  handleClick = e => {

    let dateset = e.target.dataset
    if(sessionStorage.getItem('hanclick')==='1'){
      this.props.history.push({ pathname: '/perfect', query: { lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress } })
    }else if(sessionStorage.getItem('hanclick')==='2'){
      this.props.history.push({ pathname: '/home/stadiums', query: { lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress } })
    }
  
  }

  render() {
    let list = this.state.mapList.map((val, i) => {
      return <li key={i} onClick={this.handleClick} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}><span data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}>{val.title}</span><span data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address} >{val.address}</span></li>
    })
    return (
      <div className="mapLocationOne">
        <div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}>
        </div>
        <div className="search">
          <Search placeholder="输入您要搜索的位置" onSearch={this.handleSearch} placeholder={this.state.position} enterButton />
          <ul className="ulList">
            {
              list
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default map;
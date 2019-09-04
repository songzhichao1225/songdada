import React from 'react';
import './mapPh.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;


const { BMap } = window
class mapPh extends React.Component {

  state = {
    mapList: [],
  };

  componentDidMount(data) {

    var map = new BMap.Map("allmap"); // 创建Map实例
    map.enableScrollWheelZoom(true);
    var myGeo = new BMap.Geocoder();      
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(sessionStorage.getItem('county'), function(point){      
        if (point) {      
            map.centerAndZoom(point, 15);      
            map.addOverlay(new BMap.Marker(point));      
        }      
     }, 
     sessionStorage.getItem('county'));
    var that = this
    var option = {
      renderOptions: { map: map, panel: "results" }, onSearchComplete: function (results) {
        if (results !== undefined){
          console.log(results.Qq)
          that.setState({ mapList: results.Qq })
        }
      }
    }
    var local = new BMap.LocalSearch(map, option);
    local.search(data);
    console.log(option)
  }





  handleSearch = e => {
    this.componentDidMount(e)
  }

  handleClick = e => {
    console.log(e.target.dataset)
    let dateset = e.target.dataset
    this.props.history.push({ pathname:'/stadiumInformationPh', query: { lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress } })
  }

  render() {
    let list = this.state.mapList.map((val, i) => {
      return <li key={i} onClick={this.handleClick} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}><span data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}>{val.title}</span><span data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address} >{val.address}</span></li>
    })
    return (
      <div className="mapLocation">
        <div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}>
        </div>
        <div className="search">
          <Search placeholder="输入您要搜索的位置" onSearch={this.handleSearch} enterButton />
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

export default mapPh;
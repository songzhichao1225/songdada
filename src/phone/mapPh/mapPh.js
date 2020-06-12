import React from 'react';
import './mapPh.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import Icon from '@ant-design/icons';
const { Search } = Input;


const { BMap } = window
class mapPh extends React.Component {

  state = {
    mapList: [],
  };

  componentDidMount(data) {
    console.log(data)
    var map = new BMap.Map("allmap");
    map.enableScrollWheelZoom(true);
    var myGeo = new BMap.Geocoder();        
    myGeo.getPoint(sessionStorage.getItem('province'), function(point){      
        if (point) {      
            map.centerAndZoom(point, 15);      
            map.addOverlay(new BMap.Marker(point));      
        }      
     }, 
     sessionStorage.getItem('province'));
    var that = this
    var option = {
      renderOptions: { map: map, panel: "results" }, onSearchComplete: function (results) {
        if (results !== undefined){
          that.setState({ mapList: results.Qq })
        }
      }
    } 
    var local = new BMap.LocalSearch(map, option);
    local.search(data);
    if(sessionStorage.getItem('inforMap')!==undefined){
      local.search(sessionStorage.getItem('inforMap'));
    }
  }

  handleSearch = e => {
    this.componentDidMount(e)
  }

  handleClick = e => {
    let dateset = e.target.dataset
    let that=this
    if(sessionStorage.getItem('inforMap')!==null){
      let pt=new BMap.Point(dateset.lng,dateset.lat)
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        that.props.history.push({ pathname:'/homePh/inforSitePh', query: {title:dateset.til, lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress,province:addComp.province,city:addComp.city,district:addComp.district } })
      })
     
    }else{
      let pt=new BMap.Point(dateset.lng,dateset.lat)
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        that.props.history.push({ pathname:'/stadiumInformationPh', query: {title:dateset.til, lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress,province:addComp.province,city:addComp.city,district:addComp.district } })
      })
    }
   
  }
  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    let list = this.state.mapList.map((val, i) => {
      return <li key={i} onClick={this.handleClick} data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}><span  data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}>{val.title}</span><span  data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address} >{val.address}</span></li>
    })
    return (
      <div className="mapLocation">
          <Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'2%',zIndex:'99',fontSize:'1rem'}}/>
        <div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}>
        </div>
        <div className="search">
          <Search placeholder="输入您要搜索的位置" onSearch={this.handleSearch} enterButton />
          <ul className="ulList" style={this.state.mapList.length>0?{display:'block'}:{display:'none'}}>
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
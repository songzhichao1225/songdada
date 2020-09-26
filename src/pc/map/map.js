import React from 'react';
import './map.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;


const { BMap } = window
class map extends React.Component {

  state = {
    mapList: [],
    position: '请输入搜索内容',
    pointLng:'',
    pointLat:''
  };

 

  componentDidMount() {
    let map = new BMap.Map("allmap")
    let myGeo = new BMap.Geocoder()
    let that=this
    setTimeout(function(){
      map.setZoom(14);   
    }, 2000);  //2秒后放大到14级
    map.enableScrollWheelZoom(true);
    myGeo.getPoint("北京市", function (point) {
      if (point) {
        that.setState({pointLng:point.lng,pointLat:point.lat})
        map.centerAndZoom(new BMap.Point(point.lng,point.lat ), 13)
      
      }
    }) 
        
  
        
  }


  look=(data)=>{
   
    let map = new BMap.Map("allmap")
    let myGeo = new BMap.Geocoder()
    map.enableScrollWheelZoom(true);
    
    map.centerAndZoom(new BMap.Point(this.state.pointLng,this.state.pointLat ), 14)
    let that=this
    var option = {onSearchComplete: function(results){
        // 判断状态是否正确
        if (local.getStatus() === 0){
          var s = [];
          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            let obj={
              title:results.getPoi(i).title,
              address: results.getPoi(i).address,
              lng:results.getPoi(i).point.lng,
              lat:results.getPoi(i).point.lat
            }
            s.push(obj)
          }
          that.setState({ mapList: s })
        }else{
          that.setState({ mapList: [] })
        }
      },renderOptions:{map: map}
    };

   
    let local = new BMap.LocalSearch(map, option)
    local.search(data)
   
    map.addEventListener("click", function(e){        
      var pt = e.point;
      myGeo.getLocation(pt, function(){
        that.setState({mapList:[]})
      });        
    });


  }

  handleSearch = e => {
    this.setState({ position: e })
    this.look(e)
  }

  handleClick = e => {
    let dateset = e.target.dataset
    let that=this
    if (sessionStorage.getItem('hanclick') === '1') {
      let pt=new BMap.Point(dateset.lng,dateset.lat)
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        localStorage.setItem('handleArea',addComp.province)
        localStorage.setItem('handleCity',addComp.city)
        localStorage.setItem('handleDistrict',addComp.district)
        that.props.history.push({ pathname: '/perfect', query: {title:dateset.til, lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress,province:addComp.province,city:addComp.city,district:addComp.district } })
      }); 

    } else if (sessionStorage.getItem('hanclick') === '2') {
      let pt=new BMap.Point(dateset.lng,dateset.lat)
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(pt, function(rs){
        var addComp = rs.addressComponents;
        that.props.history.push({ pathname: '/home/stadiums', query: {title:dateset.til, lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress,province:addComp.province,city:addComp.city,district:addComp.district } })
      }); 
     
    }
  }
  
  render() {
    let list = this.state.mapList.map((val, i) => {
      return <li key={i} onClick={this.handleClick} data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address}><span data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address}>{val.title}</span><span data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address} >{val.address}</span></li>
    })
    return (
      <div className="mapLocationOne">
        <div id="allmap" style={{ position: "absolute", top: 0, left: 0, width: '100vw', height: '100vh' }}>
        </div>
        <div className="search">
          <Search onSearch={this.handleSearch} placeholder={this.state.position} enterButton/>
          <ul className="ulList">
            {
              list
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default map;
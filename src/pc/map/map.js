import React from 'react';
import './map.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const { Search } = Input;


const { BMap } = window
class map extends React.Component {

  state = {
    mapList: [],
    position: '请输入搜索内容'
  };

  componentDidMount() {

    // let map = new BMap.Map("allmap"); // 创建Map实例
    // map.enableScrollWheelZoom(true);

    // let myGeo = new BMap.Geocoder();
    // // 将地址解析结果显示在地图上，并调整地图视野    
    // myGeo.getPoint(localStorage.getItem('handleDistrict'), function (point) {
    //   if (point) {
    //     map.centerAndZoom(point, 16);
    //     var marker = new BMap.Marker(point);  // 创建标注
    //     map.addOverlay(marker);              // 将标注添加到地图中
    //     marker.addEventListener("click", () => {
    //       console.log(marker.getPosition())

    //     });
    //   }
    // },
    //   localStorage.getItem('handleDistrict'));
    // let that = this
    // let option = {
    //   renderOptions: { map: map, panel: "results" }, onSearchComplete: function (results) {
    //     if (results !== undefined) {
    //       that.setState({ mapList: results.Qq })
    //     }
    //   }
    // }
    // let local = new BMap.LocalSearch(map, option);

    // local.search(data)
     if(this.props.location.query!==undefined){
      this.setState({position:this.props.location.query.type})
        this.look(this.props.location.query.type)
     }
  
  }


  look=(data)=>{
    let map = new BMap.Map("allmap") // 创建Map实例
    map.enableScrollWheelZoom(true)
    let myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野   
    myGeo.getPoint(localStorage.getItem('handleCity'), function (point) {
      if (point) {
        map.centerAndZoom(point, 16)
        map.addEventListener("click", (e)=>{
          map.clearOverlays()
          var marker = new BMap.Marker(e.point) // 创建标注
          map.addOverlay(marker)
          var pt = marker.getPosition()
          myGeo.getLocation(pt, function (rs) {
            var addComp = rs.addressComponents
            local.search(addComp.city+addComp.district+addComp.street+addComp.streetNumber)
          })
        })
      }
    }) 

    let that = this
     let option = {
      renderOptions: { map: map, panel:"r-results" }, onSearchComplete:function (results) {
        if (results !== undefined) {
          that.setState({ mapList: results.Qq })
        }
      }
    }
    let local = new BMap.LocalSearch(map, option)
    local.search(data)



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
      return <li key={i} onClick={this.handleClick} data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}><span data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address}>{val.title}</span><span data-til={val.title} data-lat={val.point.lat} data-lng={val.point.lng} data-adress={val.address} >{val.address}</span></li>
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
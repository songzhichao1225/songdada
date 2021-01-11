import React from 'react';
import './mapPh.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
const { Search } = Input;


const { BMap } = window
class mapPh extends React.Component {

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
    myGeo.getPoint(sessionStorage.getItem('nowCity'), function (point) {
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
    if(sessionStorage.getItem('inforMap')!=='1'){
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
        sessionStorage.setItem('handleAreaTwo',addComp.province)
        sessionStorage.setItem('handleCityTwo',addComp.city)
        sessionStorage.setItem('handleDistrictTwo',addComp.district)
        that.props.history.push({ pathname:'/stadiumInformationPh', query: {title:dateset.til, lat: dateset.lat, lng: dateset.lng, adddress: dateset.adress,province:addComp.province,city:addComp.city,district:addComp.district } })
      })
    }
   
  }
  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    let list = this.state.mapList.map((val, i) => {
      return <li key={i} onClick={this.handleClick} data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address}><span data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address}>{val.title}</span><span data-til={val.title} data-lat={val.lat} data-lng={val.lng} data-adress={val.address} >{val.address}</span></li>
    })
    return (
      <div className="mapLocation">
        <LeftOutlined onClick={this.reture} style={{position:'absolute',left:'5%',top:'2%',zIndex:'99',fontSize:'1rem'}}/>
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
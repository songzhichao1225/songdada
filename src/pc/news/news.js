import React from 'react';
import './news.css';
import 'antd/dist/antd.css';
import {  } from '../../api';
import {  } from 'antd';







class news extends React.Component {

  state = {
    
  };
  
 

 
  
  

  // async nacode(data) {
  //   const res = await _code(data)
  //   console.log(res)
  // }
  


  


  
  
  render() {
    return (
      <div className="news">
        <div className="xiange"></div>
        <div className="heade"><span>所有消息</span><span>(共条，未读2条)</span><div className="button">发消息</div></div>
        <div className="xiange"></div>
        <div className="content">


          
        </div>

      </div>
    );
  }
}

export default news;
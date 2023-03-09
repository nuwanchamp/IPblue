import phone from './assets/phone.png';
import './App.css';
import styled from 'styled-components'

import React, { useState, useEffect } from 'react';
import {FaPhone} from 'react-icons/fa';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

var moment = require('moment'); 
 
const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  img{
    width: 100%;
  }
  .phone-interface{
    width: 620px;
    height: 733px;
    position: relative;
    .top-layer{
      position:absolute;
      top: 0;
      left:0;
      right: 0;
      bottom:0;
      z-index: 1;
      // background-color: red;
      .date-time {
        position: absolute;
        top: 90px;
        left: 30px;
        color: white;
      }
    .instance-id {
      position: absolute;
      top: 90px;
      left: 421px;
      color: white;
   }
    .details {
      position: absolute;
      top: 348px;
      color: #c0c1bb;
      left: 359px;
      font-weight: bold;
      padding: 10px 30px;
    }
    .details:hover{
      cursor:pointer;
      color:white;
    }

    .dial-btn {
      position: absolute;
      top: 79px;
      left: 496px;
      font-weight: bold;
      padding: 10px 30px;
      color: yellow;
    }
    .phone-icon{
      fill: blue;
    }
    .instance-details {
        position: absolute;
        top: 309px;
        color: white;
        left: 33px;
    }
  } 
   
  }
  .rodal-dialog{
    height: fit-content !important;
  }
  .table-content{
    padding: 15px 15px;
    th{
      text-align:left;
    }
  }
`;
const Loading = styled.div`
display: flex;
align-items:center;
justify-content: center;
width: 100vw;
height: 100vh;
`;

function App() {

  const [data, setData] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const toggleModel = () =>{
    setVisible(!visible);
  }


useEffect(() => {
   async  function getDataFromApi() {
      return new Promise((resolve, reject) => {
        // simulate API response delay
        setTimeout(() => {
          const data = {
            "Name" : "SEP803253077750",
            "IpAddress" :" 192.168.216.1",
            "DirNumber" :" 3000-Registered",
            "Class" :" Phone",
            "Model" :" 7",
            "Product" :" 35",
            "BoxProduct" :" 0",
            "Httpd" :" Yes",
            "RegistrationAttempts" :" 1",
            "IsCtiControllable" :" 1",
            "LoginUserId" :" ",
            "Status" :" Registered",
            "StatusReason" :" 0",
            "PerfMonObject" :" 2",
            "DChannel" :" 0",
            "Description" :" SEP803253077750",
          }
          resolve(data);
        }, 1000); // 1 second delay
      });
    }

    getDataFromApi().then((resp)=>{
      console.log(resp);
      setData(resp);
    });
  }, []);

  if (!data) {
    return <Loading><span>Loading...</span></Loading>;
  }

  return (
    <Wrapper>
      <div className='phone-interface'>
        <img src={phone} className="Phone" alt="logo" />
        <div className='top-layer'>
          <div className='date-time'>{
moment().format('DD/MM/YYYY HH:mm:ss')
}</div>
          <div className='instance-id'>{data.DirNumber.split("-")[0]}</div>
          <div className='dial-btn'>{data.DirNumber.split("-")[0]}</div>
          <div className='details' onClick={toggleModel} >Details</div>
          <div className='instance-details'> <FaPhone className='phone-icon'/>&nbsp; {data.DirNumber}</div>
        </div>
      </div>
      {visible && (
        <Rodal visible={visible} onClose={hide}>
          <div className='table-content'>
            <table>
            <tbody>
        {data.map((item, index) => (
          Object.entries(item).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
    </div>
        </Rodal>
      )}
    </Wrapper>
  );
}

export default App;

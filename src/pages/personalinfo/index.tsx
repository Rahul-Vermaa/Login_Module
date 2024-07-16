import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import request from 'superagent';
import router from 'next/router';
import { MyContext } from '@/context/provider';

export default function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    countryCode: '',
    email: ''
  });

  const {state} = React.useContext(MyContext)
  
  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}>
          </nav>
        </div>
        <div className="container my-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <p className="mb-4">   <button 
        className="btn btn-link p-0 ml-2"
        onClick={() => router.push('/Interface')}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        My account
      </button>  <IoIosArrowForward /> Personal Info </p>
            <h1>Personal Info</h1>
            <div className="mt-4">
              <p><strong>Name:</strong> {state.first_name}</p>
              <p><strong>Phone Number:</strong> {state.phone}</p>
              <p><strong>Country Code:</strong> {state.country_code}</p>
              <p><strong>Email:</strong> {state.email}</p>
            </div>
          </div>
        </div>
        <div className="Footer-section">
          <Footer />
        </div>
      </div>
    </>
  );
}

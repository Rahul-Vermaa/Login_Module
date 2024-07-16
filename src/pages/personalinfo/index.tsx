import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Footer';
import { IoIosArrowForward } from 'react-icons/io';
import { useEffect, useState } from 'react';
import request from 'superagent';
import router from 'next/router';

export default function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    countryCode: '',
    email: ''
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      let Uniqueid = router.query._id
      try {
        const response = await request.get(`https://master.project.henceforthsolutions.com:3000/users/${Uniqueid}`)
        setUserInfo(response.body.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  
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
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
              <p><strong>Country Code:</strong> {userInfo.countryCode}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
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

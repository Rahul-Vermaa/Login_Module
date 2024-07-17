import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, useContext } from 'react';
import router from 'next/router';
import { MyContext } from '@/context/provider';

export default function PersonalInfo() {
  const { state } = useContext(MyContext);

  const [formData, setFormData] = useState({
    first_name: state.first_name,
    email: state.email,
    phone: state.phone,
    country_code: state.country_code,
  });



  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
   
  };

  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}><p style={{border:'3px solid black' ,  marginTop:'17px', borderRadius:'7px' , width:'75px' , textAlign:'center' , marginLeft:'1200px'}}>{state.first_name}
          </p></nav>
        </div>
        <div className="container my-5">
          <div className="mb-4">
            <button 
              className="btn btn-link p-0 ml-2"
              onClick={() => router.push('/Interface')}
              style={{ color: 'black', textDecoration: 'none' }}
            >
              My account
            </button>
            <IoIosArrowForward /> Personal Info
          </div>
          <h1>Personal Info</h1>
          <div className="mt-4" >
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Name</h5>
                <input 
                  type="text" 
                  name="first_name" 
                  className="form-control mb-3" 
                  value={formData.first_name} 
                  onChange={handleChange} 
                />
                <button 
                  className="btn btn-danger"
                  onClick={() => handleSubmit()}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Email</h5>
                <input 
                  type="text" 
                  name="email" 
                  className="form-control mb-3" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
                <button 
                  className="btn btn-danger"
                  onClick={() => handleSubmit()}
                >
                  Save Changes
                </button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Phone</h5>
                <input 
                  type="text" 
                  name="country_code" 
                  className="form-control mb-3" 
                  value={formData.country_code} 
                  onChange={handleChange} 
                  placeholder="Country Code"
                />
                <input 
                  type="text" 
                  name="phone" 
                  className="form-control mb-3" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Phone Number"
                />
                <button 
                  className="btn btn-danger"
                  onClick={() => handleSubmit()}
                >
                  Save Changes
                </button>
              </div>
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

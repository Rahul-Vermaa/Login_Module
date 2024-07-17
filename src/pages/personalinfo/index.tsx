import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, useContext } from 'react';
import router from 'next/router';
import { MyContext } from '@/context/provider';
import superagent from 'superagent';
import Cookies from 'js-cookie';


export default function PersonalInfo() {
  const { state, setState } = useContext(MyContext);

  const [isEditing, setIsEditing] = useState<any>({
    first_name: false,
    email: false,
    phone: false,
    country_code : false 
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };


  const handleEditToggle = (field:any) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field]
  });
    if (isEditing[field]) {
      handleSubmit(field);
    }
  };


  const handleSubmit = async (field:any) => {

    const token = Cookies.get('authToken');
    try {
      const endpointMap = {
        first_name: 'https://master.project.henceforthsolutions.com:3000/profile',
        email: 'https://master.project.henceforthsolutions.com:3000/email',
        phone: 'https://master.project.henceforthsolutions.com:3000/phone',
      } as any;

      const payloadMap = {
        first_name:  state.first_name,
        email:  state.email ,
        country_code : state.country_code,
        phone: state.phone, 
     

      } as any;
      console.log(payloadMap[field],"eeeeeeeee");

      let apires = await superagent.patch(endpointMap[field]).send({[field]:payloadMap[field]}).set('Authorization', `Bearer ${token}`);
      // setState(apires.body);
      alert('Update successful');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };


  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}>
            <p
              style={{
                border: '3px solid black',
                marginTop: '17px',
                borderRadius: '7px',
                width: '75px',
                textAlign: 'center',
                marginLeft: '1200px',
              }}
            >
              {state.first_name}
            </p>
          </nav>
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
          <div className="mt-4">
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Name</h5>
                  <input
                  style={{width:'400px'}}
                    type="text"
                    name="first_name"
                    className="form-control mb-3"
                    value={state.first_name}
                    onChange={handleChange}
                    readOnly={!isEditing.first_name}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditToggle('first_name')}
                >
                  {isEditing.first_name ? 'Save' : 'Change'}
                </button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Email</h5>
                  <input
                    style={{width:'400px'}}
                    type="text"
                    name="email"
                    className="form-control mb-3"
                    value={state.email}
                    onChange={handleChange}
                    readOnly={!isEditing.email}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditToggle('email')}
                >
                  {isEditing.email ? 'Save' : 'Change'}
                </button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Phone</h5>
                  <input
                    style={{width:'400px'}}
                    type="text"
                    name="country_code"
                    className="form-control mb-3"
                    value={state.country_code}
                    onChange={handleChange}
                    readOnly={!isEditing.phone}
                    placeholder="Country Code"
                  />
                  <input
                    type="text"
                    name="phone"
                    className="form-control mb-3"
                    value={state.phone}
                    onChange={handleChange}
                    readOnly={!isEditing.phone}
                    placeholder="Phone Number"
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditToggle('phone')}
                >
                  {isEditing.phone ? 'Save' : 'Change'}
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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


 import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, useContext } from 'react';
import router from 'next/router';
import { MyContext } from '@/context/provider';
import superagent from 'superagent';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';


export default function PersonalInfo() {
  const { state, setState } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState<any>({
    first_name: false,
    email: false,
    phone: false,
    country_code:false
  });

  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };


  const handleEditToggle = (field:any) => {
    
    let arr = field.split('/');
    
    if(arr.length>1){
      setIsEditing({
        ...isEditing,
        [arr[0]]: !isEditing[arr[0]],
        [arr[1]]:!isEditing[arr[1]]
    });
      if (isEditing[arr[0]] || isEditing[arr[1]]) {
        handleSubmit(arr);
      }
    }
    else{
      setIsEditing({
        ...isEditing,
        [field]: !isEditing[field]
    });
      if (isEditing[field]) {
        handleSubmit(field);
      }
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
        phone: {
          country_code: state.country_code,
          phone: state.phone,
        },
      } as any;
       await superagent.patch(endpointMap[Array.isArray(field)?field[0]:field]).send(Array.isArray(field)? {[field[0]]:payloadMap[field[0]][field[0]],[field[1]]:payloadMap[field[0]][field[1]]} :{[field]:payloadMap[field]}).set('Authorization', Bearer ${token});
      toast('Successfully Changed');
    } catch (error:any) {
      toast(error.response.body.message);
    }
  };


  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}>
            <p
            className='text-danger py-1 px-3'
              style={{
                border: '3px solid grey',
                marginTop: '17px',
                borderRadius: '7px',
                width: '75px',
                textAlign: 'center',
                marginLeft: '1200px',
                color:'red'
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
          <Toaster
  position="top-right"
  reverseOrder={false}
/>
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
                  onClick={() => handleEditToggle('phone/country_code')}
                >
                  {(isEditing.phone || isEditing.country_code) ? 'Save' : 'Change'}
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


import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import React, { useState, useContext } from 'react';
import router from 'next/router';
import { MyContext } from '@/context/provider';
import superagent from 'superagent';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';

export default function PersonalInfo() {
  const { state, setState } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState<any>({
    first_name: false,
    email: false,
    phone: false,
    country_code: false,
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [pendingPhoneData, setPendingPhoneData] = useState<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleEditToggle = (field: any) => {
    let arr = field.split('/');
    if (arr.length > 1) {
      setIsEditing({
        ...isEditing,
        [arr[0]]: !isEditing[arr[0]],
        [arr[1]]: !isEditing[arr[1]],
      });
      if (isEditing[arr[0]] || isEditing[arr[1]]) {
        handlePhoneSave(arr);
      }
    } else {
      setIsEditing({
        ...isEditing,
        [field]: !isEditing[field],
      });
      if (isEditing[field]) {
        handleSubmit(field);
      }
    }
  };

  const handlePhoneSave = async (field: any) => {
    setPendingPhoneData({
      country_code: state.country_code,
      phone: state.phone,
    });
    setShowOtpModal(true);
  };

  const handleOtpSubmit = async () => {
    // Replace with your OTP verification endpoint
    const verifyOtpEndpoint = 'https://example.com/verify-otp';

    try {
      const token = Cookies.get('authToken');
      const response = await superagent
        .post(verifyOtpEndpoint)
        .send({ otp })
        .set('Authorization', `Bearer ${token}`);
      
      if (response.body.success) {
        await handleSubmit('phone');
        setShowOtpModal(false);
        setOtp('');
        setPendingPhoneData(null);
        toast('Phone number updated successfully');
      } else {
        toast('Invalid OTP');
      }
    } catch (error: any) {
      toast('OTP verification failed');
    }
  };

  const handleSubmit = async (field: any) => {
    const token = Cookies.get('authToken');
    try {
      const endpointMap = {
        first_name: 'https://master.project.henceforthsolutions.com:3000/profile',
        email: 'https://master.project.henceforthsolutions.com:3000/email',
        phone: 'https://master.project.henceforthsolutions.com:3000/phone',
      } as any;

      const payloadMap = {
        first_name: state.first_name,
        email: state.email,
        phone: {
          country_code: state.country_code,
          phone: state.phone,
        },
      } as any;

      await superagent
        .patch(endpointMap[Array.isArray(field) ? field[0] : field])
        .send(
          Array.isArray(field)
            ? {
                [field[0]]: payloadMap[field[0]][field[0]],
                [field[1]]: payloadMap[field[0]][field[1]],
              }
            : { [field]: payloadMap[field] }
        )
        .set('Authorization', `Bearer ${token}`);
      toast('Successfully Changed');
    } catch (error: any) {
      toast(error.response.body.message);
    }
  };

  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}>
            <p
              className="text-danger py-1 px-3"
              style={{
                border: '3px solid grey',
                marginTop: '17px',
                borderRadius: '7px',
                width: '75px',
                textAlign: 'center',
                marginLeft: '1200px',
                color: 'red',
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
          <Toaster position="top-right" reverseOrder={false} />
          <div className="mt-4">
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">Name</h5>
                  <input
                    style={{ width: '400px' }}
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
                    style={{ width: '400px' }}
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
                    style={{ width: '400px' }}
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
                  onClick={() => handleEditToggle('phone/country_code')}
                >
                  {isEditing.phone || isEditing.country_code ? 'Save' : 'Change'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer-section">
          <Footer />
        </div>
      </div>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOtpSubmit}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


2/2










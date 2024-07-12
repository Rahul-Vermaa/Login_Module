import { useState, useRef, useEffect } from 'react';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Logo from '../Logo';
import Cookies from 'js-cookie';
import { ArrowLeftOutlined } from '@ant-design/icons';
import request from 'superagent';
import toast, { Toaster } from 'react-hot-toast';

export default function OTPLogin() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef<HTMLInputElement[]>([]);

  const { countryCode, mobileNumber } = router.query;

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    const token = Cookies.get('authToken');
    try {
      const response = await request.put('https://master.project.henceforthsolutions.com:3000/verify-email')
        .send({ otp: Number(otpString), fcm_token: "alklsak" })
        .set('Authorization', `Bearer ${token}`);
        Cookies.set('authToken', response.body.access_token);
        router.push('/phoneverify');
    }  catch (error:any) {
      toast.error(error.response.body.message) 
          }
  };

  useEffect(() => {
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, []);


  return (
    <>
      <Head>
        <title>Login_Module</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DDD0DC' }}>
        <div className="card" style={{ width: '32rem', backgroundColor: 'white', padding: '20px', borderRadius: '15px', position: 'relative' }}>
          <ArrowLeftOutlined onClick={() => router.push('/Signup')} style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', top: '20px', right: '470px' }} />
         
          <div style={{ textAlign: 'center' }}>
            <Logo />
          </div>
          <h2 className="text-center mb-4">verify Email OTP</h2>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
          </div>
          <div className="form-group">
            <div className="d-flex justify-content-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-3"
                  style={{ width: '3rem', margin: '0 5px', textAlign: 'center' }}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(input) => {
                    if (input) {
                      otpInputs.current[index] = input;}}}
                />
              ))}

              
            </div>
            <div  className="d-flex align-items-center" style={{ marginTop: '10px', marginBottom:'15px' }}>
            <p className="mb-0">Don't Recieve Otp?</p>
            <button className="btn btn-link p-0 ml-2" >Resend Otp</button>
          </div>
          </div>
          <button  
            type="button"
            className="btn btn-danger"
            onClick={handleVerifyOTP}
            disabled={otp.some(digit => !digit)}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
}

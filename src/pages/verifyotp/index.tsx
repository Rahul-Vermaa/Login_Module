import { useState, useRef, useEffect } from 'react';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import Logo from '../Logo';
import request from 'superagent';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function OTPLogin() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef<HTMLInputElement[]>([]); 
const [loading , setLoading] = useState(false)

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
    try {
      setLoading(true)
      const response = await request.put('https://master.project.henceforthsolutions.com:3000/verify-otp')
        .send({ unique_id: String(router.query.uniId),
                otp: Number(otpString) })
      console.log('OTP verified successfully:', response.body);
      router.push({
        pathname: '/ResetPassword',
        query: { uniId:router?.query?.uniId},
      });
    }  catch (error:any) {
      toast.error(error.response.body.message)    
          }
          setLoading(false)
}


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
  position="top-center"
  reverseOrder={false}
/>
<Spin spinning={loading}>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DDD0DC' }}>
        <div className="card" style={{ width: '32rem', backgroundColor: 'white', padding: '20px', borderRadius: '15px' }}>
        <ArrowLeftOutlined onClick={() => router.push('/Forgotpassword')} style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', top: '20px', right: '470px' }} />

        <div style={{ textAlign: 'center' }}>
            <Logo />
          </div>
          <h2 className="text-center mb-4">OTP Verification</h2>
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
      </Spin>
    </>
  );
}

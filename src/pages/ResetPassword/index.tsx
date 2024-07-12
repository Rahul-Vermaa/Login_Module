import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../Logo";
import { useState } from "react";
import { useRouter } from "next/router";
import superagent from 'superagent';
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ForgotPassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await superagent.put('https://master.project.henceforthsolutions.com:3000/reset-password')
        .send({ unique_id: String(router.query.uniId), new_password: String(newPassword) });
      console.log('Password reset successfully:', response.body);
      router.push('/');
    } catch (error:any) {
      toast.error(error.response.body.message)    
          }
  };
 


  return (
    <>
      <Head>
        <title>Login_Module</title>
        <meta name="description" content="Reset your password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DDD0DC' }}>
        <div className="card" style={{ width: '32rem', backgroundColor: 'white', padding: '20px', borderRadius: '15px' }}>
        <ArrowLeftOutlined onClick={() => router.push('/verifyotp')} style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', top: '20px', right: '470px' }} />

          <div style={{ textAlign: 'center' }}>
            <Logo />
          </div>
          <h2 className="text-center mb-4">Change your password</h2>
          <div className="form-group">
            <input 
              type="Input" 
              className="form-control mb-3" 
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={handleForgotPassword}
          >
      Change password
          </button>
        </div>
      </div>
    </>
  );
}

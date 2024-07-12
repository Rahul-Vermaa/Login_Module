import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../Logo";
import { useState } from "react";
import { useRouter } from "next/router";
import superagent from 'superagent';
import nookies from 'nookies';
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeftOutlined } from "@ant-design/icons";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    try {
      const response = await superagent.put('https://master.project.henceforthsolutions.com:3000/forget-password')
        .send({ email });
      console.log('Reset link sent successfully:', response.body);
      nookies.set(null, 'reset_token', response.body.token, { path: '/' });
      router.push({
        pathname: '/verifyotp',
        query: { uniId: response.body.uniqueId},
      });
      router.push(`/verifyotp?uniId=${response.body.uniqueId}`);
    } catch (error:any) {
      toast.error(error.response.body.message)
       }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
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
        <ArrowLeftOutlined onClick={() => router.push('/signin')} style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', top: '20px', right: '470px' }} />
          <div style={{ textAlign: 'center' }}>
            <Logo />
          </div>
          <h2 className="text-center mb-4">Forgotten your password</h2>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={handleSendResetLink}
            disabled={!email}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </>
  );
}

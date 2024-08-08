import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from "../Logo";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import request from 'superagent';
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Cookies from 'js-cookie';
import { MyContext } from "@/context/provider";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { state, setState } = useContext(MyContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    setEmailError('');
    setPasswordError('');
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
    if (!valid) {
      return;
    }
    const token = Cookies.get('authToken');
    try {
      setLoading(true);
      const response = await request.post('https://master.project.henceforthsolutions.com:3000/signin')
        .send({ email, password, device_type: "WEB" });
      setState(response.body);
      Cookies.set('authToken', response.body.access_token);
      router.push('/welcome');
    } catch (error: any) {
      toast.error(error.response.body.message);
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <>
      <Head>
        <title>Login_Module</title>
        <meta name="description" content="Sign in to your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <Spin spinning={loading}>
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DDD0DC' }}>
          <div className="card" style={{ width: '32rem', backgroundColor: 'white', padding: '20px', borderRadius: '15px' }}>
            <ArrowLeftOutlined onClick={() => router.push('/')} style={{ cursor: 'pointer', fontSize: '1.5rem', position: 'absolute', top: '20px', right: '470px' }} />
            <div style={{ textAlign: 'center' }}>
              <Logo />
            </div>
            <h2 className="text-center mb-4">Welcome Back</h2>
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && <div className="text-danger mb-3">{emailError}</div>}
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text" onClick={togglePasswordVisibility}>
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div>
              <button style={{ color: 'red', marginBottom: '10px' }} className="btn btn-link p-0 ml-2" onClick={() => router.push('/Forgotpassword')}>Forget Password</button>
            </div>
            <button  
              type="button"
              className="btn btn-danger"
              onClick={handleSignIn}
            >  
              Sign in
            </button>   
            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <p className="mb-0">Don't Have an account?</p>
              <button className="btn btn-link p-0 ml-2" onClick={() => router.push('/Signup')}>Sign up</button>
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}

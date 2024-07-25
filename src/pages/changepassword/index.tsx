import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css';
import Footer from '../welcome/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import { useContext, useState } from 'react';
import superagent from 'superagent';
import Cookies from 'js-cookie';
import Router from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import router from 'next/router';
import { MyContext } from '@/context/provider';
import image from '../male-face-avatar-on-white-260nw-562359640.webp'

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { state } = useContext(MyContext);
  const handlePasswordChange = async () => {


    const token = Cookies.get('authToken');
    try {
      const response = await superagent
        .put('https://master.project.henceforthsolutions.com:3000/change-password')
        .send({ fcm_token: "alklsak",  old_password:oldPassword, new_password:newPassword })
        .set('Authorization', `Bearer ${token}`);
         setMessage(response.text);
         alert("Change succesfully") 
       Router.push('/Interface');
      }  catch (error:any) {
        toast.error(error.response.body.message)
            }
  };


  return (
    <>
      <div>
        <div className="container-fluid" style={{ display: 'flex' }}>
          <nav className={Styles.navbar}>  <p className="text-danger py-1 px-3" style={{border:'3px solid grey' ,  marginTop:'17px', borderRadius:'5px' , width:'140px' ,height:"48px", textAlign:'center' , marginLeft:'1200px' }}>  <img src={`http://139.59.47.49:4004/api/profile_image?profile_image=${state.profile_pic}`} style={
    {
        width: '40px',  
       height: '38px', borderRadius: '50%', objectFit: 'cover' ,position:'relative', right:'11px'
    }
}
/>{state.first_name}
              </p></nav>
        </div>
      </div>
      <Toaster
    position="top-right"
    reverseOrder={false}
   />
      <div className="container my-5">
        <p className="mb-4">
        <button 
        className="btn btn-link p-0 ml-2"
        onClick={() => router.push('/welcome')}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        My account
      </button>  <IoIosArrowForward /> notifications
        </p>
        <h1>Change Password</h1>
        <div className="form-group" style={{ marginTop: '40px', width: '440px', minHeight:'232px' }}>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handlePasswordChange}
          >
            Update Password
          </button>
         
        </div>
      </div>
      <div className="Footer-section">
        <Footer />
      </div>
    </>
  );
}

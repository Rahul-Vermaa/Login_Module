import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css'
import Footer from '../Footer';
import { IoIosArrowForward } from 'react-icons/io';

export default function changepassword() {


  return (
    <>
     <div>
     <div className="container-fluid " style={{display:'flex'}} >
    <nav className={Styles.navbar}> 
    </nav>
    </div>
        
    </div>
    <div className="container my-5">
    <p className="mb-4">My Account  <IoIosArrowForward/> notifications </p>
    <h1>Change Password</h1>
    <div className="form-group" style={{marginTop:'40px' , width:'440px'}}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Old password"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
              </div>
              <input
                className="form-control"
                placeholder="Enter New Password"
              />
            </div>
            <button
            type="button"
            className="btn btn-danger"
          >
            Update Password
          </button>
          </div>
     </div>
    <div  className="Footer-section"  >
       <Footer/>
       </div>
    </>
  );
}

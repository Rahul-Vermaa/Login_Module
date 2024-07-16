import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css'
import Footer from '../Footer';
import { IoIosArrowForward } from 'react-icons/io';
import Router from 'next/router';

export default function notification() {


  return (
    <>
     <div>
     <div className="container-fluid " style={{display:'flex'}} >
    <nav className={Styles.navbar}> 
    </nav>
     </div>
     <div className="container my-5">
     <p className="mb-4">  <button 
        className="btn btn-link p-0 ml-2"
        onClick={() => Router.push('/Interface')}
        style={{ color: 'black', textDecoration: 'none' }}
      >
        My account
      </button>   <IoIosArrowForward/> notifications </p>
     <h1>Notification Setting <div className="form-check form-switch" style={{fontSize:'22px'}}>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
</div></h1>
</div>

     <div  className="Footer-section"  >
       <Footer/>
       </div>
     </div>

    </>
  );
}

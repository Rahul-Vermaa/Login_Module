import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css'
import Footer from '../Interface/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import Router from 'next/router';
import { MyContext } from '@/context/provider';
import { useContext } from 'react';

export default function notification() {
  const { state } = useContext(MyContext);

  return (
    <>
     <div>
     <div className="container-fluid " style={{display:'flex'}} >
    <nav className={Styles.navbar}> 
    <p style={{border:'3px solid black' ,  marginTop:'17px', borderRadius:'7px' , width:'75px' , textAlign:'center' , marginLeft:'1200px'}}>{state.first_name}
    </p>  </nav>
     </div>
     <div className="container my-5" style={{minHeight:'371px'}}>
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

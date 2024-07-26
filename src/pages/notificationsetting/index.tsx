import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css'
import Footer from '../welcome/Footer';
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
    <p className="text-danger py-1 px-3" style={{border:'3px solid grey' ,  marginTop:'17px', borderRadius:'5px' , width:'140px' ,height:"48px", textAlign:'center' , marginLeft:'1200px' }}>  <img src={`http://139.59.47.49:4004/api/profile_image?profile_image=${state.profile_pic}`} style={
    {
     width: '40px',  
     height: '38px', borderRadius: '50%', objectFit: 'cover' ,position:'relative', right:'11px'
    }
}
/>{state.first_name}
              </p></nav>
     </div>
     <div className="container my-5" style={{minHeight:'371px'}}>
     <p className="mb-4">  <button 
        className="btn btn-link p-0 ml-2"
        onClick={() => Router.push('/welcome')}
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

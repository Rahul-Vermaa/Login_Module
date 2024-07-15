import 'bootstrap/dist/css/bootstrap.min.css';
import Styles from '../navbar.module.css'
import Footer from '../Footer';
import { IoIosArrowForward } from 'react-icons/io';

export default function personalinfo() {


  return (
    <>
     <div>
     <div className="container-fluid " style={{display:'flex'}} >
     <nav className={Styles.navbar}> 
     </nav>
    </div>
    <div className="container my-5">
     <p className="mb-4">My Account  <IoIosArrowForward/> Personal Info </p>
<h1>Personal Info</h1>
</div>
         <div  className="Footer-section"  >
       <Footer/>
       </div>
     </div>

    </>
  );
}

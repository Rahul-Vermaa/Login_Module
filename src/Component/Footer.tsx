import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGooglePlay, FaAppStoreIos } from 'react-icons/fa';


export default function Footer() {
    return (
        <div className="container-fluid bg-danger text-white py-3 d-flex flex-column align-items-center" style={{ height: '200px' , position:'relative' , bottom:'0px'}}>
            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '25px' }}>
                <FaFacebook  size={30} className="mx-2" />
                <FaTwitter size={30} className="mx-2" />
                <FaInstagram size={30} className="mx-2" />
                <FaLinkedin size={30} className="mx-2" />
            </div>
            <div className="text-center" style={{ margin: '25px' }}>
                <p className="mb-0">© 2024 Sheikh Sultan Award - All rights reserved. Terms and conditions</p>
            </div>
            <div className="d-flex justify-content-center align-items-center" >
                <div className="d-flex justify-content-center align-items-center" style={{ border: '3px solid white', padding: '4px', borderRadius: '7px', marginRight: '24px' }}>
                    <FaGooglePlay size={30} className="mr-2" />
                    <span>Google Play</span>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ border: '3px solid white', padding: '4px', borderRadius: '7px' }}>
                    <FaAppStoreIos size={30} className="mr-2" />
                    <span>App Store</span>
                </div>
            </div>
        </div>
    );
}

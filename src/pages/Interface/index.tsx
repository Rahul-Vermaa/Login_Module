import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import  Styles  from  "../navbar.module.css";
import Footer from "./Footer";
import MiddleContent from "./midbody";



export default function Signup() {
    return (
        <>
            <Head>
                <title>Signup Module</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container-fluid " style={{display:'flex'}} >
            <nav className={Styles.navbar}> 
           </nav>
            </div>
            <div className="Middle-Content">
            <MiddleContent/>
            </div>
            <div  className="Footer-section"  >
             <Footer/>
            </div>
        </>
    );
}

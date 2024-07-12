import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router"; 
import Logo from "./Logo";
import { GoogleOutlined, FacebookOutlined, UserAddOutlined } from '@ant-design/icons'; 

export default function Signup() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Login_Module</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#ddd0dc' }}>
                <div className="card" style={{ width: '32rem', backgroundColor: 'white', padding: '20px', borderRadius: '15px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Logo />
                    </div>
                    <h2 className="text-center mb-4">Welcome to Page</h2>
                    <div className="d-flex justify-content-center mb-4">
                    </div>
                    <button type="button" className="btn btn-danger btn-block mb-3 d-flex align-items-center justify-content-start" style={{ width: '100%' }} onClick={() => router.push('/Signup')}>
                        <UserAddOutlined style={{ marginRight: '120px' }} /> Create new account
                    </button>
                    <button type="button" className="btn btn-warning btn-block mb-3 d-flex align-items-center justify-content-start" style={{ width: '100%' }}>
                        <GoogleOutlined style={{ marginRight: '120px' }} /> Continue with Gmail
                    </button>
                    <button type="button" className="btn btn-primary btn-block d-flex align-items-center justify-content-start" style={{ width: '100%' }}>
                        <FacebookOutlined style={{ marginRight: '120px' }} /> Continue with Facebook
                    </button>
                    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        <p className="mb-0">You have an account already?</p>
                        <button className="btn btn-link p-0 ml-2 " onClick={() => router.push('/signin')}>Sign in</button>
                    </div>
                </div>
            </div>
        </>
    );
}

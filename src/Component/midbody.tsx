import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonFillLock, BsPersonVcard } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from 'react';
import { Spin } from 'antd';
import { destroyCookie, parseCookies } from 'nookies';
import path from 'path';


const MiddleContent = () => {
    const router = useRouter();
const[loading , setLoading]= useState(false)

    const handleCreateAccountClick = () => {
        setLoading(true);
        router.push('/personalinfo');
        };

    const handleClick = () => {
        setLoading(true);
        router.push('/changepassword');
    };

    const handleClickk = () => {
        setLoading(true);
        router.push('/notificationsetting');
    };

    const logout = () => {
        setLoading(true);
        const token = parseCookies()
        destroyCookie(null,"authToken",{
            path:"/"
        })
        router.push('/');
    };




    return (
        <div className="container my-5" style={{minHeight:'370px'}}>
            <h1 className="mb-4">My Account</h1>
          <Spin spinning={loading}>            <div className="row">
                <div className="col-md-4 mb-4" style={{cursor:'pointer' }}>
                    <Card style={{boxShadow:"0 5px 2px -2px gray"}} onClick={handleCreateAccountClick} className="h-100">
                        <Card.Body>
                        <BsPersonVcard size={40} />
                        <Card.Title>Personal Info <IoIosArrowForward />
                        </Card.Title>
                            <Card.Text>
                               personal details
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-4"  style={{cursor:'pointer'}}>
                    <Card style={{boxShadow:"0 5px 2px -2px gray"}} onClick={handleClick} className="h-100">
                        <Card.Body>
                        <BsPersonFillLock size={40} />
                            <Card.Title>Change Password <IoIosArrowForward /></Card.Title>
                            <Card.Text>
                                Update your password to keep your account secure.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-4"   style={{cursor:'pointer'}}>
                    <Card style={{boxShadow:"0 5px 2px -2px gray"}} onClick={handleClickk} className="h-100">
                        <Card.Body>
                        <MdOutlineNotificationsActive size={40} />
                            <Card.Title>Notifications <IoIosArrowForward /></Card.Title>
                            <Card.Text>
                              review payments , payout , cupons , gifts cards and taxes
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            </Spin>
            <Button variant="danger" className="mt-3" onClick={logout}>
                Logout
            </Button>
        </div>
    );
};

export default MiddleContent;

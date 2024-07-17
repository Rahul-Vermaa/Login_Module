
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPersonFillLock, BsPersonVcard } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import Cookies from 'js-cookie';
import { IoIosArrowForward } from "react-icons/io";


const MiddleContent = () => {
    const router = useRouter();
    return (
        <div className="container my-5" style={{minHeight:'370px'}}>
            <h1 className="mb-4">My Account</h1>
            <div className="row">
                <div className="col-md-4 mb-4" style={{cursor:'pointer'}}>
                    <Card onClick={() => router.push('./personalinfo')} className="h-100">
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
                    <Card onClick={() => router.push('./changepassword')} className="h-100">
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
                    <Card onClick={() => router.push('./notificationsetting')} className="h-100">
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
            <Button variant="danger" className="mt-3" onClick={()=>{Cookies.remove('authToken');router.push('/')}}>
                Logout
            </Button>
        </div>
    );
};

export default MiddleContent;

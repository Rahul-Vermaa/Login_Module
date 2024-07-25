import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { Upload, Button, message } from 'antd';
import Styles from '../navbar.module.css';
import Footer from '../welcome/Footer';
import { IoIosArrowForward } from 'react-icons/io';
import router from 'next/router';
import { MyContext } from '@/context/provider';
import superagent from 'superagent';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import request from 'superagent';
import { UploadOutlined } from '@ant-design/icons';

export default function PersonalInfo() {
  const { state, setState } = useContext(MyContext);
  const [file,setFile]=useState<any>(null);
  const [isEditing, setIsEditing] = useState<any>({
    first_name: false,
    email: false,
    phone: false,
    country_code: false,
  });
  const [profileImage, setProfileImage] = useState<string>('');

  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleEditToggle = (field: any) => {
    let arr = field.split('/');
    if (arr.length > 1) {
      setIsEditing({
        ...isEditing,
        [arr[0]]: !isEditing[arr[0]],
        [arr[1]]: !isEditing[arr[1]],
      });
      if (isEditing[arr[0]] || isEditing[arr[1]]) {
        handleSubmit(arr);
      }
    } else {
      setIsEditing({
        ...isEditing,
        [field]: !isEditing[field],
      });
      if (isEditing[field]) {
        handleSubmit(field);
      }
    }
  };

  const handleSubmit = async (field: any) => {
    const token = Cookies.get('authToken');
    try {
      const endpointMap = {
        first_name: 'https://master.project.henceforthsolutions.com:3000/profile',
        email: 'https://master.project.henceforthsolutions.com:3000/email',
        phone: 'https://master.project.henceforthsolutions.com:3000/phone',
      } as any;
      const payloadMap = {
        first_name: state.first_name,
        email: state.email,
        phone: {
          country_code: state.country_code,
          phone: state.phone,
        },
      } as any;
      await superagent
        .patch(endpointMap[Array.isArray(field) ? field[0] : field])
        .send(Array.isArray(field) ? { [field[0]]: payloadMap[field[0]][field[0]], [field[1]]: payloadMap[field[0]][field[1]] } : { [field]: payloadMap[field] })
        .set('Authorization', `Bearer ${token}`);
      toast('Successfully Changed');
    } catch (error: any) {
      toast(error.response.body.message);
    }
  };
 
  
  async function uploadImage () {
    if(file){
    let formdata = new FormData()
    formdata.append("file" , file)
    console.log(formdata)
    try {
      const res = await request
        .post("http://139.59.47.49:4004/api/upload/image").send(formdata)
        
      const newProfileImageUrl = `http://139.59.47.49:4004/api/profile_image?profile_image=${res.body.filename}`;
    console.log(newProfileImageUrl)
      setProfileImage(newProfileImageUrl); 
            const token = Cookies.get('authToken');
      let apires =await superagent
        .patch('https://master.project.henceforthsolutions.com:3000/profile')
        .send({ profile_pic: res.body.filename })
        .set('Authorization', `Bearer ${token}`);
      setState(apires.body)
    } catch (error) {
      message.error('There was an error uploading the image. Please try again.');
      throw error;
    }
  }
  else{
    console.log("No Img Found")
  }
  };


  return (
    <>
      <div>
        <div className="container-fluid">
          <nav className={Styles.navbar}>
            <p className="text-danger py-1 px-4" style={{ border: '3px solid grey', marginTop: '17px', borderRadius: '5px', width: '150px', height: "48px", textAlign: 'center', marginLeft: '1210px' }}>
              <img src={`http://139.59.47.49:4004/api/profile_image?profile_image=${state.profile_pic}`}  alt="" style={{border: "2px solid grey" , width: '40px', height: '38px', borderRadius: '50%', objectFit: 'cover' ,position:'relative', right:'11px'}} />
              {state.first_name}
            </p>
          </nav>
        </div>
        <div className="container my-5">
          <div className="mb-4">
            <button
              className="btn btn-link p-0 ml-2"
              onClick={() => router.push('/welcome')}
              style={{ color: 'black', textDecoration: 'none' }} >
              My account
            </button>
            <IoIosArrowForward /> Personal Info
          </div>
          <h1>Personal Info</h1>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="row">
            <div className="col-md-7">
              <div className="mt-4">
                <div className="card mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">Name</h5>
                      <input
                        style={{ width: '400px' }}
                        type="text"
                        name="first_name"
                        className="form-control mb-3"
                        value={state.first_name}
                        onChange={handleChange}
                        readOnly={!isEditing.first_name}
                      />
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditToggle('first_name')}
                    >
                      {isEditing.first_name ? 'Save' : 'Change'}
                    </button>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">Email</h5>
                      <input
                        style={{ width: '400px' }}
                        type="text"
                        name="email"
                        className="form-control mb-3"
                        value={state.email}
                        onChange={handleChange}
                        readOnly={!isEditing.email}
                      />
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditToggle('email')}
                    >
                      {isEditing.email ? 'Save' : 'Change'}
                    </button>
                  </div>
                </div>
                <div className="card mb-3">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">Phone</h5>
                      <input
                        style={{ width: '400px' }}
                        type="text"
                        name="country_code"
                        className="form-control mb-3"
                        value={state.country_code}
                        onChange={handleChange}
                        readOnly={!isEditing.phone}
                        placeholder="Country Code"
                      />
                      <input
                        type="text"
                        name="phone"
                        className="form-control mb-3"
                        value={state.phone}
                        onChange={handleChange}
                        readOnly={!isEditing.phone}
                        placeholder="Phone Number"
                      />
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditToggle('phone/country_code')}
                    >
                      {(isEditing.phone || isEditing.country_code) ? 'Save' : 'Change'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ border: '3px solid grey', width: '290px', height: '250px', position: 'relative', left: '190px', borderRadius: '3px', top: '20px' }} className="col-md-6 d-flex flex-column align-items-center justify-content-center">
      {file ? (
        <img src={URL.createObjectURL(file)} alt="" style={{ border: "2px solid grey", width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <img src={`http://139.59.47.49:4004/api/profile_image?profile_image=${state.profile_pic}`} alt="" style={{ border: "2px solid grey", width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
      )}
      <div className="mt-4">
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <Button onClick={uploadImage}>
          Save
        </Button>
      </div>
    </div>
          </div>
        </div>
        <div className="Footer-section">
          <Footer />
        </div>
      </div>
    </>
  );
}

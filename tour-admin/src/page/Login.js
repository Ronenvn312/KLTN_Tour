import React, { useState } from 'react'
import './Login.css'
import logo from '../assets/logo.png'
import wel_human from '../assets/Wel_human.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios'
function Login() {
  const navigate = useNavigate()
  // const [values, setValues] = useState({ email: "", password: "" })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showErroPassword, setshowErroPassword] = useState(false);
  const [showErroEmail, setshowErroEmail] = useState(false);

  const toggleshowErroPassword = () => setshowErroPassword(!showErroPassword);
  const toggleshowErroEmail = () => setshowErroEmail(!showErroEmail);
    //event get values
    const [validateEmail, setValidateEmail] = useState({
      "status": true,
      "content": ""
    })
    const [validatePassword, setValidatePassword] = useState({
      "status": true,
      "content": ""
    })
  //submit login
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (handleValidation()) {
  //     console.log("in validation")
  //     const { password, email } = values
  //     localStorage.setItem("currentUser", JSON.stringify(values));
  //     navigate('/home')
  //   }
  // const handlogin
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {

    if (validateEmail == true && validatePassword == true) {

    }
    else {
      let result = axios.get(`http://localhost:8080/taikhoan/loggin`, {
        params: {
          username: email
        }
      })
      console.log(result)
    }
  };

  const handleChangeEmail = (event) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    setEmail(event.target.value)
    if (!event.target.value.match(validRegex)) {
      setValidateEmail({
        "status": true,
        "content": "Email chưa đúng định dạng VD: abc@gmail.com"
      })
    }
    else {
      setValidateEmail({
        "status": false,
        "content": "Nhập hợp lệ!"
      })
    }
  }
  const handleChangePassword = (event) => {
    let validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    setPassword(event.target.value)
    if (!event.target.value.match(validPassword)) {
      setValidatePassword({
        "status": true,
        "content": "Phải chứa ít nhất một số và một chữ hoa và chữ thường và ít nhất 8 ký tự trở lên"
      })
    } else {
      setValidatePassword({
        "status": false,
        "content": "Nhập hợp lệ!"
      })
    }

  }
  // const handleValidation = () => {

  // }
  return (
    <div className='Login'>
      <div className='Login-left'>
        <img className='Logo-left' src={logo} alt='' />
        <h1 className='Login-title'>Sign In</h1>

        <Form className='group-control' onSubmit={(e) => handleSubmit(e)}>
          <Form.Label className='label-login'>Email address</Form.Label>
          <Form.Group id='form-group' controlId="formBasicEmail">
            <div style={{ minWidth: 350, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Form.Control
                name='email'
                value={email}
                onChange={e => handleChangeEmail(e)}
                type="text" placeholder="Enter email" required />

              {
                validateEmail.content != "" ? (
                  validateEmail.status ? <img className='Logo-left' style={{ marginLeft: 10, width: 30, height: 30 }} src={require('../assets/validation/erro_checked.png')} alt='' />
                    : <img style={{ marginLeft: 10, width: 30, height: 30 }} className='Logo-left' src={require('../assets/validation/success_checked.png')} alt='' />
                ) : ""
              }
            </div>
            {
              validateEmail.status ? <p style={{ maxWidth: 350, color: "red", alignItems: 'flex-start', float: "left", paddingLeft: 10 }}>
                {validateEmail.content}
              </p> : ""
            }
          </Form.Group>
          <Form.Label className='label-login'>Password</Form.Label>
          <Form.Group id='form-group' className="mb-3" controlId="formBasicPassword">
            <div style={{ minWidth: 350, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Form.Control
                name='password'
                value={password}
                onChange={e => handleChangePassword(e)}
                type="password" placeholder="Password" required />
              {
                validatePassword.content != "" ? (
                  validatePassword.status ? <img className='Logo-left' style={{ marginLeft: 10, width: 30, height: 30 }} src={require('../assets/validation/erro_checked.png')} alt='' />
                    : <img style={{ marginLeft: 10, width: 30, height: 30 }} className='Logo-left' src={require('../assets/validation/success_checked.png')} alt='' />
                ) : ""
              }
            </div>

            {validatePassword.status ?
              <p style={{ maxWidth: 350, color: "red", alignItems: 'flex-start', float: "left", paddingLeft: 10 }}>
                {validatePassword.content}
              </p> : ""
            }

          </Form.Group>
          <Form.Group id='form-group' className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              className='label-login' type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
      <div className='Login-right'>
        {/* <img className='img-wel' src={wel_human} alt='wel' /> */}
      </div>
    </div>
  )
}

export default Login
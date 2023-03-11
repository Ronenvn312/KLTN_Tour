import React, { useState } from 'react'
import './Login.css'
import logo from '../assets/logo.png'
import wel_human from '../assets/Wel_human.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: "", password: "" })
  const [showErroPassword, setshowErroPassword] = useState(false);
  const [showErroEmail, setshowErroEmail] = useState(false);

  const toggleshowErroPassword = () => setshowErroPassword(!showErroPassword);
  const toggleshowErroEmail = () => setshowErroEmail(!showErroEmail);
  //submit login
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (handleValidation()) {
  //     console.log("in validation")
  //     const { password, email } = values
  //     localStorage.setItem("currentUser", JSON.stringify(values));
  //     navigate('/home')
  //   }

  // }
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate("/home")

    setValidated(true);
  };
  //event get values
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <div className='Login'>
      <div className='Login-left'>
        <img className='Logo-left' src={logo} alt='' />
        <h1 className='Login-title'>Sign In</h1>
        <Form className='group-control' noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <Form.Group id='form-group' className="mb-3" controlId="formBasicEmail">
            <Form.Label className='label-login'>Email address</Form.Label>
            <Form.Control
              name='email'
              value={"admin"}
              onChange={e => handleChange(e)}
              type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a email
            </Form.Control.Feedback>
              {
                values.email.lenght <6 ? <Form.Control.Feedback type="invalid">
                'Please email lenght longer than 6'
              </Form.Control.Feedback> :""
              }
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group id='form-group' className="mb-3" controlId="formBasicPassword">
            <Form.Label className='label-login'>Password</Form.Label>
            <Form.Control
              name='password'
              value={"admin"}
              onChange={e => handleChange(e)}
              type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a password
            </Form.Control.Feedback>

          </Form.Group>
          <Form.Group id='form-group' className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              className='label-login' type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className='Login-right'>
        <img className='img-wel' src={wel_human} alt='wel' />
      </div>
    </div>
  )
}

export default Login
import "./login.css";
 import logo from '../../assets/Logo_Muni200x200.png';
import logo2 from '../../assets/logo_municipalidad.png';
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import cdigitalApi from "../../api/cdigitalAPI";
import Swal from 'sweetalert2';




export const Login = () => {
  
//   const { login } = useStore();
//  const location = useLocation();
 const navigate = useNavigate();


  //   LOGIN_VALUES,
  //   login,
  //   validationLogin
  // );
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const[formData, setFormData]= useState({
      
    email_ciudadano:"",
    clave_ciudadano:"",
    
  })

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
  });
  }

const handleLogin = async (e) =>{
  e.preventDefault();



  try{
    
    const resp=await cdigitalApi.post(`/api/usuarios/login`,formData);
    console.log(resp);
  
  
   if(resp.data.ok){
    return (   
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Bienvenido!! `,
        showConfirmButton: false,
        timer: 2500
      })

    )
    
 
  
  }
 else{
  Swal.fire({
    icon: 'error',
    title: '¡Ups!',
    text: 'Algunos de los datos ingresados es incorrecto',                
  })
 }
 


  
  }
  
  catch(error)
  {
  console.log(error);
  }
  console.log(formData)


  // navigate("/login")
}

  return (
    <>
<header>
<div className='banner d-flex '>
      <div className=''>
        <img src={logo} alt="Logo 1" className='logo p-2' />
        <img src={logo2} alt="Logo 1" className='logo2 p-2' />
      </div>
    
    </div>

</header>




    
<Container fluid >

<Row  className='justify-content-center mt-3 ' >

<Col xs={8} md={3}  className='mt-5  main mb-3 pb-3'>


<Form onSubmit={handleLogin} className="m-4 d-flex flex-column">
         
<div className='text-center'>
        <img src={logo} alt="Logo 1" className='logo mb-2' />
        
      </div>


<Form.Group className="mb-3" controlId="email">
    <Form.Label> <strong>Email </strong> </Form.Label>
    <Form.Control
      type="email"
      placeholder="name@example.com"
      name="email_ciudadano"
      onChange={handleChange}
      maxLength={70}
      required
      value={formData.email_ciudadano}
    />
  </Form.Group>




  <Form.Group className=" d-flex flex-column" controlId="clave">
  <Form.Label> <strong>Clave</strong> </Form.Label>
    <Form.Control
     type={showPassword ? 'text' : 'password'}
      placeholder='Escriba una clave'
      name="clave_ciudadano"
      onChange={handleChange}
      value={formData.clave_ciudadano}
      // minLength={15}
      // maxLength={15}
      required
    />
  <div className="d-flex justify-content-end">
  {showPassword ? (
          <FaEyeSlash
            onClick={handleShowPassword}
            className='ojo'
            
          />
        ) : (
          <FaEye
            onClick={handleShowPassword}
            className='ojo'
            
          />
        )}
  </div>
</Form.Group>
    
         
<Button size='lg' variant="primary" type="submit" className=" text-center mt-2">
 Ingresar
</Button>
        </Form>


</Col>



</Row>
  


</Container>
       
<footer className='footer mt-4 pt-2 '>
  <div className='text-center'>

  <img src={logo2} alt="Logo 1" className='logo3 p-2' />
  </div>

</footer>
 
    </>
 
    );

};

export default Login;

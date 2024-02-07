import React, { useState } from 'react'
import '../css/registro.css';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
//import { Navigate } from 'react-router';
import logo from '../assets/logo1.png';
import logo2 from '../assets/logo5.png';
import logo3 from '../assets/logo4.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { Validacion } from './Validacion';
import cdigitalApi from '../api/cdigitalAPI';
import { useEffect } from 'react';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom/dist';
// import Email from 'smtpjs';



export const Registro = () => {
   
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [codigo, setCodigo] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const abrirModal = () => setModalAbierto(true);
    const cerrarModal=() => setModalAbierto(false)
    
    const[formData, setFormData]= useState({
      
      dni_ciudadano:"",
      nombre_ciudadano:"",
      email_ciudadano:"",
      clave_ciudadano:"",
      telefono_ciudadano:"",
      celular_ciudadano:"",
      domicilio:"",
      provincia:"",
      localidad:"",
      validado:false,
      fecha_carga:"",
      habilita:false
      
    })
   
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [DNIRegistrado, setDNIRegistrado] = useState({});
    const [EMAILRegistrado, setEMAILRegistrado] = useState({});

    const provinciasArgentina = [
      "Buenos Aires",
      "Catamarca",
      "Chaco",
      "Chubut",
      "Córdoba",
      "Corrientes",
      "Entre Ríos",
      "Formosa",
      "Jujuy",
      "La Pampa",
      "La Rioja",
      "Mendoza",
      "Misiones",
      "Neuquén",
      "Río Negro",
      "Salta",
      "San Juan",
      "San Luis",
      "Santa Cruz",
      "Santa Fe",
      "Santiago del Estero",
      "Tierra del Fuego",
      "Tucumán"
    ];
    const fecha = new Date();
    const fechaFormateada = moment.tz(fecha, 'America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss.SSS');
  
    const navigate = useNavigate();

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
      
    };
    const handleTogglePassword2 = () => {
      setShowPassword2(!showPassword2);
    };

    const handleRegister = async (e)=>{
      e.preventDefault();
      // setFormData({
      //   ...formData,
      
        
      //   fecha_carga: new Date().toLocaleString(),
      // });

      
        // ! Verificar Email
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!patronEmail.test(formData.email_ciudadano)){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'El correo electronico que ingresaste no es válido',                
              })
        }
        // ! Verificar que las contraseñas sean iguales
        if( formData.clave_ciudadano !== confirmarContraseña){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Las claves no coinciden',                
              })
        }

        if( formData.dni_ciudadano.length != 8){
          return Swal.fire({
              icon: 'error',
              title: '¡Ups!',
              text: 'El DNI debe tener 8 caracteres',                
            })
      }

      if( formData.celular_ciudadano.length != 10){
        return Swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'El nro de celular debe tener 10 caracteres sin guiones ejemplo: 3814123456',                
          })
    }

  //   if( formData.telefono_ciudadano.length != 7){
  //     return Swal.fire({
  //         icon: 'error',
  //         title: '¡Ups!',
  //         text: 'El nro de teléfono debe tener 7 caracteres sin guiones ejemplo: 4223456',                
  //       })
  // }

  if( formData.provincia == 0){
    return Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Debe seleccionar una provincia',                
      })
}
if( formData.localidad == 0){
  return Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: 'Debe seleccionar una localidad',                
    })
}

try{
  const resp=await cdigitalApi.get(`/api/usuarios/dni/${formData.dni_ciudadano} `);
  const resp2=await cdigitalApi.get(`/api/usuarios/email/${formData.email_ciudadano} `);


 if(resp.data.ciudadano){
  return Swal.fire({
    icon: 'error',
    title: '¡Ups!',
    text: 'El DNI ingresado ya se encuentra registrado',                
  })

}
if(resp2.data.ciudadano){
  return Swal.fire({
    icon: 'error',
    title: '¡Ups!',
    text: 'El Email ingresado ya se encuentra registrado',                
  })

}

}

catch(error)
{
console.log(error);
}


AgregarCiudadanoDB(formData);
  

        
       }

    const handleChange = (e,lon) => {

if(e.target.type=="number")
{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value.slice(0,lon),
     fecha_carga: fechaFormateada,
    
});
// setFormData({
//   ...formData,
//   fecha_carga: new Date().toLocaleString(),
// });
}
else{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    
});



}
     
       }

    const AgregarCiudadanoDB= async (data) =>
       {
       
           try{
               const resp=await cdigitalApi.post("/api/usuarios",data);
               
               Swal.fire({
                position: "center",
                icon: "success",
                title: `Formulario enviado! Pendiente de validación `,
                showConfirmButton: false,
                timer: 2500
              });
              abrirModal();
              console.log(data);
           }
       
           catch(error)
           {
           console.log(error);
           }
       }


   
  return (
    <>
   
<header>
<div className='banner d-flex '>
      <div className=''>
        <img src={logo2} alt="Logo 1" className='logo p-2' />
        
      </div>
    
    </div>
</header>

  
<h1 className=' text-center mt-2 titulo'>Registro del ciudadano</h1>
        
        <Container fluid >

      <Row className='justify-content-center ' >
     <Col xs={12} md={8}  className='mt-2 pt-3 main mb-3 pb-3'>
     
     <Form  onSubmit={handleRegister} className='m-1 p-3 '>

      <Row>
<Col xs={12} md={6}>
<Form.Group className="mb-3" controlId="dni">
    <Form.Label> <strong>DNI</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder='16234568'
      onChange={(e)=>handleChange(e,8)}
      value={formData.dni_ciudadano}
      name="dni_ciudadano"
      required
      
    />
 

  </Form.Group>
<Form.Group className="mb-3 " controlId="nombre">
    <Form.Label> <strong>Nombre y Apellido</strong> </Form.Label>
    <Form.Control
      type="text"
      placeholder="Juan Perez"
      name='nombre_ciudadano'
      onChange={handleChange}
      maxLength={50}
      minLength={5}
      required
      value={formData.nombre_ciudadano}
    />
     
  </Form.Group>

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

  <Form.Group className="mb-3" controlId="telefono">
    <Form.Label> <strong>Telefono</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="4223456"
      name="telefono_ciudadano"
      onChange={(e)=>handleChange(e,7)}
      value={formData.telefono_ciudadano}
      
      
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="celular">
    <Form.Label> <strong>Celular</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="3813456789"
      name="celular_ciudadano"
      onChange={(e)=>handleChange(e,10)}
      value={formData.celular_ciudadano}
      required
    />
  </Form.Group>
 

</Col>

<Col xs={12} md={6}> 
<Form.Group className=" d-flex flex-column" controlId="clave">
  <Form.Label> <strong>Clave</strong> </Form.Label>
    <Form.Control
     type={showPassword ? 'text' : 'password'}
      placeholder='Escriba una clave'
      name="clave_ciudadano"
      onChange={handleChange}
      value={formData.clave_ciudadano}
      minLength={15}
      maxLength={15}
      required
    />
  <div className="d-flex justify-content-end">
  {showPassword ? (
          <FaEyeSlash
            onClick={handleTogglePassword}
            className='ojo'
            
          />
        ) : (
          <FaEye
            onClick={handleTogglePassword}
            className='ojo'
            
          />
        )}
  </div>
</Form.Group>

<Form.Group className=" d-flex flex-column" controlId="confirmarClave">
    <Form.Label> <strong>Confirmar Clave</strong> </Form.Label>
    <Form.Control
      type={showPassword2 ? 'text' : 'password'}
      placeholder='Repetir clave'
      onChange={(e) => setConfirmarContraseña(e.target.value)}
      minLength={15}
      maxLength={15}
      required
    />
     <div className="d-flex justify-content-end">
  {showPassword2 ? (
          <FaEyeSlash
            onClick={handleTogglePassword2}
            className='ojo'
            
          />
        ) : (
          <FaEye
            onClick={handleTogglePassword2}
            className='ojo'
            
          />
        )}
  </div>
  </Form.Group>


  <Form.Group className="mb-3" controlId="domicilio">
    <Form.Label> <strong> Domicilio</strong></Form.Label>
    <Form.Control
      type="text"
      placeholder='Mendoza 345'
      onChange={handleChange}
      value={formData.domicilio}
      name="domicilio"
      maxLength={30}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="Provincia">
    <Form.Label> <strong>Provincia</strong> </Form.Label>
    
 <Form.Select 
 type="text"    
 onChange={handleChange}
 value={formData.provincia}
 name="provincia"
 maxLength={2}
 required
 
 >
     <option value={0}>Seleccione Provincia</option>
      {provinciasArgentina.map((provincia, index) => (
        <option key={index} value={provincia}>
          {provincia}
        </option>
      ))}
      
      
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Localidad">
    <Form.Label> <strong>Localidad</strong> </Form.Label>
    
 <Form.Control
 
 type="text"    
 onChange={handleChange}
 value={formData.localidad}
 name="localidad"
 
 required
 
 />
 

 

 
 
   
      
   
  </Form.Group>
</Col>

      </Row>

<Row>
<Col className='text-center mt-2'>
<div className='className="d-grid gap-2"'>
  <Button size='lg' variant="primary" type="submit" className="w-50">
 Enviar
</Button>
  </div>

</Col>
<div className=" mt-4">
        <Form.Check
          type="checkbox"
          id="default-checkbox"
          label="Acepto los términos y condiciones"
          required
        />
        
      </div>

   
</Row>

 
  </Form>
      
     </Col>
         
      </Row>


    </Container>

<footer
 className='footerregistro'
 >
  <div className='text-center'>

  <img src={logo3} alt="Logo 1" className='logo3 p-2' />
  </div>

</footer>

{modalAbierto && (
  <Validacion 
    data={formData}
    codverif={codigo}
    cerrarModal={cerrarModal}
  />
)}       
           
    
    </>
  )
}
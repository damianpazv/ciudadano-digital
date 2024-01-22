import React, { useState } from 'react'

import '../css/registro.css';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
//import reactToMyPizzaAPI from '../../../api/ReactToMyPizzaAPI';
//import { Navigate } from 'react-router';
import logo from '../assets/Logo_Muni200x200.png';
import logo2 from '../assets/logo_municipalidad.png';
import logo3 from '../assets/logomuni_piedepagina.png';

export const Registro = () => {
    const [nombre, setNombre] = useState(''); 
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [telefono, setTelefono] = useState('');
    const [celular, setCelular] = useState('');
    const [dni, setDni] = useState('');
    const [domicilio, setDomicilio] = useState('');
   
    const handleRegister = async (e)=>{
        e.preventDefault();
        // Validaciones
        // ! Verificar que no haya campos vacios
        if(nombre.trim() === '' || telefono === ''  || dni === ''  || domicilio === ''  || celular === '' || email.trim() === '' || contraseña.trim() === '' || confirmarContraseña.trim() === ''){ 
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Todos los campos son obligatorios',                
              })
        }
        // ! Verificar Email
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!patronEmail.test(email)){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'El correo electronico que ingresaste no es válido',                
              })
        }
        // ! Verificar que las contraseñas sean iguales
        if( contraseña !== confirmarContraseña){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Las contraseñas no coinciden',                
              })
        }
      
     
        // ! Creo usuario en la base de datos

        // try {
        //     const resp = await reactToMyPizzaAPI.post("api/auth/new",{
        //         nombre,
        //         edad,
        //         email,
        //         password: contraseña
        //     })
            
            
        //     //Guardo el token en el local storage
        //     localStorage.setItem("token", resp.data.token);

        //     if (resp.status === 201){
        //         Swal.fire({
        //             icon: 'success',
        //             title: `Bienvenido a React to my pizza ${nombre}!`,
        //             showConfirmButton: false,
        //             timer: 2000
        //           })
        //           setTimeout(() => {
        //             window.location.href = "/"
        //           }, 1600);
        //     } else{
        //         return Swal.fire({
        //             icon: 'error',
        //             title: '¡Ups!',
        //             text: 'Ocurrió un error inesperado, intentelo nuevamente',                
        //           })
        //     }
        // } catch (error) { 
                       
        //     if (error && error.response && error.response.status === 409){
        //         return Swal.fire({
        //             icon: 'error',
        //             title: '¡Ups!',
        //             text: `Ya existe un usuario registrado con el correo ${email}`,                
        //           }) 
        //     } else{
        //         return Swal.fire({
        //             icon: 'error',
        //             title: '¡Ups!',
        //             text: `Ocurrió un error inesperado, intentelo de nuevo`,                
        //           }) 
        //     }
        // }

        
    }
  return (
    <>
   

   <div className='banner d-flex '>
      <div className=''>
        <img src={logo} alt="Logo 1" className='logo p-2' />
        <img src={logo2} alt="Logo 1" className='logo2 p-2' />
      </div>
    
    </div>
  
<h1 className=' text-center mt-2 titulo'>Registro del ciudadano</h1>
        
        
        

        <Container fluid >

      <Row className='justify-content-center ' >
     <Col xs={4} className='mt-2 pt-3 main mb-3 pb-3'>
     
     <Form onSubmit={handleRegister} className='m-1 p-3 '>

<Form.Group className="mb-3 " controlId="nombre">
    <Form.Label> <strong>Nombre</strong> </Form.Label>
    <Form.Control
      type="text"
      placeholder="Juan Perez"
      name='nombre_ciudadano'
      onChange={(e) => setNombre(e.target.value)}
      maxLength={50}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="email">
    <Form.Label> <strong>Email address</strong> </Form.Label>
    <Form.Control
      type="email"
      placeholder="name@example.com"
      name="email_ciudadano"
      onChange={(e) => setEmail(e.target.value)}
      maxLength={70}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="telefono">
    <Form.Label> <strong>Telefono</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="4223456"
      name="telefono_ciudadano"
      onChange={(e) => setTelefono(e.target.value)}
      maxLength={15}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="celular">
    <Form.Label> <strong>Celular</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="3813456789"
      name="celular_ciudadano"
      onChange={(e) => setCelular(e.target.value)}
      maxLength={15}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="contraseña">
    <Form.Label> <strong>Contraseña</strong> </Form.Label>
    <Form.Control
      type="password"
      placeholder='Escriba una contraseña'
      name="clave_ciudadano"
      onChange={(e) => setContraseña(e.target.value)}
      minLength={8}
      maxLength={15}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="confirmarContraseña">
    <Form.Label> <strong>Confirmar Contraseña</strong> </Form.Label>
    <Form.Control
      type="password"
      placeholder='Repetir contraseña'
      onChange={(e) => setConfirmarContraseña(e.target.value)}
      minLength={8}
      maxLength={15}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="dni">
    <Form.Label> <strong>DNI</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder='16234568'
      onChange={(e) => setDni(e.target.value)}
      name="dni_ciudadano"
      maxLength={10}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="domicilio">
    <Form.Label> <strong> Domicilio</strong></Form.Label>
    <Form.Control
      type="text"
      placeholder='Mendoza 345'
      onChange={(e) => setDomicilio(e.target.value)}
      name="domicilio"
      maxLength={100}
      required
    />
  </Form.Group>

  <div className='className="d-grid gap-2"'>
  <Button size='lg' variant="primary" type="submit" className="w-100">
 Enviar
</Button>
  </div>
  

  </Form>
     
     
     </Col>
       
      
    
       
      </Row>
    </Container>



<footer className='banner'>
  <div className='text-center'>

  <img src={logo3} alt="Logo 1" className='logo3 p-2' />
  </div>

</footer>

           
           
       
       
 

   
    
    </>
  )
}
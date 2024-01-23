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
   
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    
    const[formData, setFormData]= useState({
      id_ciudadano:"",
      dni_ciudadano:"",
      nombre_ciudadano:"",
      email_ciudadano:"",
      clave_ciudadano:"",
      telefono_ciudadano:"",
      celular_ciudadano:"",
      domicilio:"",
      id_provincia:"",
      id_localidad:"",
      validado:"",
      fecha_carga:"",
      habilita:""
    })
   
    const handleRegister = async (e)=>{
        e.preventDefault();
        
        // Validaciones
        // ! Verificar que no haya campos vacios
        // if(nombre.trim() === '' || telefono === ''  || dni === ''  || domicilio === ''  || celular === '' || email.trim() === '' || contraseña.trim() === '' || confirmarContraseña.trim() === ''){ 
        //     return Swal.fire({
        //         icon: 'error',
        //         title: '¡Ups!',
        //         text: 'Todos los campos son obligatorios',                
        //       })
        // }
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

    if( formData.telefono_ciudadano.length != 7){
      return Swal.fire({
          icon: 'error',
          title: '¡Ups!',
          text: 'El nro de teléfono debe tener 7 caracteres sin guiones ejemplo: 4223456',                
        })
  }

  if( formData.id_provincia == 0){
    return Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Debe seleccionar una provincia',                
      })
}
if( formData.id_localidad == 0){
  return Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: 'Debe seleccionar una localidad',                
    })
}


  setFormData({
    ...formData,
    fecha_carga: new Date().toLocaleString(),
});
  console.log(formData)
  Swal.fire({
    position: "center",
    icon: "success",
    title: "El formulario de registro se envió correctamente, le enviaremos un email de validación para finalizar el registro",
    showConfirmButton: false,
    timer: 2500
  });

     
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

    const handleChange = (e,lon) => {

if(e.target.type=="number")
{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value.slice(0,lon),
});
}
else{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
});
}
     
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
      required
      
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

  <Form.Group className="mb-3" controlId="contraseña">
    <Form.Label> <strong>Clave</strong> </Form.Label>
    <Form.Control
      type="password"
      placeholder='Escriba una clave'
      name="clave_ciudadano"
      onChange={handleChange}
      value={formData.clave_ciudadano}
      minLength={15}
      maxLength={15}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="confirmarContraseña">
    <Form.Label> <strong>Confirmar Clave</strong> </Form.Label>
    <Form.Control
      type="password"
      placeholder='Repetir clave'
      onChange={(e) => setConfirmarContraseña(e.target.value)}
      minLength={15}
      maxLength={15}
      required
    />
  </Form.Group>

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

  <Form.Group className="mb-3" controlId="domicilio">
    <Form.Label> <strong> Domicilio</strong></Form.Label>
    <Form.Control
      type="text"
      placeholder='Mendoza 345'
      onChange={handleChange}
      value={formData.domicilio}
      name="domicilio"
      maxLength={100}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="dni">
    <Form.Label> <strong>Provincia</strong> </Form.Label>
    
 <Form.Select 
 type="number"    
 onChange={handleChange}
 value={formData.id_provincia}
 name="id_provincia"
 maxLength={2}
 required
 
 >
      <option value={0}>Seleccione Provincia</option>
      <option value={11} >Tucuman</option>
      <option value={22}>Salta</option>
      <option value={33}>Jujuy</option>
      
    </Form.Select>
  </Form.Group>

  <Form.Group className="mb-3" controlId="dni">
    <Form.Label> <strong>Provincia</strong> </Form.Label>
    
 <Form.Select 
 type="number"    
 onChange={handleChange}
 value={formData.id_localidad}
 name="id_localidad"
 
 required
 
 >
      <option value={0}>Seleccione Localidad</option>
      <option value={1111} >San miguel de Tucuman</option>
      <option value={2222}>San Cayetano</option>
      <option value={3333}>San Jose</option>
      
    </Form.Select>
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
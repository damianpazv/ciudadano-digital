import React, { useState } from 'react'
import '../css/registro.css';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import logo from '../assets/logo1.png';
import logo2 from '../assets/logo5.png';
import logo3 from '../assets/logo4.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { Validacion } from './Validacion';
import cdigitalApi from '../api/cdigitalAPI';
import { useEffect } from 'react';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Registro = () => {
   
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [codigo, setCodigo] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const abrirModal = () => {
      console.log("Abriendo modal...");
      setModalAbierto(true);
  };
  const cerrarModal=() => setModalAbierto(false)
    
  const[formData, setFormData]= useState({
      
      documento_persona:"",
      nombre_persona:"",
      apellido_persona:"",
      email_persona:"",
      clave:"",
      telefono_persona:"",
      celular_persona:"",
      domicilio_persona:"",
      id_provincia:"",
      localidad_persona:"",
      id_pais:"",
      fecha_nacimiento_persona:"",
      id_genero:"",
      validado:false,
      habilita:false
      
    })
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
  const paisesAmerica = [
      "Estados Unidos",
      "Canadá",
      "México",
      "Argentina",
      "Brasil",
      "Colombia",
      "Chile",
      "Perú",
      "Ecuador",
      "Venezuela",
      "Bolivia",
      "Uruguay",
      "Paraguay",
      "Costa Rica",
      "Panamá",
      "Cuba",
      "República Dominicana",
      "Honduras",
      "El Salvador",
      "Nicaragua",
      "Guatemala",
      "Jamaica",
      "Trinidad y Tobago",
      "Haití",
      "Puerto Rico",
      "Guyana",
      "Surinam",
      "Guyana Francesa",
      "Belice"
    ];
 

  

 const handleTogglePassword = () => {
      setShowPassword(!showPassword);
      
    };
 const handleTogglePassword2 = () => {
      setShowPassword2(!showPassword2);
    };

 const handleRegister = async (e)=>{
      e.preventDefault();
  console.log(formData);

      
        // ! Verificar Email
        const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 if(!patronEmail.test(formData.email_persona)){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'El correo electronico que ingresaste no es válido',                
              })
        }
        // ! Verificar que las contraseñas sean iguales
if( formData.clave !== confirmarContraseña){
            return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'Las claves no coinciden',                
              })
        }

 if( formData.documento_persona.length > 8){
          return Swal.fire({
              icon: 'error',
              title: '¡Ups!',
              text: 'El DNI debe tener 8 digitos',                
            })
      }

 if( formData.celular_persona.length != 10){
        return Swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'El nro de celular debe tener 10 caracteres sin guiones ejemplo: 3814123456',                
          })
    }


  if( formData.id_provincia == 0){
    return Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Debe seleccionar una provincia',                
      })
}
if( formData.id_pais == 0){
  return Swal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: 'Debe seleccionar un pais',                
    })
}


try{
  const resp=await cdigitalApi.get(`/api/usuarios/dni/${formData.documento_persona} `);
  const resp2=await cdigitalApi.get(`/api/usuarios/email/${formData.email_persona} `);


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

// AgregarCiudadanoDB(formData);
        
    }

    const handleChange = (e, lon) => {
      let value = e.target.value.trim(); // Eliminar espacios en blanco alrededor del valor
      
      if (e.target.name === "id_provincia" || e.target.name === "id_pais" || e.target.name === "documento_persona" ||e.target.name==="id_genero") {
        value = value !== "" ? parseInt(value.slice(0, lon), 10) : ""; // Convertir a número si no está vacío
      } else if (e.target.type === "number") {
        value = value.slice(0, lon); // Limitar la longitud si es necesario
      }
      
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
    };

    const handleChangeFecha=(date)=>{
      setFormData({
        ...formData,
        fecha_nacimiento_persona: date,
      });
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
             
           }
       
           catch(error)
           {
           console.log(error);
           }
    }

   
return (
    <>
   
<header>
<div className='bannerRegistro d-flex '>
      <div className=''>
        <img src={logo2} alt="Logo 1" className='logo  mt-3 ms-2' />
        
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
      value={formData.documento_persona}
      name="documento_persona"
      required
      
    />
  </Form.Group>


<Form.Group className="mb-3 " controlId="nombre">
    <Form.Label> <strong>Nombre </strong> </Form.Label>
    <Form.Control
      type="text"
      placeholder="Juan Perez"
      name='nombre_persona'
      onChange={handleChange}
      maxLength={50}
      minLength={2}
      required
      value={formData.nombre_persona}
    />
     
  </Form.Group>
  <Form.Group className="mb-3 " controlId="apellido">
    <Form.Label> <strong>Apellido</strong> </Form.Label>
    <Form.Control
      type="text"
      placeholder="Juan Perez"
      name='apellido_persona'
      onChange={handleChange}
      maxLength={50}
      minLength={2}
      required
      value={formData.apellido_persona}
    />
     
  </Form.Group>
  <Form.Group className="mb-3" controlId="genero">
  <Form.Label> <strong>Genero</strong> </Form.Label>
  <Form.Select 
    type="number"    
    onChange={(e) => handleChange(e, 2)}
    value={(formData.id_genero)} // Convirtiendo a número aquí
    name="id_genero"
    maxLength={2}
    required
  >
    <option value={0}>Seleccione Genero</option>
    <option value={1}>Masculino</option>
    <option value={2}>Femenino</option>
  </Form.Select>
</Form.Group>

  <Form.Group className="mb-3" controlId="email">
    <Form.Label> <strong>Email </strong> </Form.Label>
    <Form.Control
      type="email"
      placeholder="nombre@ejemplo.com"
      name="email_persona"
      onChange={handleChange}
      maxLength={70}
      required
      value={formData.email_persona}
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="telefono">
    <Form.Label> <strong>Telefono</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="4223456"
      name="telefono_persona"
      onChange={(e)=>handleChange(e,7)}
      value={formData.telefono_persona}
      
      
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="celular">
    <Form.Label> <strong>Celular</strong> </Form.Label>
    <Form.Control
      type="number"
      placeholder="3813456789"
      name="celular_persona"
      onChange={(e)=>handleChange(e,10)}
      value={formData.celular_persona}
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
      name="clave"
      onChange={handleChange}
      value={formData.clave}
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
      value={formData.domicilio_persona}
      name="domicilio_persona"
      maxLength={30}
      required
    />
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="nacimiento">
    <Form.Label> <strong> Fecha de nacimiento</strong></Form.Label>
    <DatePicker
          selected={formData.fecha_nacimiento_persona}
          onChange={handleChangeFecha}
          name="fecha_nacimiento_persona"
          dateFormat="dd/MM/yyyy"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={50}
          placeholderText="Selecciona una fecha"
          className="form-control"
          required
        />
  </Form.Group>



  <Form.Group className="mb-3" controlId="Provincia">
  <Form.Label> <strong>Provincia</strong> </Form.Label>
  <Form.Select 
    type="number"    
    onChange={(e) => handleChange(e, 2)}
    value={(formData.id_provincia)} // Convirtiendo a número aquí
    name="id_provincia"
    maxLength={2}
    required
  >
    <option value={0}>Seleccione Provincia</option>
    {provinciasArgentina.map((provincia, index) => (
      <option key={index} value={index + 1}>
        {provincia}
      </option>
    ))}
  </Form.Select>
</Form.Group>


  <Form.Group className="mb-3" controlId="Pais">
    <Form.Label> <strong>Pais</strong> </Form.Label>
    
 <Form.Select 
 type="number"    

 onChange={(e)=>handleChange(e,2)}
 value={formData.id_pais}
 name="id_pais"
 maxLength={2}
 required
 
 >
     <option value={0}>Seleccione Pais</option>
      {paisesAmerica.map((pais, index) => (
        <option key={index} value={index+1}>
          {pais}
        </option>
      ))}
      
      
    </Form.Select>
  </Form.Group>





  <Form.Group className="mb-3" controlId="Localidad">
    <Form.Label> <strong>Localidad</strong> </Form.Label>
    
 <Form.Control
 
 type="text"    
 onChange={handleChange}
 value={formData.localidad_persona}
 name="localidad_persona"
 placeholder='San Miguel de Tucumán'
 
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
 className='footerregistro d-flex flex-row  justify-content-center justify-content-sm-between'
 >
  <div  className='col-xs-12 text-center' >

  <img src={logo3} alt="Logo 1"className='logo3 mt-3 ms-2 mx-auto mb-2' />
  </div>
  <div className='mt-4 me-3 d-none d-sm-block'>
    <p className='text-light'>Desarrollado por: Dirección de innovación tecnológica</p>
  </div>

</footer>

{modalAbierto && (
  <Validacion 
  data={formData}
  cerrarModal={cerrarModal}
  setModalAbierto={setModalAbierto}
  />
)}       
           
    
    </>
  )
}
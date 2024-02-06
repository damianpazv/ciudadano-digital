import React, { useState } from 'react'
import '../css/registro.css';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap';
//import { Navigate } from 'react-router';
import logo from '../assets/Logo_Muni200x200.png';
import logo2 from '../assets/logo_municipalidad.png';
import logo3 from '../assets/logomuni_piedepagina.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import cdigitalApi from '../api/cdigitalAPI';
import { useNavigate } from 'react-router-dom/dist';


export const Validacion = (props) => {
   
  
    const { data, codverif,cerrarModal } = props;
    const [codigoIngresado, setCodigoIngresado] = useState('');
    const navigate = useNavigate();

    const validar = async (e)=>{
      e.preventDefault();
  
      if(codigoIngresado!=codverif)
      {
        return Swal.fire({
            icon: 'error',
            title: '¡Ups!',
            text: 'el codigo ingresado es incorrecto',                
          })

      }
  
 
  data.validado=true;

  ValidarCiudadanoDB(data);
  

  cerrarModal();
//   console.log(formData)
     
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


    const ValidarCiudadanoDB= async (data) =>
    {
    
        try{
            const resp=await cdigitalApi.put("/api/usuarios",data);
            
            Swal.fire({
              position: "center",
              icon: "success",
              title: `codigo correcto! registro validado `,
              showConfirmButton: false,
              timer: 2500
            });

            navigate("/login")
        }
    
        catch(error)
        {
        console.log(error);
        }
    }


    const handleChange = (e) => {

        setCodigoIngresado(
            e.target.value.slice(0, 4)
          );

           

     }



  return (
    <>

       
 <Modal  show={true} onHide={cerrarModal}>


 <Modal.Header closeButton >
          <Modal.Title>Le enviamos un email de validación a <strong>{data.email_ciudadano}</strong>  con un código de 4 dígitos</Modal.Title>
        </Modal.Header>


<ModalBody>

<Form  onSubmit={validar} className='m-1 p-3 '>
  

  <Form.Group className="mb-3" controlId="telefono">
    <Form.Label> <strong>Código de validación</strong> </Form.Label>
    <Form.Control
      type="number"
     
      name="codigo"
      onChange={(e)=>handleChange(e)}
       value={codigoIngresado}
      required
      
    />
  </Form.Group>

<div className='text-center'>
  <Button size='md' variant="primary" type="submit" className="w-50">
 Validar
</Button>
  </div>
 
  </Form>


</ModalBody>

<ModalFooter>

</ModalFooter>
    
 </Modal>





           
           
       
       
 

   
    
    </>
  )
}
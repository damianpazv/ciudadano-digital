import React, { useState } from 'react'
import '../css/registro.css';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, Modal, ModalBody, ModalFooter, Row } from 'react-bootstrap';
//import { Navigate } from 'react-router';
// import logo from '../assets/Logo_Muni200x200.png';
// import logo2 from '../assets/logo_municipalidad.png';
// import logo3 from '../assets/logomuni_piedepagina.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import cdigitalApi from '../api/cdigitalAPI';
import { useNavigate } from 'react-router-dom/dist';


export const Validacion = (props) => {
   
  
    const { data, codverif,cerrarModal } = props;
    const [codigoIngresado, setCodigoIngresado] = useState('');
    const[datos,setDatos]= useState({email_ciudadano:data.email_ciudadano,
    codigo_verif:codigoIngresado});
    const navigate = useNavigate();

    const validar = async (e)=>{
      e.preventDefault();
console.log(datos)


  ValidarCiudadanoDB(data);
  

  cerrarModal();
        
    }


    const ValidarCiudadanoDB= async (data) =>
    {
    
        try{
            const resp=await cdigitalApi.put("/api/usuarios",data.email_ciudadano,codigoIngresado);

            if(resp.data.ok)
            {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `codigo correcto! registro validado `,
                showConfirmButton: false,
                timer: 2500
              });
  
              navigate("/login")
            }

            else{
              return Swal.fire({
                icon: 'error',
                title: '¡Ups!',
                text: 'el codigo ingresado es incorrecto',                
              })

            }
            
          
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
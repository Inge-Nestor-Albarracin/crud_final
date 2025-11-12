import React from 'react';
import './Datos.css'; // css especifico del componente datos
import { useState } from 'react';
import axios from 'axios';

function Datos() {
     const[nombre,setNombre]=useState("");
    const[email,setEmail]=useState("");
    const[telefono,setTelefono]=useState("");

    const [usuariosList,setUsuarios]=useState([]);
    const add=()=>{
        axios.post("http://localhost:3001/create",{
          nombre:nombre,
          email:email,
          telefono:telefono
        }).then(()=>{
          alert("Usuario registrado")
        });
    }
    const getUsuarios=()=>{
    
    }
   return (
    <div className="container">
    <div className="card text-center">
        <div className="card-header">
          GESTION USUARIOS
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre</span>
          <input type="text" 
          onChange={(event)=>{
            setNombre(event.target.value); // apunto al valor insertado con el set value y status
          }}
          className="form-control" placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
    
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Email</span>
          <input type="email"
          onChange={(event)=>{
            setEmail(event.target.value)
          }}
          className="form-control" placeholder="Ingrese Email" aria-label="Email" aria-describedby="basic-addon1"/>
          </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Telefono</span>
          <input type="number"
          onChange={(event)=>{
            setTelefono(event.target.value)
          }}
          className="form-control" placeholder="Ingrese Telefono" aria-label="Telefono" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <button className="btn btn-success" onClick={add}>Registrar</button>
        </div>
    </div>

    </div>
  );
}

export default Datos;
import './App.css';
import Datos from './componentes/registrar/datos';
import ListarUsuarios from './componentes/List/listar';
import Login from "./componentes/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
function App() {
 
  return (
    <div className="App">
      <Datos></Datos>
      <ListarUsuarios></ListarUsuarios>
      <Login></Login>
    </div>
  );
}

export default App;

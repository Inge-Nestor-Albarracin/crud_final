import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListarUsuarios() {
    const [usuariosList, setUsuarios] = useState([]);
    const [editar, setEditar] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [datosEditados, setDatosEditados] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });

    const getUsuarios = () => {
        axios.get("http://localhost:3001/usuarios").then((response) => {
            setUsuarios(response.data);
        });
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const editarUsuario = (val) => {
        setEditar(true);
        setUsuarioEditando(val.id);
        setDatosEditados({
            nombre: val.nombre,
            email: val.email,
            telefono: val.telefono
        });
    }

    const guardarEdicion = (id) => {
        axios.put(`http://localhost:3001/usuarios/${id}`, datosEditados)
            .then(() => {
                alert("Usuario actualizado");
                setEditar(false);
                setUsuarioEditando(null);
                getUsuarios(); // Recargar la lista
            })
            .catch(error => {
                console.error("Error actualizando usuario:", error);
                alert("Error al actualizar usuario");
            });
    }

    const cancelarEdicion = () => {
        setEditar(false);
        setUsuarioEditando(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosEditados(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const eliminarUsuario = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            axios.delete(`http://localhost:3001/usuarios/${id}`)
                .then(() => {
                    alert("Usuario eliminado");
                    getUsuarios(); // Recargar la lista
                })
                .catch(error => {
                    console.error("Error eliminando usuario:", error);
                    alert("Error al eliminar usuario");
                });
        }
    }

    return (
        <div className='lista'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuariosList.map((val, key) => {
                            return <tr key={key}>
                                <th scope="row">{val.id}</th>
                                <td>
                                    {usuarioEditando === val.id ? (
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={datosEditados.nombre}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        val.nombre
                                    )}
                                </td>
                                <td>
                                    {usuarioEditando === val.id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={datosEditados.email}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        val.email
                                    )}
                                </td>
                                <td>
                                    {usuarioEditando === val.id ? (
                                        <input
                                            type="text"
                                            name="telefono"
                                            value={datosEditados.telefono}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    ) : (
                                        val.telefono
                                    )}
                                </td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        {usuarioEditando === val.id ? (
                                            <>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-success"
                                                    onClick={() => guardarEdicion(val.id)}
                                                >
                                                    Guardar
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-secondary"
                                                    onClick={cancelarEdicion}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-info"
                                                    onClick={() => editarUsuario(val)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-danger"
                                                    onClick={() => eliminarUsuario(val.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListarUsuarios;
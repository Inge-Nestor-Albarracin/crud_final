const express = require("express");
const app = express(); 
const mysql=require("mysql2"); // servidor genero problemas por version antigua, importamos 2
const cors=require("cors");
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({ // creamos una conexion a nuestra base de datos laragon y workbench
    host:"localhost",
    user:"root",
    password:"Vapoleon1*",
    database:"usuarios_app"
});

app.post("/create",(req,res)=>{ //mandamos un request y obtengo una respuesta
    const nombre=req.body.nombre;
    const email=req.body.email;
    const telefono=req.body.telefono;

    db.query('INSERT INTO usuarios(nombre,email,telefono) VALUES(?,?,?)',[nombre,email,telefono], // orden para insertar registros
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send("Usuario registrado con exito") //enviamos la respuesta si no hubo error
            }
        }
    );
  
}); 

app.get("/usuarios",(req,res)=>{ //mandamos un request y obtengo una respuesta
    
    db.query('SELECT * FROM usuarios', //orden para ver los registros
        (err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result) //enviamos la respuesta si no hubo error
            }
        }
    );
  
}); 

app.put("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, email, telefono } = req.body;

    db.query('UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?', 
        [nombre, email, telefono, id],
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al actualizar usuario");
            }else{
                res.send("Usuario actualizado con éxito");
            }
        }
    );
});

app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM usuarios WHERE id=?', [id],
        (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send("Error al eliminar usuario");
            }else{
                res.send("Usuario eliminado con éxito");
            }
        }
    );
});




app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});
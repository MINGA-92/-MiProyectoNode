
const Conexion= require('./Controles/Conexion');
const express= require('express');
const jwt= require('jsonwebtoken');
const router= express.Router();


router.get('/', (Peticion, Respuesta)=>{
    Respuesta.render('Login');    
});

//Login
router.get('/Login', (Peticion, Respuesta)=>{
    Respuesta.render('Login');
});

router.post('/auth', async(Peticion, Respuesta)=>{
    const Usuario= Peticion.body.usuario;
    const Pass= Peticion.body.pass;
    //let passwordHaash = await bcryptjs.hash(Pass, 8);
    console.log("Peticion= ", Peticion.body);
    console.log("User= ", Peticion.body.usuario);
    console.log("Pass= ", Peticion.body.pass);

    if(Usuario && Pass){
        Conexion.query("SELECT * FROM miapp_node_bd.tbl_usuarios WHERE Usu_Correo= '"+Usuario+"' AND Usu_Password= '"+Pass+"' AND Usu_Estado= 'Activo';", (error, Resultados, fields)=>{
            if(error){
                console.log("☠ eRrOr / En Consulta Login");
                throw error;
            }else{
                var CantidadResultados= Resultados.length;
                console.log("CantidadResultados: ", CantidadResultados);

                if(CantidadResultados == 0){
                    console.log("¡Usuario No Encontrado!");
                    Respuesta.render('Login', {alert:true, Title:"¡Usuario No Encontrado!  🤨", AlertMessage:"¡Email y/o Contraseña Incorrecta!", IconAlert:"error", MostrarBoton:true, timerAlert:false, ruta:"/Login"});
                }else{
                    console.log("Resultados: ", Resultados);
                    Peticion.session.loggedin = true;
                    Peticion.session.name = Resultados[0].Usu_Nombre;

                    Respuesta.render('Login', {alert:true, Title:"¡Acceso Concedido!  😉", AlertMessage:"¡Auntenticacion Completada!", IconAlert:"success", MostrarBoton:false, timerAlert:2000, ruta:"/Inicio", Resultados:Resultados});
                }

            };
        });

        /*
        //Json
        if(Peticion.body.usuario == 'minga' && Peticion.body.pass == '12345'){
            const PayLoad= {
                check: true
            };
            const token= jwt.sign(PayLoad, router.get('key'), {
                expiresIn: '11d'
            });
            Respuesta.json({
                message: "¡Validacion Exitosa!",
                token: token
            });
        }else{
            Respuesta.json({
                message: "¡Usuario y/o Contraseña Incorreta!",
            });
        }
        */
        
    }else{
        Respuesta.render('Login', {alert:true, Title:"¡Campo Vacio!  😪", AlertMessage:"¡Por Favor Ingresa Un Usuario y Una Contraseña!", IconAlert:"info", MostrarBoton:true, timerAlert:false, ruta:"/Login"});
    }
});

//Logout
router.get('/Logout', (Peticion, Respuesta)=>{
    //Seguridad De Sesion
    Peticion.session.destroy(()=>{
        Respuesta.redirect('/');
    })
});

//Ruta Principal
router.get('/Inicio', (Peticion, Respuesta)=>{
    //Seguridad De Sesion
    if(Peticion.session.loggedin){
        Respuesta.render('PaginaPrincipal', {login: true, name: Peticion.session.name});    
    }else{
        Respuesta.render('PaginaPrincipal', {login: false, name: "¡Debe Iniciar Sesion!"});
    }
    
});


//Redireccion a Litado De Usuarios
router.get('/ListadoUsuarios', (Peticion, Respuesta)=>{
    //Consulta si existen usuarios registrados
    Conexion.query('SELECT * FROM tbl_usuarios', (error, Resultados, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta");
            throw error;
        }else{
            Respuesta.render('ListadoUsuarios', {Resultados:Resultados});
        };
    });
});

//Redireccion a Registro De Usuarios
router.get('/Create', (Peticion, Respuesta)=>{
    Respuesta.render('Crear');
});

//Enviando Datos del formulario Para Insertar
const Guardando= require('./Controles/Guardar');
router.post('/GuardarUsuarios', Guardando.GuardarUsuarios);


//Redireccion a Actualizar Usuarios
router.get('/Editar/:ID_Usuario', (Peticion, Respuesta)=>{
    const IdUsuario= Peticion.params.ID_Usuario;
    ConsultaUsuario= "SELECT * FROM tbl_usuarios WHERE ID_Usuario='"+IdUsuario+"';";
    Conexion.query(ConsultaUsuario, (error, Resultados)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta");
            throw error;
        }else{
            console.log("Resultados=> ", Resultados);
            Respuesta.render('Editar', {User:Resultados[0]});
        };
    });
});

//Enviando Datos del formulario Para Actualizar
const Actualizando= require('./Controles/Actualizar');
router.post('/ActualizarUsuarios', Actualizando.ActualizarUsuarios);

//Redireccion a Eliminar Usuarios
router.get('/Eliminar/:ID_Usuario', (Peticion, Respuesta)=>{
    const IDUsuario= Peticion.params.ID_Usuario;
    console.log(IDUsuario)
    EliminarSQL= "DELETE FROM tbl_usuarios WHERE ID_Usuario= '"+IDUsuario+"';"
    console.log(IDUsuario)
    Conexion.query(EliminarSQL, function(error, result){
        if(error){
            console.log("☠ eRrOr / En La Eliminacion ");
            throw error;
        }else{
            console.log(result);
            console.log('¡Registro Eliminado Con Exito!');
            Respuesta.redirect('/');
        }
    });
});


router.get('/RutaPagina', (Peticion, Respuesta)=>{
    Respuesta.send('Contenido Pagina');
});

router.get('/Prueba', (Peticion, Respuesta)=>{
    Respuesta.send('');
});

module.exports= router;

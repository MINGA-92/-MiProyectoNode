
const Conexion= require('./Conexion');

exports.ActualizarUsuarios= (Peticion, Respuesta)=>{
    const IDUsuario= Peticion.body.IDUsuario
    const TipoDocu= Peticion.body.TipoDocu;
    const Documento= Peticion.body.Identificacion;
    const Nombre= Peticion.body.Nombre;
    const Correo= Peticion.body.Correo;
    const Cargo= Peticion.body.Cargo;
    const Pass= Peticion.body.Pass;
    const Estado= Peticion.body.Estado;
    console.log(IDUsuario+" / "+TipoDocu+" / "+Documento+" / "+Nombre+" / "+Cargo+" / "+Pass+" / "+Estado )

    ActualizacionSQL= "UPDATE tbl_usuarios SET Usu_TipoDocumento='"+TipoDocu+"', Usu_Documento='"+Documento+"', Usu_Nombre='"+Nombre+"', Usu_Correo='"+Correo+"', Usu_Cargo='"+Cargo+"', Usu_Password='"+Pass+"', Usu_Estado='"+Estado+"' WHERE ID_Usuario= '"+IDUsuario+"';";
    console.log(ActualizacionSQL);

    Conexion.query(ActualizacionSQL, function(error, result){
        if(error){
            console.log("☠ eRrOr / En La Actualizacion ");
            throw error;
        }else{
            console.log(result);
            console.log('¡Actualizado Con Exito!');
            Respuesta.redirect('/');
        }
    });
}
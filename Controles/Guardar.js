
const Conexion= require('./Conexion');

exports.GuardarUsuarios= (Peticion, Respuesta)=>{
    const TipoDocu= Peticion.body.TipoDocu;
    const Documento= Peticion.body.Identificacion;
    const Nombre= Peticion.body.Nombre;
    const Correo= Peticion.body.Correo;
    const Cargo= Peticion.body.Cargo;
    const Pass= Peticion.body.Pass;
    //const ConfirPass= Peticion.body.ConfirPass;
    console.log(TipoDocu+" / "+Documento+" / "+Nombre+" / "+Correo+" / "+Cargo+" / "+Pass)

    InsercionSQL= "INSERT INTO tbl_usuarios(Usu_TipoDocumento, Usu_Documento, Usu_Nombre, Usu_Correo, Usu_Cargo, Usu_Password, Usu_Estado) VALUES('"+TipoDocu+"', '"+Documento+"', '"+Nombre+"', '"+Correo+"', '"+Cargo+"', '"+Pass+"', 'Activo')";
    console.log(InsercionSQL);
    Conexion.query(InsercionSQL, function(error, result){
        if(error){
            console.log("☠ eRrOr / En La Insercion   .l.");
            throw error;
        }else{
            console.log(result);
            console.log('¡Usuario Registrado Con Exito!');
            Respuesta.redirect('/');
        }
    });
}

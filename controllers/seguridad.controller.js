
import * as sseguridad from '../services/seguridad.service.js'
import * as auth       from '../config/auth.js'

// Funciones exportables

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método Logueo

export const logueo = function(req, res){

    console.log("------------controller------------");

    const objLogin = req.body
    console.log(objLogin)
    sseguridad.logueo(objLogin)
    .then( result =>{

        console.log("....despues de sseguridad.logueo()");
        res.json(result || []);


        })
    .catch(
        err => {
        res.status(500).json({"error":"Error logueandose"});
    }
)}

// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩  Método Login

export const login = function (req, res) {
    console.log("------------controller------------");
    const reqUsuario = req.body;
    console.log(reqUsuario)
    
    sseguridad.login(reqUsuario)
    .then((usuarios) => {
        //Validar que exista usuario
        if (usuarios[0]) {

            //Validar que la contraseña seal a misma a la almacenada en BD

            if (usuarios[0].pass_usuario == reqUsuario.pass_usuario) {

                let token = auth.generateToken(usuarios[0])
                let refreshToken = auth.generateRefreshToken(usuarios[0])

                console.log(`Token: ${token}`)
                console.log(`RefreshToken: ${refreshToken}`)

                // Respuesta al cliente
                res.json(
                    {
                        token,
                        refreshToken,
                        "user":{
                            "id_usuario": usuarios[0].id_usuario,
                            "correo_usuario": usuarios[0].correo_usuario,
                            "rol_usuario": usuarios[0].rol_usuario,
                        }
                    }
                )
            } else {
                res.status(403).json({"error":"Acceso no autorizado"})
            }

        } else{
            res.status(403).json({"error":"Acceso no autorizado"})
        }
      }
    )
    .catch(err => {
        console.log(err);
        res.status(500).json({"error":"Error obteniendo registros"});
    });
}


// ⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩⟨~⟩ Método Refresh Token

export const refreshToken = function (req, res) {
    console.log("------------Seguridad controller------------");
    const {refreshToken} = req.body;
    console.log(`RefreshToken: ${refreshToken}`)

    if (!refreshToken) {
        return res.status(401).json({"error":"Refresh token requerido"});
    }
    const decoded = auth.verifyRefreshToken(refreshToken)

    console.log(`Decoded(playload):`)
    console.log(decoded)
    console.log(`Decoded(playload) con ID:`)
    console.log(decoded.id_persona)

    sseguridad.findUserById(decoded.id_persona)
    .then(usuarios =>{
        console.log(`Resultado del finById:`)
        console.log(usuarios)

        if (usuarios[0]) {

            let token = auth.generateToken(usuarios[0])
            console.log(`Token: ${token}`)

            res.json( 
                { 
                    token, 
                    "user":{
                        "id_usuario": usuarios[0].id_usuario,
                        "correo_usuario": usuarios[0].correo_usuario,
                        "rol_usuario": usuarios[0].rol_usuario,
                    }
                } );
        } else{
            res.status(403).json( {"error":"Acceso no autorizado"} );
        }
    }
    )
    .catch(
        err =>{
            console.log(err);
            res.status(500).json({"error":"Error obteniendo registros"});  
        }
    )

}
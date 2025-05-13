import { Sequelize, DataTypes } from 'sequelize';
import orm from '../config/sequelize.js';

export const Usuario = orm.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_usuario: {
        type: DataTypes.STRING(100)
    },
    ape_usuario: {
        type: DataTypes.STRING(100)
    },
    correo_usuario: {
        type: DataTypes.STRING(150)
    },
    pass_usuario: {
        type: DataTypes.STRING(255)
    },
    tipo_doc_usuario: {
        type: DataTypes.STRING(20)
    },
    nro_doc_usuario: {
        type: DataTypes.STRING(20)
    },
    ubigeo: {
        type: DataTypes.STRING(10)
    },
    cod_telef_usuario: {
        type: DataTypes.STRING(10)
    },
    telef_usuario: {
        type: DataTypes.STRING(20)
    },
    ingreso_usuario: {
        type: DataTypes.DATE
    },
    num_errores_usuario: {
        type: DataTypes.INTEGER
    },
    otp_usuario: {
        type: DataTypes.STRING(10)
    },
    Activo: {
        type: DataTypes.BOOLEAN
    },
    rol_usuario: {
        type: DataTypes.STRING(50),
        defaultValue: 'cliente'
    }
}, {
    tableName: 'tb_usuario',
    timestamps: false,
    freezeTableName: true
});

// Funciones auxiliares

export const connect = async function() {
    await orm.authenticate();
    console.log("Conexión con la base de datos establecida");
};

// Funciones CRUD Básicas

export const getAll = async function() {
    const usuarios = await Usuario.findAll();
    return usuarios.map(u => u.toJSON());
};

export const getById = async function(id) {
    const usuario = await Usuario.findByPk(id);
    return usuario ? usuario.toJSON() : null;
};

export const create = async function(objUsuario) {
    const usuario = await Usuario.create(objUsuario);
    return usuario.toJSON();
};

export const update = async function(id, objUsuario) {
    const [updatedRows] = await Usuario.update(objUsuario, {
        where: { id_usuario: id }
    });
    return updatedRows;
};

export const deletes = async function(id) {
    const [updatedRows] = await Usuario.update({ Activo: false }, {
        where: { id_usuario: id }
    });
    return updatedRows;
};

// Métodos de Seguridad (agregados)

export const login = async (correo_usuario) => {
    return await Usuario.findAll({ where: { correo_usuario } });
};


export const incrementarErrores = async function(id_usuario, erroresActuales) {
    const activo = erroresActuales + 1 >= 3 ? 0 : 1;
    const [updatedRows] = await Usuario.update(
        { num_errores_usuario: erroresActuales + 1, Activo: activo },
        { where: { id_usuario } }
    );
    return updatedRows;
};

export const resetearErrores = async function(id_usuario) {
    const [updatedRows] = await Usuario.update(
        { num_errores_usuario: 0 },
        { where: { id_usuario } }
    );
    return updatedRows;
};

export const generarOTP = async function(correo_usuario) {
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();
    const [updatedRows] = await Usuario.update(
        { otp_usuario: otp },
        { where: { correo_usuario } }
    );
    if (updatedRows === 0) throw new Error("Correo no registrado");
    return otp;
};

export const verificarOTP = async function(correo_usuario, otp, nuevaPassword) {
    const usuario = await Usuario.findOne({ where: { correo_usuario, otp_usuario: otp } });
    if (!usuario) throw new Error("OTP inválido");
    
    const [updatedRows] = await Usuario.update(
        { pass_usuario: nuevaPassword, Activo: 1, num_errores_usuario: 0, otp_usuario: null },
        { where: { correo_usuario } }
    );
    return updatedRows;
};

export const findUserById = async (id_usuario) => {
    return await Usuario.findAll({
        attributes: ['id_usuario', 'nom_usuario', 'correo_usuario', 'pass_usuario', 'rol_usuario'],
        where: { id_usuario, Activo: true }
    });
};

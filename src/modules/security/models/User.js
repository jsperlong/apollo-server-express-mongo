import mongoose from 'mongoose';

var uniqueValidator = require('mongoose-unique-validator');

// Defining user Mongoose Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, dropDups: true},
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        validate: {
            validator: function (value) {
                let r = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return r.test(value);
            },
            message: "El email no tiene un formato valido"
        }
    },
    password: {type: String, required: true},
    name: {type: String, required: true},
    active: {type: Boolean, required: true, default: false},
    phone: {
        type: String,
        required: false,
        validate: {
            validator: function (value) {
                let r = /[0-9]+/;
                return value ? r.test(value): true;
            },
            message: "Telefono no tiene un formato valido"
        }
    },
    avatar: String,
    avatarurl: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true, default: Date.now},
});

UserSchema.set('toJSON', {getters: true});

UserSchema.plugin(uniqueValidator, {message: '{VALUE} ya existe. {PATH} debe ser unico.'});

export const User = mongoose.model('User', UserSchema);
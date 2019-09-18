import { Schema, model } from 'mongoose';
import Types from './TypesSchemas/TypeValueMode';
import UserInterface from '../Interfaces/User_Interface';

const UserSchema = new Schema({
    nameUser: Types['typegStringUnique'],
    emailUser: Types['typegStringUnique'],
    passwordUser: Types['typegStringNoUnique'],
    roleUser: Types['typegStringNoUnique'],
    saltPassword: Types['typegStringNoUnique'],
    stateUser: Types['typeBoolean']
});

const UserModel = model<UserInterface>('user_model', UserSchema);
export default UserModel;

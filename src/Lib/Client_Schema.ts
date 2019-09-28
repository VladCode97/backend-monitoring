import { Schema, model } from 'mongoose';
import Types from './TypesSchemas/TypeValueMode';
import ClientInterface from '../Interfaces/Client_Interface';

const ClientSchema = new Schema({
    nameClient: Types['typegStringUnique'],
    hostClient: Types['typegStringUnique'],
    aliasClient: Types['typegStringUnique'],
    emailClient: Types['typegStringUnique'],
    stateClient: Types['typeBoolean']
});

const ClientModel = model<ClientInterface>('client_model', ClientSchema);
export default ClientModel;
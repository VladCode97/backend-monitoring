import { Document } from "mongoose";

export default interface UserInterface extends Document {
    nameUser: string;
    emailUser: string;
    passwordUser: string;
    roleUser: string;
    saltPassword: string;
    stateUser: boolean;
}
import { Document } from "mongoose";

export default interface ClientInterface extends Document {
    nameClient: string;
    hostClient: string;
    aliasClient: string;
    emailClient: string;
    stateClient: boolean;
}
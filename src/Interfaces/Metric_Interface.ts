import { Document } from "mongoose";
import ClientInterface from "./Client_Interface";

export default interface MetricInterface extends Document{
    client: ClientInterface,
    latenceClient: object,
    keepALive: boolean
}
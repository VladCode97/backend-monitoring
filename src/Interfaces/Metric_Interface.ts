import { Document } from "mongoose";

export default interface MetricInterface extends Document{
    latenceClient: object,
    keepALive: boolean
}
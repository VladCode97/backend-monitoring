import { Schema, model } from 'mongoose';
import Types from './TypesSchemas/TypeValueMode';
import MetricInterface from '../Interfaces/Metric_Interface';

const MetricSchema = new Schema({
    metricClient: {
        type: Schema.Types.ObjectId,
        ref: 'clientModel'
    },
    keepALiveWebsiteClient: Types['typeBoolean'],
    latenceClient: Types['typeObject']
}, { timestamps: true });

export const UserModel = model<MetricInterface>('client_model', MetricSchema);
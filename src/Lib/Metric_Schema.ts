import { Schema, model } from 'mongoose';
import Types from './TypesSchemas/TypeValueMode';
import MetricInterface from '../Interfaces/Metric_Interface';

const MetricSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client_model'
    },
    keepALiveWebsiteClient: Types['typeBoolean'],
    latenceClient: Types['typeObject']
}, { timestamps: true });

export const MetricModel = model<MetricInterface>('metric_model', MetricSchema);
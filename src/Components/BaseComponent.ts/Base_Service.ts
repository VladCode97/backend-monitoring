import { Document, Model } from 'mongoose';

export default class BaseService<T extends Document> {

    public modelSchema: Model<T>;

    constructor(modelSchema: Model<T>) {
        this.modelSchema = modelSchema;
    }

    create(body: any = {}) {
        return this.modelSchema.create({ ...body }).catch((error) => error);
    }

    views() {
        return this.modelSchema.find({});
    }

    viewByFilter(body: any = {}) {
        return this.modelSchema.findOne({ ...body })
    }

    viewByFilterAll(body: any = {}) {
        return this.modelSchema.find({ ...body })
    }

    viewByPopulateModel(limit: number, modelPopulate: string) {
        return this.modelSchema.find({}, {}, { sort: { '_id': -1 }, limit }).populate(modelPopulate)
    }

    viewAgregateByModel(agregations: Array<any>) {
        return this.modelSchema.aggregate(agregations);
    }

    updateByFilter(conditions = {}, objectUpdate = {}) {
        return this.modelSchema.findOneAndUpdate(
            { ...conditions },
            { ...objectUpdate },
            { new: true }
        )
    }


}
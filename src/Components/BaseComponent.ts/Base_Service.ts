import { Document, Model } from 'mongoose';

export default class BaseService<T extends Document> {

    public modelSchema: Model<T>;

    constructor(modelSchema: Model<T>) {
        this.modelSchema = modelSchema;
    }

    create(body: any = {}) {
        return this.modelSchema.create({ ...body }).then((data) => console.log(data)).catch((error) => error);
    }

    views() {
        return this.modelSchema.find({});
    }

    viewByFilter(body: any = {}) {
        return this.modelSchema.find({ ...body })
    }


    updateByFilter(conditions = {}, objectUpdate = {}) {
        return this.modelSchema.findByIdAndUpdate(
            { ...conditions },
            { ...objectUpdate },
            { new: true }
        )
    }


}
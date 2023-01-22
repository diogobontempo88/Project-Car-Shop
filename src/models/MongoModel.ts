import { Model as MongooseCreateModel } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: MongooseCreateModel<T>;

  constructor(model: MongooseCreateModel<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read():Promise<T[]> {
    return this._model.find({});
  }

  public async readOne(_id:string):Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    return this._model.findOneAndUpdate({ _id }, { ...obj });
  }

  public async delete(_id:string):Promise<T | null> {
    return this._model.findOneAndDelete({ _id });
  }
}

export default MongoModel;
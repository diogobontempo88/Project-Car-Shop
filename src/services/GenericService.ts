import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

abstract class GenericService<T> implements IService<T> {
  protected _model: IModel<T>;

  constructor(model: IModel<T>) {
    this._model = model;
  }

  abstract create(obj:T):Promise<T>;

  public async read():Promise<T[]> {
    return this._model.read();
  }

  public async readOne(_id:string):Promise<T | null> {
    return this._model.readOne(_id);
  }

  abstract update(_id:string, obj:T):Promise<T | null>;

  public async delete(_id:string):Promise<T | null> {
    return this._model.delete(_id);
  }
}

export default GenericService;
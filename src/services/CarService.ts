import { ICar, carZodSchema } from '../interfaces/ICar';
import GenericService from './GenericService';

class CarService extends GenericService<ICar> {
  public async create(obj:unknown):Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error; 
    }
    return this._model.create(parsed.data);
  }

  public async update(_id:string, obj:ICar):Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error; 
    }
    return this._model.update(_id, parsed.data);
  }
}

export default CarService;
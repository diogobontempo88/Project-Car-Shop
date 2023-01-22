import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  private _service: IService<ICar>;

  constructor(service:IService<ICar>) {
    this._service = service; 
  }

  public async create(
    req: Request, 
    res: Response<ICar | ZodError | string>,
  ) {
    const { id, model, year, color, buyValue, seatsQty, doorsQty, status } = req.body;
    const car = { id, model, year, color, buyValue, seatsQty, doorsQty, status };
    try {
      const results = await this._service.create(car);
      return res.status(201).json(results);
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json(e); 
      }
      return res.status(500).json('Error Internal');
    }
  }

  public async update(
    req: Request, 
    res: Response<ICar | ZodError | string | object>,
  ) {
    const { model, year, color, buyValue, seatsQty, doorsQty, status } = req.body;
    const { id } = req.params;
    const car = { id, model, year, color, buyValue, seatsQty, doorsQty, status };
    try {
      const result = await this._service.update(id, car);
      return res.status(200).json({ result });
    } catch (e) {
      if (e === null) {
        return res.status(404).json();
      }
      return res.status(400).json();
    }
  }

  public async readOne(
    req: Request,
    res: Response<ICar | string | object>,
  ) {
    const { id } = req.params;
    if (isValidObjectId(id)) { 
      const result = await this._service.readOne(id);
      if (result === null) {
        return res.status(404).json({ error: 'Object not found' });
      }
      return res.status(200).json(result);
    }
    return res.status(400).json({ error: 'Id must have 24 hexadecimal characters' });
  }

  public async read(
    req: Request,
    res: Response<ICar[] | string>,
  ) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async delete(
    req: Request,
    res: Response<ICar | string | object>,
  ) {
    const { id } = req.params;
    if (isValidObjectId(id)) { 
      const result = await this._service.delete(id);
      if (result === null) {
        return res.status(404).json({ error: 'Object not found' });
      }
      return res.status(204).json();
    }
    return res.status(400).json({ error: 'Id must have 24 hexadecimal characters' });
  }
}

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import CarController from '../../../controllers/CarController';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { ICar } from '../../../interfaces/ICar';

const carMock:ICar = {
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };
  
  const carMockWithId:ICar & { _id:string } = {
    _id: "4edd40c86762e0fb12000003",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  };

  describe('Car Controller', () => {
    const carModel = new CarModel()
    const carService = new CarService(carModel);
    const carController = new CarController(carService);
    const req = {} as Request; 
    const res = {} as Response;
  
    before(() => {
      sinon.stub(carService, 'create').resolves(carMock);
      sinon.stub(carService, 'readOne').resolves(carMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => {
      sinon.restore()
    })
  
    describe('Create Car', () => {
      it('Success', async () => {
        req.body = carMock;
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      });
    });
  
    describe('ReadOne Car', () => {
      it('Success', async () => {
       req.params = { id: carMockWithId._id };
        await carController.readOne(req, res);
  
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
      });
    });
});

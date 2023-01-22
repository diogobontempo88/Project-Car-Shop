import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { ICar } from "../../../interfaces/ICar";



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

  describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne')

        .onCall(0).resolves(carMockWithId) 

        .onCall(1).resolves(null); 

    sinon.stub(carModel, 'delete')
    .onCall(0).resolves(carMockWithId)
    .onCall(1).resolves(null);
})
after(() => {
    sinon.restore()
})
describe('Create Car', () => {
    it('Success', async () => {
        const carCreated = await carService.create(carMock);

        expect(carCreated).to.be.deep.equal(carMockWithId);
    });

});

describe('ReadOne Car', () => {
    it('Success', async () => {
        const carListed = await carService.readOne(carMockWithId._id);

        expect(carListed).to.be.deep.equal(carMockWithId);
    });
});

describe('Delete Car', () => {
    it('Success', async () => {
        const car = await carService.delete(carMockWithId._id);
        expect(car).to.be.deep.equal(carMockWithId);
    });
})
});

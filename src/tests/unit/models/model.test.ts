import { ICar } from "../../../interfaces/ICar";
import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';


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

  describe('Car Model', () => {
    const carModel = new CarModel();
  
      before(() => {
          sinon.stub(Model, 'create').resolves(carMockWithId);
          sinon.stub(Model, 'findOne').resolves(carMockWithId);
      });
  
      after(() => {
          sinon.restore();
      });

      describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('4edd40c86762e0fb12000003');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
  
  });


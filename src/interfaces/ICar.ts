import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});
  
  type ICar = z.infer<typeof carZodSchema>;
  
export { carZodSchema, ICar };

import 'dotenv/config';
import { z } from 'zod';

const envSchema = z
  .object({
    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
  })
  .required();

export default envSchema.parse(process.env);

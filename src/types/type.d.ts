import { z } from 'zod';

const NumberArg = z.number();
const StringArg = z.string();

type NumberArg = z.infer<typeof NumberArg>;
type StringArg = z.infer<typeof StringArg>;

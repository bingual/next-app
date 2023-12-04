import { z } from 'zod';

const SignupFormTypes = z.object({
    username: z.string(),
    password: z.string(),
});

type SignupFormTypes = z.infer<typeof SignupFormTypes>;

const LoginFormTypes = z.object({
    username: z.string(),
    password: z.string(),
    remember: z.boolean(),
});

type LoginFormTypes = z.infer<typeof LoginFormTypes>;

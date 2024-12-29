import { z } from 'zod';

export const createBetValidationSchema = z
  .object({
    gameId: z.string().nonempty(),
    betAmount: z.string().email(),
    winningAmount: z.string().email(),
    betNumber: z.number({ required_error: 'Password is mandatory' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });


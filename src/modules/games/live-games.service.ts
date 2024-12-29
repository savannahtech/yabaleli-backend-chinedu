import { AppError } from "../../exceptions/app";

type ProcessChunk<T> = (chunk: T[]) => Promise<void>;

export const processBatch = async (payload: T[], chunkSize: number, processChunk: ProcessChunk<T>): Promise<void> => {
  if (chunkSize <= 0) {
    throw new AppError('chunkSize must be greater than 0.', 400);
  }
  for (let i = 0; i < payload.length; i += chunkSize) {
    const chunk = payload.slice(i, i + chunkSize);
    await processChunk(chunk);
  }
};

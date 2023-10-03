export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSucess<T> = {
  status: 'SUCCESSFUL',
  data: T
};

export type roleMsg<M> = {
  status?: 'SUCCESSFUL' | 'NOT_FOUND',
  role: M | string,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSucess<T>;

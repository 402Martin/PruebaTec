enum ErrorStatusCodes {
  BAD_REQUEST = 400,

  UNAUTHORIZED = 401,
  FORBIDDEN = 403,

  NOT_FOUND = 404,

  SERVER_ERROR = 500,
}

const ErrorNames = {
  BAD_REQUEST: [
    'SequelizeValidationError',
    'AxiosError',
    'Error',
    'SequelizeUniqueConstraintError',
    'SequelizeDatabaseError',
  ],
};

type Error = {
  message: string;
  type: ErrorStatusCodes | undefined;
  stack?: any;
  sqlMessage?: any;
  name: string;
};

export { ErrorStatusCodes, Error, ErrorNames };

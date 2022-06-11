import { Error, ErrorNames, ErrorStatusCodes } from '../types';

const parseSequelizeValidation = (message: any): string => message.split(',\n');

const parseError = (err: any): Error => {
  const error: Error = {
    name: err.name,
    message: err.message,
    type: err.setType,
    stack: err.stack,
    sqlMessage: err.original?.sqlMessage || err.errors,
  };
  if (ErrorNames.BAD_REQUEST.find((name) => name === err.name)) {
    if (err.name.includes('Sequelize')) {
      error.message = parseSequelizeValidation(error.message);
    }
    error.type = ErrorStatusCodes.BAD_REQUEST;
  }

  return error;
};

export default parseError;

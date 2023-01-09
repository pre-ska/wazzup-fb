import { validate } from 'validate.js';

export const validateString = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    // da nemam više error messaga odjednom.....prazno i nije char
    constraints.format = {
      pattern: '[a-z]+',
      flags: 'i',
      message: 'value can contain letters',
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validateEmail = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    constraints.email = true;
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validatePassword = (id, value) => {
  const constraints = {
    presence: { allowEmpty: false },
  };

  if (value !== '') {
    constraints.length = {
      minimum: 6,
      message: 'must be at least 6 characters',
    };
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  const constraints = {
    presence: { allowEmpty },
  };

  if (!allowEmpty || value !== '') {
    // da nemam više error messaga odjednom.....prazno i nije char
    constraints.length = {};

    if (minLength) {
      constraints.length.minimum = minLength;
    }
    if (maxLength) {
      constraints.length.maximum = maxLength;
    }
  }

  const validationResult = validate({ [id]: value }, { [id]: constraints });
  return validationResult && validationResult[id];
};

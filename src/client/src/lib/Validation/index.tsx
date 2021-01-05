export const required = (value: any) => (value ? undefined : 'Feltet må fylles ut!');

export const email = (value: any) => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? undefined : 'Fyll inn gyldig e-mail!';
};

export const phone = (value: any) => {
  if (!isNaN(value)) {
    if (value.match(/\d/g).length === 8) {
      return undefined;
    }
    return 'Ugyldig telefonnummer';
  }
  return 'Må være et nummer';
};

export const minLength = (min: number) => (value: any) => {
  value = value.replace(/(<([^>]+)>)/gi, '');
  return value.length >= min ? undefined : `Må være lengre enn ${min} karakterer.`;
};

export const mustBeNumber = (value: any) => (isNaN(value) ? 'Må være et nummer.' : undefined);

export const minValue = (min: number) => (value: any) => (isNaN(value) || value >= min ? undefined : `Må være større enn ${min}.`);

/**
 *   usage:
 *   validate={composeValidators(required, mustBeNumber, minValue(18))}
 */
export const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

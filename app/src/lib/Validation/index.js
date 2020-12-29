
export const required = value => value ? undefined : 'Feltet må fylles ut!';

export const email = value => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value) ? undefined : 'Fyll inn gyldig e-mail!';
}

export const mustBeNumber = value => (isNaN(value) ? 'Må være et nummer.' : undefined);

export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Må være større enn ${min}.`;

/** 
*   usage: 
*   validate={composeValidators(required, mustBeNumber, minValue(18))} 
*/
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
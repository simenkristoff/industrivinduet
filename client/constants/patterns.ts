/**
 * Validates phone numbers
 *
 * Format:
 * @variation xxx-xx-xxx
 * @variation xxx.xx.xxx
 * @variation xxx xx xxx
 * @variation xxxxxxxxx
 */
export const phonePattern = new RegExp(
  /^(\s*(?:\+?(\d{1}))?[-. (]*(\d{3})[-. )]*(\d{2})[-. ]*(\d{3})(?: *x(\d+))?\s*)$/,
  'gm',
);

/**
 * Validates organization numbers
 */
export const orgPattern = new RegExp(/^([0-9]{4}:)?([0-9]{9})$/, 'gm');

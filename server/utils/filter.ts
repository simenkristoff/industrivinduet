/**
 * Namespace Filter holds functions for manipulation fields of input.
 *
 * @namespace Filter
 */
namespace Filter {
  /**
   * Transforms the first letter in a text to uppercase.
   *
   * @function
   * @memberof Filter
   *
   * @param {string} text the text to transform
   * @returns {string} transformed text.
   */
  export function capitalize(text: string): string {
    return text.trim()[0].toUpperCase() + text.slice(1).toLowerCase();
  }

  /**
   * Transforms all letters to lowercase
   *
   * @function
   * @memberof Filter
   *
   * @param {string} text the text to transform
   * @returns {string} transformed text.
   */
  export function lowerCase(text: string): string {
    return text.toLowerCase();
  }

  /**
   * Transforms all the first letter of each word to uppercase
   *
   * @function
   * @memberof Filter
   *
   * @param {string} text the text to transform
   * @returns {string} transformed text.
   */
  export function titleCase(text: string): string {
    var words = text.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
  }
}

export default Filter;

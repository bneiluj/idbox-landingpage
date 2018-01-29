/*
 * This function captialized the first letter of a string and returns it
 */

export default function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
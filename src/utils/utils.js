/**
 *
 * @export
 * @param {Array} arr
 * @param {Function} f
 * @returns {Array}
 * @Description 对数组进行分组
 */
// eslint-disable-next-line import/prefer-default-export
export const groupBy = (arr, f) => {
  const groups = {};
  arr.forEach(item => {
    const group = JSON.stringify(f(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.keys(groups).map(group => groups[group]);
};

/**
 *
 * @export
 * @param {Array} arr
 * @param {Function} f
 * @returns {Array}
 * @description 对数组进行分组
 */
export const groupBy = (arr, f) => {
  const groups = {};
  arr.forEach(item => {
    const group = JSON.stringify(f(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });
  return Object.keys(groups).map(group => groups[group]);
};

/**
 *
 *
 * @param {Number} arrayLength
 * @param {Number} index
 * @returns {String} 颜色值
 * @description 不定长度数组对象循环显示固定颜色值
 */
export const getTagColor = (arrayLength, index) => {
  let targetColor = '';
  const color = [
    'magenta',
    'blue',
    'red',
    'purple',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'geekblue',
  ];
  const colorLength = color.length;
  if (index >= colorLength) {
    targetColor = getTagColor(arrayLength - colorLength, index - colorLength);
  } else {
    targetColor = color[index];
  }

  return targetColor;
};

import _ from 'lodash';

export default (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const tree = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return [key, { type: 'new', value: data2[key] }];
    }
    if (!_.has(data2, key)) {
      return [key, { type: 'not', value: data1[key] }];
    }
    if (data1[key] !== data2[key]) {
      return [key, { type: 'changed', value1: data1[key], value2: data2[key] }];
    }
    return [key, { type: 'equally', value: data1[key] }];
  });
  return _.fromPairs(tree);
};

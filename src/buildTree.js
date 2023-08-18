import _ from 'lodash';

const buildTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const tree = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return [key, { type: 'new', value: data2[key] }];
    }
    if (!_.has(data2, key)) {
      return [key, { type: 'not', value: data1[key] }];
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [key, { type: 'nested', children: buildTree(data1[key], data2[key]) }];
    }
    if (data1[key] !== data2[key]) {
      return [key, { type: 'changed', value1: data1[key], value2: data2[key] }];
    }
    return [key, { type: 'equally', value: data1[key] }];
  });
  return _.fromPairs(tree);
};

export default buildTree;

import _ from 'lodash';

const stringValue = (value) => {
    if (_.isPlainObject(value)) return '[complex value]';
    if (_.isString(value)) return `'${value}'`;
    return `${value}`;
};

export default (tree) => {
    const iter = (currentValue, nameChild = '') => {
        const buildedResult = Object
          .entries(currentValue)
          .flatMap(([key, info]) => {
            switch (info.type) {
                case 'new':
                  return `Property '${nameChild}${key}' was added with value: ${stringValue(info.value)}`;
                case 'not':
                  return `Property '${nameChild}${key}' was removed`;
                case 'nested':
                  return iter(info.children, `${nameChild}${key}.`);
                case 'changed':
                  return `Property '${nameChild}${key}' was updated. From ${stringValue(info.value1)} to ${stringValue(info.value2)}`;
                default:
                  return [];
              }
          });
        return [...buildedResult].join('\n');
    };
    return iter(tree);
};

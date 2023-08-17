import _ from 'lodash';

export default (tree) => {
    if (!_.isPlainObject(tree)) {
      return `${tree}`;
    }
    const buildedResult = Object
      .entries(tree)
      .map(([key, info]) => {
        switch (info.type) {
          case 'new': 
            return `  + ${key}: ${info.value}`
          case 'not':
            return `  - ${key}: ${info.value}`
          case 'equally':
            return `    ${key}: ${info.value}`
          case 'changed':
            return `  - ${key}: ${info.value}\n  + ${key}: ${info.value}`;
          default:
            return `    ${key}: ${info.value}`;
        }
      });
    return ['{', ...buildedResult, ` }`].join('\n');
};

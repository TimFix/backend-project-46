import _ from 'lodash';

const getIndent = (depth, space = ' ', spaceLength = 4) => space.repeat(depth * spaceLength - 2);
const getBracketIndent = (depth, space = ' ', spaceLength = 4) => space.repeat((depth - 1) * spaceLength);

export default (tree) => {
  const iter = (currentValue, depth = 1) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }

    const buildedResult = Object
      .entries(currentValue)
      .map(([key, info]) => {
        switch (info.type) {
          case 'new':
            return `${getIndent(depth)}+ ${key}: ${iter(info.value, depth + 1)}`;
          case 'not':
            return `${getIndent(depth)}- ${key}: ${iter(info.value, depth + 1)}`;
          case 'equally':
            return `${getIndent(depth)}  ${key}: ${iter(info.value, depth + 1)}`;
          case 'nested':
            return `${getIndent(depth)}  ${key}: ${iter(info.children, depth + 1)}`;
          case 'changed':
            return `${getIndent(depth)}- ${key}: ${iter(info.value1, depth + 1)}\n${getIndent(depth)}+ ${key}: ${iter(info.value2, depth + 1)}`;
          default:
            return `${getIndent(depth)}  ${key}: ${iter(info.value || info, depth + 1)}`;
        }
      });
    return ['{', ...buildedResult, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(tree);
};

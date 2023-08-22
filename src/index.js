import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatter from './formatters/index.js';
import buildTree from './buildTree.js';

const getFileInfo = (file) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', file));
  const format = path.extname(file).substring(1);
  return parse(data, format);
};

export default (filepath1, filepath2, format = 'stylish') => {
  const file1 = getFileInfo(filepath1);
  const file2 = getFileInfo(filepath2);
  return formatter(buildTree(file1, file2), format);
};

import { load } from 'js-yaml';

export default (data, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown extension ${extension}`);
  }
};

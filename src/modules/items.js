export default (list) => {
  if (list === null || list === undefined) {
    throw new Error('List does not exist!');
  }
  return list.childElementCount;
};
export default (popupList) => {
  if (popupList === null || popupList === undefined) {
    return 0;
  }
  return popupList.childElementCount;
};

export const optionalKeyValidation = (key: number | string, expectedReturn) => {
  if (key !== null && key !== undefined) {
    return expectedReturn;
  }
  return {};
};

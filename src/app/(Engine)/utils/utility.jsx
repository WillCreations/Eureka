export const convertDbObj = (input) => {
  const intermediate = JSON.stringify(input);
  return JSON.parse(intermediate);
};

const capitalizeFirstLetter = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return string;
};

export { capitalizeFirstLetter };

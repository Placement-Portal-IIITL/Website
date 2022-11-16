// Debounce to delay query search
export const debounce = (event) => {
  let timer;
  return (newEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      event.apply(this, [newEvent]);
    }, 500);
  };
};

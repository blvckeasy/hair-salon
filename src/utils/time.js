function addMinutes(minutes) {
  const date = new Date()
  return new Date(date.getTime() + minutes*60000);
}

// console.log(new Date());
// console.log(addMinutes(5));

export {
  addMinutes,
}
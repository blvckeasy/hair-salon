function addMinutes(minutes) {
  const date = new Date()
  return new Date(date.getTime() + minutes*60000);
}


export {
  addMinutes,
}
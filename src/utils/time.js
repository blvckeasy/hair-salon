function addMinutes(minutes) {
  let date = new Date()
  date = new Date(date.getTime() + minutes*60000);
  console.log(date)
  return date
}


export {
  addMinutes,
}
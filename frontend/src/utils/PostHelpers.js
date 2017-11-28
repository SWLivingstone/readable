
export function getTimePassed(timestamp) {
  const totalSecondsDiff = Math.abs(timestamp - Date.now()) / 1000;
  const days = Math.floor(totalSecondsDiff / 86400)
  const hours = Math.floor(totalSecondsDiff / 3600) % 24
  const minutes = Math.floor(totalSecondsDiff / 60) % 60

  if (days > 0)
    return `${days} days ${hours} hours`
  else if (hours > 0)
    return `${hours} hours ${minutes} minutes`
  else
    return `${minutes} minutes`
}

// Got this UUID generator from https://jsfiddle.net/briguy37/2MVFd/
export function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

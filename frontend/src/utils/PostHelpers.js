
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

export const isInDelivery = (date: Date, currentTime: Date) => {
  return currentTime < date
}

export const GetTimeUntilDelivery = (date: Date, currentTime: Date) => {
  const timeDiff = date.getTime() - currentTime.getTime()
  const hours = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export const hasPassedOneHour = (date: Date, currentTime: Date) => {
  const oneHour = 3600000

  return date.getTime() - currentTime.getTime() < oneHour
}

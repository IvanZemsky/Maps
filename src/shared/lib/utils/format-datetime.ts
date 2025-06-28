export function formatDatetime(date: number | string | Date, time: boolean = true) {
   const newDate = new Date(date)
   const day = newDate.getDate()
   const month = newDate.toLocaleString("en-US", { month: "long" })
   const year = newDate.getFullYear()

   const twoDigitDay = day.toString().padStart(2, "0")

   if (time) {
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()
      return `${twoDigitDay} ${month} ${year}, ${hours}:${minutes}`
   }

   return `${twoDigitDay} ${month} ${year}`
}

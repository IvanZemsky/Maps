export function formatDate(date: number | string | Date) {
   const newDate = new Date(date)
   const day = newDate.getDate()
   const month = newDate.toLocaleString("en-US", { month: "long" })
   const year = newDate.getFullYear()

   const twoDigitDay = day.toString().padStart(2, "0")

   return `${twoDigitDay} ${month} ${year}`
}

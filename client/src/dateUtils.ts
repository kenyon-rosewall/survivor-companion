export function fixDate(dt: string) {
  const dateOptions: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  if (dt === "") return new Date().toLocaleDateString("en-US", dateOptions)
  else return new Date(dt).toLocaleDateString("en-US", dateOptions)
}

const fixDates = (obj: any, fields: string[]) => {
  fields.forEach((field) => {
    if (obj[field]) {
      obj[field] = obj[field].split("T")[0]
    }
  })
  return obj
}

export { fixDates }

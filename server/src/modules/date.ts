const isValid = (d: string | undefined): boolean => {
  if (!d) return false;

  const date = new Date(d);
  return !isNaN(date.getTime());
}

const parse = (d: string | undefined): Date | undefined => {
  if (!d) return undefined;

  return isValid(d) ? new Date(d) : undefined;
}

export default { parse };

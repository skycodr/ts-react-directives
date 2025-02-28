export const log = (message: string, ...args: any[]) => {
  const msg = `__${message
    .trim()
    .toLocaleUpperCase()
    .replace(/(' ')+/g, '_')}__`;
  console.log(msg, ...args);
};

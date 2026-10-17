// export const removeUndefined = <T extends Record<string, any>>(obj?: T | null): Partial<T> => {
//   if (!obj || typeof obj !== 'object') return {};

//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, value]) => value !== undefined)
//   ) as Partial<T>;
// };
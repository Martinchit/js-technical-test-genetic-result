import D from 'dayjs';

export const convertInfoItemData = (k, s) => {
  return D(s).isValid() && /date|at/i.test(k)
    ? D(s).format('DD/MM/YYYY')
    : String(s);
};

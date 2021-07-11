import { convertInfoItemData } from '../dataConversion';

describe('convertInfoItemData function', () => {
  it('renders string', () => {
    const d = '123';
    const convertedData = convertInfoItemData('test', '123');
    expect(convertedData).toEqual(d);
  });

  it('renders datetime', () => {
    const d = '10/10/2010 00:00:00';
    const convertedData = convertInfoItemData('test', d);
    expect(convertedData).toEqual(d);
  });

  it('renders datetime', () => {
    const d = '10/10/2010 00:00:00';
    const convertedData = convertInfoItemData('date', d);
    expect(convertedData).toEqual(d.slice(0, 10));
  });
});
import counter from '../modules/counter';

describe('Count the item list from reervations', () => {
  it('should return 1 list item', () => {
    const testDom = `
    <li><b>Felipe</b><br/>from 8/4/2023 to 9/4/2023</li>
    `;
    document.body.innerHTML = testDom;
    expect(counter(document.body)).toBe(1);
  });

  it('should return 3 lists item', () => {
    const testDom = `
    <li><b>Felipe</b><br/>from 8/4/2023 to 9/4/2023</li>
    <li><b>Bruno</b><br/>from 8/4/2023 to 9/4/2023</li>
    <li><b>Mahammad</b><br/>from 8/4/2023 to 9/4/2023</li>
    `;
    document.body.innerHTML = testDom;
    expect(counter(document.body)).toBe(3);
  });

  it("should be a 'null' list", () => {
    const testDom = '';
    document.body.innerHTML = testDom;
    expect(counter(document.body)).toBe(0);
  });
});
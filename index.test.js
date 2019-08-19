const calculatePrice = require('./index');

/**
 * Hints
 * 
 * Books => 1, 2, 3, 4, 5
 * 
 */
test('An empty cart returns 0', () => {
    expect(calculatePrice([])).toBe(0);
});

test('A cart with one item does not apply discounts', () => {
    expect(calculatePrice([1])).toBe(8);
});

test('A cart a set of similar items does not apply discounts', () => {
    expect(calculatePrice([2, 2, 2])).toBe(8 * 3);
});

test('Unique cart discounts', () => {
    expect(calculatePrice([1, 2])).toBe(15.2);
    expect(calculatePrice([1, 2, 3])).toBe(21.6);
    expect(calculatePrice([1, 2, 3, 4])).toBe(25.6);
    expect(calculatePrice([1, 2, 3, 4, 5])).toBe(30);
});

test('Mixed cart discounts', () => {
    expect(calculatePrice([1, 1, 2])).toBe(23.2);
    // expect(calculatePrice([1, 1, 2, 2])).toBe(30.4);
    // expect(calculatePrice([1, 1, 2, 2, 3, 3, 4, 5])).toBe(51.2);
});
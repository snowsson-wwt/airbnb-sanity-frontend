import { formatPrice, isMultiple } from './utils'

describe('formatPrice', () => {
  test('formats a simple price correctly', () => {
    expect(formatPrice(100)).toBe('$100.00')
  })

  test('formats a price with decimals correctly', () => {
    expect(formatPrice(99.99)).toBe('$99.99')
  })

  test('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('$0.00')
  })

  test('formats large numbers with commas', () => {
    expect(formatPrice(1234567.89)).toBe('$1,234,567.89')
  })

  test('rounds to two decimal places', () => {
    expect(formatPrice(10.999)).toBe('$11.00')
  })

  test('handles negative prices', () => {
    expect(formatPrice(-50.25)).toBe('-$50.25')
  })

  test('returns $0.00 for invalid input', () => {
    expect(formatPrice(NaN)).toBe('$0.00')
    expect(formatPrice('not a number')).toBe('$0.00')
    expect(formatPrice(null)).toBe('$0.00')
    expect(formatPrice(undefined)).toBe('$0.00')
  })

  test('supports different currencies', () => {
    expect(formatPrice(100, 'EUR')).toBe('€100.00')
    expect(formatPrice(100, 'GBP')).toBe('£100.00')
  })
})

describe('isMultiple', () => {
  test('returns "s" for zero', () => {
    expect(isMultiple(0)).toBe('s')
  })

  test('returns empty string for one', () => {
    expect(isMultiple(1)).toBe('')
  })

  test('returns "s" for values greater than one', () => {
    expect(isMultiple(2)).toBe('s')
    expect(isMultiple(100)).toBe('s')
  })
})

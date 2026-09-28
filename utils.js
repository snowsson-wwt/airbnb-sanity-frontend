export const isMultiple = (value) => (value === 0 || value > 1 ? "s" : "")

/**
 * Formats a price value into a currency string
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'USD') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00'
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(price)
}

/**
 * Generates the plain text order message for the Clipboard Handshake.
 *
 * @param {string} itemName  - Selected bloom name
 * @param {string} variantLabel - Selected variant label
 * @param {number} price  - Price
 * @param {string} roomNumber   - Guest room number
 * @returns {string} Plain text order message
 */
export function generateOrderText(itemName, variantLabel, price, roomNumber) {
  const lines = [
    `── Whoopsie Daisies ──`,
    `Bespoke Floral Arrangement Request`,
    ``,
    `Bloom: ${itemName}`,
    `Variant: ${variantLabel}`,
    `Estimated Investment: ₱${price.toLocaleString()}`,
    `Room Number: ${roomNumber || '—'}`,
    ``,
    `Submitted via the Bespoke Floral Builder.`,
    `Kindly confirm availability and arrange delivery at your earliest convenience.`,
    ``,
    `Thank you.`,
  ];

  return lines.join('\n');
}

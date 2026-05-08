/**
 * Generates a Messenger deep-link URL with a pre-filled,
 * professionally formatted order message.
 *
 * @param {Object} params
 * @param {string} params.bloom  - Selected bloom name
 * @param {string} params.variant - Selected variant label
 * @param {string} params.price  - Formatted price string
 * @param {string} params.room   - Guest room number
 * @returns {string} Full Messenger URL with encoded message
 */
export function buildMessengerUrl({ bloom, variant, price, room }) {
  const lines = [
    `── Whoopsie Daisies ──`,
    `Bespoke Floral Arrangement Request`,
    ``,
    `Bloom: ${bloom}`,
    `Variant: ${variant}`,
    `Estimated Investment: ${price}`,
    `Room Number: ${room || '—'}`,
    ``,
    `Submitted via the Bespoke Floral Builder.`,
    `Kindly confirm availability and arrange delivery at your earliest convenience.`,
    ``,
    `Thank you.`,
  ];

  const message = lines.join('\n');
  const encoded = encodeURIComponent(message);

  return `https://m.me/whoopsiedaisies.ph?text=${encoded}`;
}

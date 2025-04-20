
// These are now JSDoc type definitions for better IDE support
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {Array<Donation>} donations
 */

/**
 * @typedef {Object} Scheme
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} targetAmount
 * @property {number} currentAmount
 * @property {string} category
 * @property {string} imageUrl
 * @property {string} endDate
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Donation
 * @property {string} id
 * @property {string} userId
 * @property {string} schemeId
 * @property {number} amount
 * @property {string} date
 * @property {string} [message]
 */

export {};

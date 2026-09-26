/**
 * Build pagination metadata from query params.
 * @param {Object} query - Express request query { page, limit }
 * @param {number} totalDocs - Total number of documents
 * @returns {Object} { page, limit, skip, total, totalPages }
 */
const buildPagination = (query, totalDocs) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalDocs / limit);

  return {
    page,
    limit,
    skip,
    total: totalDocs,
    totalPages,
  };
};

module.exports = { buildPagination };

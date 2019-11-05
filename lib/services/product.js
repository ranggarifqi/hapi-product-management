'use strict';

const Schmervice = require('schmervice');

module.exports = class ProductService extends Schmervice.Service {
  constructor(...args) {
    super(...args);
  }

  async findAll({ limit, offset }) {
    const { Products } = this.server.models();
    const baseQuery = Products.query();

    const [ products, totalItems ] = await Promise.all([
      baseQuery.limit(limit).offset(offset).orderBy('id', 'desc'),
      baseQuery.resultSize()
    ]);
    
    return { products, totalItems, limit, offset };
  }
};

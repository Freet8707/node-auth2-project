const knex = require("knex");

const knexfile = require("./knexfile");

const config = knex(knexfile.development);

module.exports = config;
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/reads_galvanize'
  },

  production: {
    client: 'pg',
    connection: 'postgres://'
  }
};


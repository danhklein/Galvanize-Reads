module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/reads_galvanize'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
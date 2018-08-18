const promise = require('bluebird');

const options = {
    promiseLib: promise
}

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://pexwzhhgukajpd:678984085fc17de3aa6864be9e69b65842b247a55237ff3456addfafffad3b10@ec2-54-235-94-36.compute-1.amazonaws.com:5432/d803igvrlbdt97';
const db = pgp(connectionString);

module.exports = {
    db
}
const { Client } = require('pg');

const config = {
    host: 'ec2-54-235-94-36.compute-1.amazonaws.com',
    user: 'pexwzhhgukajpd',
    database: 'd803igvrlbdt97',
    password: '678984085fc17de3aa6864be9e69b65842b247a55237ff3456addfafffad3b10',
    port: 5432,
    ssl: true
};

const db = new Client(config);
db.connect();


module.exports = {
    db
}


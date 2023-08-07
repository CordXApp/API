module.exports.sqlConnection = async function ({ host, user, pass, name }) {
    
    const { createConnection } = require("mysql");
  
    const sql = await createConnection({
      host: host,
      user: user,
      password: pass,
      database: name,
    });
  
    return sql;
};
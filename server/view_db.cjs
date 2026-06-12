const { Client } = require('pg');

// External Database URL from Render 
const connectionString = process.env.PGEXTERNALURL;

const client = new Client({ connectionString });

async function viewData() {
  await client.connect();
  const res = await client.query('SELECT * FROM gifts LIMIT 10;');
  console.log(res.rows);
  await client.end();
}

viewData().catch(err => console.error(err));

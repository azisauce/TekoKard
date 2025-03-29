import knex from 'knex';
import knexfile from '../../knexfile';


// Determine the current environment (default to 'development')
const environment = process.env.NODE_ENV || 'development';

// Select the appropriate configuration based on the environment
const config = knexfile[environment];

// Initialize Knex with the selected configuration
const db = knex(config);

// Optional: Log queries for debugging (only in development mode)
if (environment === 'development') {
  db.on('query', (queryData) => {
    console.log(`Executing query: ${queryData.sql}`);
  });
}

export default db;

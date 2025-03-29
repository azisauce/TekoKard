import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
        },
        migrations: {
            directory: "./src/data/migrations",
        },
        seeds: {
            directory: "./src/data/seeds",
        },
    },
};

export default config;

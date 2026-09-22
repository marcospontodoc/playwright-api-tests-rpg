import { Client } from "pg";

export class DatabaseClient {

    private client: Client;

    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
    }

    async connect() {
        await this.client.connect();
    }

    async query(sql: string, params: any[] = []) {
        return await this.client.query(sql, params);
    }

    async disconnect() {
        await this.client.end();
    }
}
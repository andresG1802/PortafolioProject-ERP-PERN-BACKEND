import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

const DEFAULT_ORIGINS = ['http://localhost:5173'];

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        const allowedOrigins = process.env['CORS_ORIGIN']
            ? process.env['CORS_ORIGIN'].split(',').map(origin => origin.trim())
            : DEFAULT_ORIGINS;

        this.app.use(cors({ origin: allowedOrigins }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

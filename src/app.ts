import 'dotenv/config';
import { Server } from './presentation/server';
import { AppRoutes } from './presentation/routes';

const PORT = Number(process.env['PORT']) || 3000;

new Server({ port: PORT, routes: AppRoutes.routes }).start();

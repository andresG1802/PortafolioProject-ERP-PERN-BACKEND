import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'secret';
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] ?? '7d';

export class JwtAdapter {
    static generateToken(payload: object): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }, (err, token) => {
                if (err || !token) return reject(err ?? new Error('Token generation failed'));
                resolve(token);
            });
        });
    }

    static verifyToken<T>(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                if (err || !decoded) return reject(err ?? new Error('Invalid token'));
                resolve(decoded as T);
            });
        });
    }
}

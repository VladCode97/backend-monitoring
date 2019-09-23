import { sign, verify } from 'jsonwebtoken';
require('dotenv').config();

function createToken(payload: any = {}) {
    return sign(payload, `${process.env.SECRETEHASHTOKEN}`, {expiresIn: 1800});
}

function verifyToken(request: any, response: any, next?: (err?: any) => any): any {
    const { authorization, token } = request.headers;
    if (authorization && token) {
        verify(token, `${process.env.SECRETEHASHTOKEN}`, (error, dataUser) => {
            if (error) {
                return response.json({
                    error
                });
            } else {
                next();
            }
        });
    } else {
        return response.json({
            message: 'You do not have enough permissons to access'
        });
    }
}

const handleTokens: any = {
    createToken,
    verifyToken
}

export default handleTokens;
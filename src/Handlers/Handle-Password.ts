import { pbkdf2Sync, randomBytes } from 'crypto';

class handlePassword {

    private salt: string;

    constructor() {
        this.salt = randomBytes(16).toString('base64');
    }

    encrypt(password: string, salt = this.salt) {
        return {
            passwordHash: pbkdf2Sync(password, salt, 1000, 16, `sha512`).toString(`base64`),
            salt: this.salt
        };
    }

}

const hashPassword = new handlePassword();
export default hashPassword;
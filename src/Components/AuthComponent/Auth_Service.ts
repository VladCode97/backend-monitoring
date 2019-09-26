import { Service } from 'typedi';
import BaseService from '../BaseComponent.ts/Base_Service';
import UserInterface from '../../Interfaces/User_Interface';
import UserModel from '../../Lib/User_Schema';
import handleTokens from '../../Handlers/Handle_Token';
import hashPassword from '../../Handlers/Handle-Password';
require('dotenv').config();

@Service()
export default class AuthService extends BaseService<UserInterface> {

    constructor() {
        super(UserModel);
    }

    async signIn(userRequest: any = {}): Promise<any> {
        let user = (await this.viewByFilter({ emailUser: userRequest.emailUser }));
        if (user !== null) {
            const verifyPassword: Boolean = (user.passwordUser === hashPassword.encrypt(userRequest.passwordUser, user.saltPassword).passwordHash);
            if (verifyPassword) {
                let tokenUser = handleTokens.createToken({ email: user.emailUser, role: user.roleUser }, `${process.env.SECRETEHASHTOKEN}`);
                return Promise.resolve(tokenUser);
            } else {
                return Promise.resolve('Password Incorrect');
            }
        } else {
            return Promise.resolve('User not found');
        }
    }

}

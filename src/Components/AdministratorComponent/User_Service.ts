import BaseService from "../BaseComponent.ts/Base_Service";
import UserInterface from '../../Interfaces/User_Interface';
import UserModel from '../../Lib/User_Schema';
import { Service } from 'typedi';
import HanldeEmail from "../../Handlers/Handle-Email";
import hashPassword from "../../Handlers/Handle-Password";

@Service()
export default class UserService extends BaseService<UserInterface> {

    constructor() {
        super(UserModel);
    }

    async createUser(userRequest: any = {}): Promise<String> {
        try {
            let encryptionByPasswordUser = hashPassword.encrypt(userRequest.passwordUser);
            userRequest.passwordUser = encryptionByPasswordUser.passwordHash;
            userRequest.saltPassword = encryptionByPasswordUser.salt;
            let user = (await this.create(userRequest));
            if (user !== undefined && user.code === 11000) {
                return Promise.resolve('User already exists');
            } else {
                let handleEmail = new HanldeEmail(userRequest.nameUser);
                (await handleEmail.SendEmail());
                return Promise.resolve('User created Successfully');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async viewUsers(): Promise<UserInterface[]> {
        let users = await this.views();
        return Promise.resolve(users);
    }

    async deactivateStateUser(userRequest): Promise<string> {
        try {
            const {nameUser, stateUser} = userRequest;
            let user = await this.updateByFilter({nameUser}, {stateUser});
            if (user === null) {
                return Promise.resolve('User not found');    
            } else {
                return Promise.resolve('user status is updated');    
            }
        } catch (error) {
            return Promise.reject('Error deactivating user status ');
        }
    }


}

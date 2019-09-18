import BaseService from "../BaseComponent.ts/Base_Service";
import UserInterface from '../../Interfaces/User_Interface';
import UserModel from '../../Lib/User_Schema';
import { Service } from 'typedi';

@Service()
export default class UserService extends BaseService<UserInterface> {

    constructor() {
        super(UserModel);
    }

    async createUser(userRequest: any = {}): Promise<String> {
        try {
            let user = (await this.create(userRequest));
            if (user !== undefined && user.code === 11000) {
                return Promise.reject('User already exists');
            } else {
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


}

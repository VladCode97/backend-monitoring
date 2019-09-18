import BaseService from "../BaseComponent.ts/Base_Service";
import ClientInterface from '../../Interfaces/Client_Interface';
import ClientModel from '../../Lib/Client_Schema';
import { Service } from "typedi";

@Service()
export default class ClientService extends BaseService<ClientInterface> {


    constructor() {
        super(ClientModel);
    }

    async createClient(ClientRequest: any = {}): Promise<String> {
        try {
            let client = (await this.create(ClientRequest));
            if (client !== undefined && client.code === 11000) {
                return Promise.reject('User already exists');
            } else {
                return Promise.resolve('Client created Successfully');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async viewClient(): Promise<ClientInterface[]> {
        let users = await this.views();
        return Promise.resolve(users);
    }


}
import BaseService from "../BaseComponent.ts/Base_Service";
import ClientInterface from '../../Interfaces/Client_Interface';
import ClientModel from '../../Lib/Client_Schema';
import { Service } from "typedi";
import HanldeEmail from "../../Handlers/Handle-Email";

@Service()
export default class ClientService extends BaseService<ClientInterface> {


    constructor() {
        super(ClientModel);
    }

    async createClient(clientRequest: any = {}): Promise<String> {
        try {
            let client = (await this.create(clientRequest));
            if (client !== undefined && client.code === 11000){
                return Promise.resolve('Client already exists');
            } else {
                let handleEmail = new HanldeEmail(clientRequest.nameClient);
                await handleEmail.SendEmail();
                return Promise.resolve('Client created Successfully');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async viewClients(): Promise<ClientInterface[]> {
        try {
            let users = await this.views();
            return Promise.resolve(users);
        } catch (error) {
            return Promise.reject('error seeing clients');
        }
    }

    async updateHostOfClient(clientRequest: any = {}): Promise<String> {
        try {
            let { nameClient, hostClient } = clientRequest;
            let client = (await this.updateByFilter({ nameClient }, { $set: { hostClient } }));
            if (client === null) {
                return Promise.resolve('Error updating client host. Does not exist');
            } else {
                return Promise.resolve('Client host updated');
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }


}

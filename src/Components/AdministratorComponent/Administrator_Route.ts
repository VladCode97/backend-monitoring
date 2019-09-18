import { JsonController, Get, Post, Body, Res, OnUndefined, HttpCode } from 'routing-controllers';
import UserService from './User_Service';
import handleMessages from '../../Handlers/Handle_Messages';
import CLientService from './Client_Service';
import { Inject } from 'typedi';

@JsonController('/admin')
export default class AdmintratorRoute {


    @Inject()
    private userService: UserService;

    @Inject()
    private clientService: CLientService;

    constructor() { }

    @HttpCode(201)
    @Post('/createUser')
    async createUser(@Body({ required: true }) userRequest: any, @Res() response: any) {
        let user = await this.userService.createUser(userRequest);
        return handleMessages(response, user);
    }

    @HttpCode(201)
    @Post('/createClient')
    async createClient(@Body({ required: true }) clientRequest: any, @Res() response: any) {
        let client = await this.clientService.createClient(clientRequest);
        return handleMessages(response, client);
    }


    @HttpCode(201)
    @Get('/viewUsers')
    async viewClients(@Res() response: any) {
        let client = await this.userService.viewUsers();
        return handleMessages(response, client);
    }
}



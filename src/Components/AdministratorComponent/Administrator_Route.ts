import { JsonController, Get, Post, Body, Res, HttpCode, Put, UseBefore} from 'routing-controllers';
import UserService from './User_Service';
import handleMessages from '../../Handlers/Handle_Messages';
import CLientService from './Client_Service';
import { Inject } from 'typedi';
import handleTokens from '../../Handlers/Handle_Token';


@JsonController('/admin')
@UseBefore(handleTokens.verifyToken)
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

    @HttpCode(200)
    @Get('/viewUsers')
    async viewUsers(@Res() response: any) {
        let users = await this.userService.viewUsers();
        return handleMessages(response, users);
    }

    @HttpCode(200)
    @Get('/viewClients')
    async viewClients(@Res() response: any) {
        let clients = await this.clientService.viewClients();
        return handleMessages(response, clients);
    }

    @HttpCode(200)
    @Put('/updateHostByClient')
    async updateHostByClient(@Body({ required: true }) clientRequest: any, @Res() response: any) {
        let client = await this.clientService.updateHostOfClient(clientRequest);
        return handleMessages(response, client);
    }

    @HttpCode(200)
    @Put('/updateStateUser')
    async updateStateUser(@Body({required: true}) userRequest: any, @Res() response: any ) {
        let user = await this.userService.deactivateStateUser(userRequest);
        return handleMessages(response, user);
    }

    @HttpCode(200)
    @Put('/updateStateClient')
    async updateStateClient(@Body({required: true}) clientRequest: any, @Res() response: any ) {
        let client = await this.clientService.deactivateStateClient(clientRequest);
        return handleMessages(response, client);
    }
}



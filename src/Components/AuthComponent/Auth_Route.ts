import { JsonController, Post, HttpCode, Body, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import AuthService from './Auth_Service';
import handleMessages from '../../Handlers/Handle_Messages';


@JsonController('/auth')
export default class AuthRoute {

    @Inject()
    private authService: AuthService;

    constructor() { }

    @Post('/signIn')
    async signIn(@Body({ required: true }) userRequest: any, @Res() response: any) {
        let token = (await this.authService.signIn(userRequest));
        return handleMessages(response, token);
    }

}
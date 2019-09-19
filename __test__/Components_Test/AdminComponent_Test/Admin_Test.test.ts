import SuperTest from 'supertest';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import 'reflect-metadata';
import { connect, disconnect } from 'mongoose';
import BodyParser from 'body-parser';
import AdmintratorRoute from '../../../src/Components/AdministratorComponent/Administrator_Route';
import Express from 'express';
require('dotenv').config();

/****
 * Load all injections dependencies (services)
 */
useContainer(Container);

/****
 * Instance of server for testing
 */
const serverExpress = Express();


let agent: any, server;


beforeAll(async (done) => {
    useExpressServer(serverExpress, { routePrefix: '/api', controllers: [AdmintratorRoute] });//Endpoints for testing
    await connect(process.env.URLMONGOOSE, { useUnifiedTopology: true }); //Create Connection Mongo for testing
    await new Promise((resolve, reject) => {
        server = serverExpress.listen(4000, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
    agent = SuperTest.agent(server);
    done();
});


afterAll(() => {
    disconnect();
    server.close();
})

describe('Endpoint Adminitrator', () => {

    it('Test Get for endpoint view Users', async () => {
        const response = (await agent.get('/api/admin/viewUsers'));
        expect(response.status).toEqual(200);
    });

})
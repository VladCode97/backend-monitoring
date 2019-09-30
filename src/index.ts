import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import 'reflect-metadata';
import { connect } from 'mongoose';
import Morgan from 'morgan';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Express from 'express';
import AdmintratorRoute from './Components/AdministratorComponent/Administrator_Route';
import AuthRoute from './Components/AuthComponent/Auth_Route';
import { containerMetricService } from './Components/MetricComponent/Metric_Service';
require('dotenv').config();
import NodeCron from 'node-cron';
import MetricRoute from './Components/MetricComponent/Metric_Route';
/****
 * Load all injections dependencies (services)
 */
useContainer(Container);

const server = Express();

/****
* Create Connection Mongo
*/
connect(process.env.URLMONGOOSE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => (error) ? console.log(error) : console.log(`Successful Connection`)
);

/****
* Middlewares
*/
server.use(Cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}));
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Morgan('dev'));
/****
* Routes
*/
useExpressServer(server, {
    routePrefix: '/api',
    controllers: [
        AdmintratorRoute,
        AuthRoute,
        MetricRoute
    ]

})

/***
 * Listen Server
 */
server.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));

/****
 * Cron 5 minutes
 */

//NodeCron.schedule('*1* * * *', () => {
  //  containerMetricService.createMetric(); //Insert data of metric
//});



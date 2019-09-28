import { JsonController, Get, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import { MetricService } from './Metric_Service';
import handleMessages from '../../Handlers/Handle_Messages';

@JsonController('/metric')
export default class MetricRoute {

    @Inject()
    private metricService: MetricService;

    constructor() { }

    @Get('/viewMetrics')
    async viewMetrics(@Res() response: any) {
        let metrics = (await this.metricService.viewMetricsByClients());
        return handleMessages(response, metrics);
    }

}
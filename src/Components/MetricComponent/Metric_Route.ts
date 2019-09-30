import { JsonController, Get, Res, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';
import { MetricService } from './Metric_Service';
import handleMessages from '../../Handlers/Handle_Messages';
import handleTokens from '../../Handlers/Handle_Token';

@JsonController('/metric')
@UseBefore(handleTokens.verifyToken)
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

import BaseService from "../BaseComponent.ts/Base_Service";
import MetricInterface from "../../Interfaces/Metric_Interface";
import Container, { Service, Inject } from 'typedi';
import { MetricModel } from "../../Lib/Metric_Schema";
import handleRequestHost from "../../Handlers/Handle_RequestHost";
import ClientService from "../AdministratorComponent/Client_Service";
import { handleAvarangeLatance, handleAvaibilityByClient } from "../../Handlers/Handle_AvarangeLatence";
import handleFormatDate from "../../Handlers/Handle_FormatDates";

@Service()
export class MetricService extends BaseService<MetricInterface> {

    @Inject()
    private serviceClient: ClientService;

    constructor() {
        super(MetricModel);
    }

    async createMetric() {
        try {
            let clients = (await this.serviceClient.viewClients());
            if (clients.length !== 0) {
                clients.forEach(async (client) => {
                    let requestLatence = (await handleRequestHost.requestLatenceByClient(client.hostClient));
                    let requestStatusCodeByHost = (await handleRequestHost.requestStatusHost(client.hostClient));
                    this.create({ client, keepALiveWebsiteClient: requestStatusCodeByHost, latenceClient: requestLatence });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    async avarageLatencyMetric(clientId: string) {
        const avarageClient = (await this.viewAgregateByModel(handleAvarangeLatance()));
        return avarageClient.filter((element) => (element._id.toString() == clientId));
    }

    async CustomerAvailability(clientId?: string): Promise<number> {
        let metrics = (await this.viewByFilterAll({ client: clientId }));
        let customerAvailability = handleAvaibilityByClient(metrics);
        return customerAvailability;

    }

    async viewMetricsByClients(): Promise<any> {
        let numberOfCustomers = await this.serviceClient.lengthClients();
        let metrics = await this.viewByPopulateModel(numberOfCustomers, "client");
        let arrayLatencyByClient = metrics.map(async (metric) => {
            if (metric.toObject().client.stateClient) {
                let avarageClient = (await this.avarageLatencyMetric(metric.toObject().client._id));
                let { nameClient, hostClient, aliasClient } = metric.toObject().client;
                let lastDateOfTheConsultation = handleFormatDate.formatDate(metric.toObject().createdAt);
                let CustomerAvailabilityByMetric = (await this.CustomerAvailability(metric.toObject().client._id));
                return { nameClient, hostClient, aliasClient, avarageClient, lastDateOfTheConsultation, CustomerAvailabilityByMetric };
            };
        });;
        let responseByLatenceOfCustomers = await Promise.all(arrayLatencyByClient);
        return responseByLatenceOfCustomers;
    }

}

export const containerMetricService = Container.get(MetricService);

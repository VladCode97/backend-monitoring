import Autocannon from 'autocannon';
import Axios from 'axios';
import searchStatusCode from './Handle_StatusCode';



async function requestLatenceByClient(hostClient: string): Promise<any> {
    try {
        let responseLatence = await Autocannon({
            url: hostClient,
            connections: 10, //default
            pipelining: 1, // default
            duration: 10, // default
            title: String
        });
        if (responseLatence.latency !== undefined) {
            let { p1, p2_5, p10, p25, p50, p75, p90, p97_5, p99_999 } = responseLatence.latency;
            return Promise.resolve(
                {
                    p1, p2_5, p10, p25, p50, p75, p90, p97_5, p99_999
                }
            )
        }
    } catch (error) {
        return Promise.reject(error);
    }
}


async function requestStatusHost(hostClient: string): Promise<any> {
    try {
        const responseStatusHost = await Axios(hostClient).then((data) => data.status).catch((error) => undefined);
        const statusCodeHost = searchStatusCode(responseStatusHost);
        if (statusCodeHost) {
            return Promise.resolve(statusCodeHost);
        } else {
            return Promise.resolve(false)
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const handleRequestHost = {
    requestLatenceByClient,
    requestStatusHost
}

export default handleRequestHost;
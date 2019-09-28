import handleFormatDate from "./Handle_FormatDates";

export function handleAvarangeLatance(): Array<any> {
    return [
        {
            $group:
            {
                _id: "$client",
                p1: { $avg: "$latenceClient.p1" }, p2_5: { $avg: "$latenceClient.p2_5" },
                p10: { $avg: "$latenceClient.p10" }, p25: { $avg: "$latenceClient.p25" },
                p50: { $avg: "$latenceClient.p50" }, p75: { $avg: "$latenceClient.p75" },
                p90: { $avg: "$latenceClient.p90" }, p97_5: { $avg: "$latenceClient.p97_5" },
                p99_999: { $avg: "$latenceClient.p99_999" }
            }
        }
    ]
}

export function handleAvaibilityByClient(array: Array<any>): number {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].keepALiveWebsiteClient === false) {
            if (i === array.length - 1) {
                continue;
            }
            result = array[i + 1].toObject().createdAt.getTime() - array[i].toObject().createdAt.getTime();
        }
    }
    if (result === 0) {
        return 100;
    } else {
        return 100 * ((-1) * (((result / (1000 * 60 * 60) % 24) / 8640) - 1));
    }
}


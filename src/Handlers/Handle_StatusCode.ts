
const dataSetCode: Number[] = [
    200, 201, 202, 203,
    300, 301, 302, 303, 304, 305, 306, 307, 308,
    400, 401, 403, 404, 405, 406, 407, 409, 410, 411, 412, 413, 414, 415, 416, 417, 429,
    500, 501, 502, 504, 505, 507, 508, 509, 510, 511
];


export default function searchStatusCode(statusCode): boolean {
    if (statusCode === undefined) {
        return false;
    }
    return dataSetCode.includes(statusCode);
}
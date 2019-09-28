import Moment from 'moment';

function formatDate(date: Date): String {
    return Moment(date).format('LLLL');
}

const handleFormatDate = {
    formatDate,
}

export default handleFormatDate;
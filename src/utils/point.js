import dayjs from 'dayjs';

const isPointPast = (pointDate) => dayjs(pointDate.dateFrom).isBefore(dayjs());
const isPointFuture = (pointDate) => dayjs(pointDate.dateFrom).isAfter(dayjs());

export { isPointFuture, isPointPast };

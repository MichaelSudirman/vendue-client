const getUnixTime = (time) => Math.floor(new Date(time).getTime() / 1000);
const getISOString = (time) => new Date(time).toISOString();

export { getUnixTime, getISOString };

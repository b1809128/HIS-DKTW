const buffer = require("buffer/").Buffer;

const daily = { type: "nowadays_01", from: "2022-06-01", to: "2022-07-31" };
const statisticsDaily = { type: "obs-ip", value: "mental" };
const system57195 = { kind: "web_dashboard_config" };
const chart = { type: "sta_0002", from: "2022-06-01", to: "2022-07-31" };
const dataToBase64 = {
  code: "code",
  value: "sta_0001",
};

const parseToBase64 = (params) => {
  let stringBase64 = buffer.from(JSON.stringify(params)).toString("base64");
  return stringBase64;
};

console.log(parseToBase64(system57195));
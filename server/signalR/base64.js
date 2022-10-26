const buffer = require("buffer/").Buffer;

const daily = { type: "nowadays_01", from: "2022-06-01", to: "2022-07-31" };
const statisticsDaily = { type: "obs-ip", value: "mental" };
const system57195 = { kind: "web_dashboard_config" };
const chart = { type: "sta_0002", from: "2022-06-01", to: "2022-07-31" };
const dataToBase64 = {
  code: "code",
  value: "sta_0001",
};

const configKind = { kind: "user_gui", user_id: 1 };
const apiStatistic = [
  {
    code: "code",
    value: "sta_0040",
  },
  {
    code: "from",
    value: "2022-09-20",
  },
  {
    code: "to",
    value: "2022-09-21",
  },
]

const parseToBase64 = (params) => {
  let stringBase64 = buffer.from(JSON.stringify(params)).toString("base64");
  return stringBase64;
};

console.log(parseToBase64(apiStatistic));

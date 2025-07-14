import { PureComponent } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Jan",
    $: 107849,
  },
  {
    name: "Feb",
    $: 194129,
  },
  {
    name: "Mar",
    $: 269624,
  },
  {
    name: "Apr",
    $: 366688,
  },
  {
    name: "May",
    $: 431398,
  },
  {
    name: "Jun",
    $: 506892,
  },
];

export default class Chart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" className="text-xs">
        <AreaChart
          // width={900}
          // height={100}
          data={data}
          margin={{
            top: 0,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="$" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2A8E9E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <Tooltip />
          <Area type="monotone" dataKey="$" stroke="#2A8E9E" fill="url(#$)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const Row1 = () => {
  const { palette } = useTheme();


  // Fake data for each chart
const fakeDataTorgueThrust = [
  { month: "Jan", torgue: 50, thrust: 30 },
  { month: "Feb", torgue: 65, thrust: 42 },
  { month: "Mar", torgue: 80, thrust: 55 },
  { month: "Apr", torgue: 60, thrust: 35 },
  { month: "May", torgue: 75, thrust: 48 },
  { month: "Jun", torgue: 90, thrust: 60 },
  { month: "Jul", torgue: 70, thrust: 40 },
  { month: "Aug", torgue: 85, thrust: 52 },
  { month: "Sep", torgue: 100, thrust: 65 },
  { month: "Oct", torgue: 75, thrust: 45 },
  { month: "Nov", torgue: 90, thrust: 58 },
  { month: "Dec", torgue: 105, thrust: 70 },
];

const fakeDataThrustRotorSpeed = [
  { month: "Jan", thrust: 30, 'rotor speed': 20 },
  { month: "Feb", thrust: 45, 'rotor speed': 32 },
  { month: "Mar", thrust: 60, 'rotor speed': 45 },
  { month: "Apr", thrust: 40, 'rotor speed': 25 },
  { month: "May", thrust: 55, 'rotor speed': 38 },
  { month: "Jun", thrust: 70, 'rotor speed': 50 },
  { month: "Jul", thrust: 50, 'rotor speed': 30 },
  { month: "Aug", thrust: 65, 'rotor speed': 42 },
  { month: "Sep", thrust: 80, 'rotor speed': 55 },
  { month: "Oct", thrust: 55, 'rotor speed': 35 },
  { month: "Nov", thrust: 70, 'rotor speed': 48 },
  { month: "Dec", thrust: 85, 'rotor speed': 60 },
];

const fakeDataTestRoutine = [
  { month: "Jan", revenue: 200 },
  { month: "Feb", revenue: 250 },
  { month: "Mar", revenue: 300 },
  { month: "Apr", revenue: 220 },
  { month: "May", revenue: 270 },
  { month: "Jun", revenue: 320 },
  { month: "Jul", revenue: 240 },
  { month: "Aug", revenue: 290 },
  { month: "Sep", revenue: 340 },
  { month: "Oct", revenue: 260 },
  { month: "Nov", revenue: 310 },
  { month: "Dec", revenue: 360 },
];


  const { data } = useGetKpisQuery();

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Torgue and Thrust"
          subtitle="top line represents Torgue, bottom line represents Thrust"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={fakeDataTorgueThrust}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="month"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="torgue"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="thrust"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b">
        <BoxHeader
          title="Thrust and Rotor Speed"
          subtitle="top line represents rotor speed, bottom line represents thrust"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={fakeDataThrustRotorSpeed}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="month"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="thrust"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rotor speed"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Test routine"
          subtitle="graph representing the maximum speeds through the test routine"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={fakeDataTestRoutine}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;

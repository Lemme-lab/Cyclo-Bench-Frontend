import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Line,
  Legend,
} from "recharts";

const generateFakeData = (length, min, max) =>
  Array.from({ length }, (_, index) => ({
    name: `Month ${index + 1}`,
    x: Math.floor(Math.random() * (max - min + 1)) + min,
    y: Math.floor(Math.random() * (max - min + 1)) + min,
    z: Math.floor(Math.random() * (max - min + 1)) + min, // Added third value
  }));

const Row2 = () => {
  const { palette } = useTheme();

  // Fake data for Rotor and Motor Speed
  const rotorMotorSpeedData = generateFakeData(12, 8000, 23000);

  // Fake data for Forces over Time
  const forcesOverTimeData = generateFakeData(12, 0, 100);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Rotor and Motor Speed"
          subtitle="top line represents motor speed, bottom line represents rotor speed"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={rotorMotorSpeedData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorMotorSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorRotorSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="x"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={0.4}
              fill={palette.primary.main}
            />
            <Area
              type="monotone"
              dataKey="y"
              dot={true}
              stroke={palette.tertiary.main}
              fillOpacity={0.4}
              fill={palette.tertiary.main}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader
          title="Forces over Time"
          subtitle="top line represents x, mid line represents y, bottom line represents z"
          sideText=""
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={forcesOverTimeData}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
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
              dot={false}
              strokeWidth={2}
              type="monotone"
              dataKey="x"
              stroke={palette.primary[500]}
            />
            <Line
              yAxisId="left"
              dot={false}
              strokeWidth={2}
              type="monotone"
              dataKey="y"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="left"
              dot={false}
              strokeWidth={2}
              type="monotone"
              dataKey="z"
              stroke={palette.secondary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="f">
        <BoxHeader
          title="Overall Test Routine Progress"
          sideText=""
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          The progress of the currently running test routine.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row2;

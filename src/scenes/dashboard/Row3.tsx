import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  CartesianGrid,
  LineChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
  BarChart,
  Bar,
  Area,
} from "recharts";

// Static data for the DataGrid
const staticTransactionData = [
  { id: 1, Name: "Thrust", Data: [50,12,3], timestamp: "2023-11-26T12:30:00Z" },
  { id: 2, Name: "Torgue", Data: 75, timestamp: "2023-11-26T12:45:00Z" },
  { id: 3, Name: "Torgue", Data: 30, timestamp: "2023-11-26T13:00:00Z" },
  { id: 4, Name: "WingPosition", Data: 45, timestamp: "2023-11-26T13:15:00Z" },
  // Add more data as needed
];

// Static data for the pie chart
const staticPieChartData = [
  { name: "Category 1", value: 30 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 50 },
  // Add more data as needed
];

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  // Fake data for the pie chart
  const pieChartData = useMemo(() => {
    return [
      [
        { name: "X-Force", value: 25 },
        { name: "", value: 35 },
      ],
      [
        { name: "Y-Force", value: 15 },
        { name: "", value: 35 },
      ],
      [
        { name: "Z-Force", value: 10 },
        { name: "", value: 35 },
      ],
      // Add more data as needed
    ];
  }, []);

  const productColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "data",
      headerName: "data",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 0.67,
    },
    {
      field: "Data",
      headerName: "Data",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 0.1,
      renderCell: (params: GridCellParams) => params.value,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Recent Data"
          sideText={` latest Data`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={staticTransactionData}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
    </>
  );
};

export default Row3;

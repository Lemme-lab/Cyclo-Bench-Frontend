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

const Column3 = () => {
  const { palette } = useTheme();

  const { data } = useGetKpisQuery();

  return (
    <>
      <DashboardBox gridArea="f">
       
      </DashboardBox>

    </>
  );
};

export default Column3;

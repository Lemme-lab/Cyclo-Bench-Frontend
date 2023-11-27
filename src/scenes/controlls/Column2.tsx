import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme, Typography, Box } from "@mui/material";
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

import LockOpenIcon from '@mui/icons-material/LockOpen';
import CycloneIcon from '@mui/icons-material/Cyclone';
import FlashOffIcon from '@mui/icons-material/FlashOff';

const Column2 = () => {
  const { palette } = useTheme();

  const { data } = useGetKpisQuery();

  return (
    <>
      <DashboardBox gridArea="d">
       
      </DashboardBox>

      <DashboardBox gridArea="e">
       
      </DashboardBox>

      <DashboardBox gridArea="g" style={{ textAlign: 'center', paddingTop: '0', display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <Box style={{ textAlign: 'center', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <LockOpenIcon sx={{ fontSize: 50, marginLeft: '00px', marginTop: '10px', color: palette.info.main }} />
      <Typography marginTop={1} marginLeft={0} variant="h4">
            Cage "Open"
      </Typography>
      </Box>
      <Box style={{ textAlign: 'center', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <CycloneIcon sx={{ fontSize: 50, marginLeft: '00px', marginTop: '10px', color: palette.info.main }} />
      <Typography marginTop={1} marginLeft={0} variant="h4">
            Rotor "Running"
      </Typography>
      </Box>
      <Box style={{ textAlign: 'center', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <FlashOffIcon sx={{ fontSize: 50, marginLeft: '00px', marginTop: '10px', color: palette.info.main }} />
      <Typography marginTop={1} marginLeft={0} variant="h4">
            E-Stop "Off"
      </Typography>
      </Box>
       </DashboardBox>
      
    </>
  );
};

export default Column2;

import BoxHeader from "@/components/BoxHeader";
import React, { useState } from 'react';
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from "react";
import { Box, Typography, useTheme, IconButton, Fab } from "@mui/material";
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import HubIcon from '@mui/icons-material/Hub';
import Slider from '@mui/material/Slider';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import Speed from '@mui/icons-material/Speed';
import CircularSlider, { CircularSliderWithChildren } from "react-circular-slider-svg";

const Column1 = () => {
  const { palette } = useTheme();

  const [isMotorRunning, setMotorRunning] = useState(true);

  const handleEmergencyShutdown = () => {
    setMotorRunning(false);
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(60);
  const [value3, setValue3] = useState(60);


  return (
    <>
      <DashboardBox gridArea="a" style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
        <Box style={{ textAlign: 'center', paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <Typography style={{ color: 'white', paddingBottom: '20px' }} variant="h2">Motor Control Panel</Typography>

          <Button size="large" variant="outlined" style={{ width: '60%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <DynamicFormIcon sx={{ mr: 3, fontSize: 40 }} />
            Emergency Shutdown
          </Button>

          <Button size="large" variant="outlined" style={{ width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <PowerSettingsNewIcon sx={{ mr: 3, fontSize: 40 }} />
            Shutdown
          </Button>
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="b" >

      <Typography marginTop={1} marginLeft={2} variant="h3">
            Setup Rotor Speeds
          </Typography>

        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
        <div style={{ width: '80%', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Speed sx={{ fontSize: 40, marginRight: '10px', color: 'white' }} />
          <div style={{ flex: 1 }}>
            <Typography variant="h3">Set Speed</Typography>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
            />
            <Typography variant="h5" color={palette.grey[200]} > Set the current speed of the rotor </Typography>
          </div>
        </div>
        <div style={{ width: '80%', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <ShutterSpeedIcon sx={{ fontSize: 40, marginRight: '10px', color: 'white' }} />
          <div style={{ flex: 1 }}>
            <Typography variant="h3">Maximum Rotor Speed Limiter</Typography>
            <Slider
              aria-label="maxSpeed"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
            />
            <Typography variant="h5" color={palette.grey[200]} >Limits the maximum speed the rotor is able to reach</Typography>
          </div>
        </div>
        </Box>
      </DashboardBox>


      <DashboardBox gridArea="c" >
          <Typography marginTop={1} marginLeft={2} variant="h3">
            Force into Direction
          </Typography>

          <Typography marginTop={1} marginLeft={2} variant="h4">
            To setup in which direction the rotor will push.
          </Typography>
        <Box style={{ flexDirection: 'row', alignItems: 'center', display: 'flex', textAlign: 'center'}}>
        <CircularSliderWithChildren
          size={170}
          minValue={0}
          maxValue={100}
          startAngle={0}
          endAngle={360}
          angleType={{
            direction: "cw",
            axis: "-y"
          }}

          handle1={{
            value: value1,
            onChange: v => setValue1(v)
          }}
          arcColor={palette.primary.main}
          arcBackgroundColor={palette.tertiary.main}
        >
          <Typography margin="0 1rem" variant="h3">
            X Direction
          </Typography>
        </CircularSliderWithChildren>

        <CircularSliderWithChildren
          size={170}
          minValue={0}
          maxValue={100}
          startAngle={0}
          endAngle={360}
          angleType={{
            direction: "cw",
            axis: "-y"
          }}



          handle1={{
            value: value2,
            onChange: v => setValue2(v)
          }}


          arcColor={palette.primary.main}
          arcBackgroundColor={palette.tertiary.main}
        >

          <Typography margin="0 1rem" variant="h3">
            Y Direction
          </Typography>

        </CircularSliderWithChildren>

        <CircularSliderWithChildren
          size={170}
          minValue={0}
          maxValue={100}
          startAngle={0}
          endAngle={360}
          angleType={{
            direction: "cw",
            axis: "-y"
          }}


          handle1={{
            value: value3,
            onChange: v => setValue3(v)
          }}
          arcColor={palette.primary.main}
          arcBackgroundColor={palette.tertiary.main}
        >
          <Typography margin="0 1rem" variant="h3">
            Z Direction
          </Typography>
        </CircularSliderWithChildren>  
        </Box>



      </DashboardBox>
    </>
  );
};

export default Column1;

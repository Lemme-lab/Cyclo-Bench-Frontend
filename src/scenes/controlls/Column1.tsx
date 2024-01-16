import React, { useState, useEffect } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { Box, Typography, useTheme, Button } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import Slider from '@mui/material/Slider';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import Speed from '@mui/icons-material/Speed';
import CircularSlider from '@fseehawer/react-circular-slider';
import { useGetControllDataQuery } from "@/state/api";

const Column1 = () => {
  const { palette } = useTheme();

  const [speed, setSpeed] = useState(30);
  const [maxSpeed, setMaxSpeed] = useState(30);
  const [motorStatus, setMotorStatus] = useState(false);

  var counter = 0;

  const {
    data: controllData,
    error: controllError,
    refetch: refetchControll,
  } = useGetControllDataQuery();

  var value1 = 100;
  var value2 = 100;
  var value3 = 100;


  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);

  const [direction1, setDirection1] = useState(-1);
  const [direction2, setDirection2] = useState(-1);
  const [direction3, setDirection3] = useState(-1);

  const initialDirection1 = -1;
  const initialDirection2 = -1;
  const initialDirection3 = -1;

  const handleDirectionChange = (index: number, value: number) => {
    // Reverse the direction when the value is over 180
    let direction = value > 180 ? 1 : -1;

    // Reset to the initial state if value goes over 180
    if (value > 180) {
      switch (index) {
        case 0:
          direction = initialDirection1;
          break;
        case 1:
          direction = initialDirection2;
          break;
        case 2:
          direction = initialDirection3;
          break;
        default:
          break;
      }
    }

    console.log(index);
    console.log(value);

    // Update the direction value
    switch (index) {
      case 0:
        setDirection1(direction);
        value1 = value;
        setValue4(value);
        setDirection();
        break;
      case 1:
        setDirection2(direction);
        value2 = value;
        setValue5(value);
        setDirection();
        break;
      case 2:
        setDirection3(direction);
        value3 = value;
        setValue6(value);
        setDirection();
        break;
      default:
        break;
    }
  };

  const setSpeedPercentage = async (value) => {
    try {
      const response = await fetch('http://localhost:3333/Controll/setSpeedPercentage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SetSpeedPercentage: value,
        }),
      });

      if (!response.ok) {
        console.error('Failed to set speed percentage');
      }
    } catch (error) {
      console.error('Error setting speed percentage:', error);
    }
  };

  const setMaxSpeedPercentage = async (value) => {
    try {
      const response = await fetch('http://localhost:3333/Controll/setMaxSpeedPercentage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MaxSpeedPercentage: value,
        }),
      });

      if (!response.ok) {
        console.error('Failed to set max speed percentage');
      }
    } catch (error) {
      console.error('Error setting max speed percentage:', error);
    }
  };

  const handleMaxSpeedChange = (event: Event, newValue: number | number[]) => {
    setMaxSpeed(newValue as number);
    setMaxSpeedPercentage(newValue as number);
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setSpeed(newValue as number);
    setSpeedPercentage(newValue as number);
  };

  useEffect(() => {
    const fetchInitialMotorStatus = async () => {
      try {
        const response = await fetch('http://localhost:3333/Controll/getMotorRun');
        if (response.ok) {
          const data = await response.json();
          setMotorStatus(data.motorRun);
          console.log('Initial Motor Status:', data.motorRun);
        } else {
          console.error('Failed to fetch initial motor status');
        }
      } catch (error) {
        console.error('Error fetching initial motor status:', error);
      }
    };

    fetchInitialMotorStatus();
  }, []);

  useEffect(() => {
    if (controllData && counter === 0) {
      value1 = controllData.parameters.direction[0] + 100;
      value2 = controllData.parameters.direction[1] + 100;
      value3 = controllData.parameters.direction[2] + 100;

      counter++;
    }
  }, [controllData]);

  const startStopMotor = async () => {
    try {
      const response = await fetch('http://localhost:3333/Controll/startMotor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boolMotor: !motorStatus,
        }),
      });

      if (response.ok) {
        setMotorStatus(!motorStatus);
        console.log('Motor status toggled successfully!');
      } else {
        console.error('Failed to toggle motor status');
      }
    } catch (error) {
      console.error('Error toggling motor status:', error);
    }
  };

  const emergencyStopMotor = async () => {
    try {
      const response = await fetch('http://localhost:3333/Controll/setEmergencyShutdown', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EmergencyShutdown: true,
        }),
      });
  
      if (response.ok) {
        console.log('Motor emergency stopped successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to emergency stop motor:', errorData);
      }
    } catch (error) {
      console.error('Error during emergency stop:', error);
    }

    try {
      const response = await fetch('http://localhost:3333/Controll/startMotor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boolMotor: false,
        }),
      });

      if (response.ok) {
        setMotorStatus(!motorStatus);
        console.log('Motor status toggled successfully!');
      } else {
        console.error('Failed to toggle motor status');
      }
    } catch (error) {
      console.error('Error toggling motor status:', error);
    }
  };

  const setDirection = async () => {
    console.log(value4);
    console.log(value5);
    console.log(value6);

    const directionValues = [value4, value5, value6];
    console.log(directionValues);

    try {
      const response = await fetch('http://localhost:3333/Controll/setDirection', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Direction: directionValues,
        }),
      });

      if (response.ok) {
        console.log('Direction set successfully!');
      } else {
        console.error('Failed to set direction');
      }
    } catch (error) {
      console.error('Error setting direction:', error);
    }
  };

  return (
    <>
      <DashboardBox
        gridArea="a"
        style={{ flexDirection: 'row', alignItems: 'center', display: 'flex' }}
      >
        <Box
          style={{
            textAlign: 'center',
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Typography
            style={{ color: 'white', paddingBottom: '20px' }}
            variant="h2"
          >
            Motor Control Panel
          </Typography>

          <Button
            size="large"
            variant="outlined"
            style={{
              width: '60%',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            onClick={emergencyStopMotor}
          >
            <DynamicFormIcon sx={{ mr: 3, fontSize: 40 }} />
            Emergency Stop
          </Button>

          <Button
            size="large"
            variant="outlined"
            style={{
              width: '60%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
            onClick={startStopMotor}
          >
            <PowerSettingsNewIcon sx={{ mr: 3, fontSize: 40 }} />
            {motorStatus ? 'Stop Motor' : 'Start Motor'}
          </Button>
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="b">
        <Typography marginTop={1} marginLeft={2} variant="h3">
          Setup Rotor Speeds
        </Typography>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
          }}
        >
          <div
            style={{
              width: '80%',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <Speed sx={{ fontSize: 40, marginRight: '10px', color: 'white' }} />
            <div style={{ flex: 1 }}>
              <Typography variant="h3">Set Speed</Typography>
              <Slider
                aria-label="Temperature"
                value={speed}
                onChange={handleSpeedChange}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={maxSpeed}
              />
              <Typography variant="h5" color={palette.grey[200]}>
                {' '}
                Set the current speed of the rotor{' '}
              </Typography>
            </div>
          </div>
          <div
            style={{
              width: '80%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <ShutterSpeedIcon
              sx={{ fontSize: 40, marginRight: '10px', color: 'white' }}
            />
            <div style={{ flex: 1 }}>
              <Typography variant="h3">Rotor Speed Limiter</Typography>
              <Slider
                aria-label="maxSpeed"
                value={maxSpeed}
                onChange={handleMaxSpeedChange}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
              />
              <Typography variant="h5" color={palette.grey[200]}>
               Limit the Maximum speed for the Rotor
              </Typography>
            </div>
          </div>
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <Typography marginTop={1} marginLeft={2} variant="h3">
          Force into Direction
        </Typography>

        <Typography marginTop={1} marginLeft={2} variant="h4">
          Set the direction in which the rotor will push.
        </Typography>

        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
            textAlign: 'center',
          }}
        >
          <Box style={{ margin: '20px 10px 0 50px', textAlign: 'center' }}>
            <CircularSlider
              width={130}
              max={100}
              min={-100}
              label="X"
              labelColor={palette.primary[300]}
              knobColor={palette.primary[300]}
              labelFontSize='1rem'
              progressColorFrom={palette.primary[300]}
              progressColorTo={palette.primary[300]}
              progressSize={5}
              trackColor="#eeeeee"
              trackSize={5}
              dataIndex={value1}
              initialValue={value1}
              direction={direction1}
              onChange={(value) => handleDirectionChange(0, value)}
            />
          </Box>

          <Box style={{ margin: '20px 10px 0 10px', textAlign: 'center' }}>
            <CircularSlider
              width={130}
              max={100}
              min={-100}
              label="Y"
              labelColor={palette.primary[300]}
              knobColor={palette.primary[300]}
              labelFontSize='1rem'
              progressColorFrom={palette.primary[300]}
              progressColorTo={palette.primary[300]}
              progressSize={5}
              trackColor="#eeeeee"
              trackSize={5}
              dataIndex={value2}
              initialValue={value2}
              direction={direction2}
              onChange={(value) => handleDirectionChange(1, value)}
            />
          </Box>

          <Box style={{ margin: '20px 10px 0 10px', textAlign: 'center' }}>
            <CircularSlider
              initialValue={value3}
              dataIndex={value3}
              max={100}
              min={-100}
              width={130}
              label="Z"
              labelColor={palette.primary[300]}
              knobColor={palette.primary[300]}
              labelFontSize='1rem'
              progressColorFrom={palette.primary[300]}
              progressColorTo={palette.primary[300]}
              progressSize={5}
              trackColor="#eeeeee"
              trackSize={5}
              direction={direction3}
              onChange={(value) => handleDirectionChange(2, value)}
            />
          </Box>
        </Box>

        <Box
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
        </Box>
      </DashboardBox>
    </>
  );
}

export default Column1;

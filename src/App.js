import './App.css';
import React, {   } from 'react';
import Grid from '@mui/material/Grid';
import SelectSmall from './NativeSelect';
import Box from "@mui/material/Box";
import CanvasDemo from './CanvasDemo';
import HandModel from './HandModel';
function App() {
  // const [testLabel, setTestLabel] = useState('None') ;
  window.alert("Select a Option from Menu and Click the Start Button .");
  return (
    <React.Fragment>
      <Grid className="mainGrid"  container spacing={2}>
        <Grid item lg={4} xs={4}>
          <Box>
            <SelectSmall ></SelectSmall>
                        
            </Box>

        </Grid>

        <Grid item xs={4} md={8} lg={8}>
            
            <CanvasDemo></CanvasDemo>
            <HandModel ></HandModel>

        </Grid>


      </Grid>
    </React.Fragment>
  );
}

export default App;

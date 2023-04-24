import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";

export default function SelectSmall() {
  const [test, setTest] = React.useState('');

  const handleChange = (event) => {
    setTest(event.target.value);
  };

  return (


    <Box width={'fit-content'}>
                <Card>
                    <CardContent>
                      <h6>Practice Signing  </h6>
                        
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="select-small-label">Test</InputLabel>
      <Select
        labelId="select-small-label"
        id="select-small"
        value={test}
        label="test"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'Open_Palm'}>Open_Palm</MenuItem>
        <MenuItem value={'Victory'}>Victory</MenuItem>
        <MenuItem value={'Closed_Fist'}>Closed_Fist</MenuItem>
        <MenuItem value={'Pointing_Up'}>Pointing_Up</MenuItem>
        <MenuItem value={'Thumb_Down'}>Thumb_Down</MenuItem>
        <MenuItem value={'Thumb_Up'}>Thumb_Up</MenuItem>
        <MenuItem value={'ILoveYou'}>ILoveYou</MenuItem>





      </Select>
    </FormControl>
                    </CardContent>
                </Card>
            </Box>


  );
}
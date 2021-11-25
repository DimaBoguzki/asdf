import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ModeContext, Modes } from '../context/mode';

export default function Header(){
  const [open, setOpen]=React.useState(false);

  const modeContext=React.useContext(ModeContext);

  const handleChange = (e) => {
    modeContext.setMode(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return(
    <header className="app-header flex-container">
      <label>Rick and Mory Charachers App</label>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="mode-open-select-label"
          id="mode-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={modeContext.mode}
          label="Mode"
          onChange={handleChange}
          sx={{color:'#fff'}}
        >
        {Object.keys(Modes).map(key => (
          <MenuItem value={Modes[key]}>{key}</MenuItem>
        ))}
      </Select>
      </FormControl>
    </header>
  )
}

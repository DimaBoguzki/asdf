import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SearchInput from './SearchInput';

function InputsControler({callback}){
  const [state, setState] = React.useState(()=>{
    return {
      name: '',
      gender: '',
      status: '',
    }
  });
  React.useEffect(()=>{
    callback(state);
  },[state])
  const handleCahnge=(field, val)=>{
    state[field]=val;
    setState({...state })
  }
  return(
    <div className="form-control">
      <SearchInput 
        value={state.name}
        callback={(val)=>handleCahnge('name',val)}
      />
      <div className="flex-container" style={{justifyContent:'space-between', width:'100%'}}>
        <div className="form-control col-lg-4_5">
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-label-select"
              value={state.gender}
              label="Gender"
              onChange={(e)=>handleCahnge('gender',e.target.value)}
            >
              <MenuItem value={''}></MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-control col-lg-4_5">
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status-label-select"
              value={state.status}
              label="Status"
              onChange={(e)=>handleCahnge('status',e.target.value)}
            >
              <MenuItem value={''}></MenuItem>
              <MenuItem value={'Alive'}>Alive</MenuItem>
              <MenuItem value={'Dead'}>Dead</MenuItem>
              <MenuItem value={'Unknown'}>Unknown</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="form-control col-lg-2">
          <FormControl fullWidth >
            <Button variant="contained" sx={{height:'56px'}} onClick={()=>setState({ name: '', gender: '', status: ''})}>
              Clear
            </Button>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default InputsControler;
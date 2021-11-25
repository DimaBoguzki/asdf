import React from 'react';
import TextField from '@mui/material/TextField';

function SearchInput({value, callback}){
  const [searchTerm, setSearchTerm] = React.useState(()=> value ? value : '')

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => callback(searchTerm), 500)
    return () => clearTimeout(delayDebounceFn)
  }, [ searchTerm ])

  React.useEffect(() => setSearchTerm(value), [value])


  return <TextField 
      sx={{width:'100%'}}
      value={searchTerm}
      placeholder="search"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
}


export default React.memo(SearchInput, (prevProps, nextProps)=>prevProps.value===nextProps.value);
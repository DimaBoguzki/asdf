import React from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';


export default function OutlinedCard({item, handleOnClick}) {
  return (
    <Card variant="outlined" sx={{padding:2, borderBotom: 1}} onClick={handleOnClick}>
      <div style={{display:'flex', alignItems:'center'}}>
        <Avatar alt={item.name} src={item.image}/>
        <label style={{marginLeft: 8}} >{item.name}</label>
      </div>
      <div className="text" style={{padding:'64px 0 0 0'}}>
        <p className="p-card"><span style={{marginRight:16}}>Status</span><span>{item.status}</span></p>
        <p className="p-card"><span style={{marginRight:16}}>Species</span><span>{item.species}</span></p>
      </div>
    </Card>
  );
}
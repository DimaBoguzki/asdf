import React from 'react';
import { Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Modal from '../components/Modal';
import InputsControler from '../components/InputsControler';
import { fetchCharacter } from '../api';
import Card from '../components/Card';
import { ModeContext, Modes } from '../context/mode';

function ViewPage() {
  const [page, setPage] = React.useState(1);
  const [pagesLen, setPagesLen] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const modeContext=React.useContext(ModeContext);

  const handleChange = (event, value) => setPage(value);

  React.useEffect(() => loadCharaster({page: page}), [page]);

  const loadCharaster = async (params) => {
    try{
      const res=await fetchCharacter(params)
      setPagesLen(res.data.info.pages);
      setData(res.data.results);
    }
    catch(err){
      alert("לא נמצתא תוצאות")
    }
  }
  const handleOnSearch=(search)=>{
    if(!search || (!search.name.length && !search.gender && !search.status)){
      loadCharaster({page:1});
    }
    loadCharaster(search);
  }
  const renderTableView=()=>{
    return(
      <TableContainer sx={{ maxHeight: '55vh' }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Origin</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Species</TableCell>
              <TableCell align="right">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow 
                key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor:'pointer' }} onClick={()=>setModal(item)} >
                <TableCell>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <Avatar alt={item.name} src={item.image}/>
                    <label style={{marginLeft: 8}} >{item.name}</label>
                  </div>
                </TableCell>
                <TableCell align="right">{item.origin.name}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">{item.species}</TableCell>
                <TableCell align="right">{item.gender}</TableCell>
              </TableRow>)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  const renderCrardsView=()=>{
    return(
      <div className="flex-container">
          {data.map((item) => (
            <div className="col-lg-3">
              <Card item={item} handleOnClick={()=>setModal(item)}/>
            </div>
          ))}
      </div>
    )
  }
  const displayView=()=>{
    switch (modeContext.mode) {
      case Modes.TABLE:
        return renderTableView();
      case Modes.CARD:
        return renderCrardsView();
      default:
        return null;
    }
  }
  return (
    <div className="container">
      <Modal isOpen={modal ? true : false} data={modal} close={()=>setModal(null)}/>
      <section>
        <InputsControler callback={handleOnSearch}/>
      </section>
      <section >
        <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
          {displayView()}
        </Paper>
      </section>
      <section>
        <Pagination count={pagesLen} onChange={handleChange}/>
      </section>
    </div>
  );
}

export default ViewPage;

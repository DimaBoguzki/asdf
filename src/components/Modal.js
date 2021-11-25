import React from 'react';
import Modal from '@mui/material/Modal';
import { fetchEpisode } from  '../api';
import Skeleton from '@mui/material/Skeleton';

export default function BasicModal({isOpen, data, close}) {
  const [episode, setEpisode] = React.useState([]);
  const [progress, setProgress] = React.useState(true);

  React.useEffect(() => {
    if(isOpen)
      loadEpisode();
  }, [isOpen])

  const loadEpisode= async ()=>{
    if(data && data.episode.length){
      try{
        const arrIDs=[];
        const firstSplitURL= data.episode[0].split('/');
        if(firstSplitURL.length)
          arrIDs.push(firstSplitURL[firstSplitURL.length-1]);
        if(data.episode.length > 1){
          const lasttSplitURL = data.episode[(data.episode.length-1)].split('/');
          if(lasttSplitURL.length)
            arrIDs.push(lasttSplitURL[lasttSplitURL.length-1]);
        }
        if(arrIDs.length){
          const res=await fetchEpisode(arrIDs);
          Array.isArray(res.data) ? setEpisode(res.data) : setEpisode([res.data]) ;
        }
      }
      catch(err){
        console.error(err);
        alert("not found")
      }
      finally{
        setProgress(false);
      }
    }
  }

  if(isOpen)
    return (
      <Modal open={isOpen} onClose={close}>
        <div className="modal">
          <div className="img">
            <img src={data.image} alt={data.name}/>
          </div>
          <div className="text">
            <h2>{data.name}</h2>
            {!progress ? 
            <>
              {episode.length ? <p><span>First Appearence</span><span> {episode[0].episode} </span></p> : null}
              {episode.length > 1 ? <p><span>Last Appearence</span><span> {episode[1].episode } </span></p>  : null}
            </> : 
            <>
              <Skeleton  width={300} height={40} />
              <Skeleton  width={300} height={40} />
            </>}
          </div>
        </div>
      </Modal>
    );
  return null
}
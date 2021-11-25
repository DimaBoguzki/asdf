import axios from 'axios';

const URL="https://rickandmortyapi.com/api";

/**
 * 
 * @param { Object } params 
 * @returns promise
 */
export const fetchCharacter=(params)=>{
  const queryString = Object.keys(params).map(key => {
    if( (key==='name' || key==='gender' || key==='status' || key==='page') && params[key] )
      return `${key}=${params[key]}`;
    else
      return null
    
  }).join('&');


  return axios.get(`${URL}/character/?${queryString}`);
}
/**
 * 
 * @param {Array} episodeIDs 
 * @returns 
 */
export const fetchEpisode=(episodeIDs)=>{
  return axios.get(`${URL}/episode/${episodeIDs.join(',')}`);
}




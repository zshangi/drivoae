
import React,{useState} from 'react';

export default function SimpleMap(){

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getLocation =() =>{
    if(!navigator.geolocation){
      setStatus("ewer");
    }        else        {
        setStatus("locaion");
        navigator.geolocation.getCurrentPosition(
           (position)=>{
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        ()=>{
        setStatus("unable")}
        );
    }
   };

  return (
    <div className='App'>
      <button onClick={getLocation}>getlocation</button>
      lat:{lat}lang:{lng} |{status}
    </div>
  );
};






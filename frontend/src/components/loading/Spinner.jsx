import React from 'react';
import {Rings} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Rings
        
        color="#86efac"
        height={100}
        width={500}
        className="m-1"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
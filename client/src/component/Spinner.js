import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <PulseLoader />
    </div>
  );
};

export default Loading;

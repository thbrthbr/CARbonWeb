import React, { useEffect } from 'react';
import PulseLoader from 'react-spinners/BeatLoader';

const Loading = (props) => {
  const check = props.loading == null ? false : props.loading;

  return (
    check && (
      <div
        className="axios-loading"
        style={{ display: props.loading === true ? 'block' : 'none' }}
      >
        <div className="axios-loading-indicator">
          <PulseLoader
            color={'white'}
            loading={props.loading}
            // css={override}
            size={40}
          />
        </div>
      </div>
    )
  );
};

export default Loading;

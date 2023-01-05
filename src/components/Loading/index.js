import React from "react";
import ReactLoading from 'react-loading';

const Loading = ({type, color}) => {
  return (
    <div className="loading">
      <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
    </div>
  );
};

export default Loading;

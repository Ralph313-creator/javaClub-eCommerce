import React from 'react';



const FormContainer = ({children}) => {
  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;

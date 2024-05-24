import React from "react";

const Errors = ({ error }: { error: string | undefined }) => {
  return <>{error ? <p className="text-red-500 text-[13px]">{error}</p> : null}</>;
};

export default Errors;

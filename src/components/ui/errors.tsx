import React from "react";

const Errors = ({ error }: { error: string | undefined }) => {
  return <> <p className="text-red-500 text-[13px]">{error}</p></>;
};

export default Errors;

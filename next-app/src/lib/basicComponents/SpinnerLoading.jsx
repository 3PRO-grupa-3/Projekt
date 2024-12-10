import { Loader } from "lucide-react";
import React from "react";

export default function SpinnerLoading() {
  return (
    <div className=" animate-spin">
      <Loader className="" />
    </div>
  );
}

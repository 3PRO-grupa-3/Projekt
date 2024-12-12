"use client";
import { Loader, LoaderCircle } from "lucide-react";
import React from "react";

export default function SpinnerLoading() {
  return (
    <div>
      <LoaderCircle className="animate-spin" />
    </div>
  );
}

import React from "react";
//
export default function ProgressBar({ value, max }) {
  return <progress value={value} max={max} style={{ width: 60 }} />;
}

// Error.tsx
"use client";
import React from "react";

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <div className="d-flex vh-100 justify-content-center align-items-center">
    <div>
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error.message}
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  </div>
);

export default Error;
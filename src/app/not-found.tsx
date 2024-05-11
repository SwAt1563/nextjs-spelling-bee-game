import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <h2 className="h2 mb-4">404 Not Found</h2>
        <p>Could not find the requested url.</p>
        <Link href="/" passHref>
          <span className="btn btn-primary mt-3">Go Home</span>
        </Link>
      </div>
    </div>
  );
}
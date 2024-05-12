import LoadingComponent from "@/components/Loading";
export default function Loading() {
  return (
    <div className="position-fixed top-50 start-50 translate-middle-y">
      <LoadingComponent />
    </div>
  );
}

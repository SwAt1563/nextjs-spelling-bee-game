export default function Loading() {
    return (
        <div className="position-fixed top-50 start-50 translate-middle-y">
            <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

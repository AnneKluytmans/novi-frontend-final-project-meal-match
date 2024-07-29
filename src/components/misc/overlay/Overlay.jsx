import './Overlay.css';

function Overlay( { show, children } ) {
    if (!show) return null;
    return (
        <div className="overlay">
            <div>
                {children}
            </div>
        </div>
    );
}

export default Overlay;
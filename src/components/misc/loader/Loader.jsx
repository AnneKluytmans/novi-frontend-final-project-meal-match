import { RotatingLines } from 'react-loader-spinner';
import './Loader.css';

function Loader( { text } ) {
    return (
        <div className="loader-container">
            <RotatingLines
                visible={true}
                height="36"
                width="36"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
            />
            {text && <h4 className="loader__text">{text}</h4>}
        </div>
    );
}

export default Loader;
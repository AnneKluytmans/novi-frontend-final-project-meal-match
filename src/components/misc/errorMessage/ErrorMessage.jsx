import './ErrorMessage.css';

function ErrorMessage( { message } ) {
    return (
        <h5 className="error-message default-text-restrictor">{message}</h5>
    );
}

export default ErrorMessage;
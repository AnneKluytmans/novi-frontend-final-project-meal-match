import { useState, useEffect } from 'react';
import './ConfirmMessage.css';

function ConfirmMessage( { message, onConfirm, onCancel, autoClose } ) {
    const [messageVisible, setMessageVisible] = useState(true);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => setMessageVisible(false), autoClose);
            return () => clearTimeout(timer);
        }
    }, [autoClose]);

    if (!messageVisible) {
        return null;
    }

    return (
        <div className="confirm-message-overlay">
            <div className="confirm-message">
                <h5>{message}</h5>
                {onConfirm && onCancel ? (
                    <div className="confirm-message-buttons">
                        <button onClick={onConfirm} className="confirm-button">Yes</button>
                        <button onClick={onCancel} className="cancel-button">Cancel</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ConfirmMessage;
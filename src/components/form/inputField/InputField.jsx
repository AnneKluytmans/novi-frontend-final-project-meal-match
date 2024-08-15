import { WarningCircle } from '@phosphor-icons/react';
import './InputField.css';


function InputField( { className, label, type = 'text', id, name, placeholder, register, validation, error } ) {
    return (
        <div className={`input-field ${className}`}>
            <label htmlFor={id} className="input-field__label">
                {label}
            </label>
            <input
                className={`input-field__field ${className}`}
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(name, validation)}
            />
            {error &&
                <span className="input-field__error">
                    <WarningCircle size={24} color="#F87E39" weight="fill"/>
                    <p> {error.message} </p>
                </span>
            }
        </div>
    );
}

export default InputField;
import { WarningCircle } from '@phosphor-icons/react';
import './InputField.css';


function InputField( { className, label, type = 'text', id, name, placeholder, cols = 30, rows=10, register, validation, error } ) {
    return (
        <div className={`input-field ${className}`}>
            <label htmlFor={id} className="input-field__label">
                {label}
            </label>
            {type === 'textarea' ?
                <textarea
                    className={`input-field__field ${className}`}
                    id={id}
                    placeholder={placeholder}
                    cols={cols}
                    rows={rows}
                    {...register(name, validation)}
                />
                :
                <input
                    className={`input-field__field ${className}`}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...register(name, validation)}
                />
            }
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
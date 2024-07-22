import './InputField.css';


function InputField( { label, type = 'text', id, name, register, validation, error } ) {
    return (
        <div className="input-field">
            <label htmlFor={id} className="input-field__label">
                {label}
                <input
                    className="input-field__field"
                    type={type}
                    id={id}
                    {...register(name, validation)}
                />
            </label>
            {error && <p className="input-field__error">{error.message} </p>}
        </div>
    );
}

export default InputField;
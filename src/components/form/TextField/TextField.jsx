import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';


function TextField({ name, label }) {
    const { register, formState: { errors } } = useFormContext();
    const maxFieldLength = 36;

    return (
        <InputField
            id={`${name}-field`}
            type="text"
            name={name}
            label={label}
            placeholder={`Enter your ${label.toLowerCase()}`}
            register={register}
            validation={{
                required: `${label} is required`,
                maxLength: { value: maxFieldLength, message: `${label} cannot exceed ${maxFieldLength} characters` }
            }}
            error={errors[name]}
        />
    );
}

export default TextField;
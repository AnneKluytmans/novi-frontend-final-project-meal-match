import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';
import isEmailValid from '../../../helpers/isEmailValid.js';


function EmailField() {
    const { register, formState: {errors} } = useFormContext();
    const maxEmailLength = 64;

    return (
        <InputField
            id="email-field"
            type="email"
            name="email"
            label="E-mail"
            register={register}
            validation={{
                required: 'Email is required',
                validate: isEmailValid,
                maxLength: { value: maxEmailLength, message: `Email cannot exceed ${maxEmailLength} characters` }
            }}
            error={errors.email}
        />
    );
}

export default EmailField;
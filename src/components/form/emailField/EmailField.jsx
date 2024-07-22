import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';
import isEmailValid from '../../../helpers/isEmailValid.js';


function EmailField() {
    const { register, formState: {errors} } = useFormContext();

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
                maxLength: { value: 50, message: `Email cannot exceed 50 characters` }
            }}
            error={errors.email}
        />
    );
}

export default EmailField;
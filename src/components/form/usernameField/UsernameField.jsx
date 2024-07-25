import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';

function UsernameField() {
    const { register, formState: {errors} } = useFormContext();
    const maxUsernameLength = 36;

    return (
        <InputField
            id="username-field"
            type="text"
            name="username"
            label="Username"
            placeholder="Enter your username"
            register={register}
            validation={{
                required: 'Username is required',
                maxLength: { value: maxUsernameLength, message: `Username cannot exceed ${maxUsernameLength} characters` }
            }}
            error={errors.username}
        />
    );
}

export default UsernameField;
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';
import isPasswordValid from '../../../helpers/isPasswordValid.js';
import Button from '../../buttons/button/Button.jsx';


function PasswordField() {
    const [showPassword, toggleShowPassword] = useState(false);
    const { register, formState: {errors} } = useFormContext();
    const maxPasswordLength = 64;

    return (
        <div className="password-field">
            <InputField
                id="password-field"
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                placeholder="Enter your password"
                register={register}
                validation={{
                    required: 'Password is required',
                    validate: isPasswordValid,
                    maxLength: { value: maxPasswordLength, message: `Password cannot exceed ${maxPasswordLength} characters` }
                }}
                error={errors.password}
            />
            <Button type="button" onClick={() => toggleShowPassword(!showPassword)} className="password-field__show-btn">
                {showPassword ? 'Hide' : 'Show'}
            </Button>
        </div>
    );
}

export default PasswordField;
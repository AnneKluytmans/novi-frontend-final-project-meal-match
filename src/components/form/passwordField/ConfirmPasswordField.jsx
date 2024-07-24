import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';
import Button from '../../buttons/button/Button.jsx';
import './PasswordField.css';


function ConfirmPasswordField() {
    const [showPassword, toggleShowPassword] = useState(false);
    const { register, formState: {errors}, watch } = useFormContext();
    const watchPassword = watch("password");

    return (
        <div className="password-field">
            <InputField
                id="confirm-password-field"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm password"
                placeholder="Confirm your password"
                register={register}
                validation={{
                    required: 'Please confirm your password',
                    validate: (value) => value === watchPassword || 'Passwords do not match',
                }}
                error={errors.confirmPassword}
            />
            <Button type="button" onClick={() => toggleShowPassword(!showPassword)} className="password-field__show-btn">
                {showPassword ? 'Hide' : 'Show'}
            </Button>
        </div>
    );
}

export default ConfirmPasswordField;
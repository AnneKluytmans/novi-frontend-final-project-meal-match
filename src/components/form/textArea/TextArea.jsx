import { useFormContext } from 'react-hook-form';
import InputField from '../inputField/InputField.jsx';

function TextArea() {
    const { register, formState: {errors} } = useFormContext();
    const maxMessageLength = 500;

    return (
        <InputField
            id="message-field"
            name="message"
            type="textarea"
            label="Message"
            placeholder="Enter your message"
            register={register}
            validation={{
                required: 'Message is required',
                maxLength: { value: maxMessageLength, message: `Message cannot exceed ${maxMessageLength} characters`}
            }}
            error={errors.message}
        />
    );
}

export default TextArea;
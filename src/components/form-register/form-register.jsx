/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';
import { useRegister } from '@/data/user/register';

const FormRegister = () => {
	const navigate = useNavigate();
	const { signUp, isLoading, authError } = useRegister();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm();

	/**
	 * On submit.
	 * 
	 * @param {Object} data 
	 * @returns {Void}
	 */
	const onSubmit = async (data) => {
		const { email, password } = data;
		const isSignUpSuccessful = await signUp({ email, password });

		if (isSignUpSuccessful) {
			navigate('/');
		}
	};

	const password = watch('password');

	const fields = [
		{
			id: 'email',
			name: 'email',
			label: 'Email',
			validation: { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } },
			type: 'email',
		},
		{
			id: 'password',
			name: 'password',
			label: 'Password',
			validation: {
				required: 'Password is required',
				minLength: {
					value: 6, message: 'Password must be at least 6 characters'
				}
			},
			type: 'password',
		},
		{
			id: 'confirmPassword',
			name: 'confirmPassword',
			label: 'Confirm Password',
			validation: {
				required: 'Please confirm your password',
				validate: (value) => value === password || 'Passwords do not match',
			},
			type: 'password',
		},
	];

	return (
		<Form
			className="form--alt"
			onSubmit={handleSubmit(onSubmit)}
			submitBtnText="Sign Up"
			isLoading={isLoading}
			disabled={isLoading}
		>
			{authError && <span className="form__error">{authError}</span>}

			{fields.map(({ id, name, label, validation, type }) => (
				<div className="form__group" key={id}>
					<label htmlFor={id} className="form__label">
						{label}
					</label>

					<InputField {...register(name, validation)} type={type} name={name} id={id} />

					{errors[name] && (
						<span className="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}

			<div className="form__group">
				<p className="text-xs text-center">Already have an account? <Link to="/login" className="text-blue">Log in here</Link></p>
			</div>
		</Form >
	)
}

export default FormRegister;
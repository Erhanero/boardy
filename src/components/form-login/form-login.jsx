/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';

const FormLogin = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		console.log(data);
		console.log(errors);
	}

	const fields = [
		{
			id: 'username',
			name: 'username',
			label: 'Username',
			validation: { required: 'Username is required' },
			type: 'text',
		},
		{
			id: 'password',
			name: 'password',
			label: 'Password',
			validation: { required: 'Password is required' },
			type: 'password',
		},
	];

	return (
		<Form className="form--alt" onSubmit={handleSubmit(onSubmit)} submitBtnText="Login">
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
				<p className="text-xs text-center">Don't have an account? <Link to="/register" className="text-blue">Click here to register.</Link></p>
			</div>
		</Form >
	)
}

export default FormLogin;
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

const FormAddBoard = () => {
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		const { email, password } = data;
		// const isSignInSuccessful = await signIn({ email, password });

	}

	const fields = [
		{
			id: 'board-title',
			name: 'board-title',
			validation: { required: 'Title is required' },
			type: 'text',
		}
	];

	return (
		<Form
			className="form--alt"
			onSubmit={handleSubmit(onSubmit)}
			submitBtnText="Create board"
			// isLoading={isLoading}
			// disabled={isLoading}
		>

			{fields.map(({ id, name, label, validation, type }) => (
				<div className="form__group" key={id}>
					<InputField {...register(name, validation)} type={type} name={name} id={id} placeholder="Enter board title" />

					{errors[name] && (
						<span className="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}
		</Form >
	)
}

export default FormAddBoard;
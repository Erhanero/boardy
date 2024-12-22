/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';

const FormAddCard = () => {
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
			id: 'title',
			name: 'title',
			label: 'Title',
			validation: { required: 'Title is required' },
			type: 'text',
		},
		{
			id: 'description',
			name: 'description',
			label: 'Description',
			type: 'textarea',
		},
		{
			id: 'label',
			name: 'label',
			label: 'Label',
			type: 'text',
		},
	];

	return (
		<Form onSubmit={handleSubmit(onSubmit)} submitBtnText="Add">
			{fields.map(({ id, name, label, validation, type }) => (
				<div className="form__controls" key={id}>
					<label htmlFor={id} className="form__label">
						{label}
					</label>

					<InputField {...register(name, validation)} type={type} name={name} id={id} />

					{errors[name]?.type === 'required' && (
						<span role="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}
		</Form >
	);
}

export default FormAddCard;
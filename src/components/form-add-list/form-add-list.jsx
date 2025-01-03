/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';
import useCreateList from '@/hooks/lists/use-create-list';

const FormAddList = ({boardId, onSuccess}) => {
	const {createList, isLoading} = useCreateList();
	
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		await createList(data, boardId);
		onSuccess?.();
	}

	const fields = [
		{
			id: 'listTitle',
			name: 'listTitle',
			validation: { required: 'Name is required' },
			type: 'text',
		}
	];

	return (
		<Form
			className="form--alt"
			onSubmit={handleSubmit(onSubmit)}
			submitBtnText="Add"
			isLoading={isLoading}
			disabled={isLoading}
		>

			{fields.map(({ id, name, label, validation, type }) => (
				<div className="form__group" key={id}>
					<InputField {...register(name, validation)} type={type} name={name} id={id} placeholder="Enter list name" />

					{errors[name] && (
						<span className="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}
		</Form >
	)
}

export default FormAddList;
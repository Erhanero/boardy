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

const FormCreateList = ({boardId, onSuccess}) => {
	const {createList, isLoading} = useCreateList();
	
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		const result = await createList(data, boardId);
		
        if (result) {
            onSuccess?.();
        }
	}

	const fields = [
		{
			id: 'listTitle',
			name: 'listTitle',
			validation: { required: 'Please enter a title for the list.' },
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

			{fields.map(({ id, name, label, validation, type }, index) => (
				<div className="form__group" key={id}>
					<InputField 
						{...register(name, validation)}
						type={type}
						name={name}
						id={id}
						placeholder="Enter list name"
						autoFocus
					/>

					{errors[name] && (
						<span className="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}
		</Form >
	)
}

export default FormCreateList;
/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';
import useCreateCard from '@/hooks/cards/use-create-card';
import useUpdateCard from '@/hooks/cards/use-update-card';

const FormCard = ({ cardData, listId, boardId, onSuccess, mode = 'create' }) => {
	const isEditMode = mode === 'edit';
	
	const { createCard, isLoading: isCreateLoading } = useCreateCard();
	const { updateCard, isLoading: isUpdateLoading } = useUpdateCard();
	const isLoading = isEditMode ? isUpdateLoading : isCreateLoading;
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: cardData?.title || '',
			description: cardData?.description || '',
			label: cardData?.label || '',
		},		
	})

	const onSubmit = async (data) => {
		try {
			if (isEditMode) {
				await updateCard(data, cardData.id);
				onSuccess?.();

			} else {
				const result = await createCard(data, boardId, listId);
				if (result) {
					onSuccess?.();
				}
			}
		} catch (error) {
			console.error( error.message);
		}
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
		<Form
			onSubmit={handleSubmit(onSubmit)}
			submitBtnText={isEditMode ? 'Save' : 'Add'}
			isLoading={isLoading}
			disabled={isLoading}		
		>
			{fields.map(({ id, name, label, validation, type }, index) => (
				<div className="form__group" key={id}>
					<label htmlFor={id} className="form__label">
						{label}
					</label>

					<InputField
						{...register(name, validation)}
						type={type}
						name={name}
						id={id}
						autoFocus={index === 0}
					/>

					{errors[name] && (
						<span className="form__error">{errors[name]?.message}</span>
					)}
				</div>
			))}
		</Form >
	);
}

export default FormCard;
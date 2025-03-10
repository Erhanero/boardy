/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Form from '@/components/form/form';
import useCreateBoard from '@/hooks/boards/use-create-board';

const FormCreateBoard = () => {
	const navigate = useNavigate();
	const { createBoard, isLoading } = useCreateBoard();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {		
		const newBoard = await createBoard(data);

		if (newBoard) {
			navigate(`/boards/${newBoard.id}`);
		}
	}

	const fields = [
		{
			id: 'boardName',
			name: 'boardName',
			validation: { required: 'Please enter a name for the board.' },
			type: 'text',
		}
	];

	return (
		<Form
			className="form--alt"
			onSubmit={handleSubmit(onSubmit)}
			submitBtnText="Create board"
			isLoading={isLoading}
			disabled={isLoading}
		>

			{fields.map(({ id, name, label, validation, type }) => (
				<div className="form__group" key={id}>
					<InputField
						{...register(name, validation)}
						type={type}
						name={name}
						id={id}
						placeholder="Enter board name"
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

export default FormCreateBoard;
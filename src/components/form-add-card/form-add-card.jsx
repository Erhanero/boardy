/**
 * External dependencies.
 */
import { useForm } from 'react-hook-form';

/**
 * Internal dependencies.
 */
import InputField from '@/components/input-field/input-field';
import Button from '@/components/button/button';

const FormAddCard = () => {
	const {
		handleSubmit,
		register,
		// formState: { errors },
	} = useForm()

	const onSubmit = (data) => {
		console.log(data);
	}
	
	return (
		<div className="form">
			<form action="?" method="post" onSubmit={handleSubmit(onSubmit)}>
				<div className="form__body">
					<div className="form__controls">
						<label htmlFor="title" className="form__label">Title</label>

						<InputField {...register("title", { required: true })} name="title" id="title" />
					</div>

					<div className="form__controls">
						<label htmlFor="description" className="form__label">Description</label>

						<InputField {...register("description")} type="textarea" name="description" id="description" />
					</div>

					<div className="form__controls">
						<label htmlFor="label" className="form__label">Label</label>

						<InputField {...register("label")} name="label" id="label"/>
					</div>
				</div>
                        
				<div className="form__actions">
					<Button type="submit" variant="blue">Add</Button>					
				</div>
			</form>
		</div>
	);
}

export default FormAddCard;
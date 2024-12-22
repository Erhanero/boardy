/**
 * External dependencies.
 */
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import Button from '@/components/button/button';

const Form = ({onSubmit, children, submitBtnText, className}) => {
	return (
		<div className={classNames('form', className)}>
			<form action="?" method="post" onSubmit={onSubmit}>
				<div className="form__body">
					{children}	
				</div>

				<div className="form__actions">
					<Button type="submit" variant="blue">{submitBtnText}</Button>
				</div>
			</form>
		</div>
	)
}
export default Form;
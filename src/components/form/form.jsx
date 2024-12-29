/**
 * External dependencies.
 */
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import Button from '@/components/button/button';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner';

const Form = (props) => {
	const { onSubmit, children, submitBtnText, className, isLoading } = props

	return (
		<div className={classNames('form', className)}>
			<form action="?" method="post" onSubmit={onSubmit}>
				<div className="form__body">
					{children}
				</div>

				<div className="form__actions">
					<Button type="submit" variant="blue" disabled={isLoading}>
						{isLoading ? <LoadingSpinner width="20"/> : submitBtnText}
					</Button>
				</div>
			</form>
		</div>
	)
}
export default Form;
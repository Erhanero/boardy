import classNames from 'classnames';

const Section = ({ title, children, className }) => {
	return (
		<section className={classNames('section', className)}>
			<div className="section__head">
				<h3>{title}</h3>
			</div>

			<div className="section__body">
				{children}
			</div>
		</section>
	)
}

export default Section;
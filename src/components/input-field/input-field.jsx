/**
 * External dependencies.
 */
import {forwardRef} from 'react';
import classNames from 'classnames';

const InputField = forwardRef(({ 
	type = 'text', 
	id, 
	name, 
	className,
	...props 
  }, ref) => {
	
	if (type === 'textarea') {
	  return (
		<textarea 
		  ref={ref}
		  className={classNames("input-field input-field--textarea", className)}
		  id={id}
		  name={name}
		  {...props}
		/>
	  );
	}
  
	return (
	  <input
		ref={ref}
		className={classNames("input-field", className)}    
		type={type}
		id={id}
		name={name}
		{...props}
	  />
	);
  });

export default InputField;
import { useState } from 'react';

const EditableText = ({text}) => {
	const [value, setValue] = useState(text);

	/**
	 * Handle text change.
	 * 
	 * @param {Event} e 
	 * @returns {Void}
	 */
	const handleTextchange = (e) => {
		setValue(e.target.value);
	}

	return (
		<div className="editable-text">			
			<h3>{ value }</h3>
		
			<textarea value={value} onChange={handleTextchange}>{ value }</textarea>
		</div>
	)
}

export default EditableText;
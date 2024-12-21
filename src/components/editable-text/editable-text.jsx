import { useState } from 'react';

const EditableTitle = ({text}) => {
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
		<div className="editable-title">			
			<h4>{ value }</h4>
		
			<textarea value={value} onChange={handleTextchange}>{ value }</textarea>
		</div>
	)
}

export default EditableTitle;
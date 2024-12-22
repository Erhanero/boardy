/**
 * External dependencies.
 */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const EditableText = ({initialText, className}) => {
	const [text, setText] = useState(initialText);
	const textareaRef = useRef(null);	
	const [textHeight, setTextHeight] = useState('auto');

	useEffect(() => {
		if (textareaRef.current) {	
			setTextHeight(textareaRef.current.scrollHeight)		 
		}
	  }, [text]);

	/**
	 * Handle text change.
	 * 
	 * @param {Event} e 
	 * @returns {Void}
	 */
	const handleTextchange = (e) => {
		if (e.target.value == '') {
			return;
		}
		
		setText(e.target.value);	
	}

	return (
		<div className={classNames("editable-text", className)} style={{ height: textHeight }}>			
			<h3>{ text }</h3>
		
			<textarea
				value={text}
				onChange={handleTextchange}
				ref={textareaRef}
			>{text}</textarea>
		</div>
	)
}

export default EditableText;
/**
 * External dependencies.
 */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '@/components/icons/icon';

const EditableText = ({ initialText, fontSize = '16px', className, onBlur }) => {
	const [text, setText] = useState(initialText);
	const textareaRef = useRef(null);
	const [textHeight, setTextHeight] = useState('auto');

	useEffect(() => {
		setText(initialText);

		if (textareaRef.current) {
			setTextHeight(textareaRef.current.scrollHeight)
		}
	}, [initialText]);

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

	/**
	 * Handle key down.
	 * 
	 * @param {Event} e 
	 * @returns {Void}
	 */
	const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textareaRef.current.blur();
        }
    }

	/**
	 * Handle blur.
	 * 
	 * @returns {Void}
	 */
    const handleBlur = () => {
        if (text !== initialText) {
            onBlur?.(text);
        }
    }

	return (
		<div
			className={classNames("editable-text", className)}
			style={{ height: textHeight, "--font-size": `${fontSize}` }}
		>
			<h3>{text}</h3>

			<textarea
				value={text}
				onChange={handleTextchange}
				onKeyDown={handleKeyDown}
                onBlur={handleBlur}
				ref={textareaRef}
			>{text}</textarea>

			<span className="editable__icon">
				<Icon name="edit"/>
			</span>
		</div>
	)
}

export default EditableText;
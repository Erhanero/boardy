/**
 * External dependencies.
 */
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

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
				<svg  viewBox="0 0 24 24">
					<path d="M0 0h24v24H0z" fill="none">
					</path>
					<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z">
					</path>
				</svg>
			</span>
		</div>
	)
}

export default EditableText;
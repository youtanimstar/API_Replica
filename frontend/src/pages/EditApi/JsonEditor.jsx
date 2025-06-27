import React, { useState, useRef, useEffect } from 'react';

// --- Helper Functions ---

/**
 * Gets the current line's text and its indentation level.
 * @param {string} text - The full text from the textarea.
 * @param {number} cursorPosition - The current cursor position.
 * @returns {{line: string, indentLevel: number, lineStart: number}}
 */
const getCurrentLineInfo = (text, cursorPosition) => {
    const textUpToCursor = text.substring(0, cursorPosition);
    const lineStartIndex = textUpToCursor.lastIndexOf('\n') + 1;
    const currentLine = text.substring(lineStartIndex).split('\n')[0];
    
    const indentationMatch = currentLine.match(/^\s*/);
    const indent = indentationMatch ? indentationMatch[0] : '';

    return {
        line: currentLine,
        indentLevel: indent.length,
        lineStart: lineStartIndex,
    };
};


// --- SVG Icons ---

const FormatIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 8H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const CopyIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// --- JSON Editor Component ---
const JsonEditor = ({ inputValue, setInputValue }) => {
    const textareaRef = useRef(null);
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState('');
    const [nextCursorPosition, setNextCursorPosition] = useState(null);

    // Effect to reset the copy status after a delay
    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    // Effect to programmatically set the cursor position after state updates
    useEffect(() => {
        if (textareaRef.current && nextCursorPosition !== null) {
            textareaRef.current.setSelectionRange(nextCursorPosition, nextCursorPosition);
            setNextCursorPosition(null); // Reset after setting
        }
    }, [inputValue, nextCursorPosition]); // Rerun when input value changes

    /**
     * Handles formatting the JSON content in the editor.
     */
    const handleFormat = () => {
        try {
            const parsedJson = JSON.parse(inputValue);
            const formattedJson = JSON.stringify(parsedJson, null, 2);
            setInputValue(formattedJson);
            setError('');
        } catch (e) {
            setError('Invalid JSON: ' + e.message);
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        }
    };

    /**
     * Handles copying the editor content to the clipboard.
     */
    const handleCopy = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(inputValue)
                .then(() => setIsCopied(true))
                .catch(err => console.error('Failed to copy text: ', err));
        } else {
            // Fallback for insecure contexts or older browsers
            textareaRef.current.select();
            document.execCommand('copy');
            setIsCopied(true);
        }
    };

    /**
     * Handles keydown events for smart indentation and auto-completion.
     */
    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { value, selectionStart, selectionEnd } = textarea;
        const key = e.key;

        const bracketPairs = { '{': '}', '[': ']', '(': ')', '"': '"', "'": "'" };
        const closingBrackets = new Set(['}', ']', ')', '"', "'"]);

        // --- 1. Handle Auto-Pairing ---
        if (bracketPairs[key]) {
            e.preventDefault();
            const opening = key;
            const closing = bracketPairs[key];
            const selectedText = value.substring(selectionStart, selectionEnd);

            const newValue = 
                value.substring(0, selectionStart) +
                opening + selectedText + closing +
                value.substring(selectionEnd);
            
            setInputValue(newValue);
            setNextCursorPosition(selectionStart + 1 + selectedText.length);

        // --- 2. Handle Tab Key for Indentation ---
        } else if (key === 'Tab') {
            e.preventDefault();
            const indent = '  '; // 2 spaces for tab
            const newValue = 
                value.substring(0, selectionStart) + 
                indent + 
                value.substring(selectionEnd);
                
            setInputValue(newValue);
            setNextCursorPosition(selectionStart + indent.length);
        
        // --- 3. Handle Enter Key for Smart Indentation ---
        } else if (key === 'Enter') {
            e.preventDefault();
            
            const { indentLevel, lineStart } = getCurrentLineInfo(value, selectionStart);
            const textBeforeCursor = value.substring(lineStart, selectionStart);
            const textAfterCursor = value.substring(selectionStart);
            
            let extraIndent = 0;
            if (/[\{\[]\s*$/.test(textBeforeCursor)) {
                 extraIndent = 2;
            }

            const newIndentLevel = indentLevel + extraIndent;
            const newIndent = ' '.repeat(newIndentLevel);
            
            let closingBracketIndent = '';
            if (/[\{\[]\s*$/.test(textBeforeCursor) && /^\s*[\}\]]/.test(textAfterCursor)) {
                closingBracketIndent = '\n' + ' '.repeat(indentLevel);
            }

            const newValue = 
                value.substring(0, selectionStart) +
                '\n' + newIndent +
                (closingBracketIndent ? closingBracketIndent : '') +
                value.substring(selectionEnd);

            setInputValue(newValue);
            setNextCursorPosition(selectionStart + 1 + newIndent.length);
        
        // --- 4. Handle Backspace to remove pairs ---
        } else if (key === 'Backspace') {
            const charBefore = value.substring(selectionStart - 1, selectionStart);
            const charAfter = value.substring(selectionStart, selectionStart + 1);

            if (bracketPairs[charBefore] === charAfter) {
                e.preventDefault();
                const newValue = value.substring(0, selectionStart - 1) + value.substring(selectionStart + 1);
                setInputValue(newValue);
                setNextCursorPosition(selectionStart - 1);
            }
        }
    };

    return (
        <div className="bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-2xl w-full h-[280px] flex flex-col font-mono text-sm">
            {/* Header with controls */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#252526] border-b border-[#3c3c3c] rounded-t-lg">
                <span className="text-[#9e9e9e]">JSON Editor</span>
                <div className="flex items-center space-x-2">
                    {error && <span className="text-red-500 text-xs">{error}</span>}
                    <button 
                        onClick={handleFormat} 
                        className="flex items-center space-x-1.5 text-[#cccccc] hover:bg-[#3c3c3c] px-2 py-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Format JSON"
                    >
                        <FormatIcon />
                        <span>Format</span>
                    </button>
                    <button 
                        onClick={handleCopy} 
                        className="flex items-center space-x-1.5 text-[#cccccc] hover:bg-[#3c3c3c] px-2 py-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Copy to Clipboard"
                    >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
            </div>
            
            {/* Textarea for the editor */}
            <div className="relative w-full h-full">
                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck="false"
                    className="w-full h-full p-4 bg-transparent text-[#d4d4d4] caret-white resize-none focus:outline-none leading-relaxed"
                    style={{ tabSize: 2, WebkitTabSize: 2, MozTabSize: 2 }}
                />
            </div>
        </div>
    );
};


// --- Main App Component (for demonstration) ---

// export default function App() {
//     const initialJson = `{
//   "id": "0001",
//   "type": "donut",
//   "name": "Cake",
//   "ppu": 0.55,
//   "batters": {
//     "batter": [
//       { "id": "1001", "type": "Regular" },
//       { "id": "1002", "type": "Chocolate" },
//       { "id": "1003", "type": "Blueberry" },
//       { "id": "1004", "type": "Devil's Food" }
//     ]
//   },
//   "topping": [
//     { "id": "5001", "type": "None" },
//     { "id": "5002", "type": "Glazed" },
//     { "id": "5005", "type": "Sugar" },
//     { "id": "5007", "type": "Powdered Sugar" },
//     { "id": "5006", "type": "Chocolate with Sprinkles" },
//     { "id": "5003", "type": "Chocolate" },
//     { "id": "5004", "type": "Maple" }
//   ]
// }`;

//     const [jsonValue, setJsonValue] = useState(initialJson);

//     return (
//         <div className="bg-[#0e0e0e] min-h-screen flex items-center justify-center p-4 sm:p-8">
//             <div className="w-full max-w-4xl h-[70vh] min-h-[400px]">
//                 <JsonEditor 
//                     inputValue={jsonValue}
//                     setInputValue={setJsonValue}
//                 />
//             </div>
//         </div>
//     );
// }


export default JsonEditor;
import React from "react";

const EndPointCard = ({method,path,id,completeURL,apiName,selected,...props}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(completeURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`flex items-center p-4 border-gray-200 rounded-xl hover:border-violet-400 border-[3px] cursor-pointer transition duration-300 ${selected? " border-violet-400 bg-violet-50":""}`} {...props}>
      <span className="font-bold text-green-600 w-16 tracking-wide">{method}</span>
      <span className="text-gray-600 flex-grow tracking-wider">{path}</span>
      <div className="flex items-center gap-2">
        <button
          className={`flex items-center justify-center gap-1.5  bg-violet-200 text-violet-800 font-medium rounded-lg hover:bg-violet-300 transition-colors duration-300 focus:outline-none focus-ring-purple relative h-[35px] w-[35px]`}
          onClick={handleCopy}
        >
          {copied ? (
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
              </svg>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            </span>
          )}
        </button>
        <button className="flex items-center justify-center gap-1.5  bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors duration-300 focus:outline-none focus-ring-purple  h-[35px] w-[35px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EndPointCard;

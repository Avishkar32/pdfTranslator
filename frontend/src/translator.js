import React, { useRef, useState } from "react";

function PdfTranslateForm() {
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDictionary, setSelectedDictionary] = useState("");
  const [originalWord, setOriginalWord] = useState("");
  const [replacementWord, setReplacementWord] = useState("");
  const [dictionaryName, setDictionaryName] = useState("");
  const [dictionaryEntries, setDictionaryEntries] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const dictionaries = ["Dictionary 1", "Dictionary 2", "Dictionary 3", "Dictionary 4"];

  const handleDictionarySelect = (dictionary) => {
    setSelectedDictionary(dictionary);
    setDropdownOpen(false);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleAddDictionaryEntry = () => {
    if (originalWord && replacementWord) {
      setDictionaryEntries((prev) => [
        ...prev,
        { original: originalWord, replacement: replacementWord },
      ]);
      setOriginalWord("");
      setReplacementWord("");
    }
  };

  const handleSaveDictionary = () => {
    // Save logic for the dictionary goes here
    console.log("Dictionary Name:", dictionaryName);
    console.log("Entries:", dictionaryEntries);
    // After saving, you can reset the modal
    setDictionaryName("");
    setDictionaryEntries([]);
    setIsOpen(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-full max-w-2xl h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white relative">
        <h2 className="text-left text-2xl font-semibold text-gray-700 mb-6">
          Upload and Translate your PDF
        </h2>
        <form className="space-y-8">
          {/* Custom File Upload */}
          <div>
            <label className="block text-left text-xl font-medium text-gray-600 mb-1">
              Upload PDF
            </label>
            <div
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-between cursor-pointer"
              onClick={handleFileInputClick}
            >
              <span className="text-gray-500">Choose file</span>
              <button
                type="button"
                className="bg-blue-800 text-white py-1 px-4 rounded hover:bg-blue-900"
              >
                Browse
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Input and Output Language */}
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="block text-left text-xl font-medium text-gray-600 mb-1">
                Input Language
              </label>
              <input
                type="text"
                placeholder="Input Language"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white bg-opacity-10 backdrop-blur-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-left text-xl font-medium text-gray-600 mb-1">
                Output Language
              </label>
              <input
                type="text"
                placeholder="Output Language"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white bg-opacity-10 backdrop-blur-md"
              />
            </div>
          </div>

          {/* Choose Dictionary */}
          <div className=" flex-1 ">
            <label className="block text-left text-xl font-medium text-gray-600 mb-1">
              Choose Dictionary
            </label>
            <div className="relative flex items-center mb-4">
            <div
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white bg-opacity-10 backdrop-blur-md cursor-pointer mr-2 flex items-center justify-between"
              onClick={toggleDropdown}
            >
              <span className="text-gray-500">{selectedDictionary || "Select a dictionary"}</span>
              <span className="text-gray-500">▼</span>
            </div>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-1/2 bg-white bg-opacity-80 border border-gray-300 rounded shadow-lg left-0">
                {dictionaries.map((dictionary, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-blue-200 cursor-pointer"
                    onClick={() => handleDictionarySelect(dictionary)}
                  >
                    {dictionary}
                  </div>
                ))}
              </div>
            )}
            {/* Add New Dictionary Button */}
            <button
              type="button"
              className="w-full bg-blue-800 text-white font-medium py-2 px-4 rounded hover:bg-blue-900"
              onClick={() => setIsOpen(true)}
            >
              Add New Dictionary
            </button>
            </div>
          </div>
          

          {/* Translate Button */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-medium py-3 text-xl rounded-lg hover:bg-blue-900 transition mt-4"
          >
            Translate PDF
          </button>
        </form>
      </div>

      {/* Modal for Adding Dictionary */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Dictionary</h3>
            <div className="mb-4">
              <label className="block text-left text-md font-medium text-gray-600 mb-1">
                Dictionary Name
              </label>
              <input
                type="text"
                value={dictionaryName}
                onChange={(e) => setDictionaryName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter Dictionary Name"
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-left text-md font-medium text-gray-600 mb-1">
                  Original Word
                </label>
                <input
                  type="text"
                  value={originalWord}
                  onChange={(e) => setOriginalWord(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Original Word"
                />
              </div>
              <div className="flex-1">
                <label className="block text-left text-md font-medium text-gray-600 mb-1">
                  Word to Replace
                </label>
                <input
                  type="text"
                  value={replacementWord}
                  onChange={(e) => setReplacementWord(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Replace With"
                />
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
              onClick={handleAddDictionaryEntry}
            >
              Add Dictionary Entry
            </button>
            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700"
              onClick={handleSaveDictionary}
            >
              Save Dictionary
            </button>
            <button
              type="button"
              className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfTranslateForm;

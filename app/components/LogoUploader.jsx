import React, { useState } from 'react';

const SpaceLogoUploader = ({ onUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a preview of the image
      onUpload(file); // Pass the file to the parent
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    onUpload(null); // Notify parent about removal
  };

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label className="font-semibold text-sm">
        Space logo <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-3">
        {/* Image Preview */}
        <div
          className={`w-20 h-20 border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden ${
             'rounded-full'
          }`}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-gray-400 text-center">No image</span>
          )}
        </div>


        {/* Buttons */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="upload-logo"
            className="bg-blue-500 text-white px-7 py-3 text-xs rounded-md cursor-pointer hover:bg-blue-600"
          >
            Change
          </label>
          <input
            id="upload-logo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {imagePreview && (
            <button
              onClick={handleRemoveImage}
              className="text-red-500  hover:text-red-700 text-2xl"
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpaceLogoUploader;

import React, { useState } from "react";

import axios from "axios";

export const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const [message, setMessage] = useState("");

  // single file uploader
  const uploadImage = (e) => {
    if (e.target.files[0]) {
      setIsloading(true);
    }

    setTimeout(() => {
      setIsloading(false);
      setSelectedFile((prev) =>
        e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : prev
      );
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("files", selectedFile);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label labelFor="file">Upload your file</label>
          <input type="file" name="file" onChange={uploadImage} />
        </div>
        {isLoading
          ? "Loading ...."
          : selectedFile && (
              <div>
                <img src={selectedFile} alt="uploaded" />
              </div>
            )}

        <div>
          <label labelFor="file">Message</label>
          <input
            type="text"
            name="message"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

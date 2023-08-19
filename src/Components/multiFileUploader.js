import React, { useEffect, useState } from "react";
import { uploadMedia } from "../Api/media";

// mui
import { Grid, Box, TextField, Button } from "@mui/material";

export const MultiFileUploader = () => {
  const [previews, setPreviews] = useState(null);
  const [selected, setSelected] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const [message, setMessage] = useState("");

  // multi file uploader

  // handlers
  const uploadImage = (e) => {
    let selected = Array.from(e.target.files);

    if (selected.length > 0) {
      setIsloading(true);
    }
    setTimeout(() => {
      setIsloading(false);

      let filesToAdd = [];

      selected.some((file) => {
        if (uploadedFiles.findIndex((f) => f.name === file.name) === -1) {
          filesToAdd.push(file);
        }
        setUploadedFiles([...uploadedFiles, ...filesToAdd]);
        // setSelectedFile();
      });
      // console.log(selected);
      const previewUrls = selected.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
      // console.log(previewUrls[0]);
      setSelected(previewUrls[0]);
    }, 3000);
  };

  const handleSelected = (currentIndex) => {
    setSelected(previews[currentIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", message);

    for (const file of uploadedFiles) {
      formData.append(`files`, file);
    }
    uploadMedia(formData);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #c4c4c4 ",
      }}
    >
      <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
          <Box
          // sx={{
          //   backgroundColor: "#f5f5f5",
          // }}
          >
            <Button component="label" variant="contained">
              <input
                type="file"
                name="file"
                onChange={uploadImage}
                accept="image/* ,video/*"
                multiple
                hidden
              />
              Upload
            </Button>
          </Box>

          {isLoading
            ? "Loading ...."
            : previews && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <img
                    src={selected}
                    alt="selected"
                    style={{
                      width: "200px",
                      height: "180px",
                    }}
                  />
                  <video width="200" height="180" controls>
                    <source src={selected} type="video/mp4" />
                  </video>
                  <div>
                    {previews.map((previewUrl, index) => (
                      <img
                        key={index}
                        src={previewUrl}
                        alt={`Preview ${index}`}
                        style={{
                          width: "110px",
                          height: "100px",
                          cursor: "pointer",
                          padding: "10px",
                        }}
                        onClick={() => handleSelected(index)}
                      />
                    ))}
                  </div>
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
      </Grid>
      <Grid item xs={4}>
        <Box>something</Box>
      </Grid>
    </Grid>
  );
};

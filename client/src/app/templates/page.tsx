'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [html, setHtml] = useState('');
  const [color, setColor] = useState('#000000');
  const [text, setText] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('v1');

  const handleTextChange = (event: { target: { value: any; }; }) => {
    const newText = event.target.value;
    setText(newText);

    // Save the text dynamically as the user types
    saveText(newText);
  };

  const saveText = (newText: any) => {
    axios
      .post('http://localhost:3001/api/text', { text: newText })
      .then((response: any) => {
        // Handle the response from the server
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleColorChange = (event: { target: { value: any; }; }) => {
    const newColor = event.target.value;

    // Send a PUT request to update the color on the server
    axios
      .put('http://localhost:3001/api/color', { color: newColor })
      .then(() => {
        setColor(newColor);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleVersionChange = (event: { target: { value: any; }; }) => {
    const selectedVersion = event.target.value;
    setSelectedVersion(selectedVersion);
  };

  useEffect(() => {
    if (selectedVersion) {
      axios
        .get(`http://localhost:3001/api/${selectedVersion}`)
        .then((response: { data: React.SetStateAction<string>; }) => {
          setHtml(response.data);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [selectedVersion]);

  return (
    <>
      <div>Select HTML Version</div>
      <select value={selectedVersion} onChange={handleVersionChange}>
        <option value="v1">Version 1</option>
        <option value="v2">Version 2</option>
        <option value="v3">Version 3</option>
        <option value="v4">Version 4</option>
      </select>
      <input type="color" value={color} onChange={handleColorChange} />
      <input
        className="border"
        placeholder="text"
        type="text"
        value={text}
        onChange={handleTextChange}
      />
      <div style={{ color }} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default App;
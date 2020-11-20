import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';

const Box = styled.div`
background-color: white;
padding: 1rem;
`
const EditingArea = styled.div`
font-family: Linux Libertine;
em {
  font-style: italic;
}
`
const Tool = styled.button`
`

const Editor = () => {

  const _onSubmit = () => {
  }

  return (
    <Box>
      <ReactQuill theme="snow">
        <EditingArea />
      </ReactQuill>
      <Tool onClick={_onSubmit}>Submit</Tool>
    </Box>
  );
}

export default Editor;

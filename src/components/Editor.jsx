import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import styled from 'styled-components';

const Box = styled.div`
background-color: white;
padding: 1rem;
`
const StyledQuill = styled(ReactQuill)`
`
const Tool = styled.button`
`

const Editor = () => {
  const [value, setValue] = useState('');

  const _onSubmit = () => {
    console.log(value);
  }

  return (
    <Box>
      <StyledQuill theme="snow" value={value} onChange={setValue}/>
      <Tool onClick={_onSubmit}>Submit</Tool>
    </Box>
  );
}

export default Editor;

import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
/* Styles to implement:
 *  - Bold x
 *  - Italic x
 *  - blockquote
 *  - strikethrough
 *  - Header1
 *  - Header2
 *  - Header3
 *
 *  - Return focus after button click
 *  - Ensure state change after button click
 */

const Box = styled.div`
padding: 0.25rem;
`
const EditorBox = styled.div`
border: black solid 1px;
resize: both;
overflow: auto;
height: 15rem;
padding: 0.5rem;
`
const Toolbar = styled.div`
display: flex;
margin: 1rem;
`
const Tool = styled.button`
font-family: 'EB Garamond';
border: none;
background-color: ${({theme}) => theme.color.white};
display: inline-block;
cursor: pointer;
font-size: 1rem;
`

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const _onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }
  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  const _onSubmit = () => {
    console.log(editorState.getCurrentContent().getPlainText());
  }
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return (
    <Box>
      <Toolbar>
        <Tool onClick={_onBoldClick}>B</Tool>
        <Tool onClick={_onItalicClick}>I</Tool>
      </Toolbar>
      <EditorBox>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </EditorBox>
      <Tool onClick={_onSubmit}>Submit</Tool>
    </Box>
  );
}

export default MyEditor;

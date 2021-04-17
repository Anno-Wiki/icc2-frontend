import { default as Editor } from './Editor';
import React, { useState } from 'react';
import getOffsetFromBase from '../utilities/getOffsetFromBase';
import AnnotateBox from './AnnotateBox';

const Annotator = ({ toc, tocID }) => {
  const [displayEditor, setDisplayEditor] = useState(false);
  const [selectedText, setSelectedText] = useState({});
  // changes the editor's state, passed to the editor
  const changeEditor = state => {
    setDisplayEditor(state);
  };

  const clickAnnotateButton = e => {
    e.preventDefault();
    const sel = getOffsetFromBase(document.getElementById('read'));
    setDisplayEditor(true);
    setSelectedText(sel);
  };
  return (
    <>
      <AnnotateBox handleClick={clickAnnotateButton} />
      <Editor
        editorState={displayEditor}
        updateState={changeEditor}
        selection={selectedText}
        toc={`${toc.bookid}-${tocID}`}
      />
    </>
  );
};

export default Annotator;

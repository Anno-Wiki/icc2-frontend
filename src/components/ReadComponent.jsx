import React, {useEffect, useState} from 'react';
import axios from '../utilities/axiosInstance';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as annotate } from '@fortawesome/free-solid-svg-icons';
import { default as Editor } from './Editor';

function getOffsetFromBase(element) {
  // Adapted from Tim Down https://stackoverflow.com/a/4812022/9691276
  let start = 0, end = 0;
  let doc = element.ownerDocument || element.document;
  let win = doc.defaultView || doc.parentWindow;
  let sel, str, preCaretStr;
  if (typeof win.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      let range = sel.getRangeAt(0);
      let preCaretRange = range.cloneRange();

      // create pre-caret range
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);

      // get pre-caret range length for start point
      sel.removeAllRanges();
      sel.addRange(preCaretRange);
      preCaretStr = sel.toString().replace(/\r/g, '');
      start = preCaretStr.length;

      // replace original range
      sel.removeAllRanges();
      sel.addRange(range);
      str = sel.toString().replace(/\r/g, '');
      end = start + str.length;
    } else {
      return {}
    }
  }
  return {
    start: start,
    end: end,
    length: str.length,
    selection: str,
    preCaret: preCaretStr
  }
}

const ReadBase = styled.div`
line-height: 1.2rem;
`
const AnnotateDiv = styled.div`
position: absolute;
opacity: 0;
transition: opacity ${({theme}) => theme.transition.medium} linear;
top: 0;
left: 0;
width: fit-content;
cursor: pointer;
&:hover {
  & > div, svg {
    transition: color ${({theme}) => theme.transition.short} linear;
    transition: background-color ${({theme}) => theme.transition.short} linear;
    color: ${({theme}) => theme.color.iconfgalt};
    background-color: ${({theme}) => theme.color.iconbgalt};
  }
}
`
const AnnotateIcon = styled(FontAwesomeIcon)`
color: ${({theme}) => theme.color.iconfg};
`
const AnnotateButton = styled.div`
display: inline-block;
border-radius: 3px;
padding: 0.5rem;
background-color: ${({theme}) => theme.color.iconbg};
`
const AnnotateArrow = styled.div`
height: 20px;
width: 20px;
transform: rotate(45deg) translate(-9px, -9px);
background-color: ${({theme}) => theme.color.iconbg};
margin: 0 auto;
border-radius: 3px;
`
const AnnotateBox = ({ process }) => {
  return (
    <AnnotateDiv id="annotatebox" onMouseDown={process}>
      <AnnotateButton>
        <AnnotateIcon icon={annotate} />
      </AnnotateButton>
      <AnnotateArrow />
    </AnnotateDiv>
  )
}

export const ReadComponent = () => {
  const {textTitle, tocID} = useParams();
  const [toc, setToc] = useState({});
  const [text, setText] = useState({});
  const [selStore, setSelStore] = useState("");

  // to turn the editor visible or invisible
  const [editorState, setEditorState] = useState(false);
  const [selectionState, setSelectionState] = useState({});

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios.get(`/text/${textTitle}`).then(res => setToc(res.data)).catch(err => console.log(err));
  }, [textTitle]);

  useEffect(() => {
    if (toc !== undefined && toc.bookid !== undefined) {
        axios.get(`/toc/${toc.bookid}-${tocID}/formatted`).then(res => setText(res.data)).catch(err => console.log(err));
    }
  }, [toc, tocID]);

  useEffect(() => {
    // This effect polls the window to see if there are any selections. If there
    // are, it makes the annotate button visible
    const getSel = setInterval(() => {
      const sel = window.getSelection();
      const str = sel.toString();
      if (str !== selStore){
        setSelStore(str);
        const box = document.getElementById('annotatebox');
        const base = document.getElementById('read');
        const r = sel.getRangeAt(0);
        // double check selection is in the read base and user is authenticated
        if (sel.toString() !== "" && base.contains(r.startContainer) && isAuthenticated) {

          // get the client rectangles and calculate the offset left and top
          const rects = r.getClientRects()[0];
          const transform = `translate(` +
            `${Math.round(rects.x + (rects.width / 2))}px, ` +
            `${Math.round(rects.y + window.scrollY - box.offsetHeight + 8)}px)`;

          // make visible and move
          box.style.transform = transform;
          box.style.opacity = '100%';
        } else {
          // make invisible, no move
          box.style.opacity = '0';
        }
      }
    }, 100)
    return () => clearInterval(getSel);
  });

  // click annotate button
  const process = (e) => {
    e.preventDefault();
    const base = document.getElementById('read');
    const sel = getOffsetFromBase(base);
    console.log(sel);
    setSelectionState(sel);
    setEditorState(true);
  }

  // changes the editor's state, passed to the editor
  const changeEditor = (state) => {
    setEditorState(state);
  };

  const createText = () => {
    return {__html: text.text}
  };

  return(
    <div>
      <AnnotateBox process={process} />
      <Editor
        editorState={editorState}
        updateState={changeEditor}
        selection={selectionState}
        toc={`${toc.bookid}-${tocID}`}
      />
      <ReadBase id='read' dangerouslySetInnerHTML={createText()} />
    </div>
  )
}

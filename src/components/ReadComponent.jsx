import React, {useEffect, useState} from 'react';
import axios from '../utilities/axiosInstance';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen as annotate } from '@fortawesome/free-solid-svg-icons'

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
const AnnotateBox = () => {
  const process = (e) => {
    const base = document.getElementById('read');
    console.log(getOffsetFromBase(base));
    e.preventDefault();
  }
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

  useEffect(() => {
    axios.get(`/text/${textTitle}`).then(res => setToc(res.data)).catch(err => console.log(err));
  }, [textTitle])

  useEffect(() => {
    axios.get(`/toc/${toc.bookid}-${tocID}/formatted`).then(res => setText(res.data)).catch(err => console.log(err));
  }, [toc, tocID])

  useEffect(() => {
    const getSel = setInterval(() => {
      const sel = window.getSelection();
      const str = sel.toString();
      if (str !== selStore){
        setSelStore(str);
        const box = document.getElementById('annotatebox');
        if (sel.toString() !== "") {
          const r = sel.getRangeAt(0);
          const rects = r.getClientRects()[0];
          const transform = `translate(` +
            `${Math.round(rects.x + (rects.width / 2))}px, ` +
            `${Math.round(rects.y + window.scrollY - box.offsetHeight + 8)}px)`;
          box.style.transform = transform;
          box.style.opacity = '100%';
        } else {
          box.style.opacity = '0';
        }
      }
    }, 100)
    return () => clearInterval(getSel);
  })


  const createText = () => {
    return {__html: text.text}
  }

  return(
    <div>
      <AnnotateBox />
      <ReadBase id='read' dangerouslySetInnerHTML={createText()} />
    </div>
  )
}

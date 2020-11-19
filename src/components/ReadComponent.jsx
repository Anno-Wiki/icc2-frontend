import React, {useEffect, useState} from 'react';
import axios from '../utilities/axiosInstance';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen as annotate } from '@fortawesome/free-solid-svg-icons'

const ReadBase = styled.div`
line-height: 1.2rem;
`
const AnnotateDiv = styled.div`
width: fit-content;
&:hover {
  & > div {
    transition: color ${({theme}) => theme.transition.short} linear;
    transition: background-color ${({theme}) => theme.transition.short} linear;
    color: ${({theme}) => theme.color.iconfgalt};
    background-color: ${({theme}) => theme.color.iconbgalt};
    cursor: pointer;
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
  return (
    <AnnotateDiv>
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
  const [selObj, setSelObj] = useState({});

  useEffect(() => {
    axios.get(`/text/${textTitle}`).then(res => setToc(res.data)).catch(err => console.log(err));
  }, [textTitle])

  useEffect(() => {
    axios.get(`/toc/${toc.bookid}-${tocID}/formatted`).then(res => setText(res.data)).catch(err => console.log(err));
  }, [toc, tocID])

  useEffect(() => {
    const getSel = setInterval(() => {
      const sel = window.getSelection();
      if (sel.toString() !== selObj.toString()){
        setSelObj(sel);
      }
    }, 100)
    return () => clearInterval(getSel);
  })

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


  const process = () => {
    const base = document.getElementById('read');
    console.log(getOffsetFromBase(base));
  }

  const createText = () => {
    return {__html: text.text}
  }

  return(
    <div>
      <AnnotateBox onClick={process}/>
      <ReadBase id='read' dangerouslySetInnerHTML={createText()} />
    </div>
  )
}

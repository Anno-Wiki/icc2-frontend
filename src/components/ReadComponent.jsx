import React, {useEffect, useState} from 'react';
import axios from '../utilities/axiosInstance';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

const ReadBase = styled.div`

`

export const ReadComponent = () => {
  const {textTitle, tocID} = useParams();
  const [toc, setToc] = useState({});
  const [text, setText] = useState({});

  useEffect(() => {
    axios.get(`/text/${textTitle}`).then(res => setToc(res.data)).catch(err => console.log(err))
  }, [textTitle])

  useEffect(() => {
    axios.get(`/toc/${toc.bookid}-${tocID}/formatted`).then(res => setText(res.data)).catch(err => console.log(err))
  }, [toc, tocID])
  console.log(text);

  const createText = () => {
    return {__html: text.text}
  }
  return(
    <ReadBase dangerouslySetInnerHTML={createText()} />
  )
}

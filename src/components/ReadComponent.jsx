import React, {useEffect, useState} from "react";
import axios from "../utilities/axiosInstance";
import {NavLink, useParams} from "react-router-dom";

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
    <div dangerouslySetInnerHTML={createText()} />
  )
}

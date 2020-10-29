import React, {useEffect, useState} from "react";
import axios from "../utilities/axiosInstance";
import {NavLink, useParams} from "react-router-dom";

export const TocComponent = () => {
  const [tocs, setTocs] = useState([]);
  const { textTitle } = useParams();

  useEffect(() => {
    axios.get(`/toc/${textTitle}/all`).then(res => setTocs(res.data.results)).catch(err => console.log(err))
  }, [textTitle])
  const Toc = ({content, tocID}) => {
    return(
      <div>
        <NavLink to={{pathname: `/text/${textTitle}/${tocID}`}}>{content}</NavLink>
      </div>
    )
  }
  return (
    <>
      <h1>Table of Contents</h1>
      {tocs.map(toc =>
      <Toc content={toc.content} tocID={toc.id}/>
      )}
    </>
  )
}

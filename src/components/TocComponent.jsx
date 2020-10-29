import React, {useEffect, useState} from "react";
import axios from "../utilities/axiosInstance";
import {NavLink, useParams} from "react-router-dom";

export const TocComponent = () => {
  const [tocs, setTocs] = useState([]);
  const { textTitle } = useParams();

  useEffect(() => {
    axios.get(`/toc/${textTitle}/all`).then(res => setTocs(res.data.results)).catch(err => console.log(err))
  }, [textTitle])
  const Toc = ({toc}) => {
    return(
      <div>
        {
          toc.linkable ?
            <NavLink to={{pathname: `/text/${textTitle}/${toc.id}`}}>{toc.content}</NavLink> :
            <h2>{toc.content}</h2>
        }
      </div>
    )
  }
  return (
    <>
      <h1>Table of Contents</h1>
      {tocs.map(toc =>
      <Toc toc={toc}/>
      )}
    </>
  )
}

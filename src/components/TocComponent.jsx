import React, { useEffect, useState } from 'react';
import axios from '../utilities/axiosInstance';
import { NavLink, useParams } from 'react-router-dom';

export const TocComponent = () => {
  const [tocs, setTocs] = useState([]);
  const { textTitle } = useParams();

  useEffect(() => {
    axios
      .get(`/_api/toc/${textTitle}/all`)
      .then(res => setTocs(res.data.results))
      .catch(err => console.log(err));
  }, [textTitle]);

  const Toc = ({ toc }) => {
    return (
      <li>
        {toc.linkable ? (
          <NavLink to={{ pathname: `/text/${textTitle}/${toc.id}` }}>
            {toc.content}
          </NavLink>
        ) : (
          <h2>{toc.content}</h2>
        )}
      </li>
    );
  };

  return (
    <>
      <h1>Table of Contents</h1>
      <ul>
        {tocs.map(toc => (
          <Toc toc={toc} key={toc.id} />
        ))}
      </ul>
    </>
  );
};

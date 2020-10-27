import React, {useEffect, useState} from "react";
import axios from "../utilities/axiosInstance";
import {NavLink} from "react-router-dom";

export const TextsComponent = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    axios.get('/text/all')
      .then(resp => {
        setTexts(resp.data.results);
      }, error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ul>
        {texts.map((text) => {
          return (
          <li key={text.slug}>
            <NavLink to={{pathname: `/text/${text.slug}`, state: {bookid:text.bookid, bookTitle: text.slug}}}>{text.name}</NavLink>
          </li>
        )})}
      </ul>

    </div>
  )

}

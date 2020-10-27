import React, {useEffect, useState} from "react";
import axios from "../utilities/axiosInstance";

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
        {texts.map((text, index) => (
          <li key={text.slug}>
            <h1>{text.name}</h1>
          </li>
        ))}
      </ul>
    </div>
  )

}

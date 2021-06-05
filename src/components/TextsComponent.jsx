import React, { useEffect, useState } from 'react';
import axios from '../utilities/axiosInstance';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: disc;
`;

const ListItem = styled.li`
  margin: 1rem;
`;
const Link = styled(NavLink)`
  margin: 0.5rem;
`;

export const TextsComponent = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    axios.get('/_api/text/all').then(
      resp => {
        setTexts(resp.data.results);
      },
      error => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h1>Texts</h1>
      <List>
        {texts.map(text => {
          return (
            <ListItem key={text.slug}>
              <Link
                to={{
                  pathname: `/text/${text.slug}`,
                  state: { bookid: text.bookid, bookTitle: text.slug },
                }}
              >
                {text.name}
              </Link>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

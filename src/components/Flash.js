import React, { useEffect, useState } from 'react';
import Bus from '../utilities/bus';
import styled from 'styled-components';

const Alert = styled.div`
  color: white;
  font-family: ${({theme}) => theme.font.sans};

  position: absolute;
  border-radius: 1px;

  top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 50%;

  display: flex;
  justify-content: space-between;
  z-index: 1111;
  p {
    margin: 1rem;
  }
`;
const Close = styled.div`
  color: white;
  cursor: pointer;
  margin: 0.5rem;
`;

const alertStyles = {
  error: { background: 'lightcoral' },
  success: { background: 'lightgreen' },
};

const Flash = () => {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('');

  useEffect(() => {
    Bus.addListener('flash', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 5000);
    });
  }, []);

  return (
    visibility && (
      <Alert style={alertStyles[type]}>
        <p>{message}</p>
        <Close onClick={() => setVisibility(false)}>
          <strong>&times;</strong>
        </Close>
      </Alert>
    )
  );
};

export default Flash;

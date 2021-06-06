import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios, { setToken, isAuthenticated } from '../utilities/axiosInstance';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Field = styled.input`
  margin: 1rem;
  width: 15rem;
  border-radius: 0;
  border: 0;
  height: 1rem;
  background-color: ${({theme}) => theme.color.lightGray};
`;

const Button = styled.button`
  background-color: ${({theme}) => theme.color.lightGray};
`

const RegisterComponent = () => {
  let history = useHistory();
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    if (isAuthenticated)
      history.push('/');
  })

  const login = async (username, password) => {
    await axios.post('/_auth/login', {username: username, password: password})
      .then((resp) => {
        setToken(resp.data['access_token']);
        history.push('/')
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    if (e)
      e.preventDefault();
    for (let field of [usr, pwd])
      if (field === '') {
        alert("All fields are required.");
        return;
      }

    login(usr, pwd);
  };

  const handleChange = (e) => {
    const mapper = {Username: setUsr, Password: setPwd};
    mapper[e.target.name](e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Field
        name="Username" placeholder="Username" type="text"
        onChange={handleChange}
      />
      <Field
        name="Password" placeholder="Password" type="password"
        onChange={handleChange}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default RegisterComponent;

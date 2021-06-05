import React, { useState } from 'react';
import styled from 'styled-components';

import axios from '../utilities/axiosInstance';

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
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');

  const register = (username, password) => {
    axios.post('/_auth/register', {username: username, password: password})
      .then((resp) => {
        if (resp.json['success'] == true) {
          // @TODO Login
          // @TODO Store token
          // @TODO redirect
        }
      })
      .catch(err => console.log(err));
  }

  const handleSubmit = (e) => {
    if (e)
      e.preventDefault();
    for (let field of [usr, pwd, pwd2])
      if (field === '')
        alert("All fields are required.");

    if (pwd !== pwd2)
      alert("Passwords do not match");
    register(usr, pwd);
  }

  const handleChange = (e) => {
    const mapper = {Username: setUsr, Password: setPwd, Password2: setPwd2};
    mapper[e.target.name](e.target.value);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="Username" placeholder="Username" type="text"
        onChange={handleChange}
      />
      <Field
        name="Password" placeholder="Password" type="password"
        onChange={handleChange}
      />
      <Field
        name="Password2" placeholder="Password" type="password"
        onChange={handleChange}
      />
      <Button>Submit</Button>
    </Form>
  );
};

export default RegisterComponent;

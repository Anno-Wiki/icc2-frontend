import React from 'react';
import { Button } from '../global/styledcomponents';

const LoginButton = () => {
  return <Button onClick={() => alert("test")} >Log In</Button>;
};

export default LoginButton;

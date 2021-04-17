import React, { forwardRef } from 'react';
import styled from 'styled-components';
const ReadBase = styled.div`
  line-height: 1.2rem;
`;
const TextComponent = forwardRef(({ text }, ref) => {
  const createText = () => {
    return { __html: text };
  };
  return (
    <ReadBase ref={ref} id="read" dangerouslySetInnerHTML={createText()} />
  );
});

export default TextComponent;

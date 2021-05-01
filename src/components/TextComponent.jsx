import React, { forwardRef, useEffect } from 'react';
import styled from 'styled-components';
const ReadBase = styled.div`
  line-height: 1.2rem;
`;
const TextComponent = forwardRef(({ text, setChildNodes }, ref) => {
  useEffect(() => {
    setChildNodes([...ref.current.childNodes]);
  }, [text, ref, setChildNodes]);

  return (
    <ReadBase ref={ref} id="read" dangerouslySetInnerHTML={{ __html: text }} />
  );
});

export default TextComponent;

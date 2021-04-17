import React from 'react';
import styled from 'styled-components';

const Annotation = props => {
  return (
    <StyledAnnotation
      X={props.X}
      Y={props.Y}
      style={{ display: props.visible ? 'block' : 'none' }}
    >
      <button onClick={() => props.handleClick(props.number, false)}>
        &times;
      </button>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </StyledAnnotation>
  );
};

const AnnotationMarker = props => {
  return (
    <StyledAnnotationMarker
      X={props.X}
      Y={props.Y}
      onClick={() => props.handleClick(props.number, true)}
    >
      [{props.number}]
    </StyledAnnotationMarker>
  );
};

const AnnotationController = ({
  visible,
  setState,
  adata,
  childNodes,
  rects,
}) => {
  const findNodePos = n => {
    let seen = 0;
    let current = 0;
    const nodes = childNodes;
    for (let i = 0; i < nodes.length; i++) {
      current += nodes[i].textContent.length;
      if (current >= n) {
        return [nodes[i].firstChild, n - seen];
      }
      seen += nodes[i].textContent.length;
    }
  };

  const findLocation = (open, close) => {
    const range = new Range();
    var a = findNodePos(open);
    var b = findNodePos(close);
    try {
      range.setStart(...a);
      range.setEnd(...b);
      const span = document.createElement('span');
      span.style.color = 'red';
      range.surroundContents(span);
      const rects = range.getClientRects();
      const pos = rects[rects.length - 1].top;
      return pos;
    } catch {
      return 100;
    }
  };

  const clickAnnotation = (i, state) => {
    let arr = visible.slice();
    arr[i] = state;
    setState(prevState => ({ ...prevState, visible: arr }));
  };

  return (
    <>
      {childNodes.length > 0 &&
        adata &&
        adata.annotations.map((a, i) => (
          <AnnotationMarker
            key={i}
            X={rects[0].right}
            Y={findLocation(a.open, a.close)}
            number={i + 1}
            handleClick={clickAnnotation}
          />
        ))}
      {childNodes.length > 0 &&
        adata &&
        adata.annotations.map((a, i) => (
          <Annotation
            key={i}
            X={rects[0].right - rects[0].left}
            Y={findLocation(a.open, a.close)}
            number={i + 1}
            handleClick={clickAnnotation}
            text={a.text}
            visible={visible[i]}
          />
        ))}
    </>
  );
};

export default AnnotationController;

const StyledAnnotationMarker = styled.button`
  width: fit-content;
  position: absolute;
  z-index: 10;
  top: ${props => props.Y}px;
  left: ${props => props.X}px;
`;

const StyledAnnotation = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-color: ${({ theme }) => theme.color.black};
  border: solid 1px black;
  position: absolute;
  width: 500px;
  padding: 1rem;
  top: ${props => props.Y}px;
  left: ${props => props.X}px;
  z-index: 10;
`;

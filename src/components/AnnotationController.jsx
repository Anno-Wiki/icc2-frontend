import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../global/styledcomponents';

const StyledAnnotation = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-color: ${({ theme }) => theme.color.black};
  border: solid 1px black;
  position: absolute;
  width: ${props => props.width}px;
  top: calc(${props => props.Y}px + 1.2rem);
  left: ${props => props.X}px;
  z-index: 2;
`;

const Annotation = props => {
  return (
    <StyledAnnotation
      X={props.X}
      Y={props.Y}
      width={props.width}
      style={{ display: props.visible ? 'block' : 'none' }}
    >
      <Button
        style={{ float: 'right', maxWidth: '1rem', margin: '0.1rem' }}
        onClick={() => props.handleClick(props.number - 1, false)}
      >
        &times;
      </Button>
      <div
        style={{ margin: '2rem 1rem' }}
        dangerouslySetInnerHTML={{ __html: props.text }}
      />
      {props.author}
    </StyledAnnotation>
  );
};

const AnnotationMarker = props => {
  return (
    <StyledAnnotationMarker
      X={props.X}
      Y={props.Y}
      onClick={() =>
        props.handleClick(props.number - 1, true, props.open, props.close)
      }
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
  const [currentSelection, setCurrentSelection] = useState(null);
  const textNodesUnder = node => {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
    return all;
  };

  const findNodePos = n => {
    const skippers = ['span', 'i', 'b'];
    let seen = 0;
    let current = 0;
    const base = document.getElementById('read');
    const nodes = textNodesUnder(base);
    let lastParent = null;
    for (let i = 0; i < nodes.length; i++) {
      current += nodes[i].length;
      const parent = nodes[i].parentNode;
      if (parent !== lastParent && !skippers.includes(parent.tagName)) {
        lastParent = parent;
        // add 2 returns for every regular element because double newlines
        // are a marker for a new paragraph, or a header, etc. in Markdown
        current += 2;
      }
      if (current >= n) {
        return [nodes[i], n - seen];
      }
      seen += current - seen;
    }
  };

  const findLocation = (open, close) => {
    const range = new Range();
    const a = findNodePos(open);
    const b = findNodePos(close);
    try {
      range.setStart(...a);
      range.setEnd(...b);
      const rects = range.getClientRects();
      const pos = rects[rects.length - 1].top;
      return pos + window.scrollY;
    } catch (err) {
      return 100;
    }
  };

  const highlightSelection = (open, close) => {
    const range = new Range();
    const a = findNodePos(open);
    const b = findNodePos(close);
    try {
      range.setStart(...a);
      range.setEnd(...b);
      const span = document.createElement('span');
      span.style.backgroundColor = 'yellow';
      range.surroundContents(span);
      setCurrentSelection(span);
    } catch (err) {
      console.log(err);
    }
  };

  const unwrap = el => {
    // unwraps the element span
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  };

  const clickAnnotation = (i, state, open = null, close = null) => {
    if (currentSelection === null || !state) {
      // set visibility
      let arr = visible.slice();
      arr[i] = state;
      setState(prevState => ({ ...prevState, visible: arr }));
    }
    if (currentSelection === null && state) {
      // annotation is being opened, highlight and turn it on
      highlightSelection(open, close);
    } else if (!state) {
      // annotation is being closed, turn it off and remove span
      unwrap(currentSelection);
      setCurrentSelection(null);
    }
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
            text={a.text}
            handleClick={clickAnnotation}
            open={a.open}
            close={a.close}
          />
        ))}
      {childNodes.length > 0 &&
        adata &&
        adata.annotations.map((a, i) => (
          <Annotation
            key={i}
            X={rects[0].left}
            width={rects[0].right - rects[0].left}
            Y={findLocation(a.open, a.close)}
            number={i + 1}
            handleClick={clickAnnotation}
            text={a.text}
            visible={visible[i]}
            author={a.author}
          />
        ))}
    </>
  );
};

export default AnnotationController;

const StyledAnnotationMarker = styled.button`
  width: fit-content;
  position: absolute;
  z-index: 1;
  top: ${props => props.Y}px;
  left: ${props => props.X}px;
`;

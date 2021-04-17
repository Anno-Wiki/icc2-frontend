import React from 'react'
import styled from "styled-components";


const Annotation = (props) => {
  return (
    <StyledAnnotation X={props.X} Y={props.Y} style={{ display: props.visible ? 'block' : 'none' }}>
      <button onClick={() => props.handleClick(props.number, false)}>&times;</button>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </StyledAnnotation>
  )
}

const AnnotationMarker = (props) => {
  return (
    <StyledAnnotationMarker X={props.X} Y={props.Y} onClick={() => props.handleClick(props.number, true)}>
      [{ props.number }]
    </StyledAnnotationMarker>
  )
}

const AnnotationController = ({baseRef, visible, setState, adata}) => {

  const findNodePos = (n) => {
    let seen = 0;
    let current = 0;
    const base = baseRef.current;
    const nodes = base.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      current += nodes[i].textContent.length;
      if (current >= n) {
        return [nodes[i].firstChild, n - seen];
      }
      seen += nodes[i].textContent.length;
    }
  }

  const findLocation = (open, close) => {
    const range = new Range();
    var a = findNodePos(open);
    var b = findNodePos(close);
    try {
      range.setStart(...a);
      range.setEnd(...b);
      const rects = range.getClientRects();
      const pos = rects[rects.length-1].bottom;
      return pos;
    } catch {
      return 100;
    }
  }

  const clickAnnotation = (i, state) => {
    let arr = visible.slice();
    arr[i] = state;
    setState(prevState => ({...prevState, visible: arr }));
  }

  const findMarkerX = () => {
    const rects = baseRef.current.getClientRects();
    const pos = rects[0].right;
    return pos;
  }

  const findAnnoX = () => {
    const rects = baseRef.current.getClientRects();
    const pos = rects[0].right - rects[0].left;
    return pos;
  }

   return (
    <>

      {adata && adata.annotations.map((a, i) =>
        <AnnotationMarker
          key={i}
          X={findMarkerX()}
          Y={findLocation(a.open, a.close)}
          number={i+1}
          handleClick={clickAnnotation}
        />
      )}
      {adata && adata.annotations.map((a, i) =>
        <Annotation
          key={i}
          X={findAnnoX()}
          Y={findLocation(a.open, a.close)}
          number={i+1}
          handleClick={clickAnnotation}
          text={a.text}
          visible={visible[i]}
        />
      )}
    </>
  )
}

export default AnnotationController

const StyledAnnotationMarker = styled.button`
width: fit-content;
position: absolute;
z-index: 10;
top: ${props => props.Y}px;
  left: ${props => props.X}px;
`

const StyledAnnotation = styled.div`
background-color: ${({theme}) => theme.color.white};
border-color: ${({theme}) => theme.color.black};
border: solid 1px black;
position: absolute;
width: 500px;
padding: 1rem;
top: ${props => props.Y}px;
left: ${props=> props.X}px;
z-index: 10;
`

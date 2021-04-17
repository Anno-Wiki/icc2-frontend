import {faPen as annotateIcon} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AnnotateBox = (props) => {
  return (
    <AnnotateDiv id="annotatebox" onMouseDown={props.handleClick}>
      <AnnotateButton>
        <AnnotateIcon icon={annotateIcon} />
      </AnnotateButton>
      <AnnotateArrow />
    </AnnotateDiv>
  )
}

export default AnnotateBox

const AnnotateDiv = styled.div`
position: absolute;
opacity: 0;
transition: opacity ${({theme}) => theme.transition.medium} linear;
top: 0;
left: 0;
width: fit-content;
cursor: pointer;
&:hover {
  & > div, svg {
    transition: color ${({theme}) => theme.transition.short} linear;
    transition: background-color ${({theme}) => theme.transition.short} linear;
    color: ${({theme}) => theme.color.iconfgalt};
    background-color: ${({theme}) => theme.color.iconbgalt};
  }
}
`

const AnnotateButton = styled.div`
display: inline-block;
border-radius: 3px;
padding: 0.5rem;
background-color: ${({theme}) => theme.color.iconbg};
`

const AnnotateIcon = styled(FontAwesomeIcon)`
color: ${({theme}) => theme.color.iconfg};
`

const AnnotateArrow = styled.div`
height: 20px;
width: 20px;
transform: rotate(45deg) translate(-9px, -9px);
background-color: ${({theme}) => theme.color.iconbg};
margin: 0 auto;
border-radius: 3px;
`

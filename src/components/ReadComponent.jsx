import React, {useEffect, useState} from 'react';
import axios from '../utilities/axiosInstance';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen as annotate } from '@fortawesome/free-solid-svg-icons';
import { default as Editor } from './Editor';

function getOffsetFromBase(element) {
  // Adapted from Tim Down https://stackoverflow.com/a/4812022/9691276
  let start = 0, end = 0;
  let doc = element.ownerDocument || element.document;
  let win = doc.defaultView || doc.parentWindow;
  let sel, str, preCaretStr;
  if (typeof win.getSelection !== "undefined") {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      let range = sel.getRangeAt(0);
      let preCaretRange = range.cloneRange();

      // create pre-caret range
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);

      // get pre-caret range length for start point
      sel.removeAllRanges();
      sel.addRange(preCaretRange);
      preCaretStr = sel.toString().replace(/\r/g, '');
      start = preCaretStr.length;

      // replace original range
      sel.removeAllRanges();
      sel.addRange(range);
      str = sel.toString().replace(/\r/g, '');
      end = start + str.length;
    } else {
      return {}
    }
  }
  return {
    start: start,
    end: end,
    length: str.length,
    selection: str,
    preCaret: preCaretStr
  }
}

const ReadBase = styled.div`
line-height: 1.2rem;
position: absolute;
transform: translate(-3rem,0);
width: 60%;
padding: 0 1rem;
`
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
const AnnotateIcon = styled(FontAwesomeIcon)`
color: ${({theme}) => theme.color.iconfg};
`
const AnnotateButton = styled.div`
display: inline-block;
border-radius: 3px;
padding: 0.5rem;
background-color: ${({theme}) => theme.color.iconbg};
`
const AnnotateArrow = styled.div`
height: 20px;
width: 20px;
transform: rotate(45deg) translate(-9px, -9px);
background-color: ${({theme}) => theme.color.iconbg};
margin: 0 auto;
border-radius: 3px;
`
const AnnotateBox = ({ process }) => {
  return (
    <AnnotateDiv id="annotatebox" onMouseDown={process}>
      <AnnotateButton>
        <AnnotateIcon icon={annotate} />
      </AnnotateButton>
      <AnnotateArrow />
    </AnnotateDiv>
  )
}

const StyledAnnotationMarker = styled.button`
width: fit-content;
position: absolute;
z-index: 10;
transform: translate(${props => props.X}px, ${props => props.Y}px);
`
const AnnotationMarker = (props) => {
  console.log(props.X);
  return (
    <StyledAnnotationMarker X={props.X} Y={props.Y} onClick={() => props.handleClick(props.number, true)}>
      [{ props.number }]
    </StyledAnnotationMarker>
  )
}
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
const Annotation = (props) => {
  return (
    <StyledAnnotation X={props.X} Y={props.Y} style={{ display: props.visible ? 'block' : 'none' }}>
      <button onClick={() => props.handleClick(props.number, false)}>&times;</button>
      <div dangerouslySetInnerHTML={{ __html: props.text }} />
    </StyledAnnotation>
  )
}


class ReadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toc: {},
      text: {},
      adata: null,            // annotation data
      amarkers: null,
      editorState: false,     // to turn the editor visible or invisible
      selectionState: {},
      postions: [],
      visible: []             // which annotations are visible
    }
    this.textTitle = this.props.match.params.textTitle;
    this.tocID = this.props.match.params.tocID;
    this.isAuthenticated = true;

    this.baseRef = React.createRef();
    this.boxRef = React.createRef();
  }

  async componentDidMount() {
    await axios.get(`/text/${this.textTitle}`).then(res => { this.setState({ toc: res.data }) }).catch(err => console.log(err));
    axios.get(`/toc/${this.state.toc.bookid}-${this.tocID}/formatted`).then(res => this.setState({ text: res.data })).catch(err => console.log(err));
    setInterval(() => this.getSel(), 100);
    await axios.get(`/annotations/toc/${this.state.toc.bookid}-${this.tocID}`).then(res => this.setState({ adata: res.data })).catch(err => console.log(err));
    if (this.state.adata){
      this.setState({ visible: Array(this.state.adata.annotations.length).fill(false) });

    }
  }

  getSel() {
    const sel = window.getSelection();
    const str = sel.toString();
    if (str !== this.state.selStore){
      this.setState({ selStore: str })
      const box = document.getElementById('annotatebox');
      const base = document.getElementById('read');
      const r = sel.getRangeAt(0);
      // double check selection is in the read base and user is authenticated
      if (base !== null && box !== null && sel.toString() !== "" && base.contains(r.startContainer) && this.isAuthenticated) {

        // get the client rectangles and calculate the offset left and top
        const rects = r.getClientRects()[0];
        const transform = `translate(` +
          `${Math.round(rects.x + (rects.width / 2))}px, ` +
          `${Math.round(rects.y + window.scrollY - box.offsetHeight + 8)}px)`;

        // make visible and move
        box.style.transform = transform;
        box.style.opacity = '100%';
      } else if (box !== null){
        // make invisible, no move
        box.style.opacity = '0';
      }
    }
  }

  // click annotate button
  process(e) {
    e.preventDefault();
    const sel = getOffsetFromBase(this.baseRef.current);
    this.setState({ selectionState: sel, editorState: true })
  }

  // changes the editor's state, passed to the editor
  changeEditor(state) {
    this.setState({ editorState: state })
  }
  createText() {
    return { __html: this.state.text.text }
  }

  findNodePos = (n) => {
    let seen = 0;
    let current = 0;
    const base = this.baseRef.current;
    const nodes = base.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      current += nodes[i].textContent.length;
      if (current >= n) {
        return [nodes[i].firstChild, n - seen];
      }
      seen += nodes[i].textContent.length;
    }
  }

  findLocation = (open, close) => {
    const range = new Range();
    var a = this.findNodePos(open);
    var b = this.findNodePos(close);
    try {
      range.setStart(...a);
      range.setEnd(...b);
      const rects = range.getClientRects();
      const pos = rects[rects.length-1].bottom;
      console.log(pos);
      return pos;
    } catch {
      return 100;
    }
  }

  clickAnnotation = (i, state) => {
    let arr = this.state.visible.slice();
    arr[i] = state;
    this.setState({ visible: arr });
  }

  findMarkerX = () => {
    const rects = this.baseRef.current.getClientRects();
    const pos = rects[0].right - rects[0].left;
    return pos;
  }
  findAnnoX = () => {
    const rects = this.baseRef.current.getClientRects();
    const pos = rects[0].right - rects[0].left;
    return pos;
  }

  render() {
    return (
      <div>
        {this.state.adata && this.state.adata.annotations.map((a, i) =>
          <AnnotationMarker
            key={i}
            X={this.findMarkerX()}
            Y={this.findLocation(a.open, a.close)}
            number={i}
            handleClick={this.clickAnnotation}
          />
        )}
        {this.state.adata && this.state.adata.annotations.map((a, i) =>
          <Annotation
            key={i}
            X={this.findAnnoX()}
            Y={this.findLocation(a.open, a.close)}
            number={i}
            handleClick={this.clickAnnotation}
            text={a.text}
            visible={this.state.visible[i]}
          />
        )}
        <AnnotateBox ref={this.boxRef} process={this.process.bind(this)} />
        <Editor
          editorState={this.state.editorState}
          updateState={this.changeEditor.bind(this)}
          selection={this.state.selectionState}
          toc={`${this.state.toc.bookid}-${this.tocID}`}
        />
        <ReadBase ref={this.baseRef} id='read' dangerouslySetInnerHTML={this.createText()} />
      </div>
    )
  }
}
export default withRouter(ReadComponent);

import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import styled from 'styled-components';

const EditorBoxClassName = 'public-DraftEditor-content';
const EditorClassName = 'editor-box';

const Parent = styled.div`
position: absolute;
width: 35rem;
margin: auto;
border: 1px solid ${({theme}) => theme.color.lightGray};
background-color: ${({theme}) => theme.color.white};
right: 0;
bottom: 0;
left: 0;
padding: 0.5rem;
button {
  border: none;
  background-color: white;
  border: none;
  text-decoration: none;
  display: inline-block;
}
.${EditorBoxClassName} {
  height: 10rem;
  resize: vertical;
  overflow: auto;
}
.${EditorClassName} {
  margin: 0.5rem;
}
`
const ButtonBar = styled.div`
text-align: center;
`
const CloseBar = styled.div`
text-align: right;
`
const Close = styled.a`
font-size: 2rem;
`
const Submit = styled.button`
font-family: ${({theme}) => theme.font.display};
font-size: 1rem;
margin: 0.15rem;
padding: 0.25rem;
transition-property: background-color, color;
transition-duration: ${({theme}) => theme.transition.short};
cursor: pointer;
background-color: ${({theme}) => theme.color.lightGray};
&:hover {
  background-color: ${({theme}) => theme.color.lightGray};
  color: white;
}
`

class StatefulEditor extends Component {

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'},
        {label: 'Code', style: 'CODE'},
        {label: 'Strikethrough', style: 'STRIKETHROUGH'},
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'},
        {label: 'Quote', style: 'blockquote'},
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    };
    return (
      <Parent>
        <CloseBar>
          <Close>&times;</Close>
        </CloseBar>
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange}
          toolbarConfig={toolbarConfig}
          className={EditorClassName}
        />
        <ButtonBar>
          <Submit>Submit</Submit>
          <Submit>Cancel</Submit>
        </ButtonBar>
      </Parent>
    );
  }
}

export default StatefulEditor

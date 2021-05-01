function getOffsetFromBase(element) {
  // Adapted from Tim Down https://stackoverflow.com/a/4812022/9691276
  let start = 0,
    end = 0;
  let doc = element.ownerDocument || element.document;
  let win = doc.defaultView || doc.parentWindow;
  let sel, str, preCaretStr;
  if (typeof win.getSelection !== 'undefined') {
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
      // Mac and linux both use a single linebreak character, windows uses two.
      // If we just replace \r with nothing, we'll get no return character from
      // macs and a single from windows. If we just focus on windows \r\n, we
      // can normalize windows to treat new lines as a single character.
      preCaretStr = sel.toString().replace(/\r\n/g, '\n');
      start = preCaretStr.length;

      // replace original range
      sel.removeAllRanges();
      sel.addRange(range);
      str = sel.toString().replace(/\r\n/g, '\n');
      end = start + str.length;
    } else {
      return {};
    }
  }
  return {
    start: start,
    end: end,
    length: str.length,
    selection: str,
    preCaret: preCaretStr,
  };
}

export default getOffsetFromBase;

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
      preCaretStr = sel.toString().replace(/\r/g, '');
      start = preCaretStr.length;

      // replace original range
      sel.removeAllRanges();
      sel.addRange(range);
      str = sel.toString().replace(/\r/g, '');
      end = start + str.length;
    } else {
      return {};
    }
  }
  console.log('start', start);
  console.log('end', end);
  return {
    start: start,
    end: end,
    length: str.length,
    selection: str,
    preCaret: preCaretStr,
  };
}

export default getOffsetFromBase;

const getSel = (strComparison, isAuthenticated) => {
  const sel = window.getSelection();
  const str = sel.toString();
  if (str !== strComparison && sel.rangeCount > 0) {
    const box = document.getElementById('annotatebox');
    const base = document.getElementById('read');
    const r = sel.getRangeAt(0);
    // double check selection is in the read base and user is authenticated
    if (
      base !== null &&
      box !== null &&
      sel.toString() !== '' &&
      base.contains(r.startContainer) &&
      isAuthenticated
    ) {
      // get the client rectangles and calculate the offset left and top
      const rects = r.getClientRects()[0];
      const transform =
        `translate(` +
        `${Math.round(rects.x + rects.width / 2)}px, ` +
        `${Math.round(rects.y + window.scrollY - box.offsetHeight + 8)}px)`;

      // make visible and move
      box.style.transform = transform;
      box.style.opacity = '100%';
    } else if (box !== null) {
      // make invisible, no move
      box.style.opacity = '0';
    }
  }
  return str;
};

export default getSel;

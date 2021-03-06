import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../hooks/useWindowResize';
import AnnotationController from '../components/AnnotationController';
import TextComponent from '../components/TextComponent';
import { useParams } from 'react-router';
import axios from '../utilities/axiosInstance';
import getSel from '../utilities/getSel';
import Annotator from '../components/Annotator';

const ReadContainer = () => {
  const [state, setState] = useState({
    toc: {},
    text: {},
    adata: null, // annotation data
    visible: [], // which annotations are visible
  });
  const [, setHighlightedSelection] = useState('');
  const [textRects, setTextRects] = useState({});
  const [childNodes, setChildNodes] = useState([]);
  const { textTitle, tocID } = useParams();
  const baseRef = useRef(null);

  // API calls
  useEffect(() => {
    const getAnnotations = async id => {
      await axios
        .get(`/_api/annotations/toc/${id}-${tocID}`)
        .then(res =>
          setState(prevState => ({
            ...prevState,
            adata: res.data,
            visible: Array(res.data.annotations.length).fill(false),
          }))
        )
        .catch(err => console.log(err));
    };
    const fetchData = async () => {
      await axios
        .get(`/_api/text/${textTitle}`)
        .then(res => {
          setState(prevState => ({ ...prevState, toc: res.data }));
          getAnnotations(res.data.bookid);
          return res.data.bookid;
        })
        .then(id =>
          axios
            .get(`/_api/toc/${id}-${tocID}/formatted`)
            .then(res =>
              setState(prevState => ({ ...prevState, text: res.data }))
            )
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
      // detects when text is selected by user every 100ms
      setInterval(
        () => setHighlightedSelection(p => getSel(p)),
        100
      );
    };

    fetchData();
  }, [textTitle, tocID]);

  useEffect(() => {
    setTextRects(baseRef.current.getClientRects());
  }, [useWindowSize().width]);

  return (
    <>
      <TextComponent
        ref={baseRef}
        setChildNodes={setChildNodes}
        text={state.text.text}
      />
      <Annotator toc={state.toc} tocID={tocID} />
      <AnnotationController
        visible={state.visible}
        setState={setState}
        adata={state.adata}
        childNodes={childNodes}
        rects={textRects}
      />
    </>
  );
};

export default ReadContainer;

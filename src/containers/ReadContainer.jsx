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
    amarkers: null,
    editorState: false, // to turn the editor visible or invisible
    selectionState: {},
    postions: [],
    visible: [], // which annotations are visible
    selStore: '',
  });
  const [highlightedSelection, setHighlightedSelection] = useState('');
  const { textTitle, tocID } = useParams();
  const isAuthenticated = true;
  const baseRef = useRef(null);

  // API calls
  useEffect(() => {
    const getAnnotations = async id => {
      await axios
        .get(`/annotations/toc/${id}-${tocID}`)
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
        .get(`/text/${textTitle}`)
        .then(res => {
          setState(prevState => ({ ...prevState, toc: res.data }));
          getAnnotations(res.data.bookid);
          return res.data.bookid;
        })
        .then(id =>
          axios
            .get(`/toc/${id}-${tocID}/formatted`)
            .then(res =>
              setState(prevState => ({ ...prevState, text: res.data }))
            )
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
      setInterval(
        () => setHighlightedSelection(p => getSel(p, isAuthenticated)),
        100
      );
    };

    fetchData();
  }, []);
  // used to get resizing of text rects
  useEffect(() => {}, [useWindowSize().width]);

  return (
    <>
      <TextComponent ref={baseRef} text={state.text.text} />
      <Annotator toc={state.toc} tocID={tocID} />
      <AnnotationController
        baseRef={baseRef}
        visible={state.visible}
        setState={setState}
        adata={state.adata}
      />
    </>
  );
};

export default ReadContainer;

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
  }, [isAuthenticated, textTitle, tocID]);

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

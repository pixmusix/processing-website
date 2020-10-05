import React, { useState } from 'react';
import classnames from 'classnames';
import Sketch from './Sketch';
import Code from './Code';
import { fromJS } from 'immutable';

import grid from '../../styles/grid.module.css';
import css from './Logo.module.css';

const initialState = fromJS({
  showGrid: false,
  width: 600,
  height: 600,
  unit: 60,
  strokeWidth: 1.5,
  shapes: [
    {
      type: true,
      color: { r: 30, g: 42, b: 103 },
      pos: [1, 1, 0, 0, 0, 0, 9, 7],
      showHandlers: false,
      dragging: null,
    },
    {
      type: false,
      color: { r: 2, g: 81, b: 200 },
      pos: [7, 3, 8, 0, 1, 0, 5, 8],
      showHandlers: false,
      dragging: null,
    },
    {
      type: false,
      color: { r: 80, g: 139, b: 255 },
      pos: [1, 3, 3, 8, 5, 2, 9, 7],
      showHandlers: false,
      dragging: null,
    },
  ],
});

const Logo = (props) => {
  const [state, setState] = useState(initialState);
  const [showCode, setShow] = useState(false);
  const changeStateHandler = (e, path, value) => {
    setState((state) => state.setIn(path, value));
  };

  const stateJS = state.toJS();

  const handleClickOnSketch = () => {
    setState((state) => state.setIn(['showCode'], !showCode ? true : false));
    setShow((showCode) => !showCode);
  };

  const handleMouseEnterShapeLine = (shapeIdx) => {
    setState((state) =>
      state.setIn(['shapes', shapeIdx, 'showHandlers'], true)
    );
  };

  const handleMouseLeaveShapeLine = (shapeIdx) => {
    setState((state) =>
      state.setIn(['shapes', shapeIdx, 'showHandlers'], false)
    );
  };

  const handleDraggingShapeStart = (shapeIdx, index) => {
    setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], index));
  };

  const handleDraggingShapeEnd = (shapeIdx) => {
    setState((state) => state.setIn(['shapes', shapeIdx, 'dragging'], null));
  };

  return (
    <div className={classnames(css.root, grid.grid)}>
      <Code
        onChange={changeStateHandler}
        isVisible={showCode}
        {...stateJS}
        onMouseEnterShape={handleMouseEnterShapeLine}
        onMouseLeaveShape={handleMouseLeaveShapeLine}
        onDraggingShapeStart={handleDraggingShapeStart}
        onDraggingShapeEnd={handleDraggingShapeEnd}
      />
      <Sketch
        onClick={() => handleClickOnSketch()}
        {...stateJS}
        isVisible={showCode}
      />
    </div>
  );
};

export default Logo;

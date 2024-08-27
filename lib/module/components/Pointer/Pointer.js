"use strict";

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body } from "../Body.js";
import { Action } from "../Action/index.js";
import { useStore } from "../../stores/useStore.js";
import { useEffect, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Pointer = ({
  step,
  onColse
}) => {
  const {
    title,
    actions,
    content,
    element
  } = step;
  const refs = useStore(s => s.elementRefs);
  const ref = refs[element];
  const [result, setResult] = useState();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref && ref.current) {
      //@ts-ignore
      ref?.current.measure((x, y, width, height, pageX, pageY) => {
        const msg = `Element position new: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`;
        setTop(pageY + height + 20);
        setResult(msg);
      });
    }
  }, [ref]);
  return /*#__PURE__*/_jsxs(View, {
    style: {
      ...styles.pointer,
      marginTop: top
    },
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.pointerHeader,
      children: [/*#__PURE__*/_jsx(Text, {
        style: styles.pointerText,
        children: title
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/_jsx(Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.pointerBody,
      children: /*#__PURE__*/_jsxs(Text, {
        children: ["PP: ", result]
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.pointerBody,
      children: !!content && /*#__PURE__*/_jsx(Body, {
        content: content
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.pointerFooter,
      children: actions.map(action => {
        return /*#__PURE__*/_jsx(Action, {
          action,
          onColse
        }, action.id);
      })
    })]
  });
};
const styles = StyleSheet.create({
  pointer: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  pointerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  pointerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10
  },
  pointerText: {
    textAlign: 'center'
  },
  pointerBody: {
    paddingVertical: 8
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=Pointer.js.map
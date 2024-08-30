"use strict";

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body } from "../Body.js";
import { Action } from "../Action/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Slideout = ({
  step,
  onColse
}) => {
  const {
    title,
    actions,
    content
  } = step;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.slidout,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.slidoutHeader,
      children: [/*#__PURE__*/_jsx(Text, {
        style: styles.slidoutText,
        children: title
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/_jsx(Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.slidoutBody,
      children: !!content && /*#__PURE__*/_jsx(Body, {
        content: content
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.slidoutFooter,
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
  slidout: {
    backgroundColor: '#fff',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 30
  },
  slidoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  slidoutFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10
  },
  slidoutText: {
    textAlign: 'center'
  },
  slidoutBody: {
    paddingVertical: 8
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=Slideout.js.map
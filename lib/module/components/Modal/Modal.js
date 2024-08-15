"use strict";

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body } from "./Body.js";
import { Action } from "../Action/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Modal = ({
  step,
  onColse,
  tourStepIndex,
  setTourStepIndex
}) => {
  const {
    title,
    actions,
    content
  } = step;
  return /*#__PURE__*/_jsxs(View, {
    style: styles.modal,
    children: [/*#__PURE__*/_jsxs(View, {
      style: styles.modalHeader,
      children: [/*#__PURE__*/_jsx(Text, {
        style: styles.modalText,
        children: title
      }), /*#__PURE__*/_jsx(TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/_jsx(Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: styles.modalBody,
      children: !!content && /*#__PURE__*/_jsx(Body, {
        content: content
      })
    }), /*#__PURE__*/_jsx(View, {
      style: styles.modalFooter,
      children: actions.map(action => {
        return /*#__PURE__*/_jsx(Action, {
          action,
          onColse,
          tourStepIndex,
          setTourStepIndex
        }, action.id);
      })
    })]
  });
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10
  },
  modalText: {
    textAlign: 'center'
  },
  modalBody: {
    paddingVertical: 8
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  }
});
//# sourceMappingURL=Modal.js.map
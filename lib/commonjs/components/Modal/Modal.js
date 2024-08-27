"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;
var _reactNative = require("react-native");
var _Body = require("../Body.js");
var _index = require("../Action/index.js");
var _jsxRuntime = require("react/jsx-runtime");
const Modal = ({
  step,
  onColse
}) => {
  const {
    title,
    actions,
    content
  } = step;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: styles.modal,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.modalHeader,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.modalText,
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
        style: styles.crossBtn,
        onPress: onColse,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          children: "X"
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.modalBody,
      children: !!content && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Body.Body, {
        content: content
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.modalFooter,
      children: actions.map(action => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_index.Action, {
          action,
          onColse
        }, action.id);
      })
    })]
  });
};
exports.Modal = Modal;
const styles = _reactNative.StyleSheet.create({
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
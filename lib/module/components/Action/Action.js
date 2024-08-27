"use strict";

import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useStore } from "../../stores/useStore.js";
import { jsx as _jsx } from "react/jsx-runtime";
export const USAction = ({
  action,
  onColse
}) => {
  const {
    styleType,
    type,
    value
  } = action;
  const setTourStepIndex = useStore(s => s.setTourStepIndex);
  const tourStepIndex = useStore(s => s.tourStepIndex);
  const onPress = useMemo(() => {
    switch (type) {
      case 'next':
        return () => setTourStepIndex(tourStepIndex + 1);
      case 'previous':
        return () => setTourStepIndex(tourStepIndex - 1);
      default:
        return onColse;
    }
  }, [onColse, setTourStepIndex, tourStepIndex, type]);
  const style = useMemo(() => {
    switch (styleType) {
      case 'Primary':
        return {
          ...styles.footerBtn,
          ...styles.primaryBtn
        };
      case 'Secondary':
        return {
          ...styles.footerBtn,
          ...styles.secondaryBrn
        };
      default:
        return {
          ...styles.footerBtn
        };
    }
  }, [styleType]);
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: style,
    onPress: onPress,
    children: /*#__PURE__*/_jsx(Text, {
      children: value
    })
  });
};
const styles = StyleSheet.create({
  footerBtn: {
    marginRight: 10,
    padding: 8,
    borderRadius: 6
  },
  primaryBtn: {
    backgroundColor: '#387DFF'
  },
  secondaryBrn: {
    borderColor: '#464646',
    borderWidth: 1
  }
});
//# sourceMappingURL=Action.js.map
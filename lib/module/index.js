"use strict";

import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const useCurrentRouteName = () => {
  const [currentRouteName, setCurrentRouteName] = useState('');
  const state = useNavigationState(s => s);
  useEffect(() => {
    if (state) {
      let route = state.routes[state.index];
      const pathResult = [];
      if (route) {
        pathResult.push(route.name);
        let subState = route.state;
        while (subState) {
          route = subState.routes[subState.index ?? 0];
          if (route) {
            pathResult.push(route.name);
            subState = route.state;
          } else {
            subState = undefined;
          }
        }
      }
      setCurrentRouteName(pathResult.join('/'));
    }
  }, [state]);
  return currentRouteName;
};
export const Usetiful = ({
  children
}) => {
  const viewRef = useRef(null);
  const currentRouteName = useCurrentRouteName();
  const [tours, setTours] = useState();
  const [tourStepIndex, setTourStepIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.usetiful.com/api-space/data.json?lang=en', {
          method: 'GET',
          headers: {
            'X-Auth-Token': '34ae1d22e7615d614bd3a17920a907c0',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json; charset=utf-8'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const {
          tours: _tours
        } = await response.json();
        setTours(_tours);
      } catch (error) {
        // console.log('=====error====>', error.message);
      }
    };
    fetchData();
  }, []);
  const availableTour = useMemo(() => {
    setTourStepIndex(0);
    if (tours && tours.length) {
      return tours.find(tour => tour.targets.find(target => !!target.url && currentRouteName.includes(target.url)));
    } else {
      return undefined;
    }
  }, [currentRouteName, tours]);
  useEffect(() => {
    setSelfClosed(false);
  }, [currentRouteName]);
  const [selfClosed, setSelfClosed] = useState(false);

  // const measureElement = () => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       Alert.alert(`Element position: X: ${pageX}, Y: ${pageY}, Width: ${width}, Height: ${height}`);
  //     });
  //   }
  // };

  return /*#__PURE__*/_jsxs(View, {
    style: styles.UsetifulContainer,
    children: [children, /*#__PURE__*/_jsx(View, {
      ref: viewRef,
      children: /*#__PURE__*/_jsx(Text, {
        children: "Hi"
      })
    }), !!availableTour && !selfClosed && availableTour.steps[tourStepIndex] && /*#__PURE__*/_jsx(View, {
      style: styles.usetifulLayer,
      children: /*#__PURE__*/_jsx(USModal, {
        step: availableTour.steps[tourStepIndex],
        onColse: () => setSelfClosed(true),
        tourStepIndex: tourStepIndex,
        setTourStepIndex: to => {
          if (availableTour.steps.length - 1 >= to && to >= 0) {
            setTourStepIndex(to);
          }
        }
      })
    })]
  });
};
const USModal = ({
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
const Action = ({
  action,
  setTourStepIndex,
  tourStepIndex,
  onColse
}) => {
  const {
    styleType,
    type,
    value
  } = action;
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
const Body = ({
  content
}) => {
  const [webViewHeight, setWebViewHeight] = useState(0);
  const webviewRef = useRef(null);
  const injectedJavaScript = `
    (function() {
      const height = document.documentElement.scrollHeight;
      window.ReactNativeWebView.postMessage(height.toString());
    })();
  `;
  const body = useMemo(() => {
    return `${content}${bodyCss}`;
  }, [content]);
  return /*#__PURE__*/_jsx(View, {
    style: {
      height: webViewHeight / 4
    },
    children: /*#__PURE__*/_jsx(WebView, {
      ref: webviewRef,
      originWhitelist: ['*'],
      source: {
        html: body
      },
      injectedJavaScript: injectedJavaScript,
      onMessage: event => {
        setWebViewHeight(Number(event.nativeEvent.data));
      }
    })
  });
};
const styles = StyleSheet.create({
  UsetifulContainer: {
    flex: 1
  },
  usetifulLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000cc'
  },
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
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  },
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
  },
  modalText: {
    textAlign: 'center'
  },
  modalBody: {
    paddingVertical: 8
  }
});
const bodyCss = `<style>
p{
font-size:36px;
}
</style>`;
//# sourceMappingURL=index.js.map
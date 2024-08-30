"use strict";

import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { Modal } from "./components/Modal/index.js";
import { useStore } from "./stores/useStore.js";
import { Pointer } from "./components/Pointer/index.js";
import { Slideout } from "./components/Slideout/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export { useRefRegister } from "./hooks/useRefRegister.js";
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
  children,
  token
}) => {
  const currentRouteName = useCurrentRouteName();
  const layoutRef = useRef(null);
  const tours = useStore(s => s.tours);
  const setTours = useStore(s => s.setTours);
  const setTourStepIndex = useStore(s => s.setTourStepIndex);
  const tourStepIndex = useStore(s => s.tourStepIndex);
  const availableTour = useStore(s => s.availableTour);
  const setAvailableTour = useStore(s => s.setAvailableTour);
  const [layoutMeasure, setLayoutMeasure] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.usetiful.com/api-space/data.json?lang=en', {
          method: 'GET',
          headers: {
            'X-Auth-Token': token,
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
  }, [setTours, token]);
  useEffect(() => {
    setTourStepIndex(0);
    if (tours && tours.length) {
      setAvailableTour(tours.find(tour => tour.targets.find(target => !!target.url && currentRouteName.includes(target.url))));
    } else {
      setAvailableTour(undefined);
    }
  }, [currentRouteName, setAvailableTour, setTourStepIndex, tours]);
  useEffect(() => {
    setSelfClosed(false);
  }, [currentRouteName]);
  const [selfClosed, setSelfClosed] = useState(false);
  const step = !!availableTour && !selfClosed && availableTour.steps[tourStepIndex] ? availableTour.steps[tourStepIndex] : undefined;
  useEffect(() => {
    if (layoutRef && layoutRef.current) {
      //@ts-ignore
      layoutRef?.current.measure((x, y, width, height, pageX, pageY) => {
        setLayoutMeasure({
          x,
          y,
          width,
          height,
          pageX,
          pageY
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutRef.current]);
  return /*#__PURE__*/_jsxs(View, {
    style: styles.UsetifulContainer,
    ref: layoutRef,
    children: [children, step && /*#__PURE__*/_jsxs(View
    // eslint-disable-next-line react-native/no-inline-styles
    , {
      style: {
        ...styles.usetifulLayer,
        backgroundColor: step.type === 'modal' ? '#000000cc' : 'transparent',
        justifyContent: step.type === 'slideout' ? 'flex-end' : 'flex-start'
      },
      children: [step.type === 'modal' && /*#__PURE__*/_jsx(Modal, {
        step: step,
        onColse: () => setSelfClosed(true)
      }), step.type === 'pointer' && /*#__PURE__*/_jsx(Pointer, {
        step: step,
        onColse: () => setSelfClosed(true),
        layoutMeasure: layoutMeasure
      }), step.type === 'slideout' && /*#__PURE__*/_jsx(Slideout, {
        step: step,
        onColse: () => setSelfClosed(true)
      })]
    })]
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
  }
});
//# sourceMappingURL=index.js.map
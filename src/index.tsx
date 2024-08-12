import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import WebView from 'react-native-webview';

type Response = {
  tours: Tour[];
};
type Tour = {
  id: string;
  name: 'Vahid test';
  steps: TourStep[];
  targets: Target[];
};
type Action = {
  id: string;
  styleType: 'Primary' | 'Secondary' | string;
  type: 'next' | 'close' | 'previous';
  value: string;
};
type TourStep = {
  actions: Action[];
  content: string;
  id: string;
  title: string;
  type: 'modal' | string;
};
type Target = {
  type: 'address-simple' | string;
  url?: string;
};

const useCurrentRouteName = () => {
  const [currentRouteName, setCurrentRouteName] = useState('');
  const state = useNavigationState((s) => s);

  useEffect(() => {
    if (state) {
      let route = state.routes[state.index];
      const pathResult: string[] = [];
      if (route) {
        pathResult.push(route.name);
        let subState = route.state;
        while (subState) {
          route = subState.routes[subState.index ?? 0] as any;
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

export const Usetiful = ({ children }: PropsWithChildren) => {
  const viewRef = useRef<View>(null);

  const currentRouteName = useCurrentRouteName();

  const [tours, setTours] = useState<Tour[]>();
  const [tourStepIndex, setTourStepIndex] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.usetiful.com/api-space/data.json?lang=en',
          {
            method: 'GET',
            headers: {
              'X-Auth-Token': '34ae1d22e7615d614bd3a17920a907c0',
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=utf-8',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { tours: _tours } = (await response.json()) as Response;
        setTours(_tours);
      } catch (error) {
        // console.log('=====error====>', error.message);
      }
    };

    fetchData();
  }, []);

  const availableTour: Tour | undefined = useMemo(() => {
    setTourStepIndex(0);
    if (tours && tours.length) {
      return tours.find((tour) =>
        tour.targets.find(
          (target) => !!target.url && currentRouteName.includes(target.url)
        )
      );
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

  return (
    <View style={styles.UsetifulContainer}>
      {children}
      <View ref={viewRef}>
        <Text>Hi</Text>
      </View>
      {!!availableTour && !selfClosed && availableTour.steps[tourStepIndex] && (
        <View style={styles.usetifulLayer}>
          <USModal
            step={availableTour.steps[tourStepIndex]}
            onColse={() => setSelfClosed(true)}
            tourStepIndex={tourStepIndex}
            setTourStepIndex={(to: number) => {
              if (availableTour.steps.length - 1 >= to && to >= 0) {
                setTourStepIndex(to);
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

type ModalProps = {
  step: TourStep;
  onColse: () => void;
  tourStepIndex: number;
  setTourStepIndex: (to: number) => void;
};
const USModal = ({
  step,
  onColse,
  tourStepIndex,
  setTourStepIndex,
}: ModalProps) => {
  const { title, actions, content } = step;

  return (
    <View style={styles.modal}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalText}>{title}</Text>
        <TouchableOpacity style={styles.crossBtn} onPress={onColse}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalBody}>
        {!!content && <Body content={content} />}
      </View>
      <View style={styles.modalFooter}>
        {actions.map((action) => {
          return (
            <Action
              key={action.id}
              {...{ action, onColse, tourStepIndex, setTourStepIndex }}
            />
          );
        })}
      </View>
    </View>
  );
};

type ActionProps = {
  action: Action;
  setTourStepIndex: (to: number) => void;
  tourStepIndex: number;
  onColse: () => void;
};
const Action = ({
  action,
  setTourStepIndex,
  tourStepIndex,
  onColse,
}: ActionProps) => {
  const { styleType, type, value } = action;

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
        return { ...styles.footerBtn, ...styles.primaryBtn };
      case 'Secondary':
        return { ...styles.footerBtn, ...styles.secondaryBrn };
      default:
        return { ...styles.footerBtn };
    }
  }, [styleType]);

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};

type BodyProps = {
  content: string;
};

const Body = ({ content }: BodyProps) => {
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

  return (
    <View style={{ height: webViewHeight / 4 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: body }}
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          setWebViewHeight(Number(event.nativeEvent.data));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  UsetifulContainer: {
    flex: 1,
  },
  usetifulLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000cc',
  },
  modal: {
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: '5%',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },
  footerBtn: {
    marginRight: 10,
    padding: 8,
    borderRadius: 6,
  },
  primaryBtn: {
    backgroundColor: '#387DFF',
  },
  secondaryBrn: {
    borderColor: '#464646',
    borderWidth: 1,
  },
  modalText: {
    textAlign: 'center',
  },
  modalBody: {
    paddingVertical: 8,
  },
});

const bodyCss = `<style>
p{
font-size:36px;
}
</style>`;

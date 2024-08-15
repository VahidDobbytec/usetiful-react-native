import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { ActionType } from '../../types';

type ActionProps = {
  action: ActionType;
  setTourStepIndex: (to: number) => void;
  tourStepIndex: number;
  onColse: () => void;
};
export const USAction = ({
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

const styles = StyleSheet.create({
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
});

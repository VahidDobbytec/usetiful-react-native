import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body } from './Body';
import { Action } from '../Action';
import type { TourStep } from '../../types';

type ModalProps = {
  step: TourStep;
  onColse: () => void;
  tourStepIndex: number;
  setTourStepIndex: (to: number) => void;
};
export const Modal = ({
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

const styles = StyleSheet.create({
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
  modalText: {
    textAlign: 'center',
  },
  modalBody: {
    paddingVertical: 8,
  },
  crossBtn: {
    fontSize: 16,
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },
});

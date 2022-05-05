import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { ChatTeardropDots } from "phosphor-react-native";

import { styles } from "./styles";
import { theme } from "../../theme";
import { Options } from "../Options";
import { Success } from "../Success";
import { Form } from "../Form";
import { feedbackTypes } from "../../utils/feedbackTypes";

export type FeedbackType = keyof typeof feedbackTypes;

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpen} style={styles.button}>
        <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {/* <Options /> */}
        <Form feedbackType="BUG" />
        {/* <Success /> */}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);

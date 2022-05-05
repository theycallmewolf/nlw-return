import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import successImg from "../../assets/success.png";
import { Copyright } from "../Copyright";

import { styles } from "./styles";

interface Props {
  handleFeedbackReset: () => void;
}

export function Success({ handleFeedbackReset }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Obrigado pelo seu feedback</Text>
      <TouchableOpacity style={styles.button} onPress={handleFeedbackReset}>
        <Text style={styles.buttonTitle}>Enviar Outro</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}

import React, { useState } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { FeedbackType } from "../../components/Widget";

import { styles } from "./styles";
import { theme } from "../../theme";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { api } from "../../libs/api";

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenShot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenShot(uri))
      .catch((err) => console.log("err:", err));
  }

  function handleScreenshotRemove() {
    setScreenShot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);

    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: "base64" }));

    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
      });
      onFeedbackSent();
    } catch (error) {
      console.log("err:", error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Encontrou algum problema, ou quer sugerir alguma atualização..."
        autoCorrect={false}
        onChangeText={setComment}
        placeholderTextColor={theme.colors.text_secondary}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}

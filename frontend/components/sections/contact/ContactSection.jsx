import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { memo, useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";

import { submitContact } from "../../../lib/api";
import { webEffects } from "../../../lib/theme";
import { styles } from "./ContactSection.style";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection({ contact, isWide }) {
  const [form, setForm] = useState(initialForm);
  const [messageHeight, setMessageHeight] = useState(168);
  const [status, setStatus] = useState({
    state: "idle",
    message: "Tell me about your vision.",
  });

  const setField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = { ...form };

    setStatus({
      state: "loading",
      message: "Sending message...",
    });

    try {
      const response = await submitContact(payload);

      setStatus({
        state: response.delivered === false ? "warning" : "success",
        message: response.message,
      });
      setForm(initialForm);
      setMessageHeight(168);
    } catch (error) {
      setStatus({
        state: "error",
        message: error.message,
      });
    }
  };

  return (
    <View style={styles.shell}>
      <View style={[styles.patternLayer, webEffects.dottedDark]} />

      <View style={[styles.layout, !isWide && styles.layoutCompact]}>
        <View style={styles.infoColumn}>
          <Text style={styles.heading}>Ready to build the future?</Text>
          <Text style={styles.copy}>
            Whether it&apos;s a complex AI pipeline or a high-performance MERN
            app, let&apos;s turn your vision into production-ready reality.
          </Text>

          <View style={styles.contactList}>
            <ContactLink
              icon="email-outline"
              label="Email"
              onPress={() => Linking.openURL(`mailto:${contact.email}`)}
              value={contact.email}
            />
            <ContactLink
              icon="phone-outline"
              label="Phone"
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              value={contact.phone}
            />
            <ContactLink icon="map-marker-outline" label="Base" value={contact.location} />
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={[styles.row, !isWide && styles.rowCompact]}>
            <Field
              id="contact-name"
              label="Name"
              name="name"
              onChangeText={(value) => setField("name", value)}
              placeholder="John Doe"
              shellStyle={styles.rowFieldShell}
              value={form.name}
            />
            <Field
              id="contact-subject"
              label="Subject"
              name="subject"
              onChangeText={(value) => setField("subject", value)}
              placeholder="New Project"
              shellStyle={styles.rowFieldShell}
              value={form.subject}
            />
          </View>

          <Field
            id="contact-email"
            keyboardType="email-address"
            label="Email"
            name="email"
            onChangeText={(value) => setField("email", value)}
            placeholder="rene@company.com"
            value={form.email}
          />

          <Field
            id="contact-message"
            label="Message"
            multiline
            name="message"
            numberOfLines={4}
            onContentSizeChange={(event) => {
              const nextHeight = event?.nativeEvent?.contentSize?.height;
              if (typeof nextHeight === "number") {
                setMessageHeight(Math.max(168, Math.min(nextHeight + 20, 288)));
              }
            }}
            onChangeText={(value) => setField("message", value)}
            placeholder="Tell me about your vision..."
            scrollEnabled={false}
            style={[
              styles.messageField,
              { height: messageHeight },
              Platform.OS === "web" ? styles.messageFieldWeb : null,
            ]}
            value={form.message}
          />

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Send Message</Text>
            <MaterialCommunityIcons
              color="#FFFFFF"
              name="send-outline"
              size={20}
              style={styles.submitIcon}
            />
          </Pressable>

          <Text
            style={[
              styles.statusText,
              status.state === "warning" && styles.statusTextWarning,
              status.state === "error" && styles.statusTextError,
            ]}
          >
            {status.message}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ContactLink({ icon, label, onPress, value }) {
  const content = (
    <View style={styles.contactRow}>
      <View style={styles.contactIcon}>
        <MaterialCommunityIcons color="#FFFFFF" name={icon} size={22} />
      </View>
      <View style={styles.contactTextColumn}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

function Field({
  id,
  keyboardType,
  label,
  multiline,
  name,
  numberOfLines,
  onContentSizeChange,
  onChangeText,
  placeholder,
  scrollEnabled,
  shellStyle,
  style,
  value,
}) {
  return (
    <View style={[styles.fieldShell, shellStyle]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        keyboardType={keyboardType}
        multiline={multiline}
        nativeID={id}
        name={name}
        numberOfLines={numberOfLines}
        onContentSizeChange={onContentSizeChange}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.36)"
        scrollEnabled={scrollEnabled}
        style={[styles.fieldInput, multiline && styles.fieldInputMultiline, style]}
        value={value}
      />
    </View>
  );
}

export default memo(ContactSection);

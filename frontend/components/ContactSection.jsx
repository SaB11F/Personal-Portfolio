import * as Linking from "expo-linking";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { submitContact } from "../lib/api";
import { fonts, palette, webEffects } from "../lib/theme";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection({ contact, isWide }) {
  const [form, setForm] = useState(initialForm);
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
    setStatus({
      state: "loading",
      message: "Sending message...",
    });

    try {
      const response = await submitContact(form);
      setStatus({
        state: "success",
        message: response.message,
      });
      setForm(initialForm);
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
              label="Email"
              onPress={() => Linking.openURL(`mailto:${contact.email}`)}
              value={contact.email}
            />
            <ContactLink
              label="Phone"
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              value={contact.phone}
            />
            <ContactLink label="Base" value={contact.location} />
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={[styles.row, !isWide && styles.rowCompact]}>
            <Field
              label="Name"
              onChangeText={(value) => setField("name", value)}
              placeholder="John Doe"
              value={form.name}
            />
            <Field
              label="Subject"
              onChangeText={(value) => setField("subject", value)}
              placeholder="New Project"
              value={form.subject}
            />
          </View>

          <Field
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => setField("email", value)}
            placeholder="rene@company.com"
            value={form.email}
          />

          <Field
            label="Message"
            multiline
            numberOfLines={4}
            onChangeText={(value) => setField("message", value)}
            placeholder="Tell me about your vision..."
            style={styles.messageField}
            value={form.message}
          />

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Send Message</Text>
            <Text style={styles.submitArrow}>-></Text>
          </Pressable>

          <Text
            style={[
              styles.statusText,
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

function ContactLink({ label, onPress, value }) {
  const content = (
    <View style={styles.contactRow}>
      <View style={styles.contactIcon}>
        <View style={styles.contactIconLine} />
        <View style={styles.contactIconDot} />
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
  keyboardType,
  label,
  multiline,
  numberOfLines,
  onChangeText,
  placeholder,
  style,
  value,
}) {
  return (
    <View style={styles.fieldShell}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.36)"
        style={[styles.fieldInput, multiline && styles.fieldInputMultiline, style]}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: "hidden",
    position: "relative",
    paddingHorizontal: 22,
    paddingVertical: 26,
    borderRadius: 44,
    backgroundColor: palette.navy,
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  layout: {
    flexDirection: "row",
    gap: 28,
  },
  layoutCompact: {
    flexDirection: "column",
  },
  infoColumn: {
    flex: 1,
    gap: 18,
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 56,
    lineHeight: 58,
    fontWeight: "900",
    letterSpacing: -2,
    fontFamily: fonts.display,
  },
  copy: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 430,
    fontFamily: fonts.display,
  },
  contactList: {
    gap: 18,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIconLine: {
    position: "absolute",
    width: 14,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    opacity: 0.88,
  },
  contactIconDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  contactTextColumn: {
    gap: 3,
  },
  contactLabel: {
    color: "rgba(255,255,255,0.42)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  contactValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: fonts.display,
  },
  formCard: {
    width: "100%",
    maxWidth: 382,
    padding: 22,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    gap: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowCompact: {
    flexDirection: "column",
  },
  fieldShell: {
    flex: 1,
    gap: 6,
  },
  fieldLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontFamily: fonts.display,
  },
  fieldInput: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontFamily: fonts.display,
  },
  fieldInputMultiline: {
    minHeight: 118,
    textAlignVertical: "top",
  },
  messageField: {
    minHeight: 128,
  },
  submitButton: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: palette.purple,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontFamily: fonts.display,
  },
  submitArrow: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    fontFamily: fonts.display,
  },
  statusText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: fonts.display,
  },
  statusTextError: {
    color: palette.pink,
  },
});

export default ContactSection;

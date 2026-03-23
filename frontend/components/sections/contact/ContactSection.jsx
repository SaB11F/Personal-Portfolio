import * as Linking from "expo-linking";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
              id="contact-name"
              label="Name"
              name="name"
              onChangeText={(value) => setField("name", value)}
              placeholder="John Doe"
              value={form.name}
            />
            <Field
              id="contact-subject"
              label="Subject"
              name="subject"
              onChangeText={(value) => setField("subject", value)}
              placeholder="New Project"
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
  id,
  keyboardType,
  label,
  multiline,
  name,
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
        accessibilityLabel={label}
        keyboardType={keyboardType}
        multiline={multiline}
        nativeID={id}
        name={name}
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

export default ContactSection;

import * as Linking from "expo-linking";
import { memo, useState } from "react";
import { Platform, Pressable, Text, TextInput, useWindowDimensions, View } from "react-native";

import { AppIcon } from "../../common";
import { submitContact } from "../../../lib/api";
import { webEffects } from "../../../lib/theme";
import { styles } from "./ContactSection.style";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactSection({ contact, isPhone: isPhoneProp, isWide }) {
  const { width } = useWindowDimensions();
  const isPhone = isPhoneProp ?? width < 640;
  const [form, setForm] = useState(initialForm);
  const [messageHeight, setMessageHeight] = useState(168);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (isSubmitting) {
      return;
    }

    const payload = sanitizeContactForm(form);
    const validationMessage = validateContactForm(payload);

    if (validationMessage) {
      setStatus({
        state: "error",
        message: validationMessage,
      });
      return;
    }

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.shell}>
      <View style={[styles.patternLayer, webEffects.dottedDark]} />

      <View style={[styles.layout, !isWide && styles.layoutCompact]}>
        <View style={styles.infoColumn}>
          <Text style={[styles.heading, isPhone && styles.headingPhone]}>Ready to build the future?</Text>
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
              readOnly={isSubmitting}
              shellStyle={styles.rowFieldShell}
              value={form.name}
            />
            <Field
              id="contact-subject"
              label="Subject"
              name="subject"
              onChangeText={(value) => setField("subject", value)}
              placeholder="New Project"
              readOnly={isSubmitting}
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
            readOnly={isSubmitting}
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
            readOnly={isSubmitting}
            scrollEnabled={false}
            style={[
              styles.messageField,
              { height: messageHeight },
              Platform.OS === "web" ? styles.messageFieldWeb : null,
            ]}
            value={form.message}
          />

          <Pressable
            disabled={isSubmitting}
            onPress={handleSubmit}
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Text>
            <AppIcon
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
        <AppIcon color="#FFFFFF" name={icon} size={22} />
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
  readOnly,
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
        editable={!readOnly}
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

function sanitizeContactForm(form) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
  };
}

function validateContactForm(form) {
  if (!form.name || !form.email || !form.message) {
    return "Name, email, and message are required.";
  }

  if (!/\S+@\S+\.\S+/.test(form.email)) {
    return "Please provide a valid email.";
  }

  return "";
}

export default memo(ContactSection);

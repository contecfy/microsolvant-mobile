
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Bell,
    CheckCircle2,
    CircleDollarSign,
    ShieldCheck,
    Sparkles,
    TriangleAlert,
} from "lucide-react-native";
import { Button, Header } from "prizmux";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  category: "payment" | "system" | "security" | "insight";
  unread?: boolean;
};

const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Loan repayment received",
    message:
      "A repayment of UGX 145,000 was successfully recorded for Loan #L-2041. This update reflects the latest payment status and will be included in your monthly summary.",
    time: "Just now",
    category: "payment",
    unread: true,
  },
  {
    id: "2",
    title: "New investor update",
    message:
      "Your portfolio performance improved by 3.4% this week. Review the latest movement across your active opportunities.",
    time: "15 min ago",
    category: "insight",
  },
  {
    id: "3",
    title: "Security alert reviewed",
    message:
      "A suspicious login attempt was blocked and your account remains secure. No further action is required on your side.",
    time: "1 hour ago",
    category: "security",
  },
  {
    id: "4",
    title: "Weekly compliance summary",
    message:
      "All required reports for the last 7 days are up to date. You can review your compliance activity from the dashboard.",
    time: "Yesterday",
    category: "system",
  },
  {
    id: "5",
    title: "Upcoming payout",
    message:
      "Your next payout is scheduled for tomorrow at 9:00 AM. Please confirm your preferred payout destination in settings.",
    time: "2 days ago",
    category: "payment",
  },
];

const categoryMeta = {
  payment: {
    icon: CircleDollarSign,
    label: "Payment",
  },
  system: {
    icon: Bell,
    label: "System",
  },
  security: {
    icon: ShieldCheck,
    label: "Security",
  },
  insight: {
    icon: Sparkles,
    label: "Insight",
  },
};

const detailHints = {
  payment: "Review the payment update and confirm it matches your expected amount.",
  insight: "Open your portfolio view to explore the latest performance changes.",
  security: "No further action is needed unless you notice anything unusual.",
  system: "Check the dashboard for the latest account and compliance updates.",
};

export default function NotificationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const background = useThemeColor({}, "background");
  const cardBackground = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "borderColor");
  const mutedText = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const warningColor = useThemeColor({}, "warning");
  const successColor = useThemeColor({}, "success");
  const infoColor = useThemeColor({}, "info");

  const notification = sampleNotifications.find((item) => item.id === id);

  if (!notification) {
    return (
      <ThemedView style={{ flex: 1, backgroundColor: background }}>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <Header
            title="Notification"
            showBack
            onBackPress={() => router.back()}
            backgroundColor={background}
            titleStyle={{ color: textColor, fontFamily: "Inter_700Bold" }}
            backButtonBackgroundColor="transparent"
            backIconColor={textColor}
          />
          <View style={styles.emptyState}>
            <TriangleAlert size={28} color={warningColor} />
            <ThemedText type="boldPrecision" style={styles.emptyTitle}>
              Notification not found
            </ThemedText>
            <ThemedText style={[styles.emptyDescription, { color: mutedText }]}>
              The selected notification is unavailable in this sample view.
            </ThemedText>
            <Button
              title="Back to notifications"
              onPress={() => router.back()}
              fullWidth
              borderRadius={12}
              style={{ backgroundColor: tintColor } as any}
              textStyle={{ color: background, fontFamily: "Inter_600SemiBold" }}
            />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const meta = categoryMeta[notification.category];
  const Icon = meta.icon;

  const accentColor =
    notification.category === "payment"
      ? successColor
      : notification.category === "security"
        ? warningColor
        : notification.category === "insight"
          ? tintColor
          : infoColor;

  return (
    <ThemedView style={{ flex: 1, backgroundColor: background }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
          title="Notification Details"
          showBack
          onBackPress={() => router.back()}
          backgroundColor={background}
          titleStyle={{ color: textColor, fontFamily: "Inter_700Bold" }}
          backButtonBackgroundColor="transparent"
          backIconColor={textColor}
        />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.heroCard, { backgroundColor: cardBackground, borderColor }]}> 
            <View style={styles.heroHeader}>
              <View style={[styles.iconContainer, { backgroundColor: accentColor + "15" }]}> 
                <Icon size={22} color={accentColor} />
              </View>

              <View style={styles.heroTextBlock}>
                <ThemedText type="boldPrecision" style={styles.heroTitle}>
                  {notification.title}
                </ThemedText>
                <ThemedText style={[styles.heroMeta, { color: mutedText }]}>
                  {meta.label} • {notification.time}
                </ThemedText>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <ThemedText style={styles.messageText}>{notification.message}</ThemedText>
          </View>

          <View style={[styles.infoCard, { backgroundColor: cardBackground, borderColor }]}> 
            <ThemedText type="boldPrecision" style={styles.sectionTitle}>
              What this means
            </ThemedText>
            <ThemedText style={[styles.infoText, { color: mutedText }]}> 
              {detailHints[notification.category]}
            </ThemedText>

            <View style={styles.statusRow}>
              <View style={[styles.statusBadge, { backgroundColor: accentColor + "15" }]}> 
                <CheckCircle2 size={16} color={accentColor} />
                <ThemedText style={[styles.statusText, { color: accentColor }]}>
                  {notification.unread ? "Unread" : "Read"}
                </ThemedText>
              </View>
              <ThemedText style={[styles.categoryPill, { color: accentColor }]}>
                {meta.label}
              </ThemedText>
            </View>
          </View>

          <Button
            title="Back to notifications"
            onPress={() => router.back()}
            fullWidth
            borderRadius={12}
            style={{ backgroundColor: tintColor } as any}
            textStyle={{ color: background, fontFamily: "Inter_600SemiBold" }}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 20,
  },
  heroHeader: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  heroTextBlock: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  heroMeta: {
    marginTop: 6,
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    lineHeight: 22,
  },
  statusRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  categoryPill: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 14,
  },
  emptyTitle: {
    fontSize: 22,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
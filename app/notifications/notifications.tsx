import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import {
  Bell,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  ShieldCheck,
  Sparkles
} from "lucide-react-native";
import { Header } from "prizmux";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
    message: "A repayment of UGX 145,000 was successfully recorded for Loan #L-2041.",
    time: "Just now",
    category: "payment",
    unread: true,
  },
  {
    id: "2",
    title: "New investor update",
    message: "Your portfolio performance improved by 3.4% this week.",
    time: "15 min ago",
    category: "insight",
  },
  {
    id: "3",
    title: "Security alert reviewed",
    message: "A suspicious login attempt was blocked and your account remains secure.",
    time: "1 hour ago",
    category: "security",
  },
  {
    id: "4",
    title: "Weekly compliance summary",
    message: "All required reports for the last 7 days are up to date.",
    time: "Yesterday",
    category: "system",
  },
  {
    id: "5",
    title: "Upcoming payout",
    message: "Your next payout is scheduled for tomorrow at 9:00 AM.",
    time: "2 days ago",
    category: "payment",
  },
];

const categoryMeta = {
  payment: {
    icon: CircleDollarSign,
    colorKey: "success" as const,
    label: "Payment",
  },
  system: {
    icon: Bell,
    colorKey: "info" as const,
    label: "System",
  },
  security: {
    icon: ShieldCheck,
    colorKey: "warning" as const,
    label: "Security",
  },
  insight: {
    icon: Sparkles,
    colorKey: "tint" as const,
    label: "Insight",
  },
};

export default function NotificationsScreen() {
  const router = useRouter();
  const cardBackground = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const background = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "borderColor");
  const mutedText = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const warningColor = useThemeColor({}, "warning");
  const successColor = useThemeColor({}, "success");
  const infoColor = useThemeColor({}, "info");

  const unreadCount = sampleNotifications.filter((item) => item.unread).length;

  const renderCategoryColor = (category: NotificationItem["category"]) => {
    switch (category) {
      case "payment":
        return successColor;
      case "security":
        return warningColor;
      case "insight":
        return tintColor;
      default:
        return infoColor;
    }
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: background }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <Header
              title="Notifications"
              showBack
              onBackPress={() => router.back()}
              backIcon={<ChevronLeft color={textColor} size={24} />}
              backgroundColor={background}
              titleStyle={{
                color: textColor,
                fontFamily: "Inter_700Bold",
          
              }}
              backButtonBackgroundColor="transparent"
              backIconColor={textColor}
             
            />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
        


        
          {sampleNotifications.map((item) => {
            const meta = categoryMeta[item.category];
            const Icon = meta.icon;
            const accentColor = renderCategoryColor(item.category);

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                style={[
                  styles.notificationCard,
                  {
                    backgroundColor: cardBackground,
                    borderColor,
                    borderLeftColor: accentColor,
                  },
                ]}
              >
                <View style={styles.notificationHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: accentColor + "15" },
                    ]}
                  >
                    <Icon size={18} color={accentColor} />
                  </View>

                  <View style={styles.notificationTextBlock}>
                    <View style={styles.notificationTitleRow}>
                      <ThemedText type="boldPrecision" style={styles.notificationTitle}>
                        {item.title}
                      </ThemedText>
                      {item.unread ? (
                        <View
                          style={[
                            styles.unreadDot,
                            { backgroundColor: accentColor },
                          ]}
                        />
                      ) : null}
                    </View>

                    <ThemedText
                      style={[styles.notificationMessage, { color: mutedText }]}
                    >
                      {item.message}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.notificationFooter}>
                  <ThemedText style={[styles.categoryLabel, { color: accentColor }]}>
                    {meta.label}
                  </ThemedText>
                  <ThemedText style={[styles.timeLabel, { color: mutedText }]}>
                    {item.time}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            );
          })}

          <View
          
          >
            <CheckCircle2 size={18} color={successColor} />
            <ThemedText style={styles.footerHintText}>
              This screen uses sample data until notifications are connected to the backend.
            </ThemedText>
          </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  summaryCard: {
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    lineHeight: 18,
  },
  summaryValue: {
    marginTop: 2,
    fontSize: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  notificationCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 16,
    borderLeftWidth: 4,
  },
  notificationHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationTextBlock: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  notificationTitle: {
    fontSize: 16,
    flexShrink: 1,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  notificationMessage: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  notificationFooter: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  timeLabel: {
    fontSize: 12,
  },
  footerHint: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  footerHintText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

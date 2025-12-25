import { Star } from "lucide-react-native";
import { useEffect } from "react";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export default function AnimatedStar({ active }: { active: boolean }) {
  const scale = useSharedValue(0);

  useEffect(() => {
    // Pop animation when the star appears
    scale.value = withSpring(1, {
      damping: 6,
      stiffness: 120,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { marginRight: 4 }]}>
      <Star
        size={18}
        color={active ? "#FFD479" : "#4A4A4A"} // gold when active, gray when inactive
        fill={active ? "#FFD479" : "none"}
      />
    </Animated.View>
  );
}

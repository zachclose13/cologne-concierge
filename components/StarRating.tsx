import { View } from "react-native";
import AnimatedStar from "./AnimatedStar";

export default function StarRating({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) {

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array.from({ length: max }).map((_, index) => (
        <AnimatedStar key={index} active={index < rating} />
      ))}
    </View>
  );
}

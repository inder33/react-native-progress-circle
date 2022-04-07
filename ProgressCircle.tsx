import React from "react";
import {
  StyleSheet,
  View,
  I18nManager,
  StyleProp,
  ViewStyle,
} from "react-native";

let direction = I18nManager.isRTL ? "right" : "left";

const styles = StyleSheet.create({
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  leftWrap: {
    position: "absolute",
    top: 0,
    [`${direction}`]: 0,
  },
  halfCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

const percentToDegrees = (percent: number) => percent * 3.6;

export const ProgressCircle = ({
  color = "#f00",
  shadowColor = "#999",
  bgColor = "#e9e9ef",
  radius = 1,
  percent = 10,
  borderWidth = 2,
  children = null,
  containerStyle = null,
  outerCircleStyle = null,
}: {
  color?: string;
  shadowColor?: string;
  bgColor?: string;
  radius?: number;
  borderWidth?: number;
  percent?: number;
  children?: any; // eslint-disable-line react/no-unused-prop-types
  containerStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
}) => {
  const renderHalfCircle = (
    rotateDegrees: number,
    halfCircleStyles: StyleProp<ViewStyle> = null
  ) => {
    const key = I18nManager.isRTL ? "right" : "left";
    return (
      <View
        style={[
          styles.leftWrap,
          {
            width: radius,
            height: radius * 2,
          },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              width: radius,
              height: radius * 2,
              borderRadius: radius,
              overflow: "hidden",
              transform: [
                { translateX: radius / 2 },
                { rotate: `${rotateDegrees}deg` },
                { translateX: -radius / 2 },
              ],
              backgroundColor: color,
            },
            halfCircleStyles,
          ]}
        />
      </View>
    );
  };

  /**
   *
   * @returns
   */
  const renderInnerCircle = () => {
    const radiusMinusBorder = radius - borderWidth;
    return (
      <View
        style={[
          styles.innerCircle,
          {
            width: radiusMinusBorder * 2,
            height: radiusMinusBorder * 2,
            borderRadius: radiusMinusBorder,
            backgroundColor: bgColor,
            transform: [{ rotate: `180deg` }],
          },
          containerStyle,
        ]}
      >
        {children}
      </View>
    );
  };

  const percentNew = Math.max(Math.min(100, percent), 0);
  const needHalfCircle2 = percentNew > 50;
  let halfCircle1Degree: number;
  let halfCircle2Degree: number;

  // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
  if (needHalfCircle2) {
    halfCircle1Degree = 180;
    halfCircle2Degree = percentToDegrees(percentNew);
  } else {
    halfCircle1Degree = percentToDegrees(percentNew);
    halfCircle2Degree = 0;
  }
  const halfCircle2Styles = {
    // when the second half circle is not needed, we need it to cover
    // the negative degrees of the first circle
    backgroundColor: needHalfCircle2 ? color : shadowColor,
  };

  return (
    <View
      style={[
        styles.outerCircle,
        {
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          backgroundColor: shadowColor,
          transform: [{ rotate: `180deg` }],
        },
        outerCircleStyle,
      ]}
    >
      {renderHalfCircle(halfCircle1Degree)}
      {renderHalfCircle(halfCircle2Degree, halfCircle2Styles)}
      {renderInnerCircle()}
    </View>
  );
};


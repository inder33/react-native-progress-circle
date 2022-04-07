# Background

This project was created to provide simple circular progress with text in it. Will work for Android & IOS both. On web it causes some issues currently.

![alt text](https://github.com/inderweb/react-native-progress-circle/blob/main/progress.jpg?raw=true)

# How to use it

```javascript
// Import from package.
import { ProgressCircle } from "react-native-progress-circle";
import { Text } from "react-native";

<ProgressCircle
  percent={66}
  radius={70}
  borderWidth={10}
  color={"green"}
  shadowColor="orange"
  bgColor="#fff"
>
  <Text style={{ color: "gray" }}>Next Pay</Text>
  <Text style={{ color: "#000", fontWeight: "bold" }}> 3 days</Text>
</ProgressCircle>;
```

# Options

- percent
  - Integer from 0-100
- radius
  - Size of progress circle
- borderWidth
  - Thickness of circle.
- color
  - Active/filled/completed progress color.
- shadowColor
  - Empty area of progress circle.
- bgColor
  - Inside background color.

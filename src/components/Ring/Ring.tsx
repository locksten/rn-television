import React, { VFC } from "react"
import * as Svg from "react-native-svg"

export const Ring: VFC<{
  percentage: number
  center: number
  radius: number
  strokeWidth: number
  color: string
}> = ({ center, radius, strokeWidth, color, percentage }) => {
  return (
    <Svg.Circle
      stroke={color}
      strokeLinecap={"round"}
      cx={center}
      cy={center}
      r={radius}
      strokeWidth={strokeWidth}
      strokeDasharray={[
        percentage * 2 * Math.PI * radius,
        Number.MAX_SAFE_INTEGER,
      ]}
      transform={{ origin: [center, center], rotation: -90 }}
    />
  )
}

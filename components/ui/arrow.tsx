import React from "react"

interface ArrowProps {
  path: string
  className?: string
  strokeColor?: string
  strokeWidth?: string | number
  arrowSize?: number
}

export const Arrow: React.FC<ArrowProps> = ({
  path,
  className = "",
  strokeColor = "#4D4D4D",
  strokeWidth = 1.5,
  arrowSize = 8,
}) => {
  // Generate a unique ID for the marker
  const markerId = React.useId()

  return (
    <svg className={className} viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id={`arrowhead-${markerId}`}
          markerWidth={arrowSize}
          markerHeight={arrowSize}
          refX={arrowSize - 2}
          refY={arrowSize / 2}
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d={`M0,0 L0,${arrowSize} L${arrowSize},${arrowSize / 2} z`}
            fill={strokeColor}
            transform={`rotate( ${arrowSize / 2} ${arrowSize / 2})`}
          />
        </marker>
      </defs>
      <path
        d={path}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        markerEnd={`url(#arrowhead-${markerId})`}
      />
    </svg>
  )
}

export default Arrow

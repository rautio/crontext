import React from 'react';

const Line = ({
  x = 0,
  y = 0,
  children,
  fill = '#fff',
  secondLine = '',
}: {
  x?: number;
  y?: number;
  children: React.ReactNode;
  fill?: string;
  secondLine?: string;
}) => {
  const y2 = secondLine ? 195 + y : 200 + y;
  return (
    <>
      <text x={5 + x} y="25" fill={fill} fontSize="2em">
        *
      </text>
      <line
        x1={10 + x}
        y1="20"
        x2={10 + x}
        y2={y2}
        style={{ stroke: fill, strokeWidth: 2 }}
      />
      <line
        x1={10 + x}
        y1={y2}
        x2={30 + x}
        y2={y2}
        style={{ stroke: fill, strokeWidth: 2 }}
      />
      <text x={35 + x} y={secondLine ? 190 + y : 205 + y} fill={fill}>
        {children}
      </text>
      {secondLine && (
        <text x={35 + x} y={210 + y} fill={fill}>
          {secondLine}
        </text>
      )}
    </>
  );
};

export const Explain = () => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="340"
    height="220"
  >
    <Line>minute (0-59)</Line>
    <Line x={30} y={-30}>
      hour (0 - 23)
    </Line>
    <Line x={60} y={-60}>
      day of the month (1 - 31)
    </Line>
    <Line x={90} y={-90}>
      month (1 - 12)
    </Line>
    <Line x={120} y={-120} secondLine="(0 is Sunday, 6 is Saturday)">
      day of the week (0 - 6)
    </Line>
  </svg>
);

export default Explain;

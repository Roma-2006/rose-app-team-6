import { PieLabelProps } from '../../utils/orders-status-chart.helpers';

export const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={16}
        fill="#ffffff"
        filter="drop-shadow(0px 4px 4px rgba(0,0,0,0.1))"
      />
      <text
        x={x}
        y={y}
        fill="#1f2937"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-[10px] font-bold"
      >
        {`${percent}%`}
      </text>
    </g>
  );
};

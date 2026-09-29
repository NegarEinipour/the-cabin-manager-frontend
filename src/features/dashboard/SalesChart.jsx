import { useDarkMode } from "../../context/DarkModeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import PropTypes from "prop-types";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  @media (max-width: 900px) {
    padding: 1.6rem;
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery("(max-width: 900px)");

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    totalSales: bookings
      .filter((b) => isSameDay(date, new Date(b.createdAt)))
      .reduce((acc, cur) => acc + cur.totalPrice, 0),
    extrasSales: bookings
      .filter((b) => isSameDay(date, new Date(b.createdAt)))
      .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  }));

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        {isMobile
          ? `Sales (last ${numDays} days)`
          : `Sales from ${format(allDates.at(0), "MMM dd yyyy")} — ${format(
              allDates.at(-1),
              "MMM dd yyyy",
            )}`}
      </Heading>
      <ResponsiveContainer height={isMobile ? 240 : 300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: colors.text }}
            interval="preserveStartEnd"
            minTickGap={isMobile ? 20 : 40}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 50 : 30}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: isMobile ? 10 : 12 }}
            tickLine={{ stroke: colors.text }}
            width={isMobile ? 40 : 60}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.array.isRequired,
  numDays: PropTypes.number.isRequired,
};

export default SalesChart;

"use client"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    amount: {
        label: "Amount",
        color: "hsla(94, 99%, 35%, 1)",
    },
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AreaChart({ data }: any) {
    const chartData = data.map((item: { day: string; amount: number }) => ({
        day: item.day,
        amount: item.amount
    }))
    return (
        <Card className="min-w-[581px]">
            <CardHeader>
                <CardTitle className="text-lg font-medium">This Week&apos;s Income</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="!h-[290px] max-md:min-h-[290px] w-full" config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            axisLine={false}
                            ticks={[0, 20, 40, 60, 80, 100]}
                            domain={[0, 10]}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="amount"
                            type="natural"
                            stroke="hsla(94, 99%, 35%, 1)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

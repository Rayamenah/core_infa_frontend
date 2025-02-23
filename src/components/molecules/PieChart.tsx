"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const existingChartData = [
    { status: "active", amount: 275, fill: "hsla(184, 99%, 35%, 1)" },
    { status: "expired", amount: 200, fill: "hsla(41, 100%, 57%, 1)" },
    { status: "inactive", amount: 287, fill: "hsla(354, 100%, 63%, 1)" },
    { status: "blocked", amount: 173, fill: "hsla(269, 81%, 52%, 1)" },
    { status: "lost", amount: 190, fill: "hsla(214, 99%, 35%, 1)" },
]

const chartConfig = {
    amount: {
        label: "Amount",
    },
    active: {
        label: "Active",
        color: "hsla(184, 99%, 35%, 1)",
    },
    expired: {
        label: "Expired",
        color: "hsla(41, 100%, 57%, 1)",
    },
    inactive: {
        label: "Inactive",
        color: "hsla(354, 100%, 63%, 1)",
    },
    blocked: {
        label: "Blocked",
        color: "hsla(269, 81%, 52%, 1)",
    },
    lost: {
        label: "Lost",
        color: "hsla(214, 99%, 35%, 1)",
    },
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PieChartData({ data }: any) {
    const chartData = data.map((item: { status: string; amount: number }) => {
        const found = existingChartData.find(c => c.status === item.status);
        return {
            status: item.status,
            amount: item.amount,
            fill: found ? found.fill : "hsla(0, 0%, 80%, 1)"
        };
    });
    const totalCards = React.useMemo(() => {
        return chartData.reduce((acc: number, curr: { status: string, amount: number }) => acc + curr.amount, 0)
    }, [chartData])

    return (
        <Card className="flex flex-col w-full">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Card Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="status"
                            innerRadius={110}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Cards
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 10} className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalCards.toLocaleString()}
                                                </tspan>

                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex justify-around gap-2 text-sm">
                {chartData?.map((work: { status: string, amount: number, fill: string }) => (
                    <div key={work.status} className="flex items-center gap-2">
                        <div
                            className="size-[10px] md:size-[5px] xl:size-[10px] rounded-full bg-[#F6F6F6]"
                            style={{ backgroundColor: work.fill }}
                        />
                        <div className="flex flex-col">
                            <span className="text-[#929292] text-[12px]">
                                {work.status}
                            </span>
                        </div>
                    </div>
                ))}
            </CardFooter>
        </Card>
    )
}

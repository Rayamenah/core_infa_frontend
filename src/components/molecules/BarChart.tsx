"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const chartConfig = {
    personalized: {
        label: "Personalized",
        color: "hsla(214, 99%, 35%, 1)",
    },
    instant: {
        label: "Instant",
        color: "hsla(214, 100%, 90%, 1)",
    },
} satisfies ChartConfig

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CardBarChart({ data }: any) {
    const chartData = data?.map((item: { name: string; personalized: number; instant: number }) => ({
        month: item.name,
        personalized: item.personalized,
        instant: item.instant,
    }))
    return (
        <Card className="min-w-[581px] h-[318px]">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Monthly Issuance</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="!h-[223px] max-md:min-h-[223px] w-full" config={chartConfig}>
                    <BarChart
                        barSize={40}
                        accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            axisLine={false}
                            ticks={[0, 20, 40, 60, 80, 100]}
                            domain={[0, 10]}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="personalized"
                            stackId="a"
                            fill="hsla(214, 99%, 35%, 1)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="instant"
                            stackId="a"
                            fill="hsla(214, 100%, 90%, 1)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

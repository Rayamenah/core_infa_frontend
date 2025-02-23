"use client"
import { AreaChart } from '../molecules/AreaChart'
import { CardBarChart } from '../molecules/BarChart'
import CardSection from '../molecules/CardSection'
import { DataTable } from '../molecules/DataTable'
import { PieChartData } from '../molecules/PieChart'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Analytics = ({ data }: { data: any }) => {

    const { total_active_cards, total_personalized_cards, total_revenue, pending_request, monthly_issuance, this_week_income, card_status_distribution, recent_card_requests } = data


    return (
        <section>
            <CardSection
                total_active_cards={total_active_cards}
                total_personalized_cards={total_personalized_cards}
                total_revenue={total_revenue}
                pending_request={pending_request}
            />
            <div className='flex xl:flex-row flex-col py-2 gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='w-full overflow-x-auto overflow-y-hidden'>
                        <CardBarChart data={monthly_issuance} />
                    </div>

                    <div className='w-full overflow-auto'>
                        <AreaChart data={this_week_income} />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full overflow-auto'>
                    <DataTable data={recent_card_requests.splice(0, 4)} />
                    <PieChartData data={card_status_distribution} />
                </div>
            </div>

        </section>
    )
}

export default Analytics
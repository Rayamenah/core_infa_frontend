import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { AlertCircle, ArrowUpRight, BadgeDollarSignIcon, CreditCard, Hourglass } from 'lucide-react'

type Props = {
    total_active_cards: number
    total_personalized_cards: number
    total_revenue: number
    pending_request: number

}
const CardSection = ({ total_active_cards, total_personalized_cards, total_revenue, pending_request }: Props) => {
    const card = [
        {
            title: 'Total Active Card',
            icon: <CreditCard className='text-[#00984C]' />,
            amount: total_active_cards,
            percentage: 9,
            time: 'this month'
        },
        {
            title: 'Total Personalized Card',
            icon: <CreditCard className='text-[#8020E7]' />,
            amount: total_personalized_cards,
            percentage: 8.5,
            time: 'this month'
        },
        {
            title: 'Todays Revenue',
            icon: <BadgeDollarSignIcon className='text-[#2087E7]' />,
            amount: total_revenue + 'M',
            percentage: 6,
            time: 'vs yesterday'
        },
        {
            title: 'Pending Requests',
            icon: <Hourglass className='text-[#E78020]' />,
            amount: pending_request,
            desc: 'Requires attention',
            descIcon: <AlertCircle className='text-[#E78020]' />,
        },
    ]
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
            {card?.map((item, index) => (
                <Card key={index} className='shadow-none'>
                    <CardHeader className='flex flex-col rounded-[10px]'>
                        {item.icon}
                        <div className='text-gray-500'>{item.title}</div>
                    </CardHeader>
                    <CardContent className='flex justify-between'>
                        <div className='text-[#121212] text-lg md:text-2xl'>{item.amount}</div>

                        {!item.desc ? <div className='flex items-center gap-2'>
                            <div className='rounded-sm py-1 px-2 text-xs text-[#00984C] bg-[#ABEFC6] flex justify-center items-center'>
                                <ArrowUpRight className='size-[6px] text-[#00984C]' />
                                +{item.percentage}%
                            </div>
                            <div className='text-xs text-gray-500'>{item.time}</div>
                        </div>
                            :
                            <div className='flex items-center gap-2'>
                                {item.descIcon}
                                <div className='text-[10px] md:text-xs text-[#E78020]'>{item.desc}</div>
                            </div>}

                    </CardContent>
                </Card>
            ))}
        </div>

    )
}
export default CardSection
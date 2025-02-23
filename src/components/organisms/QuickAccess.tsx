import { ChevronRight, CreditCard } from 'lucide-react'


const QuickAccess = () => {
    return (
        <section className='p-4 border rounded-[10px] border-[#E2E2E2] mt-3'>
            <div className='text-base text-[#121212]'>Your Quick Access</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                <div className='pl-4 py-2 w-full text-xs text-[#121212] rounded-sm xl:text-sm bg-[#F1F7FF] flex items-center'>
                    <div className='flex justify-center items-center bg-[#014DAF] size-7 rounded-full mr-4'>
                        <CreditCard className=' w-[13px] h-[10px] text-white' />
                    </div>
                    Manage a card
                    <ChevronRight className='size-4 ml-1' />
                </div>
                <div className='pl-4 py-2 w-full text-xs text-[#121212] rounded-sm xl:text-sm bg-[#F1F7FF] flex items-center'>
                    <div className='flex justify-center items-center bg-[#014DAF] size-7 rounded-full mr-4'>
                        <CreditCard className=' w-[13px] h-[10px] text-white' />
                    </div>
                    Issue Instant Card
                    <ChevronRight className='size-4 ml-1' />
                </div>
                <div className='pl-4 py-2 w-full text-xs text-[#121212] rounded-sm xl:text-sm bg-[#F1F7FF] flex items-center'>
                    <div className='flex justify-center items-center bg-[#014DAF] size-7 rounded-full mr-4'>
                        <CreditCard className=' w-[13px] h-[10px] text-white' />
                    </div>
                    Issue Personalized Card
                    <ChevronRight className='size-4 ml-1' />
                </div>
                <div className='pl-4 py-2 w-full text-xs text-[#121212] rounded-sm xl:text-sm bg-[#F1F7FF] flex items-center'>
                    <div className='flex justify-center items-center bg-[#014DAF] size-7 rounded-full mr-4'>
                        <CreditCard className=' w-[13px] h-[10px] text-white' />
                    </div>
                    Review Card Requests
                    <ChevronRight className='size-4 ml-1' />
                </div>
            </div>
        </section>
    )
}

export default QuickAccess
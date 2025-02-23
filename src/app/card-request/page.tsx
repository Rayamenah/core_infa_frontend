import { Input } from '@/components/ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { format } from 'date-fns';
import Link from 'next/link';

const fetchCardRequest = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards/request`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching card profiles:", error);
        return [];
    }
};

const Page = async () => {
    const cardRequest = await fetchCardRequest()
    return (
        <section>
            <div className='border-b border-b-[#98A2B3] flex flex-col gap-1 justify-center pb-[10px]'>
                <div className='text-[#101828] text-lg font-bold'>Card Request</div>
                <div className='text-[#475467] text-sm'>View and attend to card requests here</div>
            </div>
            <div className='border-b border-b-[#98A2B3] mt-[10px] pb-[10px] '>
                <Input
                    placeholder='Search'
                    className='w-[320px] h-10 py-[10px] px-[14px]' />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-xs text-[475467] bg-[#F9FAFB]">Branch</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Initiator</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Quantity</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Batch</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Date Requested</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Status</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {cardRequest.map((card) => (
                        <TableRow key={card.id}>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.branch_name}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.initiator}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.quantity}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.batch}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{format(card.created_at, "d, MMM, yyyy")}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.status}</TableCell>
                            <TableCell className="text-[10px] text-[#014DAF] text-center font-bold">
                                <Link
                                    className='hover:underline cursor-pointer'
                                    href={`/card-request/${card.id}`}>View</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </section >
    )
}

export default Page

import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { Edit2, PlusIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Response {
    id: string
    created_at: string
    updated_at: string
    card_name: string
    currency: string
    bin_prefix: string
    card_scheme: string
    expiration: string
    description: string
    branch_blacklist: string
    status: string
}

const fetchCardProfiles = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards`, {
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
    const cardProfiles = await fetchCardProfiles()
    return (
        <section>
            <div className='border-b border-b-[#98A2B3] flex flex-col gap-1 justify-center pb-[10px]'>
                <div className='text-[#101828] text-lg font-bold'>Card Profile</div>
                <div className='text-[#475467] text-sm'>Create view and edit profiles here</div>
            </div>
            <div className='flex flex-wrap gap-4 justify-between items-center border-b border-b-[#98A2B3] mt-[10px] pb-[10px] '>
                <Input
                    placeholder='Search by card name'
                    className='w-full lg:w-[320px] h-10 py-[10px] px-[14px]' />
                <Link
                    href='/card-profile/create'
                    className='w-full xl:w-auto py-2 px-4 bg-[#014DAF] rounded-sm text-xs hover:text-black flex justify-center items-center text-white'>
                    <PlusIcon className="w-[20px] h-[20px] text-white hover:text-black" />
                    Add Profile
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-xs text-[475467]">Card Name</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Currency</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Expiration</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Bin Prefix</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Date Created</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className='overflow-auto'>
                    {cardProfiles?.map((card: Response) => (
                        <TableRow key={card.id}>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.card_name}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.currency}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{format(card.expiration, "d, MMM, yyyy")}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.bin_prefix}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{format(card.created_at, "d, MMM, yyyy")}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] flex justify-center gap-2">
                                <Trash2 className='h-4 w-4' />
                                <Edit2 className='h-4 w-4' />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </section>
    )
}


export default Page
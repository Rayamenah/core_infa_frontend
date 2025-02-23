import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Card, CardHeader } from "../ui/card"
import Link from "next/link"

interface Response {
    id: number;
    branch_name: string;
    initiator: string;
    quantity: number;
    batch: string;
    card_type: string;
    created_at: string
    status: string
    date_requested: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable({ data }: any) {
    return (
        <Card className="!h-fit  w-full">
            <CardHeader className="text-lg font-medium">Recent Card Requests</CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center text-xs text-[475467] bg-[#F9FAFB]">Branch</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Card Type</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Quantity</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Status</TableHead>
                        <TableHead className="text-center text-xs text-[475467]">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((card: Response) => (
                        <TableRow key={card.id}>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.branch_name}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.card_type}</TableCell>
                            <TableCell className="text-[10px] text-[#475467] text-center">{card.quantity}</TableCell>
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
        </Card>
    )
}

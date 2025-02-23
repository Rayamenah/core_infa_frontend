"use client"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardRequestDto } from '@/schema/cardRequest.schema';
import { Box, CheckCircle, Download, FileBoxIcon, Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from 'next/navigation';
import { format } from 'date-fns';


interface Response {
    created_at: string
    branch_name: string
    initiator: string
    card_type: string
    card_charges: number | undefined
    quantity: number | undefined
    batch: string
    status: string
}
const Page = () => {
    const [card, setCard] = useState<Response>({
        created_at: '',
        branch_name: '',
        initiator: '',
        card_type: '',
        card_charges: undefined,
        quantity: undefined,
        batch: '',
        status: ''
    });

    const { branch_name, initiator, card_type, card_charges, quantity, batch, status } = card

    const form = useForm<z.infer<typeof CardRequestDto>>({
        resolver: zodResolver(CardRequestDto),
        defaultValues: {
            branch_name,
            initiator,
            card_type,
            card_charges,
            quantity,
            batch,
        },
    })

    const params = useParams()
    const id = params?.request_id

    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchCardRequest = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards/${id}/request`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error("Failed to fetch data");
                const data = await res.json();
                setCard(data);
                form.reset(data);
            } catch (error) {
                console.error("Error fetching card profiles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCardRequest();
    }, [id, form]);

    console.log('data', card)

    type InputFieldNames = "branch_name" | "initiator" | "card_type" | "card_charges" | "quantity" | "batch"

    const inputs: { name: InputFieldNames; label: string }[] = [
        {
            name: "branch_name",
            label: "Branch Name",

        },
        {
            name: "initiator",
            label: "Initiator",

        },
        {
            name: "card_type",
            label: "Card Type",
        },
        {
            name: "card_charges",
            label: "Card Charges",
        },
        {
            name: "quantity",
            label: "Quantity",
        },
        {
            name: "batch",
            label: "Batch",
        },

    ]



    const onSubmit = (data: z.infer<typeof CardRequestDto>) => {
        console.log(data)
    }

    if (loading) {
        return <div>Loading card request data...</div>;
    }

    return (
        <section>
            <div className='flex flex-col gap-1 justify-center mb-[10px]'>
                <div className='text-[#101828] text-lg font-bold'>Request Details</div>
                <div className='text-[#475467] text-sm'>Perform predetermined actions on card requests here</div>
            </div>

            <div className='border border-[#E2E2E2] rounded-[10px] p-4 pb-9'>
                <div className='text-[#121212] text-lg w-fit font-medium'>Card Request Details</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='md:px-0 md:py-0 flex flex-col gap-12 w-full xl:w-fit '>
                        <div className='mt-7 flex flex-col xl:w-fit xl:grid xl:grid-cols-2 gap-x-[106px] gap-y-[20px] h-fit w-full'>

                            {inputs.map((input, i) => (
                                <FormField
                                    key={i}
                                    control={form.control}
                                    name={input.name}
                                    render={({ field }) => (
                                        <FormItem className='w-full xl:w-[448px] h-fit'>
                                            <FormLabel className='text-sm text-[#344054] font-medium'>{input.label}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    readOnly
                                                    type={["quantity", "card_charges"].includes(input.name) ? "number" : "text"}
                                                    className="bg-[#F6F6F6] h-[44px] w-full xl:w-[448px]"
                                                    {...field}
                                                    value={typeof field.value === 'string' ? field.value : ""}
                                                />
                                            </FormControl>
                                            <FormMessage className='text-red-500' />
                                        </FormItem>
                                    )}
                                />)
                            )}
                            <div className='w-full xl:w-[448px] h-[70px]'>
                                <div className="text-sm text-[#344054] font-medium" >Date Requested</div>
                                <div>{format(card?.created_at, "d, MMM, yyyy")}</div>
                            </div>
                            <div className='w-full xl:w-[448px] h-[70px]'>
                                <div className="text-sm text-[#344054] font-medium">Status</div>
                                <div className='py-1 px-3 flex w-[120px] h-[30px] rounded-[16px] border text-base bg-[#FEDF89] text-[#B54708] justify-center items-center mt-3'>{status}</div>
                            </div>
                        </div>
                        <div className='text-[#344054] text-sm mt-5 mb-3 font-bold w-fit'>Actions</div>
                        <div className="flex flex-wrap justify-between gap-3">
                            <div className='flex py-2 pl-[14px] bg-[#344054] rounded-[4px] w-[192px]'>
                                <Download className='size-5 text-white' />
                                <div className='flex justify-center items-center text-xs text-white ml-2 '>Download for Production</div>
                            </div>
                            <div className='flex py-2 pl-[14px] bg-[#B54708] rounded-[4px] w-[163px]'>
                                <Loader className='size-5 text-white' />
                                <div className='flex justify-center items-center text-xs text-white ml-2 '>Mark as In Progress</div>
                            </div>
                            <div className='flex py-2 pl-[14px] bg-[#067647] rounded-[4px] w-[136px]'>
                                <Box className='size-5 text-white' />
                                <div className=' flex justify-center items-center text-xs text-white ml-2 '>Marked as Ready</div>
                            </div>
                            <div className='flex py-2 pl-[14px] bg-[#8020E7] rounded-[4px] w-[149px]'>
                                <FileBoxIcon className='size-5 text-white' />
                                <div className='flex justify-center items-center text-xs text-white ml-2 '>Mark as Dispatched</div>
                            </div>
                            <div className='flex py-2 pl-[14px] bg-[#014DAF] rounded-[4px] w-[183px]'>
                                <CheckCircle className='size-5 text-white' />
                                <div className='flex justify-center items-center text-xs text-white ml-2 '>Mark as Acknowledged</div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>

        </section>
    )
}

export default Page
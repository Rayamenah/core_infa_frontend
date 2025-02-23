"use client"
import AddFeeModal from '@/components/molecules/AddCardProfile';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CardProfileDto, FeesDto } from '@/schema/cardProfile.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const Page = () => {
    const [data, setData] = useState<z.infer<typeof FeesDto>>({} as z.infer<typeof FeesDto>);
    type InputFieldNames = "card_name" | "bin_prefix" | "card_scheme" | "expiration" | "currency" | "branch_blacklist" | "description"

    const inputs: { name: InputFieldNames; label: string, placeholder?: string, type?: string, values?: { label: string, value: string }[] }[] = [
        {
            name: "card_name",
            label: "Card Name",

        },
        {
            name: "bin_prefix",
            label: "Bin Prefix",

        },
        {
            name: "card_scheme",
            label: "Card Scheme",
            type: 'select',
            values: [{ label: 'VISA', value: "VISA" }, { label: 'MASTERCARD', value: "MASTERCARD" }],
            placeholder: "Please select",

        },
        {
            name: "expiration",
            label: "Expiration",
            type: 'date',

        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "currency",
            label: "Currency",
            type: 'select',
            values: [{ label: 'NGN', value: "NGN" }, { label: 'USD', value: "USD" }],
            placeholder: "Please select",
        },
        {
            name: "branch_blacklist",
            label: "Branch Blacklist",
            type: 'select',
            values: [{ label: 'Head Office', value: "HEAD_OFFICE" }, { label: 'Lagos Office', value: "LAGOS_OFFICE" }],
            placeholder: "Please select",

        },
    ]

    const form = useForm<z.infer<typeof CardProfileDto>>({
        resolver: zodResolver(CardProfileDto),
        defaultValues: {
            card_name: '',
            bin_prefix: '',
            card_scheme: undefined,
            expiration: undefined,
            description: '',
            currency: undefined,
            branch_blacklist: undefined,
            fees: undefined,
        }
    })

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "fees",
    });

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            append(data);
            form.trigger("fees");
        }
    }, [data])


    const onSubmit = async (data: z.infer<typeof CardProfileDto>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cards/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit profile: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Profile created successfully:", result);
        } catch (error) {
            console.error("Error submitting profile:", error);
        }
    };

    return (
        <section>
            <div className='flex flex-col gap-1 justify-center mb-[10px]'>
                <div className='text-[#101828] text-lg font-bold'>Create Profile</div>
                <div className='text-[#475467] text-sm'>Fill in profile details and add card fee.</div>
            </div>

            <div className='border border-[#E2E2E2] rounded-[10px] p-4 pb-7'>
                <div className='text-[#121212] text-lg w-fit'>Profile Details</div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='md:px-0 md:py-0 flex flex-col gap-12 w-full xl:w-fit '>
                        <div className='mt-7 flex flex-col xl:w-fit xl:grid xl:grid-cols-2 gap-x-[106px] gap-y-[20px] h-fit w-full'>
                            {inputs.map((input, i) => (
                                !input.type ?
                                    (<FormField
                                        key={i}
                                        control={form.control}
                                        name={input.name}
                                        render={({ field }) => (
                                            <FormItem className='w-full xl:w-[448px] h-fit'>
                                                <FormLabel className='text-sm text-[#344054] font-medium'>{input.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="h-[44px] w-full xl:w-[448px]"
                                                        {...field}
                                                        value={typeof field.value === 'string' ? field.value : ""}
                                                    />
                                                </FormControl>
                                                <FormMessage className='text-red-500' />
                                            </FormItem>
                                        )}
                                    />)
                                    : input.type == "date" ? (
                                        <FormField
                                            key={i}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem className='w-full xl:w-[448px] h-fit'>
                                                    <FormLabel className='text-sm text-[#344054] font-medium'>Expiration</FormLabel>
                                                    <Input
                                                        type="date"
                                                        className="h-[44px] w-full xl:w-[448px]"
                                                        {...field}
                                                        value={typeof field.value === 'string' ? field.value : ""}
                                                    />
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    ) : input.type === "select" ? (
                                        <FormField
                                            key={i}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem className='w-full xl:w-[448px] h-fit'>
                                                    <FormLabel>{input.label}</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value);

                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="h-[44px] w-full xl:w-[448px]">
                                                                <SelectValue placeholder={input.placeholder} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white">
                                                            {input.values?.map((value, i) => (
                                                                <SelectItem className="uppercase" key={i} value={value.value}>
                                                                    {value.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-xs text-red-500" />
                                                </FormItem>
                                            )}
                                        />
                                    ) : null
                            ))}
                        </div>
                        <div className='mt-4 p-4 border rounded-[10px]'>
                            <div className='text-[#121212] text-lg w-fit'>Fees</div>
                            <AddFeeModal setData={setData} />

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center text-xs text-[475467] bg-[#F9FAFB]">Name</TableHead>
                                        <TableHead className="text-center text-xs text-[475467]">Value</TableHead>
                                        <TableHead className="text-center text-xs text-[475467]">Frequency</TableHead>
                                        <TableHead className="text-center text-xs text-[475467]">Currency</TableHead>
                                        <TableHead className="text-center text-xs text-[475467]">Amount Paid</TableHead>
                                        <TableHead className="text-center text-xs text-[475467]">Account</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className='overflow-auto'>
                                    {fields.map((field, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="text-[10px] text-[#475467] text-center">{field.fee_name}</TableCell>
                                            <TableCell className="text-[10px] text-[#475467] text-center">{field.value}</TableCell>
                                            <TableCell className="text-[10px] text-[#475467] text-center">{field.fee_frequency}</TableCell>
                                            <TableCell className="text-[10px] text-[#475467] text-center">{field.currency}</TableCell>
                                            <TableCell className="text-[10px] text-[#475467] text-center">{field.account_paid}</TableCell>
                                            <TableCell className="text-[10px] text-[#475467] text-center"> {field.account}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>
                        <Button
                            className='w-[293px] py-2 px-4 bg-[#014DAF] mt-9'>
                            Create Profile
                        </Button>
                    </form>
                </Form>
            </div>

        </section >
    )
}

export default Page
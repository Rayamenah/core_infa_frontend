import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FeesDto } from '@/schema/cardProfile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, PlusSquare } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
// import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const AddFeeModal = ({ setData }: { setData: (data: z.infer<typeof FeesDto>) => void }) => {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof FeesDto>>({
        resolver: zodResolver(FeesDto),
        defaultValues: {
            fee_name: '',
            value: undefined,
            currency: undefined,
            fee_frequency: undefined,
            fee_impact: undefined,
            account_paid: undefined,
            account: undefined
        },
    })


    type InputFieldNames = "fee_name" | "value" | "currency" | "fee_frequency" | "fee_impact" | "account_paid" | "account"

    const inputs: { name: InputFieldNames; label: string, type?: string, values?: { label: string, value: string }[] }[] = [
        {
            name: "fee_name",
            label: "Fee Name",
        },
        {
            name: "value",
            label: "Value",
        },
        {
            name: "currency",
            label: "Currency",
            type: 'radio',
            values: [{ label: 'NGN', value: "NGN" }, { label: 'USD', value: "USD" }]
        },
        {
            name: "fee_frequency",
            label: "Fee Frequency",
            type: 'radio',
            values: [{ label: 'One Off', value: "ONE_OFF" }, { label: 'Monthly', value: "MONTHLY" }]
        },
        {
            name: "fee_impact",
            label: "Fee Impact",
            type: 'radio',
            values: [{ label: 'Issuance', value: "ISSUANCE" }, { label: 'Pin Reissue', value: "PIN_REISSUE" }]
        },
        {
            name: "account_paid",
            label: "Account Paid",
            type: 'radio',
            values: [
                { label: 'None', value: "NONE" },
                { label: 'Branch Code Prefix', value: "BRANCH_CODE_PREFIX" },
                { label: 'Branch Code Suffix', value: "BRANCH_CODE_SUFFIX" }
            ]
        },
        {
            name: "account",
            label: "Account",
        },
    ];

    const onSubmit = (data: z.infer<typeof FeesDto>) => {
        console.log("modal", data)
        setData(data)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                onClick={() => setOpen(true)}
                className='w-full md:w-auto py-2 px-4 bg-[#014DAF] mt-6 mb-3'>
                <PlusIcon className="w-[20px] h-[20px] text-white" />
                Add Fee
            </Button>
            <DialogContent
                className="w-full max-w-[498px]">
                <DialogHeader className="flex flex-row justify-start items-center gap-6">
                    {/* <VisuallyHidden>
                        <DialogTitle>Title</DialogTitle>
                    </VisuallyHidden> */}
                    <div className='flex justify-center items-center h-12 w-12 border rounded-[10px]'>
                        <PlusSquare className='w-4 h-4 text-[#344054]' />
                    </div>
                    <div className="w-fit h-fit flex flex-col justify-center">
                        <div className='text-[#101828] text-lg font-bold'>
                            Add Fees
                        </div>
                        <div className='text-[#475467] text-sm'>
                            Fill in fee details
                        </div>
                    </div>
                </DialogHeader>

                <section className="mt-5">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col h-fit w-full gap-4">

                                {inputs.map((input, i) => (
                                    !input.type ? (
                                        <FormField
                                            key={i}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem className='w-full xl:w-[400px] h-fit'>
                                                    <FormLabel className='font-medium text-sm text-[#1B1C1E]'>{input.label}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            className="h-[40px] w-full xl:w-[448px]"
                                                            {...field}
                                                            value={typeof field.value === 'string' ? field.value : ""}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className='text-red-500' />
                                                </FormItem>
                                            )}
                                        />
                                    ) : input.type === "radio" ? (
                                        <FormField
                                            key={i}
                                            control={form.control}
                                            name={input.name}
                                            render={({ field }) => (
                                                <FormItem className="h-14">
                                                    <FormLabel className='font-semibold text-sm text-[#1B1C1E]'>{input.label}</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={typeof field.value === 'string' ? field.value : undefined}
                                                            className="flex space-x-5"
                                                        >
                                                            {input.values && input.values.map((item, i) => (
                                                                <FormItem key={i} className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value={item.value} />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {item.label}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            ))}

                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : null
                                ))}
                            </div>

                            <Button
                                className='bg-[#014DAF] text-white w-full rounded-[4px] mt-14'>
                                Add Fee
                            </Button>
                        </form>
                    </Form>
                </section>
            </DialogContent>
        </Dialog >

    )
}

export default AddFeeModal
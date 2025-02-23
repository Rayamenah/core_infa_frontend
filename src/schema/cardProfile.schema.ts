import { z } from 'zod';

// Enums
export const CardScheme = z.enum(['VISA', 'MASTERCARD']);
export const FeeFrequency = z.enum(['MONTHLY', 'ONE_OFF']);
export const FeeImpact = z.enum(['ISSUANCE', 'PIN_REISSUE']);
export const AccountPaid = z.enum(['BRANCH_CODE_PREFIX', 'BRANCH_CODE_SUFFIX', 'NONE']);
export const Currency = z.enum(['NGN', 'USD', 'EUR']);
export const BranchBlackList = z.enum(['HEAD_OFFICE', 'LAGOS_OFFICE', 'ABUJA_OFFICE']);

// Fees Schema
export const FeesDto = z.object({
    fee_name: z.string().min(1, "fee name required"),
    value: z.coerce.number(),
    currency: Currency,
    fee_frequency: FeeFrequency,
    fee_impact: FeeImpact,
    account_paid: AccountPaid,
    account: z.coerce.number(),
});

// CardProfile Schema
export const CardProfileDto = z.object({
    card_name: z.string().min(1, "card name required"),
    bin_prefix: z.string().min(1, "bin prefix required"),
    card_scheme: CardScheme,
    expiration: z.coerce.date({ message: "invalid date" }),
    description: z.string().min(1, "description required"),
    currency: Currency,
    branch_blacklist: BranchBlackList,
    fees: z.array(FeesDto).optional(),
});


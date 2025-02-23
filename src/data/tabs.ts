import { UserRoundSearch, Landmark, Users2, Settings2Icon, CreditCard, CreditCardIcon, ChartCandlestickIcon, List, Map, LucideFileStack, User } from "lucide-react";

type Tab = {
    name: string;
    icon: React.ElementType;
    link: string;
};
export const tabs: Tab[] = [

    {
        name: "Branches",
        icon: UserRoundSearch,
        link: '/',
    },
    {
        name: "Roles",
        icon: Landmark,
        link: '/',
    },

    {
        name: "Users",
        icon: Users2,
        link: '/',
    },
    {
        name: "Card Scheme",
        icon: Settings2Icon,
        link: '/',
    },
    {
        name: "Card Profile",
        icon: CreditCard,
        link: '/card-profile',

    },
    {
        name: "Card Request",
        icon: CreditCardIcon,
        link: '/card-request',
    },
    {
        name: "Stock",
        icon: ChartCandlestickIcon,
        link: '/',
    },
    {
        name: "Cards",
        icon: CreditCard,
        link: '/',
    },
    {
        name: "Block/Unblock Card",
        icon: CreditCard,
        link: '/',
    },
    {
        name: "Authorization List",
        icon: List,
        link: '/',
    },
    {
        name: "Authorization Queue",
        icon: LucideFileStack,
        link: '/',
    },
    {
        name: "Trail",
        icon: Map,
        link: '/',
    },

    {
        name: "Account",
        icon: User,
        link: '/',
    },
];
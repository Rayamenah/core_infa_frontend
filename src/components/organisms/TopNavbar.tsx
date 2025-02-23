"use client"
import { Bell, Home, User } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { tabs } from '@/data/tabs';

const TopNavbar = () => {

    // const router = useRouter();
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

    const activeTab = tabs.find((tab) => currentPath.startsWith(tab.link));

    return (
        <section className='w-full py-[5px] h-12 border-b-gray-300 border-b flex items-center justify-between'>
            <div className='w-[12.9rem] h-full rounded-[8px] pl-3 py-[10px] '>
                <div className='flex justify-start items-center gap-3 text-[#001735] text-xs w-fit'>
                    {activeTab ? (
                        <>
                            <activeTab.icon className="size-[13.33px] text-[#001735]" />
                            {activeTab.name}
                        </>
                    ) : (
                        <>
                            <Home className="size-[13.33px] text-[#001735]" />
                            Dashboard
                        </>
                    )}
                </div>
            </div>

            <div className='flex justify-between w-fit items-center gap-4 mr-[19px]'>
                <Input
                    placeholder='Search'
                    className='border-[#D0D5DD] rounded-[97.99px] text-xs text-[#344054]'
                />
                <div className='w-[40px] h-[40px] flex justify-center items-center'>
                    <Bell className='size-[20px] text-[#475467]' />
                </div>
                <div className='w-[40px] h-[30px] flex justify-center items-center rounded-full bg-[#F2F4F7]'>
                    <User className='size-[20px] text-[#475467]' />
                </div>
            </div>

        </section>
    )
}

export default TopNavbar
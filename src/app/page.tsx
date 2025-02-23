'use client'
import Analytics from '@/components/organisms/Analytics';
import QuickAccess from '@/components/organisms/QuickAccess';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const Page = () => {
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchCardRequest = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching card profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCardRequest();
  }, [setLoading]);

  const currentDate = format(now, "d, MMM, yyyy");

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <section>
      <div className='flex justify-between items-center'>
        <div className='text-lg font-bold text-[#121212]'>Hi Nazeer, what would you like to do today?</div>
        <div className="flex  gap-1 items-center border-[#D0D5DD]">
          <div className='flex gap-1 text-xs items-center'>
            <Calendar className='w-[14px]' />
            Today
          </div>
          <p className="text-xs font-normal !text-[#131313]">
            {currentDate}
          </p>
        </div>
      </div>
      <div className='text-xs text-[#121212] mt-[0.38rem]'>Last login: 26/11/2024  14:39:58</div>

      <QuickAccess />
      <div className='text-lg font-bold flex items-center gap-1 my-[10px]'>
        Analytics
        <div className='w-full border bg-gray-400' />
      </div>

      <Analytics data={data} />
    </section>
  )
}

export default Page
import BarChart from "@/components/Charts/BarChart";
import AreaChart from "@/components/Charts/AreaChart";
import AppLayout from "@/layouts/AppLayout";
import { ReceiptPercentIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { LuCrown } from "react-icons/lu";

const stats = [
  { name: "Total Offers Listed", value: 200, icon: ReceiptPercentIcon },
  { name: "Partners Registered", value: 320, icon: UserGroupIcon },
  { name: "Customers Registered", value: 509, icon: UserGroupIcon },
  { name: "Membership Holders", value: 509, icon: LuCrown },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <section className="">
        <div className="">
          <h3>Dashboard</h3>
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} item={stat} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <div className="py-4 bg-white rounded-lg shadow-md">
            <AreaChart />
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            <BarChart />
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            <AreaChart />
          </div>
          <div className="py-4 bg-white rounded-lg shadow-md">
            <BarChart />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export function StatsCard({ item }) {
  return (
    <div className="rounded-lg p-6 bg-white shadow-md">
      <div className="flex justify-between">
        <div>
          <h5 className="text-gray-400 text-xs">{item.name}</h5>
          <h2>{item.value}</h2>
        </div>
        <div>
          <item.icon className="w-8 h-8 fill-primary stroke-primary stroke-0" />
        </div>
      </div>
    </div>
  );
}

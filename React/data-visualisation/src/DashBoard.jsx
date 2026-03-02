import ProgressCard from "./ProgressCard";
import ExpensesBarChart from "./ExpensesBarChart";
import SpendingPieChart from "./SpendingPieChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10 space-y-10">
      <div className="flex gap-10 flex-wrap">
        <ProgressCard />
        <ExpensesBarChart />
      </div>

      <div className="flex gap-10 flex-wrap">
        <SpendingPieChart />
      </div>
    </div>
  );
}

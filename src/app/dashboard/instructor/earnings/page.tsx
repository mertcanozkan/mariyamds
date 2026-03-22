"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, ArrowDown } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatters";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const earningsData = {
  week: [
    { label: "Mon", gross: 13000, lessons: 2 },
    { label: "Tue", gross: 6500, lessons: 1 },
    { label: "Wed", gross: 13000, lessons: 2 },
    { label: "Thu", gross: 0, lessons: 0 },
    { label: "Fri", gross: 6500, lessons: 1 },
    { label: "Sat", gross: 19500, lessons: 3 },
    { label: "Sun", gross: 0, lessons: 0 },
  ],
  month: [
    { label: "W1", gross: 58500, lessons: 9 },
    { label: "W2", gross: 71500, lessons: 11 },
    { label: "W3", gross: 65000, lessons: 10 },
    { label: "W4", gross: 85000, lessons: 13 },
  ],
};

const payouts = [
  { date: "15 Dec 2024", amount: 238500, status: "paid", lessons: 39 },
  { date: "15 Nov 2024", amount: 214500, status: "paid", lessons: 33 },
  { date: "15 Oct 2024", amount: 299000, status: "paid", lessons: 46 },
];

type Period = "week" | "month";

export default function EarningsPage() {
  const [period, setPeriod] = useState<Period>("month");

  const data = earningsData[period];
  const totalGross = data.reduce((s, d) => s + d.gross, 0);
  const platformFee = Math.floor(totalGross * 0.1);
  const netPayout = totalGross - platformFee;
  const maxValue = Math.max(...data.map((d) => d.gross));

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Earnings</h1>
        <p className="text-slate-400 text-sm">Track your income and payout history.</p>
      </div>

      {/* Period selector */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/5 border border-white/8 w-fit">
        {(["week", "month"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
              period === p ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            This {p}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Gross earnings", value: formatPrice(totalGross), color: "text-white", icon: DollarSign },
          { label: "Platform fee (10%)", value: `-${formatPrice(platformFee)}`, color: "text-red-400", icon: ArrowDown },
          { label: "Net payout", value: formatPrice(netPayout), color: "text-emerald-400", icon: TrendingUp },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-white/8 bg-[#0f1117] p-4">
              <Icon size={14} className="text-slate-500 mb-2" />
              <div className={`text-xl font-bold mb-0.5 ${card.color}`}>{card.value}</div>
              <div className="text-xs text-slate-500">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5 mb-6">
        <h2 className="text-base font-semibold text-white mb-5">Earnings breakdown</h2>
        <div className="flex items-end gap-3 h-32">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              {d.gross > 0 && (
                <span className="text-[10px] text-slate-500">{formatPrice(d.gross).replace(".00", "")}</span>
              )}
              <div
                className="w-full rounded-t bg-blue-500 transition-all"
                style={{ height: maxValue > 0 ? `${(d.gross / maxValue) * 100}%` : "4px", minHeight: d.gross > 0 ? "8px" : "2px" }}
              />
              <span className="text-xs text-slate-600">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payout history */}
      <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
        <h2 className="text-base font-semibold text-white mb-4">Payout history</h2>
        <div className="space-y-3">
          {payouts.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/6">
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{formatPrice(p.amount)}</div>
                <div className="text-xs text-slate-500">{p.date} · {p.lessons} lessons</div>
              </div>
              <Badge variant={p.status === "paid" ? "green" : "amber"} size="sm">
                {p.status}
              </Badge>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600 mt-4">
          Payouts are processed on the 15th of each month. Platform fee is 10% of each lesson booked.
        </p>
      </div>
    </div>
  );
}

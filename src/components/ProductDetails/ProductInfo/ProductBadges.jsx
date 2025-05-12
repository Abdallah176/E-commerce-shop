import { BadgeCheck, HandCoins, RotateCcw } from "lucide-react";

export default function ProductBadges() {
  return (
    <div className="text-sm text-gray-600 mt-6 space-y-3">
      <div className="flex items-center gap-2">
        <BadgeCheck className="w-4 h-4 text-green-600" />
        <p>100% Original product</p>
      </div>
      <div className="flex items-center gap-2">
        <HandCoins className="w-4 h-4 text-yellow-600" />
        <p>Cash on delivery available</p>
      </div>
      <div className="flex items-center gap-2">
        <RotateCcw className="w-4 h-4 text-blue-600" />
        <p>Easy returns within 7 days</p>
      </div>
    </div>
  );
}

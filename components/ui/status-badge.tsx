import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // Normalize status to handle different formats
  const normalizedStatus = status?.toLowerCase() || '';
  
  const variants: { [key: string]: string } = {
    sold: "bg-green-100 text-green-800",
    "in_transit": "bg-blue-100 text-blue-800",
    "in transit": "bg-blue-100 text-blue-800",
    warehouse: "bg-yellow-100 text-yellow-800",
    available: "bg-gray-100 text-gray-800",
    pending: "bg-orange-100 text-orange-800",
    completed: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  // Get the appropriate variant or default to gray
  const variant = variants[normalizedStatus] || "bg-gray-100 text-gray-800";
  
  // Format status for display
  const displayStatus = status?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant,
        className,
      )}
    >
      {displayStatus}
    </span>
  )
}

import { MainLayout } from "@/components/layout/main-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { payments } from "@/data/payments"
import { DollarSign, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function SalesPaymentsPage() {
  const pendingPayments = payments.filter((payment) => payment.status === "Pending")
  const completedPayments = payments.filter((payment) => payment.status === "Completed")
  const overduePayments = payments.filter((payment) => payment.status === "Overdue")

  const totalPending = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const totalCompleted = completedPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const totalOverdue = overduePayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={`$${totalCompleted.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: "+8% from last month", isPositive: true }}
          />
          <StatCard title="Pending Payments" value={`$${totalPending.toLocaleString()}`} icon={Clock} />
          <StatCard title="Completed Payments" value={completedPayments.length} icon={CheckCircle} />
          <StatCard
            title="Overdue Payments"
            value={`$${totalOverdue.toLocaleString()}`}
            icon={AlertTriangle}
            className="border-red-200"
          />
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Payments</h2>
            <span className="text-sm text-gray-600">{pendingPayments.length} payments</span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">#{payment.id.toString().padStart(4, "0")}</TableCell>
                    <TableCell>{payment.carName}</TableCell>
                    <TableCell>{payment.buyerName}</TableCell>
                    <TableCell className="font-semibold">${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Completed Payments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Completed Payments</h2>
            <span className="text-sm text-gray-600">{completedPayments.length} payments</span>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">#{payment.id.toString().padStart(4, "0")}</TableCell>
                    <TableCell>{payment.carName}</TableCell>
                    <TableCell>{payment.buyerName}</TableCell>
                    <TableCell className="font-semibold">${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}</TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

'use client'
import AdminCharts from "@/components/modules/Admin/AdminCharts"
import Overview from "@/components/modules/AllRoles/Overview"

const AdminOverview = () => {
  return (
    <div className="w-90 h-full flex flex-col justify-center items-center gap-8">
        <Overview />
        <AdminCharts />
    </div>
  )
}

export default AdminOverview
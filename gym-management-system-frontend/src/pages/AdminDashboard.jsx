import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";
import { getAllMembers } from "../services/memberService.js";
import { money } from "../utils/format.js";

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getAllMembers();
      setMembers(data);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (m) => m.status === "Active"
  ).length;

  const expiredMembers = members.filter(
    (m) => m.status === "Expired"
  ).length;

  const pendingAmount = members.reduce(
    (sum, member) => sum + (member.balance || 0),
    0
  );

  const totalRevenue = members.reduce(
    (sum, member) => sum + (member.paidAmount || 0),
    0
  );

  const stats = [
    ["Total Members", totalMembers],
    ["Active Members", activeMembers],
    ["Expired Members", expiredMembers],
    ["Revenue", money(totalRevenue)],
    ["Pending Due", money(pendingAmount)],
  ];

  const recent = [...members]
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  return (
    <DashboardLayout type="admin">
      <h1 className="mb-6 text-4xl font-black">
        Admin Dashboard
      </h1>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(([title, value]) => (
          <Card key={title}>
            <p className="text-sm text-white/50">{title}</p>

            <h3 className="mt-2 text-3xl font-black gradient-text">
              {value}
            </h3>
          </Card>
        ))}
      </div>

      <Card className="mt-6 overflow-x-auto">
        <h2 className="mb-4 text-2xl font-black">
          Recent Members
        </h2>

        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="text-left text-brand-yellow">
              <th className="p-3">Member</th>
              <th>Mobile</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Due</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((member) => (
              <tr
                key={member.id}
                className="border-t border-white/10"
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-600"></div>
                    )}

                    <span className="font-bold">
                      {member.name}
                    </span>
                  </div>
                </td>

                <td>{member.mobile}</td>

                <td>{member.planName}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      member.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : member.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                <td>{money(member.paidAmount || 0)}</td>

                <td>{money(member.balance || 0)}</td>

                <td>{member.joinDate}</td>
              </tr>
            ))}

            {recent.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-white/40"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </DashboardLayout>
  );
}
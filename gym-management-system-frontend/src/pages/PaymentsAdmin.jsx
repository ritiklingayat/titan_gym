import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";
import Loader from "../components/common/Loader.jsx";

import { getAllPayments } from "../services/paymentService.js";
import { money } from "../utils/format.js";

export default function PaymentsAdmin() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      setLoading(true);

      const data = await getAllPayments();

      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Payment fetch error:",
        error
      );

      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <DashboardLayout type="admin">
      <h1 className="mb-6 text-4xl font-black">
        Payment Management
      </h1>

      <Card className="overflow-x-auto">
        {loading ? (
          <Loader text="Loading payments..." />
        ) : (
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="text-left text-brand-yellow">
                <th className="p-4">
                  Member
                </th>

                <th>Amount</th>

                <th>Mode</th>

                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-white/10"
                  >
                    <td className="p-4 font-bold">
                      {payment.memberName ||
                        "Unknown"}
                    </td>

                    <td>
                      {money(
                        Number(
                          payment.amount || 0
                        )
                      )}
                    </td>

                    <td>
                      {payment.paymentMode ||
                        "—"}
                    </td>

                    <td>
                      {payment.paymentDate ||
                        "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-white/40"
                  >
                    No payments recorded
                    yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </DashboardLayout>
  );
}
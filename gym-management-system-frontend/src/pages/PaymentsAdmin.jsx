import { useEffect, useState } from 'react';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/common/Card.jsx';

import { getAllPayments } from '../services/paymentService.js';
import { money } from '../utils/format.js';



export default function PaymentsAdmin() {


  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadPayments();

  }, []);




  const loadPayments = async () => {


    try {


      const data = await getAllPayments();


      setPayments(data);



    } catch (error) {


      console.log(
        "Payment fetch error:",
        error
      );


    } finally {


      setLoading(false);


    }


  };




  return (

    <DashboardLayout type="admin">


      <h1 className="mb-6 text-4xl font-black">
        Payment Management
      </h1>



      <Card className="overflow-x-auto">


        <table className="w-full min-w-[650px]">


          <thead>

            <tr className="text-left text-brand-yellow">

              <th className="p-4">
                Member
              </th>


              <th>
                Amount
              </th>


              <th>
                Mode
              </th>


              <th>
                Date
              </th>


            </tr>

          </thead>



          <tbody>


          {
            loading ? (

              <tr>

                <td 
                colSpan="4"
                className="p-8 text-center text-white/40">

                  Loading payments...

                </td>

              </tr>


            )

            :

            payments.length > 0 ? (


              payments.map((payment)=>(


                <tr
                key={payment.id}
                className="border-t border-white/10">


                  <td className="p-4 font-bold">

                    {payment.memberName || "Unknown"}

                  </td>



                  <td>

                    {money(payment.amount)}

                  </td>



                  <td>

                    {payment.paymentMode}

                  </td>



                  <td>

                    {payment.paymentDate}

                  </td>



                </tr>


              ))


            )


            :

            (

              <tr>

                <td
                colSpan="4"
                className="p-8 text-center text-white/40">

                  No payments recorded yet.

                </td>

              </tr>

            )


          }


          </tbody>



        </table>


      </Card>


    </DashboardLayout>

  );

}
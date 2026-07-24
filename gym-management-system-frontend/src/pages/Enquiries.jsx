import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";

import {
  getAllEnquiries,
  deleteEnquiry,
  updateStatus
} from "../services/enquiryService";

export default function Enquiries() {

  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {

      const data = await getAllEnquiries();

      setEnquiries(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleStatusChange = async (id, status) => {

    try {

        await updateStatus(id, status);

        loadEnquiries();

    } catch (error) {

        console.log(error);

    }

};

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this enquiry?")) return;

    try {

      await deleteEnquiry(id);

      loadEnquiries();

    } catch (error) {

      console.log(error);

      alert("Unable to delete enquiry.");

    }

  };

  return (
    <DashboardLayout type="admin">

      <h1 className="mb-6 text-4xl font-black">
        Enquiry Management
      </h1>

      {loading ? (

        <Card>

          <p className="text-center text-white/50 py-10">
            Loading enquiries...
          </p>

        </Card>

      ) : enquiries.length === 0 ? (

        <Card>

          <p className="text-center text-white/50 py-10">
            No enquiries found.
          </p>

        </Card>

      ) : (

        <div className="grid gap-4">

          {enquiries.map((enquiry) => (

            <Card key={enquiry.id}>

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-2xl font-black">

                    {enquiry.name}

                  </h3>

                  <p className="text-brand-yellow mt-1">

                    {enquiry.plan}

                  </p>

                  <p className="text-white/70 mt-2">

                    📞 {enquiry.mobile}

                  </p>

                  <p className="text-white/70 mt-2">

                    💬 {enquiry.message}

                  </p>

                  <p className="text-white/50 mt-3 text-sm">

                    Date :{" "}
                    {new Date(
                      enquiry.enquiryDate
                    ).toLocaleString()}

                  </p>
<select
    value={enquiry.status}
    onChange={(e) =>
        handleStatusChange(
            enquiry.id,
            e.target.value
        )
    }
    className="mt-3 rounded-lg bg-black border border-white/20 p-2"
>

    <option value="Pending">
        Pending
    </option>

    <option value="Contacted">
        Contacted
    </option>

    <option value="Visited">
        Visited
    </option>

    <option value="Joined">
        Joined
    </option>

    <option value="Closed">
        Closed
    </option>

</select>

                </div>

                <button
                  onClick={() => handleDelete(enquiry.id)}
                  className="rounded-full bg-red-500/20 p-3 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </Card>

          ))}

        </div>

      )}

    </DashboardLayout>
  );
}
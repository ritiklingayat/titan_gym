import { useEffect, useState } from "react";
import {
  Trash2,
  LoaderCircle,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";
import Loader from "../components/common/Loader.jsx";

import {
  getAllEnquiries,
  deleteEnquiry,
  updateStatus,
} from "../services/enquiryService.js";

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadEnquiries = async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const data = await getAllEnquiries();

      setEnquiries(
        Array.isArray(data) ? data : [],
      );
    } catch (error) {
      console.error(
        "Unable to load enquiries:",
        error,
      );

      setEnquiries([]);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadEnquiries(true);
  }, []);

  const handleStatusChange = async (
    id,
    status,
  ) => {
    try {
      setUpdatingId(id);

      await updateStatus(id, status);

      setEnquiries((currentEnquiries) =>
        currentEnquiries.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status,
              }
            : enquiry,
        ),
      );
    } catch (error) {
      console.error(
        "Unable to update enquiry status:",
        error,
      );

      alert("Unable to update enquiry status.");

      await loadEnquiries(false);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this enquiry?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteEnquiry(id);

      setEnquiries((currentEnquiries) =>
        currentEnquiries.filter(
          (enquiry) => enquiry.id !== id,
        ),
      );
    } catch (error) {
      console.error(
        "Unable to delete enquiry:",
        error,
      );

      alert("Unable to delete enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleString();
  };

  return (
    <DashboardLayout type="admin">
      <h1 className="mb-6 text-4xl font-black">
        Enquiry Management
      </h1>

      {loading ? (
        <Card>
          <Loader text="Loading enquiries..." />
        </Card>
      ) : enquiries.length === 0 ? (
        <Card>
          <p className="py-10 text-center text-white/50">
            No enquiries found.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {enquiries.map((enquiry) => (
            <Card key={enquiry.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-2xl font-black">
                    {enquiry.name || "Unknown"}
                  </h3>

                  <p className="mt-1 text-brand-yellow">
                    {enquiry.plan || "No plan selected"}
                  </p>

                  <p className="mt-2 break-words text-white/70">
                    📞 {enquiry.mobile || "—"}
                  </p>

                  <p className="mt-2 break-words text-white/70">
                    💬 {enquiry.message || "No message"}
                  </p>

                  <p className="mt-3 text-sm text-white/50">
                    Date:{" "}
                    {formatDate(
                      enquiry.enquiryDate,
                    )}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <select
                      value={
                        enquiry.status || "Pending"
                      }
                      disabled={
                        updatingId === enquiry.id ||
                        deletingId === enquiry.id
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          enquiry.id,
                          event.target.value,
                        )
                      }
                      className="rounded-lg border border-white/20 bg-black p-2 disabled:cursor-not-allowed disabled:opacity-50"
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

                    {updatingId === enquiry.id && (
                      <span className="inline-flex items-center gap-2 text-sm text-brand-yellow">
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />
                        Updating status...
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  title="Delete enquiry"
                  onClick={() =>
                    handleDelete(enquiry.id)
                  }
                  disabled={
                    deletingId === enquiry.id ||
                    updatingId === enquiry.id
                  }
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-500/20 p-3 text-red-400 hover:bg-red-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deletingId === enquiry.id ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import Loader from "../components/common/Loader.jsx";

import { plans } from "../data/gymData.js";
import { money } from "../utils/format.js";
import { fileToCompressedDataUrl } from "../utils/image.js";

import { getAllTrainers } from "../services/trainerService.js";
import { recordPayment } from "../services/paymentService.js";

import {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} from "../services/memberService.js";

import {
  Search,
  Plus,
  Eye,
  Wallet,
  Pencil,
  Trash2,
  User,
  LoaderCircle,
} from "lucide-react";

const createEmptyForm = () => ({
  name: "",
  mobile: "",
  age: "",
  address: "",
  joinDate: new Date().toISOString().slice(0, 10),
  planId: plans[0]?.id || "",
  paidAmount: "",
  mode: "Cash",
  photo: null,
  gender: "",
  trainer: "without",
  trainerId: "",
});

function statusColor(status) {
  if (status === "Active") {
    return "bg-green-500/15 text-green-400";
  }

  if (status === "Pending") {
    return "bg-yellow-500/15 text-yellow-400";
  }

  return "bg-red-500/15 text-red-400";
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [availableTrainers, setAvailableTrainers] = useState([]);

  const [query, setQuery] = useState("");

  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState(createEmptyForm);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);

  const [payAmount, setPayAmount] = useState("");
  const [payMode, setPayMode] = useState("Cash");

  const [pageLoading, setPageLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [savingMember, setSavingMember] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const refresh = async (showLoader = false) => {
    if (showLoader) {
      setPageLoading(true);
    }

    try {
      const data = await getAllMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load members:", error);
      alert("Unable to load members.");
    } finally {
      if (showLoader) {
        setPageLoading(false);
      }
    }
  };

  const loadTrainers = async () => {
    try {
      const response = await getAllTrainers();

      const trainers = Array.isArray(response)
        ? response
        : response?.data;

      setAvailableTrainers(
        Array.isArray(trainers) ? trainers : [],
      );
    } catch (error) {
      console.error("Failed to load trainers:", error);
      setAvailableTrainers([]);
    }
  };

  useEffect(() => {
    const loadPageData = async () => {
      setPageLoading(true);

      try {
        await Promise.all([
          refresh(false),
          loadTrainers(),
        ]);
      } finally {
        setPageLoading(false);
      }
    };

    loadPageData();
  }, []);

  const filtered = useMemo(() => {
  const searchValue = query
    .trim()
    .toLowerCase();

  if (!searchValue) {
    return members;
  }

  return members.filter((member) => {
    const searchableValues = [
      member.name,
      member.mobile,
      member.gender,
      member.planName,
      member.status,
      member.address,
    ]
      .filter(Boolean)
      .map((value) =>
        String(value).toLowerCase(),
      );

    return searchableValues.some((value) =>
      value.includes(searchValue),
    );
  });
}, [members, query]);

  const closeModal = () => {
    if (savingMember || savingPayment) {
      return;
    }

    setModal(null);
    setSelected(null);
    setSelectedPhotoFile(null);
    setForm(createEmptyForm());
    setPayAmount("");
    setPayMode("Cash");
    setViewLoading(false);
  };

  const openAdd = () => {
    const firstRegularPlan = plans.find(
      (plan) => plan.type === "regular",
    );

    setSelected(null);
    setSelectedPhotoFile(null);

    setForm({
      ...createEmptyForm(),
      planId: firstRegularPlan?.id || plans[0]?.id || "",
    });

    setModal("add");
  };

  const openEdit = (member) => {
    setSelected(member);
    setSelectedPhotoFile(null);

    setForm({
      name: member.name || "",
      mobile: member.mobile || "",
      age: member.age || "",
      address: member.address || "",
      joinDate:
        member.joinDate ||
        new Date().toISOString().slice(0, 10),
      planId: member.planId || plans[0]?.id || "",
      paidAmount: member.paidAmount ?? "",
      mode: "Cash",
      photo: member.photo || null,
      gender: member.gender || "",
      trainer: member.trainer || "without",
      trainerId: member.trainerId
        ? String(member.trainerId)
        : "",
    });

    setModal("edit");
  };

  const openView = async (member) => {
    setSelected(member);
    setModal("view");
    setViewLoading(true);

    try {
      const data = await getMemberById(member.id);
      setSelected(data);
    } catch (error) {
      console.error("Failed to load member details:", error);
      alert("Unable to load member details.");

      setModal(null);
      setSelected(null);
    } finally {
      setViewLoading(false);
    }
  };

  const openPayment = (member) => {
    setSelected(member);
    setPayAmount("");
    setPayMode("Cash");
    setModal("payment");
  };

  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setPhotoLoading(true);
    setSelectedPhotoFile(file);

    try {
      const dataUrl = await fileToCompressedDataUrl(file);

      setForm((currentForm) => ({
        ...currentForm,
        photo: dataUrl,
      }));
    } catch (error) {
      console.error("Photo processing failed:", error);

      setSelectedPhotoFile(null);

      alert(
        "Could not read that image. Please try a different file.",
      );
    } finally {
      setPhotoLoading(false);
    }
  };

  const validateTrainer = () => {
    if (
      form.trainer === "with" &&
      !form.trainerId
    ) {
      alert("Please select a trainer.");
      return false;
    }

    return true;
  };

  const submitAdd = async (event) => {
    event.preventDefault();

    if (!validateTrainer()) {
      return;
    }

    try {
      setSavingMember(true);

      const memberData = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        age: form.age ? Number(form.age) : null,
        address: form.address.trim(),
        gender: form.gender,
        trainer: form.trainer,
        trainerId:
          form.trainer === "with"
            ? Number(form.trainerId)
            : null,
        planId: form.planId,
        joinDate: form.joinDate,
        paidAmount: Number(form.paidAmount || 0),
        mode: form.mode,
      };

      await addMember(
  memberData,
  selectedPhotoFile,
);

      await refresh(false);

      setModal(null);
      setSelected(null);
      setSelectedPhotoFile(null);
      setForm(createEmptyForm());
    } catch (error) {
      console.error("Failed to add member:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to add member.";

      alert(message);
    } finally {
      setSavingMember(false);
    }
  };

  const submitEdit = async (event) => {
    event.preventDefault();

    if (!selected) {
      return;
    }

    if (!validateTrainer()) {
      return;
    }

    try {
      setSavingMember(true);

      const memberData = {
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        age: form.age ? Number(form.age) : null,
        address: form.address.trim(),
        gender: form.gender,
        trainer: form.trainer,
        trainerId:
          form.trainer === "with"
            ? Number(form.trainerId)
            : null,
        planId: form.planId,
        joinDate: form.joinDate,
        paidAmount: Number(form.paidAmount || 0),
        mode: form.mode,
      };

      await updateMember(
        selected.id,
        memberData,
        selectedPhotoFile || null,
      );

      await refresh(false);

      setModal(null);
      setSelected(null);
      setSelectedPhotoFile(null);
      setForm(createEmptyForm());
    } catch (error) {
      console.error("Failed to update member:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to update member.";

      alert(message);
    } finally {
      setSavingMember(false);
    }
  };

  const submitPayment = async (event) => {
    event.preventDefault();

    if (!selected || !payAmount) {
      return;
    }

    const numericAmount = Number(payAmount);

    if (numericAmount <= 0) {
      alert("Payment amount must be greater than zero.");
      return;
    }

    try {
      setSavingPayment(true);

      await recordPayment({
        memberId: selected.id,
        amount: numericAmount,
        paymentMode: payMode,
        paymentDate: new Date()
          .toISOString()
          .split("T")[0],
      });

      await refresh(false);

      setModal(null);
      setSelected(null);
      setPayAmount("");
      setPayMode("Cash");
    } catch (error) {
      console.error("Failed to save payment:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to save payment.";

      alert(message);
    } finally {
      setSavingPayment(false);
    }
  };

  const handleDelete = async (member) => {
    const confirmed = window.confirm(
      `Remove ${member.name} from the members list? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(member.id);

      await deleteMember(member.id);
      await refresh(false);
    } catch (error) {
      console.error("Failed to delete member:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to delete member.";

      alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTrainerTypeChange = (trainerType) => {
    const requiredPlanType =
      trainerType === "with" ? "pt" : "regular";

    const firstMatchingPlan = plans.find(
      (plan) => plan.type === requiredPlanType,
    );

    setForm((currentForm) => ({
      ...currentForm,
      trainer: trainerType,
      trainerId:
        trainerType === "with" &&
        availableTrainers.length > 0
          ? String(availableTrainers[0].id)
          : "",
      planId:
        firstMatchingPlan?.id ||
        currentForm.planId,
    }));
  };

  return (
    <DashboardLayout type="admin">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black">
          Member Management
        </h1>

        <Button
          onClick={openAdd}
          disabled={pageLoading}
        >
          <Plus size={18} />
          Add Member
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 md:max-w-sm">
        <Search
          size={18}
          className="text-white/40"
        />

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          disabled={pageLoading}
          placeholder="Search by name, mobile, gender, plan or status..."
          className="w-full bg-transparent outline-none placeholder:text-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <Card className="overflow-x-auto">
        {pageLoading ? (
          <Loader text="Loading members..." />
        ) : (
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-brand-yellow">
                <th className="p-4">Member</th>
                <th>Mobile</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Paid</th>
                <th>Due</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((member) => (
                <tr
                  className="border-t border-white/10"
                  key={member.id}
                >
                  <td className="flex items-center gap-3 p-4 font-bold">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                        <User size={18} />
                      </span>
                    )}

                    {member.name}
                  </td>

                  <td>{member.mobile}</td>

                  <td>
                    {member.planName || "—"}
                  </td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(
                        member.status,
                      )}`}
                    >
                      {member.status}
                    </span>
                  </td>

                  <td>
                    {money(member.paidAmount || 0)}
                  </td>

                  <td>
                    {member.balance > 0
                      ? money(member.balance)
                      : "₹0"}
                  </td>

                  <td>{member.joinDate}</td>

                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        title="View"
                        onClick={() =>
                          openView(member)
                        }
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        type="button"
                        title="Record Payment"
                        onClick={() =>
                          openPayment(member)
                        }
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        <Wallet size={16} />
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        onClick={() =>
                          openEdit(member)
                        }
                        className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        onClick={() =>
                          handleDelete(member)
                        }
                        disabled={
                          deletingId === member.id
                        }
                        className="rounded-full p-2 text-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === member.id ? (
                          <LoaderCircle
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="p-8 text-center text-white/40"
                  >
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

      {(modal === "add" ||
        modal === "edit") && (
        <Modal
          title={
            modal === "add"
              ? "Add New Member"
              : `Edit ${selected?.name || "Member"}`
          }
          onClose={closeModal}
          wide
        >
          <form
            onSubmit={
              modal === "add"
                ? submitAdd
                : submitEdit
            }
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="flex items-center gap-4 md:col-span-2">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt="Preview"
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/10">
                  <User size={24} />
                </span>
              )}

              <label
                className={`rounded-full border border-white/15 px-4 py-2 text-sm font-bold ${
                  photoLoading ||
                  savingMember
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:border-brand-orange"
                }`}
              >
                {photoLoading
                  ? "Processing photo..."
                  : "Upload Photo from Computer"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  disabled={
                    photoLoading ||
                    savingMember
                  }
                  className="hidden"
                />
              </label>
            </div>

            <input
              required
              disabled={savingMember}
              placeholder="Full Name"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <input
              required
              disabled={savingMember}
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(event) =>
                setForm({
                  ...form,
                  mobile: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <input
              type="number"
              min="1"
              disabled={savingMember}
              placeholder="Age"
              value={form.age}
              onChange={(event) =>
                setForm({
                  ...form,
                  age: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <input
              required
              type="date"
              disabled={savingMember}
              value={form.joinDate}
              onChange={(event) =>
                setForm({
                  ...form,
                  joinDate: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <select
              required
              disabled={savingMember}
              value={form.gender}
              onChange={(event) =>
                setForm({
                  ...form,
                  gender: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            >
              <option value="">
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">
                Female
              </option>
            </select>

            <input
              disabled={savingMember}
              placeholder="Address"
              value={form.address}
              onChange={(event) =>
                setForm({
                  ...form,
                  address: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60 md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-white/60">
                Trainer
              </label>

              <div className="flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="trainer"
                    value="without"
                    disabled={savingMember}
                    checked={
                      form.trainer === "without"
                    }
                    onChange={() =>
                      handleTrainerTypeChange(
                        "without",
                      )
                    }
                  />

                  <span>Without Trainer</span>
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="trainer"
                    value="with"
                    disabled={savingMember}
                    checked={
                      form.trainer === "with"
                    }
                    onChange={() =>
                      handleTrainerTypeChange(
                        "with",
                      )
                    }
                  />

                  <span>With Trainer</span>
                </label>
              </div>

              {form.trainer === "with" && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-bold text-white/60">
                    Select Trainer
                  </label>

                  <select
                    required
                    disabled={savingMember}
                    value={form.trainerId}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        trainerId:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
                  >
                    <option value="">
                      Select Trainer
                    </option>

                    {availableTrainers.map(
                      (trainer) => (
                        <option
                          key={trainer.id}
                          value={trainer.id}
                        >
                          {trainer.name}
                        </option>
                      ),
                    )}
                  </select>

                  {availableTrainers.length ===
                    0 && (
                    <p className="mt-2 text-sm text-yellow-400">
                      No trainers are currently
                      available.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-white/60">
                Membership Plan
              </label>

              <select
                required
                disabled={savingMember}
                value={form.planId}
                onChange={(event) =>
                  setForm({
                    ...form,
                    planId: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
              >
                {plans
                  .filter(
                    (plan) =>
                      plan.type ===
                      (form.trainer === "with"
                        ? "pt"
                        : "regular"),
                  )
                  .map((plan) => (
                    <option
                      key={plan.id}
                      value={plan.id}
                    >
                      {plan.name} —{" "}
                      {money(plan.price)} (
                      {plan.duration})
                    </option>
                  ))}
              </select>
            </div>

            <input
              type="number"
              min="0"
              disabled={savingMember}
              placeholder="Amount Paid"
              value={form.paidAmount}
              onChange={(event) =>
                setForm({
                  ...form,
                  paidAmount:
                    event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <select
              disabled={savingMember}
              value={form.mode}
              onChange={(event) =>
                setForm({
                  ...form,
                  mode: event.target.value,
                })
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <div className="flex justify-end gap-3 pt-2 md:col-span-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                disabled={savingMember}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={savingMember}
                disabled={
                  photoLoading ||
                  (form.trainer === "with" &&
                    availableTrainers.length ===
                      0)
                }
                loadingText={
                  modal === "add"
                    ? "Adding member..."
                    : "Updating member..."
                }
              >
                {modal === "add"
                  ? "Add Member"
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {modal === "view" && selected && (
        <Modal
          title={selected.name || "Member Details"}
          onClose={closeModal}
          wide
        >
          {viewLoading ? (
            <Loader text="Loading member details..." />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                <div className="flex flex-col items-center gap-3">
                  {selected.photo ? (
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-28 w-28 place-items-center rounded-full bg-white/10">
                      <User size={36} />
                    </span>
                  )}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(
                      selected.status,
                    )}`}
                  >
                    {selected.status}
                  </span>
                </div>

                <div className="grid gap-2 text-sm">
                  <p>
                    <span className="text-white/50">
                      Mobile:
                    </span>{" "}
                    {selected.mobile || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Age:
                    </span>{" "}
                    {selected.age || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Gender:
                    </span>{" "}
                    {selected.gender || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Address:
                    </span>{" "}
                    {selected.address || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Plan:
                    </span>{" "}
                    {selected.planName || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Joined:
                    </span>{" "}
                    {selected.joinDate || "—"}
                    &nbsp;&nbsp;
                    <span className="text-white/50">
                      Expires:
                    </span>{" "}
                    {selected.expiryDate || "—"}
                  </p>

                  <p>
                    <span className="text-white/50">
                      Total Fee:
                    </span>{" "}
                    {money(selected.totalFee || 0)}
                    &nbsp;&nbsp;
                    <span className="text-white/50">
                      Paid:
                    </span>{" "}
                    {money(
                      selected.paidAmount || 0,
                    )}
                    &nbsp;&nbsp;
                    <span className="text-white/50">
                      Due:
                    </span>{" "}
                    {money(selected.balance || 0)}
                  </p>
                </div>
              </div>

              <h4 className="mb-3 mt-6 font-black text-brand-yellow">
                Payment History
              </h4>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="bg-white/5 text-left">
                      <th className="p-3">
                        Date
                      </th>
                      <th>Amount</th>
                      <th>Mode</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!selected.payments ||
                    selected.payments.length ===
                      0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="p-4 text-center text-white/40"
                        >
                          No payment history
                          available.
                        </td>
                      </tr>
                    ) : (
                      selected.payments.map(
                        (payment) => (
                          <tr
                            key={payment.id}
                            className="border-t border-white/10"
                          >
                            <td className="p-3">
                              {payment.paymentDate}
                            </td>

                            <td>
                              {money(
                                payment.amount,
                              )}
                            </td>

                            <td>
                              {
                                payment.paymentMode
                              }
                            </td>
                          </tr>
                        ),
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Modal>
      )}

      {modal === "payment" && selected && (
        <Modal
          title={`Record Payment — ${selected.name}`}
          onClose={closeModal}
        >
          <p className="mb-4 text-sm text-white/60">
            Current due:{" "}
            <span className="font-bold text-brand-yellow">
              {money(selected.balance || 0)}
            </span>
          </p>

          <form
            onSubmit={submitPayment}
            className="grid gap-4"
          >
            <input
              required
              type="number"
              min="1"
              max={
                selected.balance > 0
                  ? selected.balance
                  : undefined
              }
              disabled={savingPayment}
              placeholder="Amount Received"
              value={payAmount}
              onChange={(event) =>
                setPayAmount(event.target.value)
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            />

            <select
              disabled={savingPayment}
              value={payMode}
              onChange={(event) =>
                setPayMode(event.target.value)
              }
              className="rounded-2xl border border-white/10 bg-black/40 p-4 disabled:opacity-60"
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeModal}
                disabled={savingPayment}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={savingPayment}
                loadingText="Saving payment..."
              >
                Save Payment
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
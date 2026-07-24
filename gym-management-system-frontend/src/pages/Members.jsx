import { useState, useMemo, useEffect } from 'react';
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import Modal from "../components/common/Modal.jsx";
import { plans } from "../data/gymData.js";
import { money } from "../utils/format.js";
import { fileToCompressedDataUrl } from "../utils/image.js";
import { getAllTrainers } from "../services/trainerService";
import { recordPayment } from "../services/paymentService";

import {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} from "../services/memberService";

import { Search, Plus, Eye, Wallet, Pencil, Trash2, User } from "lucide-react";

const emptyForm = {
  name: "",
  mobile: "",
  age: "",
  address: "",
  joinDate: new Date().toISOString().slice(0, 10), 
  planId: plans[0].id,
  paidAmount: "",
  mode: "Cash",
  photo: null,
  gender: "",
  trainer: "without",
  trainerId: "",
};

function statusColor(status) {
  if (status === "Active") return "bg-green-500/15 text-green-400";
  if (status === "Pending") return "bg-yellow-500/15 text-yellow-400";
  return "bg-red-500/15 text-red-400";
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'view' | 'payment'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [payAmount, setPayAmount] = useState("");
  const [payMode, setPayMode] = useState("Cash");
  const [busy, setBusy] = useState(false);
  const [availableTrainers, setAvailableTrainers] = useState([]);

  const refresh = async () => {
    try {
        const data = await getAllMembers();
        setMembers(data);
    } catch (error) {
        console.error(error);
    }
};

const loadTrainers = async () => {
    try {
        const response = await getAllTrainers();
        setAvailableTrainers(response.data);
    } catch (error) {
        console.error("Failed to load trainers", error);
    }
};

useEffect(() => {
    refresh();
     loadTrainers();
}, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || (m.mobile || "").includes(q),
    );
  }, [members, query]);

  const openAdd = () => {
    setForm({ ...emptyForm, planId: "quarterly" });
    setModal("add");
  };
  const openEdit = (m) => {
    setSelected(m);
    setForm({
      name: m.name,
      mobile: m.mobile,
      age: m.age,
      address: m.address,
      joinDate: m.joinDate,
      planId: m.planId,
      paidAmount: m.paidAmount,
      mode: "Cash",
      photo: m.photo,
      gender: m.gender || "",
      trainer: m.trainer || "without",
      trainerId: m.trainerId ? String(m.trainerId) : "",
    });
    setModal("edit");
  };
 const openView = async (m) => {

    try {

        const data = await getMemberById(m.id);

        setSelected(data);
        setModal("view");

    } catch(error){
        console.log(error);
        alert("Unable to load member details");
    }
};
  const openPayment = (m) => {
    setSelected(m);
    setPayAmount("");
    setPayMode("Cash");
    setModal("payment");
  };
  const closeModal = () => {
    setModal(null);
    setSelected(null);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((f) => ({ ...f, photo: dataUrl }));
    } catch {
      alert("Could not read that image, please try a different file.");
    } finally {
      setBusy(false);
    }
  };

  const submitAdd = async (e) => {
    e.preventDefault();

    try {

        const member = {
            name: form.name,
            mobile: form.mobile,
            age: Number(form.age),
            address: form.address,
            gender: form.gender,
            trainer: form.trainer,
            trainerId: form.trainer === "with"
                ? Number(form.trainerId)
                : null,
            planId: form.planId,
            joinDate: form.joinDate,
            paidAmount: Number(form.paidAmount)
        };

        const formData = new FormData();

        formData.append(
            "member",
            JSON.stringify(member)
        );

        // photo upload
        const file = document.querySelector('input[type="file"]')?.files?.[0];

        if (file) {
            formData.append("photo", file);
        }

        await addMember(formData);

        await refresh();

        closeModal();

    } catch (err) {
        console.log(err);
        alert("Unable to add member.");
    }
};

 const submitEdit = async (e) => {
    e.preventDefault();

    if (!selected) return;

    const memberData = {
        name: form.name,
        mobile: form.mobile,
        age: Number(form.age),
        address: form.address,
        gender: form.gender,
        trainer: form.trainer,
        trainerId:
    form.trainer === "with"
        ? Number(form.trainerId)
        : null,
        planId: form.planId,
        joinDate: form.joinDate,
        paidAmount: Number(form.paidAmount),
    };

    await updateMember(
        selected.id,
        memberData,
        form.photo
    );

    await refresh();

    closeModal();
};

 const submitPayment = async (e) => {
  e.preventDefault();

  if (!selected || !payAmount) return;

  try {
    await recordPayment({
      memberId: selected.id,
      amount: Number(payAmount),
      paymentMode: payMode,
      paymentDate: new Date().toISOString().split("T")[0],
    });

    await refresh();

    closeModal();

  } catch (error) {
    console.error(error);
    alert("Unable to save payment.");
  }
};

  const handleDelete = async (m) => {
    if (window.confirm(`Remove ${m.name} from the members list? This cannot be undone.`)) {
        try {
            await deleteMember(m.id);
            await refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete member.");
        }
    }
};

  return (
    <DashboardLayout type="admin">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black">Member Management</h1>
        <Button onClick={openAdd}>
          <Plus size={18} /> Add Member
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 md:max-w-sm">
        <Search size={18} className="text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or mobile number..."
          className="w-full bg-transparent outline-none placeholder:text-white/40"
        />
      </div>

      <Card className="overflow-x-auto">
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
            {filtered.map((m) => (
              <tr className="border-t border-white/10" key={m.id}>
                <td className="flex items-center gap-3 p-4 font-bold">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                      <User size={18} />
                    </span>
                  )}
                  {m.name}
                </td>
                <td>{m.mobile}</td>
                <td>{m.planName}</td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(m.status)}`}
                  >
                    {m.status}
                  </span>
                </td>
                <td>{money(m.paidAmount)}</td>
                <td>{m.balance > 0 ? money(m.balance) : "₹0"}</td>
                <td>{m.joinDate}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      title="View"
                      onClick={() => openView(m)}
                      className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Record Payment"
                      onClick={() => openPayment(m)}
                      className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                    >
                      <Wallet size={16} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => openEdit(m)}
                      className="rounded-full bg-white/10 p-2 hover:bg-white/20"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="Remove"
                      onClick={() => handleDelete(m)}
                      className="rounded-full bg-red-500/15 p-2 text-red-400 hover:bg-red-500/25"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/40">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Add New Member" : `Edit ${selected?.name}`}
          onClose={closeModal}
          wide
        >
          <form
            onSubmit={modal === "add" ? submitAdd : submitEdit}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2 flex items-center gap-4">
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
              <label className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm font-bold hover:border-brand-orange">
                {busy ? "Uploading..." : "Upload Photo from Computer"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <input
              required
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <input
              required
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <input
              type="number"
              placeholder="Age"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <input
              type="date"
              value={form.joinDate}
              onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-bold text-white/60">
                Trainer
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trainer"
                    value="without"
                    checked={form.trainer === "without"}
                    onChange={(e) => {
                      const newTrainer = e.target.value;
                      const firstPlan = plans.find(
                        (p) =>
                          p.type === (newTrainer === "with" ? "pt" : "regular"),
                      );
                      setForm({
                        ...form,
                        trainer: newTrainer,
                        trainerId: "",
                        planId: firstPlan?.id || form.planId,
                      });
                    }}
                    className="cursor-pointer"
                  />
                  <span>Without Trainer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="trainer"
                    value="with"
                    checked={form.trainer === "with"}
                    onChange={(e) => {
                      const newTrainer = e.target.value;
                      const firstPlan = plans.find(
                        (p) =>
                          p.type === (newTrainer === "with" ? "pt" : "regular"),
                      );
                      setForm({
                        ...form,
                        trainer: newTrainer,
                        trainerId:
    availableTrainers.length > 0
        ? availableTrainers[0].id
        : "",
                        planId: firstPlan?.id || form.planId,
                      });
                    }}
                    className="cursor-pointer"
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
    value={form.trainerId}
    onChange={(e) =>
        setForm({
            ...form,
            trainerId: Number(e.target.value),
        })
    }
    className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
>
    <option value="">Select Trainer</option>

    {availableTrainers.map((trainer) => (
        <option
            key={trainer.id}
            value={trainer.id}
        >
            {trainer.name}
        </option>
    ))}
</select>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-white/60">
                Membership Plan
              </label>
              <select
                value={form.planId}
                onChange={(e) => setForm({ ...form, planId: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-black/40 p-4"
              >
                {plans
                  .filter(
                    (p) =>
                      p.type === (form.trainer === "with" ? "pt" : "regular"),
                  )
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {money(p.price)} ({p.duration})
                    </option>
                  ))}
              </select>
            </div>

            <input
              type="number"
              placeholder="Amount Paid"
              value={form.paidAmount}
              onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit">
                {modal === "add" ? "Add Member" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {modal === "view" && selected && (
        <Modal title={selected.name} onClose={closeModal} wide>
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
                className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor(selected.status)}`}
              >
                {selected.status}
              </span>
            </div>
            <div className="grid gap-2 text-sm">
              <p>
                <span className="text-white/50">Mobile:</span> {selected.mobile}
              </p>
              <p>
                <span className="text-white/50">Age:</span>{" "}
                {selected.age || "—"}
              </p>
              <p>
                <span className="text-white/50">Address:</span>{" "}
                {selected.address || "—"}
              </p>
              <p>
                <span className="text-white/50">Plan:</span> {selected.planName}
              </p>
              <p>
                <span className="text-white/50">Joined:</span>{" "}
                {selected.joinDate} &nbsp;{" "}
                <span className="text-white/50">Expires:</span>{" "}
                {selected.expiryDate}
              </p>
              <p>
                <span className="text-white/50">Total Fee:</span>{" "}
                {money(selected.totalFee)} &nbsp;{" "}
                <span className="text-white/50">Paid:</span>{" "}
                {money(selected.paidAmount)} &nbsp;{" "}
                <span className="text-white/50">Due:</span>{" "}
                {money(selected.balance)}
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
                  <th className="p-3">Date</th>
                  <th>Amount</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
  {!selected.payments || selected.payments.length === 0 ? (
    <tr>
      <td
        colSpan={3}
        className="p-4 text-center text-white/40"
      >
        No payment history available.
      </td>
    </tr>
  ) : (
    selected.payments.map((p) => (
      <tr
        key={p.id}
        className="border-t border-white/10"
      >
        <td className="p-3">
          {p.paymentDate}
        </td>

        <td>
          {money(p.amount)}
        </td>

        <td>
          {p.paymentMode}
        </td>
      </tr>
    ))
  )}
</tbody>
            </table>
          </div>
        </Modal>
      )}

      {modal === "payment" && selected && (
        <Modal title={`Record Payment — ${selected.name}`} onClose={closeModal}>
          <p className="mb-4 text-sm text-white/60">
            Current due:{" "}
            <span className="font-bold text-brand-yellow">
              {money(selected.balance)}
            </span>
          </p>
          <form onSubmit={submitPayment} className="grid gap-4">
            <input
              required
              type="number"
              min="1"
              placeholder="Amount Received"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            />
            <select
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/40 p-4"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit">Save Payment</Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}

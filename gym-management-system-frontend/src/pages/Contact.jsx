import { useState } from "react";
import { useForm } from "react-hook-form";

import SectionTitle from "../components/common/SectionTitle.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";

import { addEnquiry } from "../services/enquiryService.js";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      plan: "Monthly Plan",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      await addEnquiry({
        name: data.name.trim(),
        mobile: data.phone.trim(),
        plan: data.plan,
        message: data.message.trim(),
      });

      alert("Enquiry submitted successfully!");

      reset({
        name: "",
        phone: "",
        plan: "Monthly Plan",
        message: "",
      });
    } catch (error) {
  console.error(
    "Unable to submit enquiry:",
    error.response?.data || error,
  );

  const backendMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Unable to submit enquiry.";

  alert(backendMessage);
} finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-16">
      <SectionTitle
        eyebrow="Contact"
        title="Send Gym Enquiry"
      />

      <Card className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4"
        >
          <div>
            <input
              {...register("name", {
                required: "Full name is required.",
              })}
              disabled={submitting}
              placeholder="Full Name"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("phone", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Enter a valid 10-digit phone number.",
                },
              })}
              type="tel"
              maxLength={10}
              disabled={submitting}
              placeholder="Phone Number"
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          <select
            {...register("plan", {
              required: "Please select a plan.",
            })}
            disabled={submitting}
            className="rounded-2xl border border-white/10 bg-black/40 p-4 outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="Monthly Plan">
              Monthly Plan
            </option>

            <option value="3 Month Plan">
              3 Month Plan
            </option>

            <option value="Yearly Plan">
              Yearly Plan
            </option>
          </select>

          <textarea
            {...register("message")}
            disabled={submitting}
            placeholder="Message"
            rows={5}
            className="resize-none rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-brand-orange disabled:cursor-not-allowed disabled:opacity-60"
          />

          <Button
            type="submit"
            loading={submitting}
            loadingText="Submitting enquiry..."
          >
            Submit Enquiry
          </Button>
        </form>
      </Card>
    </section>
  );
}
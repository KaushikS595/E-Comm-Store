import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Contact.jsx - Tailwind + react-hook-form + zod
const Contact = () => {
  // Validation schema (Zod)
  const schema = z.object({
    name: z.string().min(3, { message: "Name is required (min 3 chars)" }),
    email: z.string().email({ message: "Invalid email" }),
    Query: z.string().min(3, { message: "Please enter your query (min 3 chars)" }),
  });

  // react-hook-form + resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // local UI state to show success message
  const [sent, setSent] = useState(false);

  // on success: log, reset form fields, show success banner briefly
  const Submit = async (data) => {
    // If you were sending to an API, you'd await that here.
    console.log("Submitted contact data:", data);

    reset();         // clears all fields (keeps parity with your previous behavior)
    setSent(true);   // show success banner

    // hide after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-10">
      <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg border border-slate-200">
        {/* Success banner */}
        <div
          className={`mb-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
            ${sent ? "bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm" : "hidden"}`}
          role="status"
          aria-live="polite"
        >
          <span className="text-xl">✅</span>
          <div>
            <div className="font-semibold">Your query has been successfully submitted!</div>
            <div className="text-xs text-emerald-700/90">We&apos;ll reach out to you soon 😊</div>
          </div>
        </div>

        <header className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Contact Us</h2>
          <p className="mt-1 text-sm text-slate-500">
            Have a question or suggestion? Drop it below and we&apos;ll get back to you.
          </p>
        </header>

        <form onSubmit={handleSubmit(Submit)} className="grid grid-cols-1 gap-4">
          {/* Row: name + email on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className={`w-full rounded-lg border px-3 py-2 text-sm bg-white outline-none transition 
                  ${errors.name ? "border-rose-500 ring-rose-100" : "border-slate-200 focus:border-violet-600 ring-violet-50"}`}
                placeholder="Your name"
              />
              {errors.name?.message && (
                <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                className={`w-full rounded-lg border px-3 py-2 text-sm bg-white outline-none transition
                  ${errors.email ? "border-rose-500 ring-rose-100" : "border-slate-200 focus:border-violet-600 ring-violet-50"}`}
                placeholder="you@example.com"
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Query textarea */}
          <div>
            <label htmlFor="Query" className="block text-sm font-medium text-slate-700 mb-1">
              Query
            </label>
            <textarea
              id="Query"
              {...register("Query")}
              className={`w-full rounded-lg border px-3 py-2 text-sm bg-white outline-none transition min-h-[110px] resize-y
                ${errors.Query ? "border-rose-500 ring-rose-100" : "border-slate-200 focus:border-blue-900 ring-violet-50"}`}
              placeholder="Tell us what you need help with..."
            />
            {errors.Query?.message && (
              <p className="mt-1 text-xs text-rose-600">{errors.Query.message}</p>
            )}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-slate-500">We'll never share your details. 🤝</p>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white
                  ${isSubmitting ? "bg-blue-800 cursor-wait" : "bg-blue-900 hover:bg-blue-900"} shadow`}
              >
                {/* subtle spinner */}
                {isSubmitting ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />
                    <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
 


"use client";

import { useState, FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Send, AlertCircle, Mail, MapPin, Globe, Phone } from "lucide-react";
import { submitContactForm, ContactFormData } from "../utils/contactHandler";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_ADDRESS = "anna.jose.p03@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }
    if (name === "message" && value.trim().length < 10) {
      return "Message must be at least 10 characters long.";
    }
    if (name === "subject" && value.trim().length < 4) {
      return "Subject must be at least 4 characters long.";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched and validate
    const newErrors: FormErrors = {};
    const newTouched: Record<string, boolean> = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const val = formData[key as keyof ContactFormData];
      newTouched[key] = true;
      const err = validateField(key, val);
      if (err) {
        newErrors[key as keyof FormErrors] = err;
        hasErrors = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasErrors) return;

    setStatus("submitting");
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      setServerMessage(result.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } else {
      setStatus("error");
      setServerMessage(result.message);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 md:px-8 bg-slate-900/10 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-widest uppercase text-accent-cyan font-inter"
          >
            Get In Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-outfit mt-3"
          >
            Start A Conversation
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Quick Actions Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white font-outfit">
                Let&apos;s Build Premium Assets Together
              </h4>
              <p className="text-slate-400 font-inter leading-relaxed">
                Whether you want to explore direct hire opportunities, review codebases, or discuss 
                custom interactive solutions, feel free to send a message.
              </p>

              {/* Direct Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glassmorphic-card p-4 rounded-xl flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <MapPin size={18} className="text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-450 font-inter uppercase tracking-wide">Location</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-outfit">Trivandrum, Kerala, India</div>
                  </div>
                </div>

                <a
                  href="tel:+919847565356"
                  className="glassmorphic-card p-4 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors"
                >
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <Phone size={18} className="text-accent-cyan" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-450 font-inter uppercase tracking-wide">Phone</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-outfit">+91-9847565356</div>
                  </div>
                </a>

                <a
                  href="https://github.com/Annaj356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glassmorphic-card p-4 rounded-xl flex items-center gap-4 hover:border-accent-cyan transition-colors"
                >
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent-cyan"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-450 font-inter uppercase tracking-wide">GitHub</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-outfit">Annaj356</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/anna-jose-p2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glassmorphic-card p-4 rounded-xl flex items-center gap-4 hover:border-accent-indigo transition-colors"
                >
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent-indigo"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-450 font-inter uppercase tracking-wide">LinkedIn</div>
                    <div className="text-sm font-bold text-white mt-0.5 font-outfit">anna-jose-p2003</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="glassmorphic-card p-6 rounded-2xl border-accent-cyan/10 bg-slate-950/20 relative overflow-hidden mt-6">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/[0.02] to-accent-cyan/0 pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-accent-cyan" size={20} />
                <h5 className="text-sm font-bold text-white uppercase tracking-wider font-inter">Direct Contact</h5>
              </div>
              <p className="text-xs text-slate-400 font-inter mb-4">
                Click below to copy Anna&apos;s email address to copy/paste directly into your email client.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-sm font-semibold text-slate-200 select-all font-mono">
                  {EMAIL_ADDRESS}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-1.5 ${
                    copied
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-white text-slate-950 hover:bg-slate-200"
                  }`}
                  aria-label="Copy Email"
                >
                  {copied ? (
                    <>
                      <Check size={12} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-inter">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-slate-950/40 border p-3.5 rounded-xl text-white font-inter text-sm outline-none transition-all duration-200 ${
                        touched.name && errors.name
                          ? "border-rose-500/50 focus:border-rose-500"
                          : "border-white/5 focus:border-accent-violet focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                      }`}
                      placeholder="Jane Doe"
                      disabled={status === "submitting"}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5 font-inter">
                      <AlertCircle size={12} />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-inter">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-slate-950/40 border p-3.5 rounded-xl text-white font-inter text-sm outline-none transition-all duration-200 ${
                      touched.email && errors.email
                        ? "border-rose-500/50 focus:border-rose-500"
                        : "border-white/5 focus:border-accent-violet focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                    }`}
                    placeholder="jane@company.com"
                    disabled={status === "submitting"}
                  />
                  {touched.email && errors.email && (
                    <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5 font-inter">
                      <AlertCircle size={12} />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-inter">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-slate-950/40 border p-3.5 rounded-xl text-white font-inter text-sm outline-none transition-all duration-200 ${
                    touched.subject && errors.subject
                      ? "border-rose-500/50 focus:border-rose-500"
                      : "border-white/5 focus:border-accent-violet focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  }`}
                  placeholder="Inquiry regarding senior frontend role"
                  disabled={status === "submitting"}
                />
                {touched.subject && errors.subject && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5 font-inter">
                    <AlertCircle size={12} />
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-300 uppercase tracking-wider font-inter">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full bg-slate-950/40 border p-3.5 rounded-xl text-white font-inter text-sm outline-none transition-all duration-200 resize-none ${
                    touched.message && errors.message
                      ? "border-rose-500/50 focus:border-rose-500"
                      : "border-white/5 focus:border-accent-violet focus:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  }`}
                  placeholder="Hey Anna, let's schedule an interview block..."
                  disabled={status === "submitting"}
                />
                {touched.message && errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5 font-inter">
                    <AlertCircle size={12} />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button & Status Message */}
              <div className="flex flex-col gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-gradient-to-r from-accent-violet to-accent-indigo hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-outfit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Inquiry
                    </>
                  )}
                </button>

                {/* Server Response Feedback */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-inter flex items-center gap-2"
                    >
                      <Check size={16} />
                      {serverMessage}
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-sm font-inter flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      {serverMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

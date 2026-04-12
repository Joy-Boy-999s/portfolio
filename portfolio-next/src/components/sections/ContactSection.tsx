"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  ExternalLink,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const CONTACT_LINKS = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "b.neerajkumar.999@gmail.com",
    href: "mailto:b.neerajkumar.999@gmail.com",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "+91 9398907796",
    href: "tel:+919398907796",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Visakhapatnam, AP, India",
  },
  {
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "b-neeraj-kumar",
    href: "https://www.linkedin.com/in/b-neeraj-kumar/",
    external: true,
  },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const showToast = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const params = {
        sendername: data.name,
        sendermail: data.email,
        subject: data.subject,
        message: data.message,
      };

      await emailjs.send(
        "service_qscbx4g",
        "template_iw2vt3f",
        params,
        "ZTY97s9zx--zHLnYC"
      );

      showToast("success", "Done !", "Your message has been sent.");
      reset();
    } catch (err) {
      console.error(err);
      showToast("error", "Error !", "An error occured. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="Contact"
      className="py-16 sm:py-24 relative z-10 w-full min-h-screen flex flex-col items-center"
    >
      {/* Section heading */}
      <div className="flex flex-col items-center mb-10 sm:mb-16">
        <GlitchText text="Contact Me" />
        <div className="h-1 w-24 bg-emerald-500 rounded mt-4" />
        <p className="text-gray-500 text-sm sm:text-base mt-3 text-center max-w-md px-4">
          Have a project in mind or just want to say hello? Reach out!
        </p>
      </div>

      {/* Two-column layout */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 px-4">
        {/* Left column — Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {/* Intro card */}
          <GlassBox className="p-5 sm:p-6">
            <h3 className="text-white text-lg sm:text-xl font-semibold font-outfit mb-2">
              Let&apos;s work together
            </h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              I&apos;m currently open for freelance projects and full-time
              opportunities. Feel free to reach out if you have a project,
              question, or just want to connect.
            </p>
          </GlassBox>

          {/* Contact info cards */}
          {CONTACT_LINKS.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="block"
                >
                  <GlassBox className="p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-emerald-500/30 transition-colors duration-300 group cursor-pointer">
                    <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      {link.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider font-code">
                        {link.label}
                      </p>
                      <p className="text-white text-xs sm:text-sm font-inter truncate">
                        {link.value}
                      </p>
                    </div>
                    {link.external && (
                      <ExternalLink
                        size={14}
                        className="text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0"
                      />
                    )}
                  </GlassBox>
                </a>
              ) : (
                <GlassBox className="p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider font-code">
                      {link.label}
                    </p>
                    <p className="text-white text-xs sm:text-sm font-inter">
                      {link.value}
                    </p>
                  </div>
                </GlassBox>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Right column — Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <GlassBox className="p-5 sm:p-8 md:p-10 relative overflow-hidden h-full">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-r-2 border-pink-500/40 rounded-br-2xl" />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5 relative z-10"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-[10px] sm:text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[10px] sm:text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5"
                >
                  Subject
                </label>
                <input
                  {...register("subject")}
                  id="subject"
                  type="text"
                  placeholder="Project inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                {errors.subject && (
                  <p className="text-red-400 text-[10px] sm:text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-gray-400 mb-1 sm:mb-1.5"
                >
                  Your Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                />
                {errors.message && (
                  <p className="text-red-400 text-[10px] sm:text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="w-full group relative px-6 py-3 sm:py-3.5 font-bold text-white text-sm sm:text-base rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </GlassBox>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 sm:mt-32 text-center font-outfit space-y-3 px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          B.Neeraj Kumar{" "}
          <span className="text-emerald-500">{">>>"}</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
          Full Stack Developer | Building scalable web applications
        </p>
        <p className="text-gray-600 text-xs pt-2">
          &copy; {new Date().getFullYear()} B.Neeraj Kumar. All rights reserved.
        </p>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[200] flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl shadow-2xl backdrop-blur-xl border max-w-[calc(100vw-2rem)] ${
              toast.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-100"
                : "bg-red-950/80 border-red-500/30 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0" />
            )}
            <div>
              <h3 className="font-bold font-outfit text-sm sm:text-base">
                {toast.title}
              </h3>
              <p className="text-xs sm:text-sm opacity-80">{toast.message}</p>
            </div>
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-1 rounded-bl-xl ${
                toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

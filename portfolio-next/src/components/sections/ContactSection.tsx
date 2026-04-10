"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import GlitchText from "../ui/GlitchText";
import GlassBox from "../ui/GlassBox";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur"
  });

  const showToast = (type: "success" | "error", title: string, message: string) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Legacy params matching standard emailjs send
      const params = {
        sendername: data.name,
        sendermail: data.email,
        subject: data.subject,
        message: data.message,
      };

      // These are directly taken from HTML javascript.js
      await emailjs.send("service_qscbx4g", "template_iw2vt3f", params, "ZTY97s9zx--zHLnYC");
      
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
    <section id="Contact" className="py-24 relative z-10 w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center mb-16">
        <GlitchText text="Contact Me" />
        <div className="h-1 w-24 bg-[#0060af] rounded mt-4" />
      </div>

      <GlassBox className="max-w-2xl w-full p-8 md:p-12 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-emerald-500/50 rounded-tl-2xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500/50 rounded-br-2xl opacity-50" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Your Name</label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
              <input
                {...register("subject")}
                id="subject"
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Your Message</label>
              <textarea
                {...register("message")}
                id="message"
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full group relative px-6 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-[#0060af] to-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
          </button>
        </form>
      </GlassBox>

      {/* Footer / Copyright extracted to bottom of contact section as in original */}
      <div className="mt-40 text-center font-outfit space-y-4">
        <h1 className="text-3xl font-bold text-white">By JoyBoy <span className="text-sky-500">{">>>"}</span></h1>
        <h4 className="text-gray-300">Contact us To Create Your Own Site or for any enquiries.</h4>
        <h4 className="text-gray-300">Contact B.Neeraj Kumar now</h4>
        <p className="text-gray-500 pt-4">Copyright JoyBoy © 2024</p>
      </div>

      {/* Toast Notification replacing vanilla implementation */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-8 right-8 z-[200] flex items-start gap-4 p-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "success" 
                ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-100"
                : "bg-red-950/80 border-red-500/30 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400 shrink-0" />
            )}
            <div>
              <h3 className="font-bold font-outfit">{toast.title}</h3>
              <p className="text-sm opacity-80">{toast.message}</p>
            </div>
            {/* Progress bar simulation */}
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

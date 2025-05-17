import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const API_KEY = process.env.NEXT_PUBLIC_FORMSPREE_API_KEY;

export default function Contact() {
  const [state, handleSubmit] = useForm(API_KEY); // Replace with your Formspree form ID
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Custom submit handler that works with Formspree
  const onSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for Formspree
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("subject", formData.subject);
    formDataObj.append("category", formData.category);
    formDataObj.append("message", formData.message);

    // Submit form using Formspree
    await handleSubmit(e);

    // Reset form if successful
    if (state.succeeded) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
    }
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email anytime",
      value: "nakamotosherlock@gmail.com",
      action: "nakamotosherlock@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "💬",
      title: "Discord",
      description: "Join our community",
      value: "https://discord.gg/X6ptBdQJ",
      action: "https://discord.gg/X6ptBdQJ",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "🐦",
      title: "Twitter",
      description: "Follow us for updates",
      value: "@SolGPT_Pro",
      action: "https://x.com/SolGPT_Pro",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: "📍",
      title: "Location",
      description: "Our global presence",
      value: "Worldwide (on-chain)",
      action: null,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const faqItems = [
    {
      category: "General",
      questions: [
        {
          q: "What is SolGPT Pro?",
          a: "Solana Swap Pro is a professional-grade AI DeFi platform for exploring and swapping tokens, exploring wallets, and transferring assets on the Solana blockchain.",
        },
        {
          q: "Is it safe to use?",
          a: "Yes, we use industry-leading security practices including non-custodial architecture, audited smart contracts, and encrypted connections.",
        },
      ],
    },
    {
      category: "Fees",
      questions: [
        {
          q: "What are the fees?",
          a: "We charge a 0.01% platform fee on swaps, plus Solana network fees which are typically less than $0.001 per transaction.",
        },
        {
          q: "Are there hidden fees?",
          a: "No, all fees are transparent and displayed before you confirm any transaction.",
        },
      ],
    },
    {
      category: "Support",
      questions: [
        {
          q: "How fast is support response?",
          a: "We typically respond within 2-4 hours during business hours, and within 24 hours on weekends.",
        },
        {
          q: "Do you offer phone support?",
          a: "Currently, we provide support through email, Discord, and our contact form for the best user experience.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <Head>
        <title>Contact Us - SolGPT Pro</title>
        <meta
          name="description"
          content="Get in touch with SolGPT Pro team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-20 w-full p-3 md:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">
                  <img src="/logo.png" alt="Logo" />
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white whitespace-nowrap">
                SolGPT Pro
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            <Link href="/">
              <button className="bg-black/60 backdrop-blur-md border border-purple-500/20 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base hover:bg-purple-500/20">
                Home
              </button>
            </Link>
            <Link href="/swap">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-20 pb-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Have questions, suggestions, or need support? We're here to help.
            Choose your preferred way to reach out.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {method.description}
                </p>
                {method.action ? (
                  <a
                    href={method.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    {method.value} →
                  </a>
                ) : (
                  <p className="text-purple-400">{method.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl overflow-hidden"
          >
            <div className="p-6 md:p-8 border-b border-purple-500/20">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-400">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="business">Business Partnership</option>
                  <option value="security">Security Issue</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-black/40 border border-purple-500/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-500 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* state Messages */}
              {state.success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400 text-sm">
                  Thank you! Your message has been sent successfully. We'll get
                  back to you soon.
                </div>
              )}

              {state.error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
                  {state.error}
                </div>
              )}

              <button
                type="submit"
                disabled={state.loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {state.loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked{" "}
              <span className="text-purple-400">Questions</span>
            </h2>
            <p className="text-xl text-gray-300">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faqItems.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-purple-400 mb-4">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-purple-500/10 pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="text-white font-medium mb-2">{item.q}</h4>
                      <p className="text-gray-400 text-sm">{item.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-gray-400">
              © 2025 Solana Swap Pro. All rights reserved.
            </span>
          </div>
          <div className="flex justify-center gap-6">
            <Link
              href="/landing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

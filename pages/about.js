import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const teamMembers = [
    {
      name: "Sherlock.N",
      role: "CEO & Co-founder",
      bio: "AI in blockchain development",
      image: "/team/alex.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Neon Monkey",
      role: "CTO & Co-founder",
      bio: "Senior Developer",
      image: "/team/sarah.jpg",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Jim",
      role: "Head of Product",
      bio: "Active Trader and community leader, specialized in user experience for DeFi",
      image: "/team/marcus.jpg",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const milestones = [
    {
      year: "2025",
      month: "APRIL",
      title: "Founded",
      description: "SolGPT founded",
    },
    {
      year: "2025",
      month: "MAY",
      title: "MVP Launch",
      description: "Token swap , Wallet Explorer live",
    },
    {
      year: "2025",
      month: "MAY",
      title: "SolGPT Token launch",
      description: "Token launch live",
    },
    {
      year: "2025",
      month: "JUNE",
      title: "AI NLP",
      description: "Talk to Solana bockchain in natural language",
    },
    {
      year: "2025",
      month: "JUNE",
      title: "Advanced Wallet & Token analytics",
      description: "Complex analysis between Tokens & Wallets",
    },
    {
      year: "2025",
      month: "JULY",
      title: "Wallet Tracking & Copy Trading",
      description: "Advanced wallet tracking and Copy Trading using SOTA gRPC",
    },
    {
      year: "2025",
      month: "AUGUST",
      title: "10K Users",
      description: "Reached 10,000+ active daily users",
    },
  ];

  const values = [
    {
      icon: "🚀",
      title: "Innovation First",
      description:
        "We push the boundaries of what's possible in DeFi, constantly innovating to provide cutting-edge solutions.",
    },
    {
      icon: "🔐",
      title: "Security Always",
      description:
        "Your assets are our priority. We employ the highest security standards and never compromise on safety.",
    },
    {
      icon: "⚡",
      title: "Speed & Efficiency",
      description:
        "Built on Solana for lightning-fast transactions with minimal fees, delivering the best user experience.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description:
        "We listen to our users and build features based on community feedback and needs.",
    },
    {
      icon: "🌍",
      title: "Inclusive Finance",
      description:
        "Making DeFi accessible to everyone, regardless of technical expertise or location.",
    },
    {
      icon: "📈",
      title: "Transparent Growth",
      description:
        "All our metrics are public, and we believe in complete transparency with our community.",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
                SolGPT
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
            Built for the Future of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              DeFi
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            We're a team of blockchain veterans, security experts, and design
            innovators on a mission to make DeFi accessible, secure, and
            lightning-fast for everyone.
          </motion.p>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="bg-black/60 backdrop-blur-md rounded-xl border border-purple-500/20 p-2 inline-flex gap-2 mb-12 w-full md:w-auto">
            {[
              { id: "mission", label: "Our Mission", icon: "🎯" },
              { id: "team", label: "Our Team", icon: "👥" },
              { id: "journey", label: "Our Journey", icon: "🛤️" },
              { id: "values", label: "Our Values", icon: "💫" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-purple-500/10"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mission Tab */}
            {activeTab === "mission" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Our Mission
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    To democratize access to decentralized finance by building
                    intuitive, secure, and lightning-fast tools that empower
                    everyone to participate in the crypto economy.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🌟</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">
                          Making DeFi Simple
                        </h3>
                        <p className="text-gray-400">
                          Complex blockchain interactions shouldn't feel
                          complex. We abstract away the technical complexity
                          while maintaining full transparency.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">
                          Powered by Solana
                        </h3>
                        <p className="text-gray-400">
                          Built on the fastest blockchain, we deliver sub-second
                          transactions with minimal fees, making DeFi truly
                          accessible.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">🛡️</div>
                      <div>
                        <h3 className="text-white font-semibold mb-2">
                          Security First
                        </h3>
                        <p className="text-gray-400">
                          Your assets are always under your control. We never
                          store private keys and all our contracts are audited
                          by leading security firms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30">
                    <div className="flex items-center justify-center mb-8">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl animate-pulse">
                        🚀
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        Innovation at Scale
                      </h3>
                      <p className="text-gray-300">
                        Serving over 12,500 active users with $15.4M in daily
                        trading volume.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === "team" && (
              <div>
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                  Meet Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 text-center group hover:border-purple-500/40 transition-all duration-300"
                    >
                      <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl text-white font-bold group-hover:scale-110 transition-transform duration-300">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-purple-400 mb-3">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                      <div className="flex justify-center gap-4">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Journey Tab */}
            {activeTab === "journey" && (
              <div>
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                  Our Journey
                </h2>
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className={`flex items-center ${
                          index % 2 === 0 ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`w-1/2 ${
                            index % 2 === 0
                              ? "pr-8 text-right"
                              : "pl-8 text-left"
                          }`}
                        >
                          <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-lg p-6">
                            <div className="text-purple-400 text-sm mb-1">
                              {milestone.year} {milestone.month}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-400">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-black"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Values Tab */}
            {activeTab === "values" && (
              <div>
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                  Our Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300"
                    >
                      <div className="text-4xl mb-4 text-center">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 text-center">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-center">
                        {value.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Be part of the DeFi revolution. Start swapping, exploring, and
              transferring on Solana today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                  Launch App
                </button>
              </Link>
              <Link href="/landing#features">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/30 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 hover:bg-purple-500/20 text-lg">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-gray-400">
              © 2025 SolGPT. All rights reserved.
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
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

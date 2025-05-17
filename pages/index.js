import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ParticleBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    volume: "0",
    totalSwaps: "1",
    users: "1",
    liquidity: "0",
  });

  // Floating animation variants
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />

      {/* Navbar */}
      <nav className="relative z-20 w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full  flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">
                <img src="/logo.png" alt="" srcset="" />
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              SolGPT
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#stats"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Stats
            </Link>
            <Link
              href="#security"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Security
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Desktop Launch Button */}
          <div className="hidden md:block">
            <Link href="/swap">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Launch App
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/90 backdrop-blur-md rounded-lg border border-purple-500/20 p-4">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#stats"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Stats
              </Link>
              <Link
                href="#security"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Security
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link href="/" className="pt-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300">
                  Launch App
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-20 pb-40 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            The Future of{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              DeFi Trading
            </span>{" "}
            on Solana
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Experience lightning-fast swaps, explore any wallet or token with AI,
            and transfer assets with industry-leading security. All in one
            professional-grade platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/swap">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                Start Trading Now
              </button>
            </Link>
            <Link href="/explorer">
              <button className="bg-black/60 backdrop-blur-md border border-purple-500/30 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:bg-purple-500/20 text-lg">
                Explore Wallets
              </button>
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { label: "24h Volume", value: `$${stats.volume}` },
              { label: "Total Swaps", value: stats.totalSwaps },
              { label: "Active Users", value: `${stats.users}+` },
              { label: "Total Liquidity", value: `$${stats.liquidity}` },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for{" "}
              <span className="text-purple-400">Pro Traders</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to trade, explore, and manage your digital
              assets on Solana, all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: "⚡",
                title: "Lightning Swaps",
                description:
                  "Instant token swaps powered by Jupiter aggregator with best-in-class pricing",
                link: "/",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "🔍",
                title: "Wallet Explorer",
                description:
                  "Deep dive into any Solana wallet - transactions, tokens, NFTs, and more",
                link: "/explorer",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: "📤",
                title: "Secure Transfers",
                description:
                  "Send SOL and SPL tokens with military-grade security and gas optimization",
                link: "/transfer",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "💰",
                title: "Real-time Balances",
                description:
                  "Track all your holdings in one place with live price updates",
                link: "/",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: "🔐",
                title: "Multi-Wallet Support",
                description:
                  "Connect with Phantom, Solflare, and other popular Solana wallets",
                link: "/",
                color: "from-red-500 to-rose-500",
              },
              {
                icon: "🤖",
                title: "AI-Assisted Analysis",
                description:
                  "Interact with Solana blockchain to get real-time market data and insights",
                link: "/explorer",
                color: "from-indigo-500 to-violet-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <Link href={feature.link}>
                  <div className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 cursor-pointer transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-black/80">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="stats"
        className="relative z-10 py-32 px-4 bg-gradient-to-br from-black/90 to-purple-900/20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by <span className="text-blue-400">Traders & Analysts</span> Daily
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: "$24/7", label: "AI Agent Online", icon: "📈" },
              { metric: "<10ms", label: "Lightning-fast swaps", icon: "⚡" },
              { metric: "1", label: "MCP server", icon: "🌐" },
              { metric: "0.01%", label: "Platform Fee", icon: "💎" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.metric}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Security is Our{" "}
                <span className="text-purple-400">Priority</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Built with industry-leading security practices to protect your
                assets. We never store your private keys.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "🔐",
                    title: "Non-Custodial",
                    desc: "You control your keys, always",
                  },
                  {
                    icon: "🛡️",
                    title: "Audited Smart Contracts",
                    desc: "Third-party verified security",
                  },
                  {
                    icon: "🔒",
                    title: "Encrypted Connections",
                    desc: "End-to-end encryption",
                  },
                  {
                    icon: "✨",
                    title: "Real-time Monitoring",
                    desc: "24/7 security surveillance",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-white font-semibold">
                        {item.title}
                      </div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl">
                    🛡️
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Security First
                  </h3>
                  <p className="text-gray-300">
                    Built on Solana's secure blockchain with additional layers
                    of protection for your peace of mind.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of traders who chose SolGPT Pro for their DeFi
              needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                  Launch App Now
                </button>
              </Link>
              <Link href="/explorer">
                <button className="bg-black/60 backdrop-blur-md border border-purple-500/30 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 hover:bg-purple-500/20 text-lg">
                  Explore Demo
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Token Swap
                  </Link>
                </li>
                <li>
                  <Link
                    href="/explorer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Wallet Explorer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/transfer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Token Transfer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
              
                <li>
                  <Link
                    href="https://x.com/SolGPT_Pro"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://discord.gg/X6ptBdQJ"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Discord
                  </Link>
                </li>
    
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-gray-400">
                © 2025 SolGPT Pro. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6">
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
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Add Framer Motion to package.json
/*
"framer-motion": "^10.16.12"
*/

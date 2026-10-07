<div align="center">

# 🚀 ShipFolio

### **Turn Raw Code & Projects Into Credible Social Proof**

*A visibility-first platform that transforms developer project context, updates, and screenshots into platform-native content for LinkedIn, X (Twitter), Reddit, and Medium — driven by Gemini 3.1 Flash-Lite, Groq, and ASD-STE100 quality rules.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Neon Database](https://img.shields.io/badge/Database-Neon_PostgreSQL-00E599?style=flat-square&logo=postgresql)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

</div>

---

## 🌟 Key Features

- 📌 **Persistent Project Campaigns:** Maintain continuous context for your projects. Add updates week after week without starting from scratch.
- 💬 **Conversational Clarifying Q&A:** When context is thin, AI asks 2–3 short multiple-choice questions in a Claude/ChatGPT-style bubble interface to sharpen output.
- 📐 **ASD-STE100 Quality Standard:** System prompts enforce Simplified Technical English rules — active voice, concise sentences (≤20 words), direct language, and zero corporate filler ("I'm excited to announce...").
- 🎯 **Multi-Platform Native Content:** Generates tailored posts for **LinkedIn**, **X (Twitter)**, **Reddit**, and **Medium** in a single API call.
- 💡 **Actionable Visibility Tips:** Post-generation recommendations advising exact screenshots, screen recordings, or subreddits that maximize engagement.
- ⚡ **Dual-LLM Cascade + BYOK:** Primary **Gemini 3.1 Flash-Lite** (multimodal) $\rightarrow$ Fallback **Groq** (`GPT-OSS-20B` / `Qwen 3.8 27B`) $\rightarrow$ Bring Your Own Key (BYOK) modal on rate limits.
- 👤 **Seamless Guest Accounts:** Auto-creates guest sessions on first click — no sign-up wall. Convert to permanent account anytime via OAuth without losing data.
- 🍎 **Apple Design Aesthetics:** Translucent glassmorphism (`apple-glass`), fluid active press animations, optical typography tracking, and a desktop-first, mobile-adaptive layout.

---

## 🛠️ Tech Stack & $0/Month Infrastructure

```mermaid
flowchart LR
    A["GitHub\n(Repository)"] -->|Deploy| B["Vercel Hobby\n(Next.js App Router)"]
    B -->|Drizzle ORM| C["Neon Serverless DB\n(PostgreSQL)"]
    B -->|Primary LLM| D["Google AI Studio\n(Gemini 3.1 Flash-Lite)"]
    B -->|Fallback LLM| E["Groq Cloud\n(GPT-OSS-20B / Qwen 27B)"]
    B -->|Media Assets| F["Cloudinary\n(Image Transformations)"]
```

| Layer | Choice | Free Tier |
|---|---|---|
| **Framework** | Next.js 15 (App Router) + React 19 | Vercel Hobby |
| **Styling & UI** | Tailwind CSS v4 + Lucide Icons + Motion | Open Source |
| **Database** | Neon Serverless PostgreSQL | 0.5 GB Storage |
| **ORM** | Drizzle ORM + Drizzle Kit | Open Source |
| **Primary LLM** | Gemini 3.1 Flash-Lite (Multimodal) | ~1,500 req/day |
| **Fallback LLM** | Groq (`openai/gpt-oss-20b` & `qwen/qwen3.8-27b`) | ~1,000 req/day |
| **Media Storage** | Cloudinary Free Tier | 25 GB Storage |
| **Authentication** | NextAuth.js v5 (Auth.js) | Self-Hosted |

---

## 🚀 Quick Start Guide

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/shipfolio.git
cd shipfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Copy `.env.example` to `.env.local` and add your free tier keys:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@ep-cool-name-123456.aws.neon.tech/neondb?sslmode=require"
AUTH_SECRET="your-random-32-character-auth-secret"
NEXTAUTH_URL="http://localhost:3000"

GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
```

### 4. Push database schema
```bash
npx drizzle-kit push
```

### 5. Run local development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run unit & component tests with Vitest:
```bash
npm run test
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

# uChat V1.0 - AI Agent Instructions

These are persistent instructions for any AI Coder (Agent) working on this repository.

## 🎯 Architectural Philosophy

- **Local-First & Edge-Compute**: uChat relies on local processing. Do NOT integrate third-party cloud APIs (like OpenAI, Google Cloud Vision, or AWS Transcribe) for core user functionalities unless explicitly instructed for a specific backend relay feature.
- **Mocking Local AI**: For prototyping, mock the outputs of local LLMs/SLMs (e.g., MobileLLM, Whisper.cpp). Emphasize privacy in the UI (e.g., use labels like "Local NPU Transcription").
- **Zero-Knowledge Privacy**: Assume the backend is a blind router. UI designs should reflect end-to-end encryption, cryptographic verifications (DKIM/SPF pills), and local storage indicators.

## 🎨 UI & Styling Guidelines

1. **Frameworks**: Use React, TypeScript, Tailwind CSS, and `motion/react` (Framer Motion).
2. **Icons**: Exclusively use `lucide-react`.
3. **Animations**: 
   - All modals, drawers, and popovers MUST use `AnimatePresence` with `motion.div`.
   - Standardize entry animations (e.g., `initial={{ opacity: 0, scale: 0.95 }}`, `animate={{ opacity: 1, scale: 1 }}`).
4. **Dark Mode Strictness**: Every single UI component MUST support Dark Mode using Tailwind's `dark:` variant. Our dark mode palette relies heavily on zinc (`dark:bg-[#121214]`, `dark:bg-[#1a1a1c]`, `dark:bg-zinc-900`).
5. **Glassmorphism**: Use backdrop filters (`backdrop-blur-md`, `bg-white/80`, `dark:bg-black/60`) for floating elements, popovers, and sticky headers.
6. **No "AI Slop"**: Avoid generic purple-to-blue gradients unless specifically asked. Use refined, mathematical spacing and high-contrast sophisticated neutrals.

## 📱 Platform Specifics

- The frontend code in `src/` must be responsive and fluid. 
- It serves dual purposes: 
  1. A **Progressive Web App (PWA)** for desktop/web users.
  2. The foundation for a **Dedicated Mobile APK** (using Capacitor/Tauri or wrapped WebViews in the future).
- Touch targets must be appropriately sized (min 44px for critical actions) to accommodate the mobile APK environment.

## 📁 File Structure Rules

- `src/App.tsx`: The primary orchestrator. Keep it clean; extract complex logic into separate components in `packages/web-app/src/components/`.
- `packages/web-app/src/types/ui.ts`: Always define new data structures (like payloads for new message types) here before using them in components.

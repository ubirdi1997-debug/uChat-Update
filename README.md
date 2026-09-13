# uChat V1.0 🛡️

**uChat** is an ultra-lightweight, local-first unified messaging client that bridges external messaging protocols (WhatsApp, Signal, Telegram, Gmail) into a single cryptographic environment. The architecture shifts state storage, indexing, and AI inference directly to edge devices, allowing the central backend to function strictly as a stateless router.

## 📱 Platform Targets

- **Dedicated Mobile APK**: A dedicated Android application (APK) will be built for native performance, direct hardware access (for TEE/Secure Enclave), and deeper OS integration.
- **Progressive Web App (PWA)**: Full PWA support is built-in for universal access across any operating system (Windows, macOS, iOS, Linux) via the web browser, featuring offline capabilities and service worker caching.

---

## 🏗️ Project Structure & Architecture (For AI Coders & Contributors)

The application is built using **React, TypeScript, Tailwind CSS**, and **Motion (Framer Motion)**. 

### Directory Layout

```text
/
├── src/
│   ├── App.tsx                  # Main application shell, sidebar routing, mock state, and modal orchestrator
│   ├── main.tsx                 # React DOM entry point
│   └── index.css                # Global Tailwind CSS imports and custom variables
│
├── packages/web-app/src/
│   ├── components/
│   │   ├── chat/                # Core Messaging UI Components
│   │   │   ├── ChatComposer.tsx # The main input bar (routing, text, voice, stickers, Aura AI prompt)
│   │   │   ├── MessageBubble.tsx# Message rendering, QR payload overlays, audio waveforms, side-thread forking
│   │   │   ├── SettingsModal.tsx# The main identity (uAuth) and configuration dashboard
│   │   │   ├── StickerStudio.tsx# UI for generating custom open-source 3D stickers
│   │   │   └── QRActionPill.tsx # Floating interactive actions for detected barcodes/UPI intents
│   │   │
│   │   └── cards/               # Interactive 3D/Specialty Components
│   │       └── Gmail3DCard.tsx  # 3D flippable card for Gmail threads with cryptographic verification
│   │
│   └── types/
│       └── ui.ts                # TypeScript interfaces (ConversationItem, ChatMessage, Payloads)
```

### 🧠 Dynamic Components & Core Mechanics

If you are an AI Coder working on this project, adhere to these dynamic mechanics:

1. **State Management**: State is largely maintained in `App.tsx` (for the prototype). Modals and side-panels (like Side Threads) use `AnimatePresence` from `motion/react` for smooth enter/exit transitions.
2. **Theming & Contextual Styles**: 
   - The app heavily utilizes Tailwind's `dark:` classes for a seamless Dark Mode.
   - External bridges tint the UI contextually (e.g., WhatsApp = Emerald, Signal = Blue, Telegram = Sky). Use `SourcePlatform` types from `types/ui.ts` to determine styling logic.
3. **Edge Compute Simulation**: All AI features (Semantic Search, Transcription, LLM Summaries) are structurally designed as if they run locally (WASM/WebGPU). Do NOT integrate external cloud AI APIs (like OpenAI) for user-facing messaging tasks. Instead, build UIs that reflect *local* processing (e.g., adding "Local NPU Transcription" badges).
4. **Zero-Latency Interactions**: Components like `QRActionPill.tsx` are designed to overlay instantly on media. Assume data is pre-parsed by background workers.

## ✨ Core Feature Specification

- **Post-Quantum Cryptography & MLS**: Defends against quantum attacks using ML-KEM-768 and RFC 9420 Messaging Layer Security for groups.
- **Gmail 3D Interactive Stream**: Flips standard emails into chat bubbles with interactive OTP extraction.
- **Blind Cryptographic Relay**: The backend retains zero data; messages are dropped from the SQLite WAL instantly upon delivery.
- **Collaborative Edge-Compute Mesh**: Idle devices donate NPU compute for AI tasks via encrypted WebRTC.
- **Duress SOS & Decoy Mode**: Entering a secondary PIN masks SQLite partitions and generates plausible synthetic AI conversations.
- **Side Threads & Contextual Forking**: Branch messages into Slack-style side drawers without polluting the main timeline.
- **NeuroShield Deepfake Sentinel**: Scans incoming audio/video for synthetic artifacts directly on the edge.

## 🚀 Setup & Development

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm run dev`
3. **Build for Production**: `npm run build`

*For full UI modifications, rely on Tailwind CSS utility classes and avoid writing custom CSS unless absolutely necessary for complex animations.*

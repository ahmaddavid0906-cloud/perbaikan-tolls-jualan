# Tollssatset AI - All-in-One Creator AI Workspace & Admin Suite

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API-orange.svg)](https://ai.google.dev/)

**Tollssatset AI Workspace** adalah platform komprehensif bertenaga kecerdasan buatan (AI) yang dirancang khusus untuk konten kreator, affiliate marketer, dan tim agensi digital. Aplikasi ini memadukan kemampuan analitik visual video, reverse engineering prompt AI video, riset perilaku pencarian audiens Indonesia (Answer Engine Optimization / AEO), serta sistem manajemen operasional lengkap dengan dashboard admin real-time dan gateway LLM multi-tier.

---

## 🌟 Fitur Utama (Key Features)

### 1. 🎬 Replika Video Viral & Generator Ide Konten (AEO Grounded)
Pipeline multi-stage pintar untuk membedah video viral dan merekayasanya menjadi ide konten baru yang siap produksi:
- **Stage 1 (Visual Grounding)**: Mengekstrak fakta visual secara objektif dari video (objek, pakaian, gestur fisik, setting lokasi, dan transkrip audio).
- **Stage 1.5 (Identity Anchor)**: Mengekstraksi ciri fisik subjek/produk utama dari gambar referensi untuk mencegah inkonsistensi identitas antar adegan video AI.
- **Stage 1.8 (Dewan 10 Persona Query Indonesia)**: Simulasi 10 persona pencarian orang Indonesia (pemburu harga, problem-first, review jujur, casual gaul, niche spesifik, dsb.) guna menargetkan algoritma search TikTok & mesin pencari modern.
- **Stage 2 (Ide Konten Final)**: Menghasilkan naskah lengkap dengan Hook 0-3 detik (BLUFF), aksi visual grounded, serta *voice-over* natural bebas klise generik AI (*anti-AI-slop*).
- **Stage Validasi / Self-Critic**: Mekanisme verifikasi otomatis untuk memastikan tidak ada halusinasi klaim yang bertentangan dengan visual asli.

### 2. 📹 Video to Prompt (Reverse Engineering Video AI)
- Menganalisis video referensi (mode **Fast** maupun **Deep**) untuk didekonstruksi menjadi rangkaian prompt multi-adegan (*clip-by-clip*).
- Kompatibel dengan berbagai generator video AI terkemuka: Kling, Runway (Gen-2/Gen-3), Luma Dream Machine, Pika, Hailuo Minimax, dan Sora.

### 3. 📸 Photo Prompt Generator
- Menghasilkan prompt foto ultra-detail untuk Midjourney, Flux.1, Stable Diffusion, dan DALL-E.
- Dilengkapi pengaturan rasio aspek (1:1, 9:16, 16:9, dll.), pemilihan gaya artistik sinematik, lighting, kamera lensa, dan negative prompt.

### 4. 🛍️ TikTok Shop to Ideas
- Asisten strategi afiliasi e-commerce untuk menganalisis produk TikTok Shop dan menghasilkan ide video promosi dengan sudut pandang konversi tinggi.

### 5. ⬇️ TikTok Video & Audio Downloader
- Pengunduh video TikTok kualitas HD tanpa watermark serta ekstraksi audio MP3 langsung via URL.

### 6. 🎞️ In-Browser Video Frame Extractor
- Pengambilan frame video langsung di browser sisi klien dengan fitur pemilihan frame rate dan ekspor paket ZIP berkecepatan tinggi.

### 7. 🛡️ Multi-Tier LLM Gateway & Anti-Limit Resilience
- **Tier 1 (Flagship)**: Untuk penalaran mendalam dan pembuatan ide konten final.
- **Tier 2**: Untuk ekstraksi visual, dewan query, prompt foto standar, dan transkripsi.
- **Tier 3**: Untuk utilitas ringan, validasi perbaikan, dan parsing format.
- Dilengkapi **Key Rotation** otomatis, **Cooldown Manager**, dan **Fast Failover** saat kuota model/key mendekati batas (*HTTP 429/503*).

### 8. 📊 Admin Suite & Live Telemetry
- Dashboard analitik real-time menggunakan Server-Sent Events (SSE).
- Pemantauan status sistem, konsumsi token, rotasi API key, log error, dan grafik aktivitas.
- Manajemen kode akses pengguna, sistem paket langganan, dan verifikasi pembayaran QRIS.

---

## 🛠️ Teknologi & Arsitektur (Tech Stack)

| Bagian | Teknologi |
| --- | --- |
| **Frontend** | React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion (Framer Motion), Lucide React, Recharts |
| **Backend** | Node.js, Express 4, TypeScript (`tsx` untuk dev, `esbuild` untuk bundle production) |
| **AI Integration** | `@google/genai` (Gemini 3.7 Flash, 3.6 Flash, 3.5 Flash, 3.1 Pro, dll.) |
| **Realtime Sync** | Server-Sent Events (SSE), Local JSON State Store, Cross-Tab Sync |
| **Database Opsional**| Firebase / Firestore & PostgreSQL (Drizzle ORM) |

---

## 📋 Prasyarat (Prerequisites)

Sebelum memulai, pastikan perangkat Anda memiliki:
- **Node.js**: Versi `>= 18.0.0` (Disarankan Node.js 20 LTS atau lebih baru)
- **npm** (atau `pnpm` / `bun`)
- **Google Gemini API Key**: Dapatkan dari [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### 1. Clone Repository
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```

Buka file `.env` dan lengkapi variabel berikut:
```env
# API Key utama Google Gemini
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere..."

# URL hosting aplikasi (untuk lokal gunakan http://localhost:3000)
APP_URL="http://localhost:3000"
```

### 4. Jalankan Server Pengembangan (Development)
```bash
npm run dev
```
Aplikasi akan aktif dan dapat diakses di browser melalui:  
👉 **`http://localhost:3000`**

---

## 📦 Build untuk Produksi (Production Build)

Aplikasi menggunakan arsitektur full-stack terintegrasi (Express backend yang melayani static bundle frontend Vite):

```bash
# 1. Kompilasi frontend static dan backend bundle CJS
npm run build

# 2. Menjalankan server dalam mode produksi
npm start
```

Perintah build akan menghasilkan:
- `dist/`: Berisi aset frontend yang telah di-minifikasi oleh Vite.
- `dist/server.cjs`: Bundle server backend mandiri yang dikompilasi oleh `esbuild`.

---

## 📂 Struktur Direktori Proyek

```plaintext
├── .env.example              # Template environment variables
├── .gitignore                # Berkas & direktori yang diabaikan git
├── index.html                # Entry point HTML frontend
├── package.json              # Konfigurasi dependensi dan scripts npm
├── server.ts                 # Entry point Express backend, API routes, & LLM Gateway
├── tsconfig.json             # Konfigurasi TypeScript
├── vite.config.ts            # Konfigurasi Vite & Tailwind CSS plugin
├── src/
│   ├── main.tsx              # Entry point React
│   ├── App.tsx               # Root component & state pengatur view
│   ├── components/
│   │   ├── admin/            # Komponen dashboard telemetri admin (Charts, Tables, Health)
│   │   ├── layouts/          # Layout navigasi user & workspace
│   │   ├── modals/           # Modal dialog (History, Anti-Limit, QRIS)
│   │   ├── tools/            # Komponen fitur utama (ContentIdeas, VideoToPrompt, PhotoPrompt, dll.)
│   │   └── views/            # Halaman tampilan (Login, AdminDashboard, PaketAkses)
│   ├── hooks/                # Custom React hooks (useAuth, dll.)
│   ├── lib/                  # Logika utilitas (LLM client, history, antiLimit, SSE sync)
│   ├── types/                # Definisi tipe TypeScript
│   └── utils/                # Helper pemformat waktu, kode akses, dan sanitasi data
```

---

## 🔐 Petunjuk Push ke GitHub

Pastikan Anda tidak secara tidak sengaja mengunggah kunci rahasia ke repository publik:

1. Periksa berkas `.env` telah masuk dalam `.gitignore`.
2. Pastikan file database lokal sementara atau file token tidak mengandung kredensial pribadi.
3. Jalankan perintah git:

```bash
# Inisialisasi git jika belum
git init

# Tambahkan semua berkas yang relevan
git add .

# Buat commit pertama
git commit -m "feat: initial commit Tollssatset AI Creator Workspace"

# Ganti branch ke main
git branch -M main

# Hubungkan dengan remote repository di GitHub
git remote add origin https://github.com/<username>/<repo-name>.git

# Push ke GitHub
git push -u origin main
```

---

## 📜 Lisensi & Kontribusi

Proyek ini dibuat untuk keperluan personal & komersial tim kreator konten. Kontribusi, perbaikan bug, dan saran fitur sangat dipersilakan melalui *Pull Request* atau *Issue* di GitHub.

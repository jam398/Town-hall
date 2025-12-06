# HELP: EverydayAI CLI Tools (references/eai)

This document summarizes the core capabilities and commands provided by the
EverydayAI CLI located in `references/eai`.

The main executable is the `eai` command (via `python -m ei_cli` or the
installed `eai` entrypoint). Tools are implemented as **plugins** under
`src/ei_cli/plugins` and services under `src/ei_cli/services`.

---

## 1. Command Overview

All commands follow this pattern:

```bash
eai <tool> [ARGS] [OPTIONS]
```

### Core Commands

- `eai image` – Generate images from text prompts using OpenAI `gpt-image-1`.
- `eai vision` – Analyze a single image using GPT-5 Vision.
- `eai multi_vision` – Analyze 2–3 images together (comparison / joint analysis).
- `eai speak` – Text-to-speech using OpenAI TTS voices.
- `eai transcribe` – Speech-to-text using Whisper (audio files).
- `eai transcribe_video` – Download + transcribe online videos (e.g., YouTube).
- `eai translate_audio` – Translate speech from any language **to English**.
- `eai search` – Web search with AI-generated, citation-backed answers.
- `eai elevenlabs` – High‑quality text-to-speech via ElevenLabs API.
- `eai youtube` – Manage YouTube authentication and tokens.

Configuration and error handling are managed by:

- `ei_cli.config.*` – Loading `.env` / `config.yaml` and environment variables.
- `ei_cli.services.*` – Service layer for OpenAI, ElevenLabs, downloaders, etc.
- `ei_cli.core.*` – Caching, error types, rate limiting, progress display.
- `ei_cli.workflow.*` – Higher-level interactive / parallel workflows.

---

## 2. Image Generation – `eai image`

**File:** `src/ei_cli/plugins/image.py`

Create images from text prompts using the OpenAI image models.

**Typical uses:**

```bash
eai image "a serene mountain landscape" -o landscape.png
eai image "corporate logo" --size 1024x1024 --quality hd -o logo.png
```

**Capabilities:**

- Generates PNG/JPEG/WebP images from text.
- Controls for size, quality, and output path.
- Uses service layer (`ei_cli.services.image_service`) for API calls & retries.

---

## 3. Vision Analysis – `eai vision`

**Files:** `src/ei_cli/plugins/vision.py`, `ei_cli/services/ai_service.py`

Analyze a single image with GPT‑5 Vision.

**Examples:**

```bash
eai vision photo.jpg --prompt "What's in this image?"
eai vision receipt.jpg --prompt "What is the total amount?"
eai vision document.jpg --prompt "Extract all text"
```

**Capabilities:**

- Accepts local image paths or URLs (downloaded via services).
- Adjustable detail level (`low` / `high`).
- Error handling and progress display handled by `ei_cli.core`.

---

## 4. Multi‑Image Vision – `eai multi_vision`

**File:** `src/ei_cli/plugins/multi_vision.py`

Analyze 2–3 images at once for comparisons and joint reasoning.

**Examples:**

```bash
eai multi_vision before.jpg after.jpg --prompt "What changed?"
eai multi_vision img1.jpg img2.jpg img3.jpg --detail high
```

**Key options (see plugin docstring for full list):**

- `IMAGES` – 2–3 file paths or URLs.
- `--prompt` – Custom analysis question.
- `--compare` – Turn on comparison mode.
- `--detail` – Detail level (`auto` / `low` / `high`).
- `--json` – Machine‑readable JSON output.

**Responsibilities of `multi_vision` plugin:**

- Validates image count (2–3 only).
- Ensures API key is set via `require_api_key()`.
- Uses `ServiceFactory` to get an `ai_service`.
- Calls `ai_service.analyze_multiple_images(...)`.
- Formats output (rich console or JSON) via helper functions.

---

## 5. Text‑to‑Speech – `eai speak`

**File:** `src/ei_cli/plugins/speak.py`

Convert text (inline or from file) to audio using OpenAI TTS.

**Examples:**

```bash
eai speak "Hello world" -o hello.mp3
eai speak --input script.txt -o book.mp3 --voice nova
```

**Capabilities:**

- Supports several OpenAI voices (alloy, echo, fable, onyx, nova, shimmer).
- Streams audio or writes directly to file.
- Uses `ei_cli.services.audio_processor` and `ai_service` for generation.

---

## 6. Audio Transcription – `eai transcribe`

**File:** `src/ei_cli/plugins/transcribe.py`

Transcribe audio using Whisper.

**Examples:**

```bash
eai transcribe podcast.mp3 -o transcript.txt
eai transcribe meeting.wav --format srt -o subtitles.srt
```

**Capabilities:**

- Multi‑format audio input (mp3, wav, m4a, etc.).
- Different output formats: plain text, SRT, VTT, JSON.
- Optional parallel / chunked processing via `audio_chunker` and services.

---

## 7. Video Transcription – `eai transcribe_video`

**File:** `src/ei_cli/plugins/transcribe_video.py`

Download online videos (e.g., YouTube) and transcribe the audio.

**Examples:**

```bash
eai transcribe_video "https://youtube.com/watch?v=..." -o transcript.txt
eai transcribe_video "VIDEO_URL" --format srt -o subtitles.srt
```

**Capabilities:**

- Uses `video_downloader` to fetch audio.
- Reuses the same transcription pipeline as `eai transcribe`.
- Supports keeping the downloaded audio file (`--keep-audio`).

---

## 8. Audio Translation – `eai translate_audio`

**File:** `src/ei_cli/plugins/translate_audio.py`

Translate speech from *any* language to **English** using Whisper.

**Examples:**

```bash
# Simple translation
eai translate-audio spanish.mp3

# JSON output with metadata
eai translate-audio audio.wav --format json

# Generate English subtitles
eai translate-audio video.mp4 -f srt -o english.srt
```

**Key options:**

- `--format / -f` – `text`, `json`, `srt`, or `vtt`.
- `--output / -o` – Write result to a file.
- `--no-preprocess` – Skip audio normalization.
- `--prompt / -p` – Guide translation style.
- `--temperature / -t` – Control randomness.

**Implementation details:**

- Validates configuration via `ServiceFactory` and `ai_service.check_available()`.
- On success, prints or writes translation + metadata.
- Rich error handling for config / service / unexpected errors.

---

## 9. Web Search – `eai search`

**File:** `src/ei_cli/plugins/search.py`

Perform web search with AI synthesis and citations.

**Examples:**

```bash
eai search "latest AI developments 2024"
eai search "Python tutorials" --domains "edu,github.io"
```

**Capabilities:**

- Queries external search APIs and aggregates results.
- Uses OpenAI models for answer synthesis and citation ranking.
- Optional `--output` to save a Markdown report.

---

## 10. YouTube & ElevenLabs Tools

### `eai youtube`

**File:** `src/ei_cli/plugins/setup_youtube.py`

- Manages OAuth / cookie‑based auth for YouTube.
- Provides commands like `check`, `setup`, `clear` for verifying / resetting auth.

### `eai elevenlabs`

**File:** `src/ei_cli/plugins/speak_elevenlabs.py`

- High‑quality TTS via ElevenLabs.
- Supports listing voices and generating speech:

```bash
eai elevenlabs list-voices
eai elevenlabs speak "Welcome" -o intro.mp3 --voice adam
```

---

## 11. Configuration & Environment

**Files:**

- `.env.example` – Example environment variable configuration.
- `config.yaml.example` – Example config file loaded by `ei_cli.config.manager`.
- `src/ei_cli/config/manager.py` – Load/merge env + YAML + defaults.

**Important environment variables:**

- `OPENAI_API_KEY` or `EI_API_KEY` – OpenAI access.
- `ELEVENLABS_API_KEY` – (Optional) ElevenLabs access.

Either set them in your shell or configure via `~/.ei_cli/config.yaml`.

---

## 12. Internals (Core & Services)

You usually dont call these directly, but they explain behavior:

- `src/ei_cli/core/cache.py` – Response/result caching.
- `src/ei_cli/core/errors.py` – Typed error classes.
- `src/ei_cli/core/error_handler.py` – Centralized error reporting.
- `src/ei_cli/core/rate_limiter.py` – API rate‑limit handling.
- `src/ei_cli/core/progress.py` – Progress spinners/bars.
- `src/ei_cli/services/*.py` – Actual OpenAI/ElevenLabs/IO logic.
- `src/ei_cli/workflow/*.py` – Interactive and parallel workflows.

For deeper details, see:

- `references/eai/README.md` – Full project README.
- `references/eai/docs/QUICK_REFERENCE.md` – Engineering and feature roadmap.
- Other docs under `references/eai/docs/` for specific guides.

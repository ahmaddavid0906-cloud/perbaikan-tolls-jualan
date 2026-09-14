import { resolveApiKey, ResolvedKeyContext } from './apiKeyResolver';

export type ModelTier = 'flagship' | 'tier2' | 'tier3' | 'specialized' | 'user_key';

export interface ModelRoutingResult {
  modelUsed: string;
  tierUsed: ModelTier;
  text?: string;
}

/**
 * All Gemini models categorized into strict tiers from official specifications:
 * - Tier 1 (Flagship & Deep Reasoning): Highest intelligence, deep reasoning, complex multimodality
 * - Tier 2 (High-Speed Workhorse): Ultra-fast, highly reliable multimodal generation
 * - Tier 3 (Resilient Lite & Zero-Limit Fallback): Ultra-lightweight, maximum rate-limit tolerance
 * - Specialized: Modality-specific (Image, TTS, Audio, Robotics, Agentic)
 */
export const MODEL_TIERS = {
  flagship: [
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
  ],
  tier2: [
    'gemini-3.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
  ],
  tier3: [
    'gemini-2-flash-lite',
    'gemini-2.0-flash-lite',
    'gemini-2-flash',
    'gemini-2.0-flash',
    'gemini-3.1-flash-lite',
  ],
  specialized: [
    // Image Generation Models (Nano Banana family)
    'gemini-3-pro-image', // Nano Banana Pro
    'gemini-3.1-flash-image', // Nano Banana 2
    'gemini-3.1-flash-lite-image', // Nano Banana 2 Lite
    'gemini-2.5-flash-preview-image', // Nano Banana
    // TTS & Audio
    'gemini-3.1-flash-tts',
    'gemini-2.5-flash-tts',
    'gemini-2.5-pro-tts',
    'lyria-3-clip',
    // Agentic & Multimodal Generative
    'gemini-omni-flash',
    'antigravity',
    'deep-research-pro-preview',
    'computer-use-preview',
    // Robotics & Open Weights
    'gemini-robotics-er-1.6-preview',
    'gemini-robotics-er-2-preview',
    'gemma-4-26b',
    'gemma-4-31b',
    'gemini-embedding-1',
    'gemini-embedding-2',
  ],
} as const;

/**
 * Returns the model list prioritized for a given tier.
 */
export function getModelsForTier(tier: ModelTier): string[] {
  switch (tier) {
    case 'flagship':
      return [
        'gemini-3.7-flash',
        'gemini-3.6-flash',
        'gemini-3.8-flash',
        'gemini-3.5-flash',
      ];
    case 'tier2':
      return [
        'gemini-3.5-flash-lite',
        'gemini-2.5-flash',
        'gemini-3.1-flash-lite',
        'gemini-2.5-flash-lite',
      ];
    case 'tier3':
      return [
        'gemini-2-flash-lite',
        'gemini-2-flash',
        'gemini-3.1-flash-lite',
      ];
    case 'specialized':
      return [...MODEL_TIERS.specialized];
    default:
      return [...TOP_MODEL_ORDER];
  }
}

/**
 * Global optimal priority order for general text & multimodal prompt generation.
 * Cascades gracefully from Flagship -> High Speed -> Resilient Lite.
 */
export const TOP_MODEL_ORDER: string[] = [
  // 1. Tier 1 Flagship (tugas berat)
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash',

  // 2. Tier 2 (mayoritas tugas multimodal & text)
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',

  // 3. Tier 3 (fallback ringan & hemat)
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',

  // Legacy fallbacks at the very end
  'gemini-3.1-pro-preview',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

/**
 * Image model priority order
 */
export const IMAGE_MODEL_ORDER: string[] = [
  'gemini-3-pro-image', // Nano Banana Pro
  'gemini-3.1-flash-image', // Nano Banana 2
  'gemini-3.1-flash-lite-image', // Nano Banana 2 Lite
  'gemini-2.5-flash-preview-image', // Nano Banana
  'gemini-3.7-flash',
  'gemini-3.6-flash',
];

/**
 * TTS / Voice model priority order
 */
export const TTS_MODEL_ORDER: string[] = [
  'gemini-3.1-flash-tts',
  'gemini-2.5-flash-tts',
  'gemini-2.5-pro-tts',
];

export const VIDEO_MODEL_ORDER: string[] = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-2.5-flash',
];

// Single source of truth aliases for backward compatibility across the app
export const ALL_GEMINI_CASCADING_MODELS = TOP_MODEL_ORDER;
export const MODEL_CASCADE = TOP_MODEL_ORDER;
export const GATEWAY_MODELS_HIERARCHY = TOP_MODEL_ORDER;
export const GATEWAY_IMAGE_MODELS_HIERARCHY = IMAGE_MODEL_ORDER;
export const GATEWAY_TTS_MODELS_HIERARCHY = TTS_MODEL_ORDER;

/**
 * Normalizes user or legacy model strings to active supported model identifiers.
 */
export function normalizeGeminiModel(inputModel?: string): string {
  const m = (inputModel || '').toLowerCase().trim();
  if (!m) return TOP_MODEL_ORDER[0];
  if (m === 'gemini-3.7-flash' || m === 'gemini-3.7' || m === '3.7-flash') return 'gemini-3.7-flash';
  if (m === 'gemini-3.6-flash' || m === '3.6-flash') return 'gemini-3.6-flash';
  if (m === 'gemini-3.8-flash' || m === 'gemini-3.8' || m === '3.8-flash') return 'gemini-3.8-flash';
  if (m === 'gemini-3.5-flash' || m === '3.5-flash') return 'gemini-3.5-flash';
  if (m === 'gemini-3.5-flash-lite' || m === '3.5-flash-lite') return 'gemini-3.5-flash-lite';
  if (m === 'gemini-3.1-flash-lite' || m === '3.1-flash-lite') return 'gemini-3.1-flash-lite';
  if (m === 'gemini-2.5-flash' || m === '2.5-flash') return 'gemini-2.5-flash';
  if (m === 'gemini-2.5-flash-lite' || m === '2.5-flash-lite') return 'gemini-2.5-flash-lite';
  if (m === 'gemini-2-flash-lite' || m === 'gemini-2.0-flash-lite' || m === '2.0-flash-lite' || m === '2-flash-lite') return 'gemini-2.0-flash-lite';
  if (m === 'gemini-2-flash' || m === 'gemini-2.0-flash' || m === '2.0-flash' || m === '2-flash') return 'gemini-2.0-flash';
  if (m === 'gemini-3.1-pro-preview' || m === 'gemini-3.1-pro' || m === '3.1-pro' || m === '3.1-pro-preview') return 'gemini-3.1-pro-preview';
  if (m === 'gemini-2.5-pro' || m === '2.5-pro') return 'gemini-3.1-pro-preview';
  if (m === 'gemini-1.5-flash' || m === '1.5-flash') return 'gemini-1.5-flash';
  if (m === 'gemini-1.5-pro' || m === '1.5-pro') return 'gemini-1.5-pro';

  // Image models
  if (m.includes('image') || m.includes('banana')) {
    if (m.includes('pro')) return 'gemini-3-pro-image';
    if (m.includes('lite')) return 'gemini-3.1-flash-lite-image';
    return 'gemini-3.1-flash-image';
  }

  // TTS models
  if (m.includes('tts')) {
    if (m.includes('pro')) return 'gemini-2.5-pro-tts';
    return 'gemini-3.1-flash-tts';
  }

  return inputModel || TOP_MODEL_ORDER[0];
}

/**
 * Evaluates the initial routing tier based on the complexity of the requested task.
 */
export function getInitialTierForTask(aeoQueryMode?: string, hasVideo?: boolean): ModelTier {
  if (aeoQueryMode === 'short' && !hasVideo) {
    return 'tier2';
  }
  return 'flagship';
}

/**
 * Evaluates the model to use and maps execution tier based on user choice,
 * cascading fallback state, and API key source, prioritizing the top model first.
 */
export function getModelRoutingPlan(
  userRequestedModel?: string,
  customApiKeyInput?: string
): { keyContext: ResolvedKeyContext; targetModels: string[]; primaryTier: ModelTier } {
  const keyContext = resolveApiKey(customApiKeyInput);
  const normalizedRequested = (userRequestedModel || '').trim();

  // Build target candidate list with TOP model priority first
  const baseCandidates = normalizedRequested
    ? [normalizedRequested, ...TOP_MODEL_ORDER]
    : [...TOP_MODEL_ORDER];

  const targetModels = Array.from(new Set(baseCandidates)).filter(Boolean);

  if (keyContext.source === 'user_key') {
    return {
      keyContext,
      targetModels,
      primaryTier: 'user_key',
    };
  }

  // Determine primary tier based on the leading model
  const leadingModel = targetModels[0] || 'gemini-3.7-flash';
  let primaryTier: ModelTier = 'flagship';
  if ((MODEL_TIERS.tier3 as readonly string[]).includes(leadingModel)) {
    primaryTier = 'tier3';
  } else if ((MODEL_TIERS.tier2 as readonly string[]).includes(leadingModel)) {
    primaryTier = 'tier2';
  } else if ((MODEL_TIERS.specialized as readonly string[]).includes(leadingModel)) {
    primaryTier = 'specialized';
  }

  return {
    keyContext,
    targetModels,
    primaryTier,
  };
}

/**
 * Maps a specific model used to its corresponding execution tier
 */
export function getTierForModel(modelName: string, isUserKey: boolean): ModelTier {
  if (isUserKey) return 'user_key';
  if ((MODEL_TIERS.flagship as readonly string[]).includes(modelName)) return 'flagship';
  if ((MODEL_TIERS.tier3 as readonly string[]).includes(modelName)) return 'tier3';
  if ((MODEL_TIERS.specialized as readonly string[]).includes(modelName)) return 'specialized';
  return 'tier2';
}

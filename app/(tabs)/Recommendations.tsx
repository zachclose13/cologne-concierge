type Fragrance = {
  name: string;
  matchPercent: number;
  reason: string;
  tip: string;
  season?: string;
  vibe?: string;
  strength?: string;
  image?: string;
};


import StarRating from "../../components/StarRating";

import { supabase } from '@/lib/supabase';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';
import { OpenAI } from 'openai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';








const fragranceImages: Record<string, any> = {
  "abercrombiefitch.png": require('@/assets/fragrances/abercrombiefitch.png'),
  "aquadigio.png": require('@/assets/fragrances/aquadigio.png'),
  "armanicode.png": require('@/assets/fragrances/armanicode.png'),
  "badboy.png": require('@/assets/fragrances/badboy.png'),
  "bleudechanel.png": require('@/assets/fragrances/bleudechanel.png'),
  "BORedp.png": require('@/assets/fragrances/BORedp.png'),
  "carbon.png": require('@/assets/fragrances/carbon.png'),
  "cedratboise.png": require('@/assets/fragrances/cedratboise.png'),
  "codeblack.png": require('@/assets/fragrances/codeblack.png'),
  "dylanblue.png": require('@/assets/fragrances/dylanblue.png'),
  "erosedp.png": require('@/assets/fragrances/erosedp.png'),
  "hero.png": require('@/assets/fragrances/hero.png'),
  "hommeintense.png": require('@/assets/fragrances/hommeintense.png'),
  "l'homme.png": require('@/assets/fragrances/l\'homme.png'),
  "legendspirit.png": require('@/assets/fragrances/legendspirit.png'),
  "lemaleleparfum.png": require('@/assets/fragrances/lemaleleparfum.png'),
  "sauvage.png": require('@/assets/fragrances/sauvage.png'),
  "sideeffect.png": require('@/assets/fragrances/sideeffect.png'),
  "voyage.png": require('@/assets/fragrances/voyage.png'),
  "ysledp.png": require('@/assets/fragrances/ysledp.png'),
    "accento.png": require('@/assets/fragrances/accento.png'),
  "naxos.png": require('@/assets/fragrances/naxos.png'),
  "urbapura.png": require('@/assets/fragrances/urbapura.png'),
  "erbagold.png": require('@/assets/fragrances/erbagold.png'),
  "torino21.png": require('@/assets/fragrances/torino21.png'),
  "torino22.png": require('@/assets/fragrances/torino22.png'),
  "torino24.png": require('@/assets/fragrances/torino24.png'),
  // INITIO
"atomicrose.png": require("@/assets/fragrances/atomicrose.png"),
"absoluteaphrodisiac.png": require("@/assets/fragrances/absoluteaphrodisiac.png"),
"oudforgreatness.png": require("@/assets/fragrances/oudforgreatness.png"),
"psychedeliclove.png": require("@/assets/fragrances/psychedeliclove.png"),
"rehab.png": require("@/assets/fragrances/rehab.png"),
"paragon.png": require("@/assets/fragrances/paragon.png"),
"cantgetenough.png": require("@/assets/fragrances/cantgetenough.png"),
"musktherapy.png": require("@/assets/fragrances/musktherapy.png"),
  // PARFUMS DE MARLY
  "althair.png": require('@/assets/fragrances/althair.png'),
  "greenley.png": require('@/assets/fragrances/greenley.png'),
  "sedley.png": require('@/assets/fragrances/sedley.png'),
  "oajan.png": require('@/assets/fragrances/oajan.png'),
  "laytone.png": require('@/assets/fragrances/layton.png'),
  "haltane.png": require('@/assets/fragrances/haltane.png'),
  // CREED
  "aventus.png": require('@/assets/fragrances/aventus.png'),
  "aventusabsolu.png": require('@/assets/fragrances/aventusabsolu.png'),
  "silvermountainwater.png": require('@/assets/fragrances/silvermountainwater.png'),
  "originalvetiver.png": require('@/assets/fragrances/originalvetiver.png'),
  "millesimeimperial.png": require('@/assets/fragrances/millesimeimperial.png'),
  "erolfa.png": require('@/assets/fragrances/erolfa.png'),
  "greenirishtweed.png": require('@/assets/fragrances/greenirishtweed.png'),
  "virginislandwater.png": require('@/assets/fragrances/virginislandwater.png'),

  // VALENTINO
  "yellowdream.png": require('@/assets/fragrances/yellowdream.png'),
    "individuel.png": require('@/assets/fragrances/individuel.png'),
  "ckoneshock.png": require('@/assets/fragrances/ckoneshock.png'),
  "chrome.png": require('@/assets/fragrances/chrome.png'),
  "wanted.png": require('@/assets/fragrances/wanted.png'),
  "360red.png": require('@/assets/fragrances/360red.png'),
  "bentleyintense.png": require('@/assets/fragrances/bentleyintense.png'),
  "coolwater.png": require('@/assets/fragrances/coolwater.png'),
  "guessseductive.png": require('@/assets/fragrances/guessseductive.png'),
  "cubagold.png": require('@/assets/fragrances/cubagold.png'),
  "hollisterwave.png": require('@/assets/fragrances/hollisterwave.png'),
  "quorum.png": require('@/assets/fragrances/quorum.png'),
  "jaguarclassicblack.png": require('@/assets/fragrances/jaguarclassicblack.png'),
  "fblack.png": require('@/assets/fragrances/fblack.png'),
  "poloblue.png": require('@/assets/fragrances/poloblue.png'),
// --- NEW SQL FRAGRANCES ---
"versacepourhomme.png": require('@/assets/fragrances/versacepourhomme.png'),
"versacemaneaufraiche.png": require('@/assets/fragrances/versacemaneaufraiche.png'),
"guiltyblack.png": require('@/assets/fragrances/guiltyblack.png'),
"gucciguiltyedt.png": require('@/assets/fragrances/gucciguiltyedt.png'),
"ultramale.png": require('@/assets/fragrances/ultramale.png'),
"phantom.png": require('@/assets/fragrances/phantom.png'),
"invictus.png": require('@/assets/fragrances/invictus.png'),
"invictusaqua.png": require('@/assets/fragrances/invictusaqua.png'),
"codeprofumo.png": require('@/assets/fragrances/codeprofumo.png'),
"explorer.png": require('@/assets/fragrances/explorer.png'),
"bossbottled.png": require('@/assets/fragrances/bossbottled.png'),
"bossbottlednight.png": require('@/assets/fragrances/bossbottlednight.png'),
"theoneedp.png": require('@/assets/fragrances/theoneedp.png'),
"lightblue.png": require('@/assets/fragrances/lightblue.png'),
"lhommeintense.png": require('@/assets/fragrances/lhommeintense.png'),
"coralfantasy.png": require('@/assets/fragrances/coralfantasy.png'),
"valentinoborintense.png": require('@/assets/fragrances/valentinoborintense.png'),
"valentinonoirabsolu.png": require('@/assets/fragrances/valentinonoirabsolu.png'),
"onemillionlucky.png": require('@/assets/fragrances/onemillionlucky.png'),
"lebeau.png": require('@/assets/fragrances/lebeau.png'),
"polored.png": require('@/assets/fragrances/polored.png'),
"lemaleelixir.png": require('@/assets/fragrances/lemaleelixir.png'),
"212vipmen.png": require('@/assets/fragrances/212vipmen.png'),
"jazzclub.png": require('@/assets/fragrances/jazzclub.png'),
"bythefireplace.png": require('@/assets/fragrances/bythefireplace.png'),
"lazysundaymorning.png": require('@/assets/fragrances/lazysundaymorning.png'),
"bubblebath.png": require('@/assets/fragrances/bubblebath.png'),
"fromthegarden.png": require('@/assets/fragrances/fromthegarden.png'),
"coffeebreak.png": require('@/assets/fragrances/coffeebreak.png'),
"strongerwithyouabsolutely.png": require('@/assets/fragrances/strongerwithyouabsolutely.png'),
"strongerwithyouintensely.png": require('@/assets/fragrances/strongerwithyouintensely.png'),
"strongerwithyouparfum.png": require('@/assets/fragrances/strongerwithyouparfum.png'),


};
const expertTips = [
  "Spray lightly on pulse points for a moderate strength that lasts longer.",
  "Apply fragrance right after a shower—it bonds better to hydrated skin.",
  "Do not rub your wrists together—this crushes the top notes.",
  "Spray once on your chest to create a natural scent bubble.",
  "In hot weather, avoid sweet scents—they can become overpowering.",
  "For maximum longevity, spray on clothes (but avoid delicate fabrics).",
  "Layer an unscented moisturizer before applying fragrance to boost longevity.",
  "Apply one spray behind each ear for intimate projection.",
  "In cooler temperatures, stronger and warmer scents perform better.",
  "Use one spray on the back of your neck for a subtle trail.",
  "Store fragrances away from sunlight to prevent the formula from breaking down.",
  "If your scent fades quickly, switch to an EDP or Parfum concentration.",
  "Fragrances last longer on oily skin—use a light lotion if needed.",
  "Spray your forearms if you want a scent you can smell throughout the day.",
  "Apply fragrance to your inner elbow for soft, long-lasting projection.",
  "For dates, use 1–2 sprays max—subtlety is more attractive.",
  "Avoid spraying directly on leather—it can stain permanently.",
  "Try matching your scent vibe to the occasion—fresh for day, warm for night.",
  "Spray lower on your body for longer-lasting, slower projection.",
  "Don’t overspray beast-mode scents—they perform better in small doses.",
  "Use a travel atomizer to refresh your scent while out.",
  "Spray on your back so the scent trails naturally when you walk.",
  "Rotate fragrances to avoid nose fatigue and appreciate them more.",
  "If a scent is too strong, spray from further away (12–14 inches).",
  "Match your fragrance to the season—citrus for summer, spices for winter.",
  "Apply fragrance to your hair lightly for a long-lasting scent trail.",
  "Use 1 spray to the inside of your shirt for 10+ hour longevity.",
  "Try layering two compatible scents for a unique signature.",
  "Avoid overspraying indoors—closed spaces amplify intensity.",
  "Let the alcohol evaporate for 10 seconds before smelling a new fragrance."
];







const openai = new OpenAI({
  apiKey: Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENAI_API_KEY,
});



export default function Recommendations() {



   const bottleOpacity = useRef(new Animated.Value(0)).current;
  const bottleTranslateY = useRef(new Animated.Value(20)).current;
  const bottleFloat = useRef(new Animated.Value(0)).current;

  // ⭐ RUN ANIMATIONS ON LOAD
  useEffect(() => {
    // Fade + slide in
    Animated.parallel([
      Animated.timing(bottleOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(bottleTranslateY, {
        toValue: 0,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(bottleFloat, {
          toValue: -3,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bottleFloat, {
          toValue: 3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  // ⭐ SHOP NOW BUTTON ANIMATION
const buttonScale = useRef(new Animated.Value(0.9)).current;

useEffect(() => {
  // Scale in when screen loads
  Animated.timing(buttonScale, {
    toValue: 1,
    duration: 350,
    delay: 300,
    useNativeDriver: true,
  }).start();

  // Subtle pulse loop
  Animated.loop(
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.03,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  const { answers } = useLocalSearchParams();
const parsedAnswers = useMemo(() => {
  try {
    return typeof answers === 'string' ? JSON.parse(answers) : answers;
  } catch (err) {
    console.error('Failed to parse answers:', answers);
    return {};
  }
}, [answers]);

const [loading, setLoading] = useState(true);
// ⭐ LOADING SPINNER SETUP
const spinValue = useRef(new Animated.Value(0)).current;

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"]
});

useEffect(() => {
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1400,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
}, []);


const [aiResult, setAIResult] = useState('');
const [topMatch, setTopMatch] = useState<Fragrance | null>(null);
const [notes, setNotes] = useState({
  top_notes: [] as string[],
  heart_notes: [] as string[],
  base_notes: [] as string[],
  longevity: null as number | null,
  projection: null as number | null
});


function parseGPTMessage(message: string): Fragrance | null {
  const nameMatch =
    message.match(/-?\s*(Option|Name):\s*(.+)/i); // supports "Option:" or "- Name:"
  const matchPercentMatch = message.match(/-?\s*Match\s*%:\s*(\d+)%/i);
  const reasonMatch =
    message.match(/-?\s*(Short reason|This fragrance|Reason):\s*(.+)/i);
  const tipMatch =
    message.match(/-?\s*(1-sentence expert tip|Expert tip|Tip):\s*(.+)/i);

  if (nameMatch && matchPercentMatch && reasonMatch && tipMatch) {
    return {
      name: nameMatch[2].trim(),
      matchPercent: parseInt(matchPercentMatch[1], 10),
      reason: reasonMatch[2].trim(),
      tip: tipMatch[2].trim(),
    };
  }

  return null;
  }
async function expandUserProfile(answers: any) {
  const mappingPrompt = `
You are a structured data generator.
You MUST derive each field ONLY from the quiz answers provided.
You MUST NOT assume, guess, or use fragrance knowledge.
You MUST follow the rules below STRICTLY.

-------------------------
QUIZ ANSWERS PROVIDED:
${JSON.stringify(answers)}
-------------------------

MAPPING RULES (STRICT):

1. q1 = Age  
- If "Teen" → maturity_level = 1
- If "20–25" → maturity_level = 2
- If "25–30" → maturity_level = 3
- If "30–35" → maturity_level = 4
- If "35+" → maturity_level = 5

2. q2 = Occasion  
- Use EXACT q2 text for "occasion_target"

3. q3 = Season  
- season_priority = [ LOWERCASE(q3 answer) ]

4. q4 = Vibe  
- personality_traits = [ EXACT q4 ]

5. q5 or q7 = Strength preference  
- strength_preference = EXACT answer

6. q6 = Budget  
- budget_level = EXACT answer

7. day_night:
- If q2 contains "date" or "night" → "night"
- If q2 contains "daily" or "work" or "school" → "day"
- Else ""

8. primary_family & secondary_family:
MAP EXACTLY:
- If vibe contains "fresh" → primary = "Fresh"
- If vibe contains "sweet" → primary = "Oriental"
- If vibe contains "clean" → primary = "Citrus"
- If vibe contains "dark" → primary = "Woody"
- All others → primary = "Modern"
secondary_family = ""

Return ONLY valid JSON in this format:

{
  "primary_family": "",
  "secondary_family": "",
  "avoid_families": [],
  "personality_traits": [],
  "season_priority": [],
  "occasion_target": "",
  "strength_preference": "",
  "maturity_level": 1,
  "projection_preference": "",
  "uniqueness_preference": "",
  "budget_level": "",
  "day_night": ""
}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: mappingPrompt }],
    temperature: 0,
  });

  const raw = completion.choices[0].message.content ?? "{}";

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return {};

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {};
  }
}











useEffect(() => {
  const safeLower = (v: any) => (typeof v === 'string' ? v.toLowerCase() : '');
  const fetchAndMatch = async () => {
    try {
      const { data: allFragrances, error } = await supabase
        .from('Fragrances')
        .select('*');

      if (error || !allFragrances) {
        console.error('Supabase error:', error);
        setAIResult('Error fetching fragrance data.');
        setLoading(false);
        return;
      }

// ⭐ Expand user using AI
const userProfile = await expandUserProfile(parsedAnswers);
console.log("USER PROFILE:", userProfile);
console.log("PRIMARY:", userProfile.primary_family);
console.log("SECONDARY:", userProfile.secondary_family);
console.log("AVOID:", userProfile.avoid_families);
console.log("SEASON PRIORITY:", userProfile.season_priority);
console.log("OCCASION TARGET:", userProfile.occasion_target);
console.log("DAY/NIGHT:", userProfile.day_night);
console.log("PERSONALITY:", userProfile.personality_traits);
console.log("MATURITY:", userProfile.maturity_level);
console.log("UNIQUENESS:", userProfile.uniqueness_preference);

// ⭐ Enrich every fragrance using AI
const enrichedFragrances = allFragrances;

// ⭐ Scoring logic
// ⭐ Scoring logic (NEW)
function computeMatchScore(frag: any, user: any) {
  let score = 0;

  // === 1. PRIMARY FAMILY (STRONG) ===
  if (frag.families?.includes(user.primary_family)) score += 25;
  if (frag.dominant_note_family === user.primary_family) score += 8;

  // === 2. PERSONALITY / VIBE MATCH (VERY STRONG) ===
  frag.personality?.forEach((t: any) => {
    if (user.personality_traits?.includes(t)) score += 15;
  });

  // === 3. OCCASION MATCH ===
  if (frag.occasions?.includes(user.occasion_target)) score += 12;

  // === 4. DAY/NIGHT MATCH ===
  if (frag.day_night === user.day_night) score += 10;

  // === 5. MATURITY LEVEL ===
  if (frag.maturity_level === user.maturity_level) score += 10;
  else score += Math.max(0, 6 - Math.abs(frag.maturity_level - user.maturity_level));

  // === 6. SEASON MATCH USING WEIGHT MAP ===
  if (frag.seasonal_weight && user.season_priority?.[0]) {
    const season = user.season_priority[0];
    const weight = frag.seasonal_weight[season] || 0;
    score += weight * 12;
  }

  // === 7. SWEETNESS / FRESHNESS / DARKNESS MATCH ===
  const vibe = (user.personality_traits?.[0] || "").toLowerCase();

  if (vibe.includes("fresh")) score += frag.freshness_level * 1.8;
  if (vibe.includes("sweet")) score += frag.sweetness_level * 1.8;
  if (vibe.includes("dark")) score += frag.darkness_level * 1.8;
  if (vibe.includes("clean")) score += frag.freshness_level * 1.2;

  // === 8. BUDGET MATCH ===
  if ((frag.price_range || "").toLowerCase() === (user.budget_level || "").toLowerCase()) {
    score += 5;
  }

  // === 9. STRENGTH MATCH ===
  if (user.strength_preference?.toLowerCase().includes("beast") &&
      frag.performance_category === "beast mode")
    score += 12;

  if (user.strength_preference?.toLowerCase().includes("strong") &&
      frag.performance_category === "strong")
    score += 10;

  // === 10. GENDER PROFILE ===
  if (frag.gender_profile === "masculine") score += 3;
  if (frag.gender_profile === "unisex") score += 5;

  // === 11. UNIVERSAL METRICS ===
  score += (frag.mass_appeal || 0) * 1.2;
  score += (frag.uniqueness || 0) * 0.7;
  score += (frag.versatility_score || frag.versatility || 0) * 1.3;

  // === 12. AVOID NOTES PENALTY ===
  if (user.avoid_families?.some((f: any) => frag.families?.includes(f))) {
    score -= 25;
  }
    // === 13. USER PREFERRED FAMILIES (new question) ===
  if (user.preferred_families && frag.families) {
    user.preferred_families.forEach((fam: string) => {
      if (frag.families.includes(fam)) score += 10;
    });
  }

  // === 14. SKIN TYPE IMPACT ON LONGEVITY ===
  if (user.skin_type === "Dry Skin") {
    score += (frag.longevity || 0) * 1.2;
  }
  if (user.skin_type === "Oily Skin") {
    score += (frag.projection || 0) * 1.2;
  }

  // === 15. LONGEVITY PREFERENCE (How long user wants it to last) ===
  if (user.longevity_preference) {
    const diff = Math.abs((frag.longevity || 0) - user.longevity_preference);
    score += Math.max(0, 15 - diff * 4);  // closer match = higher score
  }

  // === 16. NOTE GROUP PREFERENCE (Fresh / Sweet / Woody / etc.) ===
  if (user.note_group_preference) {
    const pref = user.note_group_preference.toLowerCase();

    if (pref.includes("fresh")) score += (frag.freshness_level || 0) * 2;
    if (pref.includes("sweet")) score += (frag.sweetness_level || 0) * 2;
    if (pref.includes("woody")) score += (frag.wood_level || 0) * 2;
    if (pref.includes("amber")) score += (frag.amber_level || 0) * 2;
  }

  // === 17. FRESH VS SWEET BALANCE (Very Fresh → Very Sweet) ===
  if (user.fresh_sweet_balance) {
    // fresh_sweet_balance: 1 = very fresh, 5 = very sweet
    score += (user.fresh_sweet_balance * (frag.sweetness_level || 0)) * 0.8;
    score += ((6 - user.fresh_sweet_balance) * (frag.freshness_level || 0)) * 0.8;
  }

  // === 18. UNIQUENESS PREFERENCE ===
  if (user.uniqueness_preference && frag.uniqueness) {
    const diff = Math.abs(frag.uniqueness - user.uniqueness_preference * 2);
    score += Math.max(0, 12 - diff * 1.5);
  }


  return score;
}



// ⭐ Compute scores for all fragrances
const scored = enrichedFragrances.map(frag => {
  frag.projection = Number(frag.projection);
frag.longevity = Number(frag.longevity);
frag.mass_appeal = Number(frag.mass_appeal);
frag.uniqueness = Number(frag.uniqueness);
frag.versatility = Number(frag.versatility);
frag.maturity_level = Number(frag.maturity_level);

  const score = computeMatchScore(frag, userProfile);

  const MAX_POSSIBLE = 185;
// optimized scaling

  return {
    ...frag,
    score,
    matchPercent: Math.min(
      100,
      Math.max(0, Math.round((score / MAX_POSSIBLE) * 100))
    ),
  };
});


// ⭐ Pick the top match
const sorted = scored.sort((a, b) => b.score - a.score);
const best = sorted[0] || null;
setTopMatch(best);

// === AI CALL FOR NOTES + LONGEVITY + PROJECTION ===
try {
  const notesPrompt = `
You are a fragrance expert.

Return a JSON object with ONLY the following fields:

{
  "top_notes": ["note1", "note2", "note3"],
  "heart_notes": ["note1", "note2", "note3"],
  "base_notes": ["note1", "note2", "note3"],
  "longevity": 1-5,
  "projection": 1-5
}

Fragrance: ${best.name}

Do NOT return anything except valid JSON.
`;

  const notesCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: notesPrompt }],
    temperature: 0.3,
  });

  const rawNotes = notesCompletion.choices[0].message.content ?? "{}";
  const parsedNotes = JSON.parse(rawNotes);

  setNotes({
    top_notes: parsedNotes.top_notes || [],
    heart_notes: parsedNotes.heart_notes || [],
    base_notes: parsedNotes.base_notes || [],
    longevity: parsedNotes.longevity ?? null,
    projection: parsedNotes.projection ?? null,
  });

} catch (e) {
  console.error("Notes AI Error:", e);
}


      // Pick a random expert tip for fallback
const randomTip = expertTips[Math.floor(Math.random() * expertTips.length)];


      if (!best) {
        setAIResult('No matching fragrances found.');
        setLoading(false);
        return;
      }

      // ✅ Only one prompt now
      const promptText = `
You are a fragrance expert.

User profile:
- Age: ${parsedAnswers.q1}
- Occasion: ${parsedAnswers.q2}
- Season: ${parsedAnswers.q3}
- Vibe: ${parsedAnswers.q4}
- Budget: ${parsedAnswers.q6}
- Strength: ${parsedAnswers.q5 || parsedAnswers.q7}

Fragrance:
${best.name} - ${best.season || 'n/a'}, ${best.vibe || 'n/a'}, ${best.strength || 'n/a'} (${best.matchPercent}% Match)

Return exactly two lines in this format:
Reason: <one sentence explaining why it fits>
Tip: <one-sentence expert tip>
      `.trim();

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: promptText }],
        temperature: 0.7,
      });

      const message = completion.choices[0].message.content?.trim() || '';
      setAIResult(message);

      // Extract just Reason and Tip
      const reasonMatch = message.match(/^\s*Reason:\s*(.+)$/im);
      const tipMatch = message.match(/^\s*Tip:\s*(.+)$/im);

      setTopMatch(prev =>
        prev
          ? {
              ...prev,
              reason: reasonMatch ? reasonMatch[1].trim() : prev.reason || '',
            tip: tipMatch ? tipMatch[1].trim() : randomTip,

            }
          : prev
      );
    } catch (err) {
      console.error('GPT Match Error:', err);
      setAIResult('Something went wrong.');
    } finally {
setTimeout(() => {
  setLoading(false);
}, 800); // give time for spinner to render

}

  };

  fetchAndMatch();
}, [parsedAnswers]);




return (
<View style={{ flex: 1, position: "relative" }}>

    
    {/* FULLSCREEN LOADER */}
    {loading && (
      <View style={styles.loaderWrapper}>
        <Animated.Image
        source={require("@/assets/icons/newloader.png")}

          style={{
            width: 140,
            height: 140,
            transform: [{ rotate: spin }],
            opacity: 0.9,
          }}
          resizeMode="contain"
        />
      </View>
    )}

  <SafeAreaView style={[styles.container, { zIndex: 1 }]}>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Your Top Match</Text>

        {!loading && topMatch && (
          <View style={styles.card}>
            {/* === IMAGE LEFT / TEXT RIGHT === */}
<View style={styles.topRow}>

  {/* LEFT IMAGE */}
  <Animated.Image
    source={
      topMatch?.image && fragranceImages[topMatch.image]
        ? fragranceImages[topMatch.image]
        : null
    }
    style={[
      styles.leftImage,
      {
        opacity: bottleOpacity,
        transform: [
          { translateY: bottleTranslateY },
          { translateY: bottleFloat }
        ],
      },
    ]}
    resizeMode="contain"
  />

  {/* RIGHT TEXT */}
  <View style={styles.rightInfo}>
    <Text style={styles.matchPercent}>{topMatch.matchPercent}% Match</Text>
    <Text style={styles.fragranceName}>{topMatch.name}</Text>
    <Text style={styles.description}>{topMatch.reason}</Text>
  </View>
</View>

{/* NOTES SECTION */}
{notes.top_notes.length > 0 && (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.notesHeader}>Notes Breakdown</Text>

    <View style={styles.notesRow}>
      <View style={styles.notesColumn}>
        <Text style={styles.notesLabel}>Top Notes</Text>
        <Text style={styles.notesText}>{notes.top_notes.join(", ")}</Text>

        <Text style={styles.notesLabel}>Base Notes</Text>
        <Text style={styles.notesText}>{notes.base_notes.join(", ")}</Text>
      </View>

      <View style={styles.notesColumn}>
        <Text style={styles.notesLabel}>Heart Notes</Text>
        <Text style={styles.notesText}>{notes.heart_notes.join(", ")}</Text>

        <Text style={styles.notesLabel}>Longevity</Text>
        <StarRating rating={notes.longevity || 0} />

        <Text style={styles.notesLabel}>Projection</Text>
        <StarRating rating={notes.projection || 0} />
      </View>
    </View>
  </View>
)}

{/* EXPERT TIP */}
<View style={{ marginTop: 20 }}>
  <Text style={styles.tipTitle}>Expert Tip</Text>
  <Text style={styles.tipText}>{topMatch.tip}</Text>
</View>

{/* SHOP BUTTON */}
<Animated.View style={{ transform: [{ scale: buttonScale }] }}>
  <TouchableOpacity style={[styles.shopButton, { marginTop: 20 }]}>
    <Text style={styles.shopButtonText}>Shop Now</Text>
  </TouchableOpacity>
</Animated.View>

            {/* your entire topMatch UI here */}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  </View>
);



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 20,
    alignItems: 'center',
     marginTop: 8,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
card: {
  backgroundColor: '#141416',   // MATCHES MOCKUP
  padding: 26,
  borderRadius: 20,
  width: '100%',
  marginBottom: 20,
},


  matchPercent: {
    color: '#C7CED9',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  fragranceName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
description: {
  fontSize: 12,
  color: "#ccc",
  lineHeight: 16,
  maxWidth: "95%",  // shorter, like the mockup
  marginTop: 4,
},

  tipBox: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 24,
  },
  tipTitle: {
    color: '#C7CED9',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 13,
    color: '#bbb',
  },
  shopButton: {
    backgroundColor: '#C7CED9',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
      alignItems: "center",
  justifyContent: "center",
  },
  shopButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fragranceImage: {
  width: 220,
  height: 220,
  alignSelf: 'center',
  marginBottom: 16,
},
notesCard: {
  backgroundColor: '#111',
  padding: 16,
  borderRadius: 12,
  width: '100%',
  marginBottom: 24,
},
notesHeader: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 12,
},
notesLabel: {
  color: '#C7CED9',
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 8,
},
notesText: {
  color: '#bbb',
  fontSize: 13,
},
topRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  width: "100%",
  marginBottom: 20,
},

leftImage: {
  width: 135,    // perfect size for mockup
  height: 180,
  marginRight: 22,
  marginTop: 6,  // aligns lower like mockup
  flexShrink: 0,
},


rightInfo: {
  flex: 1,
  paddingTop: 2,
},



notesRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 12,
  paddingRight: 10,  // adds breathing room like mockup
},

notesColumn: {
  width: "48%",
},
fullscreenLoader: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000", // matches your dark theme
  zIndex: 999,
},
loaderWrapper: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000",
  zIndex: 9999,
   elevation: 9999,
},





});

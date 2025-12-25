import { supabase } from "@/lib/supabase";
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';

import AppLoading from 'expo-app-loading';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { useEffect, useState } from 'react';


import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  const [scrollY, setScrollY] = useState(0);
const [contentHeight, setContentHeight] = useState(0);
const [containerHeight, setContainerHeight] = useState(0);


  const fragranceImages: Record<string, any> = {
    "Dior Sauvage EDT": require("../../assets/fragrances/sauvage.png"),
    "Bleu de Chanel EDP": require("../../assets/fragrances/bleudechanel.png"),
    "Versace Dylan Blue": require("../../assets/fragrances/dylanblue.png"),
    "Prada Luna Rossa Carbon": require("../../assets/fragrances/carbon.png"),
    "YSL Y EDP": require("../../assets/fragrances/ysledp.png"),
    "Valentino Uomo Born in Roma": require("../../assets/fragrances/BORedp.png"),
    "Montblanc Legend Spirit": require("../../assets/fragrances/legendspirit.png"),
    "Dior Homme Intense": require("../../assets/fragrances/hommeintense.png"),
    "Le Male Le Parfum": require("../../assets/fragrances/lemaleleparfum.png"),
    "Versace Eros EDP": require("../../assets/fragrances/erosedp.png"),
    "Burberry Hero": require("../../assets/fragrances/hero.png"),
    "Nautica Voyage": require("../../assets/fragrances/voyage.png"),
    "Acqua di Gio Profumo": require("../../assets/fragrances/aquadigio.png"),
    "Carolina Herrera Bad Boy": require("../../assets/fragrances/badboy.png"),
    "Armani Code EDT": require("../../assets/fragrances/armanicode.png"),
    "Prada L’Homme": require("../../assets/fragrances/l'homme.png"),
    "Mercedes-Benz Club Black": require("../../assets/fragrances/codeblack.png"),
    "Abercrombie Fierce": require("../../assets/fragrances/abercrombiefitch.png"),
    "Cedrat Boise": require("../../assets/fragrances/cedratboise.png"),
    "Initio Side Effect": require("../../assets/fragrances/sideeffect.png"),
    "Xerjoff Urba Pura": require("../../assets/fragrances/urbapura.png"),
"Xerjoff Accento": require("../../assets/fragrances/accento.png"),
"Xerjoff Naxos": require("../../assets/fragrances/naxos.png"),
"Xerjoff Erba Gold": require("../../assets/fragrances/erbagold.png"),
"Xerjoff Torino 21": require("../../assets/fragrances/torino21.png"),
"Xerjoff Torino 22": require("../../assets/fragrances/torino22.png"),
"Xerjoff Torino 24": require("../../assets/fragrances/torino24.png"),
// INITIO FRAGRANCES
"Initio Atomic Rose": require("../../assets/fragrances/atomicrose.png"),
"Initio Absolute Aphrodisiac": require("../../assets/fragrances/absoluteaphrodisiac.png"),
"Initio Oud for Greatness": require("../../assets/fragrances/oudforgreatness.png"),
"Initio Psychedelic Love": require("../../assets/fragrances/psychedeliclove.png"),
"Initio Rehab": require("../../assets/fragrances/rehab.png"),
"Initio Paragon": require("../../assets/fragrances/paragon.png"),
"Initio Can't Get Enough": require("../../assets/fragrances/cantgetenough.png"),
"Initio Musk Therapy": require("../../assets/fragrances/musktherapy.png"),
    // PARFUMS DE MARLY
    "Parfums de Marly Althair": require("../../assets/fragrances/althair.png"),
    "Parfums de Marly Greenley": require("../../assets/fragrances/greenley.png"),
    "Parfums de Marly Sedley": require("../../assets/fragrances/sedley.png"),
    "Parfums de Marly Oajan": require("../../assets/fragrances/oajan.png"),
    "Parfums de Marly Layton": require("../../assets/fragrances/layton.png"),
    "Parfums de Marly Haltane": require("../../assets/fragrances/haltane.png"),
  // CREED
  "Creed Aventus": require("../../assets/fragrances/aventus.png"),
  "Creed Aventus Absolu": require("../../assets/fragrances/aventusabsolu.png"),
  "Creed Silver Mountain Water": require("../../assets/fragrances/silvermountainwater.png"),
  "Creed Original Vetiver": require("../../assets/fragrances/originalvetiver.png"),
  "Creed Millesime Imperial": require("../../assets/fragrances/millesimeimperial.png"),
  "Creed Erolfa": require("../../assets/fragrances/erolfa.png"),
  "Creed Green Irish Tweed": require("../../assets/fragrances/greenirishtweed.png"),
  "Creed Virgin Island Water": require("../../assets/fragrances/virginislandwater.png"),

  // VALENTINO
  "Valentino Uomo Yellow Dream": require("../../assets/fragrances/yellowdream.png"),

   // 🔥 NEW 15 BUDGET FRAGRANCES
  "Montblanc Individuel": require("../../assets/fragrances/individuel.png"),
  "CK One Shock": require("../../assets/fragrances/ckoneshock.png"),
  "Azzaro Chrome": require("../../assets/fragrances/chrome.png"),
  "Azzaro Wanted": require("../../assets/fragrances/wanted.png"),
  "Perry Ellis 360 Red": require("../../assets/fragrances/360red.png"),
  "Bentley for Men Intense": require("../../assets/fragrances/bentleyintense.png"),
  "Davidoff Cool Water": require("../../assets/fragrances/coolwater.png"),
  "Guess Seductive Homme": require("../../assets/fragrances/guessseductive.png"),
  "Cuba Gold": require("../../assets/fragrances/cubagold.png"),
  "Hollister Wave": require("../../assets/fragrances/hollisterwave.png"),
  "Antonio Puig Quorum": require("../../assets/fragrances/quorum.png"),
  "Jaguar Classic Black": require("../../assets/fragrances/jaguarclassicblack.png"),
  "Ferragamo F Black": require("../../assets/fragrances/fblack.png"),
  "Polo Blue EDT": require("../../assets/fragrances/poloblue.png"),
  // --- NEW SQL FRAGRANCES FOR INDEX SCREEN ---

"Versace Pour Homme": require("../../assets/fragrances/versacepourhomme.png"),
"Versace Man Eau Fraiche": require("../../assets/fragrances/versacemaneaufraiche.png"),
"Gucci Guilty Black": require("../../assets/fragrances/guiltyblack.png"),
"Gucci Guilty Pour Homme EDT": require("../../assets/fragrances/gucciguiltyedt.png"),
"Jean Paul Gaultier Ultra Male": require("../../assets/fragrances/ultramale.png"),
"Paco Rabanne Phantom EDT": require("../../assets/fragrances/phantom.png"),
"Paco Rabanne Invictus": require("../../assets/fragrances/invictus.png"),
"Invictus Aqua (2018)": require("../../assets/fragrances/invictusaqua.png"),
"Armani Code Profumo": require("../../assets/fragrances/codeprofumo.png"),
"Montblanc Explorer": require("../../assets/fragrances/explorer.png"),
"Hugo Boss Bottled": require("../../assets/fragrances/bossbottled.png"),
"Hugo Boss Bottled Night": require("../../assets/fragrances/bossbottlednight.png"),
"Dolce & Gabbana The One EDP": require("../../assets/fragrances/theoneedp.png"),
"Dolce & Gabbana Light Blue": require("../../assets/fragrances/lightblue.png"),
"Prada L’Homme Intense": require("../../assets/fragrances/lhommeintense.png"),
"Valentino Uomo Born in Roma Coral Fantasy": require("../../assets/fragrances/coralfantasy.png"),
"Valentino BOR Intense": require("../../assets/fragrances/valentinoborintense.png"),
"Valentino Uomo Noir Absolu": require("../../assets/fragrances/valentinonoirabsolu.png"),
"Paco Rabanne One Million Lucky": require("../../assets/fragrances/onemillionlucky.png"),
"Jean Paul Gaultier Le Beau": require("../../assets/fragrances/lebeau.png"),
"Ralph Lauren Polo Red EDT": require("../../assets/fragrances/polored.png"),
"Jean Paul Gaultier Le Male Elixir": require("../../assets/fragrances/lemaleelixir.png"),
"Carolina Herrera 212 VIP Men": require("../../assets/fragrances/212vipmen.png"),
"Maison Margiela Replica Jazz Club": require("../../assets/fragrances/jazzclub.png"),
"Maison Margiela Replica By the Fireplace": require("../../assets/fragrances/bythefireplace.png"),
"Maison Margiela Replica Lazy Sunday Morning": require("../../assets/fragrances/lazysundaymorning.png"),
"Maison Margiela Replica Bubble Bath": require("../../assets/fragrances/bubblebath.png"),
"Maison Margiela Replica From the Garden": require("../../assets/fragrances/fromthegarden.png"),
"Maison Margiela Replica Coffee Break": require("../../assets/fragrances/coffeebreak.png"),
"Stronger With You Absolutely": require("../../assets/fragrances/strongerwithyouabsolutely.png"),
"Stronger With You Intensely": require("../../assets/fragrances/strongerwithyouintensely.png"),
"Stronger With You Parfum": require("../../assets/fragrances/strongerwithyouparfum.png"),


  };
  

  const fragranceFacts = [
    "Colder temperatures reduce projection, so fragrances wear closer to the skin in winter.",
    "Citrus notes fade the fastest because their molecules evaporate quickly.",
    "Wearing fragrance on moisturized skin makes it last significantly longer.",
    "Vanilla is one of the most universally loved notes worldwide.",
    "Fragrance can smell different on each person due to skin chemistry.",
    "Pulse points like the neck and wrists help heat up a fragrance.",
    "Spraying clothes makes fragrance last longer, but avoid delicate fabrics.",
    "Ambroxan is the key molecule behind many modern designer scents.",
    "Fresh fragrances perform better in warm weather because heat boosts projection.",
    "Your nose can go nose-blind to your own fragrance after 20–30 minutes.",
    "Layering complimentary scents can create a unique signature smell.",
    "Darker fragrances like amber and oud last longer due to heavier molecules.",
    "Colognes smell different on each person depending on diet and hormones.",
    "Cedarwood is often used to add depth and masculinity to a fragrance.",
    "High-quality ingredients don't always mean stronger performance.",
    "Fragrance oil concentration determines strength: parfum > EDP > EDT.",
    "Oud is one of the most expensive perfume ingredients in the world.",
    "The average person can identify around 10,000 different smells.",
    "Heat helps diffusion — fragrances project best around 75–85°F.",
    "Spraying behind the ears helps scent radiate without overprojecting.",
    "Amber fragrances are popular because they linger for hours.",
    "Your diet impacts your scent — spicy foods can intensify it.",
    "Fragrances evolve in three stages: top, mid, and base notes.",
    "A fragrance can smell too sweet on hot skin due to extra diffusion.",
    "Niche fragrances often use more unique ingredients and blends.",
    "The same cologne can last 3 hours on dry skin and 10 on oily skin.",
    "Fragrance molecules rise with heat, so chest sprays project upward.",
    "Spraying inside your shirt traps scent and increases longevity.",
    "Musk is one of the oldest perfume ingredients, originally animal-derived.",
    "Green fragrances mimic natural, outdoorsy botanical notes.",
    "Fresh out of the shower is the best time to apply fragrance.",
    "Perfume bottles should be stored away from sunlight to prevent breakdown.",
    "Colognes with aldehydes smell “clean” or “soapy.”",
    "Leather notes come from using birch tar or synthetic substitutes.",
    "Most blue fragrances use ambroxan for their signature DNA.",
    "Gourmand fragrances smell edible — vanilla, caramel, chocolate.",
    "Coconut and citrus combinations are ideal for summer.",
    "Woods and spices perform better in fall and winter.",
    "Projection is how far scent radiates; sillage is the scent trail.",
    "Heat and humidity amplify sweet scents — sometimes too much.",
    "Applying fragrance to hair can help scent last all day (use lightly).",
    "Skin pH levels affect how long a scent lasts.",
    "The first synthetic perfume molecule was created in the 1800s.",
    "Bergamot is one of the most commonly used top notes.",
    "Herbal scents like sage and mint add freshness to masculine perfumes.",
    "Patchouli is earthy and woody — a classic base note.",
    "Perfume can last 5–10 years if stored properly.",
    "A signature scent is one people associate specifically with you.",
    "Dabbing (not rubbing) prevents top notes from evaporating too fast.",
    "Certain fragrances perform better sprayed higher on the body.",
  ];

  const today = new Date();
  const factIndex = today.getDate() % fragranceFacts.length;
  const factOfTheDay = fragranceFacts[factIndex];

  // 🔥 MOVE QUESTIONS TO TOP (before handlers)
  const questions = [
    {
      title: "What's your age range?",
      subtitle: 'This helps us understand your lifestyle and preferences',
      options: [
        { label: 'Teen', description: 'Young & curious' },
        { label: '20–25', description: 'Adventurous & social' },
        { label: '25–30', description: 'Confident & ambitious' },
        { label: '30–35', description: 'Established & experienced' },
        { label: '35+', description: 'Refined & classic' },
      ],
    },
    {
      title: 'When will you primarily wear this fragrance?',
      subtitle: 'Different occasions call for different scent profiles',
      options: [
        { label: 'Daily wear', description: 'Office, casual outings' },
        { label: 'Evening events', description: 'Dinner, parties' },
        { label: 'Special occasions', description: 'Dates, celebrations' },
        { label: 'Versatile', description: 'Day to night' },
      ],
    },
    {
      title: 'Which season do you want this fragrance for?',
      subtitle: 'Seasonal preferences affect scent projection and longevity',
      options: [
        { label: 'Spring', description: 'Fresh & blooming' },
        { label: 'Summer', description: 'Light & refreshing' },
        { label: 'Fall', description: 'Warm & cozy' },
        { label: 'Winter', description: 'Rich & enveloping' },
      ],
    },
    {
      title: 'What vibe are you going for?',
      subtitle: 'Your personality should reflect in your signature scent',
      options: [
        { label: 'Confident', description: 'Strong, memorable' },
        { label: 'Rich', description: 'Luxurious, complex' },
        { label: 'Romantic', description: 'Warm, inviting' },
        { label: 'Seductive', description: 'Intriguing, alluring' },
        { label: 'Fresh', description: 'Clean, energizing' },
        { label: 'Casual', description: 'Easygoing, light' },
        { label: 'Sweet', description: 'Playful, comforting' },
      ],
    },
    {
      title: 'How strong should your fragrance be?',
      subtitle: 'Projection and longevity preferences',
      options: [
        { label: 'Light & Subtle', description: 'Close to skin, intimate' },
        { label: 'Moderate', description: 'Noticeable but not overwhelming' },
        { label: 'Strong & Lasting', description: 'High projection, long-lasting' },
        { label: 'Beast Mode', description: 'Maximum performance' },
      ],
    },
    {
      title: "What's your budget range?",
      subtitle: 'Quality fragrances exist at every price point',
      options: [
        { label: 'Under $50', description: 'Great value options' },
        { label: '$50-150', description: 'Designer fragrances' },
        { label: '$150-300', description: 'Luxury fragrances' },
        { label: '$300+', description: 'Niche & premium brands' },
      ],
    },
    {
  title: "Which scent families do you enjoy most?",
  subtitle: "Pick the fragrance styles you naturally lean toward",
  options: [
    { label: "Fresh", description: "Clean, bright, uplifting" },
    { label: "Citrus", description: "Lemon, bergamot, zesty" },
    { label: "Aquatic", description: "Cool, oceanic, summery" },
    { label: "Aromatic", description: "Herbal, green, masculine" },
    { label: "Sweet", description: "Playful, warm, youthful" },
    { label: "Vanilla", description: "Creamy, sensual, comforting" },
    { label: "Amber", description: "Warm, resinous, cozy" },
    { label: "Woody", description: "Earthy, deep, masculine" },
    { label: "Green", description: "Leafy, outdoorsy, natural" },
    { label: "Fruity", description: "Juicy, bright, modern" },
    { label: "Spicy", description: "Warm, exotic, bold" },
    { label: "Smoky", description: "Dark, mysterious, evening" },
    { label: "Powdery (Iris)", description: "Soft, elegant, luxurious" },
    { label: "Tobacco", description: "Rich, warm, masculine depth" },
  ],
},
{
  title: "What's your skin type?",
  subtitle: "This helps us estimate how long a fragrance will last on you",
  options: [
    { label: "Dry Skin", description: "Fragrances fade faster on dry skin" },
    { label: "Normal Skin", description: "Balanced longevity and projection" },
    { label: "Oily Skin", description: "Fragrances last longer and project more" },
    { label: "I’m not sure", description: "We'll handle this automatically" },
  ],
},

{
  title: "How long do you want the fragrance to last?",
  subtitle: "Your longevity preference helps narrow down the perfect match",
  options: [
    { label: "3–5 hours", description: "Light daytime wear" },
    { label: "6–8 hours", description: "Standard workday performance" },
    { label: "8–12 hours", description: "Stronger, longer-lasting scents" },
    { label: "12+ hours", description: "All-day beast performance" },
  ],
},
{
  title: "Which scent notes do you enjoy the MOST?",
  subtitle: "Pick the notes you naturally gravitate toward",
  options: [
    { label: "Fresh & Citrus", description: "Lemon, bergamot, grapefruit" },
    { label: "Sweet & Gourmand", description: "Vanilla, tonka, caramel" },
    { label: "Woody & Spicy", description: "Cedar, sandalwood, pepper" },
    { label: "Amber & Warm", description: "Amber, resins, balsams" },
    { label: "Aromatic & Clean", description: "Lavender, sage, herbs" },
  ],
},
{
  title: "Do you prefer fresh or sweet fragrances?",
  subtitle: "This helps narrow down your scent family",
  options: [
    { label: "Very Fresh", description: "Clean, crisp, energizing" },
    { label: "Mostly Fresh", description: "Light with a touch of sweetness" },
    { label: "Balanced", description: "Fresh & sweet equally" },
    { label: "Mostly Sweet", description: "Warm and inviting" },
    { label: "Very Sweet", description: "Rich, sugary, gourmand" },
  ],
},
{
  title: "How unique do you want your fragrance to be?",
  subtitle: "Choose how daring or safe you want your scent profile",
  options: [
    { label: "Very unique", description: "Stand out, niche-style scents" },
    { label: "Somewhat unique", description: "Different but still wearable" },
    { label: "Mass appealing", description: "Universally liked, safe choice" },
    { label: "No preference", description: "I’m open to anything" },
  ],
},





   
  ];

  // 🔥 ALL STATES MUST BE BEFORE ANY RETURNS
  const [quizVisible, setQuizVisible] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [weeklyFragrance, setWeeklyFragrance] = useState<any>(null);

  // 🔥 MOVE USEEFFECT ABOVE RETURN
  useEffect(() => {
    const fetchWeeklyFragrance = async () => {
      const { data, error } = await supabase
        .from("Fragrances")
        .select("*");

      if (error || !data || data.length === 0) return;

      const sorted = data.sort((a, b) => a.id - b.id);

      const getWeekNumber = (date: Date) => {
        const oneJan = new Date(date.getFullYear(), 0, 1);
        const diff = date.getTime() - oneJan.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
      };

      const week = getWeekNumber(new Date());
      const index = week % sorted.length;
      setWeeklyFragrance(sorted[index]);
    };

    fetchWeeklyFragrance();
  }, []);

  // 🔥 EARLY RETURN MUST COME AFTER ALL HOOKS
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // 🔥 HANDLER FUNCTIONS (now safe)
  const handleQuizOpen = () => setQuizVisible(true);

  const handleQuizClose = () => {
    setQuizVisible(false);
    setQuestionIndex(0);
    setSelectedOption(null);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[questionIndex] = index;
      return updated;
    });
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizVisible(false);
      setQuestionIndex(0);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedOption(null);
    }
  };

  const currentQuestion = questions[questionIndex];
  const progress = ((questionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Sparkles size={20} color="#C7CED9" style={styles.sparkleIcon} />
          <Text style={styles.headerText}>Cologne Concierge</Text>
        </View>

<View style={{ alignItems: 'center', gap: 10, marginTop: 10, marginBottom: 20 }}>

          <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }}>
            Discover Your Perfect Scent
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#cccccc', marginTop: 4 }}>
            AI-powered fragrance recommendations tailored just for you
          </Text>
        </View>

        <Text style={styles.sectionHeaderCentered}>Find Your Scent Match</Text>

 <TouchableOpacity style={[styles.quizButton, { marginTop: 20, marginBottom: 30 }]} onPress={handleQuizOpen}>

          <Sparkles size={16} color="#000" style={styles.sparkleIcon} />
          <Text style={styles.quizButtonText}>Take the Quiz</Text>
        </TouchableOpacity>

        <View style={styles.cardRow}>
          {weeklyFragrance && (
            <View style={styles.card}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
  <Image 
    source={require("../../assets/icons/star.png")}


    style={{ width: 22, height: 22, tintColor: "#C7CED9", marginRight: 6 }}
  />
  <Text style={styles.cardHeader}>Fragrance of the Week</Text>
</View>


              <Image
                source={fragranceImages[weeklyFragrance.name]}
                style={{ width: "100%", height: 140, borderRadius: 10, marginBottom: 10 }}
                resizeMode="contain"
              />

              <Text style={styles.cardTitle}>{weeklyFragrance.name}</Text>

              <Text style={styles.cardText}>
                {weeklyFragrance.vibe || weeklyFragrance.occasion || "A great choice this week!"}
              </Text>
            </View>
          )}

          <View style={styles.card}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
  <Image 
    source={require("../../assets/icons/book.png")}


    style={{ width: 22, height: 22, tintColor: "#C7CED9", marginRight: 6 }}
  />
  <Text style={styles.cardHeader}>Fragrance Fact</Text>
</View>

            <Text style={styles.cardText}>{factOfTheDay}</Text>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={quizVisible} onRequestClose={handleQuizClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Sparkles size={18} color="#C7CED9" style={{ marginRight: 8 }} />
              <Text style={styles.modalTitle}>Fragrance Quiz</Text>
              <TouchableOpacity onPress={handleQuizClose} style={{ marginLeft: 'auto' }}>
                <Text style={{ color: '#ccc', fontSize: 18 }}>×</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.progressBar, { width: `${progress}%` }]} />

            <View style={styles.questionWrapper}>
              <Text style={styles.questionNumber}>Question {questionIndex + 1} of {questions.length}</Text>
              <Text style={styles.questionText}>{currentQuestion.title}</Text>
              <Text style={styles.questionSubtext}>{currentQuestion.subtitle}</Text>
            </View>
            {/* FLEX WRAPPER FOR SCROLL SECTION */}
{/* ANSWER LIST AREA — FIXED HEIGHT + CLEAN SCROLLING */}
{/* ANSWER LIST AREA — FIXED HEIGHT + CLEAN SCROLLBAR */}
<View style={{ flex: 1, marginBottom: 10, flexDirection: "row" }}>
  
  {/* OPTIONS LIST */}
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ paddingBottom: 10 }}
    showsVerticalScrollIndicator={false}
    bounces={false}
    scrollEnabled={currentQuestion.options.length > 4}
    onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
    onContentSizeChange={(w, h) => setContentHeight(h)}
    onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    scrollEventThrottle={16}
  >
    {currentQuestion.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.quizOption,
          selectedOption === index && { backgroundColor: "#333" }
        ]}
        onPress={() => {
          handleOptionSelect(index);
          Haptics.selectionAsync();
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.quizOptionText}>{option.label}</Text>
          {selectedOption === index && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.quizOptionDesc}>{option.description}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>

  {/* SCROLLBAR — ONLY IF OPTIONS > 4 */}
  {currentQuestion.options.length > 4 && (
    <View style={{
      width: 6,
      alignItems: "center",
      justifyContent: "flex-start",
      marginLeft: 6,
    }}>
      <View
        style={[
          styles.scrollbarThumb,
          {
            height: containerHeight * (containerHeight / contentHeight),
            transform: [
              {
                translateY:
                  scrollY * (containerHeight / contentHeight)
              }
            ]
          }
        ]}
      />
    </View>
  )}

</View>







            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.prevButton} onPress={handlePrevious}>
                <Text style={styles.prevButtonText}>← Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.nextButton,
                  { backgroundColor: selectedOption !== null ? '#9FA8B9' : '#555' }
                ]}
                onPress={() => {
                  if (questionIndex === questions.length - 1) {
                    setQuizVisible(false);
                    setQuestionIndex(0);
                    setSelectedOption(null);

                    const readableAnswers = userAnswers.map((selectedIndex, i) => {
                      return questions[i].options[selectedIndex]?.label || "Unknown";
                    });

                    const answerObject = Object.fromEntries(
                      readableAnswers.map((value, i) => [`q${i + 1}`, value])
                    );

                    console.log("Submitting answers:", answerObject);

                    router.push({
                      pathname: '/Recommendations',
                      params: {
                        answers: JSON.stringify(answerObject),
                      },
                    });

                  } else {
                    handleNext();
                  }
                }}
                disabled={selectedOption === null}
              >
                <Text style={styles.nextButtonText}>
                  {questionIndex === questions.length - 1 ? 'Get Matched' : 'Next →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionHeaderCentered: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  sectionContainerShiftedFurtherDown: {
    marginVertical: 40,
  },

container: {
  flex: 1,
  backgroundColor: '#000',
  paddingTop: 40,
  paddingBottom: 40,
},

contentContainer: {
  padding: 20,
  paddingBottom: 40, // keeps space above tab bar
},


  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sparkleIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  subHeaderContainer: {
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  subText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter_700Bold',
    marginVertical: 12,
  },
  quizButton: {
    backgroundColor: '#C7CED9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quizButtonText: {
    marginLeft: 8,
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
cardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 14,
  marginTop: 20,
},

card: {
  backgroundColor: '#1a1a1a',
  padding: 16,
  borderRadius: 12,
  flex: 1,
  maxWidth: "48%",
},

  cardHeader: {
    color: '#C7CED9',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  cardText: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: 20,
  },
modalContent: {
  backgroundColor: '#111',
  padding: 20,
  paddingBottom: 20,
  borderRadius: 12,
  height: 600,
  flexDirection: 'column',
},



  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#C7CED9',
    borderRadius: 3,
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 6,
  },
  questionText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  questionSubtext: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  quizOption: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  quizOptionText: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Inter_700Bold',
  },
  quizOptionDesc: {
    fontSize: 12,
    color: '#aaa',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prevButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  prevButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  nextButton: {
    backgroundColor: '#C7CED9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: 'black',
  },
  quizNextText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: 'black',
  },
questionWrapper: {
  alignItems: 'center',
  marginBottom: 16,
  marginTop: 12,
  padding: 10,
  height: 120,  // ← FIXED SO SIZE NEVER CHANGES
  justifyContent: 'center',
},





fadeBottom: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 40,
  backgroundColor: 'rgba(17,17,17,0)', // transparent placeholder
},


checkmark: {
  color: '#C7CED9',
  fontSize: 18,
  marginLeft: 8,
  fontWeight: 'bold',
},
scrollbarTrack: {
  width: 6,              // scrollbar column width
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 2,
},


scrollbarThumb: {
  width: 3,
  backgroundColor: '#C7CED9',
  borderRadius: 2,
},




});




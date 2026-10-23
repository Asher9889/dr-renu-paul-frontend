import type {
  BlogAuthor,
  BlogHeadingBlock,
  BlogPost,
  BlogTagSummary,
} from "@/features/blog/types/blog";

export const ALL_BLOG_TAG = "All";

export const blogAuthor: BlogAuthor = {
  name: "Dr. Renu Paul",
  role: "MD (Hom.) · Senior Homoeopath",
  avatar: {
    src: "/dr-renu/dr-renu-paul.jpg",
    alt: "Portrait of Dr. Renu Paul",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "holistic-management-of-pcod",
    title: "Holistic Management of PCOD Through Homoeopathy",
    description:
      "A constitutional approach to polycystic ovarian disease — beyond symptom suppression.",
    date: { iso: "2026-03-12", label: "12 March 2026" },
    readTime: "6 min read",
    tags: ["Women's Health"],
    thumbnail: {
      src: "/images/blog/pcod.svg",
      alt: "Botanical line illustration for the PCOD essay",
      caption: "A constitutional view of polycystic ovarian disease.",
    },
    body: [
      {
        type: "paragraph",
        text: "Polycystic ovarian disease is usually described as a hormonal problem. In practice, it is a pattern — of irregular cycles, changing skin, stubborn weight, and a body that feels as though it is working against itself. The diagnosis is useful, but it does not tell the whole story of the woman living with it.",
      },
      {
        type: "heading",
        id: "the-pattern-behind-the-symptoms",
        text: "The pattern behind the symptoms",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Two women with the same scan report may arrive with entirely different histories. One may be anxious and sleepless; another may be calm but deeply fatigued. One may crave warmth; another may feel worse in it. Homoeopathy reads these differences as the individual expression of the same disturbance.",
      },
      {
        type: "paragraph",
        text: "That is why the first consultation is long. We are not only asking about ovaries. We are asking how the body has been keeping itself upright — how it sleeps, digests, responds to stress, and recovers from illness.",
      },
      {
        type: "heading",
        id: "what-constitutional-care-asks",
        text: "What constitutional care asks",
        level: 2,
      },
      {
        type: "paragraph",
        text: "A constitutional remedy is chosen for the whole person rather than for a single laboratory finding. The aim is not to replace endocrine assessment or appropriate medical monitoring. It is to support the system in finding its own order again.",
      },
      {
        type: "list",
        items: [
          "The history of the cycles, including what changed and when.",
          "The quality of sleep, appetite, and energy through the month.",
          "How stress is held in the body, and what relieves it.",
          "The family pattern, previous treatment, and the patient's own goals.",
        ],
      },
      {
        type: "quote",
        text: "The remedy is chosen for the woman, not only for the ovary.",
        attribution: "Dr. Renu Paul, MD (Hom.)",
      },
      {
        type: "heading",
        id: "food-rhythm-and-rest",
        text: "Food, rhythm and rest",
        level: 2,
      },
      {
        type: "paragraph",
        text: "No remedy can outwork a body that is never rested. In parallel with constitutional treatment, we look at the ordinary scaffolding of health: regular meals, gentle movement, a dependable sleep window, and a realistic relationship with stress.",
      },
      {
        type: "list",
        items: [
          "Eat at roughly the same hours, with protein at each main meal.",
          "Choose movement that leaves you feeling more capable, not depleted.",
          "Protect the hour before sleep from screens and unfinished work.",
          "Track cycles simply; patterns become visible when they are written down.",
        ],
      },
      {
        type: "heading",
        id: "a-patient-pace",
        text: "A patient pace",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Improvement in a chronic pattern is rarely linear. Cycles may soften before skin changes, and energy may return before weight shifts. The work is to observe honestly, adjust carefully, and allow the body enough time to respond. That patience is part of the treatment, not a delay before it.",
      },
    ],
  },
  {
    slug: "constitutional-treatment-for-autoimmune-stress",
    title: "Constitutional Treatment for Autoimmune & Stress Health",
    description:
      "How chronic stress feeds autoimmune patterns, and why the remedy must match the person.",
    date: { iso: "2026-02-18", label: "18 February 2026" },
    readTime: "7 min read",
    tags: ["Mind & Mood", "Autoimmune"],
    thumbnail: {
      src: "/images/blog/autoimmune.svg",
      alt: "Botanical line illustration for the autoimmune and stress essay",
      caption: "The long conversation between stress and immunity.",
    },
    body: [
      {
        type: "paragraph",
        text: "Autoimmune conditions are often experienced as a body at war with itself. The language is dramatic, but the lived reality is usually quieter: fatigue that arrives without warning, joints that ache, skin that flares, and a nervous system that never quite settles.",
      },
      {
        type: "heading",
        id: "when-the-body-turns-inward",
        text: "When the body turns inward",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The immune system is not a separate machinery. It listens to sleep, grief, work, relationships, and the nervous system's sense of safety. When stress becomes chronic, that listening can become distorted. The body keeps responding to a threat that has already passed.",
      },
      {
        type: "paragraph",
        text: "This does not mean that stress causes every autoimmune condition. It means that stress is often part of the weather in which the condition lives. Treating only the laboratory markers while ignoring the weather leaves the pattern intact.",
      },
      {
        type: "heading",
        id: "stress-as-a-maintaining-cause",
        text: "Stress as a maintaining cause",
        level: 2,
      },
      {
        type: "paragraph",
        text: "In case-taking, we look for the stress that has become ordinary — the work that follows a person home, the vigilance that never switches off, the grief that has not been given room. These are not psychological explanations layered on top of a physical disease. They are part of the same system.",
      },
      {
        type: "list",
        items: [
          "When did the first symptoms appear, and what else was happening then?",
          "What makes the condition better or worse — rest, warmth, company, solitude?",
          "How does the person describe their own energy, mood, and sleep?",
          "What has already been tried, and what did the body do in response?",
        ],
      },
      {
        type: "quote",
        text: "The immune system keeps a record of everything the person has had to endure.",
        attribution: "Dr. Renu Paul, MD (Hom.)",
      },
      {
        type: "heading",
        id: "the-constitutional-conversation",
        text: "The constitutional conversation",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The remedy is selected for the person's whole pattern — not for the diagnosis alone. Two patients with the same named condition may need very different remedies because their bodies express disturbance differently. The constitutional conversation is how we find that difference.",
      },
      {
        type: "paragraph",
        text: "Medical management continues where it is needed. Homoeopathic care works alongside it, with the aim of reducing the frequency and intensity of flares and supporting a more stable baseline.",
      },
      {
        type: "heading",
        id: "what-changes-first",
        text: "What changes first",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Often sleep improves before the markers do. Patients may notice steadier energy, less reactivity, or a flare that resolves more quickly. These are meaningful changes even when they are not yet visible on a report. Over time, the goal is a body that is less easily thrown off balance.",
      },
    ],
  },
  {
    slug: "gentle-paediatric-remedies",
    title: "Gentle Paediatric Remedies for Chronic Ailments",
    description:
      "Ear, throat and tonsil concerns in children, treated gently and constitutionally.",
    date: { iso: "2026-01-27", label: "27 January 2026" },
    readTime: "5 min read",
    tags: ["Child Care"],
    thumbnail: {
      src: "/images/blog/paediatric.svg",
      alt: "Botanical line illustration for the paediatric essay",
      caption: "Care that respects the child's own pace.",
    },
    body: [
      {
        type: "paragraph",
        text: "Children are not small adults. Their symptoms arrive quickly, change quickly, and are often expressed through behaviour before they can be put into words. A child with recurrent throat infections may also be the child who clings at bedtime, refuses certain foods, or becomes irritable before an episode.",
      },
      {
        type: "heading",
        id: "a-different-scale-of-care",
        text: "A different scale of care",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Paediatric case-taking is slower and more observational. We ask parents what they have noticed, but we also watch the child: how they sit, how they respond to the room, what they do when they are tired. The remedy has to match the child, not only the diagnosis.",
      },
      {
        type: "heading",
        id: "recurrent-tonsillitis",
        text: "Recurrent tonsillitis",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Recurrent tonsillitis is a common reason families seek homoeopathic care. Between episodes, the child may seem perfectly well. During an episode, there may be fever, pain, poor appetite, and disturbed sleep. The constitutional picture helps us understand why this child's throat is the place where the disturbance settles.",
      },
      {
        type: "list",
        items: [
          "The timing and frequency of episodes, and what precedes them.",
          "The child's temperament, sleep, appetite, and response to comfort.",
          "Any history of antibiotics, surgery, allergies, or chronic discharge.",
          "The family's own pattern of similar complaints.",
        ],
      },
      {
        type: "quote",
        text: "The remedy should meet the child as a person, not merely the infected throat.",
        attribution: "Dr. Renu Paul, MD (Hom.)",
      },
      {
        type: "heading",
        id: "the-remedy-and-the-child",
        text: "The remedy and the child",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Constitutional treatment aims to reduce the tendency to recur. It does not replace urgent medical care when a child is unwell, and it does not ask parents to wait through a serious infection. It works alongside ordinary paediatric assessment, with the goal of a steadier, more resilient child between episodes.",
      },
      {
        type: "heading",
        id: "working-with-parents",
        text: "Working with parents",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Parents are the best observers a physician has. A simple diary of episodes, sleep, appetite, and behaviour is often more useful than a long list of symptoms recalled under pressure. Treatment becomes a shared practice of noticing, and the child is cared for by a calmer, more informed household.",
      },
    ],
  },
  {
    slug: "understanding-migraine-constitutional-approach",
    title: "Understanding Migraine: A Constitutional Approach",
    description:
      "Why the same headache asks different questions in different people.",
    date: { iso: "2025-12-09", label: "9 December 2025" },
    readTime: "6 min read",
    tags: ["Chronic Care", "Mind & Mood"],
    thumbnail: {
      src: "/images/blog/migraine.svg",
      alt: "Botanical line illustration for the migraine essay",
      caption: "Reading the signature before the attack.",
    },
    body: [
      {
        type: "paragraph",
        text: "A migraine is not simply a bad headache. It is a whole-body event with a beginning, a middle, and an aftermath. Light may become unbearable, the stomach may turn, and the mind may feel wrapped in wool for a day after the pain has gone.",
      },
      {
        type: "heading",
        id: "beyond-the-attack",
        text: "Beyond the attack",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Most treatment focuses on the attack itself. Constitutional care is equally interested in the hours and days before it. The prodrome — the subtle change in mood, appetite, energy, or perception — is often the most useful part of the pattern.",
      },
      {
        type: "paragraph",
        text: "Two patients may both describe a throbbing right-sided headache. But one becomes irritable and restless before it, while the other becomes quiet and cold. One feels better with pressure; the other cannot bear to be touched. These differences matter.",
      },
      {
        type: "heading",
        id: "the-pre-headache-signature",
        text: "The pre-headache signature",
        level: 2,
      },
      {
        type: "paragraph",
        text: "We ask patients to notice the earliest signal. Is it a flicker of light, a craving, a tightening in the neck, a sudden flatness of mood? Mapping this signature helps us understand the direction the disturbance is taking, and how to meet it.",
      },
      {
        type: "list",
        items: [
          "The time of day and the day of the week an attack begins.",
          "Food, sleep, hormones, weather, and stress in the preceding hours.",
          "The quality and location of the pain, and what relieves it.",
          "The after-effects — exhaustion, hunger, clarity, or low mood.",
        ],
      },
      {
        type: "heading",
        id: "treatment-between-episodes",
        text: "Treatment between episodes",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The constitutional remedy is given in the quiet interval as well as during an attack. The aim is to reduce the frequency and intensity of episodes and to make the nervous system less easily tipped into the migraine state. Acute medication remains available when it is needed.",
      },
      {
        type: "heading",
        id: "keeping-a-simple-record",
        text: "Keeping a simple record",
        level: 2,
      },
      {
        type: "paragraph",
        text: "A small notebook is enough. Record the date, the first sign, the pain, what you took, and how the next day felt. Patterns that are invisible in memory become clear on paper. That record becomes the ground on which treatment is adjusted.",
      },
    ],
  },
  {
    slug: "restoring-sleep-without-sedation",
    title: "Restoring Sleep Without Sedation",
    description:
      "A quiet look at insomnia, sleep hygiene, and the constitutional remedy.",
    date: { iso: "2025-11-14", label: "14 November 2025" },
    readTime: "5 min read",
    tags: ["Lifestyle"],
    thumbnail: {
      src: "/images/blog/sleep.svg",
      alt: "Botanical line illustration for the sleep essay",
      caption: "The evening is a practice, not a switch.",
    },
    body: [
      {
        type: "paragraph",
        text: "Sleep is not a switch that can be forced. It arrives when the body feels safe enough to let go. When it does not arrive, the usual advice — darker room, no screens, earlier bedtime — is sensible, but it is rarely the whole answer.",
      },
      {
        type: "heading",
        id: "sleep-is-not-a-switch",
        text: "Sleep is not a switch",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Chronic insomnia is often a story about vigilance. The body stays on watch: for the unfinished task, the difficult conversation, the child who might call, the pain that might return. Sedation can switch off the watch temporarily, but it does not change the reason it was posted.",
      },
      {
        type: "heading",
        id: "the-evening-pattern",
        text: "The evening pattern",
        level: 2,
      },
      {
        type: "paragraph",
        text: "In constitutional case-taking, we ask what happens in the hour before bed and in the hour after waking. Does sleep come easily but wake at three? Is the mind busy or blank? Are there dreams, night sweats, or a feeling of not having slept at all? Each pattern points in a different direction.",
      },
      {
        type: "list",
        items: [
          "The time sleep begins, and the time it breaks.",
          "What the mind is doing in the dark — planning, rehearsing, remembering.",
          "Whether warmth, food, movement, or company changes the pattern.",
          "How the following day feels, regardless of hours in bed.",
        ],
      },
      {
        type: "quote",
        text: "The body does not need to be forced to sleep. It needs to be given a reason to stop keeping watch.",
        attribution: "Dr. Renu Paul, MD (Hom.)",
      },
      {
        type: "heading",
        id: "what-we-ask",
        text: "What we ask",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The constitutional remedy is chosen for the whole pattern, including the anxiety, grief, or physical discomfort that keeps the watch going. We also look at stimulants, meal timing, light, and the shape of the day. Sleep is repaired from both ends.",
      },
      {
        type: "heading",
        id: "small-repairs",
        text: "Small repairs",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Begin with one dependable anchor: a consistent wake time, a short walk in morning light, or a quiet half-hour without screens. Keep it small enough to repeat. Sleep responds to safety and rhythm more readily than to effort.",
      },
    ],
  },
  {
    slug: "eczema-and-the-constitutional-remedy",
    title: "Eczema and the Constitutional Remedy",
    description:
      "The skin as a mirror of constitutional patterns — and why suppression is not the whole answer.",
    date: { iso: "2025-10-21", label: "21 October 2025" },
    readTime: "6 min read",
    tags: ["Skin Health", "Child Care"],
    thumbnail: {
      src: "/images/blog/skin.svg",
      alt: "Botanical line illustration for the eczema essay",
      caption: "The skin as an outward expression of an inward pattern.",
    },
    body: [
      {
        type: "paragraph",
        text: "Eczema is visible in a way that many chronic conditions are not. The itch, the redness, and the shedding skin are impossible to ignore. Because it is visible, it is often treated only at the surface — with creams that quiet the flare but leave the underlying tendency untouched.",
      },
      {
        type: "heading",
        id: "the-surface-and-the-system",
        text: "The surface and the system",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The skin is not a separate organ. It is continuous with the nervous system, the gut, and the immune response. In homoeopathic case-taking, the location, timing, and character of the eruption are read together with the person's temperament, sleep, digestion, and history.",
      },
      {
        type: "heading",
        id: "itch-as-a-signal",
        text: "Itch as a signal",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Itch is its own language. Does it worsen at night, in warmth, in water, or under stress? Is the skin dry and cracked, or weepy and inflamed? Is the child irritable and restless, or quiet and withdrawn? These details help distinguish one constitutional pattern from another.",
      },
      {
        type: "list",
        items: [
          "The age at which the eruption first appeared, and how it has moved.",
          "What the skin looks and feels like between flares.",
          "The effect of food, weather, stress, and washing.",
          "The child's sleep, mood, and response to comfort.",
        ],
      },
      {
        type: "quote",
        text: "We do not treat the skin as an enemy. We ask what it is expressing.",
        attribution: "Dr. Renu Paul, MD (Hom.)",
      },
      {
        type: "heading",
        id: "care-during-a-flare",
        text: "Care during a flare",
        level: 2,
      },
      {
        type: "paragraph",
        text: "Constitutional treatment continues during a flare, but practical care matters too. Gentle cleansing, a plain moisturiser, cool compresses, and short nails can make the day more bearable. Medical treatment is not withdrawn abruptly; it is adjusted with the patient's physician as the skin settles.",
      },
      {
        type: "heading",
        id: "the-longer-view",
        text: "The longer view",
        level: 2,
      },
      {
        type: "paragraph",
        text: "The aim is not a single clear week but a steadier skin over months — fewer flares, less dependence on suppressant treatment, and a child or adult who is less exhausted by the condition. That is slow work, and it is worth doing carefully.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogTagSummaries(posts: BlogPost[]): BlogTagSummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const tagSummaries = Array.from(counts, ([tag, count]) => ({ tag, count }));
  tagSummaries.sort((left, right) => left.tag.localeCompare(right.tag));

  return [{ tag: ALL_BLOG_TAG, count: posts.length }, ...tagSummaries];
}

export function resolveBlogTag(
  value: string | string[] | undefined,
  tagSummaries: BlogTagSummary[],
): string {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (!candidate) {
    return ALL_BLOG_TAG;
  }

  const isKnownTag = tagSummaries.some(
    (summary) => summary.tag === candidate,
  );

  return isKnownTag ? candidate : ALL_BLOG_TAG;
}

export function getBlogPostsByTag(
  posts: BlogPost[],
  selectedTag: string,
): BlogPost[] {
  if (selectedTag === ALL_BLOG_TAG) {
    return posts;
  }

  return posts.filter((post) => post.tags.includes(selectedTag));
}

export function getBlogHeadings(post: BlogPost): BlogHeadingBlock[] {
  return post.body.filter(
    (block): block is BlogHeadingBlock => block.type === "heading",
  );
}

export function getRelatedBlogPosts(
  posts: BlogPost[],
  currentPost: BlogPost,
  limit = 3,
): BlogPost[] {
  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      post,
      sharedTags: post.tags.filter((tag) =>
        currentPost.tags.includes(tag),
      ).length,
    }))
    .sort((left, right) => right.sharedTags - left.sharedTags)
    .slice(0, limit)
    .map(({ post }) => post);
}

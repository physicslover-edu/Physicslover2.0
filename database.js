// বর্তমান সাল বের করার কোড (সব ক্লাসের জন্য)
const currentYearStr = new Date().getFullYear().toString();

// মেইন ডেটাবেস (Single Source of Truth)
const dbCourse = {

  // ================= CLASS 7 =================
  class7: {
    exams: {
      paribesh: [
        { id: "e7_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative Exam", linkSug: "এখানে_বিজ্ঞান_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_বিজ্ঞান_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "e7_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative Exam", linkSug: "https://drive.google.com/file/d/1HlOHICg-2PplsKhVUBPGHTobA4yX63gu/view?usp=drivesdk", linkPyq: "এখানে_বিজ্ঞান_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "e7_ex_3", bn: `৩য় সামেটিভ এক্সাম`, en: `3rd Summative Exam`, linkSug: "এখানে_বিজ্ঞান_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_বিজ্ঞান_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      onko: [
        { id: "m7_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative Exam", linkSug: "এখানে_গণিত_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m7_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative Exam", linkSug: "এখানে_গণিত_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m7_ex_3", bn: `৩য় সামেটিভ এক্সাম`, en: `3rd Summative Exam`, linkSug: "এখানে_গণিত_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    paribesh: [
      { id: "e7_c1", bn: "১) ভৌত পরিবেশ (তাপ, আলো, চুম্বক, তড়িৎ)", en: "1) Physical Environment", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c2", bn: "২) সময় ও গতি", en: "2) Time and Motion", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c3", bn: "৩) পরমানু, অনু ও রাসায়নিক বিক্রিয়া", en: "3) Atoms, Molecules and Chemical Reactions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c4", bn: "৪) পরিবেশ গঠনে পদার্থের ভূমিকা", en: "4) Role of Matter in Environment Formation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c5", bn: "৫) মানুষের খাদ্য", en: "5) Human Food", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c6", bn: "৬) পরিবেশের সজীব উপাদানের গঠনগত বৈচিত্র্য", en: "6) Structural Diversity of Living Organisms", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c7", bn: "৭) পরিবেশের সংকট ও সংরক্ষণ", en: "7) Environmental Crisis & Conservation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "e7_c8", bn: "৮) পরিবেশ ও জনস্বাস্থ্য", en: "8) Environment and Public Health", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" }
    ],
    onko: [
      { id: "m7_c1", bn: "১) পূর্বপাঠের পুনরালোচনা", en: "1) Revision of Previous Lessons", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c2", bn: "২) অনুপাত", en: "2) Ratio", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c3", bn: "৩) সমানুপাত", en: "3) Proportion", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c4", bn: "৪) পূর্ণসংখ্যার যোগ, বিয়োগ,গুণ ও ভাগ", en: "4) Integer Operations", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c5", bn: "৫) সূচকের ধারণা", en: "5) Concept of Indices", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c6", bn: "৬) বীজগাণিতিক প্রক্রিয়া", en: "6) Algebraic Processes", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c7", bn: "৭) কম্পাসের সাহায্যে নির্দিষ্ট কোণ অঙ্কন", en: "7) Drawing Angles using Compass", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c8", bn: "৮) ত্রিভুজ অঙ্কন", en: "8) Construction of Triangles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c9", bn: "৯) সর্বসমতার ধারণা", en: "9) Concept of Congruence", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c10", bn: "১০) আসন্নমান", en: "10) Approximate Values", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c11", bn: "১১) ভগ্নাংশের বর্গমূল", en: "11) Square Root of Fractions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c12", bn: "১২) বীজগাণিতিক সূত্রাবলি", en: "12) Algebraic Formulae", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c13", bn: "১৩) সমান্তরাল সরলরেখা ও ছেদকের ধারণা", en: "13) Parallel Lines and Transversal", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c14", bn: "১৪) ত্রিভুজের ধর্ম", en: "14) Properties of Triangles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c15", bn: "১৫) সময় ও দূরত্ব", en: "15) Time and Distance", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c16", bn: "১৬) দ্বি-স্তম্ভ লেখা", en: "16) Double Bar Graph", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c17", bn: "১৭) আয়তক্ষেত্র ও বর্গক্ষেত্রের ক্ষেত্রফল", en: "17) Area of Rectangle and Square", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c18", bn: "১৮) প্রতিসাম্য", en: "18) Symmetry", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c19", bn: "১৯) উৎপাদকে বিশ্লেষণ", en: "19) Factorization", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c20", bn: "২০) চতুর্ভুজের শ্রেণীবিভাগ", en: "20) Classification of Quadrilaterals", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c21", bn: "২১) চতুর্ভুজ অঙ্কন", en: "21) Construction of Quadrilaterals", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "m7_c22", bn: "২২) সমীকরণ গঠন ও সমাধান", en: "22) Formation and Solution of Equations", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" }
    ]
  },

  // ================= CLASS 8 =================
  class8: {
    exams: {
      paribesh: [
        { id: "p8_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative Exam", linkSug: "এখানে_পরিবেশ_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_পরিবেশ_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "p8_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative Exam", linkSug: "এখানে_পরিবেশ_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_পরিবেশ_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "p8_ex_3", bn: "৩য় সামেটিভ এক্সাম", en: "3rd Summative Exam", linkSug: "এখানে_পরিবেশ_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_পরিবেশ_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      onko: [
        { id: "m8_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative Exam", linkSug: "এখানে_গণিত_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m8_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative Exam", linkSug: "এখানে_গণিত_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m8_ex_3", bn: "৩য় সামেটিভ এক্সাম", en: "3rd Summative Exam", linkSug: "এখানে_গণিত_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    paribesh: [
      { 
        id: "p8_c1", bn: "১) ভৌত পরিবেশ", en: "1) Physical Environment",
        topics: [
          { id: "p8_c1_s1", bn: "১.১) বল ও চাপ", en: "1.1) Force and Pressure", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c1_s2", bn: "১.২) স্পর্শ ছাড়া ক্রিয়াশীল বল", en: "1.2) Non-contact Forces", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c1_s3", bn: "১.৩) তাপ", en: "1.3) Heat", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c1_s4", bn: "১.৪) আলো", en: "1.4) Light", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
        ]
      },
      { 
        id: "p8_c2", bn: "২) মৌল, যৌগ ও রাসায়নিক বিক্রিয়া", en: "2) Elements, Compounds & Reactions",
        topics: [
          { id: "p8_c2_s1", bn: "২.১) পদার্থের প্রকৃতি", en: "2.1) Nature of Matter", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c2_s2", bn: "২.২) পদার্থের গঠন", en: "2.2) Structure of Matter", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c2_s3", bn: "২.৩) রাসায়নিক বিক্রিয়া", en: "2.3) Chemical Reactions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
          { id: "p8_c2_s4", bn: "২.৪) তড়িতের রাসায়নিক প্রভাব", en: "2.4) Chemical Effects of Current", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
        ]
      },
      { id: "p8_c3", bn: "৩) কয়েকটি গ্যাসের পরিচিতি", en: "3) Introduction to Some Gases", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c4", bn: "৪) প্রকৃতিতে ও জীবজগতে বিভিন্ন রূপে কার্বন", en: "4) Carbon in Nature and Biosphere", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c5", bn: "৫) প্রাকৃতিক ঘটনা ও তার বিশ্লেষণ", en: "5) Natural Phenomena and Analysis", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c6", bn: "৬) জীবদেহের গঠন", en: "6) Structure of Living Organisms", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c7", bn: "৭) অনুজীবের জগৎ", en: "7) World of Microbes", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c8", bn: "৮) মানুষের খাদ্য ও খাদ্য উৎপাদন", en: "8) Human Food and Food Production", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c9", bn: "৯) অন্তঃক্ষরা গ্রন্থি ও বয়ঃসন্ধি", en: "9) Endocrine Glands and Adolescence", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c10", bn: "১০) জীববৈচিত্র্য, পরিবেশের সংকট ও সংরক্ষণ", en: "10) Biodiversity, Crisis & Conservation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "p8_c11", bn: "১১) আমাদের চারপাশের পরিবেশ ও উদ্ভিদজগৎ", en: "11) Our Environment and Plant World", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ],
    onko: [
      { id: "m8_c1", bn: "১) পূর্বপাঠের পুনরালোচনা", en: "1) Revision", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c2", bn: "২) পাই চিত্র", en: "2) Pie Chart", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c3", bn: "৩) মূলদ সংখ্যার ধারণা", en: "3) Concept of Rational Numbers", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c4", bn: "৪) বীজগাণিতিক সংখ্যামালার গুণ ও ভাগ", en: "4) Multiplication & Division of Algebraic Expressions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c5", bn: "৫) ঘনফল নির্ণয়", en: "5) Determining Cube", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c6", bn: "৬) পূরক, সম্পূরক ও সন্নিহিত কোণ", en: "6) Complementary, Supplementary & Adjacent Angles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c7", bn: "৭) বিপ্রতীপ কোণের ধারণা", en: "7) Concept of Vertically Opposite Angles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c8", bn: "৮) সমান্তরাল সরলরেখা ও ছেদকের ধর্ম", en: "8) Parallel Lines and Transversal Properties", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c9", bn: "৯) ত্রিভুজের দুটি বাহু ও বিপরীত কোণের সম্পর্ক", en: "9) Relation between Sides and Opposite Angles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c10", bn: "১০) ত্রৈরাশিক", en: "10) Rule of Three", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c11", bn: "১১) শতকরা", en: "11) Percentage", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c12", bn: "১২) মিশ্রণ", en: "12) Mixture", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c13", bn: "১৩) বীজগাণিতিক সংখ্যামালার উৎপাদকে বিশ্লেষণ", en: "13) Factorization of Algebraic Expressions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c14", bn: "১৪) বীজগাণিতিক সংখ্যামালার গ.সা.গু ও ল.সা.গু", en: "14) HCF and LCM of Algebraic Expressions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c15", bn: "১৫) বীজগাণিতিক সংখ্যামালার সরলীকরণ", en: "15) Simplification of Algebraic Expressions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c16", bn: "১৬) ত্রিভূজের কোণ ও বাহুর মধ্যে সম্পর্কের যাচাই", en: "16) Verifying Relation between Angles and Sides", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c17", bn: "১৭) সময় ও কার্য", en: "17) Time and Work", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c18", bn: "১৮) লেখচিত্র", en: "18) Graph", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c19", bn: "১৯) সমীকরণ গঠন ও সমাধান", en: "19) Formation and Solution of Equations", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c20", bn: "২০) জ্যামিতিক প্রমাণ", en: "20) Geometrical Proof", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c21", bn: "২১) ত্রিভূজ অঙ্কন", en: "21) Construction of Triangles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c22", bn: "২২) সমান্তরাল সরলরেখা অঙ্কন", en: "22) Construction of Parallel Lines", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m8_c23", bn: "২৩) প্রদত্ত সরলরেখাংশকে সমান ভাগে বিভক্ত করা", en: "23) Dividing a Line Segment Equally", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ]
  },

  // ================= CLASS 9 =================
  class9: {
    exams: {
      physical: [
        { id: "ex_1", bn: "১ম সামেটিভ", en: "1st Summative", linkSug: "এখানে_ভৌতবিজ্ঞান_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_১ম_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_2", bn: "২য় সামেটিভ", en: "2nd Summative", linkSug: "এখানে_ভৌতবিজ্ঞান_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_২য়_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_3", bn: "৩য় সামেটিভ", en: "3rd Summative", linkSug: "এখানে_ভৌতবিজ্ঞান_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      life: [
        { id: "ex_1", bn: "১ম সামেটিভ", en: "1st Summative", linkSug: "এখানে_জীবনবিজ্ঞান_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_জীবনবিজ্ঞান_১ম_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_2", bn: "২য় সামেটিভ", en: "2nd Summative", linkSug: "https://drive.google.com/file/d/1reRcC_9UXYp2lcQs3hHx9QkGYZFPm5vf/view?usp=drivesdk", linkPyq: "এখানে_জীবনবিজ্ঞান_২য়_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_3", bn: "৩য় সামেটিভ", en: "3rd Summative", linkSug: "এখানে_জীবনবিজ্ঞান_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_জীবনবিজ্ঞান_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      onko: [
        { id: "ex_1", bn: "১ম সামেটিভ", en: "1st Summative", linkSug: "এখানে_গণিত_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_১ম_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_2", bn: "২য় সামেটিভ", en: "2nd Summative", linkSug: "এখানে_গণিত_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_২য়_PYQ_লিংক_দিন", uploadDate: "" }, 
        { id: "ex_3", bn: "৩য় সামেটিভ", en: "3rd Summative", linkSug: "এখানে_গণিত_৩য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_৩য়_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    physical:[
      {
        id: "p9_c1",
        bn: "১) পরিমাপ",
        en: "1) Measurement",
        topics: [
          { id: "p9_c1_s1", bn: "১.১) পরিমাপ ও একক", en: "1.1) Measurement and Units", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c1_s2", bn: "১.২) বিভিন্ন মাপের একক", en: "1.2) Units of Various Measurements", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c1_s3", bn: "১.৩) মাত্রা", en: "1.3) Dimension", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c1_s4", bn: "১.৪) পরিমাপ", en: "1.4) Measurement", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c2",
        bn: "২) বল ও গতি",
        en: "2) Force and Motion",
        topics: [
          { id: "p9_c2_s1", bn: "২.১) স্থিতি ও গতি", en: "2.1) Rest and Motion", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s2", bn: "২.২) গতির সমীকরণ", en: "2.2) Equations of Motion", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s3", bn: "২.৩) নিউটনের প্রথম গতিসূত্র", en: "2.3) Newton's 1st Law", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s4", bn: "২.৪) নিউটনের দ্বিতীয় গতিসূত্র", en: "2.4) Newton's 2nd Law", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s5", bn: "২.৫) নিউটনের তৃতীয় গতিসূত্র", en: "2.5) Newton's 3rd Law", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s6", bn: "২.৬) বিভিন্ন ধরনের বল", en: "2.6) Different Forces", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s7", bn: "২.৭) রৈখিক ভরবেগ", en: "2.7) Linear Momentum", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c2_s8", bn: "২.৮) রৈখিক ভরবেগের সংরক্ষণ", en: "2.8) Conservation of Momentum", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c3",
        bn: "৩) পদার্থ : গঠন ও ধর্ম",
        en: "3) Matter: Structure and Properties",
        topics: [
          { id: "p9_c3_s1", bn: "৩.১) তরল ও বায়ুর চাপ", en: "3.1) Pressure of Liquids and Gases", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c3_s2", bn: "৩.২) আর্কিমিডিসের নীতি", en: "3.2) Archimedes' Principle", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c3_s3", bn: "৩.৩) পৃষ্ঠটান", en: "3.3) Surface Tension", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c3_s4", bn: "৩.৪) সান্দ্রতা", en: "3.4) Viscosity", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c3_s5", bn: "৩.৫) বার্নোলির নীতি", en: "3.5) Bernoulli's Principle", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c3_s6", bn: "৩.৬) স্থিতিস্থাপকতা", en: "3.6) Elasticity", link: "https://drive.google.com/file/d/1ijuwq18WVpYa_oQMno72XnyKwl1BVPmc/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c4",
        bn: "৪) পদার্থ : পরমাণুর গঠন, পদার্থের ভৌত ও রাসায়নিক পরিবর্তন",
        en: "4) Matter: Atomic Structure, Changes",
        topics: [
          { id: "p9_c4_s1", bn: "৪.১) পরমাণুর গঠন", en: "4.1) Atomic Structure", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c4_s2", bn: "৪.২) মোলের ধারণা", en: "4.2) Concept of Mole", link: "https://drive.google.com/file/d/1y9Yh3XOjNrf-a45zMq_7TKMIaYRaYARx/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c4_s3", bn: "৪.৩) দ্রবণ", en: "4.3) Solution", link: "https://drive.google.com/file/d/1L_e4JnNN-XGSqlF2qnJ7GVxQTRjTQAvz/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c4_s4", bn: "৪.৪) Acid, Base and Salt", en: "4.4) Acid, Base and Salt", link: "https://drive.google.com/file/d/1XHenJQN_dbOw9lMvCmqBRbkNId7eUapi/view?usp=drivesdk", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c4_s5", bn: "৪.৫) মিশ্রণের উপাদানের পৃথকীকরণ", en: "4.5) Separation of Mixture", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c4_s6", bn: "৪.৬) জল", en: "4.6) Water", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c5",
        bn: "৫) শক্তির ক্রিয়া : কার্যক্ষমতা ও শক্তি",
        en: "5) Action of Energy: Work, Power and Energy",
        topics: [
          { id: "p9_c5_s1", bn: "৫.১) কার্য", en: "5.1) Work", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c5_s2", bn: "৫.২) ক্ষমতা", en: "5.2) Power", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c5_s3", bn: "৫.৩) শক্তি", en: "5.3) Energy", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c6",
        bn: "৬) তাপ",
        en: "6) Heat",
        topics: [
          { id: "p9_c6_s1", bn: "৬.১) ক্যালোরিমিতির মূল নীতি", en: "6.1) Principle of Calorimetry", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c6_s2", bn: "৬.২) কার্য ও তাপের তুল্যতা", en: "6.2) Equivalence of Work & Heat", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c6_s3", bn: "৬.৩) লীনতাপ", en: "6.3) Latent Heat", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c6_s4", bn: "৬.৪) সম্পৃক্ত ও অসম্পৃক্ত বাষ্প", en: "6.4) Saturated & Unsaturated Vapor", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c6_s5", bn: "৬.৫) জলের ব্যতিক্রান্ত প্রসারণ", en: "6.5) Anomalous Expansion of Water", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      },
      {
        id: "p9_c7",
        bn: "৭) শব্দ",
        en: "7) Sound",
        topics: [
          { id: "p9_c7_s1", bn: "৭.১) শব্দের উৎস কম্পন", en: "7.1) Vibration: Source of Sound", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" },
          { id: "p9_c7_s2", bn: "৭.২) শব্দের বিস্তার : তরঙ্গ", en: "7.2) Propagation of Sound: Wave", link: "URL_NOTE", linkAnu: "URL_ANU", linkYt: "URL_YOUTUBE_VIDEO", uploadDate: "" }
        ]
      }
    ],
    life: [
      { id: "l9_c1", bn: "১) জীবন ও তার বৈচিত্র্য", en: "1) Life & its Diversity", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "l9_c2", bn: "২) জীবন সংগঠনের স্তর", en: "2) Levels of Organization", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "l9_c3", bn: "৩) জৈবনিক প্রক্রিয়া", en: "3) Physiological Processes", link: "https://drive.google.com/file/d/1reRcC_9UXYp2lcQs3hHx9QkGYZFPm5vf/view?usp=drivesdk", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "l9_c4", bn: "৪) জীববিদ্যা ও মানবকল্যাণ", en: "4) Biology & Human Welfare", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "l9_c5", bn: "৫) পরিবেশ ও তার সম্পদ", en: "5) Environment & Resources", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ],
    onko: [
      { id: "m9_c1", bn: "১) বাস্তব সংখ্যা", en: "1) Real Numbers", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c2", bn: "২) সূচকের নিয়মাবলী", en: "2) Laws of Indices", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c3", bn: "৩) লেখচিত্র", en: "3) Graph", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c4", bn: "৪) স্থানাঙ্ক জ্যামিতি: দূরত্ব", en: "4) Coordinate Geometry", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c5", bn: "৫) রৈখিক সহসমীকরণ", en: "5) Linear Equations", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c6", bn: "৬) সামান্তরিকের ধর্ম", en: "6) Properties of Parallelogram", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c7", bn: "৭) বহুপদী সংখ্যামালা", en: "7) Polynomials", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c8", bn: "৮) উৎপাদকে বিশ্লেষণ", en: "8) Factorization", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c9", bn: "৯) মধ্যবিন্দু উপপাদ্য", en: "9) Mid-Point Theorem", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c10", bn: "১০) লাভ ও ক্ষতি", en: "10) Profit and Loss", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c11", bn: "১১) রাশিবিজ্ঞান", en: "11) Statistics", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c12", bn: "১২) ক্ষেত্রফল উপপাদ্য", en: "12) Theorems on Area", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c13", bn: "১৩) সম্পাদ্য", en: "13) Construction", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c14", bn: "১৪) ত্রিভুজ পরিসীমা ও ক্ষেত্রফল", en: "14) Area of Triangles", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c15", bn: "১৫) বৃত্তের পরিধি", en: "15) Circumference", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c16", bn: "১৬) বৃত্তের ক্ষেত্রফল", en: "16) Area of Circle", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c17", bn: "১৭) সমবিন্দু উপপাদ্য", en: "17) Concurrence", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c18", bn: "১৮) স্থানাঙ্ক: ক্ষেত্রফল", en: "18) Coordinate: Area", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m9_c19", bn: "১৯) লগারিদম", en: "19) Logarithm", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ]
  },

  // ================= CLASS 10 =================
  class10: {
    exams: {
      physical: [
        { id: "v10_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative", linkSug: "এখানে_ভৌতবিজ্ঞান_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "v10_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative", linkSug: "এখানে_ভৌতবিজ্ঞান_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "v10_ex_3", bn: `মাধ্যমিক / ফাইনাল ${currentYearStr}`, en: `Madhyamik / Final ${currentYearStr}`, linkSug: "এখানে_ভৌতবিজ্ঞান_মাধ্যমিক_সাজেশন_লিংক_দিন", linkPyq: "এখানে_ভৌতবিজ্ঞান_মাধ্যমিক_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      life: [
        { id: "j10_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative", linkSug: "এখানে_জীবনবিজ্ঞান_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_জীবনবিজ্ঞান_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "j10_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative", linkSug: "https://drive.google.com/file/d/1Wo_Yr-6IxwH48FMc6eiblJf4elNZipTh/view?usp=drivesdk", linkPyq: "এখানে_জীবনবিজ্ঞান_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "j10_ex_3", bn: `মাধ্যমিক / ফাইনাল ${currentYearStr}`, en: `Madhyamik / Final ${currentYearStr}`, linkSug: "এখানে_জীবনবিজ্ঞান_মাধ্যমিক_সাজেশন_লিংক_দিন", linkPyq: "এখানে_জীবনবিজ্ঞান_মাধ্যমিক_PYQ_লিংক_দিন", uploadDate: "" }
      ],
      onko: [
        { id: "m10_ex_1", bn: "১ম সামেটিভ এক্সাম", en: "1st Summative", linkSug: "এখানে_গণিত_১ম_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_১ম_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m10_ex_2", bn: "২য় সামেটিভ এক্সাম", en: "2nd Summative", linkSug: "এখানে_গণিত_২য়_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_২য়_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "m10_ex_3", bn: `মাধ্যমিক / ফাইনাল ${currentYearStr}`, en: `Madhyamik / Final ${currentYearStr}`, linkSug: "এখানে_গণিত_মাধ্যমিক_সাজেশন_লিংক_দিন", linkPyq: "এখানে_গণিত_মাধ্যমিক_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    physical: [
      { id: "v10_c1", bn: "১) পরিবেশের জন্য ভাবনা", en: "1) Concerns for Environment", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c2", bn: "২) গ্যাসের আচরণ", en: "2) Behavior of Gases", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c3", bn: "৩) রাসায়নিক গণনা", en: "3) Chemical Calculations", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c4", bn: "৪) তাপের ঘটনাসমূহ", en: "4) Thermal Phenomena", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c5", bn: "৫) আলো", en: "5) Light", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c6", bn: "৬) চল তড়িৎ", en: "6) Current Electricity", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c7", bn: "৭) পরমাণুর নিউক্লিয়াস", en: "7) Atomic Nucleus", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c8", bn: "৮) পদার্থের গঠন ও রাসায়নিক ধর্মসমূহ", en: "8) Structure & Chemical Properties", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c9", bn: "৯) পর্যায় সারণি এবং মৌলদের ধর্মের পর্যায়বৃত্ততা", en: "9) Periodic Table", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c10", bn: "১০) আম্লীয় ও ক্ষারীয় বলন", en: "10) Ionic and Covalent Bonding", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c11", bn: "১১) তড়িৎ প্রবাহ ও রাসায়নিক বিক্রিয়া", en: "11) Electricity & Chemical Reactions", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c12", bn: "১২) পরীক্ষাগার ও রাসায়নিক শিল্পে অজৈব বস্তুসমূহ", en: "12) Inorganic Chemistry in Lab & Industry", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "v10_c13", bn: "১৩) ধাতুবিদ্যা", en: "13) Metallurgy", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ],
    life: [
      { id: "j10_c1", bn: "১) জীবজগতে নিয়ন্ত্রণে ও সমন্বয়", en: "1) Control & Coordination in Living World", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "j10_c2", bn: "২) জীবনের প্রবাহমানতা", en: "2) Continuity of Life", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "j10_c3", bn: "৩) বংশগতি এবং কয়েকটি সাধারন জিনগত রোগ", en: "3) Heredity & Genetic Diseases", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "j10_c4", bn: "৪) অভিব্যক্তি ও অভিযোজন", en: "4) Evolution and Adaptation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "j10_c5", bn: "৫) পরিবেশ, তার সম্পদ এবং তাদের সংরক্ষণ", en: "5) Environment & Resource Conservation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ],
    onko: [
      { id: "m10_c1", bn: "১) একচলবিশিষ্ট দ্বিঘাত সমীকরণ", en: "1) Quadratic Equations with one variable", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c2", bn: "২) সরল সুদকষা", en: "2) Simple Interest", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c3", bn: "৩) বৃত্ত সম্পর্কিত উপপাদ্য", en: "3) Theorems related to Circle", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c4", bn: "৪) আয়তঘন", en: "4) Rectangular Parallelepiped or Cuboid", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c5", bn: "৫) অনুপাত ও সমানুপাত", en: "5) Ratio and Proportion", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c6", bn: "৬) চক্রবৃদ্ধি সুদ ও সমাহার বৃদ্ধি বা হ্রাস", en: "6) Compound Interest and Uniform Rate", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c7", bn: "৭) বৃত্তস্থ কোণ সম্পর্কিত উপপাদ্য", en: "7) Theorems related to Angles in a Circle", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c8", bn: "৮) লম্ব বৃত্তাকার চোঙ", en: "8) Right Circular Cylinder", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c9", bn: "৯) দ্বিঘাত করণী", en: "9) Quadratic Surd", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c10", bn: "১০) বৃত্তস্থ চতুর্ভুজ সংক্রান্ত উপপাদ্য", en: "10) Theorems related to Cyclic Quadrilateral", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c11", bn: "১১) সম্পাদ্য : ত্রিভূজের পরিবৃত্ত ও অন্তর্বৃত্ত অঙ্কন", en: "11) Construction of Circumcircle", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c12", bn: "১২) গোলক", en: "12) Sphere", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c13", bn: "১৩) ভেদ", en: "13) Variation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c14", bn: "১৪) অংশীদারি কারবার", en: "14) Partnership Business", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c15", bn: "১৫) বৃত্তের স্পর্শক সংক্রান্ত উপপাদ্য", en: "15) Theorems related to Tangent", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c16", bn: "১৬) লম্ব বৃত্তাকার শঙ্কু", en: "16) Right Circular Cone", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c17", bn: "১৭) সম্পাদ্য : বৃত্তের স্পর্শক অঙ্কন", en: "17) Construction of Tangent", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c18", bn: "১৮) সদৃশতা", en: "18) Similarity", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c19", bn: "১৯) বিভিন্ন ঘনবস্তু সংক্রান্ত বাস্তব সমস্যা", en: "19) Real life Problems", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c20", bn: "২০) ত্রিকোণমিতি: কোণ পরিমাপের ধারণা", en: "20) Trigonometry", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c21", bn: "২১) সম্পাদ্য : মধ্যসমানুপাতী নির্ণয়", en: "21) Construction of Mean Proportional", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c22", bn: "২২) পিথাগোরাসের উপপাদ্য", en: "22) Pythagoras Theorem", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c23", bn: "২৩) ত্রিকোণমিতিক অনুপাত ও ত্রিকোণমিতিক অভেদাবলি", en: "23) Trigonometric Ratios", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c24", bn: "২৪) পুরক কোণের ত্রিকোণমিতিক অনুপাত", en: "24) Complementary Angle", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c25", bn: "২৫) ত্রিকোণমিতিক অনুপাতের প্রয়োগ: উচ্চতা ও দূরত্ব", en: "25) Heights & Distances", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" },
      { id: "m10_c26", bn: "২৬) রাশিবিজ্ঞান: গড়, মাধ্যমা, ওজাইভ", en: "26) Statistics: Mean, Median", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_PRACTICE", uploadDate: "" }
    ]
  },
  
    // ================= CLASS 11 =================
  class11: {
    exams: {
      physics: [
        { id: "p11_ex_1", bn: "১ম সেমিস্টার এক্সাম", en: "1st Semester Exam", linkSug: "এখানে_১ম_সেমিস্টার_সাজেশন_লিংক_দিন", linkPyq: "এখানে_১ম_সেমিস্টার_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "p11_ex_2", bn: "২য় সেমিস্টার এক্সাম", en: "2nd Semester Exam", linkSug: "এখানে_২য়_সেমিস্টার_সাজেশন_লিংক_দিন", linkPyq: "এখানে_২য়_সেমিস্টার_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    physics: [
      { id: "p11_c1", bn: "১) ভৌত জগত ও পরিমাপ", en: "1) Physical World and Measurement", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c2", bn: "২) সরলরেখায় গতি", en: "2) Motion in a Straight Line", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c3", bn: "৩) সমতলে গতি", en: "3) Motion in a Plane", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c4", bn: "৪) গতির সূত্রাবলী", en: "4) Laws of Motion", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c5", bn: "৫) কার্য, শক্তি ও ক্ষমতা", en: "5) Work, Energy and Power", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c6", bn: "৬) বস্তুকণার ভরকেন্দ্র ও দৃঢ় বস্তুর ঘূর্ণন", en: "6) System of Particles and Rotational Motion", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c7", bn: "৭) মহাকর্ষ", en: "7) Gravitation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c8", bn: "৮) পদার্থের ধর্ম", en: "8) Mechanical Properties of Solids and Fluids", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c9", bn: "৯) তাপগতিবিদ্যা", en: "9) Thermodynamics", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c10", bn: "১০) গ্যাসের গতীয় তত্ত্ব", en: "10) Kinetic Theory", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p11_c11", bn: "১১) দোলন ও তরঙ্গ", en: "11) Oscillations and Waves", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" }
    ],
    formulas: [
      { id: "f11_1", bn: "১) ভৌত জগত ও পরিমাপ", en: "1) Physical World and Measurement", link: "images/11_chap1.jpg", uploadDate: "" },
      { id: "f11_2", bn: "২) সরলরেখায় গতি", en: "2) Motion in a Straight Line", link: "images/11_chap2.jpg", uploadDate: "" },
      { id: "f11_3", bn: "৩) সমতলে গতি", en: "3) Motion in a Plane", link: "images/11_chap3.jpg", uploadDate: "" },
      { id: "f11_4", bn: "৪) গতির সূত্রাবলী", en: "4) Laws of Motion", link: "images/11_chap4.jpg", uploadDate: "" },
      { id: "f11_5", bn: "৫) কার্য, শক্তি ও ক্ষমতা", en: "5) Work, Energy and Power", link: "images/11_chap5.jpg", uploadDate: "" },
      { id: "f11_6", bn: "৬) বস্তুকণার ভরকেন্দ্র ও দৃঢ় বস্তুর ঘূর্ণন", en: "6) System of Particles and Rotational Motion", link: "images/11_chap6.jpg", uploadDate: "" },
      { id: "f11_7", bn: "৭) মহাকর্ষ", en: "7) Gravitation", link: "images/11_chap7.jpg", uploadDate: "" },
      { id: "f11_8", bn: "৮) পদার্থের ধর্ম", en: "8) Mechanical Properties of Solids and Fluids", link: "images/11_chap8.jpg", uploadDate: "" },
      { id: "f11_9", bn: "৯) তাপগতিবিদ্যা", en: "9) Thermodynamics", link: "images/11_chap9.jpg", uploadDate: "" },
      { id: "f11_10", bn: "১০) গ্যাসের গতীয় তত্ত্ব", en: "10) Kinetic Theory", link: "images/11_chap10.jpg", uploadDate: "" },
      { id: "f11_11", bn: "১১) দোলন ও তরঙ্গ", en: "11) Oscillations and Waves", link: "images/11_chap11.jpg", uploadDate: "" }
    ]
  },

  // ================= CLASS 12 =================
  class12: {
    exams: {
      physics: [
        { id: "p12_ex_3", bn: "৩য় সেমিস্টার এক্সাম", en: "3rd Semester Exam", linkSug: "এখানে_৩য়_সেমিস্টার_সাজেশন_লিংক_দিন", linkPyq: "এখানে_৩য়_সেমিস্টার_PYQ_লিংক_দিন", uploadDate: "" },
        { id: "p12_ex_4", bn: "৪র্থ সেমিস্টার এক্সাম", en: "4th Semester Exam", linkSug: "এখানে_৪র্থ_সেমিস্টার_সাজেশন_লিংক_দিন", linkPyq: "এখানে_৪র্থ_সেমিস্টার_PYQ_লিংক_দিন", uploadDate: "" }
      ]
    },
    physics: [
      { id: "p12_c1", bn: "১) স্থির তড়িৎ", en: "1) Electrostatics", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c2", bn: "২) চল তড়িৎ", en: "2) Current Electricity", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c3", bn: "৩) তড়িৎপ্রবাহের চুম্বক ক্রিয়া", en: "3) Magnetic Effects of Current", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c4", bn: "৪) তড়িৎচুম্বকীয় আবেশ ও AC", en: "4) EMI & AC", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c5", bn: "৫) তড়িৎচুম্বকীয় তরঙ্গ", en: "5) Electromagnetic Waves", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c6", bn: "৬) আলোকবিজ্ঞান", en: "6) Optics", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c7", bn: "৭) পদার্থের দ্বৈত সত্তা ও বিকিরণ", en: "7) Dual Nature of Radiation", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c8", bn: "৮) পরমাণু ও নিউক্লিয়াস", en: "8) Atoms & Nuclei", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c9", bn: "৯) ইলেকট্রনিক যন্ত্রাদি", en: "9) Electronic Devices", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" },
      { id: "p12_c10", bn: "১০) সঞ্চার ব্যবস্থা", en: "10) Communication Systems", link: "URL_NOTE", linkVideo: "URL_YOUTUBE_VIDEO", linkAnu: "URL_MOCK_TEST", uploadDate: "" }
    ],
    formulas: [
      { id: "f12_1", bn: "১) স্থির তড়িৎ", en: "1) Electrostatics", link: "./images/12_chap1.jpg", uploadDate: "" },
      { id: "f12_2", bn: "২) চল তড়িৎ", en: "2) Current Electricity", link: "./images/12_chap2.jpg", uploadDate: "" },
      { id: "f12_3", bn: "৩) তড়িৎপ্রবাহের চুম্বক ক্রিয়া", en: "3) Magnetic Effects of Current", link: "./images/12_chap3.jpg", uploadDate: "" },
      { id: "f12_4", bn: "৪) তড়িৎচুম্বকীয় আবেশ ও AC", en: "4) EMI & AC", link: "./images/12_chap4.jpg", uploadDate: "" },
      { id: "f12_5", bn: "৫) তড়িৎচুম্বকীয় তরঙ্গ", en: "5) Electromagnetic Waves", link: "./images/12_chap5.jpg", uploadDate: "" },
      { id: "f12_6", bn: "৬) আলোকবিজ্ঞান", en: "6) Optics", link: "./images/12_chap6.jpg", uploadDate: "" },
      { id: "f12_7", bn: "৭) পদার্থের দ্বৈত সত্তা ও বিকিরণ", en: "7) Dual Nature of Radiation", link: "./images/12_chap7.jpg", uploadDate: "" },
      { id: "f12_8", bn: "৮) পরমাণু ও নিউক্লিয়াস", en: "8) Atoms & Nuclei", link: "./images/12_chap8.jpg", uploadDate: "" },
      { id: "f12_9", bn: "৯) ইলেকট্রনিক যন্ত্রাদি", en: "9) Electronic Devices", link: "./images/12_chap9.jpg", uploadDate: "" },
      { id: "f12_10", bn: "১০) সঞ্চার ব্যবস্থা", en: "10) Communication Systems", link: "./images/12_chap10.jpg", uploadDate: "" }
    ]
  }
};
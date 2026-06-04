export interface DirectorProfile {
  id: string;
  nameBn: string;
  nameEn: string;
  titleBn: string;
  titleEn: string;
  image: string;
  focusBn: string;
}

export interface BranchOffice {
  id: string;
  districtBn?: string;
  districtEn?: string;
  regionBn: string;
  regionEn?: string;
  addressBn: string;
  managerBn?: string;
  managerEn?: string;
  phone: string;
  email?: string;
  coverageBn: string;
  heritageImage?: string;
  heritageAlt?: string;
}

export interface AgroBlog {
  id: string;
  titleBn: string;
  tagBn: string;
  summaryBn: string;
  dateBn: string;
}

export const DIRECTORS: DirectorProfile[] = [
  {
    id: "saiduzzaman",
    nameBn: "এম. সাইদুজ্জামান",
    nameEn: "M. Saiduzzaman",
    titleBn: "ব্যবস্থাপনা পরিচালক",
    titleEn: "Managing Director",
    image: "https://mimpexbd.com/wp-content/uploads/2022/08/Photo-Arefin.jpg",
    focusBn: "কৃষকের হাতে গুণগত মানসম্পন্ন নতুন কৃষি পণ্য পৌঁছে দিয়ে মাঠ পর্যায়ের সেবা, ডিলার নেটওয়ার্ক এবং ফসল সুরক্ষায় নেতৃত্ব দিচ্ছেন।",
  },
  {
    id: "operations",
    nameBn: "কর্পোরেট অপারেশনস টিম",
    nameEn: "Corporate Operations Team",
    titleBn: "পরিচালনা ও সরবরাহ চেইন",
    titleEn: "Operations & Supply Chain",
    image: "https://mimpexbd.com/wp-content/uploads/2022/07/only-mimpex-logo.png",
    focusBn: "স্টক, উৎপাদন পরিকল্পনা, মান নিয়ন্ত্রণ এবং সময়মতো মাঠ পর্যায়ের সরবরাহ নিশ্চিত করে।",
  },
  {
    id: "science",
    nameBn: "কৃষি বিজ্ঞান সহায়তা টিম",
    nameEn: "Crop Science Support Team",
    titleBn: "কারিগরি পরামর্শ ও মাঠ সহায়তা",
    titleEn: "Technical Advisory",
    image: "https://mimpexbd.com/wp-content/uploads/2022/06/gleaf-icon-1.png",
    focusBn: "রোগ-পোকা নির্ণয়, ডোজ নির্দেশনা এবং কৃষকের বাস্তব সমস্যার দ্রুত সমাধানে সহায়তা দেয়।",
  },
];

export const BRANCH_OFFICES: BranchOffice[] = [
  {
    id: "dhaka",
    districtBn: "ঢাকা",
    districtEn: "Dhaka",
    regionBn: "ঢাকা শাখা",
    regionEn: "Dhaka Branch",
    addressBn: "বাড়ি#৬০/এ, রোড# ২৭(পুরাতন), ১৬(নতুন), ধানমন্ডি, ঢাকা-১২০৯",
    managerBn: "মোঃ আরিফুল ইসলাম",
    managerEn: "Md. Ariful Islam",
    phone: "02-223361549 / 223366590",
    email: "dhaka@mimpexbd.com",
    coverageBn: "কর্পোরেট সাপোর্ট, ডিলার অপারেশনস এবং জাতীয় বিতরণ",
    heritageImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/DJI_0760_(%20Ahsan_Manzil).jpg",
    heritageAlt: "Ahsan Manzil heritage architecture in Dhaka",
  },
  {
    id: "bogura",
    districtBn: "বগুড়া",
    districtEn: "Bogura",
    regionBn: "বগুড়া শাখা",
    regionEn: "Bogura Branch",
    addressBn: "সাতমাথা বাণিজ্যিক এলাকা, বগুড়া সদর, বগুড়া",
    managerBn: "মোঃ মাহবুবুর রহমান",
    managerEn: "Md. Mahbubur Rahman",
    phone: "+880 1711-000001",
    email: "bogura@mimpexbd.com",
    coverageBn: "উত্তরাঞ্চলের ধান, আলু, ভুট্টা ও সবজি ফসল সহায়তা",
    heritageImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Excavation_site_of_Mahasthangarh,Bogura,_Bangladesh.jpg",
    heritageAlt: "Mahasthangarh archaeological heritage in Bogura",
  },
  {
    id: "jashore",
    districtBn: "যশোর",
    districtEn: "Jashore",
    regionBn: "যশোর শাখা",
    regionEn: "Jessore Branch",
    addressBn: "আর এন রোড, যশোর সদর, যশোর",
    managerBn: "মোঃ ইমরান হোসেন",
    managerEn: "Md. Imran Hossain",
    phone: "+880 1711-000002",
    email: "jashore@mimpexbd.com",
    coverageBn: "সবজি, ফুল, ফল এবং বীজ উৎপাদন অঞ্চল",
    heritageImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Evening_scenic_view_of_Jessore,_Bangladesh.jpg",
    heritageAlt: "Jashore district landscape and heritage",
  },
  {
    id: "rajshahi",
    districtBn: "রাজশাহী",
    districtEn: "Rajshahi",
    regionBn: "রাজশাহী শাখা",
    regionEn: "Rajshahi Branch",
    addressBn: "উপশহর, রাজশাহী মহানগর, রাজশাহী",
    managerBn: "মোঃ সাইদুর রহমান",
    managerEn: "Md. Saidur Rahman",
    phone: "+880 1711-000004",
    email: "rajshahi@mimpexbd.com",
    coverageBn: "ধান, আম, আলু, টমেটো ও সবজি ফসল সহায়তা",
    heritageImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Varendra_Research_Museum_10.jpg",
    heritageAlt: "Varendra Research Museum in Rajshahi",
  },
  {
    id: "dinajpur",
    districtBn: "দিনাজপুর",
    districtEn: "Dinajpur",
    regionBn: "দিনাজপুর শাখা",
    regionEn: "Dinajpur Branch",
    addressBn: "কালিতলা বাণিজ্যিক এলাকা, দিনাজপুর সদর, দিনাজপুর",
    managerBn: "মোঃ রেজাউল করিম",
    managerEn: "Md. Rezaul Karim",
    phone: "+880 1711-000003",
    email: "dinajpur@mimpexbd.com",
    coverageBn: "আলু, ভুট্টা, ধান, গম ও শীতকালীন সবজি",
    heritageImage: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kantajew_Temple_-_%E0%A6%A6%E0%A6%B0%E0%A7%8D%E0%A6%B6%E0%A6%A8.jpg",
    heritageAlt: "Kantajew Temple architecture in Dinajpur",
  },
];

export const AGRO_BLOGS: AgroBlog[] = [
  {
    id: "rice-yield",
    titleBn: "ধানের উচ্চ ফলনের ক্ষেত্রে জরুরি সতর্কতা",
    tagBn: "ধান",
    summaryBn: "ধানের উচ্চ ফলন নিশ্চিত করতে সঠিক জাত, সময়মতো বালাই ব্যবস্থাপনা এবং অনুমোদিত ডোজ অনুসরণ করা জরুরি।",
    dateBn: "২০ নভেম্বর ২০২৪",
  },
  {
    id: "mango-yield",
    titleBn: "আমের উচ্চ ফলনে আগাম বালাই ব্যবস্থাপনা",
    tagBn: "আম",
    summaryBn: "ফুল ও গুটি পর্যায়ে রোগ-পোকা এবং গুটি ঝরা নিয়ন্ত্রণে আগাম পর্যবেক্ষণ ও পণ্য নির্বাচন গুরুত্বপূর্ণ।",
    dateBn: "২১ জুন ২০২২",
  },
  {
    id: "vegetable-pest",
    titleBn: "সবজি চাষে ক্ষতিকর পোকা চিহ্নিতকরণ",
    tagBn: "সবজি",
    summaryBn: "ক্ষতিকর পোকার ধরন দ্রুত চিহ্নিত করলে উৎপাদন ক্ষতি কমে এবং সঠিক কীটনাশক বাছাই সহজ হয়।",
    dateBn: "২১ জুন ২০২২",
  },
];

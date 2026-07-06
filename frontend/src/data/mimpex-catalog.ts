export type ProductCategoryId =
  | "all"
  | "insecticide"
  | "fungicide"
  | "herbicide"
  | "miticide"
  | "pgr"
  | "public_health"
  | "aquaculture"
  | "rodenticide";

export type MimpexCatalogProduct = {
  id: string;
  matrixId: string; // Add matrixId here
  category: Exclude<ProductCategoryId, "all">;
  nameBn: string;
  nameEn: string;
  image: string;
  sourceUrl: string;
  mainIngredientBn: string;
  efficacyBn: string;
  dosageBn: string;
  cropTagsBn: string[];
};

export const CATALOG_CATEGORIES: {
  id: ProductCategoryId;
  labelEn: string;
  labelBn: string;
}[] = [
  { id: "all", labelEn: "All Products", labelBn: "সকল পণ্য" },
  { id: "insecticide", labelEn: "Insecticides", labelBn: "কীটনাশক" },
  { id: "fungicide", labelEn: "Fungicides", labelBn: "ছত্রাকনাশক" },
  { id: "herbicide", labelEn: "Herbicides", labelBn: "আগাছানাশক" },
  { id: "miticide", labelEn: "Miticides", labelBn: "মাকড়নাশক" },
  { id: "pgr", labelEn: "Fertilizer & PGR", labelBn: "সার ও পিজিআর" },
  { id: "rodenticide", labelEn: "Rodenticides", labelBn: "ইঁদুরনাশক" },
  { id: "aquaculture", labelEn: "Aquaculture", labelBn: "একুয়াকালচার পণ্য" },
  { id: "public_health", labelEn: "Public Health", labelBn: "জনস্বাস্থ্য" },
];

function product(
  id: string,
  matrixId: string,
  category: MimpexCatalogProduct["category"],
  nameBn: string,
  image: string,
  sourceUrl: string,
  mainIngredientBn: string,
  efficacyBn: string,
  dosageBn: string,
  cropTagsBn?: string[]
): MimpexCatalogProduct;
function product(
  id: string,
  category: MimpexCatalogProduct["category"],
  nameBn: string,
  image: string,
  sourceUrl: string,
  mainIngredientBn: string,
  efficacyBn: string,
  dosageBn: string,
  cropTagsBn?: string[]
): MimpexCatalogProduct;
function product(id: string, second: string, ...rest: unknown[]): MimpexCatalogProduct {
  const hasMatrixId = rest.length === 8;
  const matrixId = hasMatrixId ? second : id;
  const [category, nameBn, image, sourceUrl, mainIngredientBn, efficacyBn, dosageBn, cropTagsBn = []] = (
    hasMatrixId ? rest : [second, ...rest]
  ) as [
    MimpexCatalogProduct["category"],
    string,
    string,
    string,
    string,
    string,
    string,
    string[],
  ];

  return {
    id,
    matrixId,
    category,
    nameBn,
    nameEn: nameBn,
    image,
    sourceUrl,
    mainIngredientBn,
    efficacyBn,
    dosageBn,
    cropTagsBn,
  };
}

export const MIMPEX_CATALOG: MimpexCatalogProduct[] = [
  product(
    "oxycob-50-wp",
    "M_018", // matrixId for Oxycob 50 WP
    "fungicide",
    "অক্সিকব ৫০ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/oxycob-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%85%e0%a6%95%e0%a7%8d%e0%a6%b8%e0%a6%bf%e0%a6%95%e0%a6%ac-%e0%a7%ab%e0%a7%a6-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "কপার অক্সিক্লোরাইড",
    "ধানের পাতা ঝলসানো, বাদামী দাগ, চিকন বাদামী দাগ, সবজির শুকনা পচা, মরিচের ডাইব্যাক, আলু ও টমেটোর লেট ব্লাইট রোগ দমন করে।",
    "৭০০ গ্রাম প্রতি একরে।",
    ["ধান", "সবজি", "মরিচ", "আলু", "টমেটো"]
  ),
  product(
    "eylet-15-wdg",
    "M_019", // matrixId for Eylet 15 WDG (assuming, not in seed_matrix)
    "herbicide",
    "আইলেট ১৫ ডাব্লিউ ডি জি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/eylet-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%87%e0%a6%b2%e0%a7%87%e0%a6%9f-%e0%a7%a7%e0%a7%ab-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%a1%e0%a6%bf-%e0%a6%9c%e0%a6%bf/",
    "ইথক্সিসালফিউরন",
    "ধানের সেজ ও চওড়া পাতা জাতীয় আগাছা এবং পাটের মুথা সহ সমস্ত আগাছা দমনে কার্যকরী।",
    "ধান ৪০ গ্রাম, পাট ৮০ গ্রাম প্রতি একরে।",
    ["ধান", "পাট"]
  ),
  product(
    "ultima-plus-40-wg",
    "M_005", // matrixId for Ultima Plus 40 WG
    "insecticide",
    "আলটিমা প্লাস ৪০ ডব্লিউ জি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/ultimaplus-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%b2%e0%a6%9f%e0%a6%bf%e0%a6%ae%e0%a6%be-%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%aa%e0%a7%a6-%e0%a6%a1%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%9c%e0%a6%bf/",
    "এমামেকটিন বেনজয়েট + থায়ামেথোক্সাম",
    "ধানের মাজরা, বাদামী গাছ ফড়িং, পাতা মোড়ানো পোকা, বেগুনের ডগা ও ফল ছিদ্রকারী পোকা, শিম ও ঢেঁড়সের ফল ছিদ্রকারী পোকা, তুলার এফিড, জেসিড ও বলওয়ার্ম এবং সয়াবিনের ডগা ও ফল ছিদ্রকারী পোকা দমন করে।",
    "৩০ গ্রাম প্রতি একরে।",
    ["ধান", "বেগুন", "শিম", "ঢেঁড়স", "তুলা", "সয়াবিন"]
  ),
  product(
    "ashazeb-80-wp",
    "M_020", // matrixId for Ashazeb 80 WP (assuming, not in seed_matrix)
    "fungicide",
    "আশাজেব ৮০ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/ashazeb-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%b6%e0%a6%be%e0%a6%9c%e0%a7%87%e0%a6%ac-%e0%a7%ae%e0%a7%a6-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "মেনকোজেব",
    "আলু ও টমেটোর আর্লি ও লেট ব্লাইট, আমের এনথ্রাকনোজ, সবজির পচন রোগ এবং পানের পাতা পচ রোগ দমন করে।",
    "৮০০ গ্রাম প্রতি একরে।",
    ["আলু", "টমেটো", "আম", "সবজি", "পান"]
  ),
  product(
    "ashatheon-57-ec",
    "insecticide",
    "আশাথিয়ন ৫৭ ই সি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/ashatheon-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%b6%e0%a6%be%e0%a6%a5%e0%a6%bf%e0%a7%9f%e0%a6%a8-%e0%a7%ab%e0%a7%ad-%e0%a6%87-%e0%a6%b8%e0%a6%bf/",
    "ম্যালাথিয়ন",
    "ধানের বাদামি গাছ ফড়িং, গান্ধি ও পাতা মোড়ানো পোকা, বেগুনের ডগা ও ফল ছিদ্রকারী পোকা এবং শিমের জাব পোকা দমন করে।",
    "৪০০ মিলি প্রতি একরে।",
    ["ধান", "বেগুন", "শিম"]
  ),
  product(
    "ashaben-48-ec",
    "insecticide",
    "আশাব্যান ৪৮ ইসি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/ashaben-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%b6%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%a8-%e0%a7%aa%e0%a7%ae-%e0%a6%87%e0%a6%b8%e0%a6%bf/",
    "ক্লোরপাইরিফস",
    "ধানের মাজরা পোকা, পামরী পোকা, পাতা মোড়ানো পোকা, লেদা পোকা, শীষ কাটা লেদা পোকা এবং সবজির জাব ও আলুর কটুই পোকা দমন করে।",
    "মাটিতে ধানে ২০০ মিলি প্রতি একরে ও আলুতে ৬০০ মিলি প্রতি একরে।",
    ["ধান", "সবজি", "আলু"]
  ),
  product(
    "ashamill-72-wp",
    "fungicide",
    "আশামিল ৭২ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/ashamill-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%86%e0%a6%b6%e0%a6%be%e0%a6%ae%e0%a6%bf%e0%a6%b2-%e0%a7%ad%e0%a7%a8-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "মেনকোজেব + মেটালেক্সিল",
    "আলু ও টমেটোর আর্লি ও লেট ব্লাইট, সবজির পচন রোগ, পানের পাতা ও কান্ড পচা রোগ দমন করে।",
    "৮০০ গ্রাম প্রতি একরে।",
    ["আলু", "টমেটো", "সবজি", "পান"]
  ),
  product(
    "ethiplus-396-sl",
    "pgr",
    "ইথিপ্লাস ৩৯.৬ এস এল",
    "https://mimpexbd.com/wp-content/uploads/2022/08/ethiplus-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%87%e0%a6%a5%e0%a6%bf%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%a9%e0%a7%af-%e0%a7%ac-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
    "ইথেফন ৩৯.৬%",
    "উদ্ভিদের দৈহিক বৃদ্ধি, ফুলের সুষম বিকাশ, সমহারে ফলের বৃদ্ধি, ফলের আকৃতি বড় করা ও ফলন বৃদ্ধিতে সহায়তা করে।",
    "৮০ মিলি প্রতি একরে।",
    ["ফল", "সবজি"]
  ),
  product(
    "indol-25-ec",
    "insecticide",
    "ইনডোল ২.৫ ই সি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/indol-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%87%e0%a6%a8%e0%a6%a1%e0%a7%8b%e0%a6%b2-%e0%a7%a8-%e0%a7%ab-%e0%a6%87-%e0%a6%b8%e0%a6%bf/",
    "ল্যামডা-সাই-হ্যালোথ্রিন",
    "আমের হুপার, সবজির কাটুই পোকা, লেদা পোকা এবং ডগা ও ফল ছিদ্রকারী পোকা দমন করে।",
    "আমে ১ মিলি ১ লিটার পানিতে মিশিয়ে; সবজিতে ২০০ মিলি প্রতি একরে।",
    ["আম", "সবজি"]
  ),
  product(
    "m-72-d-fluid",
    "herbicide",
    "এম ৭২ ডি ফ্লুইড",
    "https://mimpexbd.com/wp-content/uploads/2022/08/m72d-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%8f%e0%a6%ae-%e0%a7%ad%e0%a7%a8-%e0%a6%a1%e0%a6%bf-%e0%a6%ab%e0%a7%8d%e0%a6%b2%e0%a7%81%e0%a6%87%e0%a6%a1/",
    "২, ৪-ডি এমাইন",
    "চায়ের মিকানিয়া, বাগ্রাকোট ও অন্যান্য দ্বিবীজপত্রি আগাছা এবং যাবতীয় কচুরিপানা দমন করে।",
    "১ লিটার প্রতি একরে।",
    ["চা", "কচুরিপানা"]
  ),
  product(
    "emkarb-25-wdg",
    "insecticide",
    "এমাকার্ব ২৫ ডাব্লিউ ডি জি",
    "https://mimpexbd.com/wp-content/uploads/2024/07/emkarb-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%8f%e0%a6%ae%e0%a6%be%e0%a6%95%e0%a6%be%e0%a6%b0%e0%a7%8d%e0%a6%ac-%e0%a7%a8%e0%a7%ab-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%a1%e0%a6%bf-%e0%a6%9c%e0%a6%bf/",
    "এমামেকটিন বেনজয়েট ৫% + ইনডস্কাকার্ব ২০%",
    "ধানের মাজরা পোকা, বেগুনের ডগা ও ফল ছিদ্রকারী পোকা, শিম ও ঢেঁড়শের ফল ছিদ্রকারী পোকা সফলভাবে দমন করে।",
    "১০০ গ্রাম প্রতি একরে।",
    ["ধান", "বেগুন", "শিম", "ঢেঁড়শ"]
  ),
  product(
    "amixor-325-sc",
    "fungicide",
    "এমিক্সোর ৩২.৫ এসসি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/amixor-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%8f%e0%a6%ae%e0%a6%bf%e0%a6%95%e0%a7%8d%e0%a6%b8%e0%a7%8b%e0%a6%b0-%e0%a7%a9%e0%a7%a8-%e0%a7%ab-%e0%a6%8f%e0%a6%b8%e0%a6%b8%e0%a6%bf/",
    "এজোক্সিস্ট্রবিন + ডাইফেনোকোনাজল",
    "ধানের খোল পোড়া, ব্লাস্ট সহ সকল রোগ, কলার সিগাটোকা ও পানামা, মরিচের লিফ স্পট, আমের এনথ্রাকনোজ ও পাউডারি মিলডিউ এবং সবজির ছত্রাকজনিত রোগ দমন করে।",
    "ধান ২০০ মিলি, কলা ১০০ মিলি, মরিচ ১০০ মিলি প্রতি একরে।",
    ["ধান", "কলা", "মরিচ", "আম", "সবজি"]
  ),
  product(
    "aroxon-20-sl",
    "herbicide",
    "এরোক্সন ২০ এস এল",
    "https://mimpexbd.com/wp-content/uploads/2022/08/aroxon-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%8f%e0%a6%b0%e0%a7%8b%e0%a6%95%e0%a7%8d%e0%a6%b8%e0%a6%a8-%e0%a7%a8%e0%a7%a6-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
    "প্যারাকুয়াট",
    "চা ও কলার আগাছা এবং সকল অনির্বাচিত আগাছা দমন করে।",
    "চা ৯০০ মিলি, কলা ৬০০ মিলি প্রতি একরে।",
    ["চা", "কলা"]
  ),
  product(
    "ojon-95-sp",
    "insecticide",
    "ওজন ৯৫ এস পি",
    "https://mimpexbd.com/wp-content/uploads/2024/07/ojon-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%93%e0%a6%9c%e0%a6%a8-%e0%a7%af%e0%a7%ab-%e0%a6%8f%e0%a6%b8-%e0%a6%aa%e0%a6%bf/",
    "কারটাপ ৯২% + অ্যাসিটামিপ্রিড ৩%",
    "ধানের মাজরা, সবজির ফল ছিদ্রকারী ও শোষক পোকাসহ সবধরনের ক্ষতিকর পোকা দমনে কার্যকরী।",
    "১৫০ গ্রাম প্রতি একরে।",
    ["ধান", "সবজি"]
  ),
  product(
    "wonder-5-wg",
    "insecticide",
    "ওয়ান্ডার ৫ ডাব্লিউ জি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/wonder-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%93%e0%a7%9f%e0%a6%be%e0%a6%a8%e0%a7%8d%e0%a6%a1%e0%a6%be%e0%a6%b0-%e0%a7%ab-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%9c%e0%a6%bf/",
    "এমামেকটিন বেনজয়েট",
    "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা, শিম ও ঢেঁড়সের ফল ছিদ্রকারী পোকা, জাবপোকা, তুলার জাবপোকা ও বলওয়ার্ম দমন করে।",
    "২০০ গ্রাম প্রতি একরে।",
    ["বেগুন", "শিম", "ঢেঁড়স", "তুলা"]
  ),
  product(
    "copter-55-sc",
    "herbicide",
    "কপটার ৫৫ এসসি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/copter-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a6%aa%e0%a6%9f%e0%a6%be%e0%a6%b0-%e0%a7%ab%e0%a7%ab-%e0%a6%8f%e0%a6%b8%e0%a6%b8%e0%a6%bf/",
    "এন্ট্রাজিন ৫০% + মেসোট্রিয়ন ৫%",
    "নির্বাচিত ও প্রবাহমান আগাছানাশক; পাতা, কান্ড ও শিকড়ের মাধ্যমে আগাছার ভিতরে প্রবেশ করে এবং ভুট্টার সকল প্রকার আগাছা দমনে কার্যকরী।",
    "৮০০ মিলি প্রতি একরে।",
    ["ভুট্টা"]
  ),
  product(
    "cuplan-30-sc",
    "insecticide",
    "কপলান ৩০ এস সি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/cuplan-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a6%aa%e0%a6%b2%e0%a6%be%e0%a6%a8-%e0%a7%a9%e0%a7%a6-%e0%a6%8f%e0%a6%b8-%e0%a6%b8%e0%a6%bf/",
    "এমামেকটিন বেনজয়েট + থায়ামেথোক্সাম",
    "ধানের মাজরা পোকা, বাদামি গাছ ফড়িং, বেগুনের ডগা ও ফল ছিদ্রকারী পোকা, শিমের জাব পোকা, তুলার এফিড, জেসিড ও বলওয়ার্ম এবং মুগ ও সয়াবিন ফল ছিদ্রকারী পোকা দমন করে।",
    "১০০ মিলি প্রতি একরে।",
    ["ধান", "বেগুন", "শিম", "তুলা", "মুগ", "সয়াবিন"]
  ),
  product(
    "qubee-50-wp",
    "fungicide",
    "কিউবি ৫০ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/qubee-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a6%bf%e0%a6%89%e0%a6%ac%e0%a6%bf-%e0%a7%ab%e0%a7%a6-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "কার্বেন্ডাজিম",
    "ধানের খোল পোড়া রোগ, কুমড়া জাতীয় ফসলের পাউডারি মিলডিউ, টমেটো গাছের নেতিয়ে পড়া রোগ, আমের এনথ্রাকনোজ এবং সবজির পাতাপচা, কান্ডপচা ও ফলপচা রোগ দমনে কার্যকরী।",
    "ধান ২০০ গ্রাম, কুমড়া জাতীয় ফসল ২০০ গ্রাম, আমে ২ মিলি প্রতি লিটার পানিতে।",
    ["ধান", "কুমড়া", "টমেটো", "আম", "সবজি"]
  ),
  product(
    "quloop-5-ec",
    "herbicide",
    "কিউলোপ ৫ ইসি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/quloop-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a6%bf%e0%a6%89%e0%a6%b2%e0%a7%8b%e0%a6%aa-%e0%a7%ab-%e0%a6%87%e0%a6%b8%e0%a6%bf/",
    "কুইজালোফপ-পি-ইথাইল",
    "পাটের সকল প্রকার আগাছা দমন করে।",
    "৪৫০ মিলি প্রতি একরে।",
    ["পাট"]
  ),
  product(
    "kimia-215-wp",
    "fungicide",
    "কিমিয়া ২১.৫ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/kimia-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a6%bf%e0%a6%ae%e0%a6%bf%e0%a7%9f%e0%a6%be-%e0%a7%a8%e0%a7%a7-%e0%a7%ab-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "বিসমার্থিওজল + কাসুগামাইসিন",
    "ধানের ব্যাকটেরিয়াজনিত পাতা ঝলসানো রোগ, টমেটোর ঢলে পড়া রোগ, বেগুন, আলু, মরিচ সহ অন্যান্য সবজির ঢলে পড়া রোগে কার্যকরী।",
    "ধান ৬০০ গ্রাম, টমেটো ৪০০ গ্রাম, সবজি ৪০০ গ্রাম প্রতি একরে।",
    ["ধান", "টমেটো", "বেগুন", "আলু", "মরিচ", "সবজি"]
  ),
  product(
    "kubaril-85-wp",
    "insecticide",
    "কুবারিল ৮৫ ডাব্লিউ পি",
    "https://mimpexbd.com/wp-content/uploads/2022/07/kubaril-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a7%81%e0%a6%ac%e0%a6%be%e0%a6%b0%e0%a6%bf%e0%a6%b2-%e0%a7%ae%e0%a7%ab-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%aa%e0%a6%bf/",
    "কার্বারিল",
    "ধানের পাতা মোড়ানো পোকা, পাটের বিছা পোকা, ডাল ও তৈল বীজ জাতীয় ফসলের চুষে খাওয়া পোকা এবং আমের হুপার দমন করে।",
    "ধান ৬৮০ গ্রাম প্রতি একরে; আমে ২ গ্রাম প্রতি লিটার পানিতে।",
    ["ধান", "পাট", "ডাল", "তৈল বীজ", "আম"]
  ),
  product(
    "kotan-50-wg",
    "insecticide",
    "কোটান ৫০ ডাব্লিউ জি",
    "https://mimpexbd.com/wp-content/uploads/2022/08/kotan-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a7%8b%e0%a6%9f%e0%a6%be%e0%a6%a8-%e0%a7%ab%e0%a7%a6-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%9c%e0%a6%bf/",
    "পাইমেট্রোজিন",
    "ধানের বাদামি গাছ ফড়িং এবং সব ধরনের সবজির শোষণ পোকা দমনে কার্যকরী।",
    "১২০ গ্রাম প্রতি একরে।",
    ["ধান", "সবজি"]
  ),
  product(
    "kotan-plus-70-wg",
    "insecticide",
    "কোটান প্লাস ৭০ ডাব্লিউ জি",
    "https://mimpexbd.com/wp-content/uploads/2024/07/kotan-plus-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a7%8b%e0%a6%9f%e0%a6%be%e0%a6%a8-%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%ad%e0%a7%a6-%e0%a6%a1%e0%a6%be%e0%a6%ac%e0%a7%8d%e0%a6%b2%e0%a6%bf%e0%a6%89-%e0%a6%9c%e0%a6%bf/",
    "পাইমেট্রোজিন ৫০% + নিতেনপাইরাম ২০%",
    "ধানের বাদামী গাছ ফড়িং দমনে কার্যকরী।",
    "৯০ গ্রাম প্রতি একরে।",
    ["ধান"]
  ),
  product(
    "kanopi-20-sl",
    "insecticide",
    "ক্যানপি ২০ এস এল",
    "https://mimpexbd.com/wp-content/uploads/2022/08/kanopi20-product-frame-300x300.png",
    "https://mimpexbd.com/product/%e0%a6%95%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%a8%e0%a6%aa%e0%a6%bf-%e0%a7%a8%e0%a7%a6-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
    "ইমিডাক্লোপ্রিড",
    "তুলার বলওয়ার্ম ও শোষণ পোকা, আমের হুপার, অন্যান্য সবজির শোষণ পোকা এবং ধানের বাদামি গাছ ফড়িং দমন করে।",
    "তুলা, আম, ধান ও সকল সবজিতে ৫০ মিলি প্রতি একরে।",
    ["তুলা", "আম", "ধান", "সবজি"]
  ),
];

export function getCatalogProduct(id: string) {
  return MIMPEX_CATALOG.find((product) => product.id === id);
}

export function getProductSlug(product: Pick<MimpexCatalogProduct, "sourceUrl" | "id">) {
  try {
    const path = new URL(product.sourceUrl).pathname;
    const parts = path.split("/").filter(Boolean);
    return parts.at(-1) ?? product.id;
  } catch {
    return product.id;
  }
}

export function getCatalogProductBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  return MIMPEX_CATALOG.find((product) => {
    const officialSlug = getProductSlug(product);
    return product.id === slug || officialSlug === slug || decodeURIComponent(officialSlug) === decodedSlug || product.matrixId === slug;
  });
}

export function getCategoryLabel(id: ProductCategoryId, locale: "en" | "bn" = "bn") {
  const category = CATALOG_CATEGORIES.find((item) => item.id === id);
  if (!category) return id;
  return locale === "bn" ? category.labelBn : category.labelEn;
}

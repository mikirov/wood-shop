import type { BlogPost } from "./types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-epoxy-river-tables-are-made",
    publishedAt: "2026-07-20",
    coverImage: "/products/midnight-vein.jpg",
    related: [
      { path: "/custom", labelKey: "custom" },
      { path: "/about", labelKey: "about" },
    ],
    en: {
      title: "How epoxy river tables are made in a small Bulgarian workshop",
      description:
        "A clear walkthrough of how we build epoxy river tables: timber selection, drying, routing the river channel, pouring resin, flattening, finishing, and packing for delivery.",
      excerpt:
        "River tables look simple from above. Underneath that dark line of resin is a sequence of drying, routing, pouring, and weeks of curing that decide whether the piece stays flat for years.",
      sections: [
        {
          heading: "What a river table actually is",
          paragraphs: [
            "An epoxy river table joins two (or more) live-edge slabs with a cast resin channel — the “river.” The wood carries the structure and character; the resin fills voids, locks movement, and creates the visual contrast people order when they want something that is clearly handmade rather than factory-cut.",
            "In our workshop in Bulgaria we build these by enquiry, not from a fixed catalogue size. Length, thickness, wood species, and base style change the cost and timeline, which is why tables stay quote-only while smaller flat pieces sit in the shop ready to ship.",
          ],
        },
        {
          heading: "1. Choosing and preparing the timber",
          paragraphs: [
            "We start with slabs that have honest grain and stable moisture — usually walnut, oak, or ash depending on the brief. Live edges are cleaned, not sanded into unnatural curves. Soft bark that will shed later is removed; cracks that should stay as character are noted before any pour.",
            "Moisture matters more than Instagram lighting. Wood that is too wet will move after the resin cures and can open gaps or cup the top. We let stock acclimate in the workshop, check it, and only then mark out how the river will run between the pieces.",
          ],
        },
        {
          heading: "2. Routing, dams, and dry fit",
          paragraphs: [
            "The slabs are arranged so the river feels deliberate — wider in places, tighter where the grain already tells a story. Edges that will meet resin are cleaned so the epoxy bonds to sound wood, not dust or oil.",
            "We build temporary dams and a level pour bed. A dry fit catches rockers and height mismatches before resin is mixed. Once epoxy is liquid, there is no “almost” — the geometry has to be right first.",
          ],
        },
        {
          heading: "3. Mixing and pouring the resin",
          paragraphs: [
            "We measure resin and hardener carefully. Cheap shortcuts here show up months later as soft spots or cloudy bands. Pigment — deep black, smoky charcoal, or a tinted translucent pour — is mixed until colour is even, then poured in stages when the channel is deep.",
            "Bubbles are the enemy of a calm river. Heat, careful pouring, and patience clear most of them. Deep pours are staged so the exotherm does not warp the wood or cook the epoxy. Then the piece waits: curing is not optional and not something you rush for a delivery date.",
          ],
        },
        {
          heading: "4. Flattening, sanding, and finish",
          paragraphs: [
            "After full cure, we flatten the top so wood and resin sit in one plane. That step is what makes a river table feel expensive under a hand: no ridges at the join, no dish in the middle of the pour.",
            "Sanding moves through grits until the surface is ready for oil or hardwax. Edges are eased so the table is pleasant to use, not sharp like a sample board. The finish we choose depends on whether the piece will live as a dining surface, desk, or display table — always for indoor use unless agreed otherwise.",
          ],
        },
        {
          heading: "5. Base, packing, and what happens next",
          paragraphs: [
            "Metal bases are fitted or supplied to match the quote. We check level again after assembly. Tables leave in crates; we agree the Econt or arranged date before they leave the workshop.",
            "If you are comparing makers, ask how they dry wood, how deep they pour in one go, and what they guarantee after delivery. Those answers matter more than a single hero photo. Ready-made boards and coasters follow a related process at smaller scale — and they ship faster from our shop with a lifetime guarantee against cracking and delamination in normal indoor use.",
          ],
        },
      ],
    },
    bg: {
      title: "Как се правят епоксидни river маси в малка българска работилница",
      description:
        "Ясна стъпка по стъпка разходка: избор на дървесина, сушене, фрезоване на реката, заливане със смола, изравняване, покритие и опаковане за доставка.",
      excerpt:
        "River масата изглежда проста отгоре. Под тъмната линия смола има седмици сушене, фрезоване, заливане и втвърдяване, които решават дали плотът ще остане равен с години.",
      sections: [
        {
          heading: "Какво всъщност е river масата",
          paragraphs: [
            "Епоксидната river маса свързва две (или повече) плочи с жив ръб чрез отлята смолна „река“. Дървото носи конструкцията и характера; смолата запълва кухините, заключва движението и създава контраста, заради който хората поръчват ръчна изработка, а не фабричен плот.",
            "В работилницата ни в България ги правим по запитване, не по фиксиран каталожен размер. Дължина, дебелина, вид дървесина и основа променят цената и срока — затова масите са само с оферта, а по-малките плоски изделия са в магазина готови за изпращане.",
          ],
        },
        {
          heading: "1. Избор и подготовка на дървесината",
          paragraphs: [
            "Започваме с плочи с честна текстура и стабилна влажност — обикновено орех, дъб или ясен според заданието. Живите ръбове се почистват, не се шлайфат до неестествени криви. Меката кора, която после ще се рони, се маха; пукнатини, които трябва да останат като характер, се отбелязват преди заливането.",
            "Влажността е по-важна от красивата снимка. Прекалено мокрото дърво се движи след втвърдяване на смолата и може да отвори фуги или да изкриви плота. Оставяме материала да аклиматизира в работилницата, проверяваме го и чак тогава маркираме как ще мине реката.",
          ],
        },
        {
          heading: "2. Фрезоване, диги и суха проба",
          paragraphs: [
            "Плочите се подреждат така, че реката да изглежда нарочна — по-широка на места, по-тясна там, където зърното вече разказва история. Ръбовете към смолата се почистват, за да лепне епоксидът към здраво дърво, не към прах или масло.",
            "Правим временни диги и равна основа за заливане. Сухата проба хваща люлеене и разлики във височината преди да се смеси смолата. Когато епоксидът е течен, няма „почти“ — геометрията трябва да е вярна първо.",
          ],
        },
        {
          heading: "3. Смесване и заливане на смолата",
          paragraphs: [
            "Мерим смола и втвърдител внимателно. Евтините компромиси тук се виждат месеци по-късно като меки зони или мътни ивици. Пигментът — дълбоко черно, димен въглен или прозирно оцветено заливане — се разбърква до равномерен цвят и се налива на етапи, когато каналът е дълбок.",
            "Мехурчетата са враг на спокойната река. Топлина, внимателно наливане и търпение махат повечето. Дълбоките заливания са на етапи, за да не изкриви екзотермията дървото и да не „свари“ смолата. После изделието чака: втвърдяването не е по желание и не се ускорява заради дата на доставка.",
          ],
        },
        {
          heading: "4. Изравняване, шлайфане и покритие",
          paragraphs: [
            "След пълно втвърдяване изравняваме плота, така че дърво и смола да са в една равнина. Това прави river масата да се усеща скъпа под ръка: без праг при съединението, без падина в средата на заливането.",
            "Шлайфането минава през градации, докато повърхността е готова за масло или твърд восък. Ръбовете се омекотяват, за да е приятна за ползване. Покритието зависи дали ще е трапеза, бюро или витрина — винаги за употреба на закрито, освен ако не е уговорено друго.",
          ],
        },
        {
          heading: "5. Основа, опаковане и какво следва",
          paragraphs: [
            "Металните основи се монтират или доставят според офертата. Пак проверяваме нивелиране след сглобка. Масите тръгват в каси; уговаряме датата с Еконт или друг превоз преди да напуснат работилницата.",
            "Ако сравнявате майстори, питайте как сушат дървото, колко дълбоко заливат наведнъж и какво гарантират след доставка. Тези отговори тежат повече от една хубава снимка. Готовите дъски и подложки минават през сродни стъпки в по-малък мащаб — и тръгват по-бързо от магазина ни с пожизнена гаранция срещу напукване и разлепване при нормална употреба на закрито.",
          ],
        },
      ],
    },
  },
  {
    slug: "why-wooden-boards-crack-and-how-we-prevent-it",
    publishedAt: "2026-07-22",
    coverImage: "/products/board-blue.jpg",
    related: [
      { path: "/shop", labelKey: "shop" },
      { path: "/about", labelKey: "about" },
    ],
    en: {
      title: "Why wooden boards crack — and how a lifetime guarantee is possible",
      description:
        "Learn why cutting boards and resin wood pieces crack or delaminate, what workshop steps prevent it, and how our lifetime guarantee against cracking works for indoor use.",
      excerpt:
        "Cracking is not random bad luck. It usually traces back to moisture, glue lines, or finish that never sealed the end grain. Here is what we do differently — and what the lifetime cover actually means.",
      sections: [
        {
          heading: "The short answer people ask in our FAQ",
          paragraphs: [
            "Don’t wooden boards crack? If they are made and looked after properly — no, not in normal home use. That is why our ready-made shop pieces carry a lifetime guarantee against cracking and delamination indoors. Transit damage is a separate promise: photo us within 48 hours and we sort a replacement or refund.",
            "Below is the longer version — useful if you are buying a board as a gift, comparing workshops, or wondering whether resin “holds wood together forever” by magic. It does not. Good process does.",
          ],
        },
        {
          heading: "What actually causes cracks and glue failure",
          paragraphs: [
            "Wood expands and shrinks across the grain as humidity changes. A board left wet by the sink, dried on a radiator, or stored in a sealed plastic bag swings harder than one wiped and left to breathe. End grain drinks water fastest; if it was never sealed well, fine checks appear first at the ends.",
            "Delamination — glue lines opening — often means the joint was starved of adhesive, clamped wrong, or stressed by a slab that was still moving when it was glued. Resin can lock voids, but it cannot freeze a soaking-wet board into permanent stillness. If moisture was high at pour or glue-up, movement shows up later as a hairline or a lifted edge.",
          ],
        },
        {
          heading: "How we build for stability",
          paragraphs: [
            "We select stock that has already been dried properly, then let it sit in our workshop climate before cutting. For boards and trays with resin accents, we clean voids and bond to sound fibre. Glue-ups get enough adhesive and even pressure; we do not rush clamp time.",
            "After shaping, pieces are finished so faces and end grain take oil or hardwax evenly. Edges are eased so stress does not concentrate on a sharp arris. Shop pieces that leave with us are intended for indoor kitchens and tables — not outdoor decks or dishwashers.",
          ],
        },
        {
          heading: "What “lifetime against cracking” covers",
          paragraphs: [
            "For ready-made shop items: if the piece cracks or the glue / resin bond fails in normal indoor use, we repair or replace it. That is the promise behind the badge you see on product pages.",
            "It does not cover misuse: soaking overnight, dishwasher cycles, outdoor weather, cutting as if it were a chopping block meant for axes, or damage from drops and transit after the 48-hour photo window. Custom tables follow the written quote; manufacturing faults are repaired or remade, while personalised work is outside the 14-day EU withdrawal once production has started.",
          ],
        },
        {
          heading: "Simple care that keeps a board honest",
          paragraphs: [
            "Wipe spills soon. Avoid long soaks. Let the piece dry upright or on a rack, not trapped wet against a sealed surface. A light re-oil a few times a year keeps the surface from looking thirsty — it is maintenance, not a repair.",
            "If something does go wrong under normal use, email us with photos and your invoice number (OR-YEAR-####). We would rather fix a rare failure than pretend wood never moves. The goal is a board you trust beside the sink for years — which is also why inspection on COD with Econt exists: you check quality before you pay.",
          ],
        },
      ],
    },
    bg: {
      title: "Защо се напукват дървените дъски — и как е възможна пожизнената гаранция",
      description:
        "Защо дъски и изделия с дърво и смола се напукват или разлепват, какви стъпки в работилницата го предотвратяват и какво покрива пожизнената ни гаранция при употреба на закрито.",
      excerpt:
        "Напукването не е случайен лош късмет. Обикновено идва от влага, лепилни фуги или покритие, което не е запечатало челото. Ето какво правим различно — и какво реално означава пожизненото покритие.",
      sections: [
        {
          heading: "Краткият отговор от често задаваните въпроси",
          paragraphs: [
            "Дървените дъски не се ли напукват? Ако са произведени и се поддържат правилно — не, при нормална домашна употреба. Затова готовите ни изделия от магазина са с пожизнена гаранция срещу напукване и разлепване на закрито. Повреда при транспорт е отделно обещание: снимки до 48 часа и уреждаме замяна или възстановяване.",
            "По-долу е дългата версия — полезна, ако купувате дъска за подарък, сравнявате работилници или се чудите дали смолата „държи дървото завинаги“ като магия. Не. Добрият процес държи.",
          ],
        },
        {
          heading: "Какво реално причинява пукнатини и разлепване",
          paragraphs: [
            "Дървото се разширява и свива напречно на зърното при промяна на влажността. Дъска, оставена мокра до мивката, сушена на радиатор или държана в затворен найлон, се люлее по-силно от такава, която се избърсва и диша. Челото поема вода най-бързо; ако не е запечатано добре, първите фини пукнатини се появяват там.",
            "Разлепването — отваряне на лепилните фуги — често значи гладна фуга, лошо стягане или напрежение от плоча, която още се е движела при залепване. Смолата може да заключи кухини, но не може да замрази мокра дъска в постоянна неподвижност. Ако влагата е била висока при залепване или заливане, движението се показва по-късно като косъм или повдигнат ръб.",
          ],
        },
        {
          heading: "Как строим за стабилност",
          paragraphs: [
            "Избираме материал, който вече е изсушен правилно, после го оставяме в климата на работилницата преди рязане. При дъски и тави със смолни акценти почистваме кухините и лепим към здрави влакна. Залепванията получават достатъчно лепило и равномерен натиск; не съкращаваме времето на стягане.",
            "След оформяне изделията се покриват така, че лицата и челото да поемат масло или твърд восък равномерно. Ръбовете се омекотяват, за да не се концентрира напрежението. Магазинните изделия са за кухни и маси на закрито — не за тераси и не за съдомиялна.",
          ],
        },
        {
          heading: "Какво покрива „пожизнено срещу напукване“",
          paragraphs: [
            "За готовите изделия от магазина: ако се напука или лепилото / връзката със смолата откаже при нормална употреба на закрито, ремонтираме или заменяме. Това стои зад значката на продуктовите страници.",
            "Не покрива злоупотреба: киснене през нощта, съдомиялна, външни условия, рязане като върху пън за брадва, или повреда от падане и транспорт след прозореца от 48 часа за снимки. Поръчковите маси следват писмената оферта; производствени дефекти се ремонтират или изработват наново, а персонализираната работа е извън 14-дневното право на отказ в ЕС, след като производството е започнало.",
          ],
        },
        {
          heading: "Проста грижа, която пази дъската честна",
          paragraphs: [
            "Избърсвайте разливи бързо. Избягвайте дълго киснене. Сушете изправена или на решетка, не затворена мокра към непропусклива повърхност. Леко подхранване с масло няколко пъти годишно пази повърхността — това е поддръжка, не ремонт.",
            "Ако нещо се обърка при нормална употреба, пишете ни със снимки и номера на фактурата (OR-YEAR-####). По-добре да оправим рядък отказ, отколкото да твърдим, че дървото никога не се движи. Целта е дъска, на която вярвате до мивката с години — затова и има преглед при наложен платеж с Еконт: проверявате качеството преди да платите.",
          ],
        },
      ],
    },
  },
  {
    slug: "choosing-wood-and-resin-for-boards-and-coasters",
    publishedAt: "2026-07-24",
    coverImage: "/products/coasters-blue.jpg",
    related: [
      { path: "/shop", labelKey: "shop" },
      { path: "/custom", labelKey: "custom" },
    ],
    en: {
      title: "Choosing wood and resin for boards, coasters, and small gifts",
      description:
        "Practical guide to wood species, blue vs black resin, and which Obsidian River shop pieces suit daily kitchen use versus gift-giving in Bulgaria and the EU.",
      excerpt:
        "Small epoxy-and-wood pieces succeed when material matches use. Here is how we think about species, resin colour, and which items ship ready from the shop.",
      sections: [
        {
          heading: "Start with how the piece will live",
          paragraphs: [
            "A coaster under a cold glass faces condensation. A cheese board sees knives and oil. A tray carries weight across a span. Matching wood hardness, finish, and resin placement to that life is more useful than chasing the flashiest pour photo.",
            "Our shop focuses on flat, ready-to-ship pieces: coasters, boards, trays, and similar objects with fixed EUR prices. Custom river tables stay on the enquiry path because size and base change everything.",
          ],
        },
        {
          heading: "Wood: grain, hardness, and food contact",
          paragraphs: [
            "Denser hardwoods generally mark less under daily use and take oil finishes well. Open grain can look dramatic with resin inlays; closed grain can feel silkier under a glass. We choose stock that is sound — no hidden soft rot in a void we plan to fill.",
            "For pieces that will touch food, we finish with kitchen-sensible oils or hardwaxes and avoid treating the surface like a decorative sculpture that never gets washed. Wipe clean; do not dishwasher. That care line is the same whether the accent resin is blue or black.",
          ],
        },
        {
          heading: "Blue resin vs black resin",
          paragraphs: [
            "Black reads formal and pairs with darker furniture — good for gifts when you do not know the room. Blue reads clearer and more contemporary; it photographs brightly and suits lighter kitchens. Functionally both are the same workshop process: measured mix, controlled pour, full cure, then flatten and finish with the wood.",
            "On product pages you can switch variants in a family when both colours exist. Stock and lead time show as ready to ship when the piece is in inventory — typically sent within 1–3 days with Econt in Bulgaria once the order is confirmed.",
          ],
        },
        {
          heading: "Gifts, engraving, and presentation",
          paragraphs: [
            "Small boards and coaster sets are natural gifts because they arrive packed to look intentional — kraft, tissue, a short note — not like a spare warehouse carton. At checkout you can add initials, a date, or a short line for engraving before we pack.",
            "If you need a larger statement piece for a dining room, skip forcing a shop board to do a table’s job. Send sizes and a rough sketch through the custom enquiry; we reply with a number and timeline instead of a misleading fixed price.",
          ],
        },
        {
          heading: "A simple buying checklist",
          paragraphs: [
            "Confirm indoor use, check resin colour, note stock, and read the lifetime cracking guarantee on the product page. Prefer COD with inspection if you want to see the grain before paying. Keep the invoice number for any later care question.",
            "That checklist beats impulse-clicking the largest photo. Material honesty is the brand promise: wood will have variation; resin will have depth; the process behind both should be explainable in plain language — which is what this journal is for.",
          ],
        },
      ],
    },
    bg: {
      title: "Как да изберете дървесина и смола за дъски, подложки и малки подаръци",
      description:
        "Практичен гид за видове дървесина, синя срещу черна смола и кои изделия от магазина на Obsidian River са за ежедневна кухня и кои — за подарък в България и ЕС.",
      excerpt:
        "Малките изделия от дърво и епоксид успяват, когато материалът пасва на употребата. Ето как мислим за вида дървесина, цвета на смолата и кои неща тръгват готови от магазина.",
      sections: [
        {
          heading: "Започнете с това как ще живее изделието",
          paragraphs: [
            "Подложка под студена чаша вижда конденз. Дъска за сирена вижда нож и мазнина. Тава носи тежест през разстояние. Да съчетаете твърдост на дървото, покритие и място на смолата с този живот е по-полезно от най-бляскавата снимка на заливане.",
            "Магазинът ни е за плоски, готови за изпращане изделия: подложки, дъски, тави и сходни обекти с фиксирани цени в евро. Поръчковите river маси остават със запитване, защото размерът и основата променят всичко.",
          ],
        },
        {
          heading: "Дървесина: зърно, твърдост и контакт с храна",
          paragraphs: [
            "По-плътните твърди дървесини обикновено се драскат по-малко при ежедневна употреба и поемат добре маслени покрития. Отвореното зърно изглежда драматично със смолни инкрустации; затвореното може да е по-копринено под чаша. Избираме здрав материал — без скрито меко гниене в кухина, която планираме да запълним.",
            "За изделия с допир до храна покриваме с кухненски смислени масла или твърди восъци и не третираме повърхността като скулптура, която никога не се мие. Избършете; не слагайте в съдомиялна. Тази грижа важи еднакво за синя и черна смола.",
          ],
        },
        {
          heading: "Синя смола срещу черна смола",
          paragraphs: [
            "Черното е по-офимашно-тържествено и пасва на по-тъмни мебели — добро за подарък, когато не познавате стаята. Синьото е по-ясно и съвременно; снима се ярко и пасва на по-светли кухни. Функционално процесът е един: мерена смес, контролирано заливане, пълно втвърдяване, после изравняване и покритие заедно с дървото.",
            "В продуктовите страници можете да сменяте варианти в семейство, когато има и двата цвята. Наличност и срок показват готовност за изпращане — обикновено в рамките на 1–3 дни с Еконт в България след потвърдена поръчка.",
          ],
        },
        {
          heading: "Подаръци, гравиране и представяне",
          paragraphs: [
            "Малките дъски и комплекти подложки са естествени подаръци, защото пристигат опаковани нарочно — крафт, хартия, кратка бележка — не като складов кашон. При поръчка можете да добавите инициали, дата или кратък ред за гравиране преди опаковане.",
            "Ако ви трябва по-голям акцент за трапезария, не карайте магазинна дъска да върши работата на маса. Изпратете размери и груба скица през запитването за поръчкова маса; връщаме сума и срок вместо подвеждаща фиксирана цена.",
          ],
        },
        {
          heading: "Прост контролен списък при покупка",
          paragraphs: [
            "Потвърдете употреба на закрито, проверете цвета на смолата, вижте наличността и прочетете пожизнената гаранция срещу напукване на продуктовата страница. Предпочетете наложен платеж с преглед, ако искате да видите зърното преди да платите. Пазете номера на фактурата за въпроси по грижата по-късно.",
            "Този списък бие импулсното кликване върху най-голямата снимка. Честността на материала е обещанието на марката: дървото ще има вариация; смолата ще има дълбочина; процесът зад двете трябва да се обяснява на нормален език — затова съществува този дневник.",
          ],
        },
      ],
    },
  },
  {
    slug: "from-workshop-to-econt-finishing-packing-shipping",
    publishedAt: "2026-07-26",
    coverImage: "/brand/packaging.jpg",
    related: [
      { path: "/shipping", labelKey: "shipping" },
      { path: "/shop", labelKey: "shop" },
    ],
    en: {
      title: "From workshop to Econt: finishing, packing, and shipping in Bulgaria",
      description:
        "How Obsidian River finishes shop pieces, packs them as gifts, and ships with Econt in 1–3 days — including cash-on-delivery inspection and what happens if stock is short.",
      excerpt:
        "Making the object is half the story. The other half is a calm finish, packing that survives the road, and a delivery choice that lets you inspect before you pay.",
      sections: [
        {
          heading: "Why shipping is part of the craft",
          paragraphs: [
            "A board that leaves with fingerprint oil and a loose corner in the box will not feel handmade when it arrives. We treat the last metres of the process — final wipe, wrap, label, handoff to Econt — as carefully as the pour.",
            "Shop orders are built for speed without skipping cure or stock checks. We aim to keep popular pieces available and to dispatch within 1–3 days after order confirmation. If something is not in stock, we contact you instead of guessing.",
          ],
        },
        {
          heading: "Finish checks before anything is wrapped",
          paragraphs: [
            "We look for even sheen, clean edges, and resin that sits flush with wood. Dust from sanding is removed; the piece is dry to the touch. Engraving, when requested at checkout, happens before packing so the gift note and the personalisation arrive together.",
            "Sold-out items stay marked on the site. Low stock is called out when only a few remain. That honesty beats overselling a photo of a piece that is still curing on the bench.",
          ],
        },
        {
          heading: "Packing that looks like a gift and travels like freight",
          paragraphs: [
            "Kraft and tissue protect surfaces without plastic cling that traps moisture against fresh finish. Corners get enough padding for Econt handling. A short workshop note travels with the piece so the unboxing feels personal rather than anonymous.",
            "Tables and large commissions use crates and dates agreed in advance. Flat shop pieces use standard parcel flows — office pickup or address delivery, chosen at checkout through our Econt city and office search.",
          ],
        },
        {
          heading: "Cash on delivery and inspection",
          paragraphs: [
            "With COD via Econt you can inspect the parcel and pay when you are convinced of the quality. That answers a question we hear often: yes, you get to look before the money leaves your hand.",
            "Bank transfer remains available with the invoice number as reference (IBAN details are on the order email and legal pages). Ownership passes when payment is received in full. Either path still includes the lifetime cracking guarantee on eligible shop pieces and the 14-day EU withdrawal for unused ready-made goods.",
          ],
        },
        {
          heading: "If something arrives wrong",
          paragraphs: [
            "Photograph transit damage within 48 hours and write to us with the invoice number. We arrange replacement or refund for shipping faults. Manufacturing issues under the lifetime cracking cover are handled as repair or replace for normal indoor use.",
            "Clear process after delivery is as much SEO content as it is customer service: people search for makers who explain Econt, inspection, and guarantees in Bulgarian and English. We would rather publish the real workflow than hide it behind a slogan.",
          ],
        },
      ],
    },
    bg: {
      title: "От работилницата до Еконт: покритие, опаковане и доставка в България",
      description:
        "Как Obsidian River довършва магазинните изделия, опакова ги като подарък и ги изпраща с Еконт за 1–3 дни — включително преглед при наложен платеж и какво става при липса на наличност.",
      excerpt:
        "Изработването на обекта е половината история. Другата половина е спокойно покритие, опаковка, която издържа пътя, и доставка, при която можете да прегледате преди да платите.",
      sections: [
        {
          heading: "Защо доставката е част от занаята",
          paragraphs: [
            "Дъска, която тръгва с отпечатъци от масло и хлабав ъгъл в кашона, няма да се усеща ръчна, когато пристигне. Последните метри от процеса — финално избърсване, увиване, етикет, предаване на Еконт — ги третираме толкова внимателно, колкото и заливането.",
            "Поръчките от магазина са за бързина без да пропускаме втвърдяване или проверка на наличност. Стараем се популярните изделия да са налични и да тръгват в рамките на 1–3 дни след потвърждение. Ако нещо липсва, се свързваме с вас, вместо да гадаем.",
          ],
        },
        {
          heading: "Проверки на покритието преди опаковане",
          paragraphs: [
            "Гледаме за равен блясък, чисти ръбове и смола, която седи в равнина с дървото. Прахът от шлайфане се маха; изделието е сухо на пипане. Гравирането, когато е поискано при поръчка, става преди опаковането, за да пристигнат заедно бележката и персонализацията.",
            "Изчерпаните артикули остават маркирани в сайта. Ниската наличност се посочва, когато остават малко бройки. Тази честност бие надпродажбата на снимка на изделие, което още се втвърдява на тезгяха.",
          ],
        },
        {
          heading: "Опаковка като подарък и като товар",
          paragraphs: [
            "Крафт и хартия пазят повърхностите без найлон, който държи влага към прясно покритие. Ъглите получават достатъчно подложка за обработката на Еконт. Кратка бележка от работилницата пътува с изделието, за да е разопаковането лично, не анонимно.",
            "Масите и големите поръчки са в каси с дати, уговорени предварително. Плоските магазинни изделия ползват стандартен колет — офис или адрес, избран при поръчка през търсенето на град и офис на Еконт.",
          ],
        },
        {
          heading: "Наложен платеж и преглед",
          paragraphs: [
            "При наложен платеж с Еконт можете да прегледате пратката и да платите, когато сте убедени в качеството. Това отговаря на въпрос, който чуваме често: да, гледате преди парите да тръгнат от ръката ви.",
            "Банков превод също е възможен с номера на фактурата като основание (IBAN е в имейла за поръчката и в правните страници). Собствеността преминава след пълно плащане. И при двата пътя важат пожизнената гаранция срещу напукване за подходящите магазинни изделия и 14-дневното право на отказ в ЕС за неизползвани готови стоки.",
          ],
        },
        {
          heading: "Ако нещо пристигне грешно",
          paragraphs: [
            "Снимайте повреда при транспорт до 48 часа и пишете ни с номера на фактурата. Уреждаме замяна или възстановяване при транспортна вина. Производствени проблеми под пожизненото покритие срещу напукване се решават с ремонт или замяна при нормална употреба на закрито.",
            "Ясният процес след доставка е толкова съдържание за търсене, колкото и обслужване: хората търсят майстори, които обясняват Еконт, преглед и гаранции на български и английски. По-добре да публикуваме реалния работен поток, отколкото да го крием зад слоган.",
          ],
        },
      ],
    },
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

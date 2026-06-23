/*
 * BANK PYTAŃ — Network Security
 * -----------------------------
 * Pytania uporządkowane wg rosnącej trudności (easy → medium → hard).
 * Poprawne odpowiedzi NIE są przechowywane przy pytaniach.
 * Klucz odpowiedzi jest zakodowany (zob. ANSWER_KEY niżej oraz quiz.js),
 * dzięki czemu nie da się ich odczytać wprost z kodu strony ("lekkie ukrycie").
 *
 * Dodatkowo kolejność odpowiedzi jest losowana przy każdym podejściu,
 * więc pozycja A/B/C/D nic nie zdradza.
 */
window.QUESTIONS = [
  // ===================== EASY =====================
  // 1 — RFC1918
  {
    topic: "RFC1918",
    difficulty: "easy",
    text: "Który z poniższych zakresów adresów jest adresacją prywatną zgodnie z RFC1918?",
    options: ["172.16.0.0/12", "8.0.0.0/8", "200.100.50.0/24", "169.254.0.0/16"],
  },
  // 2 — DHCP/DORA
  {
    topic: "DHCP / DORA",
    difficulty: "easy",
    text: "Co oznacza skrót DORA opisujący proces uzyskiwania adresu przez DHCP?",
    options: [
      "Domain, Object, Record, Address",
      "Discover, Offer, Request, Acknowledge",
      "Detect, Open, Resolve, Assign",
      "Discover, Open, Reply, Accept",
    ],
  },
  // 3 — DNS
  {
    topic: "DNS",
    difficulty: "easy",
    text: "Który rekord DNS mapuje nazwę domeny na adres IPv4?",
    options: ["MX", "CNAME", "TXT", "A"],
  },
  // 4 — NAT
  {
    topic: "NAT",
    difficulty: "easy",
    text: "Jakie jest główne zadanie mechanizmu NAT?",
    options: [
      "Szyfrowanie ruchu sieciowego",
      "Przydzielanie adresów IP hostom w sieci",
      "Tłumaczenie adresów IP pomiędzy sieciami (np. prywatną a publiczną)",
      "Rozwiązywanie nazw domen na adresy IP",
    ],
  },
  // 5 — AD
  {
    topic: "Active Directory",
    difficulty: "easy",
    text: "Na jakim protokole dostępu do katalogu opiera się głównie Active Directory?",
    options: ["LDAP", "SNMP", "SMTP", "RDP"],
  },
  // 6 — Model OSI (NOWE)
  {
    topic: "Model OSI",
    difficulty: "easy",
    text: "Ile warstw ma model odniesienia ISO/OSI?",
    options: ["4", "5", "7", "8"],
  },

  // ===================== MEDIUM =====================
  // 7 — IDS/IPS
  {
    topic: "IDS / IPS",
    difficulty: "medium",
    text: "Jaka jest podstawowa różnica między IDS a IPS?",
    options: [
      "IDS działa w warstwie 2, a IPS w warstwie 3 modelu OSI",
      "IDS szyfruje ruch, a IPS go deszyfruje",
      "IDS jedynie wykrywa i alarmuje, a IPS może aktywnie blokować ruch",
      "IDS działa tylko na hostach, a IPS tylko w sieci",
    ],
  },
  // 8 — RFC1918 (APIPA)
  {
    topic: "RFC1918",
    difficulty: "medium",
    text: "Host otrzymał adres z zakresu 169.254.0.0/16. Jak należy go zaklasyfikować?",
    options: [
      "To adres prywatny zdefiniowany w RFC1918",
      "To adres publiczny, routowalny w Internecie",
      "To adres multicast",
      "To adres APIPA / link-local (RFC3927) — NIE należy do RFC1918",
    ],
  },
  // 9 — DHCP/DORA
  {
    topic: "DHCP / DORA",
    difficulty: "medium",
    text: "Jako jaki typ transmisji klient wysyła pierwszy komunikat DHCPDISCOVER?",
    options: [
      "Broadcast — klient nie zna jeszcze adresu serwera DHCP",
      "Unicast bezpośrednio do serwera DHCP",
      "Multicast do grupy 224.0.0.1",
      "Anycast do najbliższego serwera",
    ],
  },
  // 10 — DNS (PTR)
  {
    topic: "DNS",
    difficulty: "medium",
    text: "Do czego służy rekord PTR w systemie DNS?",
    options: [
      "Do mapowania nazwy domeny na adres IPv6",
      "Do wskazania serwera poczty dla domeny",
      "Do odwrotnego rozwiązywania nazw (adres IP → nazwa domeny)",
      "Do delegacji strefy do innego serwera",
    ],
  },
  // 11 — NAT (PAT)
  {
    topic: "NAT",
    difficulty: "medium",
    text: "Co umożliwia PAT (Port Address Translation), zwany też NAT overload?",
    options: [
      "Przypisanie jednego publicznego IP do jednego prywatnego IP (mapowanie 1:1)",
      "Współdzielenie jednego publicznego IP przez wiele hostów dzięki rozróżnianiu po numerach portów",
      "Tłumaczenie wyłącznie adresów IPv6",
      "Szyfrowanie nagłówków pakietów IP",
    ],
  },
  // 12 — Stateful vs stateless (NOWE)
  {
    topic: "Firewall",
    difficulty: "medium",
    text: "Czym charakteryzuje się zapora typu stateful (śledząca stan) w odróżnieniu od stateless?",
    options: [
      "Filtruje pakiety wyłącznie na podstawie pojedynczych reguł, nie pamiętając kontekstu połączeń",
      "Śledzi stan aktywnych połączeń i podejmuje decyzje na podstawie kontekstu całej sesji",
      "Działa wyłącznie w warstwie aplikacji (L7)",
      "W ogóle nie analizuje nagłówków pakietów",
    ],
  },
  // 13 — RARP (NOWE)
  {
    topic: "Protokoły / adresacja",
    difficulty: "medium",
    text: "Jak nazywa się protokół służący do odwzorowania adresów MAC na adresy IP?",
    options: ["ARP", "RARP", "ICMP", "DHCP"],
  },

  // ===================== HARD =====================
  // 14 — AD (Kerberos)
  {
    topic: "Active Directory",
    difficulty: "hard",
    text: "Który protokół uwierzytelniania jest domyślnie używany w domenie Active Directory?",
    options: [
      "Wyłącznie NTLM",
      "RADIUS",
      "Kerberos (z NTLM jako mechanizmem zapasowym)",
      "OAuth 2.0",
    ],
  },
  // 15 — IDS/IPS (anomaly)
  {
    topic: "IDS / IPS",
    difficulty: "hard",
    text: "Czym charakteryzuje się wykrywanie oparte na anomaliach (anomaly-based) w porównaniu z sygnaturowym?",
    options: [
      "Nigdy nie generuje fałszywych alarmów",
      "Wykrywa wyłącznie znane ataki z bazy sygnatur",
      "Działa tylko na ruchu zaszyfrowanym",
      "Może wykryć nowe/nieznane ataki (0-day), ale generuje więcej fałszywych alarmów",
    ],
  },
  // 16 — DNS (DNSSEC)
  {
    topic: "DNS",
    difficulty: "hard",
    text: "Co zapewnia przede wszystkim mechanizm DNSSEC?",
    options: [
      "Poufność (szyfrowanie) zapytań i odpowiedzi DNS",
      "Integralność i autentyczność odpowiedzi DNS dzięki podpisom cyfrowym",
      "Ukrywanie adresów IP serwerów DNS",
      "Kompresję odpowiedzi w celu przyspieszenia transmisji",
    ],
  },
  // 17 — DHCP snooping
  {
    topic: "DHCP / DORA",
    difficulty: "hard",
    text: "Na czym polega mechanizm bezpieczeństwa DHCP snooping?",
    options: [
      "Szyfruje całą komunikację DHCP w sieci",
      "Przyspiesza proces przydzielania adresów",
      "Blokuje odpowiedzi DHCP z nieautoryzowanych (untrusted) portów, chroniąc przed rogue DHCP",
      "Zastępuje DHCP statycznym adresowaniem hostów",
    ],
  },
  // 18 — DNS poisoning
  {
    topic: "DNS / Bezpieczeństwo",
    difficulty: "hard",
    text: "Jak nazywa się atak polegający na wstrzyknięciu fałszywej odpowiedzi do pamięci podręcznej serwera DNS w celu przekierowania ofiar na złośliwy adres?",
    options: [
      "ARP spoofing",
      "SYN flood",
      "Skanowanie portów (port scanning)",
      "DNS cache poisoning (DNS spoofing)",
    ],
  },
  // 19 — NGFW (NOWE)
  {
    topic: "Firewall / NGFW",
    difficulty: "hard",
    text: "Czym charakteryzuje się NGFW (Next-Generation Firewall) w porównaniu z klasyczną zaporą?",
    options: [
      "Działa wyłącznie jako filtr pakietów w warstwach L3–L4, bez wglądu w aplikacje",
      "Jest to wyłącznie sprzętowy router z funkcją NAT",
      "Integruje m.in. inspekcję warstwy aplikacji (L7), IPS, kontrolę aplikacji oraz często inspekcję ruchu szyfrowanego (TLS)",
      "Obsługuje jedynie statyczne reguły oparte na adresach MAC",
    ],
  },
  // 20 — Podchwytliwe: poufność vs integralność (NOWE)
  {
    topic: "Kryptografia (podchwytliwe)",
    difficulty: "hard",
    text: "Które z poniższych zapewnia POUFNOŚĆ danych (a nie jedynie ich integralność lub kodowanie)?",
    options: ["SHA-256", "Base64", "CRC32", "AES"],
  },
];

/*
 * Zakodowany klucz poprawnych odpowiedzi (indeksy 0–3 dla pytań 1–20).
 * Kodowanie: JSON → XOR z kluczem → base64. Dekodowanie w quiz.js.
 */
window.ANSWER_KEY = "FWNqegEBHAAaHWJXWEVDQUdjSVFZQ0VFVX9/dGceHgEeBAF9SUZbXC8=";
window.ANSWER_SALT = "NSFK-2026-NetworkSecurity";

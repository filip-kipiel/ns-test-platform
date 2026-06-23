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
  // 1 — RFC1918 (easy)
  {
    topic: "RFC1918",
    difficulty: "easy",
    text: "Który z poniższych zakresów adresów jest adresacją prywatną zgodnie z RFC1918?",
    options: ["172.16.0.0/12", "8.0.0.0/8", "200.100.50.0/24", "169.254.0.0/16"],
  },
  // 2 — DHCP/DORA (easy)
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
  // 3 — DNS (easy)
  {
    topic: "DNS",
    difficulty: "easy",
    text: "Który rekord DNS mapuje nazwę domeny na adres IPv4?",
    options: ["MX", "CNAME", "TXT", "A"],
  },
  // 4 — NAT (easy)
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
  // 5 — AD (easy/medium)
  {
    topic: "Active Directory",
    difficulty: "easy",
    text: "Na jakim protokole dostępu do katalogu opiera się głównie Active Directory?",
    options: ["LDAP", "SNMP", "SMTP", "RDP"],
  },
  // 6 — IDS/IPS (medium)
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
  // 7 — RFC1918 (medium)
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
  // 8 — DHCP/DORA (medium)
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
  // 9 — DNS (medium)
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
  // 10 — NAT (medium/hard)
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
  // 11 — AD (hard)
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
  // 12 — IDS/IPS (hard)
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
  // 13 — DNS (hard)
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
  // 14 — DHCP/DORA (hard)
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
  // 15 — DNS / atak (hard)
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
];

/*
 * Zakodowany klucz poprawnych odpowiedzi (indeksy 0–3 dla pytań 1–15).
 * Kodowanie: JSON → XOR z kluczem → base64. Dekodowanie w quiz.js.
 */
window.ANSWER_KEY = "FWNqegEBHAAaHWJXWERDQkdhSVJZQEVHVX9/dGcebw==";
window.ANSWER_SALT = "NSFK-2026-NetworkSecurity";

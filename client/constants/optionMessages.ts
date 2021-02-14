const OptionMessages = {
  GENERAL: {
    SITENAME: {
      LABEL: 'Nettsidens navn',
      REQUIRED: 'Fyll inn nettsidens navn',
    },
    EMAIL: {
      LABEL: 'E-mail for henvendelser',
      INFO: 'Henvendelser via nettsiden blir sendt til denne adressen',
      REQUIRED: 'Fyll inn en e-mail adresse',
      TYPE: 'Fyll inn en gyldig e-mail',
    },
    PHONE: {
      LABEL: 'Telefonnr.',
      INFO: 'Valgfritt. Dette nummeret vises på nettsiden',
      TYPE: 'Fyll inn gyldig telefonnr.',
    },
    ADDRESS: {
      LABEL: 'Adresse',
      INFO: 'Adresse/postboks',
      REQUIRED: 'Fyll inn en adresse',
    },
    MAPS: {
      LABEL: 'Vis Google Maps',
      INFO: 'Vis Google Maps på forside og kontaktside',
    },
    ORGANIZATION: {
      LABEL: 'Org.nr.',
      INFO: 'Organisasjonsnummer',
      REQUIRED: 'Fyll inn org.nr.',
      TYPE: 'Fyll inn gyldig org.nr.',
    },
    ABOUT: {
      LABEL: 'Om oss',
      INFO: "Kort 'om oss'-tekst",
      REQUIRED: 'Legg ved en kort beskrivelse',
    },
  },
  EVENT: {
    DISPLAY: {
      LABEL: 'Vis på forsiden',
      INFO: 'Velg om du ønsker å vise arrangementer på forsiden',
    },
    AMOUNT: {
      LABEL: 'Antall arrangementer',
      INFO: 'Antall arrangementer som vises på forsiden',
    },
    TYPE: {
      LABEL: 'Type arrangementer',
      REQUIRED: 'Må legge ved minst én type',
      CHILD: {
        LABEL: 'Type arrangement',
        REQUIRED: 'Fyll inn type arrangement',
      },
    },
  },
  JOB: {
    DISPLAY: {
      LABEL: 'Vis på forsiden',
      INFO: 'Velg om du ønsker å vise stillingsannonser på forsiden',
    },
    AMOUNT: {
      LABEL: 'Antall stillingsannonser',
      INFO: 'Antall stillingsannonser som vises på forsiden',
    },
    TYPE: {
      LABEL: 'Type stillinger',
      REQUIRED: 'Må legge ved minst én type',
      CHILD: {
        LABEL: 'Type stilling',
        REQUIRED: 'Fyll inn type stilling',
      },
    },
  },
  SOCIALS: {
    NAME: {
      LABEL: 'Brukernavn',
      REQUIRED: 'Fyll inn brukernavn',
    },
    LINK: {
      LABEL: 'Lenke til kontoen',
      REQUIRED: 'Legg ved lenke til kontoen',
      TYPE: 'Ugyldig lenke',
    },
  },
};

export default OptionMessages;

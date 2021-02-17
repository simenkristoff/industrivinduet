/**
 * Defines form messages
 */
const FormMessages = {
  FIRST_NAME: {
    LABEL: 'Fornavn',
    REQUIRED: 'Fyll inn fornavn',
  },
  LAST_NAME: {
    LABEL: 'Etternavn',
    REQUIRED: 'Fyll inn etternavn',
  },
  PHONE_NUMBER: {
    LABEL: 'Tlf.nr',
    REQUIRED: 'Fyll inn tlf.nummer',
  },
  EMAIL: {
    LABEL: 'E-mail',
    REQUIRED: 'Fyll inn e-mail',
    UNIQUE: 'E-mailen er allerede i bruk',
  },
  PASSWORD: {
    LABEL: {
      DEFAULT: 'Passord',
      REPEAT: 'Bekreft passord',
    },
    REQUIRED: {
      DEFAULT: 'Fyll inn passord',
      REPEAT: 'Gjenta passordet',
    },
    ERROR: {
      REPEAT: 'Passordene er ikke like',
    },
  },
  PERMISSIONS: {
    LABEL: 'Brukertillatelser',
    REQUIRED: 'Du må innvilge en tillatelse',
  },
  TITLE: {
    LABEL: 'Tittel',
    REQUIRED: 'Fyll inn tittel',
    UNIQUE: 'Tittelen er allerede i bruk',
  },
  ABBREVIATION: {
    LABEL: 'Forkortelse',
    REQUIRED: 'Legg ved en forkortelse',
    UNIQUE: 'Forkortelsen er allerede i bruk',
  },
  LINK_TEXT: {
    LABEL: 'Lenketekst',
    REQUIRED: 'Fyll inn lenketekst',
    UNIQUE: 'Lenketeksten er allerede i bruk',
    INFO: 'Teksten som peker til dette elementet',
  },
  LINK: {
    LABEL: 'Lenke',
    REQUIRED: 'Fyll inn lenke',
    UNIQUE: 'Lenken er allerede i bruk',
  },
  PRIORITY: {
    LABEL: 'Prioritet',
    REQUIRED: 'Velg en prioritetsverdi',
    UNIQUE: 'Prioriteten må være unik',
    INFO: 'Lavest verdi blir lastet først',
  },
  PLACE: {
    LABEL: {
      SINGULAR: 'Sted',
      PLURAL: 'Steder',
    },
    REQUIRED: {
      SINGULAR: 'Velg et sted',
      PLURAL: 'Velg minst ett sted',
    },
  },
  DINING: {
    LABEL: 'Bespisning',
  },
  DATETIME: {
    LABEL: {
      DATE: {
        DEADLINE: 'Frist',
        START: 'Startdato',
        DEFAULT: 'Dato',
      },
      TIME: {
        START: 'Starttid',
        END: 'Sluttid',
        DEFAULT: 'Tid',
      },
    },
    REQUIRED: {
      DATE: {
        DEADLINE: 'Sett en frist',
        DEFAULT: 'Velg en dato',
      },
      TIME: {
        START: 'Velg starttid',
        END: 'Velg sluttid',
        DEFAULT: 'Velg tid',
      },
    },
  },
  DESCRIPTION: {
    LABEL: {
      CONTENT: 'Innhold',
      DEFAULT: 'Beskrivelse',
    },
    REQUIRED: {
      CONTENT: 'Innholdet kan ikke være tomt',
      DEFAULT: 'Legg ved en beskrivelse',
    },
    INFO: {
      CONTENT: 'Denne sidens innhold',
    },
  },
  MEMBER: {
    LABEL: {
      RESPONSIBLE: 'Ansvarlig medlem',
      USER: 'Medlem du vil opprette bruker for',
    },
    SELECT: {
      BLANK: 'Ingen',
    },
    INFO: {
      RESPONSIBLE: 'Hvilket medlem som har ansvar for arrangementet',
    },
    REQUIRED: 'Velg et medlem',
    UNIQUE: 'Medlemmet er opptatt',
  },
  ROLE: {
    LABEL: {
      NAME: 'Stillingsnavn',
      SELECT: 'Velg stilling',
    },
    REQUIRED: {
      NAME: 'Fyll inn stillingsnavn',
      SELECT: 'Velg en stilling',
    },
    UNIQUE: {
      NAME: 'Denne stillingen eksisterer',
      SELECT: 'Stillingen er opptatt',
    },
  },
  ROLE_TYPE: {
    LABEL: 'Velg en type stilling',
    INFO:
      'Brukes for å prioritere stillingene. Leder kombinert med en gruppe definerer en gruppesjef, mens Leder uten gruppe definerer en overodnet sjef',
    REQUIRED: 'Må velge en type stilling',
    TYPE: 'Ugyldig type stilling',
  },
  GROUP: {
    LABEL: {
      NAME: 'Gruppenavn',
      SELECT: 'Velg gruppe',
    },
    REQUIRED: {
      NAME: 'Fyll inn gruppenavn',
      SELECT: 'Velg en gruppe',
    },
    UNIQUE: {
      NAME: 'Denne grupper eksisterer',
      SELECT: 'Gruppen er opptatt',
    },
  },
  COMPANY: {
    LABEL: {
      NAME: 'Bedriftens navn',
      SELECT: 'Velg en bedrift',
    },
    REQUIRED: {
      NAME: 'Fyll inn bedriftens navn',
      SELECT: 'Velg en bedrift',
    },
    UNIQUE: {
      NAME: 'Denne bedriften eksisterer',
      SELECT: 'Bedriften er opptatt',
    },
  },
  STUDYFIELD: {
    LABEL: {
      NAME: 'Studieretningens navn',
      SELECT: 'Velg studeretning(er)',
    },
    INFO: {
      SELECT: 'Hvilke studieretninger dette gjelder for',
    },
    REQUIRED: {
      NAME: 'Fyll inn studieretningens navn',
      SELECT: 'Velg minst en studieretning',
    },
    UNIQUE: {
      NAME: 'Denne studieretningen eksisterer',
      SELECT: 'Studieretningen er opptatt',
    },
  },
  GRADES: {
    LABEL: 'Klassetrinn',
    INFO: 'Hvilke klassetrinn dette gjelder for',
    REQUIRED: 'Velg minst ett trinn',
  },
  EVENT: {
    LABEL: 'Type arrangement',
    INFO: 'Hvilken type arrangement dette er',
    REQUIRED: 'Velg en type',
  },
  EVENT_LINK: {
    LABEL: 'Lenke til påmelding',
    INFO: 'Lenke til ekstern påmelding hos Teknologiporten',
    REQUIRED: 'Legg ved lenke til påmelding',
    TYPE: 'Ugyldig lenke',
  },
  JOB: {
    LABEL: 'Type jobb',
    INFO: 'Hvilken type jobb/stilling det annonseres for',
    REQUIRED: 'Velg en type',
  },
  JOB_LINK: {
    LABEL: 'Lenke til søknad/utlysning',
    INFO: 'Lenke til til søknaden som bedriften har lagt ut',
    REQUIRED: 'Legg ved lenke til søknad',
    TYPE: 'Ugyldig lenke',
  },
  ACTIVE: {
    LABEL: 'Aktiv',
    INFO: {
      EVENT: 'Inaktive arrangementer vises ikke på forsiden',
      JOB: 'Inaktive stillingsannonser vises ikke på forsiden',
    },
  },
};

export default FormMessages;

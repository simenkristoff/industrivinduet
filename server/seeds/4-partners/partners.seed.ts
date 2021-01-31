import { getObjectId } from 'mongo-seeding';
import { Types } from 'mongoose';

import { PartnerBase } from '../../models';

interface PartnerSeed extends PartnerBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  _v: Number;
}

const partners: PartnerSeed[] = [
  {
    _id: getObjectId('cowi'),
    name: 'Cowi',
    image: 'https://dwglogo.com/wp-content/uploads/2016/02/COWI_a-s_logo.png',
    description:
      '<p>COWI er et av Norges ledende rådgivende ingeniørselskap innen rådgivning og prosjektering av komplekse funksjonsbygg, effektive transportløsninger, blågrønne løsninger og bærekraftig byutvikling. Basert på vår verdensledende kompetanse innenfor teknikk, miljø og samfunnsplanlegging, løser vi utfordringer gjennom vår unike 360°-tilnærming. Slik skaper vi økt verdi for samfunnet, enkeltmenneskene og våre oppdragsgivere – og bidrar til å utvikle bærekraftige og helhetlige løsninger som bringer samfunnet fremover.</p>',
    link: 'https://www.cowi.no/',
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: getObjectId('schlumberger'),
    name: 'Schlumberger',
    image: 'https://dwglogo.com/wp-content/uploads/2016/02/COWI_a-s_logo.png',
    description:
      '<p>COWI er et av Norges ledende rådgivende ingeniørselskap innen rådgivning og prosjektering av komplekse funksjonsbygg, effektive transportløsninger, blågrønne løsninger og bærekraftig byutvikling. Basert på vår verdensledende kompetanse innenfor teknikk, miljø og samfunnsplanlegging, løser vi utfordringer gjennom vår unike 360°-tilnærming. Slik skaper vi økt verdi for samfunnet, enkeltmenneskene og våre oppdragsgivere – og bidrar til å utvikle bærekraftige og helhetlige løsninger som bringer samfunnet fremover.</p>',
    link: 'https://www.cowi.no/',
    _v: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export = partners;

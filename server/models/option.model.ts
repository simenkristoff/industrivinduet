import { Schema, Model, model, Document } from 'mongoose';

/**
 * The base Option.
 */
export interface OptionBase {
  general: {
    sitename: string;
    email: string;
    address: string;
    showMaps: boolean;
    phone?: string;
    organization: string;
    about: string;
  };
  event: {
    homepage: {
      displayEvents: boolean;
      numberOfEvents: number;
    };
    eventTypes: Array<string>;
  };
  job: {
    homepage: {
      displayJobs: boolean;
      numberOfJobs: number;
    };
    jobTypes: Array<string>;
  };
  socials: {
    facebook: {
      name: string;
      link: string;
    };
    instagram: {
      name: string;
      link: string;
    };
    linkedin: {
      name: string;
      link: string;
    };
  };
}

/**
 * The interface of a Option document.
 * @extends OptionBase
 * @extends Document
 */
export interface Option extends OptionBase, Document {}

/**
 * The Option Schema
 * @interface Schema
 */
export const OptionSchema: Schema<Option, Model<Option>> = new Schema(
  {
    general: {
      sitename: { type: String, required: true, default: 'Industrivinduet', trim: true },
      email: { type: String, required: true, default: 'post@industrivinduet.no', trim: true },
      address: {
        type: String,
        required: true,
        default: 'Gamle Kjemi, Gløshaugen Trondheim, Norge',
        trim: true,
      },
      showMaps: { type: Boolean, default: true },
      phone: { type: String, required: false, default: undefined, trim: true },
      organization: { type: String, required: true, default: '996056009', trim: true },
      about: {
        type: String,
        required: true,
        default:
          '<p>Industrivinduet er A/F Smørekoppens bedriftskontakt. Vi jobber for å fremme kontakt mellom næringslivet og studentene ved Produktutvikling og Produksjon</p>',
        trim: true,
      },
    },
    event: {
      homepage: {
        displayEvents: { type: Boolean, required: true, default: true },
        numberOfEvents: { type: Number, required: true, default: 3 },
      },
      eventTypes: {
        type: [String],
        required: true,
        default: ['Bedriftspresentasjon', 'Workshop', 'Case', 'Foredrag'],
        trim: true,
      },
    },
    job: {
      homepage: {
        displayJobs: { type: Boolean, required: true, default: true },
        numberOfJobs: { type: Number, required: true, default: 3 },
      },
      jobTypes: {
        type: [String],
        required: true,
        default: ['Heltid', 'Deltid', 'Sommerjobb'],
        trim: true,
      },
    },
    socials: {
      facebook: {
        name: { type: String, required: true, default: 'Industrivinduet', trim: true },
        link: {
          type: String,
          required: true,
          default: 'https://www.facebook.com/industrivinduet/',
          trim: true,
        },
      },
      instagram: {
        name: { type: String, required: true, default: 'Industrivinduet', trim: true },
        link: {
          type: String,
          required: true,
          default: 'https://www.instagram.com/industrivinduet/',
          trim: true,
        },
      },
      linkedin: {
        name: { type: String, required: true, default: 'Industrivinduet, NTNU', trim: true },
        link: {
          type: String,
          required: true,
          default: 'https://www.linkedin.com/company/industrivinduet-ntnu',
          trim: true,
        },
      },
    },
  },
  { timestamps: true },
);

OptionSchema.pre<Option>('save', function (next) {
  next();
});

/**
 * The Option Model
 * @interface Model
 */
export const OptionModel: Model<Option> = model<Option>('Option', OptionSchema);

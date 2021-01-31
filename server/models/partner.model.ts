import { Schema, Model, model, Document } from 'mongoose';

/**
 * The base Partner.
 * @interface
 */
export interface PartnerBase {
  name: string;
  image: string;
  description: string;
  link: string;
}

/**
 * The interface of a Partner document.
 * @interface
 */
export interface Partner extends PartnerBase, Document {}

/**
 * The Partner Schema
 */
export const PartnerSchema: Schema<Partner, Model<Partner>> = new Schema(
  {
    name: { type: String, required: false, unique: true, trim: true },
    image: { type: String, required: true, unique: false, trim: true },
    description: { type: String, required: true, unique: false, trim: true },
    link: { type: String, required: true, unique: false, trim: true },
  },
  { timestamps: true },
);

export const PartnerModel: Model<Partner> = model<Partner>('Partner', PartnerSchema);

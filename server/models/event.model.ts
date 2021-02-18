import { Model, model, Schema, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { Member, StudyField } from '../types';
import { Filter } from '../utils';

/**
 * The base Event.
 */
export interface EventBase {
  title: string;
  type: string;
  date: Date;
  starttime: Date;
  endtime?: Date;
  place: string;
  dining?: string;
  description: string;
  grades: string[];
  image: string;
  studyfields: Types.ObjectId[] | StudyField[] | null;
  member: Types.ObjectId | Member | null;
  link: string;
  active: boolean;
}

/**
 * The interface of a Event document.
 * @extends EventtBase
 * @extends Document
 */
export interface Event extends EventBase, Document {}

/**
 * The Event Schema
 * @interface Schema
 */
export const EventSchema: Schema<Event, Model<Event>> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    starttime: { type: Date, required: true, trim: true },
    endtime: { type: Date, required: false, trim: true },
    place: { type: String, required: true, trim: true },
    dining: { type: String, required: false, trim: true },
    description: { type: String, required: true, trim: true },
    grades: { type: [String], required: true, default: ['1', '2', '3', '4', '5'], trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    studyfields: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Studyfield',
        required: true,
        unique: false,
        default: null,
        autopopulate: true,
      },
    ],
    member: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: false,
      unique: false,
      default: null,
      autopopulate: true,
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
EventSchema.plugin(autopopulate);

EventSchema.pre<Event>('save', function (next) {
  this.type = Filter.capitalize(this.type);
  this.place = Filter.capitalize(this.place);
  this.dining = this.dining !== undefined ? Filter.capitalize(this.dining) : undefined;
  next();
});

/**
 * The Event Model
 * @interface Model
 */
export const EventModel: Model<Event> = model<Event>('Event', EventSchema);

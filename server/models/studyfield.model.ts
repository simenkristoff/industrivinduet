import { Schema, Model, model, Document } from 'mongoose';

import { Cascader, Filter } from '../utils';

import { Event, EventModel } from './event.model';
import { Job, JobModel } from './job.model';

/**
 * The base StudyField.
 * @interface
 */
export interface StudyFieldBase {
  name: string;
  abbr: string;
  description: string;
  link: string;
}

/**
 * The interface of a StudyField document.
 * @interface
 */
export interface StudyField extends StudyFieldBase, Document {}

/**
 * The StudyField Schema
 */
export const StudyFieldSchema: Schema<StudyField, Model<StudyField>> = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    abbr: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

StudyFieldSchema.pre<StudyField>('save', function (next) {
  this.name = Filter.capitalize(this.name);
  next();
});

Cascader.softCascadeDocument<StudyField, Event>(StudyFieldSchema, EventModel, 'studyfields', true);
Cascader.softCascadeDocument<StudyField, Job>(StudyFieldSchema, JobModel, 'studyfields', true);

export const StudyFieldModel: Model<StudyField> = model<StudyField>('Studyfield', StudyFieldSchema);

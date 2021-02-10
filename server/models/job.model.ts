import { Model, model, Schema, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { StudyField } from '@server/types';
import { Filter } from '@server/utils';

/**
 * The base Job.
 * @interface
 */
export interface JobBase {
  title: string;
  company: string;
  type: string;
  startdate?: Date;
  deadline: Date;
  places: string[];
  description: string;
  grades: string[];
  image: string;
  studyfields: Types.ObjectId[] | StudyField[] | null;
  link: string;
  active: boolean;
}

/**
 * The interface of a Job document.
 * @interface
 */
export interface Job extends JobBase, Document {}

/**
 * The Job Schema
 */
export const JobSchema: Schema<Job, Model<Job>> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    startdate: { type: Date, required: false, trim: true },
    deadline: { type: Date, required: true, trim: true },
    places: { type: [String], required: true, trim: true },
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
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);
JobSchema.plugin(autopopulate);

JobSchema.pre<Job>('save', function (next) {
  this.title = Filter.capitalize(this.title);
  this.type = Filter.capitalize(this.type);
  this.places.forEach((place, index) => {
    this.places[index] = Filter.capitalize(place);
  });
  next();
});

export const JobModel: Model<Job> = model<Job>('Job', JobSchema);

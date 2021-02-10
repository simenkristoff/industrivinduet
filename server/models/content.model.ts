import { Schema, Model, model, Document } from 'mongoose';
import { Filter } from '@server/utils';

/**
 * The base Content.
 * @interface
 */
export interface ContentBase {
  title: string;
  displayTitle: boolean;
  linkText: string;
  content: string;
  priority: number;
}

/**
 * The interface of a Content document.
 * @interface
 */
export interface Content extends ContentBase, Document {}

/**
 * The Content Schema
 */
export const ContentSchema: Schema<Content, Model<Content>> = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    displayTitle: { type: Boolean, default: true },
    linkText: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true, unique: false, trim: true },
    priority: { type: Number, required: true, trim: true },
  },
  { timestamps: true },
);

ContentSchema.pre<Content>('save', function (next) {
  this.title = Filter.capitalize(this.title);
  this.linkText = Filter.capitalize(this.linkText);
  next();
});

export const ContentModel: Model<Content> = model<Content>('Content', ContentSchema);

import { Schema, Model, model, Document } from 'mongoose';

import { Cascader, Filter } from '../utils';

import { Role, RoleModel } from './role.model';

/**
 * The base Group.
 */
export interface GroupBase {
  name: string;
}

/**
 * The interface of a Group document.
 * @extends GroupBase
 * @extends Document
 */
export interface Group extends GroupBase, Document {}

/**
 * The Group Schema
 * @interface Schema
 */
export const GroupSchema: Schema<Group, Model<Group>> = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true },
);

GroupSchema.pre<Group>('save', function (next) {
  this.name = Filter.capitalize(this.name);
  next();
});

Cascader.softCascadeDocument<Group, Role>(GroupSchema, RoleModel, 'group');

/**
 * The Group Model
 * @interface Model
 */
export const GroupModel: Model<Group> = model<Group>('Group', GroupSchema);

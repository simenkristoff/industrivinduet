import { Schema, Model, model, Document } from 'mongoose';
import { Role } from '@server/types';
import { Cascader, Filter } from '@server/utils';
import { RoleModel } from '@server/models';

/**
 * The base Group.
 * @interface
 */
export interface GroupBase {
  name: string;
}

/**
 * The interface of a Group document.
 * @interface
 */
export interface Group extends GroupBase, Document {}

/**
 * The Group Schema
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

export const GroupModel: Model<Group> = model<Group>('Group', GroupSchema);

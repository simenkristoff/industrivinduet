import { Schema, Model, model, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { Group, Member } from '../types';
import { Cascader, Filter } from '../utils';
import { MemberModel } from '../models';

/**
 * The base Role.
 */
export interface RoleBase {
  name: string;
  roleType: 'Leder' | 'Nestleder' | 'Medlem';
  group: Types.ObjectId | Group | null;
}

/**
 * The interface of a Role document.
 * @extends RoleBase
 * @extends Document
 */
export interface Role extends RoleBase, Document {}

/**
 * The Role Schema
 * @interface Schema
 */
export const RoleSchema: Schema<Role, Model<Role>> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roleType: {
      type: String,
      enum: ['Leder', 'Nestleder', 'Medlem'],
      default: 'Medlem',
      trim: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: false,
      default: null,
      autopopulate: true,
    },
  },
  { timestamps: true },
);
RoleSchema.plugin(autopopulate);

RoleSchema.pre<Role>('save', function (next) {
  this.name = Filter.capitalize(this.name);
  next();
});

Cascader.softCascadeDocument<Role, Member>(RoleSchema, MemberModel, 'role');

/**
 * The Role Model
 * @interface Model
 */
export const RoleModel: Model<Role> = model<Role>('Role', RoleSchema);

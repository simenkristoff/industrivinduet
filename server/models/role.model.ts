import { Schema, Model, model, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import { Group, Member } from '@server/types';
import { Cascader, Filter } from '@server/utils';
import { MemberModel } from '@server/models';

/**
 * The base Role.
 * @interface
 */
export interface RoleBase {
  name: string;
  roleType: 'Leder' | 'Nestleder' | 'Medlem';
  group: Types.ObjectId | Group | null;
}

/**
 * The interface of a Role document.
 * @interface
 */
export interface Role extends RoleBase, Document {}

/**
 * The Role Schema
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

export const RoleModel: Model<Role> = model<Role>('Role', RoleSchema);

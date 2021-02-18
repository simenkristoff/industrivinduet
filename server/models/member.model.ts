import { Model, model, Schema, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { Cascader, Filter } from '../utils';

import { Role } from './role.model';
import { Event, EventModel } from './event.model';
import { User, UserModel } from './user.model';

/**
 * The base Member.
 */
export interface MemberBase {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  image?: string;
  role: Types.ObjectId | Role | null;
}

/**
 * The interface of a Member document.
 * @extends MemberBase
 * @extends Document
 */
export interface Member extends MemberBase, Document {}

/**
 * The Member Schema
 * @interface Schema
 */
export const MemberSchema: Schema<Member, Model<Member>> = new Schema(
  {
    name: {
      first: { type: String, required: true, trim: true },
      last: { type: String, required: true, trim: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: false,
      unique: true,
      default: null,
      autopopulate: true,
    },
  },
  { timestamps: true },
);
MemberSchema.plugin(autopopulate);

MemberSchema.pre<Member>('save', function (next) {
  this.name.first = Filter.titleCase(this.name.first);
  this.name.last = Filter.titleCase(this.name.last);
  this.email = Filter.lowerCase(this.email);
  next();
});

Cascader.hardCascadeDocument<Member, User>(MemberSchema, UserModel, 'member');
Cascader.softCascadeDocument<Member, Event>(MemberSchema, EventModel, 'member');

/**
 * The Member Model
 * @interface Model
 */
export const MemberModel: Model<Member> = model<Member>('Member', MemberSchema);

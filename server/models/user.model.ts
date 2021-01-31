import { Schema, Model, model, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { MemberModel } from '../models';

import { Member } from './member.model';

enum Permissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
 * The base User.
 * @interface
 */
export interface UserBase {
  email: string;
  password: string;
  permissions: string[];
  member: Types.ObjectId | Member;
}

/**
 * The interface of a User document.
 * @interface
 */
export interface User extends UserBase, Document {}

/**
 * The interface of a User document with extended functions.
 * @interface
 */
export interface IUser extends Model<User> {
  findMember(email: string): Promise<Member>;
}

/**
 * The User Schema
 */
export const UserSchema: Schema<User, IUser> = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  permissions: {
    type: [String],
    enum: Permissions,
    default: [Permissions['USER']],
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
    unique: true,
    autopopulate: true,
  },
});
UserSchema.plugin(autopopulate);

UserSchema.pre<User>('updateOne', async function () {
  if (!this.get('permissions')) {
    this.update({ permissions: ['USER'] });
  }
});

UserSchema.statics.findMember = async function (email: string) {
  return MemberModel.findOne({ email: email });
};

export const UserModel = model<User, IUser>('User', UserSchema);

import { Schema, Model, model, Document, Types } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { Member } from '../types';
import { MemberModel } from '../models';

/**
 * User Permission types
 * @enum
 */
export enum UserPermissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
 * The base User.
 */
export interface UserBase {
  email: string;
  password: string;
  permissions: UserPermissions;
  isRoot: boolean;
  member?: Types.ObjectId | Member;
}

/**
 * The interface of a User document.
 * @extends UserBase
 * @extends Document
 */
export interface User extends UserBase, Document {}

/**
 * The interface of a User document with extended functions.
 * @extends Model<User>
 */
export interface IUser extends Model<User> {
  findMember(email: string): Promise<Member>;
}

/**
 * The User Schema
 * @interface Schema
 */
export const UserSchema: Schema<User, IUser> = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  permissions: {
    type: UserPermissions,
    enum: UserPermissions,
    default: UserPermissions['USER'],
  },
  isRoot: { type: Boolean, default: false },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: false,
    unique: true,
    autopopulate: true,
  },
});
UserSchema.plugin(autopopulate);

UserSchema.pre<User>('updateOne', async function () {
  if (!this.get('permissions')) {
    this.update({ permissions: UserPermissions['USER'] });
  }
});

UserSchema.statics.findMember = async function (email: string) {
  return MemberModel.findOne({ email: email });
};

/**
 * The User Model
 * @interface Model
 */
export const UserModel = model<User, IUser>('User', UserSchema);

import { Schema, Model, Document, Query, LeanDocument } from 'mongoose';

import { HttpException, NotFoundException } from '../exceptions';

import Logger from './logger';

/**
 * Namespace Cascader holds functions for managing relations
 * when deleting and updating documents.
 *
 * @namespace Cascader
 */
namespace Cascader {
  /**
   * Removes relationship references to a Document which is about to be deleted.
   * If the reference is an array, the reference will be removed from the array.
   *
   * @function
   * @memberof Cascader
   *
   * @param {Schema<T, Model<T>>} schema schema of the object to delete
   * @param {Model<P>} target target model to cascade
   * @param {keyof LeanDocument<P>} reference reference to object on target
   * @param {boolean} isArray wether the reference is an array or not
   */
  export function softCascadeDocument<T extends Document, P extends Document>(
    schema: Schema<T, Model<T>>,
    target: Model<P>,
    reference: keyof LeanDocument<P>,
    isArray: boolean = false,
  ) {
    schema.pre<T>('remove', async function (next) {
      const baseID = this.id;
      const query: any = { [reference]: { $in: [baseID] } };
      const updateQuery: any = isArray
        ? { $pull: { [reference]: baseID } }
        : { [reference]: undefined };

      try {
        await target.find(query, (err: any, docs: P[]) => {
          if (docs) {
            console.log(typeof reference);
            docs.map(async (doc: P) => {
              if (!doc) {
                return next(new NotFoundException(`Could not find ${target.name} while cascading`));
              }
              try {
                Logger.debug(
                  `[CASCADE:SOFT] Removing reference from ${doc._id} in ${target.collection.name}`,
                );
                await target.findOneAndUpdate({ _id: doc._id }, updateQuery, { new: true });
              } catch (err) {
                return next(new HttpException(500, err.message));
              }
            });
          }
        });
      } catch (err) {
        return next(new HttpException(500, err.message));
      }
    });
  }

  /**
   * Deletes relationship references to a Document which is about to be deleted.
   *
   * @function
   * @memberof Cascader
   *
   * @param schema schema of the object to delete
   * @param target target model to cascade
   * @param reference reference to object on target
   */
  export function hardCascadeDocument<T extends Document, P extends Document>(
    schema: Schema<T, Model<T>>,
    target: Model<P>,
    reference: keyof LeanDocument<P>,
  ) {
    schema.pre<T>('remove', async function (next) {
      const baseID = this.id;
      const query: any = { [reference]: { $in: [baseID] } };
      try {
        await target.find(query, (err: any, docs: P[]) => {
          if (docs) {
            docs.map(async (doc: P) => {
              if (!doc) {
                return next(new NotFoundException(`Could not find ${target.name} while cascading`));
              }
              try {
                Logger.debug(
                  `[CASCADE:HARD] Deleting document with id '${doc._id}' in ${target.collection.name}`,
                );
                await target.findOneAndDelete({ _id: doc._id });
              } catch (err) {
                return next(new HttpException(500, err.message));
              }
            });
          }
        });
      } catch (err) {
        return next(new HttpException(500, err.message));
      }
    });
  }
}

export default Cascader;

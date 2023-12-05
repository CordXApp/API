import boom from "boom";
import CordXUserSchema from '../../models/user.schema';

/**
 * Fetches a users states from the database
 */
export const fetchUserStates = async({ userId }): Promise<any> => {
  try {
    
    let user = await CordXUserSchema.findOne({ id: userId }).exec();

    if (!user) throw boom.notFound('Unable to locate that user!');
;
    return {
      id: user.id,
      owner: user.owner,
      admin: user.admin,
      moderator: user.moderator,
      verified: user.verified,
      beta: user.beta
    };

  } catch (e: any) {

    throw new Error(e);
  }
}

export const updateUserStates = async({ userId, states }) => {
  try {
      
      let user = await CordXUserSchema.findOneAndUpdate({ id: userId }, { $set: states }, { new: true }).exec();

      let success;
  
      if (!user) {
        success = false;
        throw console.log(`User ${userId} not found`);
      };

      await console.log(`User ${user.id} updated successfully`);

      return success = true;

  } catch (e: any) {

      throw new Error(e);
  }
}

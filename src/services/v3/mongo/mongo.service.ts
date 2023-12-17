import boom from "boom";
import CordXUserSchema from '../../../models/user.schema';

export const fetchUserStates = async ({ userId }): Promise<any> => {
  try {

    let user = await CordXUserSchema.findOne({ id: userId }).exec();

    if (!user) throw boom.notFound('Unable to locate that user!');
    ;
    return {
      id: user.id,
      owner: user.owner,
      admin: user.admin as boolean,
      moderator: user.moderator as boolean,
      verified: user.verified as boolean,
      beta: user.beta as boolean
    };

  } catch (e: any) {

    throw new Error(e);
  }
}

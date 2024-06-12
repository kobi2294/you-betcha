import { getDal } from '../common/logic/dal/dal';
import { notFound } from '../common/api/authorize';
import { DbModel } from '../common/models/db/db.alias';

export function getOpenApi() {
  const dal = getDal();

  async function _createCalculatedGroup(grp: string | DbModel.Group) {
    const group = typeof grp === 'string' ? await dal.groups.getOne(grp) : grp;

    if (!group) throw notFound('Group does not exist');

    const users = await dal.users.getAllInGroup(group.id);
    const userRecords: DbModel.GroupUserRecord[] = users.map((user) => ({
      id: user.id,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
    }));

    const calcGroup: DbModel.CalculatedGroup = {
      id: group.id,
      users: userRecords,
    };
    await dal.calculatedGroups.saveOne(calcGroup);
  }

  return {
    createCalculatedGroup: _createCalculatedGroup,
  };
}

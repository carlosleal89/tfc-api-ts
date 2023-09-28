import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>, InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;
  declare team_name: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'TeamsModel',
  timestamps: false,
});
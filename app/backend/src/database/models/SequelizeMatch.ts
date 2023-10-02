import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

export default class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  homeTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  awayTeamGoals: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'SequelizeMatches',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.hasMany(SequelizeMatches, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

SequelizeTeam.hasMany(SequelizeMatches, {
  foreignKey: 'awayTeamId',
  as: 'awayHomeMatches',
});

SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

SequelizeMatches.belongsTo(SequelizeTeam, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

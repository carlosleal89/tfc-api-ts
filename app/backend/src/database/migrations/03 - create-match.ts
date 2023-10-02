import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatch } from '../../Interfaces/Matches/IMatch';

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
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
          model: 'teams', // aqui faz referencia ao nome da tabela, não ao nome do modelo
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches')
  }
}
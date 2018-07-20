/**
 * 工单数据模型
 */
const WorkOrder = (sequelize, DataTypes) => {
    return sequelize.define("workOrder", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_by: {
                allowNull: true,
                type: DataTypes.STRING
            },
            fcar_module: {
                allowNull: true,
                type: DataTypes.STRING
            },
            assigned_time: {
                allowNull: true,
                type: DataTypes.DATE(3)
            },
            is_fcar_bug: {
                allowNull: true,
                type: DataTypes.INTEGER(2)
            },
            is_assigned: {
                allowNull: true,
                type: DataTypes.INTEGER(2)
            },
            solve_name: {
                allowNull: true,
                type: DataTypes.STRING
            },
            solve_time: {
                allowNull: true,
                type: DataTypes.INTEGER(2)
            },
            tester: {
                allowNull: true,
                type: DataTypes.STRING
            },
            solved_result: {
                allowNull: true,
                type: DataTypes.INTEGER(2)
            },
            note: {
                allowNull: true,
                type: DataTypes.STRING
            },
            create_user: {
                allowNull: true,
                type: DataTypes.STRING
            },
        },
        {
            createdAt: 'create_time',
            updatedAt: 'update_time',
            tableName: 't_work_order_info',
            freezeTableName: true
        }
    );
};
module.exports = WorkOrder;

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', { 
    postId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    },
    {
      timestamps: false,
      underscored: true, 
      tableName: 'posts_categories'
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'postCategory',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categoryPost',
      through: PostCategory,
      foreignKey: 'post_id', 
      otherKey: 'category_id', 
    });
  };

    return PostCategory;
};
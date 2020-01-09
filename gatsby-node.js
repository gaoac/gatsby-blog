const path = require(`path`);
const _ = require('lodash');

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const pageSize = 10;

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.jsx`);
  const blogIndexTemplate = path.resolve(`./src/templates/blog.jsx`);
  const archivesTemplate = path.resolve(`./src/templates/archives.jsx`);
  const tagTemplate = path.resolve('./src/templates/tags.jsx');
  const categorieTemplate = path.resolve('./src/templates/categories.jsx');
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: ${pageSize}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
          totalCount
        }
        tagsGroup: allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        categoriesGroup: allMarkdownRemark {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create blog posts pages.
  const { edges: posts, totalCount } = result.data.postsRemark;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  const numPages = Math.ceil(totalCount / pageSize);

  Array.from({ length: numPages }).forEach((__, i) => {
    createPage({
      path: i === 0 ? `/blog/1` : `/blog/${i + 1}`,
      component: blogIndexTemplate,
      context: {
        currentPage: i + 1,
        totalPage: totalCount,
        limit: pageSize,
        skip: i * pageSize,
      },
    });
    createPage({
      path: i === 0 ? `/archives/1` : `/archives/${i + 1}`,
      component: archivesTemplate,
      context: {
        currentPage: i + 1,
        totalPage: totalCount,
        limit: pageSize,
        skip: i * pageSize,
      },
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Extract categorie data from query
  const categories = result.data.tagsGroup.group;
  // Make categorie pages
  categories.forEach(categorie => {
    createPage({
      path: `/categories/${_.kebabCase(categorie.fieldValue)}/`,
      component: categorieTemplate,
      context: {
        categorie: categorie.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

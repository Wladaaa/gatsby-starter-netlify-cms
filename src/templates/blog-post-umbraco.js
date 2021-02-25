import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { blogPost: post } = data.umbraco

  return (
    <Layout>
      <BlogPostTemplate
        content={post.mainContent}
        contentComponent={HTMLContent}
        description={post.subTitle}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.name}`}</title>
            <meta
              name="description"
              content={`${post.mainContent}`}
            />
          </Helmet>
        }
        title={post.name}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
    query BlogPostByIDUmbraco($id: ID!) {
        umbraco{
            blogPost(id: $id) {
                name
                mainContent
                createDate
                subTitle
        }
    }
    }
`



/*export const pageQueryTest = graphql`
  query{
    umbraco{
      allContent{
        items{
          name
        }
      }
    }
  }
`*/
//curl 'https://graphql.umbraco.io' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://uladzislavas-self-confident-bunny.s1.umbraco.io' -H 'umb-project-alias: uladzislavas-self-confident-bunny' --data-binary '{"query":"# Write your query or mutation here\nquery {\n  content {\n    name\n  }\n}\n","variables":{"name1":"Hello"}}' --compressed
import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class UmbracoBlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.umbraco.allBlogPost

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification`}
              >
                <header>
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.url}
                    >
                      {post.subTitle}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.createDate}
                    </span>
                  </p>
                </header>
                <p>
                  {post.name}
                  <br />
                  <br />
                  <Link className="button" to={post.url}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

/*UmbracoBlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}*/

export default () => (
  <StaticQuery
    query={graphql`
      query UmbracoBlogRollBlogRollQuery {
        umbraco{
            allBlogPost{
                edges{
                    node{
                        createDate
                        mainContent
                        subTitle
                        name
                        id
                        url
                    }
                }
            }
        }
      }
    `}
    render={(data, count) => <UmbracoBlogRoll data={data} count={count} />}
  />
)

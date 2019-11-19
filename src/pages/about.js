import React from "react"
import Layout from "../components/layout"

export default ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <h1>About {title}</h1>
      <p>
        I’m good enough, I’m smart enough, and gosh darn it, people like me!
      </p>
    </div>
  </Layout>
)
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

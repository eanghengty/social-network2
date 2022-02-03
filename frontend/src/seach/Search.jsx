import React, { useEffect, useState } from 'react'

import MasonryLayout from '../layout/MasonryLayout'
import { client } from '../sanity'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from '../components/loading/Spinner'

const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data) => {
        setPosts(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data)
        setLoading(false)
      })
    }
  }, [searchTerm])

  return (
    <div>

      {loading && <Spinner message="Searching posts" />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
      )}
    </div>
  )
}

export default Search
import React, { useEffect, useState } from 'react'

import MasonryLayout from '../layout/MasonryLayout'
import { client } from '../sanity'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from '../components/loading/Spinner'

//search page
const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(false)

  //render only when searchTerm change
  useEffect(() => {
    //if start searching
    if (searchTerm !== '') {
      //loading
      setLoading(true)
      //if the query return true
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data) => {
        setPosts(data)
        setLoading(false)
      })
    } else {
      //if click search but not input get the feed from home
      client.fetch(feedQuery).then((data) => {
        setPosts(data)
        setLoading(false)
      })
    }
  }, [searchTerm])

  return (
    <div>
      {/* if laoding then add text */}
      {loading && <Spinner message="Searching posts" />}
      {/* if there is post */}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {/* if there is no post */}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts Found!</div>
      )}
    </div>
  )
}

export default Search
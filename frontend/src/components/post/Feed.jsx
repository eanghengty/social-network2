import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {client} from '../../sanity'
import { feedQuery, searchQuery } from '../../utils/data';
import MasonryLayout from '../../layout/MasonryLayout';
import Spinner from '../loading/Spinner';


const Feed = () => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`load ${ideaName} post to your feed 🙉`} />
    );
  }

  if(!posts?.length){
    return <h2>Nothing there</h2>
  }
  return (
    <div>
      {posts && (
        <MasonryLayout posts={posts} />
      )}
    </div>
  );
};

export default Feed;
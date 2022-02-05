
import React from 'react';
import Masonry from 'react-masonry-css';
import Post from '../components/post/Post'

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
//get the data from feed
const MasonryLayout = ({ posts }) => (
  //style to load
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {/* load each time by id also pass data to post for detail page */}
    {posts?.map((post) => <Post key={post._id} post={post} className="w-max" />)}
  </Masonry>
);

export default MasonryLayout;

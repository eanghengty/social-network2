import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../../sanity';
import MasonryLayout from '../../layout/MasonryLayout';
import { postDetailMorepostQuery, postDetailQuery } from '../../utils/data';
import Spinner from '../loading/Spinner';
//accept data from home
const PostDetail = ({ user }) => {
  const { postId} = useParams();
  const [posts, setPosts] = useState();
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  //get post detail
  const fetchPostDetails = () => {
    const query = postDetailQuery(postId);
    //postid true
    if (query) {
      //fetch data
      client.fetch(`${query}`).then((data) => {
        //data object
        setPostDetail(data[0]);
        // console.log(data);
        if (data[0]) {
          const query1 = postDetailMorepostQuery(data[0]);
          //fetch which post has the same category
          client.fetch(query1).then((res) => {
            setPosts(res);
          });
        }
      });
    }
  };

  //render only when postid change
  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  //add comment
  const addComment = () => {
    //df empty string 
    if (comment) {
      setAddingComment(true);
      //if comment then fetch 
      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        //pass to ref user then set back to empty string
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!postDetail) {
    return (
      <Spinner message="Showing post" />
    );
  }

  return (
    <>
      {postDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-xl rounded-b-lg"
              src={(postDetail?.image && urlFor(postDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              
              <a href={postDetail.destination} target="_blank" rel="noreferrer" className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 ">
                <span className="text-xl">location </span>: {postDetail.destination?.slice(0,20)}
              </a>
            </div>
            <div className="">
          <Link to={`/user-profile/${postDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={postDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{postDetail?.postedBy.userName}</p>
            </Link>
            {/* <h1 className="text-xl font-bold break-words mt-3">
                Title : {postDetail.title}
              </h1> */}
              <p className="mt-3 mb-3 ">{postDetail.about}</p>
          </div>
            
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {postDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer "
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-blue-300 border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Express your feeling here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-green-300 hover:bg-green-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'loading. . .' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
      {posts?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          Related post
        </h2>
      )}
      {posts ? (
        <MasonryLayout posts={posts} />
      ) : (
        <Spinner message="Loading more posts" />
      )}
    </>
  );
};

export default PostDetail;
//pass id and return true if condition meet
export const userQuery=(id)=>{
    const query = `*[_type=='user' && _id=='${id}']`
    return query
}
// query the feed
export const feedQuery= `*[_type == "post" ]{
        image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
           
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            } `
   //query create post
            export const userCreatedpostsQuery = (userId) => {
              const query = `*[ _type == 'post' && userId == '${userId}'] {
                image{
                  asset->{
                    url
                  }
                },
                _id,
                destination,
                postedBy->{
                  _id,
                  userName,
                  image
                },
                save[]{
                  postedBy->{
                    _id,
                    userName,
                    image
                  },
                },
              }`;
              return query;
            };
            //query when like the post, query the post
            export const userSavedpostsQuery = (userId) => {
              const query = `*[_type == 'post' && '${userId}' in save[].userId ]{
                image{
                  asset->{
                    url
                  }
                },
                _id,
                destination,
                postedBy->{
                  _id,
                  userName,
                  image
                },
                save[]{
                  postedBy->{
                    _id,
                    userName,
                    image
                  },
                },
              }`;
              return query;
            };

//query the post when searched
export const searchQuery=(searchTerm)=>{
    const query =`*[_type == "post" && title match '${searchTerm}' || category match '${searchTerm}']{
        image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
}

//categories for side bar and slice for categories
export const categories = [
  {
    name: 'Pizza',
 
  },
  {
    name: 'Burger',
    
  },
  {
    name: 'Street-food',
    
  },
  {
    name: 'Noodle',
    
  },
  {
    name: 'Soup',
   
  },
  {
    name: 'Others'
  },
  {
    name: 'Pub',
    
  },
  {
    name: 'Beach',
    
  },
  {
    name: 'Temple',
    
  }
  
  
  
];
//query to get the actual detail for select post
export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};
//query relate post base on the same category type
export const postDetailMorepostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
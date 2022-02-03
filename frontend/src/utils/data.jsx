//pass id and return true if condition meet
export const userQuery=(id)=>{
    const query = `*[_type=='user' && _id=='${id}']`
    return query
}
export const feedQuery= `*[_type == "post" ]| order(_createAt desc){
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
   
            export const userCreatedpostsQuery = (userId) => {
              const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
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
            
            export const userSavedpostsQuery = (userId) => {
              const query = `*[_type == 'post' && '${userId}' in save[].userId ] | order(_createdAt desc) {
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
export const categories = [
  {
    name: 'Khmer',
 
  },
  {
    name: 'Japanese',
    
  },
  {
    name: 'Korean',
    
  },
  {
    name: 'Temple',
    
  },
  {
    name: 'Beach',
   
  },
  
  
];
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
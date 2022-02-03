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
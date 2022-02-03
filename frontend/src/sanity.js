import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client=sanityClient({
    projectId:'q22ufz1b',
    dataset:'production',
    apiVersion:'2021-11-11',
    useCdn:true,
    token:'sk32YGw3OF2EH8XyOc3aWd0Mnzdh9UMQLy65hHjQMsVCBXyjRxrFW3X3RAXRTP024d8zbdFC6U4prwUVlJ1PoLhEd6euvGTrXYUXtstixpXyu6NndG3j7mTMFozXg7xklGbaBBxxlCS6NuE9PuvjeHS2c2biblZgPjDW3hzhrEIHupXUgpVM'
})

export const builder= imageUrlBuilder(client)

export const urlFor=(source)=> builder.image(source)




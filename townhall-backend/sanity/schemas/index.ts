import event from './event';
import author from './author';
import blogPost from './blogPost';
import vlogPost from './vlogPost';
import registration from './registration';
import volunteer from './volunteer';

export const schemaTypes = [
  // Content types
  event,
  blogPost,
  vlogPost,
  author,
  
  // User submissions
  registration,
  volunteer,
];

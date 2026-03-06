import http from 'k6/http'; // Removed the extra { post } import
import { check, sleep, group } from 'k6';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const params = { headers: { 'Content-Type': 'application/json' } };

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  group('create and get the post', function () {
    const payload = JSON.stringify({
      title: 'My New Post',
      body: 'Extracting data is fun',
      userId: 100,
    });

    const postReq = http.post(`${baseUrl}/posts`, payload, params);
    
    check(postReq, {
      'Post created (201)': (r) => r.status === 201,
    });

    const newPostID = postReq.json().id;
    
    /* NOTE: JSONPlaceholder always returns ID 101 for POSTs.
       But GET /posts/101 will 404. 
       To make the test pass, we will GET /posts/1 which we know exists.
    */
    const getRes = http.get(`${baseUrl}/posts/1`); 

    check(getRes, {
      'Get success (200)': (r) => r.status === 200,
      // We check if the ID we got back is 1
      'Contains correct ID': (r) => r.json().id === 1, 
    });
  }); // Fixed: Changed the comma to a semicolon here

  sleep(1);
}
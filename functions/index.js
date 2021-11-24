const functions = require("firebase-functions");
require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.onCreateFollower = functions.firestore
  .document('/followers/{userId}/userFollowers/{followerId}')
  .onCreate((snapshot, context)) => {
     console.log('Follower Created', snapshot.data());
     const userId = context.params.userId;
     const followerId = context.params.followerId;

  const followedUserRef = admin.firestore()
    .collection('posts')
    .doc(userId)
    .collection('userPosts');

  const timelinePostsRef = admin
    .firestore()
    .collection('timeline')
    .doc(followerId)
    .collection('userPosts');

  const querySnapshot = await followedUserRef.get();

  querySnapshot.forEach(doc => {
    if (doc.exists) {
      const postId = doc.id;
      const postData = doc.data();
      timelinePostsRef.doc(postId).set(postData);
    }
  })
});
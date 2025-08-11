const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendToAll = async (req, res) => {
  const { title, body } = req.body;

  try {
    const usersSnapshot = await admin.firestore().collection('users').get();

    if (usersSnapshot.empty) {
      return res.status(404).send('No users found');
    }

    // Extract all valid FCM tokens
    const tokens = [];
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.fcmToken) {
        tokens.push(data.fcmToken);
      }
    });

    if (tokens.length === 0) {
      return res.status(404).send('No valid FCM tokens found');
    }

    // Create messages array
    const messages = tokens.map(token => ({
      token,
      notification: {
        title,
        body,
      },
    }));

    // Send messages concurrently
    const results = await Promise.allSettled(
      messages.map(msg => admin.messaging().send(msg))
    );

    // response report
    const report = {
      success: true,
      total: results.length,
      sent: 0,
      failed: 0,
      failureDetails: [],
      tokens: tokens,
    };

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        report.sent++;
      } else {
        report.failed++;
        report.failureDetails.push({
          token: tokens[index],
          reason: result.reason.message || result.reason.toString(),
        });
      }
    });

    res.status(200).json(report);

  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Internal Server Error');
  }
};

const sendToAny = async (req, res) => {
  const { email, title, message } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const userQuerySnapshot = await admin
      .firestore()
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (userQuerySnapshot.empty) {
      return res.status(404).send('User not found');
    }

    const userDoc = userQuerySnapshot.docs[0];
    const userData = userDoc.data();

    if (!userData.fcmToken) {
      return res.status(404).send('User has no valid FCM token');
    }

    const messagePayload = {
      token: userData.fcmToken,
      notification: {
        title,
        body: message,
      },
    };

    // Send the message
    const response = await admin.messaging().send(messagePayload);

    res.status(200).json({
      success: true,
      messageId: "Message Sent SuucessFully",
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  sendToAll,
  sendToAny
};

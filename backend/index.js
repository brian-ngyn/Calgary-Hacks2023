const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
var crypto = require('crypto')
var shasum = crypto.createHash('sha1')
const serverless = require('serverless-http')

const admin = require('firebase-admin')

const serviceAccount = {
  type: 'service_account',
  project_id: 'calgary-hacks2023',
  private_key_id: '3d093c94cf8713daabc3a8a939aaa3454a4680eb',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCRiXybzrZP7Wxu\n8Da0CS42smnMw6Ni3qREhiXlL0REolzEBt2tj9egXe0dS/zBL4RNgPXapmOIg9ZR\nFZPiDsLvrtOcf4Y8JllFCSLQEzJDB4ryQvyUY9BqRezn5vVgfNSurnTzwKU/wd9D\nosvnOW/wmMvsQZOxud6gMS1QBZz1j1u3XPPgERShfnvzcyUI21JbBLtkKnNW69gf\nGvZZqubXAz0ZnZvB+5WUSPPDGEVPNzYFmGRMkIXBT+wWbfF4LftvZ/um8o8he4Rw\nTpX88KyIwefvd+6iGi8ef9/OmmdsJp7w4nUn8Wb1wz19k54xEx8EmaK7uLm7gNW5\nfDEEMxkVAgMBAAECggEAEj7COGY5xNtm9KF4uilMed70FI+SNBrlTRHkPk8mp9QS\n/SA/OjsGNTyRNVMJZM6oL28zYy3o3Hxqqc+isnxXQ+UO8leqZHAKUPVMP/moG28e\npDBxqci5oBkUEh6KNIZxw1RrpQNJtCyB6ODH3zz8I5WEOyIdefJrTnnbzGRnwQD/\na2hupAD0r5v4A7CA8e9JaSk/q2AE5SWyrCKvcPQ/SESd6BQKyoCH5d8hYrjVElaI\nfucyaoLyA/gy4LfEZ6f++KjBdq/5ygAMlP22Of+7OJ3Tga5PmdCz7X5sOfGTnZjd\n8WNb4odAxjVRC2n/6Nzrw4ddUZdWSWVmiLtg+7DpAQKBgQDMvL6B+Zrm+5qfi4UK\nRMVN8amBtP/NpfaEbkFdFukE/eD3NKkxN+HMrg8B3DpNozCHA3qd1cce90FdNU9V\noihFKscvw2VuSWrEYmkqG+8tHodYSvywIvQMwaLBP/yiJu4PAhq2KhLTCiHl8vLr\nB5QtetmD5YuNjCkW5Ry7RkNZyQKBgQC1+iAAWCQlp12ELNZHjvv9KzSQCWl0bJPe\nOkeqGQOum3FZMOvaAiUtJ9CG6Esnbte7jTfoT7vMxj+zPoNnQhF4bcQgaJ3QhIC3\nbAx03JUm6dJ8tp8ZWf+RWA3sMXU3Nl/WKBJc2GGXPXNAFl+JceICOaMtw1YOf73y\nvGImAS4q7QKBgC+7RTLqLWnyeK7/iQnG1LUCRUF/IDAipCFlzwlT4QmP4tXfSh62\nZ4cfgVIutM0K4bJoZjrL7ztR68Q+PHu7bWYKvhttk4Utyp10UA5IKu+68VTtTpIF\n5B3hOv+Q2mY3a0LGe9HCZ1caQqLojCetQaeEv5dXebyLU70JtzQWAne5AoGAKnVo\noAvwqyRoql03xcxzuPcqtWyswTBQM+qPK/3YIRY9lRzX+q7Dc8y1V7S9TD8NcMIb\nSEXKQJYE6NJuIFqG7v1VZGZkY/F2gtVf9qg82K53oQePCYA5I/VSkkhb2/0A0Vva\nJPWLl5kL2ekec1gx7mj6TMQlwQ5HCGqxz8I4vmUCgYEAwWBiSfT1irSG2fH0K11i\nQOKiiEfgthJusTVFS/fj9Tv2evB15ZncMGmCBNSES5zQ90deRY0Gi9wFd/7PMOZc\nsOFllyQ1iyF+eA40HmyVXTTJXMpT9MK5An8DABGVTPMq/2fzdsY8cycAHijpu+Ai\nTUIGAYda+1lZPur0tpqy++0=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-50hdq@calgary-hacks2023.iam.gserviceaccount.com',
  client_id: '101560847878051297364',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-50hdq%40calgary-hacks2023.iam.gserviceaccount.com',
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://calgary-hacks2023.appspot.com',
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

app.use(express.json());
app.use(express.static("./public"));

app.post('/createPortfolio/:uuid', (req, res) => {
  let existingPortfolio = []
  db.collection('user')
    .doc(req.params.uuid)
    .get()
    .then((snapshot) => {
      existingPortfolio = snapshot.data().portfolio
      existingPortfolio.push({
        skill: req.body.skill,
        description: req.body.description,
        hourlyRate: req.body.hourlyRate,
        media: req.body.media,
      })

      db.collection('user')
        .doc(req.params.uuid)
        .update({
          portfolio: existingPortfolio,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          res.send('Portfolio Created')
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    })
})

app.get('/skills', (req, res) => {
  console.log('Inside skills')
  db.collection('categories')
    .get()
    .then((snapshot) => {
      const skills = []
      snapshot.forEach((doc) => {
        skills.push(doc.data())
      })
      res.send(skills)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.get('/instructors/:sport', (req, res) => {
  let instructors = []
  db.collection('user')
    .get()
    .then((allUsers) => {
      allUsers.forEach((user) => {
        let portfolioArray = user.data().portfolio
        if (portfolioArray) {
          portfolioArray.forEach((portfolio) => {
            console.log(portfolio.skill, req.params.sport)
            if (portfolio.skill === req.params.sport) {
              console.log('here')
              instructors.push(user.data())
            }
          })
        }
      })
      res.send(instructors)
    })
})
     

  app.get("/allUsers", (req, res) => {  
    db.collection("user").get().then((snapshot) => {  
      const users = [];
      snapshot.forEach((doc) => {
        users.push(doc.data());
      });
      res.send(users);
    }).catch((err) => {
      console.log(err);
    });
  });

  app.get("/reccomendations/:uuid", (req, res) => {
    let users = [];
    let interests = [];
    db.collection("user").doc(req.params.uuid).get().then((user) => {
      interests = user.data().interests;
      console.log(interests);

      db.collection("user").get().then((allUsers) => {
        allUsers.forEach((secondUser) => {
          let check = true
          if(secondUser.id !== req.params.uuid) {
       
            secondUser.data().portfolio.forEach((portfolio) => {
              if (interests.includes(portfolio.skill) && check) {
                users.push(secondUser.data())
                check = false
              }
            })
          }
        })

        res.send(users)
      })
    });

  });
    

app.get("/getUser/:uuid", (req, res) => {
  db.collection("users").doc(req.params.uuid).get().then((doc) => {
    res.send(doc.data());

  }).catch((err) => {
    res.send(err);
  });
});

app.get("/portfolios/:uuid", (req, res) => {
  db.collection("user").doc(req.params.uuid).collection("portfolios").get().then((snapshot) => {
    const portfolios = [];
    snapshot.forEach((doc) => {
      portfolios.push(doc.data());
    });
    res.send(portfolios);
  }).catch((err) => {
    res.send(err);
  });
});


const port = process.env.PORT || 3001
if (process.env.ENVIRONMENT === 'production') {
  exports.handler = serverless(app)
} else {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
  })
}

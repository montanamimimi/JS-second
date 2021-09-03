const express = require('express');
const fs = require('fs');
const app = express();


app.use(express.json());
app.use(express.static('../public'));

app.get('/catalogData', (req, res) => {
    fs.readFile('db/productList.json', 'utf8', (err, data) => {    
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));            
          } else {
            res.send(data);
          }      
    });
  });

app.get('/cartData', (req, res) => {
    fs.readFile('db/getBasket.json', 'utf8', (err, data) => {    
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));            
          } else {
            res.send(data);
          }      
    });
  });


app.post('/cartData', (req, res) => {
  fs.readFile('db/getBasket.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);
      cart.push(req.body);

      fs.writeFile('db/getBasket.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });


});

app.put('/cartData/:id', (req, res) => {
  fs.readFile('db/getBasket.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const cart = JSON.parse(data);
      const find = cart.find(el => el.id === +req.params.id);
      find.quantity += req.body.quantity; 

      fs.writeFile('db/getBasket.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
});

app.delete('/cartData', (req, res) => {
    fs.readFile('db/getBasket.json', 'utf-8', (err, data) => {
      if (err) {
        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
      } else {
        const cart = JSON.parse(data);

        let findIndex = cart.findIndex(el => el.id === req.body.id); 

        cart.splice(findIndex, 1);
        
        fs.writeFile('db/getBasket.json', JSON.stringify(cart), (err) => {
          if (err) {
            res.send('{"result": 0}');
          } else {
            res.send('{"result": 1}');
          }
        })
      }
    });
  });

app.listen(3000, () => {
  console.log(`Listening 3000 port`);
});

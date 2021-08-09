'use strict';

let str = "One: 'Hi Mary.' Two: 'Oh, hi.' \r\n One: 'How are you doing?' \r\n Two: 'I'm doing alright. How about you?' \r\n One: 'Not too bad. The weather is great isn't it?' \r\n Two: 'Yes. It's absolutely beautiful today.' \r\n One: 'I wish it was like this more frequently.' \r\n Two: 'Me too.' \r\n One: 'So where are you going now?' \r\n Two: 'I'm going to meet a friend of mine at the department store' \r\n One: 'Going to do a little shopping?' \r\n Two: 'Yeah, I have to buy some presents for my parents.' \r\n One: 'What's the occasion?' \r\n Two: 'It's their anniversary.' \r\n One: 'That's great. Well, you better get going. You don't want to be late.' \r\n Two: 'I'll see you next time.'\r\n One: 'Sure.' Bye.'";

let str1 = str.replace(/'/g, '"');

// при использовании границы лсова фигня выходит из-за ' после точек.  Так вроде работает. 

let str2 = str.replace(/([^a-z]+)'|'([^a-z]+)/ig, '$1"$2');


document.getElementById('parser1').innerText = str1; 
document.getElementById('parser2').innerText = str2; 





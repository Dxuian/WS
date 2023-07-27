// var data = require("./data.js");
const { v4: uuidv4 } = require('uuid');
const url = require("url");
const fastify = require("fastify");
var listofconnections = new Array()
var listoflobbiesnthiertext = new Array();
var infoofwhowantagain = new Array() ; 
var listoftimer = new Array(); 
var listoftimer2 = new Array(); 
var listoftimer3 = new Array(); 
var fs = require('fs');
const { ifError } = require("assert");
const { send } = require("process");
//testinf stuff
//made changes again
//haha
//haha
//haha
//ok idk what im doin now 
async function routes(fastify, opts, done) {
    fastify.get("/",(req,res)=>{
        res.redirect("/handler") ; 
    })
    fastify.get("/handler*", (req, res) => {
        fastify.log.info(req.hostname)
        fastify.log.info(req.url)
        fastify.log.info(req.ip)
        fastify.log.info(req.ips)
        fastify.log.info(req.raw.ip)
        var afl = String(req.url).substring(8), lobbycode;
        fastify.log.info(afl)   
        if (afl.length > 3) {   
            var buffer = process.env.API_BASE_URL + afl
            lobbycode = String((afl));
        }
        else {
            var randlobbycode = uuidv4()
            lobbycode = String((randlobbycode))
            var buffer = process.env.API_BASE_URL + randlobbycode
        }
        fastify.log.info(`lobbycode :   ${lobbycode}`)
        var wscode = String((buffer));
        fastify.log.info(`wscode :   ${wscode}`)
        try {
            res.setCookie('lobbycode', lobbycode);
            fastify.log.info("#############")
            fastify.log.info(lobbycode);
            res.setCookie('wscode', wscode);
            res.code(200).sendFile("pract.html")
        } catch (error) {
            fastify.log.info(error)
        }
    })
    fastify.get("/retreive" , async (req,res)=>{
        var  dataforglobal = await retrieveglobal() ; 
         dataforglobal = {data : dataforglobal}  
         res.send(dataforglobal)
    })
    fastify.get("/check",async (req,res)=>{
        k = await contentgetter() ; 
        res.send(k) ; 
     })
     fastify.get("/lit",(req,res)=>{
        res.code(200).sendFile("testi.html")     
    })

    fastify.get("/ws/*", { websocket: true }, async(connection /* SocketStream */, req /* FastifyRequest */) => {    
       try{
        var typo  ;
        fastify.log.info("###########")
        randssid = uuidv4();
        lbycode = req.url.slice(4)
        for (const iterator of listoflobbiesnthiertext) {
            if (iterator.matchgoinon) {
                await sendmsg({info:"plswait"}, "toself", wsh=connection) ; 
                connection.socket.close() ; 
                break ;
            }
        }

        //validating lobbycode
        if(lbycode.length<32)
        {   
            fastify.log.info("false attempt")
            typo= false
            if (lbycode.length<4){
                await connection.socket.close(3000) ;
                                                                                                                                        
            }
            else{await connection.socket.close(3636)} ; 
        }
        //adding stuff to connection list 
        leader=false ;  
        if(listofconnections.length==0)
        {
            leader=true ; 
        }
        for (const element of listofconnections) {
            if (element.lobbycodes === lbycode && element.ssid != randssid) {
                // Update the leader property
                leader=false; 
                break;
              }
              else
              {
                leader=true ; 
              }
        }
        listofconnections.push({ connect: connection, ssid: randssid, lobbycodes: lbycode ,reqq:req,leader:leader,playerinfo:{name:"Anonymous",rank:"n/a",leader:leader}})      
        var falsi=false,tk ; 
        for (const iterator of listoflobbiesnthiertext) {
        if (lbycode==iterator.lobbycode) {
            falsi = true ; 
            iterator.ssids.push(randssid)
            iterator.noofplayer++ ; 
            tk = iterator.noofplayer ; 
            break;
        }
        }
        if (falsi==false) {                 //ok                     //ok            //ok              //ok         //ok               //ok            //ok         
        listoflobbiesnthiertext.push({lobbycode:lbycode , ssids:[randssid] , text:[] , content:"" ,starttime:"" , accuracy:[], wpm: [] , finishtime:[]  ,clipwpmaccat:[],matchgoinon:false,noofplayer:1,leftplayer:[]});
        }
        if (tk>=5) {
          await   sendmsg({ info: "maxnumber" }, "toself", wsh=connection) ; 
            connection.socket.close(1220) ; 
        }
        if (infoofwhowantagain.length==0) {
                    infoofwhowantagain.push({lobbycode:lbycode , ssid:[] , name:[]})
        }
        else{
        for (const iterator of infoofwhowantagain) {
           iterator.lobbycode ? true : iterator.lobbycode = lbycode  , iterator.ssid = [] , iterator.name = []; 
        }}
        var typedstuff , ptempssid ,typedstuffholder; 
        //revealing information
        fastify.log.info(lbycode + "  is his lobbycode")
        fastify.log.info("###########")
        if(leader==true)
        {   
            var  temara =[] , x ; 
            for (const iterator of listofconnections) {
                if (randssid==iterator.ssid) {
                    x = iterator
                    break ; 
                }
            }
            for (const iterator of listofconnections) {
                if (x.lobbycodes==iterator.lobbycodes && x.ssid==iterator.ssid) {
                    temara.push(iterator.playerinfo)
                } 
            }
            temara = {tempara:temara , ssid:randssid}
            x = JSON.stringify(temara)
            
            sendmsg({info:`you have created a lobby---${x}`} , "toself" ,wsh = connection,randssid)
        }   
        else if (leader==false)
        {
           var  temara =[] , x , temara2=[]; 
            for (const iterator of listofconnections) {
                if (randssid==iterator.ssid) {
                    x = iterator
                    break ; 
                }
            }
            for (const iterator of listofconnections) {
                if (x.lobbycodes==iterator.lobbycodes) {
                    temara.push({stuff:iterator.playerinfo,ssid:iterator.ssid})
                } 
            }
            for (const iterator of listofconnections) {
                if (x.lobbycodes==iterator.lobbycodes && x.ssid==iterator.ssid) {
                    temara2.push(iterator.playerinfo)
                    break ; 
                } 
            }
            temara = {tempara:temara}
            temara2 = {tempara:temara2,ssid:randssid}
            x = JSON.stringify(temara)
            y = JSON.stringify(temara2)
            
            sendmsg({info:`you have joined someone elses lobby---${x}`} , "toself" ,wsh = connection,randssid)
            sendmsg({info:`someone has joined---${y}`} , "nottoself" ,wsh=connection,randssid)
        }
        connection.socket.on("close", () => {
            fastify.log.info("%%%%%%%%%%%")
            for (let x of listofconnections) {
                if (x.connect === connection) {
                    for (const iterator of listoflobbiesnthiertext) {
                        if (iterator.lobbycode==x.lobbycodes) {

                            for (const w of iterator.ssids) {
                                if (w==x.ssid) {
                                    k = (iterator.ssids).indexOf(w) ; 
                                    iterator.ssids.splice(k,1);
                                    iterator.text.splice(k,1);
                                    iterator.wpm.splice(k,1);
                                    iterator.accuracy.splice(k,1);
                                    iterator.finishtime.splice(k,1);
                                    iterator.clipwpmaccat.splice(k,1);
                                    iterator.noofplayer-- ; 
                                    
                                    for (const it of listoftimer) {
                                        if (it.ssid==w) {
                                            cleartimer(w) ;
                                            leftplayer(iterator,w) ;
                                            break ;
                                        }
                                    }
                                    break ; 
                                }
                            }
                            break ; 
                        }
                    }
                    for (const iterator of infoofwhowantagain) {
                        if (iterator.lobbycode==x.lobbycodes) {
                            for (const f of iterator.ssid) {
                                if (f.ssid==x.ssid) {
                                   var  k = iterator.ssid.indexOf(f);
                                     f.splice(k,1) ; 
                                     iterator.name.splice(k,1) ; 
                                     break ; 
                                }
                            }
                            break ; 
                        }
                    }
                    tempstr = x.reqq.url 
                    fastify.log.info(x.lobbycodes + "has left!!!!!!!")
                    //checking if the leader left and transfering to the first newcomer 
                    if (x.leader==true) {
                       var k = false ; 
                        for (const iterator of listofconnections ) {
                            if (iterator.lobbycodes == x.lobbycodes && iterator.ssid!=x.ssid) {
                                iterator.leader = true ;
                                 k = true ;
                                iterator.playerinfo.leader = true ; 
                                fastify.log.info("Leader left so leadership passed on ")
                                sendmsg({info:"you are now the leader"},"toself",iterator.connect) ; 
                                break ; 
                            }
                        }
                        var no ; 
                        for (const iterator of listoflobbiesnthiertext) {
                            if (x.lobbycodes==iterator.lobbycode) {
                                iterator.matchgoinon = false ; 
                                  no = iterator.noofplayer
                            }
                        }
                        if (no<1) {
                           cleartimer(x.ssid,true) 
                        }
                        
                        if (k==false  ) {
                            fastify.log.info("Leader and everyone else left  ")
                            for (const iterator of infoofwhowantagain) {
                                if (iterator.lobbycode==x.lobbycodes) {
                                    infoofwhowantagain.splice(infoofwhowantagain.indexOf(iterator),1) ; 
                                    break ; 
                                    }               
                                }
                        }                        
                    }
                    if (typo==false) {
                        
                        fastify.log.info(tempstr + "was a false url user!!!!!!!")
                        typo = true ; 
                    }
                    else{
                        fastify.log.info("removed a connection")
                        y= JSON.stringify({playerinfo:x.playerinfo,ssid:x.ssid}) ; 
                          sendmsg({info:`removeplayer---${y}`}, "toall", null,x.ssid)                   
                        type = true ; 
                    }
                    listofconnections.splice(listofconnections.indexOf(x),1)
                    break;
                }
            }
        })
        connection.socket.on("message", async (message) => {
            var text = String.fromCharCode(...message) ; 
            if (text.startsWith("playertype")) {
              typedstuff = text.substr(13),ptempssid; 
                if (!!typedstuff==false) {
                    typedstuff=typedstuffholder
                }
                else
                {
                    typedstuffholder=typedstuff
                }
                for (const iterator of listofconnections) {
                    if (iterator.connect==connection) {
                        ptempssid = iterator.ssid
                        break; 
                    }
                }
                
                
                sendmsg({ info: `playertype---${ptempssid}---${typedstuff}` }, "nottoself", wsh=connection)
            }
            else if(text == "begin tracking"){
                var forsendwpma,newssid ; 
                lcdtime = findlcdcode(connection)
                for (const iterator of listoflobbiesnthiertext) {
                    if (lcdtime==iterator.lobbycode) {
                        iterator.matchgoinon = true ; 
                       forsendwpma =  listoflobbiesnthiertext.indexOf(iterator)
                        break ; 
                    }
                }
                for (const iterator of listofconnections) {
                    if (iterator.connect==connection) {
                        newssid = iterator.ssid
                    }
                }
                var timerforadder = 
                setInterval(async () => {
                        for (const iterator of listoflobbiesnthiertext) {
                            if (iterator.lobbycode==lbycode) {
                                  var status =  await  wpmaccupdater(newssid,connection,typedstuff)
                                  if (status==false) {
                                    cleartimer(newssid) ;
                                    leftplayer(iterator,newssid) ;
                                    continue ; 
                                  }
                                  if ((new Date).getTime  -    Number(iterator.starttime)> 100000) {
                                    cleartimer(newssid) ;
                                    sendmsg({info:"closinglobby404"},"toall",wsh=connection) ;
                                    for (const x of listofconnections) {
                                        if (connection == x.connect) {
                                            hold = x;
                                            break;
                                        }
                                    }
                                    for (const y of listofconnections) {
                                        if (hold.lobbycodes = y.lobbycodes) {
                                            y.connect.close();
                                        }
                                    }
                                  }
                                    sendwpmaccu(newssid , forsendwpma,connection) ; 
                                    break ; 
                            }
                        }
                }, 300);
                listoftimer.push({ssid:newssid ,timer:timerforadder}) ; 
            }
            else if (text.startsWith("namechange")) {
                var p = text.substr(13) ,ssidforname; 
                p = JSON.parse(p) ; 
                for (const iterator of listofconnections) {
                    if (p.ssid==iterator.ssid) {
                        iterator.playerinfo.name =  p.name ;
                        ssidforname =iterator.ssid
                    }
                }
                p = JSON.stringify(p) ; 
                sendmsg({info:`newname---${p}`},"nottoself",wsh=connection) ; 
            }
            else if (text.startsWith("start game" )) {
                    for (let x of listofconnections) {
                        if (connection === x.connect && x.leader==true) {
                            lcdtime = x.lobbycodes;
                            break;
                        }
                    }
                    performance.mark('start');
                    conpara = await contentgetter() ; 
                    performance.mark('end');
                    performance.measure('myFunction', 'start', 'end');
                    const measure = performance.getEntriesByName('myFunction')[0];
                    console.log(`Execution time: ${measure.duration} milliseconds`);
                    dnftimeinms = timerfordefault()
                    var delay = delaygiver() ; 
                   
                    const lobbycodes = lcdtime;
                    var timobj = {
                        delay:delay,
                        lobbycodes:lobbycodes,
                        dnf : dnftimeinms , 
                        };
                        var  y = {content: conpara ,delay:delay , dnfinfo:timobj.dnf} 
                        y = JSON.stringify(y)
                    var packet = JSON.stringify({delay:delay}) ; 
                    sendmsg({info:`preparedelaytimer---${packet}`},"toall",wsh=connection)  ;
                    var pliosa = setTimeout(()=>{
                        for (const iterator of listoflobbiesnthiertext) {
                            if (lcdtime==iterator.lobbycode) {
                                iterator.content = conpara
                                iterator.starttime = String((new Date).getTime())
                                break ; 
                            }
                        }
                        sendmsg({ info: `timerstart---${y}`}, "toall", wsh=connection)},delay) ;

                        var tempssid ; 
                        for (const iterator of listofconnections) {
                            if (iterator.lobbycodes==lobbycodes) {
                                tempssid = iterator.ssid
                            }
                        }
                        listoftimer2.push({ssid:tempssid ,timer:pliosa}) ; 
                        var kas =  setTimeout(() => {
                        sendmsg({info:"stoptypeingnow"}, "toall", wsh=connection,tempssid)}, timobj.dnf + delay);
                    listoftimer3.push({timer:kas , lobbycode : lobbycodes}) ; 
            }
            else if (text.startsWith("playertypf")) { 
             
                var psssssid = text.substr(13,36) ; 
                var textfromsenders = text.substr(52)  ;
                var  lobycode , unreal = true , lobbyindex;  
                repeatedcode(connection,psssssid,textfromsenders)               
            }
            else if (text.startsWith("finished")) {
               
                const temp = JSON.parse(text.substr(11)) , timefromclient = Number(temp.time)
                const detail = temp.detail
                var pssssid =  detail.substr(0,36)
                var textfromsender = detail.substr(39) , fin = true  ;
                repeatedcode(connection,pssssid,textfromsender,fin,timefromclient)
            }
            else if (text == "closelobby") {
                for (const x of listofconnections) {
                    if (connection == x.connect) {
                        hold = x;
                        break;
                    }
                }
                for (const y of listofconnections) {
                    if (hold.lobbycodes = y.lobbycodes) {
                        y.connect.close();
                    }
                }
            }
            else if(text=="rematch")
            {
                var lobicode  , name,ssid, y ,timer = 10000 ,num; 
                //finding lobbycode
                fastify.log.info("asking for rematch") ;
                for (const iterator of listofconnections) {
                    if (iterator.connect==connection) {
                        lobicode = iterator.lobbycodes ;
                        name = iterator.playerinfo.name;
                        ssid = iterator.ssid ; 
                    }
                }
                
                for (const iterator of infoofwhowantagain) {
                    
                    
                    if (iterator.ssid.includes(ssid)) {
                        fastify.log.info("asking again huh ???")
                        return ; 
                    }
                    if (iterator.lobbycode==lobicode) {
                        if (Object.hasOwn(iterator,"time")) {
                            fastify.log.info("its happening bruh  ")
                            return ; 
                        }
                        iterator.ssid.push(ssid) ; 
                        iterator.name.push(name) ; 
                        y  = iterator ; 
                        var num = infoofwhowantagain.indexOf(iterator) ; 
                        if (iterator.name.length==2 && !iterator.time) {
                            iterator.time = timer ;
                            break ;  
                        }
                        break ; 
                    }
                    
                }
                for (const iterator of listoflobbiesnthiertext) {
                    if (iterator.lobbycode==lobicode) {
                        if (iterator.noofplayer==1 ) {
                            if(!y)
                            {
                                y.time= timer ; 
                            }
                            y.time= timer ; 
                            y = JSON.stringify(y) ; 
                            sendmsg({info:`rematch happening---${y}`} , "toall" , wsh=connection) ;  
                            setTimeout(()=>{
                                delete infoofwhowantagain[num].time ; 
                                // infoofwhowantagain.splice(infoofwhowantagain.indexOf(y),1) ; 
                                sendmsg({info:"restettogames"},"toall",wsh=connection) ;                               
                            },timer)
                            return ; 
                        }
                       
                    }
                }
                if (y) {
                    if (Object.hasOwn(y,"time")) {
                        setTimeout(()=>{
                            delete infoofwhowantagain[num].time ; 
                            // infoofwhowantagain.splice(infoofwhowantagain.indexOf(y),1) ; 
                            sendmsg({info:"restettogames"},"toall",wsh=connection) ; 
                            
                        },timer)
                       }
                }
               
                y = JSON.stringify(y) ; 
                sendmsg({info:`rematch happening---${y}`} , "toall" , wsh=connection) ; 
              
            }
        })   
    }
    catch(e)
    {
        const newUrl = 'ws://new-server:3000/redirect';
        const closeEvent = JSON.stringify({ code: 3001, reason: `Redirecting to ${newUrl}` });
        connection.socket.close(3001, closeEvent);
    }
})
    done();
}
function cleartimer3(lobbycode) {
    for (const iterator of listoftimer3) {
        if(iterator.lobbycode==lobbycode)
        {
            clearTimeout(iterator.timer) ; 
            listoftimer3.splice(iterator,1) ; 
            return  ; 
        }
    }
}
function timerfordefault(params) {
    return 30000 ; 
}

function delaygiver(params) {
    return 3000 ; 
}
//haha ok for it 
function findlcdcode(connection)
{
    for (const iterator of listofconnections) {
        if (connection==iterator.connect) {
            return iterator.lobbycodes  ;
        }
    }
}
function  repeatedcode(connection,pssssid,textfromsender,fin,timefromclient) {
    
         var lobycode , unreal = true , lobbyindex; 
                
                cleartimer(pssssid);                                
                //finding lbycode 
                for (const iterator of listofconnections) {
                    if (iterator.ssid==pssssid) {
                        lobycode = iterator.lobbycodes
                        break ; 
                    }
                }
                
                for (const iterator of listoflobbiesnthiertext) {
                    if (iterator.lobbycode==lobycode) {
                      lobbyindex = listoflobbiesnthiertext.indexOf(iterator) ; 
                        for (const w of iterator.ssids) {
                            if(w==pssssid)
                            {
                                if (fin) {
                                    iterator.clipwpmaccat[(iterator.ssids).indexOf(w)] =iterator.wpm[(iterator.ssids).indexOf(w)].length
                                    if (((timefromclient - (new Date).getTime())/timefromclient)<0.05) {
                                        iterator.finishtime[(iterator.ssids).indexOf(w)]  = timefromclient
                                    }
                                    else{iterator.finishtime[(iterator.ssids).indexOf(w)] = (new Date).getTime()}
                                    iterator.finishtime[(iterator.ssids).indexOf(w)] = (new Date).getTime()
                                }
                                iterator.text[(iterator.ssids).indexOf(w)] = textfromsender
                                break;
                            }
                        }
                        break ; 
                    }

                }
                //checkif for every ssid a text exists 
                var lolttindexforpass ;           
                for (const iterator of listoflobbiesnthiertext) {
                    if (iterator.lobbycode==lobycode) {
                        lolttindexforpass = listoflobbiesnthiertext.indexOf(iterator) ; 
                       for (let index = 0; index < (iterator.ssids).length; index++) {
                        variablenamefor = !!(iterator.ssids[index])
                        variablenamefor2 = !!(iterator.text[index])
                        if (iterator.text[index]=="" || iterator.leftplayer[index]==true) {
                            variablenamefor2 = true ; 
                        }
                        if (variablenamefor!=variablenamefor2)  {
                            unreal = false
                            break ; 
                        }

                       }
                       break ; 
                    }
                }
                if (unreal) {  
                    cleartimer3(listoflobbiesnthiertext[lolttindexforpass].lobbycode) ; 
                    clipperfunction(lolttindexforpass) ;      
                   ar =  statscalculator(lolttindexforpass)
                  
                  artemp = []
                  for (const iterator of ar) {
                    // for (const o of listoflobbiesnthiertext[lolttindexforpass].text) {
                        killer = (listoflobbiesnthiertext[lolttindexforpass].text[ar.indexOf(iterator)]).length
                        time1 = Number(listoflobbiesnthiertext[lolttindexforpass].finishtime[ar.indexOf(iterator)])
                        starttime = Number(listoflobbiesnthiertext[lolttindexforpass].starttime)  ; 
                        !!time1 ? iterator.time = Math.round(time1-starttime): iterator.time = timerfordefault() ;    
                        artemp.push(calculatewinner(iterator.peakWPM, iterator.peakAccuracy, iterator.modeacc, iterator.modewpm,killer,Number(listoflobbiesnthiertext[lolttindexforpass].finishtime[ar.indexOf(iterator)]), time1))
                        
                    // }
                  }
                  const winnerchar = determineWinner(artemp) ; 
                 const  y = JSON.stringify({statsofall:ar , scores:artemp })
                  sendmsg({info:`finalresultscompiled---${y}`},"toall",wsh=connection)
                  listoflobbiesnthiertext[lolttindexforpass].matchgoinon = false  ; 
                  const winnerssid = listoflobbiesnthiertext[lolttindexforpass].ssids[artemp.indexOf(artemp[(winnerchar.winner)])]
                    statspushforglobals(ar[winnerchar.winner],winnerchar,listoflobbiesnthiertext[lolttindexforpass].finishtime[winnerchar.winner],winnerssid)     ;
                }
    
}
//        listofconnections.push({ connect: connection, ssid: randssid, lobbycodes: lbycode ,reqq:req,leader:leader,playerinfo:{name:"Anonymous",rank:(Math.random()*10),leader:leader}})      
async function statspushforglobals(ar,winnerchar,finishtime,winnerssid)     
{   
    var nameof ; 
    for (const iterator of listofconnections) {
        if (iterator.ssid==winnerssid) {
            nameof = iterator.playerinfo.name  ;
           break ;  
        }
    }
    score = winnerchar.score
    app.sqlite.run(`CREATE TABLE IF NOT EXISTS statsforglobal(id INTEGER PRIMARY KEY, peakwpm INTEGER ,peakacc INTEGER , avgwpm INTEGER, avgacc INTEGER , time INTEGER , score INTEGER,name TEXT)`);
   //        arte.push({peakAccuracy:peakAccuracy , peakWPM:peakWPM ,modewpm:modewpm , modeacc:modeacc}) ; 
    var timetaken = finishtime
   if (!finishtime) {
        timetaken = timerfordefault()
    }
    
     await    app.sqlite.all('INSERT INTO statsforglobal (peakwpm,peakacc,avgwpm,avgacc,time,name, score) VALUES (?,?,?,?,?,?,?)',ar.peakWPM,ar.peakAccuracy,ar.modewpm,ar.modeacc,timetaken/1000,nameof,winnerchar.score)    
    var k = 123 ; 
    }
async function retrieveglobal(params) {
    app.sqlite.run(`CREATE TABLE IF NOT EXISTS statsforglobal(id INTEGER PRIMARY KEY, peakwpm INTEGER ,peakacc INTEGER , avgwpm INTEGER, avgacc INTEGER , time INTEGER , score INTEGER,name TEXT)`);
    tempdatafrom  =  app.sqlite.all(`SELECT * FROM statsforglobal ORDER BY score DESC, avgwpm DESC , peakwpm DESC , avgacc DESC, peakacc DESC LIMIT 10;`) ; 
    return tempdatafrom ; 
}
async function contentgetter(params) {
    const ar = [];
  
    const pusher = async (k) => {
      return await app.sqlite.get(
        `SELECT texts FROM "textsabnormal2" WHERE textlength <= 6 AND id = (?)`,
        k
      );
    };
  
    while (ar.length < 69) {
      const k = Math.ceil(Math.random() * 350000);
      const moip = await pusher(k);
      if (moip && moip.texts) {
        ar.push(moip.texts);
      }
    }
  
    return ar.join(" ");
  }
  
async function leftplayer(iterator,w) {
    for (const i of iterator.ssids) {
        if (i == w) {
            iterator.leftplayer[iterator.ssids.indexOf(i)] = true ; 
            break ; 
        }
    }
}
  

async function loaddb(fastify) {
    try {
        await fs.readFile("words_alpha.txt", async (er, data) => {
            await app.sqlite.run('CREATE TABLE IF NOT EXISTS textsnormal (id INTEGER PRIMARY KEY, texts TEXT)');
            var words = await String(data).split("\r\n");
            await words.forEach(async (element) => {
                await app.sqlite.run('INSERT INTO textsnormal (texts) VALUES (?)', element)
            });
            await fastify.log.info("1 db made Donedb loaded/made");
        });
        await fs.readFile("words.txt", async (er, data) => {
            await app.sqlite.run("BEGIN TRANSACTION;");
            await app.sqlite.run('CREATE TABLE IF NOT EXISTS textsabnormal (id INTEGER PRIMARY KEY, texts TEXT)');
            var words = await String(data).split("\r\n");
            for (const element of words) {
                await app.sqlite.run('INSERT INTO textsabnormal (texts) VALUES (?)', element);
            }
            await app.sqlite.run("COMMIT;");
            await fastify.log.info("abnormal table made ");
        });
    } catch (error) {
        fastify.log.info(error)
    }
    // move BEGIN TRANSACTION outside of the second readFile callback
}
function cleartimer(ssid,number) {

    if (number) {
        for (const iterator of listoftimer2) {
            if (ssid==iterator.ssid) {
                clearInterval(iterator.timer);
                listoftimer.splice(listoftimer.indexOf(iterator),1) ; 
                return  ; 
            }
        }
    }
    for (const iterator of listoftimer) {
        if (ssid==iterator.ssid) {
            clearInterval(iterator.timer);
            listoftimer.splice(listoftimer.indexOf(iterator),1) ; 
            return  ; 
        }
    }

}
function clipperfunction(ni)
{
    ko = listoflobbiesnthiertext[ni] ; 
    
    for (const iterator of ko.clipwpmaccat) {
        if (iterator) {
            ko.wpm[ko.clipwpmaccat.indexOf(iterator)].splice(iterator) ; 
            ko.accuracy[ko.clipwpmaccat.indexOf(iterator)].splice(iterator) ; 
        }
    }
    for (const iterator of ko.leftplayer) {
        if (iterator==true) {
            ko.wpm.splice(ko.leftplayer.indexOf(iterator),1)
            ko.accuracy.splice(ko.leftplayer.indexOf(iterator),1)
            if (ko.ssids[ko.leftplayer.indexOf(iterator)]) {
                ko.ssids.splice(ko.leftplayer.indexOf(iterator),1)
            
            }
           
        }
    }
}

function determineWinner(scores) {
    const highestScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(highestScore);
    if (winnerIndex !== -1) {
      return {winner:winnerIndex, score:highestScore};
    } else {
      return "No winner found.";
    }
}
function statscalculator(i) {
    var ob = listoflobbiesnthiertext[i] , arte = []; 
    for (let index = 0; index < (ob.wpm).length; index++) {
        const wpmArray = (ob.wpm)[index];
        const accuracyArray = (ob.accuracy)[index];
        modewpm = calculateMostFrequentValue(wpmArray,(calculateStandardDeviation(wpmArray))/Math.sqrt(wpmArray.length))
        modeacc = calculateMostFrequentValue(accuracyArray,(calculateStandardDeviation(accuracyArray))/Math.sqrt(wpmArray.length))
        
        let peakAccuracy = 0;
        let peakWPM = 0;
      
        for (let i = 0; i < accuracyArray.length; i++) {
          if (accuracyArray[i] > peakAccuracy) {
            peakAccuracy = accuracyArray[i];
          }
        }
      
        for (let i = 0; i < wpmArray.length; i++) {
          if (wpmArray[i] > peakWPM) {
            peakWPM = wpmArray[i];
          }
        }  
        arte.push({peakAccuracy:peakAccuracy , peakWPM:peakWPM ,modewpm:modewpm , modeacc:modeacc}) ; 
    }
    return arte ; 

    
}
function calculateMostFrequentValue(array, tolerance) {
    // Initialize an empty object to store the frequencies of each value
    const frequencies = [];
  
    // Loop through the array
    for (let i = 0; i < array.length; i++) {
      const currentValue = array[i];
  
      // Check if there is a value within the tolerance range in the frequencies object
      let foundValue = false;
      for (const key in frequencies) {
        if (Math.abs(currentValue - key) <= tolerance) {
          frequencies[key]++;
          foundValue = true;
          break;
        }
      }
  
      // If no similar value is found within the tolerance range, add a new frequency
      if (!foundValue) {
        frequencies[currentValue] = 1;
      }
    }
  
    // Find the most frequent value
    let maxFrequency = 0;
    let mostFrequentValue;
  
    for (const key in frequencies) {
      if (frequencies[key] > maxFrequency) {
        maxFrequency = frequencies[key];
        mostFrequentValue = key;
      }
    }
  
    return mostFrequentValue;
}
function calculateStandardDeviation(array) {
    // Calculate the mean (average) of the array
    const mean = array.reduce((sum, value) => sum + value, 0) / array.length;
  
    // Calculate the sum of squared differences from the mean
    const squaredDifferencesSum = array.reduce((sum, value) => {
      const difference = value - mean;
      return sum + (difference * difference);
    }, 0);
  
    // Calculate the variance by dividing the sum of squared differences by the number of elements
    const variance = squaredDifferencesSum / array.length;
  
    // Calculate the standard deviation by taking the square root of the variance
    const standardDeviation = Math.sqrt(variance);
  
    return standardDeviation;
}
async function  sendwpmaccu(randssid,fswa,connection) 
{
    //send wpm and acc of all 
    p = listoflobbiesnthiertext[fswa] ; 
    wpmacctobesent = []    
   try {
    for (let index = 0; index < (p.ssids).length; index++) {
        // if (p.ssids[index]==randssid) {
            try {
                x = ((p.wpm)[index]).slice(-1);
                y = ((p.accuracy)[index]).slice(-1);; 
            } catch (error) {
                x = 0  ; 
                y = 0  ;
            }
        wpmacctobesent.push({wpm:x,accuracy:y})
        // }        
    }
    il = JSON.stringify({wpmacc: wpmacctobesent})
   } catch (error) {
    return  ;
   }
   
    sendmsg({ info:`wpmupdate---${il}`}, "toall", connection)
    
}
//adder works fin 
async function adderforwpm(connection,newssid,calculatedwpm,calculatedaccuracy)
{
    //for adding wpms every second 
    var  k ;
    //finding lbycode
    for (const iterator of listofconnections) {
        if (connection==iterator.connect) {
           k =  iterator.lobbycodes
           break ; 
        }
    }
for (const iterator of listoflobbiesnthiertext) {
    if (k==iterator.lobbycode) {
        for (const r of iterator.ssids) {
            if (newssid==r) {
                l = (iterator.ssids).indexOf(r)
                if(!Array.isArray(iterator.wpm[l])) 
                {
                    (iterator.wpm[l]) = [] ; 
                    (iterator.accuracy[l]) = [] ; 
                }
                    iterator.wpm[l].push(calculatedwpm)                                                            
                    iterator.accuracy[l].push(calculatedaccuracy)                                                            
                break ; 
            }
        }
        break;
    }
        
    
}
}
async function wpmaccupdater(newssid,connection,typedstuff){
    if (!typedstuff) {
        passtypedstuff = " "
    }
    else{passtypedstuff=typedstuff}
    calculatedwpm = calculatorforwpm(newssid,passtypedstuff)
    calculatedaccuracy = calculatorforacc(newssid,passtypedstuff)
    if (calculatedaccuracy==undefined || calculatedwpm==undefined) {
        return false ;
    }
    adderforwpm(connection,newssid,calculatedwpm,calculatedaccuracy)
    return true ; 
}
function calculatorforwpm(newssid,typedstuff) {
    var  templcd,starttimee ; 
    //finding lobbycode frm loc
    for (const iterator of listofconnections) {
        if (iterator.ssid==newssid) {
            templcd = iterator.lobbycodes
            break;
        }
    }
    //finding starttime from lolntt
    for (const iterator of listoflobbiesnthiertext) {
        if (templcd==iterator.lobbycode) {
            starttimee = Number(iterator.starttime)
            break;
        }
    }
    if (typedstuff==" ") {
        return 0 ;
    }
    words = typedstuff.split(" ")
    num_words = words.length
    elapsed_time = Number((new Date).getTime()) - starttimee
    elapsed_time = elapsed_time/1000
    minutes = elapsed_time / 60
    wpm = num_words / minutes
    return wpm
}
function calculatorforacc(newssid,typedstuff)
{
    var lct,text ; 
    
    for (const iterator of listofconnections) {
        if (newssid==iterator.ssid) {
           lct =  iterator.lobbycodes
           break ; 
        }
    }
    
    for (const iterator of listoflobbiesnthiertext) {
        if (lct==iterator.lobbycode) {
            text = iterator.content
            break;
        }
    }
    let correctCount = 0;
    var minLength ; 
    try {
         minLength = Math.min(text.length, typedstuff.length);
    } catch (e) {
       return undefined ; 
    }
    
   
    for (let i = 0; i < minLength; i++) {
      if (text[i] === typedstuff[i]) {
        correctCount++;
      }
    }
    if (typedstuff==" ") {
        return 0 ;
    }
    const accuracy = (correctCount / typedstuff.length) * 100;
    return accuracy.toFixed(2); // Limit accuracy to 2 decimal places
}
//takes 38m36s - 40m58s to make db 
function sendmsg(info, flag, wsh,ssid) {
    try {
        var listobjholder;
    if(ssid)
    {
        for (let x of listofconnections) {
            if (ssid == x.ssid) {
                listobjholder = x;
                break;
            }
        }
    }
    else{
        for (let x of listofconnections) {
            if (wsh == x.connect) {
                listobjholder = x;
                break;
            }
        }
    }

    if (flag == "toall" || flag == null) {
        for (let y of listofconnections) {
            if (listobjholder.lobbycodes === y.lobbycodes) {
                y.connect.socket.send(JSON.stringify(info))
            }
        }
    }
    else if (flag == "nottoself") {
        for (let y of listofconnections) {
            if (
                listobjholder.lobbycodes === y.lobbycodes && y.connect != listobjholder.connect
            ) {
                y.connect.socket.send(JSON.stringify(info))
            }
        }
    }
    //asas
    else if (flag == "toself") {
        wsh.socket.send(JSON.stringify(info))
    }
    } catch (error) {
        fastify.log.error;("%%%%%%%%%%%") ; 
        return  ; 
    }
    
}

function calculatewinner(peakWPM, peakAccuracy, avgAccuracy, avgWPM, textLength,time,time1) {
    const peakWPMWeight = 0.1;
const peakAccuracyWeight = 0.3;
const avgAccuracyWeight = 0.228462;
const timeweight  = 0.12
var avgWPMWeight = 0.357693;
const textLengthWeight =0.069231;
 avgWPMWeight += 1-peakAccuracyWeight - peakWPMWeight - avgAccuracyWeight - textLengthWeight
    const weightedPeakWPM = peakWPM * peakWPMWeight;
    const weightedPeakAccuracy = peakAccuracy * peakAccuracyWeight;
  
    // Adjust the weights for avgAccuracy and avgWPM to achieve the desired ratio
    const weightedAvgAccuracy = avgAccuracy * (avgAccuracyWeight * 0.35);
    const weightedAvgWPM = avgWPM * (avgWPMWeight * 0.65);
    var wieghtedtime
    if (time) {
         wieghtedtime  = timeweight * ((time - time1 )/time) * 100
    }
    else
    {
        wieghtedtime = 0 ;
    }
    
    const weightedTextLength = textLength * textLengthWeight;
  
    const meanScore = weightedPeakWPM + weightedPeakAccuracy + weightedAvgAccuracy + wieghtedtime +weightedAvgWPM + weightedTextLength;
    return meanScore
}  

function timerrr() {
    const currentTimeInMs = new Date().getTime();
    return currentTimeInMs ; 
}

module.exports = routes;




















































































/*   ██╗██╗   ██╗███╗   ██╗██╗  ██╗    ██████╗ ███████╗██╗   ██╗ ██████╗ ███╗   ██╗██████╗     ████████╗██╗  ██╗██╗███████╗    ██████╗  ██████╗ ██╗███╗   ██╗████████╗    
     ██║██║   ██║████╗  ██║██║ ██╔╝    ██╔══██╗██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔══██╗    ╚══██╔══╝██║  ██║██║██╔════╝    ██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝    
     ██║██║   ██║██╔██╗ ██║█████╔╝     ██████╔╝█████╗   ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ██║       ██║   ███████║██║███████╗    ██████╔╝██║   ██║██║██╔██╗ ██║   ██║       
██   ██║██║   ██║██║╚██╗██║██╔═██╗     ██╔══██╗██╔══╝    ╚██╔╝  ██║   ██║██║╚██╗██║██║  ██║       ██║   ██╔══██║██║╚════██║    ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║       
╚█████╔╝╚██████╔╝██║ ╚████║██║  ██╗    ██████╔╝███████╗   ██║   ╚██████╔╝██║ ╚████║██████╔╝       ██║   ██║  ██║██║███████║    ██║     ╚██████╔╝██║██║ ╚████║   ██║       
 ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═════╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝       
                                                                                                                                                                           */


 // fastify.get("/pol",(req,res)=>{
    //     res.setCookie('lobbycode', "hello");
    //         res.setCookie('wscode', 12333);
    //     res.redirect("/hello")
    // })

 // async function unusedroutes(fastify,opts,done)
// {
//     fastify.get("/test1", (req, res) => {
//         try {
//             fastify.log.info("ok it works fine \n")
//             res.sendFile("static.html")
//         }
//         catch (err) {
//             fastify.log.info(err)
//         }
//     })
//     fastify.get("/three", (req, res) => {
//         res.sendFile("as.html")
//     })
//     fastify.get("/r", async (req, res) => {
//         const result = await app.sqlite.all(`SELECT * FROM textsnormal WHERE id = (SELECT MAX(id) FROM textsnormal);`)
//         const result2 = await app.sqlite.all(`SELECT * FROM textsabnormal WHERE id = (SELECT MAX(id) FROM textsabnormal)-1;`)
//         return {
//             data: result,
//             data2: result2
//         };
//     })
//     fastify.get("/xhr", (res, req) => {
//     })
//     // key = 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
//     fastify.post("/completions", (reqest, res) => {
//     })
//     fastify.get("/dbmake", async (req, res) => {
//         try {
//             app.sqlite.all(`CREATE TABLE texts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT);`)
//             res.send("ok done")
//         } catch (error) {
//             res.send("error is :" + error + "    " + typeof mydb)
//         }
//     })
//     fastify.get("/dbi", (req, res) => {
//         fastify.log.info("ok")
//         try {
//             app.sqlite.all("INSERT INTO texts (content) VALUES (?)", "hello my name is unnat ")
//             res.send("ok done")
//         } catch (error) {
//             res.send("okfail")
//         }
//     })
//     fastify.get("/dbr", async (req, res) => {
//         try {
//             fastify.log.info("@@@@@")
//             const result = await app.sqlite.all('SELECT * FROM texts');
//             fastify.log.info("@@@$$$$$@@")
//             return { data: result };
//         } catch (err) {
//             throw new Error('Unable to retrieve data from database');
//         }
//     })
//     fastify.get("/db", async (req, res) => {
//         fastify.log.info("loadingdb")
//         await loaddb(fastify);
//         fastify.log.info("finished loading db");
//     })
//     fastify.get('/items*', (req, reply) => {
//         var holder = url.parse(req.url, true)
//         fastify.log.info(" ####");
//         fastify.log.info(holder.search);
//         if (holder.search == "?name=unnat&ln=4") {
//             fastify.log.info("h4321");
//             reply.send({ test: 'failed but working' });
//         }
//         else if (holder.search == "?name=unnat&ln=5") {
//             // fastify.log.info(data);
//             reply.send({ test: 'success', datas: data })
//         }
//         else {
//             reply.send({ test: 'failed' });
//         }
//     }
//     )
//     fastify.get("/items/:id", (req, res) => {
//         var ide = Number((req.params.id)[1]), k;
//         fastify.log.info(ide);
//         if (ide == 4) {
//             k = data.innerdata
//             fastify.log.info("#123123");
//         }
//         res.send({ variable: k });
//     })
//     fastify.post("/items/:id", (req, res) => {
//         fastify.log.info("#########");
//         fastify.log.info(req.body);
//         var ide = Number((req.params.id)[1]), k;
//         fastify.log.info(ide);
//         if (ide == 4) { k = data.innerdata }
//         if (ide == 1) { k = data.sirname }
//         fastify.log.info("#########");
//         res.send({ variable: k, url: req.url });
//     })
//     fastify.delete("/items/delete/:id", (req, res) => {
//         {
//             fastify.log.info("#########");
//             var ide = Number((req.params.id)[1])
//             if (ide == 1) {
//                 delete data.sirname;
//                 res.code(200).send("item has been deleted");
//             }
//             else { res.code(201).send("failed to delete"); }
//         }
//     })
//     fastify.put("/items/put/:id", (req, res) => {
//         fastify.log.info("#########");
//         var ide = Number((req.params.id)[1])
//         if (ide == 2) {
//             var n = req.body.key
//             data.age = n;
//             res.code(200).send("item has been update");
//         }
//         else { res.code(201).send("failed to update"); }
//     }
//     )
//     done()
// }
// async function routes(fastify,opts,done) {
//     await fastify.get('/*', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//       connection.socket.on('message', message => {
//         // message.toString() === 'hi from client'
//         fastify;
//         connection.socket.send('hi from wildcard route')
//       })
//       done()
//     })}





 // // const functionKeys = Object.keys(req.raw).filter(key => typeof req.raw[key] === 'function');
            // // fastify.log.info(functionKeys) ;
            // fastify.log.info("FAKE!!!!!!!")
            // connection.socket.send('hi from server')
            // connection.socket.send(`wzzzonrnsvknnryrqkpsfihngvvcufba
            // uvqseozhzlwritdorywssnluaebuvgof
            // fjflsojfqulgptooqilvmzyewamcadkk
            // hutwocpznbaspevhfyrckydzhzwfmwgs
            // nwjmgsywpnfkigqbgvklmjaqsokcnkxi
            // `)
            // connection.socket.destroy() ;
            // return ; 
            // typo = false ; 
            // setTimeout(() => {

            // }, 5000);

            // sendmsg({info:"closecodewrong"},"toself",connection)


            // fastify.get('/js/app.js', async (request, reply) => {
                //     const js = `
                //       import React from 'react';
                //       import ReactDOM from 'react-dom';
                  
                //       const App = () => {
                //         return <h1>Hello, world!</h1>;
                //       };
                  
                //       ReactDOM.render(<App />, document.getElementById('root'));
                //     `;
                //     reply.type('application/javascript').send(js);
                //   });


                // fastify.get('/ok', async (request, reply) => {
                    //     const html = `
                    //       <!DOCTYPE html>
                    //       <html>
                    //         <head>
                    //           <meta charset="utf-8">
                    //           <title>Hello, world!</title>
                    //         </head>
                    //         <body>
                    //           <div id="root"></div>
                    //           <script type="text/javascript" src="/js/app.js"></script>
                    //         </body>
                    //       </html>
                    //     `;
                    //     reply.type('text/html').send(html);
                    //   });
                  
            


                     // fastify.get("/rea",(req,res)=>{
    //     res.sendFile("r.html");
    // })
    // fastify.get('/wss', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    //     connection.socket.on('message', (message) => {
    //         // message.toString() === 'hi from client'
    //         const decoder = new TextDecoder('utf-8');
    //         const text = decoder.decode(message);
    //         fastify.log.info(text)
    //         try {
    //             connection.socket.send('hi from server')
    //             fastify.log.info("message sent")
    //         }
    //         catch (err) {
    //             fastify.log.info(err)
    //         }
    //     })
    // })
    // fastify.get("/pol*",(req,res)=>{
    //     res.redirect("/ws/"+req.url.slice(4)) ; 
    // })
    // fastify.get("/two", (req, res) => {
    //     res.sendFile("a.html")
    // })
    // fastify.get("/rt",(req,res)=>{
    //     res.sendFile("pract.html");
    // })





     // for (const x of listofconnections) {
    //     if (wsh === x.connect) {
    //         lobbynoforwin = listofconnections.lobbycodes
    //         break;
    //     }
    // }
    // for (const y of timobj) {
    //     if (lobbynoforwin === y.lobbycodes) {
    //         setholder = y;
    //     }
    // }
    // if (setholder.p1time != null && setholder.p2time != null && setholder.p3time != null && setholder.p4time != null) {
    //     minval = Math.min(setholder.p1time, setholder.p2time, setholder.p3time, setholder.p4time);
    //     arr = [setholder.p1time, setholder.p2time, setholder.p3time, setholder.p4time];
    //     for (let i = 1; i < arr.length; i++) {
    //         if (arr[i] < minVal) {
    //             minVal = arr[i];
    //             minIndex = i;
    //         }
    //     }
    //     return (minIndex + "is the winner")
    // }
    // // Convert Set to Array
    // var myArray = Array.from(setholder);

    // // Add new fields to each object in the array
    // myArray.forEach(set => {
    //     set.forEach(obj => {
    //         const num = obj.message.player;
    //         if (num >= 1 && num <= 4) {
    //             obj[`p${num}time`] = message.x; // update p_num_time based on the num value of the object
    //         }
    //     });
    // });



    // // Convert Array back to Set
    // const updatedSet = new Set(myArray);

    // // Replace the original Set with the updated one
    // timobj.delete(setholder);
    // timobj.add(updatedSet);



    /*

 var timobj = {
                    delay:delay,
                    starttime:starttime,
                    lobbycodes:lobbycodes,
                    
                     
                      
                      const dnf = setTimeout(() => {
                        sendmsg({info:"stop"}, "toall", wsh=connection);
                      }, dnftimeinms+delay);
                      return { starttime, delay , lobbycodes, dnf }; */

// else if (text == "playerjoin") {
            //     if (playernumber <= 4) { sendmsg({ info: "playerinfo" }, "nottoself", wsh=connection) }
            //     else {  }
            // }

            // var db = fastify.sqlite3 ,typo ; 

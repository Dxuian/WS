import { LitElement, html, css, } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import Gamesleftpanel from "/public/gamesleftpanel.js";
import Resultpanel from "/public/result.js";
import { ifDefined, unsafeHTML, } from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import "https://code.jquery.com/jquery-3.5.1.min.js";

export default class Board extends Gamesleftpanel {
  createRenderRoot() {
    return this;
  }
  constructor() {
    super();
    this.ssid;
    this.content = `\t\t  //    See text here and type below    // \t\t 
    \n\t\t  //    may the best typist win!!     // \t\t`
    this.resultrecieved = false;
    this.winnerindex;
    this.maxscore;
    this.finishbtnlegal;
    this.finsihedbeforetime = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.finishbtnlegal = false;
    window.addEventListener("timerstarted", this.timerstartedevent.bind(this));
    window.addEventListener("timerstopevent", this.timerstoppedevent.bind(this));
    window.addEventListener("meinfo", this.meinfo.bind(this));
    window.addEventListener("playertype", this.playertype.bind(this));
    window.addEventListener("finalresultscompiled", this.finalresultscompiled.bind(this));
    window.addEventListener("hideresult", this.hideresult.bind(this));
    window.addEventListener("finishkrnacha", this.finished.bind(this));
    window.addEventListener("updatemeinfoagainplease", this.meinfo.bind(this));


  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("timerstarted", this.timerstartedevent.bind(this));
    window.removeEventListener("timerstopevent", this.timerstoppedevent.bind(this));
    window.removeEventListener("meinfo", this.meinfo.bind(this));
    window.removeEventListener("playertype", this.playertype.bind(this));
    window.removeEventListener("finalresultscompiled", this.finalresultscompiled.bind(this));
    window.removeEventListener("hideresult", this.hideresult.bind(this)); window.removeEventListener("finishkrnacha", this.finished.bind(this));
    window.removeEventListener("updatemeinfoagainplease", this.meinfo.bind(this));
    document.removeEventListener('keydown',
      (event) => {
        if (event.key === 'Escape') {
          console.log("SO YOURE DONE HUH!!!");
          document.getElementById("finisher").click();
        }
      }
    );
    document.getElementById(`playerwrit${this.ssid}`).removeEventListener('paste', (event) => { event.preventDefault(); });

  }

  timerstartedevent(event) {
    var { content, delay, dnfinfo } = event.detail;
    document.getElementById("boardtext").innerHTML = content;
    this.finishbtnlegal = true;
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { console.log("SO YOURE DONE HUH!!!"); document.getElementById("finisher").click(); } });
    this.evntlisternaddnewandable();
    if (!!document.getElementById("finisher")) {
      document.getElementById("finisher").removeAttribute("disabled");
    }
    this.content = content;
    this.requestUpdate();
    if (this.ssid) {
      document.getElementById(`playerwrit${this.ssid}`).addEventListener('paste', (event) => { console.log("NO CHEATING BRUUUUUUUUHHHHHH!!!!!!!!!"); event.preventDefault(); });
      document.getElementById("boardtext").addEventListener('copy', (event) => { console.log("NO CHEATING BRUUUUUUUUHHHHHH!!!!!!!!!"); event.preventDefault(); });
    }
    document.getElementById(`playerwrit${this.ssid}`).focus()
  }
  timerstoppedevent(event) {
    if (!this.finsihedbeforetime) {
      this.finishbtnlegal = false;
      document.getElementById(`playerwrit${this.ssid}`).removeEventListener("input", this.checker);
      document.getElementById(`playerwrit${this.ssid}`).setAttribute("contenteditable", "false");
      var finalvalidation = `${this.ssid}---${document.getElementById(`playerwrit${this.ssid}`).innerText.trim()}`;
      window.dispatchEvent(new CustomEvent("finalvalidation", { detail: finalvalidation }));
    }
  }
  evntlisternaddnewandable() {
    // Get all textareas whose ID begins with "playerwrit"
    const textareas = document.querySelectorAll("div[id^='playerwrit']");
    // Disable textareas and remove event listeners
    textareas.forEach((textarea) => {
      textarea.setAttribute("contenteditable", "false");
      textarea.removeEventListener("input", this.checker.bind(this));
    });
    document.getElementsByClassName(`grid grid-cols-${this.peopleinfo.length - 1} gap-2 `)[0].classList.add("md:relative", "md:bottom-16");
    document.getElementById("boardtext").scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById(`playerwrit${this.ssid}`).setAttribute("contenteditable", "true");
    document.getElementById(`playerwrit${this.ssid}`).addEventListener("input", this.checker.bind(this));

  }
  async finalresultscompiled(e) {
    var b = e.detail.statsofall;
    var a = e.detail.scores;
    for (const iterator of this.peopleinfo) {
      iterator.stats = b[this.peopleinfo.indexOf(iterator)];
      iterator.scores = a[this.peopleinfo.indexOf(iterator)];
    }

    this.resultrecieved = true;
    await this.requestUpdate();
    window.dispatchEvent(
      new CustomEvent("resultsarehere", { detail: { peopleinfo: this.peopleinfo, self: this.ssid }, }));
  }
  playertype(event) {
    var p = event.detail;
    var pssid = p.substr(0, 36);
    var text = p.substr(39);
    for (const iterator of this.peopleinfo) {
      if (pssid == iterator.ssid) {
        var k = this.peopleinfo.indexOf(iterator) + 1;
        iterator.text = text;
        document.getElementById(`playerwrit${pssid}`).innerText = text;
        this.internalchecker(text, document.getElementById(`playerwrit${pssid}`));
        document.getElementById(`playerwrit${pssid}`).scrollTop = document.getElementById(`playerwrit${pssid}`).scrollHeight;

        break;
      }
    }
  }
  hideresult() {
    this.resultrecieved = false;
    requestUpdate();
  }
  finished() {
    document
      .getElementById(`playerwrit${this.ssid}`)
      .removeEventListener("input", this.checker);

    document
      .getElementById(`playerwrit${this.ssid}`).innerHTML = "WAITING FOR OTHER PLAYERS TO FINISH"
    document
      .getElementById(`playerwrit${this.ssid}`)
      .setAttribute("contenteditable", "false");
    document.getElementById("finisher").disabled = true;
    var finalvalidation = `${this.ssid}---${document
      .getElementById(`playerwrit${this.ssid}`)
      .innerText.trim()}`;
    this.finsihedbeforetime = true;
    window.dispatchEvent(
      new CustomEvent("finished", { detail: finalvalidation })
    );
    this.finishbtnlegal = false;
  }
  checker(e) {
    var enteredText = e.target.innerText.trim();
    for (const iterator of this.peopleinfo) {
      if (this.ssid == iterator.ssid) {
        iterator.text = enteredText;
      }
    }
    window.dispatchEvent(
      new CustomEvent("externalVerificationanddisplay", { detail: enteredText })
    );
    this.internalchecker(enteredText, e.target);
  }
  internalchecker(e, etarget) {

    if (etarget == document.getElementById(`playerwrit${this.ssid}`)) {
      var sethere = getCaretCharOffset(etarget);
    }
    const inputWords = e;
    const referenceWords = this.content;
    var incorrectIndices = "";
    var k = Math.min(referenceWords.length, inputWords.length);
    for (let i = 0; i < k; i++) {
      const inputWord = inputWords[i];
      const referenceWord = referenceWords[i];
      var p = Math.max(inputWord.length, referenceWord.length);
      for (let j = 0; j < p; j++) {
        const inputChar = inputWord[j];
        const referenceChar = referenceWord[j];
        if (referenceChar == undefined) {

          incorrectIndices += `<span class="text-red-700">${inputChar}</span>`
        }
        if (inputChar == undefined) {
          continue;
        }
        if (inputChar !== referenceChar) {

          incorrectIndices += `<span class="text-red-700">${inputChar}</span>`
        }
        else {
          incorrectIndices += `${inputChar}`
        }
      }

    }
    incorrectIndices = incorrectIndices.replace(/Â/g, "");
    etarget.innerHTML = incorrectIndices;
    var elm = etarget;
    if (e[sethere - 1] == undefined) {
      etarget.innerHTML += `&nbsp`;
      Cursor.setCurrentCursorPosition(Number(sethere), elm);
      return;
    }
    Cursor.setCurrentCursorPosition(Number(sethere), elm);;


  }

  async meinfo(event) {
    this.ssid = event.detail;

    if (event.type != "updatemeinfoagainplease") {
      window.dispatchEvent(new CustomEvent("ssidfromboard", { detail: this.ssid })
      );
    }
    for (const iterator of this.peopleinfo) {
      if (iterator.ssid == this.ssid) {
        var k = this.peopleinfo.indexOf(iterator) + 1;
        this.resultfrommeinfo = k;
        break;
      }
    }
    if (event.type == "updatemeinfoagainplease") {
      await this.requestUpdate();
      for (const iterator of this.peopleinfo) {
        if (!iterator.text) {
          iterator.text = "";
        }
        document.getElementById(`playerwrit${iterator.ssid}`).innerText =
          iterator.text;
      }
      this.evntlisternaddnewandable();

      return;
    }
  }
  render() {
    return html`
      <div class="block">

      
        ${ifDefined(
      this.resultrecieved
        ? html`<resultboard-non></resultboard-non>` : html``
    )}

            ${ifDefined(
      this.finishbtnlegal
        ?
        html`<div class="flex  relative left-[60%] bottom-[23%] md:!top-[18%] md:!left-48 md:justify-end	">
                 <button id="finisher" onclick="finishedER()" class="middle float-end  center !text-red-700 rounded-lg
                 bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase hover:scale-110  shadow-md shadow-pink-500/50 transition-all hover:shadow-lg 
                 hover:shadow-pink-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none
                  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <div>Finish</div><sub class="relative "><code>Esc</code></sub></button>
        </div>`
        :
        html``
    )}
          
           <div class="grid grid-rows-3 mt-0 m-2 md:!m-0 ${ifDefined(this.finishbtnlegal ? `relative bottom-12` : ``)}  grid-flow-col  md:!gap-1  gap-y-1 max-w-4xl justify-items-stretch ml-0">
          
           <div class="grid">
        <div id="boardtext" class = "max-w-4xl max-h-32 md:max-h-full overflow-scroll md:!overflow-auto min-w-4xl text-2xl bg-purple-900 scroll-mt-1	 font-extrabold text-left text-purple-300 rounded p-4 ">${this.content}</div>
        </div>

        <div>
        ${this.peopleinfo.map((x) => {
      //   const ar = [""  , "bg-secondary"      , "bg-success"     , "bg-error"       , "bg-warning"]
      const ar2 = [
        "bg-violet-700	",
        "bg-green-700	",
        "bg-red-700",
        "bg-amber-700",
      ];
      const ar3 = [
        "text-violet-300	",
        "text-white	",
        "text-red-300",
        "text-amber-300",
      ];
      var colornumber = Math.floor(Math.random() * 3), bgcolor2 = ar2[colornumber], txcol = ar3[colornumber];
      var colorPair = generateRandomColorPair(), baseColor = colorPair[0], contrastingColor = colorPair[1];
      if (x.ssid == this.ssid) {
        return html`
              
              <div  contenteditable="false" style="background-color:${baseColor} !important;color:${contrastingColor} !important"   id="playerwrit${x.ssid}" 
              class="mt-2 md:mt-4 !overflow-x-hidden inline-block text-xl p-4
              font-extrabold justify-items-stretch 
             h-full  resize-none w-[90vw] max-w-sm md:max-w-4xl max-h-32 md:max-h-48  overflow-scroll md:!overflow-auto md:min-w-4xl
                   rounded  text-left   transition-colors
                    duration-1000"  ></div>
                `
      }


    })}
        </div>
        
        
        
        <div class="grid grid-cols-${this.peopleinfo.length - 1} gap-2 max-h-32 md:max-h-48 static">
        ${this.peopleinfo.map((x) => {
      if (x.ssid != this.ssid) {
        const ar2 = [
          "bg-violet-700	",
          "bg-green-700	",
          "bg-red-700",
          "bg-amber-700",
        ];
        const ar3 = [
          "text-violet-300	",
          "text-white	",
          "text-red-300",
          "text-amber-300",
        ];
        var colornumber = Math.floor(Math.random() * 3);
        var bgcolor2 = ar2[colornumber];
        var txcol = ar3[colornumber];

        var colorPair = generateRandomColorPair();
        var baseColor = colorPair[0];
        var contrastingColor = colorPair[1];
        return html`
            <div  contenteditable="false" style="background-color:${baseColor} !important;color:${contrastingColor} !important"   id="playerwrit${x.ssid}" 
            class="  mt-4 break-words 
             text-xl p-4      font-extrabold
             w-100 h-3/4 resize-none bg-red-500 !overflow-x-hidden max-w-sm md:max-w-4xl max-h-48 md:max-h-full overflow-auto  md:min-w-4xl
              rounded"  ></div>`
      }
    })}
        </div>

        
</div>
        
        
      </div>
     
    `;
  }
}
customElements.define("board-non", Board);




class Cursor {
  static getCurrentCursorPosition(parentElement) {
    var selection = window.getSelection(),
      charCount = -1,
      node;

    if (selection.focusNode) {
      if (Cursor._isChildOf(selection.focusNode, parentElement)) {
        node = selection.focusNode;
        charCount = selection.focusOffset;

        while (node) {
          if (node === parentElement) {
            break;
          }

          if (node.previousSibling) {
            node = node.previousSibling;
            charCount += node.textContent.length;
          } else {
            node = node.parentNode;
            if (node === null) {
              break;
            }
          }
        }
      }
    }

    return charCount;
  }

  static setCurrentCursorPosition(chars, element) {
    if (chars >= 0) {
      var selection = window.getSelection();

      let range = Cursor._createRange(element, { count: chars });

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  static _createRange(node, chars, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = Cursor._createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }

    return range;
  }

  static _isChildOf(node, parentElement) {
    while (node !== null) {
      if (node === parentElement) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }
}






function cursor_position(sel) {
  var sel = document.getSelection();
  sel.modify("extend", "backward", "paragraphboundary");
  var pos = sel.toString().length;
  if (sel.anchorNode != undefined) sel.collapseToEnd();

  return pos;
}




function getCaretCharOffset(element) {
  var caretOffset = 0;

  if (window.getSelection) {
    var range = window.getSelection().getRangeAt(0);
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }

  else if (document.selection && document.selection.type != "Control") {
    var textRange = document.selection.createRange();
    var preCaretTextRange = document.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint("EndToEnd", textRange);
    caretOffset = preCaretTextRange.text.length;
  }

  return caretOffset;
}


function setEndOfContenteditable(contentEditableElement) {
  var range, selection;
  if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
  {
    range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection();//get the selection object (allows you to change selection)
    selection.removeAllRanges();//remove any selections already made
    selection.addRange(range);//make the range you have just created the visible selection
  }
  else if (document.selection)//IE 8 and lower
  {
    range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    range.select();//Select the range (make it the visible selection
  }
}


function generateRandomColorPair() {
  // Generate random RGB values for the base color
  var baseR = Math.floor(Math.random() * 256);
  var baseG = Math.floor(Math.random() * 256);
  var baseB = Math.floor(Math.random() * 256);

  // Adjust the brightness of the base color to create a contrasting color
  var contrastingR = baseR > 127 ? baseR - 128 : baseR + 128;
  var contrastingG = baseG > 127 ? baseG - 128 : baseG + 128;
  var contrastingB = baseB > 127 ? baseB - 128 : baseB + 128;

  // Convert the RGB values to hex format
  var baseColor = "#" + componentToHex(baseR) + componentToHex(baseG) + componentToHex(baseB);
  var contrastingColor = "#" + componentToHex(contrastingR) + componentToHex(contrastingG) + componentToHex(contrastingB);
  return [baseColor, contrastingColor];
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}





























// export default class Board extends Gamesleftpanel {
//     createRenderRoot() {
//         return this;
//     }
//     constructor() {
//         super()
//         this.ssid ;
//         this.resultfrommeinfo ;
//         this.content ;
//         this.resultrecieved =false ;
//         this.winnerindex ;
//         this.maxscore ;
//         this.finsihedbeforetime = false  ;
//         this.playerchagetextself ;
//     }
//     connectedCallback() {
//         super.connectedCallback();
//         // Add event listener when component is connected to the DOM
//         window.addEventListener('timerstarted', this.timerstartedevent.bind(this));
//         window.addEventListener('timerstopevent', this.timerstoppedevent.bind(this));
//         window.addEventListener('meinfo', this.meinfo.bind(this));
//         window.addEventListener('playertype', this.playertype.bind(this));
//         window.addEventListener('finalresultscompiled', this.finalresultscompiled.bind(this));
//         window.addEventListener('hideresult', this.hideresult.bind(this));
//         window.addEventListener('finishkrnacha', this.finished.bind(this));
//         window.addEventListener('updatemeinfoagainplease', this.meinfo.bind(this));
//         //change from button to auto
//         //change from button to auto
//         //change from button to auto
//         //change from button to auto
//         //change from button to auto
//         window.addEventListener('keydown', function(event) {if (event.key === 'Enter') {if (document.activeElement.id === 'finisher') {document.getElementById('finisher').click();}}});
//     }
//     disconnectedCallback() {
//         super.disconnectedCallback();
//         // Remove event listener when component is removed from the DOM
//         window.removeEventListener('timerstarted', this.timerstartedevent.bind(this));
//         window.removeEventListener('timerstopevent', this.timerstoppedevent.bind(this));
//         window.removeEventListener('meinfo', this.meinfo.bind(this));
//         window.removeEventListener('playertype', this.playertype.bind(this));
//         window.removeEventListener('finalresultscompiled', this.finalresultscompiled.bind(this));
//         window.removeEventListener('hideresult', this.hideresult.bind(this));
//         window.removeEventListener('finishkrnacha', this.finished.bind(this));
//         window.removeEventListener('updatemeinfoagainplease', this.meinfo.bind(this));
//         window.removeEventListener('keydown', function(event) {if (event.key === 'Enter') {if (document.activeElement.id === 'finisher') {document.getElementById('finisher').click();}}});
//     }

//     internalchecker(e) {
//       var correctText = this.content;
//       if (e.startsWith(correctText)) {
//         console.log("Correct! The user is typing the correct text.");
//         // Perform any actions or logic for a correct input
//       } else {
//         console.log("Incorrect! The user is typing the wrong text.");
//         // Perform any actions or logic for an incorrect input
//       }
//     }
//     hideresult()
//     {
//         this.resultrecieved = false ;
//         requestUpdate() ;
//     }
//     finalresultscompiled(e)
//     {
//         b = e.detail.statsofall ;
//         a  = e.detail.scores;
//         for (const iterator of this.peopleinfo) {
//             iterator.stats = b[(this.peopleinfo).indexOf(iterator)]
//             iterator.scores = a[(this.peopleinfo).indexOf(iterator)]
//         }
//         let maxScore = -Infinity;
//         let winnerIndex = -1;

//         for (let i = 0; i < this.peopleinfo.length; i++) {
//           if (this.peopleinfo.scores[i] > maxScore) {
//             maxScore = this.peopleinfo.scores[i];
//             winnerIndex = i;
//           }
//         }

//         if (winnerIndex !== -1) {
//           this.winnerindex = winnerIndex+1 ;
//           this.maxscore = maxScore ;
//         } else {
//           return "No winner found.";
//         }
//         this.resultrecieved=true;
//         requestUpdate()

//     }
//     playertype(event)
//     {
//        var  p = event.detail ;
//         var pssid = p.substr(0,36) ;
//         var text = p.substr(39) ;
//         for (const iterator of this.peopleinfo) {
//             if (pssid==iterator.ssid) {
//                 var k =  (this.peopleinfo).indexOf(iterator) + 1
//                 iterator.text = text ;
//                 document.getElementById(`playerwrit${k}`).value = text ;
//                 break ;
//             }
//         }

//     }
//     timerstartedevent(event)
//     {
//        var  {content, delay, dnfinfo} = event.detail ;
//         document.getElementById("boardtext").innerHTML = content ;
//         this.evntlisternaddnewandable() ;
//          this.content = content ;
//     }
//     checker(e) {
//         var enteredText = e.target.value.trim();
//         window.dispatchEvent(new CustomEvent('externalVerificationanddisplay', { detail: enteredText }));
//         this.internalchecker(enteredText);
//     }
//     evntlisternaddnewandable()
//     {

//       document.getElementById(`playerwrit${this.resultfrommeinfo}`).addEventListener("input",this.checker.bind(this))
//       document.getElementById(`playerwrit${this.resultfrommeinfo}`).removeAttribute("disabled") ;
//     }
//     finished()
//       {
//           document.getElementById(`playerwrit${this.resultfrommeinfo}`).removeEventListener("input",this.checker)
//           document.getElementById(`playerwrit${this.resultfrommeinfo}`).disabled  = true ;
//           var finalvalidation = `${this.ssid}---${document.getElementById(`playerwrit${this.resultfrommeinfo}`).value.trim()}`
//           this.finsihedbeforetime = true ;
//           window.dispatchEvent(new CustomEvent('finished', { detail: finalvalidation }));
//     }
//     timerstoppedevent(event)
//     {
//         if (!this.finsihedbeforetime) {
//             document.getElementById(`playerwrit${this.resultfrommeinfo}`).removeEventListener("input",this.checker)
//         document.getElementById(`playerwrit${this.resultfrommeinfo}`).disabled  = true ;
//         var finalvalidation = `${this.ssid}---${document.getElementById(`playerwrit${this.resultfrommeinfo}`).value.trim()}`
//         window.dispatchEvent(new CustomEvent('finalvalidation', { detail: finalvalidation }));
//         }
//     }
//    async meinfo(event)
//     {
//       this.playerchagetextself ;
//         this.ssid = event.detail  ;
//         if (event.type=="updatemeinfoagainplease") {
//           this.playerchagetextself = document.getElementById(`playerwrit${this.resultfrommeinfo}`).value
//           document.getElementById(`playerwrit${this.resultfrommeinfo}`).removeEventListener("input",this.checker.bind(this))
//         document.getElementById(`playerwrit${this.resultfrommeinfo}`).setAttribute("disabled","") ;
//         }
//         if(event.type!="updatemeinfoagainplease"){window.dispatchEvent(new CustomEvent("ssidfromboard" , {detail:this.ssid}));}
//         for (const iterator of this.peopleinfo) {
//             if (iterator.ssid==this.ssid) {
//                 var k =  (this.peopleinfo).indexOf(iterator) + 1
//                 this.resultfrommeinfo = k ;
//                 break ;
//             }
//         }
//         if (event.type=="updatemeinfoagainplease") {
//                     await this.requestUpdate() ;
//                     this.evntlisternaddnewandable() ;
//                     document.getElementById(`playerwrit${this.resultfrommeinfo}`).value = this.playerchagetextself ;
//                     for (const iterator of this.peopleinfo) {
//                       if (this.peopleinfo.indexOf(iterator)+1 !=this.resultfrommeinfo) {
//                         document.getElementById(`playerwrit${this.peopleinfo.indexOf(iterator)}`).value =  iterator.text ;
//                       }
//                     }
//                     return ;
//         }
//     }
//     render() {
//         return html`
//     <div>
//     ${ifDefined(this.resultrecieved ? html`<resultboard-non></resultboard-non>` :
//        html``)}
//         <div id="boardtext"></div>

//         <button id="finisher"   onclick="finishedER()">finish</button>
//         ${this.peopleinfo.map((x) => {

//           //   const ar = [""  , "bg-secondary"      , "bg-success"     , "bg-error"       , "bg-warning"]
//             const ar2 = [ "bg-violet-700	" , "bg-green-700	",  "bg-red-700"	, "bg-amber-700"]
//             const ar3 = ["text-violet-300	" , "text-white	",  "text-red-300"	, "text-amber-300"]
//           var colornumber = Math.floor(Math.random() * 3)
//           var bgcolor2   = ar2[colornumber];
//           var txcol   = ar3[colornumber];

//   var colorPair = generateRandomColorPair();
//   var baseColor = colorPair[0];
//   var contrastingColor = colorPair[1];

//             return html`
//             <div>
//       <textarea  disabled style="background-color:${baseColor} !important;color:${contrastingColor} !important"   id="playerwrit${(Array(this.peopleinfo))[0].indexOf(Array(x)[0]) + 1}"  class="  w-25 resize-none text-left   textarea disabled:${bgcolor2} placeholder:${txcol} text-resize-none transition-colors duration-1000	" placeholder="Type here please" ></textarea>

//       </textarea>
//      </div>
//     <div> `
//         }
//         )}
//     <div>
//     `;
//     }

// }
// customElements.define('board-non', Board);

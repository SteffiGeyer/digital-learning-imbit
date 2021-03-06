var richtigArray = [];
/**
 * eine Multiple Choice Frage anlegen
 * 
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antworten als Array aus Strings
 * @param richtig
 *            Lösung als Array aus Strings. Für jede Antwortmöglichkeit ein
 *            Eintrag 0 oder 1 wobei 1 für richtig und 0 für falsch steht
 * @returns ein <div> tag mit der Frage
 */
function createMC(frage, antworten, richtig) {

	richtigArray.push(richtig);

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);

	questiondiv.setAttribute("data-type", "mc");

	var i;
	for (i = 0; i < antworten.length; i++) {
		var questionlabel = document.createElement("label");
		questionlabel.className = "container_check";
		var questionlabeltext = document.createTextNode(antworten[i]);
		questionlabel.appendChild(questionlabeltext);
		var questionlabelinput = document.createElement("input");
		questionlabelinput.type = "checkbox";
		questionlabelinput.id = "question" + n + "_answer" + (i + 1);
		questionlabel.appendChild(questionlabelinput);
		var questionlabelspan = document.createElement("span");
		questionlabelspan.className = "checkmark_check";
		questionlabel.appendChild(questionlabelspan);
		questiondiv.appendChild(questionlabel);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * eine Single Choice Frage anglegen
 * 
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antworten als Array aus Strings
 * @param richtig
 *            Lösung als Array aus Strings. Für jede Antwortmöglichkeit ein
 *            Eintrag 0 oder 1 wobei 1 für richtig und 0 für falsch steht
 * @returns ein <div> tag mit der Frage
 */
function createSC(frage, antworten, richtig) {

	richtigArray.push(richtig);

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);
	questiondiv.setAttribute("data-type", "sc");

	var i;
	for (i = 0; i < antworten.length; i++) {
		var questionlabel = document.createElement("label");
		questionlabel.className = "container";
		var questionlabeltext = document.createTextNode(antworten[i]);
		questionlabel.appendChild(questionlabeltext);
		var questionlabelinput = document.createElement("input");
		questionlabelinput.type = "radio";
		questionlabelinput.name = "radio";
		questionlabelinput.id = "question" + n + "_answer" + (i + 1);
		questionlabel.appendChild(questionlabelinput);
		var questionlabelspan = document.createElement("span");
		questionlabelspan.className = "checkmark";
		questionlabel.appendChild(questionlabelspan);
		questiondiv.appendChild(questionlabel);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Eine Drag&Drop Frage anlegen
 * 
 * @param frage
 *            Frage als String
 * @param antworten
 *            Antwortmöglichkeiten als Array aus Strings
 * @param container
 *            Container in die gedropt werden soll als Array aus Strings
 * @param richtig
 *            Lösung als Array. Der Arrayindex entspricht der Antwortnummer und
 *            der eingetragene Wert dem erwarteten Feld
 * @returns ein <div> tag mit der Frage
 */
function createDD(frage, antworten, container, richtig) {

	richtigArray.push(richtig);

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);
	questiondiv.setAttribute("data-type", "dd");

	var answersDiv = document.createElement("div");
	answersDiv.id = "dd" + n + "_answers";
	questiondiv.appendChild(answersDiv);

	var i;
	for (i = 0; i < antworten.length; i++) {
		var p = document.createElement("p");
		p.id = "question" + n + "_answer" + i;
		p.className = "drag";
		p.draggable = "true";
		p.setAttribute("ondragstart", "drag(event)");
		var pText = document.createTextNode(antworten[i]);
		p.appendChild(pText);
		answersDiv.appendChild(p);
	}

	for (i = 0; i < container.length; i++) {
		var box = document.createElement("div");
		box.id = "question" + n + "_box" + i;
		box.className = "drop";
		box.addEventListener('drop', function() {
			drop(event)
		});
		box.addEventListener('dragover', function() {
			allowDrop(event)
		});
		var p = document.createElement("p");
		p.className = "box_text";
		var pText = document.createTextNode(container[i]);
		p.appendChild(pText);
		box.appendChild(p);
		questiondiv.appendChild(box);
	}

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Eine Lückentext Frage anlegen
 * 
 * @param frage
 *            Frage als String
 * @param text
 *            Text mit Lücken als Array aus Strings wobei ein leerer String ""
 *            eine Lücke darstellt
 * @param antworten
 *            Antwortmöglichkeiten als Array aus Strings
 * @param richtig
 *            Lösung als Array. Der Arrayindex entspricht der Antwortnummer und
 *            der eingetragene Wert dem erwarteten Feld
 * @returns ein <div> tag mit der Frage
 */
function createTQ(frage, text, antworten, richtig) {

	richtigArray.push(richtig);

	var n = findQuestionNumber();

	var questiondiv = createHeader(frage, n);
	questiondiv.setAttribute("data-type", "tq");

	var TextP = document.createElement("p");
	TextP.id = "question" + n + "text";

	var i;
	var j = 1;
	for (i = 0; i < text.length; i++) {
		if (text[i] !== "") {
			var TQText = document.createTextNode(text[i]);
			TextP.appendChild(TQText);
		} else {
			var TQinput = document.createElement("input");
			TQinput.className = "text_input";
			TQinput.type = "text";
			TQinput.name = "question" + n + "_blanc" + j;
			TQinput.id = "question" + n + "_blanc" + j;
			j++;
			TextP.appendChild(TQinput)
		}
	}
	questiondiv.appendChild(TextP);

	var answersdiv = document.createElement("div");

	for (i = 0; i < antworten.length; i++) {

		var answerP = document.createElement("p");
		answerP.className = "text_to_input";
		answerP.id = "question" + n + "_answer" + i;
		var answerText = document.createTextNode(antworten[i]);
		answerP.appendChild(answerText);

		answersdiv.appendChild(answerP);
	}
	questiondiv.appendChild(answersdiv);

	var contentdiv = document.getElementById("content");
	contentdiv.append(questiondiv);

}
/**
 * Erstellt den Header einer Frage und den div für die Antwortmöglichkeiten
 * 
 * @param frage
 *            Text der Frage als String
 * @param n
 *            Nummer der zu erstellenden Frage
 * @returns div für die Antwortmöglichkeiten
 */
function createHeader(frage, n) {

	var questiondiv1 = document.createElement("div");
	questiondiv1.className = "questionclass";
	questiondiv1.id = "question" + n;

	// Erster Header
	var headerdiv1 = document.createElement("div");
	headerdiv1.className = "header";
	questiondiv1.appendChild(headerdiv1);

	var headerP1 = document.createElement("p");
	headerdiv1.appendChild(headerP1);
	var headerP1text = document.createTextNode(frage);
	headerP1.appendChild(headerP1text);
	headerP1.className = "question";

	questiondiv1.appendChild(headerdiv1);

	return questiondiv1;
}

/**
 * 
 * @returns niedrigste, noch nicht vergebene Fragennummer
 */
function findQuestionNumber() {
	var weiter = true;
	var n = 1;

	while (weiter) {
		if (document.getElementById("question" + n + "_answer1") !== null) {
			n++;
		} else {
			weiter = false;
		}
	}
	return n;
}

/**
 * Wertet die gegebenen Antworten aus und setzt score auf den entsprechenden
 * Wert.
 * 
 */
function evaluate() {

	// läuft durch alle Fragen
	for (var i = 1; i <= anzahlFragen; i++) {

		var question = document.getElementById("question" + i);

		// Falls die Frage eine Einfach- oder Mehrfachauswahl ist wird dieser
		// Teil durchlaufen.
		if (question.getAttribute("data-type").localeCompare("mc") === 0
				|| question.getAttribute("data-type").localeCompare("sc") === 0) {
			var childrenInput = $("#question" + i).find("input").toArray();
			var richtig = richtigArray.shift();

			var gibMirPunkte = true;
			if (childrenInput !== null) {
				for (var j = 0; j < childrenInput.length; j++) {
					var child = childrenInput[j];
					if (!(child.checked && (richtig[j] === 1) || !child.checked
							&& (richtig[j] === 0))) {
						gibMirPunkte = false;
					}
				}
				if (gibMirPunkte) {
					score++;
				}
			}
		}

		// Falls die Frage eine Drag&Drop Aufgabe ist wird dieser Teil
		// durchlaufen.
		else if (question.getAttribute("data-type").localeCompare("dd") === 0) {
			var draggables = $("#question" + i).find(".drag").toArray();
			var gibMirPunkte = true;
			var anzahlAntworten = draggables.length;
			var richtig = richtigArray.shift();
			var question = $('#question' + i);
			var boxes = $("#question" + i).find(".drop").toArray();

			for (var k = 0; k < draggables.length; k++) {
				var father = document.getElementById("question" + i + "_answer"
						+ k).parentNode;
				if (!father.isSameNode(boxes[richtig[k] - 1])) {
					gibMirPunkte = false;
				}

			}

			if (gibMirPunkte) {
				score++;
			}

			// set the variable question to be the DOM representation of the
			// element again (instead of jQuery)
			var question = document.getElementById("question" + i);
		}

		// Falls die Frage ein Lückentext ist wird dieser Teil durchlaufen.
		else if (question.getAttribute("data-type").localeCompare("tq") === 0) {

			var question = document.getElementById("question" + i);

			// lade die Lösungen zu dieser Frage in richtig
			var richtig = richtigArray.shift();

			// finde alle <p> Kinder der Frage
			var antworten = $("#question" + i).find("p").toArray();

			var gibMirPunkte = true;
			//durchlaufe alle Antworten. Die ersten beiden Einträge werden übersprungen, da sie keine Antworten sind.
			for (var j = 2; j < antworten.length - 2; j++) {
				var antworttext = antworten[j].textContent;
				// finde das Feld in dem die Antwort stehen sollte
				var Feldnummer = richtig[j - 2];
				var feld = document.getElementById("question" + i + "_blanc"
						+ Feldnummer);
				var feldtext = feld.value;
				// vergleiche ob der Feldtext mit dem Antworttext übereinstimmt
				if (antworttext !== feldtext) {
					gibMirPunkte = false;
				}

			}
			if (gibMirPunkte) {
				score++;
			}

		}

	}

}

// When clicking the "next"-button, the "question number" is counted upwards.
// the divs containing the questions are shown/hidden accordingly. To add
// questions, you have to create
function nextButtonClick() {
	count++;
	showTheQuestion(count);
}

// When clicking the "back"-button, the question number is counted downwards.
// All the questions are hidden except the previous question
function backButtonClick() {
	count--;
	showTheQuestion(count);
}

// This function shows the question on the screen that the user has to answer
// next
function showTheQuestion(count) {

	// Hides all the questions. The show() function of the questions has to be
	// called again to make them visible
	$(".questionclass").hide();

	$('#question' + count).show();

	if (count === 1) {
		$('#back_button_div').hide();
	} else if (count <= anzahlFragen) {
		$('#back_button_div').show();
		$('#next_button_div').show();
	} else {
		evaluate();
		$('#next_button_div').hide();
		$('#back_button_div').hide();
		$('#gz').show();

		$('#supergeil').html(
				"Gratuliere! Sie haben " + score + " von " + maxScore
						+ " Punkten!");
	}
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();

	// data ist die ID des Elements, das verschoben wird
	var data = ev.dataTransfer.getData("text");

	ev.target.appendChild(document.getElementById(data));
}
import { elements } from "chart.js";

export default function initializeDocument(args) {


    return {

        selectedLabel: {
            name: null,
            color: null,
        },
        labelList: new Map(),
        targetText: args.text,
        id: args.id,
        annotations: args.annotations,
        init: function () {

            this.annotations.forEach(annotation => {
                this.labelList.set(this.generateUUID(), {
                    text: annotation.text,
                    start: annotation.start,
                    end: annotation.end,
                    label: annotation.label,
                    color: annotation.color,
                });
            });
            document.addEventListener("contextmenu", this.removeLabel.bind(this));
        },

        setSelectedLabel: function (label) {
            this.selectedLabel = label;
        },

        markText: function (event) {
            var element = document.getElementById(this.id);
            var selection = element.ownerDocument.getSelection();

            if (!this.selectedLabel || !this.selectedLabel.name) {
                return;
            }

            if (selection.toString().length < 1) {
                return;
            }
            var selectedText = selection.toString();
            if (selectedText !== '') {
                var range = selection.getRangeAt(0);
                while (/^\s/.test(range.startContainer.textContent[range.startOffset])) {
                    range.setStart(range.startContainer, range.startOffset + 1);
                }
                while (/\s$/.test(range.endContainer.textContent[range.endOffset - 1])) {
                    range.setEnd(range.endContainer, range.endOffset - 1);
                }
                var commonAncestor = range.commonAncestorContainer;
                var offset = this.calculateOffset(selection.anchorNode.parentNode, selection.anchorNode);


                var isWithinLabeledSpan =
                    commonAncestor.nodeType === Node.ELEMENT_NODE &&
                    commonAncestor.classList.contains('annotations-label');

                if (!isWithinLabeledSpan) {
                    console.log(this.selectedLabel);
                    var start = offset + range.startOffset;
                    var end = offset + range.endOffset;
                    var key = this.generateUUID();
                    this.labelList.set(key, {
                        text: selectedText,
                        start: start,
                        end: end,
                        label: this.selectedLabel.name,
                        color: this.selectedLabel.color,
                    });
                    this.refreshTextField();
                }

            }
        },
        calculateOffset: function (parentNode, selectionNode) {
            var totalLength = 0;
            for (const child of parentNode.childNodes) {
                console.log("offset: " + totalLength);
                console.log("nodetype: " + child.nodeType);
                if (child === selectionNode) {
                    break;
                }

                if (child.nodeType === Node.ELEMENT_NODE) {
                    console.log(child.textContent.length);
                    for (const subChild of child.childNodes) {
                        if (subChild.nodeType === Node.TEXT_NODE) {
                            totalLength += subChild.textContent.length;
                        }
                    }

                } else if (child.nodeType === Node.TEXT_NODE) {
                    console.log(child.textContent.length);
                    totalLength += child.textContent.length;
                }
            }
            return totalLength;

        },

        refreshTextField: function () {
            let resultHTML = '';
            let currentIndex = 0;
            // Convert the Map to an array of entries, then sort it based on the 'start' property
            const sortedLabelList = [...this.labelList.entries()].sort((a, b) => a[1].start - b[1].start);
            sortedLabelList.forEach(([key, label]) => {
                if (currentIndex < label.start) {
                    resultHTML += this.targetText.substring(currentIndex, label.start);
                }
                // Add the annotated text
                resultHTML += this.createSpan(label, key);
                // Move currentIndex past this annotation
                currentIndex = label.end;
            });
            if (currentIndex < this.targetText.length) {
                resultHTML += this.targetText.substring(currentIndex);
            }
            var element = document.getElementById(this.id);
            element.innerHTML = resultHTML;
        },

        createSpan: function (label, key) {
            // console.log(label);
            var newNode = document.createElement('span');
            newNode.classList.add(key);
            newNode.classList.add('dynamic-span');
            var selectedText = this.targetText.substring(label.start, label.end);
            newNode.textContent = selectedText;
            newNode.classList.add('annotations-label');
            newNode.classList.add('tooltip');
            newNode.style.borderBottomColor = label.color;
            newNode.style.color = label.color;
            // var uuid = this.generateUUID();
            // newNode.dataset.uuid = uuid;
            var tooltipText = document.createElement('span');
            tooltipText.textContent = label.label;
            tooltipText.classList.add('tooltiptext');
            newNode.appendChild(tooltipText);
            // this.removeLabel(key);
            newNode.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                console.log(key);
                this.labelList.delete(key);
                this.refreshTextField();
            });
            return newNode.outerHTML;
        },
        removeLabel: function (event) {
            if (event.target.classList.contains('dynamic-span')) {
                event.preventDefault();
                const key = Array.from(event.target.classList).find(cls => this.labelList.has(cls));
                if (key) {
                    console.log(key);
                    this.labelList.delete(key);
                    this.refreshTextField();
                }
            }
        },


        generateUUID: function () {
            return 'xxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0;
                var v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },
    };
}





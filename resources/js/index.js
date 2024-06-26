import md5 from "md5";
export default function initializeDocument(args) {
    return {
        selectedLabel: {
            name: null,
            color: null,
        },
        labelList: new Map(),
        targetText: args.text,
        id: args.id,
        state: args.state,
        annotations: args.annotations,
        labels: args.labels,
        init: function () {
            // console.log(this.state);

            var styleText = "";
            const style = document.createElement("style");
            for (const key in this.labels) {
                const label = this.labels[key];
                const color = this.genColorCodeFromText(label.name);
                styleText += `.radio-label .${label.name} { background-color: ${color}; } `;

            }

            style.innerHTML = styleText;
            document.head.appendChild(style);

            for (const key in this.state) {
                if (this.state.hasOwnProperty(key)) {
                    const annotation = this.state[key];
                    if (annotation.start < annotation.end) {
                        this.labelList.set(this.generateUUID(), {
                            pattern: annotation.pattern,
                            start: annotation.start,
                            end: annotation.end,
                            label: annotation.label.toUpperCase(),
                            color: this.genColorCodeFromText(annotation.label),
                        });
                    }
                }
            }
            document.addEventListener("contextmenu", this.removeLabel.bind(this));
        },

        setSelectedLabel: function (label) {
            this.selectedLabel = label;
        },
        genColorCodeFromText: function (text) {
            const stringToColour = (str) => {
                // Convert the input string to lowercase to ensure consistent color generation
                str = str.toLowerCase();

                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + ((hash << 5) - hash);
                }

                const saturation = 0.6; // Saturation level (0.0 to 1.0)
                const lightness = 0.5; // Lightness level (0.0 to 1.0)

                // Ensure hue values are spaced out to avoid too similar colors
                const hueOffset = hash % 360; // Use hash to offset hue

                const hue = (hueOffset + 360) % 360; // Ensure hue is within [0, 360)

                // Convert HSL to RGB
                const h = hue / 360;
                const s = saturation;
                const l = lightness;

                let r, g, b;

                if (s === 0) {
                    r = g = b = l; // Achromatic (grey)
                } else {
                    const hueToRgb = (p, q, t) => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };

                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;

                    r = hueToRgb(p, q, h + 1 / 3);
                    g = hueToRgb(p, q, h);
                    b = hueToRgb(p, q, h - 1 / 3);
                }

                // Convert RGB to hexadecimal color
                const toHex = (x) => {
                    const hex = Math.round(x * 255).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                };

                const colour = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
                return colour;
            };

            return stringToColour(text);
        },


        updateState: function () {
            const newState = {};
            this.labelList.forEach((value, key) => {
                newState[key] = {
                    pattern: value.pattern,
                    start: value.start,
                    end: value.end,
                    label: value.label.toUpperCase(),
                    color: this.genColorCodeFromText(value.label),
                };
            });
            this.state = newState;
        },

        markText: function (event) {
            var element = document.getElementById(this.id);
            var selection = element.ownerDocument.getSelection();
            if (!this.selectedLabel || !this.selectedLabel.name || selection.toString().length <= 1) {
                return;
            }

            var selectedText = selection.toString();
            if (selectedText !== '') {
                var range = selection.getRangeAt(0);
                var startOffset = range.startOffset;
                var endOffset = range.endOffset;

                // Adjust the startOffset to the start of the word
                while (startOffset > 0 && !/\s/.test(range.startContainer.textContent[startOffset - 1])) {
                    startOffset--;
                }

                // Adjust the endOffset to the end of the word
                while (endOffset < range.startContainer.textContent.length && !/\s/.test(range.startContainer.textContent[endOffset])) {
                    endOffset++;
                }

                range.setStart(range.startContainer, startOffset);
                range.setEnd(range.startContainer, endOffset);

                var commonAncestor = range.commonAncestorContainer;
                var offset = this.calculateOffset(selection.anchorNode.parentNode, selection.anchorNode);

                var start = offset + range.startOffset;
                var end = offset + range.endOffset;

                var isWithinLabeledSpan =
                    commonAncestor.nodeType === Node.ELEMENT_NODE &&
                    commonAncestor.classList.contains('dynamic-span');

                if (!isWithinLabeledSpan) {
                    // Check if any part of the selected range is already labeled
                    var overlappingLabel = false;
                    this.labelList.forEach((value) => {
                        if (!(end <= value.start || start >= value.end)) {
                            overlappingLabel = true;
                        }
                    });

                    if (!overlappingLabel) {
                        var key = this.generateUUID();
                        this.labelList.set(key, {
                            pattern: range.toString(),
                            start: start,
                            end: end,
                            label: this.selectedLabel.name.toUpperCase(),
                            color: this.genColorCodeFromText(this.selectedLabel.name),
                        });

                        this.refreshTextField();

                        var newNode = document.createElement('span');
                        newNode.style.backgroundColor = this.genColorCodeFromText(this.selectedLabel.name);
                        range.surroundContents(newNode);
                    }
                    else {
                        return;
                    }
                }
            }
        },


        calculateOffset: function (parentNode, selectionNode) {
            var totalLength = 0;
            for (const child of parentNode.childNodes) {
                if (child === selectionNode) {
                    break;
                }
                if (child.nodeType === Node.ELEMENT_NODE) {
                    for (const subChild of child.childNodes) {
                        if (subChild.nodeType === Node.TEXT_NODE) {
                            totalLength += subChild.textContent.length;
                        }
                    }
                } else if (child.nodeType === Node.TEXT_NODE) {
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
            this.updateState(this.state);

        },

        createSpan: function (label, key) {
            var newNode = document.createElement('span');
            newNode.classList.add(key);
            newNode.classList.add('dynamic-span');
            var selectedText = this.targetText.substring(label.start, label.end);
            newNode.textContent = selectedText;
            newNode.style.borderBottom = `3px solid ${label.color}`;
            var labelElement = document.createElement('span');
            labelElement.textContent = label.label;
            labelElement.style.marginLeft = '0.3em';
            labelElement.style.backgroundColor = label.color;
            labelElement.style.padding = '0.2em';
            labelElement.style.borderRadius = '0.2em';
            labelElement.style.fontSize = '0.6em';
            labelElement.style.verticalAlign = 'super';
            newNode.appendChild(labelElement);
            newNode.addEventListener("contextmenu", (event) => {
                event.preventDefault();
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

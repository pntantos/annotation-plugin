export default function initializeDocument(args) {
    return {
        elementid: args.elementId,
        labelsId: args.labelsId,
        // state: args.state,
        selectedLabel: '',
        selectedColor: '',
        labelList: new Map(),
        labels: args.labels,
        init: function () {
            console.log(this.elementid);
            // console.log(this.state);
            document.getElementById(this.elementid).addEventListener('mouseup', this.watchfield);
            document.getElementById(this.labelsId).addEventListener('mouseup', this.watchfield);
            // this.watchfield();
            this.updatedLabel();
            this.generateUUID();
            this.contextmenu();
        },
        watchfield: function (event) {
            var self = this;

            var selection = window.getSelection();
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
                var isWithinLabeledSpan = commonAncestor.nodeType === Node.ELEMENT_NODE &&
                    commonAncestor.classList.contains('selected-label');
                var isPartiallyWithinLabeledSpan = false;
                if (range.startContainer !== range.endContainer) {
                    var nodesInRange = document.createTreeWalker(range.commonAncestorContainer,
                        NodeFilter.SHOW_ELEMENT, {
                        acceptNode: function (node) {
                            return node.classList && node.classList.contains(
                                'selected-label') ? NodeFilter.FILTER_ACCEPT :
                                NodeFilter.FILTER_SKIP;
                        }
                    });
                    var currentNode;
                    while (currentNode = nodesInRange.nextNode()) {
                        if (range.intersectsNode(currentNode)) {
                            isPartiallyWithinLabeledSpan = true;
                            break;
                        }
                    }
                }
                if (!isWithinLabeledSpan && !isPartiallyWithinLabeledSpan) {
                    var start = range.startOffset;
                    var end = range.endOffset;
                    var key = self.generateUUID();
                    self.labelList.set(key, {
                        text: selectedText,
                        start: start,
                        end: end,
                        label: self.selectedLabel,
                        color: self.selectedColor
                    });
                    console.log(self.labelList);
                }
                var newNode = document.createElement('span');
                newNode.textContent = selectedText;
                newNode.style.color = self.selectedColor;
                newNode.classList.add('selected-label');
                newNode.classList.add('tooltip');
                var uuid = self.generateUUID();
                newNode.dataset.uuid = uuid;
                var tooltipText = document.createElement('span');
                tooltipText.textContent = self.selectedLabel;
                tooltipText.classList.add('tooltiptext');
                newNode.appendChild(tooltipText);
                range.deleteContents();
                range.insertNode(newNode);
                selection.removeAllRanges();
            }

        },
        updatedLabel: function () {
            var self = this;
            window.updateLabel = function (label, color) {
                self.selectedLabel = label;
                self.selectedColor = color;
            };
        },
        generateUUID: function () {
            return 'xxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        contextmenu: function () {
            var self = this;
            document.addEventListener('contextmenu', function (event) {
                var target = event.target;
                if (target.classList.contains('selected-label')) {
                    event.preventDefault();
                    var tooltip = target.querySelector('.tooltiptext');
                    var key = target.dataset.uuid;
                    if (tooltip) {
                        tooltip.remove();
                    }
                    target.style.color = '';
                    target.classList.remove('tooltip', 'selected-label');
                    self.labelList.delete(key);
                    var textNode = document.createTextNode(target.textContent);
                    target.parentNode.replaceChild(textNode, target);
                }
            });
        }
    }
}

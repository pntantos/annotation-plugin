export default function initializeDocument(args) {
    var selectedLabel = '';
    var selectedColor = '';
    var start = 0;
    var end = 0;
    var labelList = new Map();

    function generateUUID() {
        return 'xxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    window.updateLabel = function (label, color) {
        selectedLabel = label;
        selectedColor = color;
    };

    document.getElementById(args.elementid).addEventListener('mouseup', function (event) {
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
                start = range.startOffset;
                end = range.endOffset;
                var key = generateUUID();

                labelList.set(key, {
                    text: selectedText,
                    start: start,
                    end: end,
                    label: selectedLabel,
                    color: selectedColor
                });

                console.log(labelList);
            }

            var newNode = document.createElement('span');
            newNode.textContent = selectedText;
            newNode.style.color = selectedColor;
            newNode.classList.add('selected-label');
            newNode.classList.add('tooltip');
            newNode.dataset.uuid = key;

            var tooltipText = document.createElement('span');
            tooltipText.textContent = selectedLabel;
            tooltipText.classList.add('tooltiptext');

            newNode.appendChild(tooltipText);

            range.deleteContents();
            range.insertNode(newNode);
            selection.removeAllRanges();
        }
    });

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
            labelList.delete(key);
            var textNode = document.createTextNode(target.textContent);
            target.parentNode.replaceChild(textNode, target);
        }
    });



}

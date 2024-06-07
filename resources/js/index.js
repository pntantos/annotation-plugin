export default function initializeDocument(args) {

    // document.body.addEventListener('contextmenu', function (event) {
    //     initializeDocument().removeSpan(event);
    // });

    return {
        selectedLabel: {},
        labelList: new Map(),
        targetText: args.text,
        elementId: args.elementId,
        init: function () { },
        setSelectedLabel: function (label) {
            console.log(label)
            console.log(label.name)
            this.selectedLabel = label
        },
        markText: function (event) {
            var selection = window.getSelection()
            var selectedText = selection.toString()
            if (selectedText !== '') {
                var range = selection.getRangeAt(0)
                while (
                    /^\s/.test(
                        range.startContainer.textContent[range.startOffset],
                    )
                ) {
                    range.setStart(range.startContainer, range.startOffset + 1)
                }
                while (
                    /\s$/.test(
                        range.endContainer.textContent[range.endOffset - 1],
                    )
                ) {
                    range.setEnd(range.endContainer, range.endOffset - 1)
                }
                var commonAncestor = range.commonAncestorContainer
                var isWithinLabeledSpan =
                    commonAncestor.nodeType === Node.ELEMENT_NODE &&
                    commonAncestor.classList.contains('selected-label')
                var isPartiallyWithinLabeledSpan = false
                if (range.startContainer !== range.endContainer) {
                    var nodesInRange = document.createTreeWalker(
                        range.commonAncestorContainer,
                        NodeFilter.SHOW_ELEMENT,
                        {
                            acceptNode: function (node) {
                                return node.classList &&
                                    node.classList.contains('selected-label')
                                    ? NodeFilter.FILTER_ACCEPT
                                    : NodeFilter.FILTER_SKIP
                            },
                        },
                    )
                    var currentNode
                    while ((currentNode = nodesInRange.nextNode())) {
                        if (range.intersectsNode(currentNode)) {
                            isPartiallyWithinLabeledSpan = true
                            break
                        }
                    }
                }
                if (!isWithinLabeledSpan && !isPartiallyWithinLabeledSpan) {
                    var start = range.startOffset
                    var end = range.endOffset
                    var key = this.generateUUID()
                    this.labelList.set(key, {
                        text: selectedText,
                        start: start,
                        end: end,
                        label: this.selectedLabel.name,
                        color: this.selectedLabel.color,
                    })

                    console.log(this.labelList)
                    // this.createSpan(selectedText);
                    this.refreshTextField();

                }


            }
        },
        refreshTextField: function () {
            this.labelList.forEach(function (label) {
                this.createSpan(label);
            })


        },
        createSpan: function (label) {
            var newNode = document.createElement('span')
            newNode.textContent = label.text
            newNode.classList.add('selected-label')
            newNode.classList.add('tooltip')
            newNode.style.borderBottomColor = label.color;
            newNode.style.color = label.color;
            var uuid = this.generateUUID()
            newNode.dataset.uuid = uuid
            var tooltipText = document.createElement('span')
            tooltipText.textContent = label.name
            tooltipText.classList.add('tooltiptext')
            newNode.appendChild(tooltipText)
            var range = document.createRange();
            range.setStart(this.targetText, start);
            range.setEnd(this.targetText, end);
            range.deleteContents();
            range.insertNode(newNode);
        },

        generateUUID: function () {
            return 'xxx'.replace(/[xy]/g, function (c) {
                var r = (Math.random() * 16) | 0
                var v = c === 'x' ? r : (r & 0x3) | 0x8
                return v.toString(16)
            })
        },


        // removeSpan: function (event) {
        //     var target = event.target;
        //     if (target.classList.contains('selected-label')) {
        //         var tooltip = target.querySelector('.tooltiptext');
        //         var key = target.dataset.uuid;
        //         if (tooltip) {
        //             tooltip.remove();
        //         }
        //         target.style.color = '';
        //         target.classList.remove('tooltip', 'selected-label');
        //         this.labelList.delete(key);
        //         var textNode = document.createTextNode(target.textContent);
        //         target.parentNode.replaceChild(textNode, target);
        //     }
        // },

    }
}

@php
    // $id = $getId();
    // $isDisabled = $isDisabled();
    // $name = $getName();
    // $config = $getConfig();
    // $interfaces = $getInterfaces();
    // $user = $getUser();
    // $task = $getTask();
    $text = $getText();
    $labels = $getViewLabels();

@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field" :text="$text">
    <br>
    <div x-data="{ labels: @js($labels), selectedLabel: '' }">
        <template x-for="label in labels" :key="label">
            <label class="radio-label" x-bind:style="{ 'background-color': label.color }">
                <input id="radio" type="radio" name="label" class="radio"
                    x-on:click="selectedLabel = label.name; updateLabel(label.name,label.color)" />
                <span x-text="label.name"></span>
            </label>
        </template>
    </div>
    <br>
    <div x-data="{ text: @js($text) }">
        <p id="titlename" class="titlename" style="width: 100%; " readonly x-text="text">
        </p>
    </div>

</x-dynamic-component>


<script>
    document.addEventListener('DOMContentLoaded', function() {
        var selectedLabel = '';
        var selectedColor = '';
        var start = 0;
        var end = 0;
        var labelList = new Map();

        function generateUUID() {
            return 'xxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0;
                var v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }



        window.updateLabel = function(label, color) {
            selectedLabel = label;
            selectedColor = color;
        };

        document.getElementById('titlename').addEventListener('mouseup', function(event) {
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
                            acceptNode: function(node) {
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

        document.addEventListener('contextmenu', function(event) {
            var target = event.target;
            if (target.classList.contains('selected-label')) {
                event.preventDefault();
                var tooltip = target.querySelector('.tooltiptext');
                var lineClass = target.dataset.lineId;
                var line = document.querySelector(`.${lineClass}`);
                var key = target.dataset.uuid;

                if (tooltip) {
                    tooltip.remove();
                }
                if (line) {
                    line.remove();
                }

                target.style.color = '';
                target.classList.remove('tooltip', 'selected-label');
                labelList.delete(key);
                var textNode = document.createTextNode(target.textContent);
                target.parentNode.replaceChild(textNode, target);
            }
        });
    });
</script>


<style>
    .radio-label {
        display: inline-block;
        padding: 10px 10px;
        border-radius: 5px;
        margin-right: 5px;
        cursor: pointer;
    }

    .radio-label:hover {
        opacity: 0.4;
    }

    .titlename {
        display: inline-block;
        padding: 8px 8px;
        border-radius: 10px;
    }

    .titlename:focus {
        border-color: orange;
        border-width: 4px;
    }

    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: auto;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
        white-space: nowrap;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }

    .selected-label {
        border-bottom: 2px solid orange;
    }
</style>

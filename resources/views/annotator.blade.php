@php
$id = $getId();
$isDisabled = $isDisabled();
$name = $getName();
$text = $getText();
$labels = $getViewLabels();
$annotations = $getViewAnnotations();
$state = $getState();
@endphp
<script src="https://cdn.jsdelivr.net/npm/blueimp-md5@2.18.0/js/md5.min.js"></script>

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div x-id="['labelTextField']" x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('annotation-plugin', 'pntantos/annotation-plugin') }}"
        x-data="initializeDocument({
            annotations: @js($annotations),
            id: $id('labelTextField'),
            text: @js($text),
            state: $wire.$entangle('{{ $getStatePath() }}'),
            labels: @js($labels)
        })">

        <div x-data="{ labels: @js($labels) }">
            <template x-for="label in labels" :key="label.name">
                <label class="radio-label "
                    :class="{
                        [label.name]: true,
                        'annotations-label': selectedLabel.name === label.name
                    }"
                    :style="{ 'background-color': genColorCodeFromText(label.name.toUpperCase()) }">
                    <input type="radio" name="label" class="radio" x-model="selectedLabel" :value="label.name"
                        x-on:change="setSelectedLabel($data)" x-data="{ color: label.color, name: label.name }" />
                    <span x-text="label.name.toUpperCase()"></span>
                </label>
            </template>
        </div>
        <br>
        <p x-init="$nextTick(() => { refreshTextField() })" wire:ignore :id="id" x-on:mouseup="markText" x-data="{ text: @js($text) }"
            x-data="{ labels: @js($labels) }" x-data="{ annotations: @js($annotations) }" readonly x-text="text" class="w-full titlename">
        </p>
    </div>
</x-dynamic-component>
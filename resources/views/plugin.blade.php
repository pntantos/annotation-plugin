@php
    $id = $getId();
    $isDisabled = $isDisabled();
    $name = $getName();
    $text = $getText();
    $labels = $getViewLabels();
    $annotations = $getViewAnnotations();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">

    <div x-id="['labelTextField']" x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('plugin', 'steliosn1/plugin') }}"
        x-data="initializeDocument({
        
            annotations: @js($annotations),
            id: $id('labelTextField'),
            text: @js($text)
        })">

        <div x-data="{ labels: @js($labels) }">
            <template x-for="label in labels" :key="label.name">
                <label class="radio-label" :class="{ 'annotations-label': selectedLabel.name === label.name }"
                    :style="{ 'background-color': label.color }">
                    <input type="radio" name="label" class="radio" x-model="selectedLabel" :value="label.name"
                        x-on:change="setSelectedLabel($data)" x-data="{ color: label.color, name: label.name }" />
                    <span x-text="label.name"></span>
                </label>
            </template>
        </div>

        <p x-init="$nextTick(() => { refreshTextField() })" wire:ignore :id="id" x-on:mouseup="markText" x-data="{ text: @js($text) }"
            x-data="{ annotations: @js($annotations) }" readonly x-text="text" class="w-full titlename">
        </p>

    </div>
</x-dynamic-component>

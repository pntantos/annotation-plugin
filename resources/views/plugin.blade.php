@php
    $id = $getId();
    $isDisabled = $isDisabled();
    $name = $getName();
    $text = $getText();
    $labels = $getViewLabels();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">

    <div x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('plugin', 'steliosn1/plugin') }}"
        x-data="initializeDocument({
            elementId: $refs.labelTextField,
            text: @js($text)
        })">

        <div x-data="{ labels: @js($labels) }">
            <template x-for="label in labels" :key="label.name">
                <label class="radio-label" x-bind:style="{ 'background-color': label.color }">
                    <input x-model="selectedLabel" id="radio" type="radio" name="label" class="radio"
                        x-on:change="setSelectedLabel($data)" x-data="{ color: label.color, name: label.name }" />
                    <span x-text="label.name" x-on:click="removeSpan"></span>
                </label>
            </template>
        </div>

        <p wire:ignore x-ref="labelTextField" x-on:mouseup="markText" x-data="{ text: @js($text) }" readonly x-text="text"
            class="w-full titlename">
        </p>
    </div>
</x-dynamic-component>
